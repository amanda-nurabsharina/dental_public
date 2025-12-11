<template>
  <div>
    <BaseBreadcrumb />
    <div class="container mt-14 mb-16">
      <h1 class="sr-only">List Dokter</h1>
      <div
        class="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-10 gap-y-4"
      >
        <p class="text-regular-light text-neutral-60">
          {{ resultSummary }}
        </p>
        <div class="flex flex-col md:flex-row w-full flex-1 gap-3.5 lg:justify-end grow">
          <v-select
            v-model="selectedBranch"
            :items="branches"
            item-title="name"
            item-value="id"
            placeholder="Pilih Cabang"
            class="md:max-w-[15rem] w-full"
            variant="outlined"
            density="comfortable"
            hide-details
            clearable
            bg-color="white"
            color="primary"
          />
          <v-text-field
            v-model="searchQuery"
            class="lg:!max-w-[20.5rem] !w-full"
            placeholder="Ketikan kata kunci mu..."
            color="grey-200"
            outlined
            clearable
            hide-details
            @keyup.enter="handleSearch"
          >
            <template #prepend-inner>
              <IconSearch size="16" class="text-secondary-1" />
            </template>
          </v-text-field>
          <v-btn
            size="x-large"
            style="box-shadow: 4px 15px 100px 0px rgba(0, 146, 69, 0.25)"
            @click="handleSearch"
            >Cari Dokter</v-btn
          >
        </div>
      </div>

      <div v-if="loadError" class="mb-6">
        <v-alert type="error" variant="tonal">
          {{ loadError }}
        </v-alert>
      </div>

      <div v-else-if="isLoading" class="flex justify-center py-16">
        <v-progress-circular indeterminate color="primary" size="48" />
      </div>

      <div
        v-else-if="!paginatedDoctors.length"
        class="py-16 text-center text-gray-500"
      >
        Tidak ada dokter ditemukan.
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-10"
      >
        <DoctorCard
          v-for="doctor in paginatedDoctors"
          :key="doctor.id"
          :doctor="doctor"
          @click="handleDoctorClick"
        />
      </div>

      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        rounded="circle"
        :total-visible="6"
        color="black"
        variant="text"
        active-color="primary"
      >
        <template #prev>
          <v-btn
            class="!size-12"
            :variant="currentPage === 1 ? 'text' : 'outlined'"
            :class="[currentPage === 1 ? '!bg-grey-100' : '!border-grey-200']"
            :ripple="currentPage !== 1"
            @click="goToPreviousPage"
          >
            <IconRightArrowSlim
              size="16"
              class="rotate-180"
              :class="[currentPage === 1 ? 'text-grey-300' : 'text-black']"
            />
          </v-btn>
        </template>
        <template #next>
          <v-btn
            class="!size-12"
            :variant="currentPage === totalPages ? 'text' : 'outlined'"
            :class="[
              currentPage === totalPages ? '!bg-grey-100' : '!border-grey-200',
            ]"
            :ripple="currentPage !== totalPages"
            @click="goToNextPage"
          >
            <IconRightArrowSlim
              size="16"
              :class="[
                currentPage === totalPages ? 'text-grey-300' : 'text-black',
              ]"
            />
          </v-btn>
        </template>
      </v-pagination>
    </div>

    <!-- Doctor Details Modal -->
    <v-dialog v-model="showDoctorModal" max-width="822">
      <div
        v-if="selectedDoctor"
        class="rounded-xl overflow-auto !bg-white p-6 md:py-11 md:px-14"
      >
        <div class="flex flex-col md:flex-row gap-8">
          <div
            class="w-full md:w-[18.5rem] md:min-w-[20rem] md:max-w-[20rem] aspect-[265/376] rounded-2xl overflow-hidden mx-auto md:mx-0 flex-shrink-0"
          >
            <img
              :src="modalDoctorPhoto"
              :alt="modalDoctorName"
              :width="fallbackImageDimensions.width"
              :height="fallbackImageDimensions.height"
              class="w-full h-full object-cover object-center"
              @error="modalImageError = true"
            />
          </div>
          <div class="space-y-6">
            <div class="space-y-4">
              <div class="space-y-2">
                <div class="text-regular-bold text-primary">
                  {{ modalDoctorBadge }}
                </div>
                <div class="heading-5">
                  {{ modalDoctorName }}
                  <span v-if="selectedDoctor?.branch_name" class="ml-2 text-sm text-gray-500 font-normal">
                    ({{ selectedDoctor.branch_name }})
                  </span>
                </div>
                <p class="text-regular-normal">
                  {{
                    modalDoctorSpecialist ||
                    'Informasi deskripsi dokter belum tersedia.'
                  }}
                </p>
              </div>

              <!-- <div v-if="modalDoctorEmail" class="text-sm text-gray-600">
                Email:
                <a
                  class="text-primary underline"
                  :href="`mailto:${modalDoctorEmail}`"
                >
                  {{ modalDoctorEmail }}
                </a>
              </div> -->

              <!-- <div
                v-if="modalDoctorCredentials.length"
                class="space-y-1 text-sm text-gray-600"
              >
                <div
                  v-for="credential in modalDoctorCredentials"
                  :key="credential.label"
                  class="flex items-center gap-x-2"
                >
                  <span class="font-medium text-gray-700">
                    {{ credential.label }}:
                  </span>
                  <span>{{ credential.value }}</span>
                </div>
              </div> -->

              <!-- <div v-if="modalDoctorFee" class="text-sm text-gray-600">
                Fee Persentase:
                <span class="font-medium text-gray-800">
                  {{ modalDoctorFee }}
                </span>
              </div> -->
            </div>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">
                  Jadwal Praktek
                </h3>
                <v-chip
                  :color="isDoctorActive ? 'green' : 'red'"
                  variant="tonal"
                  size="small"
                  class="font-semibold"
                >
                  {{ isDoctorActive ? 'Aktif' : 'Tidak Aktif' }}
                </v-chip>
              </div>

              <div v-if="hasSchedules" class="space-y-2">
                <div
                  v-for="(schedule, index) in modalDoctorSchedules"
                  :key="`${schedule.day_of_week}-${index}`"
                  class="flex justify-between items-center py-2"
                >
                  <span class="text-gray-700">
                    {{ formatDayLabel(schedule.day_of_week) }}
                  </span>
                  <span class="font-semibold text-green-600">
                    {{ formatScheduleRange(schedule) }}
                  </span>
                </div>
              </div>
              <p v-else class="text-sm text-gray-500">Jadwal belum tersedia.</p>
            </div>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useSeoMeta } from '#imports';
import type { DoctorContent, DoctorSchedule } from '~/composables/useApi';

const { fetchMultiBranchDoctors, getDoctorImageUrl } = useDoctors();
const { fetchBranches } = useBranches();

// Pagination & search state
const DEFAULT_LIMIT = 12;
const searchQuery = ref('');
const appliedSearch = ref('');
const currentPage = ref(1);

// Filter state
const branches = ref<any[]>([]);
const selectedBranch = ref<string | null>(null);

// Data state
const doctorContents = ref<DoctorContent[]>([]);
const totalDoctors = ref(0);
const isLoading = ref(false);
const loadError = ref<string | null>(null);

// Modal state
const showDoctorModal = ref(false);
const selectedDoctor = ref<DoctorContent | null>(null);
const modalImageError = ref(false);

const loadBranches = async () => {
  try {
    const data = await fetchBranches();
    branches.value = data;
  } catch (error) {
    console.error('Error fetching branches:', error);
  }
};

const fetchDoctors = async () => {
  isLoading.value = true;
  loadError.value = null;

  try {
    const response = await fetchMultiBranchDoctors(
      appliedSearch.value,
      currentPage.value,
      DEFAULT_LIMIT,
      selectedBranch.value || undefined
    );

    doctorContents.value = response.data || [];
    totalDoctors.value = response.total;
  } catch (error) {
    console.error('Error fetching doctor contents:', error);
    loadError.value =
      error instanceof Error
        ? error.message
        : 'Gagal memuat data dokter. Silakan coba lagi.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadBranches();
  fetchDoctors();
});

watch([currentPage, selectedBranch], ([newPage, newBranch], [oldPage, oldBranch]) => {
  if (newPage !== oldPage || newBranch !== oldBranch) {
    if (newBranch !== oldBranch) currentPage.value = 1;
    fetchDoctors();
  }
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(totalDoctors.value / DEFAULT_LIMIT))
);

const paginatedDoctors = computed(() => doctorContents.value);

const resultSummary = computed(() => {
  if (!doctorContents.value.length) {
    return totalDoctors.value
      ? `Menampilkan 0 dari ${totalDoctors.value} hasil`
      : 'Tidak ada hasil';
  }

  const start = (currentPage.value - 1) * DEFAULT_LIMIT + 1;
  const end = start + doctorContents.value.length - 1;

  return `Menampilkan ${start}-${end} dari ${totalDoctors.value} hasil`;
});

const handleSearch = () => {
  const normalizedQuery = searchQuery.value.trim();

  if (normalizedQuery === appliedSearch.value && currentPage.value === 1) {
    return;
  }

  appliedSearch.value = normalizedQuery;
  currentPage.value = 1;
  fetchDoctors();
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const handleDoctorClick = (doctor: DoctorContent) => {
  selectedDoctor.value = doctor;
  modalImageError.value = false;
  showDoctorModal.value = true;
};

watch(showDoctorModal, (isOpen) => {
  if (!isOpen) {
    selectedDoctor.value = null;
    modalImageError.value = false;
  }
});

const modalDoctorName = computed(() => selectedDoctor.value?.doctor_name ?? '');
const modalDoctorSpecialist = computed(
  () => selectedDoctor.value?.description ?? ''
);
const modalDoctorBadge = computed(
  () => selectedDoctor.value?.title ?? 'Dokter Gigi'
);
const modalDoctorEmail = computed(
  () => selectedDoctor.value?.doctor_email ?? ''
);
const fallbackImage = '/images/doctors/doctor-mascot.webp';
const fallbackImageDimensions = {
  width: 493,
  height: 740,
};
const modalDoctorPhoto = computed(() => {
  if (!selectedDoctor.value || modalImageError.value) {
    return fallbackImage;
  }
  return getDoctorImageUrl(selectedDoctor.value.id);
});
const modalDoctorSchedules = computed<DoctorSchedule[]>(() =>
  (selectedDoctor.value?.schedules ?? []).filter(
    (schedule) => schedule.is_active
  )
);

const modalDoctorCredentials = computed(() => {
  if (!selectedDoctor.value) {
    return [];
  }

  return [
    {
      label: 'IHS',
      value: selectedDoctor.value.ihs_number,
    },
    {
      label: 'STR',
      value: selectedDoctor.value.str_number,
    },
    {
      label: 'SIP',
      value: selectedDoctor.value.sip_number,
    },
  ].filter((credential) => credential.value);
});

const modalDoctorFee = computed(() => {
  if (
    !selectedDoctor.value ||
    selectedDoctor.value.fee_percentage === undefined ||
    selectedDoctor.value.fee_percentage === null
  ) {
    return null;
  }

  return `${selectedDoctor.value.fee_percentage}%`;
});

const hasSchedules = computed(() => modalDoctorSchedules.value.length > 0);

const isDoctorActive = computed(() => selectedDoctor.value?.is_active ?? false);

const formatDayLabel = (dayOfWeek: string) => {
  const dayMap: Record<string, string> = {
    monday: 'Senin',
    tuesday: 'Selasa',
    wednesday: 'Rabu',
    thursday: 'Kamis',
    friday: 'Jumat',
    saturday: 'Sabtu',
    sunday: 'Minggu',
  };

  return dayMap[dayOfWeek?.toLowerCase()] ?? dayOfWeek;
};

const formatScheduleRange = (schedule: DoctorSchedule) => {
  const shift1 =
    schedule.shift1_start && schedule.shift1_end
      ? `${schedule.shift1_start} - ${schedule.shift1_end}`
      : null;
  const shift2 =
    schedule.shift2_start && schedule.shift2_end
      ? `${schedule.shift2_start} - ${schedule.shift2_end}`
      : null;

  if (shift1 && shift2) {
    return `${shift1} | ${shift2}`;
  }

  return shift1 ?? shift2 ?? 'Tidak tersedia';
};

useSeoMeta({
  title: 'Dokter Kami - Dental Reservation',
  description:
    'Tim dokter spesialis terpercaya kami siap memberikan pelayanan terbaik untuk kesehatan gigi Anda.',
});
</script>

<style scoped>
.page-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}

.content-wrapper {
  width: 100%;
  padding: 0 60px;
}

/* Responsive adjustments */
@media (max-width: 1560px) {
  .page-container {
    max-width: 1280px;
  }
}

@media (max-width: 1360px) {
  .page-container {
    max-width: 1120px;
  }
}

.doctors-page {
  background-color: white;
  min-height: 100vh;
}

.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 14px;
  background-color: var(--v-primary-20-base);
}

.breadcrumb a:hover {
  color: var(--v-primary-base) !important;
}

.search-section {
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); */
}

.search-button {
  height: 48px !important;
  border-radius: 8px;
}

.doctors-grid {
  --gap: 24px;
  margin: calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap));
  width: calc(100% + var(--gap));
}

.doctors-grid > [class*='col-'] {
  padding: var(--gap) 0 0 var(--gap);
}

/* Responsive adjustments */
@media (max-width: 959px) {
  .doctors-grid {
    --gap: 20px;
  }

  .search-section {
    flex-direction: column;
  }

  .search-input {
    max-width: 100%;
    margin-bottom: 16px;
  }

  .search-button {
    width: 100%;
  }
}

@media (max-width: 599px) {
  .doctors-grid {
    --gap: 16px;
  }
}
</style>
