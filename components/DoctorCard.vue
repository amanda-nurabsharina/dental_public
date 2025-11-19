<template>
  <div
    class="group cursor-pointer hover:-translate-y-1 transition-transform duration-200"
  >
    <div class="rounded-lg p-1" @click="handleClick">
      <!-- Use API image if available, otherwise fallback to static -->
      <div class="h-[24rem] w-full mb-4 overflow-hidden rounded-lg">
        <img
          :src="doctorImageUrl"
          :alt="`Photo of ${doctorName}`"
          :width="fallbackImageDimensions.width"
          :height="fallbackImageDimensions.height"
          class="h-full w-full rounded-lg object-cover group-hover:scale-110 transition-transform duration-500"
          @error="handleImageError"
        />
      </div>
      <div class="space-y-2">
        <small class="text-regular-bold text-secondary-2">{{
          doctorBadge
        }}</small>
        <div class="heading-6 lg:heading-5 text-[#161C2D]">
          {{ doctorName }}
        </div>
        <p class="text-small-normal lg:text-regular-normal">
          {{ doctorSpecialist }}
        </p>
        <div v-if="doctorRating" class="flex items-center gap-x-2">
          <IconStar />
          <span class="text-grey-600 text-regular-medium">
            {{ doctorRating }}
          </span>
        </div>
        <!-- Show doctor credentials if available from API -->
        <!-- <div v-if="doctorCredentials" class="space-y-1 text-xs text-gray-600">
          <div v-if="doctorCredentials.ihs_number">
            IHS: {{ doctorCredentials.ihs_number }}
          </div>
          <div v-if="doctorCredentials.str_number">
            STR: {{ doctorCredentials.str_number }}
          </div>
        </div> -->
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

// Define emits
const emit = defineEmits<{
  click: [doctor: DoctorType];
}>();

// Click handler
const handleClick = () => {
  emit('click', props.doctor);
};

// Use getDoctorImageUrl if available
const { getDoctorImageUrl } = useDoctors();

const imageError = ref(false);
const fallbackImage = '/images/doctors/doctor-mascot.webp';
const fallbackImageDimensions = {
  width: 740,
  height: 493,
};
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
