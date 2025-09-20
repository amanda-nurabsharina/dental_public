<template>
  <section class="testimonials-section py-16">
    <!-- Section Badge -->
    <div class="text-center mb-4">
      <v-chip color="primary-20" class="px-4 py-2" variant="flat">
        <span class="text-primary text-body-2">Testimoni Pasien</span>
      </v-chip>
    </div>

    <!-- Section Heading -->
    <h2 class="text-h3 text-center font-weight-bold mb-4 text-black">
      Kata Mereka yang Sudah Merasakan
    </h2>

    <!-- Section Description -->
    <p
      class="text-body-1 text-grey-darken-1 text-center mb-16 max-w-lg mx-auto"
    >
      Ribuan pasien telah mempercayakan kesehatan gigi mereka kepada kami. Simak
      pengalaman mereka dan buktikan sendiri kualitas layanan Dental Diary
    </p>

    <!-- Testimonials Carousel -->
    <div class="testimonials-carousel position-relative">
      <v-row>
        <v-col cols="12">
          <v-slide-group
            v-model="selectedTestimonial"
            class="pa-4"
            selected-class="bg-primary"
            show-arrows
          >
            <v-slide-group-item
              v-for="testimonial in testimonials"
              :key="testimonial.name"
            >
              <div class="testimonial-card mx-3">
                <!-- Rating -->
                <div class="d-flex mb-4">
                  <v-icon
                    v-for="i in 5"
                    :key="i"
                    :color="
                      i <= testimonial.rating
                        ? 'amber-darken-2'
                        : 'grey-lighten-1'
                    "
                    icon="mdi-star"
                    size="20"
                    class="mr-1"
                  />
                </div>

                <!-- Quote -->
                <div class="testimonial-quote mb-6">
                  <v-icon
                    color="primary"
                    size="32"
                    icon="mdi-format-quote-open"
                    class="quote-icon"
                  />
                  <p class="text-body-1 text-grey-darken-1">
                    {{ testimonial.comment }}
                  </p>
                </div>

                <!-- User Info -->
                <div class="d-flex align-center">
                  <v-avatar
                    :image="testimonial.avatar"
                    size="48"
                    class="mr-4"
                  />
                  <div class="text-subtitle-1 font-weight-bold text-black">
                    {{ testimonial.name }}
                  </div>
                </div>
              </div>
            </v-slide-group-item>
          </v-slide-group>
        </v-col>
      </v-row>

      <!-- Navigation -->
      <div class="text-center mt-6">
        <div class="d-inline-flex gap-2">
          <v-btn
            v-for="(_, i) in testimonialPages"
            :key="i"
            icon="mdi-circle"
            size="x-small"
            variant="text"
            :color="selectedTestimonial === i ? 'primary' : 'grey'"
            @click="selectedTestimonial = i"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "TestimonialsSection",
});

const selectedTestimonial = ref(0);

const testimonials = [
  {
    name: "Michelle S",
    avatar: "/images/testimonials/michelle.jpg",
    rating: 5,
    comment:
      "Harga perawatan sangat terjangkau dengan kualitas premium. Hasil perawatan orthodonti saya sangat memuaskan dalam waktu singkat",
  },
  {
    name: "Jason",
    avatar: "/images/testimonials/jason.jpg",
    rating: 5,
    comment:
      "Pelayanan yang sangat memuaskan! Dokter dan staff sangat profesional. Hasil perawatan gigi saya melebihi ekspektasi. Sangat rekomendasi!",
  },
  {
    name: "Yessica Yuliana",
    avatar: "/images/testimonials/yessica.jpg",
    rating: 5,
    comment:
      "Fasilitas klinik sangat modern dan bersih. Proses perawatan tidak menyakitkan sama sekali. Tim medis sangat berpengalaman dan ramah",
  },
];

// Group testimonials into pages of 3
const testimonialPages = testimonials.reduce((acc, curr, i) => {
  const pageIndex = Math.floor(i / 3);
  if (!acc[pageIndex]) {
    acc[pageIndex] = [];
  }
  acc[pageIndex].push(curr);
  return acc;
}, [] as (typeof testimonials)[]);
</script>

<style scoped>
.testimonials-section {
  background-color: white;
}

.max-w-lg {
  max-width: 640px;
}

.testimonial-card {
  width: 400px;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.testimonial-quote {
  position: relative;
  padding-left: 40px;
}

.quote-icon {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.2;
}

/* Navigation Styles */
:deep(.v-slide-group__prev),
:deep(.v-slide-group__next) {
  background-color: white !important;
  border-radius: 50% !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  margin: 0 8px !important;
}

:deep(.v-slide-group__prev--disabled),
:deep(.v-slide-group__next--disabled) {
  opacity: 0 !important;
}

/* Navigation Dots */
.v-btn.v-btn--icon.v-btn--size-x-small {
  width: 8px;
  height: 8px;
  margin: 0 4px;
  padding: 0;
}

.v-btn.v-btn--icon.v-btn--size-x-small .v-icon {
  font-size: 8px;
}

/* Responsive adjustments */
@media (max-width: 959px) {
  .testimonial-card {
    width: 360px;
  }
}

@media (max-width: 599px) {
  .testimonial-card {
    width: 300px;
  }

  :deep(.v-slide-group__prev),
  :deep(.v-slide-group__next) {
    display: none !important;
  }
}
</style>
