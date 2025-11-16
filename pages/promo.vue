<template>
  <div>
    <BaseBreadcrumb />
    <div class="container mt-14 mb-16">
      <p class="text-regular-light text-neutral-60 mb-10">
        {{ resultSummary }}
      </p>

      <div v-if="loadError" class="mb-6">
        <v-alert type="error" variant="tonal">
          {{ loadError }}
        </v-alert>
      </div>

      <div
        v-if="isLoading"
        class="flex justify-center py-16"
      >
        <v-progress-circular indeterminate color="primary" size="48" />
      </div>
      <div
        v-else-if="!promos.length"
        class="py-16 text-center text-gray-500"
      >
        Tidak ada promo tersedia.
      </div>
      <div v-else class="grid md:grid-cols-2 gap-10 mb-10">
        <!-- Promo Card -->
        <div
          v-for="promo in promos"
          :key="promo.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
          role="button"
          tabindex="0"
          @click="handlePromoClick(promo)"
          @keyup.enter="handlePromoClick(promo)"
        >
          <img :src="promo.image" :alt="promo.title" class="w-full h-auto" />
        </div>
      </div>

      <v-pagination
        v-if="promos.length"
        v-model="page"
        :length="length"
        rounded="circle"
        :total-visible="6"
        color="primary"
        variant="text"
      >
        <template #prev>
          <v-btn
            class="!size-12"
            :variant="page === 1 ? 'text' : 'outlined'"
            :class="[page === 1 ? '!bg-grey-100' : '!border-grey-200']"
            :ripple="page !== 1"
            @click="goToPreviousPage"
          >
            <IconRightArrowSlim
              size="16"
              class="rotate-180"
              :class="[page === 1 ? 'text-grey-300' : 'text-black']"
            />
          </v-btn>
        </template>
        <template #next>
          <v-btn
            class="!size-12"
            :variant="page === length ? 'text' : 'outlined'"
            :class="[page === length ? '!bg-grey-100' : '!border-grey-200']"
            :ripple="page !== length"
            @click="goToNextPage"
          >
            <IconRightArrowSlim
              size="16"
              :color-class="[page === length ? 'text-grey-300' : 'text-black']"
            />
          </v-btn>
        </template>
      </v-pagination>
    </div>

    <v-dialog v-model="showPromoModal" max-width="720">
      <div
        v-if="selectedPromo"
        class="rounded-xl overflow-hidden bg-white p-6 md:p-10"
      >
        <div class="flex flex-col md:flex-row gap-6">
          <div class="flex-1 min-w-[16rem]">
            <div class="rounded-2xl overflow-hidden bg-grey-20 min-h-[16rem]">
              <img
                :src="modalPromoImage"
                :alt="`Gambar promo ${selectedPromo.title}`"
                class="w-full h-full object-cover"
                @error="handleModalImageError"
              />
            </div>
          </div>
          <div class="flex-1 space-y-4">
            <div>
              <p class="text-sm text-secondary-2 font-semibold mb-1">
                Promo Klinik
              </p>
              <h3 class="text-2xl font-semibold text-gray-900">
                {{ selectedPromo.title }}
              </h3>
            </div>
            <p class="text-gray-600 leading-relaxed">
              {{ selectedPromo.description }}
            </p>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useSeoMeta } from '#imports';

type PromoCard = {
  id: string;
  title: string;
  image: string;
  description: string;
};

const DEFAULT_LIMIT = 10;
const fallbackImage = '/images/promos/julid.png';

const fallbackPromos: PromoCard[] = [
  {
    id: 'julid-2025',
    title: 'JULID - Juli Jadi Irit',
    image: fallbackImage,
    description: 'Dapatkan diskon spesial untuk perawatan gigi pilihan Anda.',
  },
  {
    id: 'juleha-2025',
    title: 'JULEHA - Juli Lebih Hemat',
    image: fallbackImage,
    description: 'Promo hemat untuk menjaga kesehatan gigi keluarga.',
  },
  {
    id: 'julehas-2025',
    title: 'JULEHA - Juli Lebih Hemat',
    image: fallbackImage,
    description: 'Nikmati perawatan dengan harga lebih terjangkau.',
  },
  {
    id: 'julehas-2025-2',
    title: 'JULEHA - Juli Lebih Hemat',
    image: fallbackImage,
    description: 'Tawaran terbaik untuk senyum sehat sepanjang hari.',
  },
];

const { fetchPromoContents, getPromoContentImageUrl } = usePromoContent();

const promos = ref<PromoCard[]>([...fallbackPromos]);
const totalItems = ref(fallbackPromos.length);
const page = ref(1);
const length = ref(1);
const isLoading = ref(false);
const loadError = ref<string | null>(null);
const showPromoModal = ref(false);
const selectedPromo = ref<PromoCard | null>(null);
const modalImageError = ref(false);

const applyPromoData = (
  items: PromoCard[],
  total: number,
  totalPages: number
) => {
  promos.value = items;
  totalItems.value = total;
  length.value = Math.max(totalPages, 1);
};

const fetchPromos = async () => {
  isLoading.value = true;
  loadError.value = null;

  try {
    const response = await fetchPromoContents('', page.value, DEFAULT_LIMIT);
    const mappedPromos: PromoCard[] = response.data.map((promo) => ({
      id: promo.id,
      title: promo.title,
      image: getPromoContentImageUrl(promo.id),
      description: promo.description,
    }));

    const limit = response.limit || DEFAULT_LIMIT;
    const totalPages =
      response.total > 0 ? Math.ceil(response.total / limit) : 1;

    if (page.value > totalPages) {
      page.value = totalPages;
      return;
    }

    applyPromoData(mappedPromos, response.total, totalPages);
  } catch (error) {
    console.error('Failed to load promo contents:', error);
    loadError.value =
      'Gagal memuat promo terbaru. Menampilkan promo cadangan.';
    page.value = 1;
    applyPromoData([...fallbackPromos], fallbackPromos.length, 1);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchPromos);

watch(page, (newPage, oldPage) => {
  if (newPage !== oldPage) {
    fetchPromos();
  }
});

const resultSummary = computed(() => {
  if (!totalItems.value) {
    return 'Menampilkan 0 of 0 hasil';
  }

  const start = (page.value - 1) * DEFAULT_LIMIT + 1;
  const end = Math.min(page.value * DEFAULT_LIMIT, totalItems.value);

  return `Menampilkan ${start}-${end} of ${totalItems.value} hasil`;
});

// Navigation functions
const goToPreviousPage = () => {
  if (page.value > 1) {
    page.value--;
  }
};

const goToNextPage = () => {
  if (page.value < length.value) {
    page.value++;
  }
};

const handlePromoClick = (promo: PromoCard) => {
  selectedPromo.value = promo;
  modalImageError.value = false;
  showPromoModal.value = true;
};

watch(showPromoModal, (isOpen) => {
  if (!isOpen) {
    selectedPromo.value = null;
    modalImageError.value = false;
  }
});

const modalPromoImage = computed(() => {
  if (!selectedPromo.value || modalImageError.value) {
    return fallbackImage;
  }

  return selectedPromo.value.image;
});

const handleModalImageError = () => {
  modalImageError.value = true;
};

useSeoMeta({
  title: 'Promo Klinik - Dental Reservation',
  description: 'Lihat promo layanan klinik gigi terbaik untuk Anda.',
});
</script>
