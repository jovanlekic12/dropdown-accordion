<script>
import AccordionDropdown from "./components/dropdown-accordion.vue";

export default {
  components: { AccordionDropdown },
};
</script>

<template>
  <AccordionDropdown>
    <!-- Slot for header -->
    <template #content-header>
      <h3>My Accordion Title</h3>
    </template>

    <!-- Slot for main content -->
    <template #content-main>
      <p>
        This is the content inside the accordion. It will show when expanded.
      </p>
    </template>
  </AccordionDropdown>
</template>
