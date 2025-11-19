<template>
  <div
    v-if="shouldDisplayDoctorDetails"
    class="col-span-full p-6 rounded-2xl flex flex-col md:flex-row w-full gap-6 border border-grey-200 mb-7"
  >
    <div
      class="md:max-w-[16.625rem] w-full aspect-[740/493] rounded-[1.25rem] overflow-hidden bg-grey-100 flex items-center justify-center"
    >
      <div
        v-if="isLoading"
        class="h-full w-full animate-pulse bg-grey-200"
      ></div>
      <img
        v-else
        :src="doctorImageUrl"
        :alt="`Foto ${doctorName}`"
        :width="fallbackImageDimensions.width"
        :height="fallbackImageDimensions.height"
        class="w-full h-full object-cover object-center"
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
      <div v-if="isLoading" class="text-regular-normal text-grey-700">
        Sedang memuat jadwal praktek dokter...
      </div>
      <div
        v-else-if="!props.doctorId"
        class="text-regular-normal text-grey-700"
      >
        Pilih dokter untuk melihat jadwal praktek.
      </div>
      <div v-else-if="hasSchedules" class="space-y-2">
        <div
          v-for="(schedule, index) in activeSchedules"
          :key="`${schedule.day_of_week}-${index}`"
          class="flex justify-between items-center py-2 border-b border-grey-100 last:border-b-0"
        >
          <span class="text-grey-700">
            {{ formatDayLabel(schedule.day_of_week) }}
          </span>
          <span class="text-regular-semibold text-green-600">
            {{ formatScheduleRange(schedule) }}
          </span>
        </div>
      </div>
      <p v-else class="text-regular-normal text-grey-500">
        Jadwal praktek belum tersedia.
      </p>
      <p v-if="errorMessage" class="text-sm text-red-500">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { DoctorContent, DoctorSchedule } from '~/composables/useApi';

const props = defineProps<{
  doctorId?: string | null;
}>();

const { fetchDoctorById, getDoctorImageUrl } = useDoctors();

const isLoading = ref(false);
const doctorDetails = ref<DoctorContent | null>(null);
const errorMessage = ref('');
const imageError = ref(false);
const fallbackImage = '/images/doctors/doctor-mascot.webp';
const fallbackImageDimensions = {
  width: 740,
  height: 493,
};
const shouldDisplayDoctorDetails = computed(() => Boolean(props.doctorId));
const EMPTY_PLACEHOLDER = '-';

const getValueOrPlaceholder = (...values: Array<string | null | undefined>) => {
  for (const value of values) {
    const trimmed = value?.toString().trim();
    if (trimmed) {
      return trimmed;
    }
  }
  return EMPTY_PLACEHOLDER;
};

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

const doctorTitle = computed(() =>
  getValueOrPlaceholder(
    doctorDetails.value?.title,
    doctorDetails.value?.doctor_name
  )
);

const doctorName = computed(() =>
  getValueOrPlaceholder(
    doctorDetails.value?.doctor_name,
    doctorDetails.value?.title
  )
);

const doctorDescription = computed(() =>
  getValueOrPlaceholder(doctorDetails.value?.description)
);

type DoctorContentWithRating = DoctorContent & { rating?: number | string };

const doctorRating = computed(() => {
  const ratingSource = doctorDetails.value as DoctorContentWithRating | null;
  if (!ratingSource?.rating) {
    return '';
  }

  const numericRating =
    typeof ratingSource.rating === 'number'
      ? ratingSource.rating
      : Number.parseFloat(String(ratingSource.rating).replace(',', '.').trim());

  if (Number.isNaN(numericRating)) {
    return '';
  }

  return numericRating.toFixed(1);
});

const activeSchedules = computed<DoctorSchedule[]>(
  () =>
    doctorDetails.value?.schedules?.filter((schedule) => schedule.is_active) ??
    []
);
const hasSchedules = computed(() => activeSchedules.value.length > 0);

const formatDayLabel = (day?: string) => mapDay(day);

const formatScheduleRange = (schedule: DoctorSchedule) => {
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

  return shifts.length ? shifts.join(' | ') : 'Jam belum ditentukan';
};
const doctorImageUrl = computed(() => {
  if (imageError.value) {
    return fallbackImage;
  }

  if (doctorDetails.value?.id) {
    return getDoctorImageUrl(doctorDetails.value.id);
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
  doctorDetails.value = null;

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
