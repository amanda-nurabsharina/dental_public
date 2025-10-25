<template>
  <svg
    :width="size"
    :height="size"
    :class="colorClass"
    v-bind="$attrs"
    viewBox="0 0 18 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z"
      fill="currentColor"
    />
  </svg>
</template>
<script setup lang="ts">
interface Props {
  size?: string | number;
  colorClass?: string;
}

withDefaults(defineProps<Props>(), {
  size: 18,
  colorClass: 'text-gray-900',
});
</script>
<style></style>
