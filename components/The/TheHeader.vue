<template lang="">
  <header class="w-full bg-white">
    <div
      class="container min-h-[5.625rem] px-4 py-2 flex items-center justify-between"
    >
      <NuxtLink class="heading-5 text-primary" to="/">Dental Diary.</NuxtLink>
      <div class="flex gap-x-1">
        <v-btn
          v-for="link in links"
          :key="link.title"
          variant="plain"
          :to="link.to"
          class="text-capitalize !text-medium-normal"
          :class="{ '!font-semibold !opacity-100': $route.path === link.to }"
          color="black"
          slim
          >{{ link.title }}</v-btn
        >
      </div>

      <v-btn to="/reservation" size="large">
        <div class="flex items-center gap-x-2">
          Reservasi <IconRightArrowSlim />
        </div>
      </v-btn>
    </div>
  </header>
</template>
<script setup>
const links = [
  { title: 'Beranda', to: '/' },
  { title: 'Layanan', to: '/services' },
  { title: 'Dokter', to: '/doctors' },
  { title: 'Jadwal', to: '/schedules' },
  { title: 'Testimoni', to: '/testimonials' },
  { title: 'Kontak Kami', to: '/contact' },
];
</script>
