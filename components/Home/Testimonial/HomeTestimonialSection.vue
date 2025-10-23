<template>
  <section class="container">
    <div
      class="flex flex-col w-full items-center text-center space-y-6 mb-10 max-w-[50.125rem] mx-auto"
    >
      <v-chip color="primary" size="x-large">Testimoni Pasien</v-chip>
      <h2 class="heading-2">Kata Mereka yang Sudah Merasakan</h2>
      <p class="text-regular-normal">
        Ribuan pasien telah mempercayakan kesehatan gigi mereka kepada kami.
        Simak pengalaman mereka dan buktikan sendiri kualitas layanan Dental
        Diary
      </p>
    </div>

    <div ref="emblaRef" class="testimonial-carousel embla">
      <div class="embla__viewport">
        <div class="embla__container">
          <div
            v-for="testimony in testimonials"
            :key="testimony.name"
            class="embla__slide"
          >
            <HomeTestimonialCard :testimony="testimony" class="" />
          </div>
        </div>
      </div>
    </div>

    <div
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
import emblaCarouselVue from 'embla-carousel-vue';
import Index from '~/pages/index.vue';

defineOptions({
  name: 'TestimonialsSection',
});

const testimonials = [
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
  {
    name: 'John Doe',
    avatar: '/images/testimonials/michelle.png',
    rating: 5,
    comment:
      'Fasilitas klinik sangat modern dan bersih. Proses perawatan tidak menyakitkan sama sekali. Tim medis sangat berpengalaman dan ramah',
  },
  {
    name: 'Sarah Amanda',
    avatar: '/images/testimonials/michelle.png',
    rating: 5,
    comment:
      'Pengalaman pertama kali cabut gigi bungsu di sini sangat nyaman. Dokter sangat sabar menjelaskan prosedur dan memberikan tips perawatan setelahnya.',
  },
  {
    name: 'Rizky Pratama',
    avatar: '/images/testimonials/michelle.png',
    rating: 4,
    comment:
      'Jadwal konsultasi sangat fleksibel dan mudah diatur. Hasil veneer gigi saya terlihat natural dan sesuai dengan bentuk wajah. Terima kasih Dental Diary!',
  },
  {
    name: 'Diana Sari',
    avatar: '/images/testimonials/michelle.png',
    rating: 5,
    comment:
      'Anak saya yang biasanya takut ke dokter gigi jadi senang kesini. Ruang perawatan anak sangat menarik dan dokter anak sangat ramah.',
  },
  {
    name: 'Ahmad Fauzi',
    avatar: '/images/testimonials/michelle.png',
    rating: 5,
    comment:
      'Proses implant gigi berjalan sangat lancar. Teknologi yang digunakan canggih dan hasil akhirnya sangat memuaskan. Highly recommended!',
  },
  {
    name: 'Lestari Wulandari',
    avatar: '/images/testimonials/michelle.png',
    rating: 4,
    comment:
      'Perawatan scaling rutin di sini selalu thorough dan hasil bersih maksimal. Staff administrasi juga sangat membantu dalam pengaturan jadwal.',
  },
  {
    name: 'Kevin Wijaya',
    avatar: '/images/testimonials/michelle.png',
    rating: 5,
    comment:
      'Konsultasi whitening teeth sangat detail dan hasilnya melebihi ekspektasi. Gigi saya jadi lebih putih alami tanpa efek samping.',
  },
  {
    name: 'Nurul Hidayah',
    avatar: '/images/testimonials/michelle.png',
    rating: 5,
    comment:
      'Pemasangan bracket yang rapi dan nyaman dipakai. Kontrol rutin bulanan selalu tepat waktu dan progress perawatan ortodonti sangat baik.',
  },
  {
    name: 'Bayu Santoso',
    avatar: '/images/testimonials/michelle.png',
    rating: 4,
    comment:
      'Penanganan emergency toothache di weekend sangat responsif. Dokter jaga siap siaga dan memberikan solusi cepat untuk mengatasi nyeri.',
  },
  {
    name: 'Indira Putri',
    avatar: '/images/testimonials/michelle.png',
    rating: 5,
    comment:
      'Konsep klinik yang modern dengan teknologi digital impression membuat pengalaman perawatan crown gigi jadi lebih efisien dan akurat.',
  },
  {
    name: 'Denny Kurniawan',
    avatar: '/images/testimonials/michelle.png',
    rating: 5,
    comment:
      'Paket family dental care sangat worth it. Sekeluarga bisa perawatan gigi dengan harga terjangkau dan kualitas pelayanan premium.',
  },
];

const [emblaRef, emblaApi] = emblaCarouselVue({
  loop: true,
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

// Initialize carousel
onMounted(() => {
  if (!emblaApi.value) return;

  // Initialize scroll snaps (for dots)
  scrollSnaps.value = Array.from(Array(testimonials.length).keys());

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
@reference '~/assets/css/main.css';

.testimonial-carousel.embla {
  @apply max-w-full m-auto;
}
.testimonial-carousel .embla__viewport {
  @apply w-full overflow-hidden;
}
.testimonial-carousel .embla__container {
  @apply flex touch-pan-y touch-pinch-zoom -ml-10;
}

.testimonial-carousel .embla__slide {
  @apply relative flex-[0_0_calc(100%/2)] lg:flex-[0_0_calc(100%/3)] pl-10 rounded-4xl select-none overflow-visible cursor-grab;
}

.testimonial-carousel .embla__slide__number {
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
.testimonial-carousel .embla__controls {
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: space-between;
  gap: 1.2rem;
  margin-top: 1.8rem;
}
.testimonial-carousel .embla__buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
  align-items: center;
}
.testimonial-carousel .embla__button {
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
.testimonial-carousel .embla__button:disabled {
  color: var(--detail-high-contrast);
}
.testimonial-carousel .embla__button__svg {
  width: 35%;
  height: 35%;
}
.testimonial-carousel .embla__dots {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  margin-right: calc((2.6rem - 1.4rem) / 2 * -1);
}
.testimonial-carousel .embla__dot {
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
.testimonial-carousel .embla__dot:after {
  box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  content: '';
}
.testimonial-carousel .embla__dot--selected:after {
  box-shadow: inset 0 0 0 0.2rem var(--text-body);
}
</style>
