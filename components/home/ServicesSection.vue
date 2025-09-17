<template>
  <section class="services-section py-16">
    <v-container>
      <h2 class="text-h3 text-center font-weight-bold mb-12">
        Our Featured Services
      </h2>

      <v-carousel
        cycle
        height="500"
        hide-delimiter-background
        show-arrows="hover"
      >
        <v-carousel-item v-for="(service, i) in services" :key="i">
          <v-row class="fill-height" no-gutters>
            <v-col v-for="(item, j) in service" :key="j" cols="12" md="4">
              <v-card class="mx-2 h-100" :image="item.image">
                <v-overlay contained class="align-center justify-center">
                  <v-card-title class="text-h5 text-white mb-2">
                    {{ item.title }}
                  </v-card-title>
                  <v-card-text class="text-white text-center">
                    {{ item.description }}
                  </v-card-text>
                  <v-btn
                    color="green"
                    variant="flat"
                    class="mt-4"
                    to="/services"
                  >
                    Learn More
                  </v-btn>
                </v-overlay>
              </v-card>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const services = [
  [
    {
      title: "General Dentistry",
      description: "Comprehensive dental care for all ages",
      image: "/images/service-general.jpg",
    },
    {
      title: "Cosmetic Dentistry",
      description: "Transform your smile with our expert treatments",
      image: "/images/service-cosmetic.jpg",
    },
    {
      title: "Orthodontics",
      description: "Straighten your teeth with modern solutions",
      image: "/images/service-ortho.jpg",
    },
  ],
  [
    {
      title: "Dental Implants",
      description: "Permanent solution for missing teeth",
      image: "/images/service-implants.jpg",
    },
    {
      title: "Teeth Whitening",
      description: "Professional whitening for a brighter smile",
      image: "/images/service-whitening.jpg",
    },
    {
      title: "Emergency Care",
      description: "24/7 emergency dental services",
      image: "/images/service-emergency.jpg",
    },
  ],
];
</script>

<style scoped>
.services-section {
  background-color: #f5f5f5;
}

.v-card {
  transition: transform 0.3s;
}

.v-card:hover {
  transform: scale(1.02);
}
</style>
