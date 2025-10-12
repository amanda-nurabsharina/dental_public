<template>
  <v-footer class="bg-background">
    <div class="container py-[3.125rem]">
      <div class="flex justify-between mb-14">
        <div class="flex flex-col gap-y-5 max-w-[33rem]">
          <div class="heading-5">Dental Diary.</div>
          <p class="text-regular-normal">
            Memberikan pelayanan kesehatan gigi terbaik dengan teknologi modern
            dan pelayanan yang ramah
          </p>
        </div>
        <div class="flex gap-x-[4.75rem]">
          <div>
            <div class="mb-6 text-medium-medium">Tautan Cepat</div>
            <ul class="space-y-4">
              <li v-for="link in quickLinks" :key="link.title">
                <NuxtLink
                  :to="link.to"
                  class="text-grey-700 text-regular-normal"
                  >{{ link.title }}</NuxtLink
                >
              </li>
            </ul>
          </div>

          <div>
            <div class="mb-6 text-medium-medium">Hubungi Kami</div>
            <ul class="space-y-4">
              <li>
                <NuxtLink to="/" class="text-grey-700 text-regular-normal"
                  >+628 102-1292-1222</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/" class="text-grey-700 text-regular-normal"
                  >dentaldiary@gmail.com</NuxtLink
                >
              </li>
              <li class="flex flex-col gap-y-4">
                <div class="text-medium-medium">Sosial Media</div>
                <div class="-ml-1 flex gap-x-3">
                  <v-btn
                    variant="text"
                    density="compact"
                    class="hover:-translate-y-1 !transition-all !w-8 !h-8 !min-w-0 !p-0"
                  >
                    <IconInstagram />
                  </v-btn>
                  <v-btn
                    variant="text"
                    density="compact"
                    class="hover:-translate-y-1 !transition-all !w-8 !h-8 !min-w-0 !p-0"
                  >
                    <IconFacebook />
                  </v-btn>
                  <v-btn
                    variant="text"
                    density="compact"
                    class="hover:-translate-y-1 !transition-all !w-8 !h-8 !min-w-0 !p-0"
                  >
                    <IconTiktok />
                  </v-btn>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bg-[#E7E9ED] h-0.5 w-full mb-5" />
      <p class="text-grey-700 text-center">
        © 2025 Dental Diary. All Rights Reserved | Privacy Policy | Terms of
        Service | Sitemap Made with ❤️ by Michelle S
      </p>
    </div>
  </v-footer>
</template>
<script setup>
const quickLinks = [
  { title: 'Beranda', to: '/' },
  { title: 'Tentang Klinik', to: '/about' },
  { title: 'Layanan Unggulan', to: '/services' },
  { title: 'Dokter Kami', to: '/contact' },
];
</script>
<style></style>
