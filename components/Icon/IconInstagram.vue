<template>
  <svg
    :width="size"
    :height="size"
    :class="colorClass"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    v-bind="$attrs"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="4"
      stroke="currentColor"
      :stroke-width="strokeWidth"
      fill="none"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      stroke="currentColor"
      :stroke-width="strokeWidth"
      fill="none"
    />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: string | number;
  colorClass?: string;
  strokeWidth?: string | number;
}

withDefaults(defineProps<Props>(), {
  size: 24,
  colorClass: 'text-current',
  strokeWidth: 2,
});
</script>
