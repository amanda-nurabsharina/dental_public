<template>
  <svg
    :width="size"
    :height="size"
    :class="colorClass"
    viewBox="0 0 18 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    v-bind="$attrs"
  >
    <path
      d="M17.3548 4.45509L17.3542 4.45446L13.9085 1.02536C13.6504 0.768474 13.2328 0.76943 12.9759 1.0276C12.719 1.28574 12.72 1.70327 12.9781 1.96019L15.2916 4.26243H1.32595C0.961736 4.26243 0.666504 4.55766 0.666504 4.92187C0.666504 5.28608 0.961736 5.58132 1.32595 5.58132H15.2915L12.9781 7.88356C12.72 8.14048 12.719 8.55801 12.9759 8.81615C13.2329 9.07435 13.6504 9.07524 13.9085 8.81839L17.3543 5.38929L17.3549 5.38866C17.6131 5.13088 17.6123 4.71201 17.3548 4.45509Z"
      class="full-current"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: string | number;
  colorClass?: string;
}

withDefaults(defineProps<Props>(), {
  size: 14,
  colorClass: 'fill-white',
});
</script>
<style></style>
