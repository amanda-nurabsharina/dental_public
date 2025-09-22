<template>
  <div class="doctors-page py-8">
    <div class="page-container content-wrapper">
      <!-- Breadcrumb -->
      <div class="breadcrumb mb-8">
        <NuxtLink to="/" class="text-grey-darken-1 text-decoration-none">
          Beranda
        </NuxtLink>
        <span class="mx-2 text-grey-darken-1">&gt;</span>
        <span class="text-primary">Dokter</span>
      </div>

      <div class="search-section d-flex justify-space-between">
        <!-- Results Info -->
        <div class="d-flex justify-space-between align-center mb-6">
          <p class="text-grey-darken-1">
            {{ startIndex }} - {{ endIndex }} dari {{ totalDoctors }} hasil
          </p>
        </div>
        <!-- Search Section -->
        <div class="d-flex align-center mb-8">
          <v-text-field
            v-model="searchQuery"
            placeholder="Ketikan kata kunci..."
            variant="outlined"
            density="comfortable"
            hide-details
            class="search-input me-4"
            @keyup.enter="handleSearch"
          >
            <template #append-inner>
              <v-icon color="grey">mdi-magnify</v-icon>
            </template>
          </v-text-field>
          <v-btn
            color="primary"
            size="large"
            class="search-button px-8"
            @click="handleSearch"
          >
            Cari Dokter
          </v-btn>
        </div>
      </div>

      <!-- Doctors Grid -->
      <div v-if="paginatedDoctors.length > 0">
        <v-row class="doctors-grid">
          <v-col
            v-for="doctor in paginatedDoctors"
            :key="doctor.id"
            cols="12"
            sm="6"
            md="3"
            class="d-flex"
          >
            <DoctorCard :doctor="doctor" />
          </v-col>
        </v-row>

        <!-- Pagination -->
        <div class="d-flex justify-center mt-8">
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="7"
            rounded="lg"
          />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <v-icon
          icon="mdi-doctor"
          size="64"
          color="grey-lighten-1"
          class="mb-4"
        />
        <h3 class="text-h6 text-grey-darken-1 mb-2">
          Tidak ada dokter yang ditemukan
        </h3>
        <p class="text-body-2 text-grey">Coba ubah kata kunci pencarian Anda</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from "vue";
import { useHead } from "#imports";

// Import components
const DoctorCard = defineAsyncComponent(
  () => import("../../components/doctors/DoctorCard.vue")
);

// Using the same doctor data structure from DoctorsSection
const doctors = [
  {
    id: 1,
    name: "drg. Michael Tanoto, Sp.Ort",
    specialist:
      "Spesialis ortodonti dengan keahlian khusus pada perawatan gigi yang tidak rata",
    rating: 4.8,
    photo: "/images/doctors/michael.png",
    badge: "Ortodontis",
    badgeColor: "green-lighten-5",
  },
  {
    id: 2,
    name: "drg. Lisa Permata, Sp.KG",
    specialist: "Ahli perawatan saluran akar dan rehabilitasi gigi yang rusak",
    rating: 4.7,
    photo: "/images/doctors/michael.png",
    badge: "Konservasi Gigi",
    badgeColor: "green-lighten-5",
  },
  {
    id: 3,
    name: "drg. Sarah Wijaya",
    specialist:
      "Dokter gigi umum dengan 10+ tahun pengalaman dalam perawatan gigi keluarga",
    rating: 4.9,
    photo: "/images/doctors/michael.png",
    badge: "Dokter Umum",
    badgeColor: "green-lighten-5",
  },
  {
    id: 4,
    name: "drg. Ahmad Rizki, Sp.BM",
    specialist: "Spesialis bedah mulut untuk pencabutan dan implant gigi",
    rating: 4.8,
    photo: "/images/doctors/michael.png",
    badge: "Bedah Mulut",
    badgeColor: "green-lighten-5",
  },
  {
    id: 1,
    name: "drg. Michael Tanoto, Sp.Ort",
    specialist:
      "Spesialis ortodonti dengan keahlian khusus pada perawatan gigi yang tidak rata",
    rating: 4.8,
    photo: "/images/doctors/michael.png",
    badge: "Ortodontis",
    badgeColor: "green-lighten-5",
  },
  {
    id: 2,
    name: "drg. Lisa Permata, Sp.KG",
    specialist: "Ahli perawatan saluran akar dan rehabilitasi gigi yang rusak",
    rating: 4.7,
    photo: "/images/doctors/michael.png",
    badge: "Konservasi Gigi",
    badgeColor: "green-lighten-5",
  },
  {
    id: 3,
    name: "drg. Sarah Wijaya",
    specialist:
      "Dokter gigi umum dengan 10+ tahun pengalaman dalam perawatan gigi keluarga",
    rating: 4.9,
    photo: "/images/doctors/michael.png",
    badge: "Dokter Umum",
    badgeColor: "green-lighten-5",
  },
  {
    id: 4,
    name: "drg. Ahmad Rizki, Sp.BM",
    specialist: "Spesialis bedah mulut untuk pencabutan dan implant gigi",
    rating: 4.8,
    photo: "/images/doctors/michael.png",
    badge: "Bedah Mulut",
    badgeColor: "green-lighten-5",
  },
];

// Search and pagination states
const searchQuery = ref("");
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
  title: "Dokter Kami - Dental Reservation",
  meta: [
    {
      name: "description",
      content:
        "Tim dokter spesialis terpercaya kami siap memberikan pelayanan terbaik untuk kesehatan gigi Anda.",
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

.search-input {
  max-width: 480px;
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

.doctors-grid > [class*="col-"] {
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
