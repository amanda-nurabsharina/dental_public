<template>
  <section id="tentang" class="container">
    <div class="flex flex-col gap-y-6 items-center mb-10 text-center max-w-[50.125rem] mx-auto">
      <v-chip size="x-large" color="primary" class="w-fit">{{ headerBadgeText }}</v-chip>
      <h2 class="heading-4 md:heading-2">{{ headerTitleText }}</h2>
      <p v-if="headerDescText" class="text-small-normal md:text-regular-normal text-[#161C2D] opacity-70">
        {{ headerDescText }}
      </p>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      <div
        v-for="feature in displayFeatures"
        :key="feature.id || feature.title"
        class="flex flex-col"
      >
        <div
          class="mb-4 sm:mb-6 size-14 flex items-center justify-center bg-primary-20 rounded-2xl overflow-hidden"
        >
          <img
            v-if="feature.icon_type === 'image'"
            :src="feature.image_url"
            :alt="feature.title"
            class="size-8 object-contain"
            @error="feature.icon_type = 'icon'"
          />
          <component :is="resolveIcon(feature.icon_name)" v-else />
        </div>
        <h3 class="heading-6 md:heading-5 mb-2 sm:mb-4 text-[#161C2D]">
          {{ feature.title }}
        </h3>
        <p
          class="text-small-normal md:text-regular-normal text-[#161C2D] opacity-70"
        >
          {{ feature.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import {
  IconDentist,
  IconFacilities,
  IconSchedule,
  IconService,
  IconResult,
  IconEconomist,
  IconHealthcare,
  IconSparkling,
} from '#components';
import { usePublicWeb, type WebAboutFeature } from '~/composables/usePublicWeb';

defineOptions({
  name: 'VisionSection',
});

const defaultFeatures = [
  {
    id: 'default-1',
    icon_type: 'icon',
    icon_name: 'dentist',
    title: 'Dokter Berpengalaman',
    description:
      'Tim dokter bersertifikat, berpengalaman dengan puluhan tahun, terus update teknologi dental.',
  },
  {
    id: 'default-2',
    icon_type: 'icon',
    icon_name: 'facilities',
    title: 'Fasilitas Modern',
    description:
      'Peralatan canggih (digital X-ray, laser) & sterilisasi terkini untuk kenyamanan dan keamanan.',
  },
  {
    id: 'default-3',
    icon_type: 'icon',
    icon_name: 'economist',
    title: 'Harga Terjangkau',
    description:
      'Harga kompetitif dengan promo menarik tanpa mengurangi kualitas layanan yang di hadirkan.',
  },
  {
    id: 'default-4',
    icon_type: 'icon',
    icon_name: 'schedule',
    title: 'Jadwal Fleksibel',
    description:
      'Buka 7 hari, booking online 24/7, emergency call, dan waktu tunggu minimal.',
  },
  {
    id: 'default-5',
    icon_type: 'icon',
    icon_name: 'service',
    title: 'Pelayanan Ramah',
    description:
      'Pendekatan personal, hangat, dan profesional untuk mengatasi kecemasan, khususnya untuk pasien anak.',
  },
  {
    id: 'default-6',
    icon_type: 'icon',
    icon_name: 'result',
    title: 'Hasil Terjamin',
    description:
      'Garansi perawatan dan follow-up berkala untuk hasil perawatan yang memuaskan dan tahan lama.',
  },
];

const apiFeatures = ref<Array<WebAboutFeature & { image_url?: string }>>([]);
const sectionHeader = ref<{ badge_text?: string; title?: string; description?: string } | null>(null);
const { fetchAbout, getAboutImageUrl, fetchSectionHeader } = usePublicWeb();

const headerBadgeText = computed(() => {
  return sectionHeader.value?.badge_text || 'Tentang Klinik';
});

const headerTitleText = computed(() => {
  return sectionHeader.value?.title || 'Kepercayaan Anda, Prioritas Kami';
});

const headerDescText = computed(() => {
  return sectionHeader.value?.description || '';
});

const resolveIcon = (name?: string) => {
  switch (name?.toLowerCase()) {
    case 'dentist':
      return IconDentist;
    case 'facilities':
      return IconFacilities;
    case 'economist':
      return IconEconomist;
    case 'schedule':
      return IconSchedule;
    case 'service':
      return IconService;
    case 'result':
      return IconResult;
    case 'healthcare':
      return IconHealthcare;
    case 'sparkling':
      return IconSparkling;
    default:
      return IconDentist;
  }
};

const displayFeatures = computed(() => {
  if (apiFeatures.value.length > 0) {
    return apiFeatures.value;
  }
  return defaultFeatures;
});

onMounted(async () => {
  const [items, sHeader] = await Promise.all([
    fetchAbout(),
    fetchSectionHeader('about'),
  ]);

  if (sHeader) {
    sectionHeader.value = sHeader;
  }

  if (items && items.length > 0) {
    apiFeatures.value = items.map((item) => ({
      ...item,
      image_url: `${getAboutImageUrl(item.id)}?t=${Date.now()}`,
    }));
  }
});
</script>

<style scoped></style>
