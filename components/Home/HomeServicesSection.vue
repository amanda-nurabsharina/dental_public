<template>
  <section class="container">
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 gap-y-10"
    >
      <div class="flex flex-col gap-y-6">
        <v-chip color="primary" size="large">Layanan Unggulan</v-chip>
        <h2 class="heading-4 md:heading-2 cursor-not-allowed">
          Layanan Perawatan Klinik
        </h2>
      </div>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="service in services"
        :key="service.id"
        class="group relative aspect-square w-full overflow-hidden rounded-3xl bg-center bg-cover select-none cursor-pointer hover:-translate-y-1 transition-transform duration-300"
        :style="{
          backgroundImage: `url(${service.image})`,
        }"
      >
        <div
          class="w-full h-full flex flex-col justify-end p-6 bg-gradient-to-b from-transparent from-50% to-black"
        >
          <div v-if="service.branch_name" class="self-start mb-2 px-2 py-0.5 text-xs font-semibold rounded bg-white/20 text-white backdrop-blur-sm">
            {{ service.branch_name }}
          </div>
          <div class="text-large-semibold text-white group-hover:scale-105 transition-transform duration-300 origin-bottom-left">
            {{ service.title }}
          </div>
          <p class="text-regular-normal text-white mt-1 opacity-90">
            {{ service.description }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-10">
      <v-btn size="large" variant="outlined" to="/services">
        Lihat Semua Layanan
      </v-btn>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getVuetifyTheme } from '~/config/design-tokens';

defineOptions({
  name: 'ServicesSection',
});

onMounted(() => {
  console.log('getVuetifyTheme', getVuetifyTheme());
});

const fallbackImage = '/images/services/service-teeth-scaling.png';

type ServiceSlide = {
  id: string;
  title: string;
  description: string;
  branch_name?: string;
  image: string;
};

const fallbackServices: ServiceSlide[] = [
  {
    id: 'fallback-1',
    title: 'Scaling Gigi',
    description:
      'Untuk membersihkan atau menghilangkan karang yang menempel di gigi gusi',
    image: fallbackImage,
  },
  {
    id: 'fallback-2',
    title: 'Pasang Behel Gigi',
    description:
      'Digunakan untuk memperbaiki posisi gigi yang tidak rata atau tidak sejajar',
    image: fallbackImage,
  },
  {
    id: 'fallback-3',
    title: 'Perawatan Gigi Anak',
    description: 'Perawatan menyeluruh untuk gigi buah hati anda',
    image: fallbackImage,
  },
  {
    id: 'fallback-4',
    title: 'Bleaching',
    description:
      'Bertujuan untuk memutihkan gigi yang mengalami perubahan warna',
    image: fallbackImage,
  },
];

const services = ref<ServiceSlide[]>([...fallbackServices]);
const { fetchMultiBranchClinicServices, getClinicServiceImageUrl } = useClinicServices();

const loadServices = async () => {
  try {
    const response = await fetchMultiBranchClinicServices('', 1, 8);
    const mappedServices = (response.data || []).map((service: any) => ({
      id: service.id,
      title: service.title,
      description: service.description,
      branch_name: service.branch_name,
      image: service.image ? `data:image/jpeg;base64,${service.image}` : getClinicServiceImageUrl(service.id),
    }));

    services.value = mappedServices.length ? mappedServices : fallbackServices;
  } catch (error) {
    console.error('Failed to load clinic services:', error);
    services.value = fallbackServices;
  }
};

onMounted(() => {
  loadServices();
});
</script>

<style scoped>
/* Scoped styles if needed */
</style>
