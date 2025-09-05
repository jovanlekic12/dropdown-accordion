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
.AccordionDropdown {
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  background-color: #fff;
}

.AccordionDropdown-header {
  display: flex;
  padding: 15px 20px;
  border-bottom: 1px solid transparent;
  justify-content: space-between;
  cursor: pointer;
  transition: background-color 0.3s;
}

.AccordionDropdown-header:hover {
  background-color: #f1f1f1;
}

.AccordionDropdown-header.is-expanded {
  border-bottom: 1px solid #d1d1d1;
  visibility: visible;
}

.AccordionDropdown-content {
  position: relative;
  max-height: 0;
  padding: 0 20px;
  overflow: hidden;
  visibility: hidden;
  transition: max-height 0.3s ease-in-out;
  overflow-x: scroll;
}

.AccordionDropdown-content.is-expanded {
  max-height: 5000px;
  visibility: visible;
}

.AccordionDropdown-actionButton {
  border: none;
  background: transparent;
  transition: opacity 0.3s, filter 0.2s ease-in-out;
  outline: none;
}

.AccordionDropdown-actionButton:disabled {
  opacity: 0.4;
  filter: brightness(0%);
  pointer-events: none;
}
</style>
