<template>
  <div
    class="relative rounded-2xl border-[0.5px] border-secondary-2 p-6 bg-white box-border"
  >
    <div class="select-none absolute right-0 -translate-x-1/2 text-secondary-1">
      <IconQuote />
    </div>

    <div class="space-y-1.5 max-w-[15.625rem]">
      <div class="flex gap-x-1">
        <IconStar v-for="star in 5" :key="star" :size="21" />
      </div>
      <p class="text-grey-500 text-regular-normal">
        {{ testimony.comment }}
      </p>
      <div class="flex gap-x-2 items-center">
        <img
          :src="testimony.avatar"
          :alt="`${testimony.name} avatar`"
          class="w-11 h-11 rounded-full object-cover flex-shrink-0"
        />
        <span class="text-large-medium">{{ testimony.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TestimonialProps {
  testimony: {
    name: string;
    avatar: string;
    rating: number;
    comment: string;
  };
}

withDefaults(defineProps<TestimonialProps>(), {});
</script>
