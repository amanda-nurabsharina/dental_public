<template>
  <section class="hero-section py-16">
    <v-container>
      <v-row align="center">
        <!-- Left Column: Content -->
        <v-col cols="12" md="6">
          <h1 class="text-h2 font-weight-bold mb-6">
            Your Smile, Our Priority
          </h1>
          <p class="text-body-1 mb-8">
            Experience exceptional dental care with our team of expert
            professionals. We combine cutting-edge technology with compassionate
            service to give you the healthy, beautiful smile you deserve.
          </p>
          <div class="d-flex gap-4">
            <v-btn color="green" size="large" to="/reserve">
              Book Appointment
            </v-btn>
            <v-btn variant="outlined" color="green" size="large" to="/services">
              Our Services
            </v-btn>
          </div>
        </v-col>

        <!-- Right Column: Carousel -->
        <v-col cols="12" md="6">
          <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows="hover"
          >
            <v-carousel-item
              v-for="(slide, i) in slides"
              :key="i"
              :src="slide.image"
              cover
            >
              <v-sheet class="fill-height" color="rgba(0, 0, 0, 0.5)">
                <v-container class="fill-height">
                  <v-row align="center" justify="center">
                    <v-col class="text-center">
                      <div class="text-h5 font-weight-bold text-white mb-2">
                        {{ slide.title }}
                      </div>
                      <div class="text-body-1 text-white">
                        {{ slide.description }}
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const slides = [
  {
    image: "/images/dental-service-1.jpg",
    title: "Advanced Dental Care",
    description: "State-of-the-art technology for your dental health",
  },
  {
    image: "/images/dental-service-2.jpg",
    title: "Cosmetic Dentistry",
    description: "Transform your smile with our expert cosmetic services",
  },
  {
    image: "/images/dental-service-3.jpg",
    title: "Family Dentistry",
    description: "Comprehensive care for the whole family",
  },
];
</script>

<style scoped>
.hero-section {
  background-color: #f5f5f5;
}
</style>
