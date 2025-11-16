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
      <div>
        <v-btn variant="outlined" size="x-large" to="/promo"
          >Lihat Semua Promo</v-btn
        >
      </div>
    </div>

    <div ref="emblaRef" class="promo-carousel embla">
      <div class="embla__viewport">
        <div class="embla__container">
          <div
            v-for="promo in promos"
            :key="promo.id"
            class="embla__slide !bg-center !bg-cover select-none"
          >
            <img
              :src="promo.image"
              :alt="promo.title"
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
          :class="{ 'bg-secondary-1 max-w-24 w-full': index === selectedIndex }"
          type="button"
          @click="scrollTo(index)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import emblaCarouselVue from 'embla-carousel-vue';

defineOptions({
  name: 'PromoSection',
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

type PromoSlide = {
  id: string;
  title: string;
  image: string;
  link?: string;
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
const { fetchPromoContents, getPromoContentImageUrl } = usePromoContent();

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

const updateScrollSnaps = () => {
  scrollSnaps.value = promos.value.map((_, index) => index);
};

const reInitializeCarousel = () => {
  nextTick(() => {
    if (emblaApi.value) {
      emblaApi.value.reInit();
      updateScrollState();
    }
  });
};

const applyPromoData = (slides: PromoSlide[]) => {
  promos.value = slides;
  updateScrollSnaps();
  reInitializeCarousel();
};

const loadPromos = async () => {
  try {
    const response = await fetchPromoContents('', 1, 6);
    const mappedPromos = response.data.map((promo) => ({
      id: promo.id,
      title: promo.title,
      image: getPromoContentImageUrl(promo.id),
    }));

    applyPromoData(mappedPromos.length ? mappedPromos : fallbackPromos);
  } catch (error) {
    console.error('Failed to load promo content:', error);
    applyPromoData(fallbackPromos);
  }
};

// Initialize carousel
onMounted(() => {
  if (!emblaApi.value) return;

  // Initialize scroll snaps (for dots)
  updateScrollSnaps();

  // Update initial state
  updateScrollState();

  // Listen for scroll events
  emblaApi.value.on('select', updateScrollState);
  emblaApi.value.on('reInit', updateScrollState);
});

onMounted(() => {
  loadPromos();
});

// Cleanup on unmount
onUnmounted(() => {
  if (emblaApi.value) {
    emblaApi.value.off('select', updateScrollState);
    emblaApi.value.off('reInit', updateScrollState);
  }
});
</script>

<style scoped>
@reference 'tailwindcss';

.promo-carousel.embla {
  max-width: 100%;
  margin: auto;
}
.promo-carousel .embla__viewport {
  width: 100%;
}
.promo-carousel .embla__container {
  display: flex;
  gap: 2.5rem; /* gap-x-10 */
}

.promo-carousel .embla__slide {
  position: relative;
  aspect-ratio: 3/2; /* aspect-[3/2] */
  @apply min-w-full md:min-w-2/3 xl:min-w-1/2;
  border-radius: 2rem; /* rounded-4xl */
  overflow: hidden;
  cursor: grab;
}

.promo-carousel .embla__slide__number {
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
.promo-carousel .embla__controls {
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: space-between;
  gap: 1.2rem;
  margin-top: 1.8rem;
}
.promo-carousel .embla__buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
  align-items: center;
}
.promo-carousel .embla__button {
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
.promo-carousel .embla__button:disabled {
  color: var(--detail-high-contrast);
}
.promo-carousel .embla__button__svg {
  width: 35%;
  height: 35%;
}
.promo-carousel .embla__dots {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  margin-right: calc((2.6rem - 1.4rem) / 2 * -1);
}
.promo-carousel .embla__dot {
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
.promo-carousel .embla__dot:after {
  box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  content: '';
}
.promo-carousel .embla__dot--selected:after {
  box-shadow: inset 0 0 0 0.2rem var(--text-body);
}
</style>
