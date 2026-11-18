<template>
  <section class="container">
    <div
      class="flex flex-col w-full items-center text-center space-y-6 mb-10 max-w-[50.125rem] mx-auto"
    >
      <v-chip color="primary" size="x-large">{{ headerBadgeText }}</v-chip>
      <h2 class="heading-2">{{ headerTitleText }}</h2>
      <p v-if="headerDescText" class="text-regular-normal">
        {{ headerDescText }}
      </p>
    </div>

    <div ref="emblaRef" class="testimonial-carousel embla">
      <div class="embla__viewport">
        <div class="embla__container">
          <div
            v-for="(testimony, idx) in displayTestimonials"
            :key="testimony.id || idx"
            class="embla__slide"
          >
            <HomeTestimonialCard :testimony="testimony" class="" />
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
  name: 'TestimonialsSection',
});

interface DisplayTestimonial {
  id?: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
}

const defaultTestimonials: DisplayTestimonial[] = [
  {
    name: 'Michelle S',
    avatar: '/images/testimonials/michelle.png',
    rating: 5,
    comment:
      'Harga perawatan sangat terjangkau dengan kualitas premium. Hasil perawatan orthodonti saya sangat memuaskan dalam waktu singkat',
  },
  {
    name: 'Jason',
    avatar: '/images/testimonials/michelle.png',
    rating: 5,
    comment:
      'Pelayanan yang sangat memuaskan! Dokter dan staff sangat profesional. Hasil perawatan gigi saya melebihi ekspektasi. Sangat rekomendasi!',
  },
  {
    name: 'Yessica Yuliana',
    avatar: '/images/testimonials/michelle.png',
    rating: 5,
    comment:
      'Fasilitas klinik sangat modern dan bersih. Proses perawatan tidak menyakitkan sama sekali. Tim medis sangat berpengalaman dan ramah',
  },
];

const apiTestimonials = ref<DisplayTestimonial[]>([]);
const sectionHeader = ref<{ badge_text?: string; title?: string; description?: string } | null>(null);
const { fetchTestimonials, getTestimonialAvatarUrl, fetchSectionHeader } = usePublicWeb();

const headerBadgeText = computed(() => {
  return sectionHeader.value?.badge_text || 'Testimoni Pasien';
});

const headerTitleText = computed(() => {
  return sectionHeader.value?.title || 'Kata Mereka yang Sudah Merasakan';
});

const headerDescText = computed(() => {
  return (
    sectionHeader.value?.description ||
    'Ribuan pasien telah mempercayakan kesehatan gigi mereka kepada kami. Simak pengalaman mereka dan buktikan sendiri kualitas layanan Dental Diary'
  );
});

const displayTestimonials = computed(() => {
  if (apiTestimonials.value.length > 0) {
    return apiTestimonials.value;
  }
  return defaultTestimonials;
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
  scrollSnaps.value = Array.from(Array(displayTestimonials.value.length).keys());
  updateScrollState();
};

onMounted(async () => {
  const [items, sHeader] = await Promise.all([
    fetchTestimonials(),
    fetchSectionHeader('testimonial'),
  ]);

  if (sHeader) {
    sectionHeader.value = sHeader;
  }

  if (items && items.length > 0) {
    apiTestimonials.value = items.map((item) => ({
      id: item.id,
      name: item.patient_name,
      avatar: `${getTestimonialAvatarUrl(item.id)}?t=${Date.now()}`,
      rating: item.rating,
      comment: item.comment,
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
@reference '~/assets/css/main.css';

.testimonial-carousel.embla {
  @apply max-w-full m-auto;
}
.testimonial-carousel .embla__viewport {
  @apply w-full overflow-hidden;
}
.testimonial-carousel .embla__container {
  @apply flex gap-x-6;
}
.testimonial-carousel .embla__slide {
  @apply flex-[0_0_auto] min-w-0 max-w-[20.875rem] w-full;
}
</style>
