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
    <circle
      cx="11"
      cy="11"
      r="8"
      stroke="currentColor"
      :stroke-width="strokeWidth"
      fill="none"
    />
    <path
      d="M21 21l-4.35-4.35"
      stroke="currentColor"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
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
