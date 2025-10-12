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
    <path
      d="M5.33 8.33L12 15L18.67 8.33"
      stroke="currentColor"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
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
