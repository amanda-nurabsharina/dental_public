<template>
  <div
    class="relative rounded-2xl border-[0.5px] border-secondary-2 p-6 bg-white box-border"
  >
    <div class="select-none absolute right-0 -translate-x-1/2 text-secondary-1">
      <IconQuote />
    </div>

    <div class="space-y-1.5 max-w-[15.625rem]">
      <div class="flex gap-x-1">
        <IconStar v-for="star in (testimony.rating || 5)" :key="star" :size="21" />
      </div>
      <p class="text-grey-500 text-regular-normal">
        {{ testimony.comment }}
      </p>
      <div class="flex gap-x-2 items-center">
        <img
          :src="currentAvatar"
          :alt="`${testimony.name} avatar`"
          class="w-11 h-11 rounded-full object-cover flex-shrink-0"
          @error="currentAvatar = '/images/testimonials/michelle.png'"
        />
        <span class="text-large-medium">{{ testimony.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface TestimonialProps {
  testimony: {
    name: string;
    avatar: string;
    rating: number;
    comment: string;
  };
}

const props = withDefaults(defineProps<TestimonialProps>(), {});
const currentAvatar = ref(props.testimony.avatar || '/images/testimonials/michelle.png');

watch(
  () => props.testimony.avatar,
  (newVal) => {
    currentAvatar.value = newVal || '/images/testimonials/michelle.png';
  }
);
</script>
