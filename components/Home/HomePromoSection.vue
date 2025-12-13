<template>
  <section class="container">
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 gap-y-10"
    >
      <div class="flex flex-col gap-y-6">
        <v-chip color="primary" size="large">Promo Terbaru</v-chip>
        <h2 class="heading-4 md:heading-2 text-grey-900">
          Promo Menarik untuk Anda
        </h2>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      <div
        v-for="promo in promos"
        :key="promo.id"
        class="group relative aspect-[3/2] w-full overflow-hidden rounded-[2rem] select-none cursor-pointer"
      >
        <img
          :src="promo.image"
          :alt="promo.title"
          class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <!-- Optional: Add overlay if needed -->
      </div>
    </div>

    <div class="flex justify-center mt-10">
      <v-btn variant="outlined" size="large" to="/promo">
        Lihat Semua Promo
      </v-btn>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineOptions({
  name: 'PromoSection',
});

type PromoSlide = {
  id: string;
  title: string;
  image: string;
  link?: string;
  // Link is available in type but not used in template in original code (except router link)
  // Original only used Click on Embla? No click handler seen in original slide.
  // Updated code has cursor-pointer but no click handler. Keeping as original (display only).
};

const fallbackPromos: PromoSlide[] = [
  {
    id: 'julid-2025',
    title: 'JULID - Juli Jadi Irit',
    image: '/images/promos/julid.png',
    link: '/promos/julid-2025',
  },
  {
    id: 'juleha-2025',
    title: 'JULEHA - Juli Lebih Hemat',
    image: '/images/promos/julid.png',
    link: '/promos/juleha-2025',
  },
  {
    id: 'julehas-2025',
    title: 'JULEHA - Juli Lebih Hemat',
    image: '/images/promos/julid.png',
    link: '/promos/juleha-2025',
  },
  {
    id: 'julehas-2025-2',
    title: 'JULEHA - Juli Lebih Hemat',
    image: '/images/promos/julid.png',
    link: '/promos/juleha-2025',
  },
];

const promos = ref<PromoSlide[]>([...fallbackPromos]);
const { fetchMultiBranchPromoContents, getPromoContentImageUrl } = usePromoContent();

const loadPromos = async () => {
  try {
    const response = await fetchMultiBranchPromoContents('', 1, 6);
    const mappedPromos = (response.data || []).map((promo: any) => ({
      id: promo.id,
      title: promo.title,
      image: promo.image ? `data:image/jpeg;base64,${promo.image}` : getPromoContentImageUrl(promo.id),
    }));

    promos.value = mappedPromos.length ? mappedPromos : fallbackPromos;
  } catch (error) {
    console.error('Failed to load promo content:', error);
    promos.value = fallbackPromos;
  }
};

onMounted(() => {
  loadPromos();
});
</script>

<style scoped>
@reference 'tailwindcss';

/* Scoped styles if needed */
</style>
