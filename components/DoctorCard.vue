<template>
  <div>
    <!-- Use API image if available, otherwise fallback to static -->
    <img
      :src="doctorImageUrl"
      :alt="`Photo of ${doctorName}`"
      class="mb-4 w-full h-48 object-cover rounded-lg"
      @error="handleImageError"
    />
    <div class="space-y-2">
      <small class="text-regular-bold text-secondary-2">{{
        doctorBadge
      }}</small>
      <div class="heading-6 lg:heading-5 text-[#161C2D]">{{ doctorName }}</div>
      <p class="text-small-normal lg:text-regular-normal">
        {{ doctorSpecialist }}
      </p>
      <div v-if="doctorRating" class="flex gap-x-2 items-center">
        <IconStar />
        <span class="text-grey-600 text-regular-medium">{{
          doctorRating
        }}</span>
      </div>
      <!-- Show doctor credentials if available from API -->
      <div v-if="doctorCredentials" class="space-y-1">
        <div v-if="doctorCredentials.ihs_number" class="text-xs text-gray-600">
          IHS: {{ doctorCredentials.ihs_number }}
        </div>
        <div v-if="doctorCredentials.str_number" class="text-xs text-gray-600">
          STR: {{ doctorCredentials.str_number }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { DoctorContent } from '~/composables/useApi';

// Support both legacy static doctor data and new API data
interface LegacyDoctor {
  id: number;
  name: string;
  specialist: string;
  rating: number;
  photo: string;
  badge: string;
  badgeColor: string;
}

// Union type for backward compatibility
type DoctorType = LegacyDoctor | DoctorContent;

const props = defineProps<{
  doctor: DoctorType;
}>();

// Use getDoctorImageUrl if available
const { getDoctorImageUrl } = useDoctors();

const imageError = ref(false);
const fallbackImage = '/images/doctors/doctor2.png';

// Computed properties to handle both data formats
const doctorName = computed(() => {
  if ('name' in props.doctor) {
    return props.doctor.name;
  }
  return props.doctor.doctor_name || `Doctor ${props.doctor.id}`;
});

const doctorSpecialist = computed(() => {
  if ('specialist' in props.doctor) {
    return props.doctor.specialist;
  }
  return (
    props.doctor.description || props.doctor.title || 'Kedokteran Gigi Umum'
  );
});

const doctorRating = computed(() => {
  if ('rating' in props.doctor) {
    return props.doctor.rating;
  }
  return null; // API data doesn't include ratings yet
});

const doctorBadge = computed(() => {
  if ('badge' in props.doctor) {
    return props.doctor.badge;
  }
  return props.doctor.title || 'Dokter Gigi';
});

const doctorCredentials = computed(() => {
  if ('ihs_number' in props.doctor) {
    return {
      ihs_number: props.doctor.ihs_number,
      str_number: props.doctor.str_number,
      s_ip_number: props.doctor.s_ip_number,
    };
  }
  return null;
});

const doctorImageUrl = computed(() => {
  if (imageError.value) {
    return fallbackImage;
  }

  if ('photo' in props.doctor) {
    return props.doctor.photo;
  }

  // Use API image endpoint if doctor has API data
  if ('doctor_id' in props.doctor) {
    return getDoctorImageUrl(props.doctor.id);
  }

  return fallbackImage;
});

const handleImageError = () => {
  imageError.value = true;
};
</script>

<style scoped></style>
