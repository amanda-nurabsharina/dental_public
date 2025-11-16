<template>
  <div>
    <BaseBreadcrumb />
    <div class="container mt-14 mb-16">
      <h1 class="sr-only">Layanan Klinik</h1>
      <div
        class="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-10"
      >
        <p class="text-regular-light text-neutral-60">
          {{ resultSummary }}
        </p>
        <div class="flex w-full flex-1 gap-x-3.5 lg:justify-end grow">
          <v-text-field
            v-model="searchQuery"
            class="lg:!max-w-[20.5rem] !w-full !flex-1"
            placeholder="Cari layanan perawatan..."
            color="grey-200"
            outlined
            clearable
            hide-details
            @keyup.enter="handleSearch"
          >
            <template #prepend-inner>
              <IconSearch size="16" class="text-secondary-1" />
            </template>
          </v-text-field>
          <v-btn
            size="x-large"
            style="box-shadow: 4px 15px 100px 0px rgba(0, 146, 69, 0.25)"
            @click="handleSearch"
          >
            Cari Layanan
          </v-btn>
        </div>
      </div>

      <div v-if="loadError" class="mb-6">
        <v-alert type="error" variant="tonal">
          {{ loadError }}
        </v-alert>
      </div>

      <div v-else-if="isLoading" class="flex justify-center py-16">
        <v-progress-circular indeterminate color="primary" size="48" />
      </div>

      <div
        v-else-if="!paginatedServices.length"
        class="py-16 text-center text-gray-500"
      >
        Tidak ada layanan ditemukan.
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10"
      >
        <article v-for="service in paginatedServices" :key="service.id">
          <div
            class="group cursor-pointer hover:-translate-y-1 transition-transform duration-200"
          >
            <div class="rounded-lg p-1" @click="handleServiceClick(service)">
              <!-- Use API image if available, otherwise fallback to static -->
              <div class="h-[24rem] w-full mb-4 overflow-hidden rounded-lg">
                <img
                  :src="getServiceImage(service)"
                  :alt="`Gambar layanan ${service.title}`"
                  class="h-full w-full rounded-lg object-cover group-hover:scale-110 transition-transform duration-500"
                  @error="handleCardImageError(service.id)"
                />
              </div>
              <div class="space-y-2">
                <div class="heading-6 lg:heading-5 text-[#161C2D]">
                  {{ service.title }}
                </div>
                <p class="text-small-normal lg:text-regular-normal">
                  {{ service.description }}
                </p>
                <!-- Show doctor credentials if available from API -->
              </div>
            </div>
          </div>
        </article>
      </div>

      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        rounded="circle"
        :total-visible="6"
        color="black"
        variant="text"
        active-color="primary"
      >
        <template #prev>
          <v-btn
            class="!size-12"
            :variant="currentPage === 1 ? 'text' : 'outlined'"
            :class="[currentPage === 1 ? '!bg-grey-100' : '!border-grey-200']"
            :ripple="currentPage !== 1"
            @click="goToPreviousPage"
          >
            <IconRightArrowSlim
              size="16"
              class="rotate-180"
              :class="[currentPage === 1 ? 'text-grey-300' : 'text-black']"
            />
          </v-btn>
        </template>
        <template #next>
          <v-btn
            class="!size-12"
            :variant="currentPage === totalPages ? 'text' : 'outlined'"
            :class="[
              currentPage === totalPages ? '!bg-grey-100' : '!border-grey-200',
            ]"
            :ripple="currentPage !== totalPages"
            @click="goToNextPage"
          >
            <IconRightArrowSlim
              size="16"
              :class="[
                currentPage === totalPages ? 'text-grey-300' : 'text-black',
              ]"
            />
          </v-btn>
        </template>
      </v-pagination>
    </div>

    <v-dialog v-model="showServiceModal" max-width="720">
      <div
        v-if="selectedService"
        class="rounded-xl overflow-hidden bg-white p-6 md:p-10"
      >
        <div class="flex flex-col md:flex-row gap-6">
          <div class="flex-1 min-w-[16rem]">
            <div class="service-modal__image-wrapper">
              <img
                :src="modalServiceImage"
                :alt="`Gambar layanan ${selectedService.title}`"
                class="service-modal__image"
                @error="handleModalImageError"
              />
            </div>
          </div>
          <div class="flex-1 space-y-4">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-sm text-secondary-2 font-semibold mb-1">
                  Layanan Klinik
                </p>
                <h3 class="text-2xl font-semibold text-gray-900">
                  {{ selectedService.title }}
                </h3>
              </div>
            </div>

            <p class="text-gray-600 leading-relaxed">
              {{ selectedService.description }}
            </p>

            <v-divider />
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useSeoMeta } from '#imports';
import type { ClinicService } from '~/composables/useApi';

const { fetchClinicServices, getClinicServiceImageUrl } = useClinicServices();

const DEFAULT_LIMIT = 9;
const fallbackImage = '/images/services/service-teeth-scaling.png';
const searchQuery = ref('');
const appliedSearch = ref('');
const currentPage = ref(1);

const services = ref<ClinicService[]>([]);
const totalServices = ref(0);
const isLoading = ref(false);
const loadError = ref<string | null>(null);

const showServiceModal = ref(false);
const selectedService = ref<ClinicService | null>(null);
const modalImageError = ref(false);
const imageErrorMap = ref<Record<string, boolean>>({});

const fetchServices = async () => {
  isLoading.value = true;
  loadError.value = null;

  try {
    const response = await fetchClinicServices(
      appliedSearch.value,
      currentPage.value,
      DEFAULT_LIMIT
    );

    services.value = response.data;
    totalServices.value = response.total;
  } catch (error) {
    console.error('Error fetching clinic services:', error);
    loadError.value =
      error instanceof Error
        ? error.message
        : 'Gagal memuat data layanan. Silakan coba lagi.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchServices);

watch(currentPage, (newPage, oldPage) => {
  if (newPage !== oldPage) {
    fetchServices();
  }
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(totalServices.value / DEFAULT_LIMIT))
);

const paginatedServices = computed(() => services.value);

const resultSummary = computed(() => {
  if (!services.value.length) {
    return totalServices.value
      ? `Menampilkan 0 dari ${totalServices.value} hasil`
      : 'Tidak ada hasil';
  }

  const start = (currentPage.value - 1) * DEFAULT_LIMIT + 1;
  const end = start + services.value.length - 1;

  return `Menampilkan ${start}-${end} dari ${totalServices.value} hasil`;
});

const handleSearch = () => {
  const normalizedQuery = searchQuery.value.trim();

  if (normalizedQuery === appliedSearch.value && currentPage.value === 1) {
    return;
  }

  appliedSearch.value = normalizedQuery;
  currentPage.value = 1;
  fetchServices();
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const handleServiceClick = (service: ClinicService) => {
  selectedService.value = service;
  modalImageError.value = !!imageErrorMap.value[service.id];
  showServiceModal.value = true;
};

watch(showServiceModal, (isOpen) => {
  if (!isOpen) {
    selectedService.value = null;
    modalImageError.value = false;
  }
});

const getServiceImage = (service: ClinicService) => {
  if (imageErrorMap.value[service.id]) {
    return fallbackImage;
  }

  return getClinicServiceImageUrl(service.id);
};

const handleCardImageError = (serviceId: string) => {
  imageErrorMap.value = {
    ...imageErrorMap.value,
    [serviceId]: true,
  };
};

const modalServiceImage = computed(() => {
  if (!selectedService.value || modalImageError.value) {
    return fallbackImage;
  }

  return getClinicServiceImageUrl(selectedService.value.id);
});

const handleModalImageError = () => {
  modalImageError.value = true;
};

useSeoMeta({
  title: 'Layanan Klinik - Dental Reservation',
  description:
    'Temukan berbagai layanan perawatan gigi dan mulut terbaik dari klinik kami.',
});
</script>

<style scoped>
.service-card {
  border-radius: 1rem;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0px 4px 24px rgba(15, 23, 42, 0.06);
  overflow: hidden;
  background-color: #ffffff;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 0.75rem;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 12px 32px rgba(15, 23, 42, 0.15);
}

.service-card__media {
  position: relative;
  width: 100%;
  height: 14rem;
  overflow: hidden;
}

.service-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.service-card:hover .service-card__image {
  transform: scale(1.05);
}

.service-card__body {
  padding: 0 1.25rem;
  flex: 1;
}

.service-card__description {
  color: #4b5563;
  font-size: 0.95rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.service-modal__image-wrapper {
  border-radius: 1.25rem;
  overflow: hidden;
  background: #f5f5f5;
  height: 100%;
}

.service-modal__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
