<template>
  <v-footer class="bg-background">
    <div class="container py-[3.125rem]">
      <div class="flex flex-col lg:flex-row justify-between mb-14 gap-y-24">
        <div class="flex flex-col gap-y-5 max-w-[33rem]">
          <div class="heading-5">{{ footerConfig?.brand_name || 'Dental Diary.' }}</div>
          <p class="text-regular-normal">
            {{ footerConfig?.brand_description || 'Memberikan pelayanan kesehatan gigi terbaik dengan teknologi modern dan pelayanan yang ramah' }}
          </p>
        </div>
        <div
          class="flex justify-between gap-x-2 flex-wrap md:justify-start md:gap-x-[4.75rem]"
        >
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
              <li v-if="footerConfig?.phone_number">
                <a
                  :href="`tel:${footerConfig.phone_number}`"
                  class="text-grey-700 text-regular-normal"
                >{{ footerConfig.phone_number }}</a>
              </li>
              <li v-if="footerConfig?.email">
                <a
                  :href="`mailto:${footerConfig.email}`"
                  class="text-grey-700 text-regular-normal"
                >{{ footerConfig.email }}</a>
              </li>
              <li class="flex flex-col gap-y-4">
                <div class="text-medium-medium">Sosial Media</div>
                <div class="-ml-1 flex gap-x-3">
                  <v-btn
                    v-if="footerConfig?.instagram_url"
                    :href="footerConfig.instagram_url"
                    target="_blank"
                    rel="noopener"
                    variant="text"
                    density="compact"
                    class="hover:-translate-y-1 !transition-all !w-8 !h-8 !min-w-0 !p-0"
                  >
                    <IconInstagram />
                  </v-btn>
                  <v-btn
                    v-if="footerConfig?.facebook_url"
                    :href="footerConfig.facebook_url"
                    target="_blank"
                    rel="noopener"
                    variant="text"
                    density="compact"
                    class="hover:-translate-y-1 !transition-all !w-8 !h-8 !min-w-0 !p-0"
                  >
                    <IconFacebook />
                  </v-btn>
                  <v-btn
                    v-if="footerConfig?.tiktok_url"
                    :href="footerConfig.tiktok_url"
                    target="_blank"
                    rel="noopener"
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
        {{ footerConfig?.copyright_text || '© 2025 Dental Diary. All Rights Reserved | Privacy Policy | Terms of Service' }}
      </p>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { WebHeaderFooterConfig } from '~/composables/usePublicWeb';

const quickLinks = [
  { title: 'Beranda', to: '/' },
  { title: 'Tentang Klinik', to: '/#tentang' },
  { title: 'Layanan Unggulan', to: '/services' },
  { title: 'Dokter Kami', to: '/doctors' },
];

const { fetchHeaderFooter } = usePublicWeb();
const footerConfig = ref<WebHeaderFooterConfig | null>(null);

onMounted(async () => {
  const res = await fetchHeaderFooter();
  if (res) {
    footerConfig.value = res;
  }
});
</script>
<style></style>
