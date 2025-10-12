<template>
  <div>
    <section class="container flex gap-x-10">
      <div class="max-w-xl">
        <v-chip color="primary" class="gap-x-2 mb-6" size="large">
          <template #prepend>
            <IconHealthcare />
          </template>
          <span class="text-base">Pelayanan Kesehatan Terpercaya</span>
        </v-chip>
        <div class="flex flex-col gap-y-6">
          <h1 class="heading-1">Wujudkan Senyum Impian Anda, Bersama Kami</h1>
          <p>
            Klinik Gigi Modern dengan Perawatan Profesional, Nyaman, dan Minim
            Rasa Sakit untuk Semua Usia. Nikmati layanan perawatan gigi lengkap
            dari tim dokter ahli yang berpengalaman dan berdedikasi.
          </p>
          <div class="flex gap-x-4">
            <v-btn
              size="x-large"
              to="/reservation"
              style="
                box-shadow: 4px 15px 100px 0px rgba(0, 146, 69, 0.25) !important;
              "
              >Reservasi Konsultasi</v-btn
            >
            <v-btn variant="outlined" size="x-large" to="/services"
              >Lihat Layanan Kami</v-btn
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'HeroSection',
});
</script>

<style scoped></style>
