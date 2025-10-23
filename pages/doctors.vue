<template>
  <div>
    <BaseBreadcrumb />
    <div class="container mt-14">
      <h1 class="sr-only">List Dokter</h1>
      <div class="flex justify-between items-center mb-10">
        <p class="text-regular-light text-neutral-60">
          Menampilkan 1-10 of 170 hasil
        </p>
        <div class="flex flex-1 gap-x-3.5 justify-end">
          <v-text-field
            v-model="searchQuery"
            class="!max-w-[20.5rem] !w-full"
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

      <div class="grid grid-cols-4 gap-10">
        <DoctorCard
          v-for="doctor in paginatedDoctors"
          :key="doctor.id"
          :doctor="doctor"
        />
      </div>

      <div class="mt-10 flex gap-x-3">
        <v-btn class="!size-16">
          <IconRightArrow size="16" class="rotate-180" />
        </v-btn>
        <v-btn class="!size-16">
          <IconRightArrow size="16" />
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useHead } from '#imports';

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

// Search handler
const handleSearch = () => {
  currentPage.value = 1; // Reset to first page on new search
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

const totalDoctors = computed(() => filteredDoctors.value.length);
const totalPages = computed(() =>
  Math.ceil(filteredDoctors.value.length / itemsPerPage)
);

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage + 1);
const endIndex = computed(() =>
  Math.min(currentPage.value * itemsPerPage, totalDoctors.value)
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
