<template>
  <header class="w-full bg-white">
    <div
      class="container min-h-[5.625rem] px-4 py-2 flex items-center justify-between"
    >
      <NuxtLink class="heading-5 text-primary flex items-center gap-2.5" to="/">
        <img
          v-if="hasLogo"
          :src="logoUrl"
          alt="Logo"
          class="h-9 w-auto object-contain"
          @error="hasLogo = false"
        />
        <span>{{ headerConfig?.brand_name || 'Dental Diary.' }}</span>
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
import { ref, onMounted } from 'vue';

const links = [
  { title: 'Beranda', to: '/' },
  { title: 'Layanan', to: '/services' },
  { title: 'Dokter', to: '/doctors' },
];

const isOpenSidebar = ref(false);
const { fetchHeaderFooter, getHeaderLogoUrl } = usePublicWeb();
const headerConfig = ref<{ brand_name?: string } | null>(null);
const logoUrl = ref('');
const hasLogo = ref(true);

onMounted(async () => {
  logoUrl.value = `${getHeaderLogoUrl()}?t=${Date.now()}`;
  const res = await fetchHeaderFooter();
  if (res) {
    headerConfig.value = res;
  }
});
</script>
