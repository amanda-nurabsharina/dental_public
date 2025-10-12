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
      d="M24 5.457v6.14H21.99L12 16.05l-9.99-4.452H0V5.457C0 4.651.651 4 1.457 4h21.086C23.349 4 24 4.651 24 5.457z"
      fill="currentColor"
    />
    <path
      d="M0 13.543V18.543C0 19.349.651 20 1.457 20h21.086C23.349 20 24 19.349 24 18.543V13.543L14.6 17.6C12.99 18.1 11.01 18.1 9.4 17.6L0 13.543z"
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
  size: 24,
  colorClass: 'text-current',
});
</script>
