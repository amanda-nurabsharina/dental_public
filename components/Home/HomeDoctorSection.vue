<template>
  <section class="container">
    <div
      class="flex flex-col gap-y-6 items-center text-center max-w-[50.125rem] mx-auto mb-10"
    >
      <v-chip color="primary">Dokter Kami</v-chip>
      <h2 class="heading-2">Tim Dokter Spesialis Terpercaya</h2>
      <p class="text-regular-normal">
        Didukung oleh tim medis berpengalaman dan bersertifikat dengan keahlian
        di berbagai bidang kedokteran gigi untuk memberikan perawatan terbaik
        sesuai kebutuhan Anda.
      </p>
    </div>
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10"
    >
      <DoctorCard v-for="doctor in doctors" :key="doctor.id" :doctor="doctor" />
    </div>
    <div class="flex justify-center mt-10">
      <v-btn size="large" variant="outlined">Lihat Semua Dokter</v-btn>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DoctorsSection',
});

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
    id: 5,
    name: 'drg. Michael Tanoto, Sp.Ort',
    specialist:
      'Spesialis ortodonti dengan keahlian khusus pada perawatan gigi yang tidak rata',
    rating: 4.8,
    photo: '/images/doctors/michael.png',
    badge: 'Ortodontis',
    badgeColor: 'green-lighten-5',
  },
  {
    id: 6,
    name: 'drg. Lisa Permata, Sp.KG',
    specialist: 'Ahli perawatan saluran akar dan rehabilitasi gigi yang rusak',
    rating: 4.7,
    photo: '/images/doctors/michael.png',
    badge: 'Konservasi Gigi',
    badgeColor: 'green-lighten-5',
  },
  {
    id: 7,
    name: 'drg. Sarah Wijaya',
    specialist:
      'Dokter gigi umum dengan 10+ tahun pengalaman dalam perawatan gigi keluarga',
    rating: 4.9,
    photo: '/images/doctors/michael.png',
    badge: 'Dokter Umum',
    badgeColor: 'green-lighten-5',
  },
  {
    id: 8,
    name: 'drg. Ahmad Rizki, Sp.BM',
    specialist: 'Spesialis bedah mulut untuk pencabutan dan implant gigi',
    rating: 4.8,
    photo: '/images/doctors/michael.png',
    badge: 'Bedah Mulut',
    badgeColor: 'green-lighten-5',
  },
];
</script>

<style scoped></style>
