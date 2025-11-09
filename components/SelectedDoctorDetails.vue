<template>
  <div
    class="col-span-full p-6 rounded-2xl flex flex-col md:flex-row w-full gap-6 border border-grey-200 mb-7"
  >
    <div
      class="md:max-w-[8.125rem] w-full h-auto max-h-[20.5rem] rounded-[1.25rem] overflow-hidden bg-grey-100 flex items-center justify-center"
    >
      <div
        v-if="isLoading"
        class="h-full w-full animate-pulse bg-grey-200"
      ></div>
      <img
        v-else
        :src="doctorImageUrl"
        :alt="`Foto ${doctorName}`"
        class="h-full w-full object-cover object-center"
        @error="handleImageError"
      />
    </div>
    <div class="space-y-2 flex-1">
      <div class="text-small-bold text-primary">
        {{ doctorTitle }}
      </div>
      <div class="text-large-semibold">
        {{ doctorName }}
      </div>
      <p class="text-regular-normal text-grey-700">
        {{ doctorDescription }}
      </p>
      <div v-if="doctorRating" class="flex items-center gap-x-2">
        <IconStar />
        {{ doctorRating }}
      </div>
      <div class="text-regular-bold">Jadwal Praktek</div>
      <div class="text-regular-normal text-grey-700">
        {{ scheduleDisplay }}
      </div>
      <p v-if="errorMessage" class="text-sm text-red-500">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { DoctorContent } from '~/composables/useApi';

const props = defineProps<{
  doctorId?: string | null;
}>();

const { fetchDoctorById, getDoctorImageUrl } = useDoctors();

const isLoading = ref(false);
const doctorDetails = ref<DoctorContent | null>(null);
const errorMessage = ref('');
const imageError = ref(false);
const fallbackImage = '/images/doctors/doctor2.png';

const dayMap: Record<string, string> = {
  monday: 'Senin',
  tuesday: 'Selasa',
  wednesday: 'Rabu',
  thursday: 'Kamis',
  friday: 'Jumat',
  saturday: 'Sabtu',
  sunday: 'Minggu',
};

const mapDay = (day?: string) => {
  if (!day) {
    return 'Hari tidak diketahui';
  }
  const normalized = day.toLowerCase();
  return dayMap[normalized] || day;
};

const formatTime = (time?: string) => {
  if (!time) {
    return '';
  }
  return time.slice(0, 5);
};

const doctorTitle = computed(() => {
  if (doctorDetails.value?.title) {
    return doctorDetails.value.title;
  }
  if (isLoading.value) {
    return 'Memuat informasi dokter...';
  }
  return 'Detail Dokter';
});

const doctorName = computed(() => {
  if (doctorDetails.value?.doctor_name) {
    return doctorDetails.value.doctor_name;
  }
  if (!props.doctorId) {
    return 'Belum ada dokter dipilih';
  }
  return 'Detail dokter tidak tersedia';
});

const doctorDescription = computed(() => {
  if (doctorDetails.value?.description) {
    return doctorDetails.value.description;
  }
  if (isLoading.value) {
    return 'Sedang memuat detail dokter...';
  }
  return 'Silakan pilih dokter untuk melihat profil dan jadwal praktek.';
});

type DoctorContentWithRating = DoctorContent & { rating?: number | string };

const doctorRating = computed(() => {
  const ratingSource = doctorDetails.value as DoctorContentWithRating | null;
  if (!ratingSource?.rating) {
    return '';
  }

  const numericRating =
    typeof ratingSource.rating === 'number'
      ? ratingSource.rating
      : Number.parseFloat(
          String(ratingSource.rating).replace(',', '.').trim()
        );

  if (Number.isNaN(numericRating)) {
    return '';
  }

  return numericRating.toFixed(1);
});

const scheduleDisplay = computed(() => {
  const schedules = doctorDetails.value?.schedules?.filter(
    (schedule) => schedule.is_active
  );

  if (!schedules?.length) {
    return props.doctorId
      ? 'Jadwal praktek belum tersedia.'
      : 'Pilih dokter untuk melihat jadwal praktek.';
  }

  return schedules
    .map((schedule) => {
      const shifts: string[] = [];

      if (schedule.shift1_start && schedule.shift1_end) {
        shifts.push(
          `${formatTime(schedule.shift1_start)}-${formatTime(schedule.shift1_end)}`
        );
      }

      if (schedule.shift2_start && schedule.shift2_end) {
        shifts.push(
          `${formatTime(schedule.shift2_start)}-${formatTime(schedule.shift2_end)}`
        );
      }

      const shiftInfo = shifts.length ? shifts.join(', ') : 'Jam belum ditentukan';
      return `${mapDay(schedule.day_of_week)} (${shiftInfo})`;
    })
    .join(' • ');
});

const doctorImageUrl = computed(() => {
  if (imageError.value) {
    return fallbackImage;
  }

  if (doctorDetails.value?.id) {
    return getDoctorImageUrl(doctorDetails.value.id);
  }

  if (props.doctorId) {
    return getDoctorImageUrl(props.doctorId);
  }

  return fallbackImage;
});

const handleImageError = () => {
  imageError.value = true;
};

const loadDoctorDetails = async (doctorId?: string | null) => {
  if (!doctorId) {
    doctorDetails.value = null;
    errorMessage.value = '';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';
  imageError.value = false;

  try {
    doctorDetails.value = await fetchDoctorById(doctorId);
  } catch (error) {
    doctorDetails.value = null;
    errorMessage.value =
      'Gagal memuat detail dokter. Silakan coba lagi atau pilih dokter lain.';
    console.error('Failed to load doctor details', error);
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => props.doctorId,
  (newId) => {
    loadDoctorDetails(newId);
  },
  { immediate: true }
);
</script>

<style scoped></style>
