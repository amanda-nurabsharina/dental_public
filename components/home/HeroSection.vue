<template>
  <section class="hero-section py-16">
    <v-container>
      <v-row align="center">
        <!-- Left Column: Content -->
        <v-col cols="12" md="6">
          <!-- Trust Badge -->
          <div class="mb-6">
            <v-chip color="primary-20" class="px-4 py-2" variant="flat">
              <v-icon
                start
                color="primary"
                icon="mdi-shield-check"
                class="mr-2"
              />
              <span class="text-primary">Pelayanan Kesehatan Terpercaya</span>
            </v-chip>
          </div>

          <!-- Main Heading -->
          <h1 class="text-h3 font-weight-bold mb-6 text-black">
            Wujudkan Senyum Impian Anda, Bersama Kami
          </h1>

          <!-- Description -->
          <p class="text-body-1 mb-8 text-grey-darken-1">
            Klinik Gigi Modern dengan Perawatan Profesional, Nyaman, dan Minim
            Rasa Sakit untuk Semua Usia. Nikmati layanan perawatan gigi lengkap
            dari tim dokter ahli yang berpengalaman dan berdedikasi.
          </p>

          <!-- CTA Buttons -->
          <div class="d-flex flex-column flex-md-row" style="gap: 16px">
            <v-btn
              color="primary"
              size="large"
              to="/reserve"
              class="px-6 rounded-xl text-capitalize"
              elevation="0"
            >
              Reservasi Konsultasi
            </v-btn>
            <v-btn
              variant="outlined"
              color="primary"
              size="large"
              to="/services"
              class="px-6 rounded-xl text-capitalize"
              elevation="0"
            >
              Lihat Layanan Kami
            </v-btn>
          </div>
        </v-col>

        <!-- Right Column: Image -->
        <v-col cols="12" md="6" class="d-flex justify-center">
          <v-img
            src="/images/hero-dental-treatment.png"
            alt="Dental Treatment"
            class="hero-image rounded-xl"
            width="100%"
            max-width="600"
            cover
          />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: "HeroSection",
});
</script>

<style scoped>
.hero-section {
  background-color: white;
  min-height: calc(100vh - 64px); /* Subtract header height */
  display: flex;
  align-items: center;
}

.hero-image {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

/* Responsive adjustments */
@media (max-width: 959px) {
  .hero-section {
    padding-top: 48px;
    padding-bottom: 48px;
    min-height: auto;
  }

  .hero-image {
    margin-top: 40px;
  }
}
</style>
