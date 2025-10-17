<template>
  <div>
    <img :src="doctor.photo" alt="" class="mb-4" />
    <div class="space-y-2">
      <small class="text-regular-bold text-secondary-2">{{
        doctor.badge
      }}</small>
      <div class="heading-6 lg:heading-5 text-[#161C2D]">{{ doctor.name }}</div>
      <p class="text-small-normal lg:text-regular-normal">
        {{ doctor.specialist }}
      </p>
      <div class="flex gap-x-2 items-center">
        <IconStar />
        <span class="text-grey-600 text-regular-medium">{{
          doctor.rating
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Doctor {
  id: number;
  name: string;
  specialist: string;
  rating: number;
  photo: string;
  badge: string;
  badgeColor: string;
}

defineProps<{
  doctor: Doctor;
}>();
</script>

<style scoped></style>
