<template>
  <v-card class="doctor-card" variant="flat" width="100%">
    <!-- Doctor Photo -->
    <v-img
      :src="doctor.photo"
      :alt="doctor.name"
      class="doctor-image"
      height="280"
      cover
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <!-- Doctor Info -->
    <div class="doctor-info pa-4">
      <!-- Specialty Badge -->
      <v-chip
        :color="doctor.badgeColor"
        class="text-caption mb-3"
        size="small"
        variant="flat"
        density="comfortable"
      >
        {{ doctor.badge }}
      </v-chip>

      <!-- Name and Title -->
      <h3 class="text-subtitle-1 font-weight-bold text-black mb-1">
        {{ doctor.name }}
      </h3>
      <p class="text-body-2 text-grey-darken-1 mb-2">
        {{ doctor.specialist }}
      </p>

      <!-- Rating -->
      <div class="d-flex align-center">
        <v-rating
          v-model="doctor.rating"
          color="amber-darken-2"
          density="compact"
          size="small"
          readonly
          half-increments
        ></v-rating>
        <span class="text-caption text-grey-darken-1 ml-1">{{
          doctor.rating
        }}</span>
      </div>
    </div>
  </v-card>
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

<style scoped>
.doctor-card {
  border: 1px solid #eee;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.doctor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.doctor-image {
  border-bottom: 1px solid #eee;
}
</style>
