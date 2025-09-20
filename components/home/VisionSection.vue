<template>
  <section class="vision-section py-16">
    <v-container>
      <!-- Section Badge -->
      <div class="text-center mb-4">
        <v-chip color="primary-20" class="px-4 py-2" variant="flat">
          <span class="text-primary text-body-2">Tentang Klinik</span>
        </v-chip>
      </div>

      <!-- Section Heading -->
      <h2 class="text-h3 text-center font-weight-bold mb-16 text-black">
        Kepercayaan Anda, Prioritas Kami
      </h2>

      <!-- Features Grid -->
      <v-row class="features-grid">
        <v-col
          v-for="(feature, index) in features"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          class="d-flex"
        >
          <v-card class="feature-card pa-6" variant="flat" width="100%">
            <div class="d-flex flex-column">
              <!-- Icon Circle -->
              <div class="icon-circle mb-6 align-self-start">
                <v-icon :icon="feature.icon" color="primary" size="24"></v-icon>
              </div>

              <!-- Content -->
              <h3 class="text-h6 font-weight-bold mb-3 text-black">
                {{ feature.title }}
              </h3>
              <p class="text-body-2 text-grey-darken-1">
                {{ feature.description }}
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: "VisionSection",
});

const features = [
  {
    icon: "mdi-doctor",
    title: "Dokter Berpengalaman",
    description:
      "Tim dokter bersertifikat, berpengalaman dengan puluhan tahun, terus update teknologi dental",
  },
  {
    icon: "mdi-medical-bag",
    title: "Fasilitas Modern",
    description:
      "Peralatan canggih (digital X-ray, laser) & sterilisasi terkini untuk kenyamanan dan keamanan",
  },
  {
    icon: "mdi-currency-usd",
    title: "Harga Terjangkau",
    description:
      "Harga kompetitif dengan promo menarik tanpa mengurangi kualitas layanan yang di hadirkan",
  },
  {
    icon: "mdi-calendar-clock",
    title: "Jadwal Fleksibel",
    description:
      "Buka 7 hari, booking online 24/7, emergency call, dan waktu tunggu minimal",
  },
  {
    icon: "mdi-account-heart",
    title: "Pelayanan Ramah",
    description:
      "Pendekatan personal, hangat, dan profesional untuk mengatasi kecemasan, khususnya untuk pasien anak",
  },
  {
    icon: "mdi-shield-check",
    title: "Hasil Terjamin",
    description:
      "Garansi perawatan dan follow-up berkala untuk hasil perawatan yang memuaskan dan tahan lama",
  },
];
</script>

<style scoped>
.vision-section {
  background-color: white;
}

.features-grid {
  --gap: 24px;
  margin: calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap));
  width: calc(100% + var(--gap));
}

.features-grid > [class*="col-"] {
  padding: var(--gap) 0 0 var(--gap);
}

.feature-card {
  background-color: transparent !important;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--v-primary-20-base);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive adjustments */
@media (max-width: 959px) {
  .features-grid {
    --gap: 20px;
  }
}

@media (max-width: 599px) {
  .features-grid {
    --gap: 16px;
  }

  .icon-circle {
    width: 40px;
    height: 40px;
  }

  .icon-circle .v-icon {
    font-size: 20px;
  }
}
</style>
