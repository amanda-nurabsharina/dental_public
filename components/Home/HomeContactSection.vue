<template>
  <section class="container">
    <div
      class="mb-10 flex flex-col gap-y-6 mx-auto max-w-[50.125rem] text-center items-center"
    >
      <v-chip color="primary" size="x-large">{{ headerBadgeText }}</v-chip>
      <h2 class="heading-2">{{ headerTitleText }}</h2>
      <p v-if="headerDescText">
        {{ headerDescText }}
      </p>
    </div>

    <div ref="emblaRef" class="contact-carousel embla">
      <div class="embla__viewport">
        <div class="embla__container">
          <div v-for="branch in displayBranches" :key="branch.id" class="embla__slide">
            <HomeContactInfo :selected-branch="branch" />
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="scrollSnaps.length > 1"
      class="w-full max-w-[23.375rem] flex gap-x-6 items-center mx-auto mt-10"
    >
      <v-btn
        class="!size-16"
        :class="[!canScrollPrev ? 'cursor-not-allowed' : 'cursor-pointer']"
        :color="selectedIndex === 0 ? 'primary-20' : 'secondary-1'"
        :ripple="canScrollPrev"
        @click="scrollPrev"
      >
        <IconRightArrow
          size="16"
          class="rotate-180"
          :color-class="selectedIndex === 0 ? '!text-primary' : ''"
        />
      </v-btn>
      <div class="flex grow gap-x-6 items-center">
        <div class="flex gap-x-1.5 grow">
          <button
            v-for="(_, index) in scrollSnaps"
            :key="index"
            class="bg-primary-20 w-3 h-1.5 rounded-full"
            :class="{
              'bg-secondary-1 max-w-24 w-full': index === selectedIndex,
            }"
            type="button"
            @click="scrollTo(index)"
          />
        </div>
        <span>{{ selectedIndex + 1 }}/{{ scrollSnaps.length }}</span>
      </div>

      <v-btn
        class="!size-16"
        :class="[!canScrollNext ? 'cursor-not-allowed' : 'cursor-pointer']"
        :color="!canScrollNext ? 'primary-20' : 'secondary-1'"
        :ripple="canScrollNext"
        @click="scrollNext"
      >
        <IconRightArrow size="16" />
      </v-btn>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue';
import emblaCarouselVue from 'embla-carousel-vue';
import { usePublicWeb } from '~/composables/usePublicWeb';

defineOptions({
  name: 'ContactSection',
});

interface BranchItem {
  id: string;
  name: string;
  address: string;
  email: string;
  whatsapp: string;
  mapUrl?: string;
  latitude?: number;
  longitude?: number;
}

const defaultBranches: BranchItem[] = [
  {
    id: 'bengkong',
    name: 'Klinik Gigi Nadira Tusam - Bengkong',
    address:
      'Perkokoan Esqarada, Bengkong Harapan 1 Blok A No. 8, Kel. Bengkong Laut, Kec. Bengkong, Kota Batam 29444',
    email: 'dentaldiary@gmail.com',
    whatsapp: '+628 102-1292-1222',
    latitude: 1.1137,
    longitude: 103.9964,
  },
  {
    id: 'tiban',
    name: 'Klinik Gigi Nadira Tusam - Tiban',
    address:
      'Komplek Tiban Centre, Blok B No. 15, Kel. Tiban Baru, Kec. Sekupang, Kota Batam 29425',
    email: 'dentaldiary.tiban@gmail.com',
    whatsapp: '+628 102-1292-1333',
    latitude: 1.1637,
    longitude: 103.9464,
  },
  {
    id: 'batamcenter',
    name: 'Klinik Gigi Nadira Tusam - Batam Center',
    address:
      'Komplek Windsor Central, Blok C No. 28, Kel. Teluk Tering, Kec. Batam Kota, Kota Batam 29461',
    email: 'dentaldiary.center@gmail.com',
    whatsapp: '+628 102-1292-1444',
    latitude: 1.1237,
    longitude: 104.0264,
  },
];

const apiBranches = ref<BranchItem[]>([]);
const brandName = ref('');
const sectionHeader = ref<{ badge_text?: string; title?: string; description?: string } | null>(null);
const { fetchContactBranches, fetchHeaderFooter, fetchSectionHeader } = usePublicWeb();

const headerBadgeText = computed(() => {
  return sectionHeader.value?.badge_text || 'Kontak Kami';
});

const headerTitleText = computed(() => {
  if (sectionHeader.value?.title) {
    return sectionHeader.value.title;
  }
  if (brandName.value) {
    return `Klinik Gigi ${brandName.value} di Batam`;
  }
  return 'Klinik Gigi Nadira Tusam di Batam';
});

const headerDescText = computed(() => {
  return (
    sectionHeader.value?.description ||
    'Didukung oleh tim medis berpengalaman dan bersertifikat dengan keahlian di berbagai bidang kedokteran gigi untuk memberikan perawatan terbaik sesuai kebutuhan Anda.'
  );
});

const displayBranches = computed(() => {
  if (apiBranches.value.length > 0) {
    return apiBranches.value;
  }
  return defaultBranches;
});

const [emblaRef, emblaApi] = emblaCarouselVue({
  loop: false,
  container: '.embla__container',
  slidesToScroll: 1,
  align: 'start',
});

// Reactive state
const selectedIndex = ref(0);
const scrollSnaps = ref<number[]>([]);
const canScrollPrev = ref(false);
const canScrollNext = ref(true);

// Navigation methods
const scrollPrev = () => {
  if (emblaApi.value) emblaApi.value.scrollPrev();
};

const scrollNext = () => {
  if (emblaApi.value) emblaApi.value.scrollNext();
};

const scrollTo = (index: number) => {
  if (emblaApi.value) emblaApi.value.scrollTo(index);
};

// Update scroll state
const updateScrollState = () => {
  if (!emblaApi.value) return;

  selectedIndex.value = emblaApi.value.selectedScrollSnap();
  canScrollPrev.value = emblaApi.value.canScrollPrev();
  canScrollNext.value = emblaApi.value.canScrollNext();
};

const initCarousel = () => {
  if (!emblaApi.value) return;
  emblaApi.value.reInit();
  scrollSnaps.value = Array.from(Array(displayBranches.value.length).keys());
  updateScrollState();
};

onMounted(async () => {
  const [branches, headerFooter, sHeader] = await Promise.all([
    fetchContactBranches(),
    fetchHeaderFooter(),
    fetchSectionHeader('contact'),
  ]);

  if (sHeader) {
    sectionHeader.value = sHeader;
  }

  if (headerFooter?.brand_name) {
    brandName.value = headerFooter.brand_name.replace(/\.$/, '');
  }

  if (branches && branches.length > 0) {
    apiBranches.value = branches.map((b) => ({
      id: b.id,
      name: b.branch_name,
      address: b.address,
      email: b.email,
      whatsapp: b.whatsapp,
      latitude: b.latitude,
      longitude: b.longitude,
      mapUrl: b.map_url,
    }));
  }

  await nextTick();
  if (emblaApi.value) {
    initCarousel();
    emblaApi.value.on('select', updateScrollState);
    emblaApi.value.on('reInit', updateScrollState);
  }
});

onUnmounted(() => {
  if (emblaApi.value) {
    emblaApi.value.off('select', updateScrollState);
    emblaApi.value.off('reInit', updateScrollState);
  }
});
</script>

<style scoped>
@import 'tailwindcss';

.contact-carousel.embla {
  @apply max-w-full mx-auto;
}

.contact-carousel .embla__viewport {
  @apply w-full overflow-hidden;
}

.contact-carousel .embla__container {
  @apply flex touch-pan-y touch-pinch-zoom -ml-4 sm:-ml-6 lg:-ml-8;
}

.contact-carousel .embla__slide {
  @apply relative flex-[0_0_100%] sm:flex-[0_0_90%] md:flex-[0_0_85%] xl:flex-[0_0_70%] pl-4 sm:pl-6 lg:pl-8 rounded-4xl select-none overflow-visible cursor-grab;
}
</style>
