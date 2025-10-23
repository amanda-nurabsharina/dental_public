<template>
  <svg
    :width="size"
    :height="size"
    :class="colorClass"
    v-bind="$attrs"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.172 7.50005L6.808 2.13605L8.222 0.722046L16 8.50005L8.222 16.278L6.808 14.864L12.172 9.50005H0L0 7.50005H12.172Z"
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
  size: 16,
  colorClass: 'text-current',
});
</script>
