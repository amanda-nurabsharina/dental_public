<template>
  <div>
    <BaseBreadcrumb />
    <div class="container mt-14 mb-16">
      <h1 class="sr-only">List Dokter</h1>
      <div
        class="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-10"
      >
        <p class="text-regular-light text-neutral-60">
          Menampilkan 1-10 of 170 hasil
        </p>
        <div class="flex w-full flex-1 gap-x-3.5 lg:justify-end grow">
          <v-text-field
            v-model="searchQuery"
            class="lg:!max-w-[20.5rem] !w-full !flex-1"
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

      <div
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
        v-model="page"
        :length="length"
        rounded="circle"
        :total-visible="6"
        color="black"
        variant="text"
        active-color="primary"
      >
        <template #prev>
          <v-btn
            class="!size-12"
            :variant="page === 1 ? 'text' : 'outlined'"
            :class="[page === 1 ? '!bg-grey-100' : '!border-grey-200']"
            :ripple="page !== 1"
            @click="goToPreviousPage"
          >
            <IconRightArrowSlim
              size="16"
              class="rotate-180"
              :class="[page === 1 ? 'text-grey-300' : 'text-black']"
            />
          </v-btn>
        </template>
        <template #next>
          <v-btn
            class="!size-12"
            :variant="page === length ? 'text' : 'outlined'"
            :class="[page === length ? '!bg-grey-100' : '!border-grey-200']"
            :ripple="page !== length"
            @click="goToNextPage"
          >
            <IconRightArrowSlim
              size="16"
              :color-class="page === length ? 'text-grey-300' : 'text-black'"
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
            class="min-w-[16.625rem] min-h-[23.5rem] rounded-2xl overflow-hidden"
          >
            <img
              :src="modalDoctorPhoto"
              :alt="modalDoctorName"
              class="w-full h-full object-cover object-center"
            />
          </div>
          <div class="space-y-6">
            <div class="space-y-2">
              <div class="text-regular-bold text-primary">
                {{ modalDoctorBadge }}
              </div>
              <div class="heading-5">
                {{ modalDoctorName }}
              </div>
              <p class="text-regular-normal">
                Ahli perawatan saluran akar dan estetik dental dengan pendekatan
                minimal invasive terkini.
              </p>
              <div class="flex gap-x-2 items-center">
                <IconStar />
                <span class="text-regular-normal">
                  {{ modalDoctorRating }}
                </span>
              </div>
            </div>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">
                  Jadwal Praktek
                </h3>
                <v-chip
                  color="red"
                  variant="tonal"
                  size="small"
                  class="font-semibold text-red-700"
                >
                  Tidak Tersedia
                </v-chip>
              </div>

              <!-- Schedule Items -->
              <div class="space-y-2">
                <div class="flex justify-between items-center py-2">
                  <span class="text-gray-700">Senin - Sabtu</span>
                  <span class="font-semibold text-green-600"
                    >08:00 - 12:00</span
                  >
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="text-gray-700">Minggu</span>
                  <span class="font-semibold text-green-600"
                    >18:00 - 22:00</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useHead } from '#imports';
import IconStar from '@/components/Icon/IconStar.vue';
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

// Using the same doctor data structure from DoctorsSection
const doctors = [
  {
    id: 1,
    name: 'drg. Michael Tanoto, Sp.Ort',
    specialist:
      'Spesialis ortodonti dengan keahlian khusus pada perawatan gigi yang tidak rata',
    rating: 4.8,
    photo: '/images/doctors/michael.png',
    badge: 'Ortodontis',
    badgeColor: 'green-lighten-5',
  },
  {
    id: 2,
    name: 'drg. Lisa Permata, Sp.KG',
    specialist: 'Ahli perawatan saluran akar dan rehabilitasi gigi yang rusak',
    rating: 4.7,
    photo: '/images/doctors/michael.png',
    badge: 'Konservasi Gigi',
    badgeColor: 'green-lighten-5',
  },
  {
    id: 3,
    name: 'drg. Sarah Wijaya',
    specialist:
      'Dokter gigi umum dengan 10+ tahun pengalaman dalam perawatan gigi keluarga',
    rating: 4.9,
    photo: '/images/doctors/michael.png',
    badge: 'Dokter Umum',
    badgeColor: 'green-lighten-5',
  },
  {
    id: 4,
    name: 'drg. Ahmad Rizki, Sp.BM',
    specialist: 'Spesialis bedah mulut untuk pencabutan dan implant gigi',
    rating: 4.8,
    photo: '/images/doctors/michael.png',
    badge: 'Bedah Mulut',
    badgeColor: 'green-lighten-5',
  },
  {
    id: 1,
    name: 'drg. Michael Tanoto, Sp.Ort',
    specialist:
      'Spesialis ortodonti dengan keahlian khusus pada perawatan gigi yang tidak rata',
    rating: 4.8,
    photo: '/images/doctors/michael.png',
    badge: 'Ortodontis',
    badgeColor: 'green-lighten-5',
  },
  {
    id: 2,
    name: 'drg. Lisa Permata, Sp.KG',
    specialist: 'Ahli perawatan saluran akar dan rehabilitasi gigi yang rusak',
    rating: 4.7,
    photo: '/images/doctors/michael.png',
    badge: 'Konservasi Gigi',
    badgeColor: 'green-lighten-5',
  },
  {
    id: 3,
    name: 'drg. Sarah Wijaya',
    specialist:
      'Dokter gigi umum dengan 10+ tahun pengalaman dalam perawatan gigi keluarga',
    rating: 4.9,
    photo: '/images/doctors/michael.png',
    badge: 'Dokter Umum',
    badgeColor: 'green-lighten-5',
  },
  {
    id: 4,
    name: 'drg. Ahmad Rizki, Sp.BM',
    specialist: 'Spesialis bedah mulut untuk pencabutan dan implant gigi',
    rating: 4.8,
    photo: '/images/doctors/michael.png',
    badge: 'Bedah Mulut',
    badgeColor: 'green-lighten-5',
  },
];

// Search and pagination states
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 8;

// Modal states
const showDoctorModal = ref(false);
const selectedDoctor = ref<DoctorType | null>(null);

// Search handler
const handleSearch = () => {
  currentPage.value = 1; // Reset to first page on new search
};

// Modal handlers
const handleDoctorClick = (doctor: DoctorType) => {
  selectedDoctor.value = doctor;
  showDoctorModal.value = true;
};

const closeDoctorModal = () => {
  showDoctorModal.value = false;
  selectedDoctor.value = null;
};

// Computed properties for handling both doctor types
const modalDoctorName = computed(() => {
  if (!selectedDoctor.value) return '';
  // Check if it's LegacyDoctor (has 'name' property)
  if ('name' in selectedDoctor.value) {
    return selectedDoctor.value.name;
  }
  // It's DoctorContent (has 'doctor_name' property)
  return selectedDoctor.value.doctor_name;
});

const modalDoctorSpecialist = computed(() => {
  if (!selectedDoctor.value) return '';
  // Check if it's LegacyDoctor (has 'specialist' property)
  if ('specialist' in selectedDoctor.value) {
    return selectedDoctor.value.specialist;
  }
  // It's DoctorContent (has 'description' property)
  return selectedDoctor.value.description;
});

const modalDoctorPhoto = computed(() => {
  if (!selectedDoctor.value) return '/images/doctors/doctor2.png';
  // Check if it's LegacyDoctor (has 'photo' property)
  if ('photo' in selectedDoctor.value) {
    return selectedDoctor.value.photo;
  }
  // It's DoctorContent - use default for now
  return '/images/doctors/doctor2.png';
});

const modalDoctorBadge = computed(() => {
  if (!selectedDoctor.value) return 'Dokter Gigi';
  // Check if it's LegacyDoctor (has 'badge' property)
  if ('badge' in selectedDoctor.value) {
    return selectedDoctor.value.badge;
  }
  // It's DoctorContent - use title or default
  return selectedDoctor.value.title || 'Dokter Gigi';
});

const modalDoctorRating = computed(() => {
  if (!selectedDoctor.value) return null;
  // Check if it's LegacyDoctor (has 'rating' property)
  if ('rating' in selectedDoctor.value) {
    return selectedDoctor.value.rating;
  }
  // It's DoctorContent - no rating available
  return null;
});

// Pagination handlers
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Computed properties for filtered and paginated data
const filteredDoctors = computed(() => {
  return doctors.filter((doctor) => {
    const searchTerm = searchQuery.value.toLowerCase();
    return searchTerm
      ? doctor.name.toLowerCase().includes(searchTerm) ||
          doctor.specialist.toLowerCase().includes(searchTerm) ||
          doctor.badge.toLowerCase().includes(searchTerm)
      : true;
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredDoctors.value.length / itemsPerPage)
);

const paginatedDoctors = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredDoctors.value.slice(start, end);
});

// Meta
useHead({
  title: 'Dokter Kami - Dental Reservation',
  meta: [
    {
      name: 'description',
      content:
        'Tim dokter spesialis terpercaya kami siap memberikan pelayanan terbaik untuk kesehatan gigi Anda.',
    },
  ],
});

const page = ref(1);
const length = ref(21);
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
