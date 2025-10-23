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
          <span class="text-small-normal md:text-regular-normal"
            >Pelayanan Kesehatan Terpercaya</span
          >
        </v-chip>
        <div class="flex flex-col gap-y-6">
          <h1 class="heading-2 md:heading-1 text-grey-900">
            Wujudkan Senyum Impian Anda, Bersama Kami
          </h1>
          <p class="text-grey-900 text-small-normal md:text-regular-normal">
            Klinik Gigi Modern dengan Perawatan Profesional, Nyaman, dan Minim
            Rasa Sakit untuk Semua Usia. Nikmati layanan perawatan gigi lengkap
            dari tim dokter ahli yang berpengalaman dan berdedikasi.
          </p>
          <div class="flex flex-wrap gap-x-2 md:gap-x-4">
            <v-btn
              size="x-large"
              to="/reservation"
              style="
                box-shadow: 4px 15px 100px 0px rgba(0, 146, 69, 0.25) !important;
              "
              class="!text-small-normal md:!text-regular-normal"
              >Reservasi Konsultasi</v-btn
            >
            <v-btn
              variant="outlined"
              size="x-large"
              to="/services"
              class="!text-small-normal md:!text-regular-normal"
              >Lihat Layanan Kami</v-btn
            >
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
              v-for="promo in promos"
              :key="promo.id"
              class="embla__slide !bg-center !bg-cover select-none"
            >
              <img
                :src="promo.image"
                class="select-none w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        <div class="flex gap-x-1.5 mt-10">
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
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue';

defineOptions({
  name: 'HeroSection',
});

const [emblaRef, emblaApi] = emblaCarouselVue({
  loop: false,
  container: '.embla__container',
});

// Reactive state
const selectedIndex = ref(0);
const scrollSnaps = ref<number[]>([]);
const canScrollPrev = ref(false);
const canScrollNext = ref(true);

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

// Initialize carousel
onMounted(() => {
  if (!emblaApi.value) return;

  // Initialize scroll snaps (for dots)
  scrollSnaps.value = Array.from(Array(promos.length).keys());

  // Update initial state
  updateScrollState();

  // Listen for scroll events
  emblaApi.value.on('select', updateScrollState);
  emblaApi.value.on('reInit', updateScrollState);
});

// Cleanup on unmount
onUnmounted(() => {
  if (emblaApi.value) {
    emblaApi.value.off('select', updateScrollState);
    emblaApi.value.off('reInit', updateScrollState);
  }
});

const promos = [
  {
    id: '1',
    image: '/images/home/home-1-tindakan.png',
  },
  {
    id: '2',
    image: '/images/home/home-2-konsul.png',
  },
  {
    id: '3',
    image: '/images/home/home-1-tindakan.png',
  },
  {
    id: '4',
    image: '/images/home/home-2-konsul.png',
  },
];
</script>

<style scoped>
.home-hero-carousel.embla {
  max-width: 100%;
  margin: auto;
}
.home-hero-carousel .embla__viewport {
  width: 100%;
  /* overflow: hidden; */
}
.home-hero-carousel .embla__container {
  display: flex;
  gap: 2.5rem; /* gap-x-10 */
}

.home-hero-carousel .embla__slide {
  position: relative;
  aspect-ratio: 466/405; /* aspect-[3/2] */
  min-width: 100%; /* min-w-[50%] */
  border-radius: 2rem; /* rounded-4xl */
  overflow: hidden;
  cursor: grab;
}

.home-hero-carousel .embla__slide__number {
  box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
  border-radius: 1.8rem;
  font-size: 4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--slide-height);
  user-select: none;
}
.home-hero-carousel .embla__controls {
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: space-between;
  gap: 1.2rem;
  margin-top: 1.8rem;
}
.home-hero-carousel .embla__buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
  align-items: center;
}
.home-hero-carousel .embla__button {
  -webkit-tap-highlight-color: rgba(var(--text-high-contrast-rgb-value), 0.5);
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  touch-action: manipulation;
  display: inline-flex;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  padding: 0;
  margin: 0;
  box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
  width: 3.6rem;
  height: 3.6rem;
  z-index: 1;
  border-radius: 50%;
  color: var(--text-body);
  display: flex;
  align-items: center;
  justify-content: center;
}
.home-hero-carousel .embla__button:disabled {
  color: var(--detail-high-contrast);
}
.home-hero-carousel .embla__button__svg {
  width: 35%;
  height: 35%;
}
.home-hero-carousel .embla__dots {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  margin-right: calc((2.6rem - 1.4rem) / 2 * -1);
}
.home-hero-carousel .embla__dot {
  -webkit-tap-highlight-color: rgba(var(--text-high-contrast-rgb-value), 0.5);
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  touch-action: manipulation;
  display: inline-flex;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  padding: 0;
  margin: 0;
  width: 2.6rem;
  height: 2.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.home-hero-carousel .embla__dot:after {
  box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  content: '';
}
.home-hero-carousel .embla__dot--selected:after {
  box-shadow: inset 0 0 0 0.2rem var(--text-body);
}
</style>
