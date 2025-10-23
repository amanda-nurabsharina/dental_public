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
      <div class="flex gap-x-4">
        <v-btn
          class="!size-16"
          :class="[!canScrollPrev ? 'cursor-not-allowed' : 'cursor-pointer']"
          :color="!canScrollPrev ? 'primary-20' : 'secondary-1'"
          :ripple="canScrollPrev"
          @click="scrollPrev"
        >
          <IconRightArrow size="16" class="rotate-180" />
        </v-btn>

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
    </div>
    <div ref="emblaRef" class="services-carousel embla">
      <div class="embla__viewport">
        <div class="embla__container">
          <div
            v-for="service in services"
            :key="service.title"
            class="embla__slide !bg-center !bg-cover select-none"
            :style="{
              backgroundImage: `url(${service.image})`,
              cursor: 'grab',
            }"
          >
            <div
              class="w-full h-full flex flex-col justify-end p-6"
              style="
                background: linear-gradient(
                  180deg,
                  rgba(0, 0, 0, 0) 50%,
                  #000000 100%
                );
              "
            >
              <div class="text-large-semibold text-white">
                {{ service.title }}
              </div>
              <p class="text-regular-normal text-white">
                {{ service.description }}
              </p>
            </div>
          </div>

          <!-- <div class="embla__slide__number">{{ i }}</div> -->
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

<script setup>
import { getVuetifyTheme } from '~/config/design-tokens';
import emblaCarouselVue from 'embla-carousel-vue';

defineOptions({
  name: 'ServicesSection',
});

onMounted(() => {
  console.log('getVuetifyTheme', getVuetifyTheme());
});

// const selectedService = ref(0);

const services = [
  {
    title: 'Scaling Gigi',
    description:
      'Untuk membersihkan atau menghilangkan karang yang menempel di gigi gusi',
    image: '/images/services/service-teeth-scaling.png',
  },
  {
    title: 'Pasang Behel Gigi',
    description:
      'Digunakan untuk memperbaiki posisi gigi yang tidak rata atau tidak sejajar',
    image: '/images/services/service-teeth-scaling.png',
  },
  {
    title: 'Perawatan Gigi Anak',
    description: 'Perawatan menyeluruh untuk gigi buah hati anda',
    image: '/images/services/service-teeth-scaling.png',
  },
  {
    title: 'Bleaching',
    description:
      'Bertujuan untuk memutihkan gigi yang mengalami perubahan warna',
    image: '/images/services/service-teeth-scaling.png',
  },
];

const [emblaRef, emblaApi] = emblaCarouselVue({
  loop: false,
  container: '.embla__container',
});

// Reactive state
const selectedIndex = ref(0);
const scrollSnaps = ref([]);
const canScrollPrev = ref(false);
const canScrollNext = ref(true);

// Navigation methods
const scrollPrev = () => {
  if (emblaApi.value) emblaApi.value.scrollPrev();
};

const scrollNext = () => {
  if (emblaApi.value) emblaApi.value.scrollNext();
};

const scrollTo = (index) => {
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
  scrollSnaps.value = Array.from(Array(services.length).keys());

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
</script>

<style scoped>
.services-carousel.embla {
  max-width: 100%;
  margin: auto;
}
.services-carousel .embla__viewport {
  /* overflow: hidden; */
  width: 100%;
}
.services-carousel .embla__container {
  display: flex;
  gap: 2.5rem; /* gap-x-10 */
}

.services-carousel .embla__slide {
  position: relative;
  aspect-ratio: 1 / 1; /* aspect-square */
  min-width: 22rem; /* min-w-[22rem] */
  height: 22rem; /* h-[22rem] */
  display: flex;
  align-items: end; /* items-end */
  border-radius: 1.5rem; /* rounded-3xl */
  overflow: hidden;
}
@media (min-width: 750px) {
  .services-carousel .embla__slide {
    flex: 0 0 var(--slide-size-sm);
    padding-left: var(--slide-spacing-sm);
  }
}
@media (min-width: 1200px) {
  .services-carousel .embla__slide {
    flex: 0 0 var(--slide-size-lg);
    padding-left: var(--slide-spacing-lg);
  }
}
.services-carousel .embla__slide__number {
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
.services-carousel .embla__controls {
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: space-between;
  gap: 1.2rem;
  margin-top: 1.8rem;
}
.services-carousel .embla__buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
  align-items: center;
}
.services-carousel .embla__button {
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
.services-carousel .embla__button:disabled {
  color: var(--detail-high-contrast);
}
.services-carousel .embla__button__svg {
  width: 35%;
  height: 35%;
}
.services-carousel .embla__dots {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  margin-right: calc((2.6rem - 1.4rem) / 2 * -1);
}
.services-carousel .embla__dot {
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
.services-carousel .embla__dot:after {
  box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  content: '';
}
.services-carousel .embla__dot--selected:after {
  box-shadow: inset 0 0 0 0.2rem var(--text-body);
}
</style>
