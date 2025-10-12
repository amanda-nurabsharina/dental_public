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
      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
      stroke="currentColor"
      :stroke-width="strokeWidth"
      fill="none"
    />
    <circle
      cx="12"
      cy="10"
      r="3"
      stroke="currentColor"
      :stroke-width="strokeWidth"
      fill="none"
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
