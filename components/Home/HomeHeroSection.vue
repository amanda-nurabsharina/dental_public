<template>
  <div>
    <section
      class="container bg-white flex flex-col lg:flex-row justify-between gap-x-10 gap-y-12"
    >
      <div class="w-full lg:min-w-lg xl:min-w-xl">
        <v-chip color="primary" class="gap-x-2 mb-6" size="large">
          <template #prepend>
            <IconHealthcare />
          </template>
          <span class="text-small-normal md:text-regular-normal">
            {{ heroConfig?.tagline || 'Pelayanan Kesehatan Terpercaya' }}
          </span>
        </v-chip>
        <div class="flex flex-col gap-y-6">
          <h1 class="heading-2 md:heading-1 text-grey-900">
            {{ heroConfig?.title || 'Wujudkan Senyum Impian Anda, Bersama Kami' }}
          </h1>
          <p class="text-grey-900 text-small-normal md:text-regular-normal">
            {{ heroConfig?.description || 'Klinik Gigi Modern dengan Perawatan Profesional, Nyaman, dan Minim Rasa Sakit untuk Semua Usia. Nikmati layanan perawatan gigi lengkap dari tim dokter ahli yang berpengalaman dan berdedikasi.' }}
          </p>
          <div class="flex flex-wrap gap-x-2 md:gap-x-4">
            <v-btn
              size="x-large"
              :to="heroConfig?.btn_primary_url || '/reservation'"
              class="!text-small-normal md:!text-regular-normal !glowing-btn-primary"
            >
              {{ heroConfig?.btn_primary_text || 'Reservasi Konsultasi' }}
            </v-btn>
            <v-btn
              variant="outlined"
              size="x-large"
              :to="heroConfig?.btn_secondary_url || '/services'"
              class="!text-small-normal md:!text-regular-normal"
            >
              {{ heroConfig?.btn_secondary_text || 'Lihat Layanan Kami' }}
            </v-btn>
          </div>
        </div>
      </div>

      <div
        ref="emblaRef"
        class="home-hero-carousel embla grow"
        style="clip-path: inset(-100vw -100vw -100vw 0)"
      >
        <div class="embla__viewport">
          <div class="embla__container">
            <div
              v-for="slide in heroSlides"
              :key="slide.id"
              class="embla__slide !bg-center !bg-cover select-none"
            >
              <img
                :src="slide.image"
                class="select-none w-full h-full object-cover object-center"
                @error="handleSlideError(slide.id)"
              />
            </div>
          </div>
        </div>

        <div v-if="scrollSnaps.length > 1" class="flex gap-x-1.5 mt-10">
          <button
            v-for="(_, index) in scrollSnaps"
            :key="index"
            class="bg-primary-20 w-3 h-1.5 rounded-full transition-all duration-300"
            :class="{
              'bg-secondary-1 max-w-24 w-full': index === selectedIndex,
            }"
            type="button"
            @click="scrollTo(index)"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import emblaCarouselVue from 'embla-carousel-vue';
import type { WebHeroContent } from '~/composables/usePublicWeb';

defineOptions({
  name: 'HeroSection',
});

const [emblaRef, emblaApi] = emblaCarouselVue({
  loop: true,
  container: '.embla__container',
});

// Reactive state
const selectedIndex = ref(0);
const scrollSnaps = ref<number[]>([]);
const canScrollPrev = ref(false);
const canScrollNext = ref(true);

const { fetchHero, fetchHeroBanners, getHeroBannerUrl } = usePublicWeb();
const heroConfig = ref<WebHeroContent | null>(null);

const defaultSlides = [
  { id: '1', image: '/images/home/home-1-tindakan.png' },
  { id: '2', image: '/images/home/home-2-konsul.png' },
  { id: '3', image: '/images/home/home-1-tindakan.png' },
  { id: '4', image: '/images/home/home-2-konsul.png' },
];

const heroSlides = ref<Array<{ id: string; image: string }>>([...defaultSlides]);

const handleSlideError = (slideId: string) => {
  heroSlides.value = heroSlides.value.filter((s) => s.id !== slideId);
  if (heroSlides.value.length === 0) {
    heroSlides.value = [...defaultSlides];
  }
  if (emblaApi.value) {
    emblaApi.value.reInit();
    scrollSnaps.value = Array.from(Array(heroSlides.value.length).keys());
  }
};

// Navigation methods
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
  scrollSnaps.value = Array.from(Array(heroSlides.value.length).keys());
  updateScrollState();
};

onMounted(async () => {
  const [heroData, banners] = await Promise.all([
    fetchHero(),
    fetchHeroBanners(),
  ]);

  if (heroData) {
    heroConfig.value = heroData;
  }

  if (banners && banners.length > 0) {
    heroSlides.value = banners.map((b) => ({
      id: b.id,
      image: `${getHeroBannerUrl(b.id)}?t=${Date.now()}`,
    }));
  } else {
    heroSlides.value = [...defaultSlides];
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
.home-hero-carousel.embla {
  max-width: 100%;
  margin: auto;
}
.home-hero-carousel .embla__viewport {
  width: 100%;
}
.home-hero-carousel .embla__container {
  display: flex;
  gap: 2.5rem;
}
.home-hero-carousel .embla__slide {
  position: relative;
  aspect-ratio: 466/405;
  min-width: 100%;
  border-radius: 2rem;
  overflow: hidden;
  cursor: grab;
}
</style>
