<template>
  <svg
    :width="size"
    :height="size"
    :class="colorClass"
    v-bind="$attrs"
    viewBox="0 0 21 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.3725 4.14067C6.11121 2.43674 8.45211 1.48782 10.8865 1.50012C13.3209 1.51241 15.6521 2.48493 17.3735 4.20633C19.0949 5.92774 20.0674 8.25893 20.0797 10.6933C20.092 13.1277 19.1431 15.4686 17.4392 17.2073L12.5555 22.091C12.1179 22.5284 11.5246 22.7742 10.9058 22.7742C10.2871 22.7742 9.69374 22.5284 9.25617 22.091L4.3725 17.2073C2.63987 15.4745 1.6665 13.1244 1.6665 10.674C1.6665 8.22357 2.63987 5.87348 4.3725 4.14067Z"
      stroke="#00813D"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      d="M10.9058 14.1738C12.8388 14.1738 14.4058 12.6068 14.4058 10.6738C14.4058 8.74083 12.8388 7.17383 10.9058 7.17383C8.97276 7.17383 7.40576 8.74083 7.40576 10.6738C7.40576 12.6068 8.97276 14.1738 10.9058 14.1738Z"
      stroke="#00813D"
      stroke-width="1.5"
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
