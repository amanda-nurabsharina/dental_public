<template>
  <section class="doctors-section py-16">
    <!-- Section Badge -->
    <div class="text-center mb-4">
      <v-chip color="primary-20" class="px-4 py-2" variant="flat">
        <span class="text-primary text-body-2">Dokter Kami</span>
      </v-chip>
    </div>

    <!-- Section Heading -->
    <h2 class="text-h3 text-center font-weight-bold mb-4 text-black">
      Tim Dokter Spesialis Terpercaya
    </h2>

    <!-- Section Description -->
    <p
      class="text-body-1 text-grey-darken-1 text-center mb-16 max-w-lg mx-auto"
    >
      Didukung oleh tim medis berpengalaman dan berlisensi yang siap memberikan
      pelayanan terbaik sesuai kebutuhan Anda.
    </p>

    <!-- Doctors Grid -->
    <v-row class="doctors-grid">
      <v-col
        v-for="(doctor, index) in doctors"
        :key="index"
        cols="12"
        sm="6"
        md="3"
        class="d-flex"
      >
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
      </v-col>
    </v-row>

    <!-- View All Button -->
    <div class="text-center mt-12">
      <v-btn
        variant="outlined"
        color="primary"
        size="large"
        to="/doctors"
        class="px-8 text-none rounded-xl"
        elevation="0"
      >
        Lihat Semua Dokter
      </v-btn>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: "DoctorsSection",
});

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
    id: 5,
    name: "drg. Michael Tanoto, Sp.Ort",
    specialist:
      "Spesialis ortodonti dengan keahlian khusus pada perawatan gigi yang tidak rata",
    rating: 4.8,
    photo: "/images/doctors/michael.png",
    badge: "Ortodontis",
    badgeColor: "green-lighten-5",
  },
  {
    id: 6,
    name: "drg. Lisa Permata, Sp.KG",
    specialist: "Ahli perawatan saluran akar dan rehabilitasi gigi yang rusak",
    rating: 4.7,
    photo: "/images/doctors/michael.png",
    badge: "Konservasi Gigi",
    badgeColor: "green-lighten-5",
  },
  {
    id: 7,
    name: "drg. Sarah Wijaya",
    specialist:
      "Dokter gigi umum dengan 10+ tahun pengalaman dalam perawatan gigi keluarga",
    rating: 4.9,
    photo: "/images/doctors/michael.png",
    badge: "Dokter Umum",
    badgeColor: "green-lighten-5",
  },
  {
    id: 8,
    name: "drg. Ahmad Rizki, Sp.BM",
    specialist: "Spesialis bedah mulut untuk pencabutan dan implant gigi",
    rating: 4.8,
    photo: "/images/doctors/michael.png",
    badge: "Bedah Mulut",
    badgeColor: "green-lighten-5",
  },
];
</script>

<style scoped>
.doctors-section {
  background-color: white;
}

.max-w-lg {
  max-width: 640px;
}

.doctors-grid {
  --gap: 24px;
  margin: calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap));
  width: calc(100% + var(--gap));
}

.doctors-grid > [class*="col-"] {
  padding: var(--gap) 0 0 var(--gap);
}

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

/* Responsive adjustments */
@media (max-width: 959px) {
  .doctors-grid {
    --gap: 20px;
  }
}

@media (max-width: 599px) {
  .doctors-grid {
    --gap: 16px;
  }
}
</style>
