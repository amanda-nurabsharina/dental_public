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
      d="M12 1l3 3 4-1-1 4 3 3-3 3 1 4-4-1-3 3-3-3-4 1 1-4-3-3 3-3-1-4 4 1z"
      fill="currentColor"
    />
    <path
      d="M8 12l1.5 1.5L12 16l2.5-2.5L16 12l-1.5-1.5L12 8l-2.5 2.5z"
      fill="white"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: string | number;
  colorClass?: string;
}

withDefaults(defineProps<Props>(), {
  size: 24,
  colorClass: 'text-primary',
});
</script>
