<template>
  <header class="w-full bg-white shadow-xs sticky top-0 z-50">
    <div
      class="container min-h-[5.625rem] px-4 py-2 flex items-center justify-between"
    >
      <NuxtLink class="flex items-center gap-3 no-underline group select-none py-1" to="/">
        <img
          v-if="logoUrl && hasLogo"
          :src="logoUrl"
          :alt="brandDisplayName"
          class="h-9 md:h-11 w-auto max-h-12 object-contain transition-transform duration-200 group-hover:scale-105"
          @error="onLogoError"
        />
        <span class="heading-5 md:heading-4 font-bold tracking-tight text-primary transition-opacity group-hover:opacity-90 leading-tight">
          {{ brandDisplayName }}
        </span>
      </NuxtLink>

      <div class="gap-x-1 hidden lg:flex">
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

      <div class="hidden lg:flex">
        <v-btn to="/reservation" size="large">
          <div class="flex items-center gap-x-2">
            Reservasi <IconRightArrowSlim />
          </div>
        </v-btn>
      </div>

      <v-btn
        class="block lg:!hidden"
        variant="text"
        icon
        @click="isOpenSidebar = !isOpenSidebar"
      >
        <IconMenu />
      </v-btn>
    </div>
  </header>

  <v-navigation-drawer v-model="isOpenSidebar" location="right" temporary>
    <div class="gap-x-1 gap-y-3 flex flex-col justify-start text-start p-4">
      <v-btn
        v-for="link in links"
        :key="link.title"
        variant="plain"
        :to="link.to"
        class="text-capitalize !text-medium-normal w-fit"
        :class="{ '!font-semibold !opacity-100': $route.path === link.to }"
        color="black"
        slim
        >{{ link.title }}</v-btn
      >
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { usePublicWeb } from '~/composables/usePublicWeb';

const links = [
  { title: 'Beranda', to: '/' },
  { title: 'Layanan', to: '/services' },
  { title: 'Dokter', to: '/doctors' },
];

const isOpenSidebar = ref(false);
const { fetchHeaderFooter, getHeaderLogoUrl } = usePublicWeb();
const headerConfig = ref<{ brand_name?: string } | null>(null);
const logoUrl = ref<string>('');
const hasLogo = ref(true);

const brandDisplayName = computed(() => {
  return headerConfig.value?.brand_name?.trim() || 'Dental Diary.';
});

const onLogoError = () => {
  if (logoUrl.value) {
    hasLogo.value = false;
  }
};

onMounted(async () => {
  logoUrl.value = `${getHeaderLogoUrl()}?t=${Date.now()}`;
  hasLogo.value = true;

  const res = await fetchHeaderFooter();
  if (res) {
    headerConfig.value = res;
  }
});
</script>
