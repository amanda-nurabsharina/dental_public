<template>
  <section class="container">
    <div
      class="mb-10 flex flex-col gap-y-6 mx-auto max-w-[50.125rem] text-center items-center"
    >
      <v-chip color="primary" size="x-large">Kontak Kami</v-chip>
      <h2 class="heading-2">Klinik Gigi Nadira Tusam di Batam</h2>
      <p>
        Didukung oleh tim medis berpengalaman dan bersertifikat dengan keahlian
        di berbagai bidang kedokteran gigi untuk memberikan perawatan terbaik
        sesuai kebutuhan Anda.
      </p>
    </div>

    <div ref="emblaRef" class="contact-carousel embla">
      <div class="embla__viewport">
        <div class="embla__container">
          <div v-for="branch in branches" :key="branch.id" class="embla__slide">
            <HomeContactInfo :selected-branch="branch" />
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

defineOptions({
  name: 'ContactSection',
});

const branches = [
  {
    id: 'bengkong',
    name: 'Klinik Gigi Nadira Tusam - Bengkong',
    address:
      'Perkokoan Esqarada, Bengkong Harapan 1 Blok A No. 8, Kel. Bengkong Laut, Kec. Bengkong, Kota Batam 29444',
    email: 'dentaldiary@gmail.com',
    whatsapp: '+628 102-1292-1222',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.054762749842!2d103.9964!3d1.1137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da3f66b14e9cfb%3A0x123456789!2sBengkong%20Harapan%2C%20Bengkong%2C%20Batam%20City%2C%20Riau%20Islands!5e0!3m2!1sen!2sid!4v1698000000000!5m2!1sen!2sid',
  },
  {
    id: 'tiban',
    name: 'Klinik Gigi Nadira Tusam - Tiban',
    address:
      'Komplek Tiban Centre, Blok B No. 15, Kel. Tiban Baru, Kec. Sekupang, Kota Batam 29425',
    email: 'dentaldiary.tiban@gmail.com',
    whatsapp: '+628 102-1292-1333',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.054762749842!2d103.9464!3d1.1637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da3f66b14e9cfb%3A0x987654321!2sTiban%20Baru%2C%20Sekupang%2C%20Batam%20City%2C%20Riau%20Islands!5e0!3m2!1sen!2sid!4v1698000000000!5m2!1sen!2sid',
  },
  {
    id: 'batamcenter',
    name: 'Klinik Gigi Nadira Tusam - Batam Center',
    address:
      'Komplek Windsor Central, Blok C No. 28, Kel. Teluk Tering, Kec. Batam Kota, Kota Batam 29461',
    email: 'dentaldiary.center@gmail.com',
    whatsapp: '+628 102-1292-1444',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.054762749842!2d104.0264!3d1.1237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da3f66b14e9cfb%3A0x135792468!2sTeluk%20Tering%2C%20Batam%20Kota%2C%20Batam%20City%2C%20Riau%20Islands!5e0!3m2!1sen!2sid!4v1698000000000!5m2!1sen!2sid',
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
  scrollSnaps.value = Array.from(Array(branches.length).keys());

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
