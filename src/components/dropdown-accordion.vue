<template>
  <component
    :is="componentType"
    :class="[
      'AccordionDropdown',
      {
        'is-expanded': isExpanded,
      },
    ]"
  >
    <header
      :class="[
        'AccordionDropdown-header',
        {
          'is-expanded': isExpanded,
        },
      ]"
      @click="toggleVisibility"
    >
      <slot name="content-header"></slot>
      <button
        :disabled="isDisabled"
        class="AccordionDropdown-actionButton"
        type="button"
      >
        <i
          :class="['icon', 'icon--s', `icon--arrow-chevron_${iconType}_blue`]"
          aria-hidden="true"
          role="presentation"
        ></i>
      </button>
    </header>
    <div
      :class="[
        'AccordionDropdown-content',
        {
          'is-expanded': isExpanded,
        },
      ]"
    >
      <slot name="content-main"></slot>
    </div>
  </component>
</template>

<script>
export default {
  props: {
    isStandalone: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    componentType: {
      type: String,
      default: "div",
    },
  },

  data() {
    return { isExpanded: false };
  },

  computed: {
    iconType() {
      return this.isExpanded ? "up" : "down";
    },
  },

  methods: {
    toggleVisibility(e) {
      const linkEl = e.target.closest("a");
      if (linkEl) return;

      this.isExpanded = !this.isExpanded;

      if (this.isExpanded && this.$attrs.onLoad) {
        this.$emit("load", e);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$color-gray-alpha: #d1d1d1;
$color-light-alpha: #f1f1f1;
$border-radius-alpha: 4px;
$accordion-expanded-max-height: 5rem;

.AccordionDropdown {
  border: 1px solid $color-gray-alpha;
  border-radius: $border-radius-alpha;
  background-color: #fff;

  &-header {
    display: flex;
    padding: 15rem 20rem;
    border-bottom: 1px solid transparent;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
      background-color: $color-light-alpha;
    }

    &.is-expanded {
      border-bottom: 1px solid $color-gray-alpha;
      visibility: visible;
    }
  }

  &-content {
    position: relative;
    max-height: 0;
    padding: 0 20rem;
    overflow: hidden;
    visibility: hidden;
    transition: max-height 0.3s ease-in-out;
    overflow-x: scroll;

    &.is-expanded {
      max-height: $accordion-expanded-max-height;
      visibility: visible;
    }
  }

  &-actionButton {
    border: none;
    background: transparent;
    transition: opacity 0.3s, filter 0.2s ease-in-out;
    outline: none;

    &:disabled {
      opacity: 0.4;
      filter: brightness(0%);
      pointer-events: none;
    }
  }
}
</style>
