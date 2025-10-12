<template>
  <section class="container">
    <div class="flex flex-col gap-y-6 items-center mb-10">
      <v-chip size="x-large" color="primary" class="w-fit"
        >Tentang Klinik</v-chip
      >
      <h2 class="heading-3 sm:heading-2">Kepercayaan Anda, Prioritas Kami</h2>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="flex flex-col"
      >
        <div
          class="mb-4 sm:mb-6 size-14 flex items-center justify-center bg-primary-20 rounded-2xl"
        >
          <component :is="feature.icon" />
        </div>
        <h3 class="heading-6 sm:heading-5 mb-2 sm:mb-4 text-[#161C2D]">
          {{ feature.title }}
        </h3>
        <p class="text-base text-[#161C2D] opacity-70">
          {{ feature.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  IconDentist,
  IconFacilities,
  IconSchedule,
  IconService,
  IconResult,
  IconEconomist,
} from '#components';

defineOptions({
  name: 'VisionSection',
});

const features = [
  {
    icon: IconDentist,
    title: 'Dokter Berpengalaman',
    description:
      'Tim dokter bersertifikat, berpengalaman dengan puluhan tahun, terus update teknologi dental.',
  },
  {
    icon: IconFacilities,
    title: 'Fasilitas Modern',
    description:
      'Peralatan canggih (digital X-ray, laser) & sterilisasi terkini untuk kenyamanan dan keamanan.',
  },
  {
    icon: IconEconomist,
    title: 'Harga Terjangkau',
    description:
      'Harga kompetitif dengan promo menarik tanpa mengurangi kualitas layanan yang di hadirkan.',
  },
  {
    icon: IconSchedule,
    title: 'Jadwal Fleksibel',
    description:
      'Buka 7 hari, booking online 24/7, emergency call, dan waktu tunggu minimal.',
  },
  {
    icon: IconService,
    title: 'Pelayanan Ramah',
    description:
      'Pendekatan personal, hangat, dan profesional untuk mengatasi kecemasan, khususnya untuk pasien anak.',
  },
  {
    icon: IconResult,
    title: 'Hasil Terjamin',
    description:
      'Garansi perawatan dan follow-up berkala untuk hasil perawatan yang memuaskan dan tahan lama.',
  },
];
</script>

<style scoped></style>
