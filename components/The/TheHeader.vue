<template lang="">
  <header class="w-full bg-white">
    <div
      class="container min-h-[5.625rem] px-4 py-2 flex items-center justify-between"
    >
      <NuxtLink class="heading-5 text-primary" to="/">Dental Diary.</NuxtLink>
      <div class="flex gap-x-0">
        <v-btn
          v-for="link in links"
          :key="link.title"
          variant="text"
          :to="link.to"
          class="text-capitalize"
          color="black"
          >{{ link.title }}</v-btn
        >
      </div>

      <v-btn to="/reservation" class="text-capitalize">
        Reservasi <v-icon icon="mdi-arrow-right" />
      </v-btn>
    </div>
  </header>
</template>
<script setup>
const links = [
  { title: 'Beranda', to: '/' },
  { title: 'Layanan', to: '/about' },
  { title: 'Dokter', to: '/services' },
  { title: 'Jadwal', to: '/contact' },
  { title: 'Testimoni', to: '/contact' },
  { title: 'Kontak Kami', to: '/contact' },
];
</script>
