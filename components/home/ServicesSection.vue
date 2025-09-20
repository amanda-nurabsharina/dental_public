<template>
  <section class="services-section py-16">
    <v-container>
      <!-- Section Badge -->
      <div class="text-center mb-4">
        <v-chip color="primary-20" class="px-4 py-2" variant="flat">
          <span class="text-primary text-body-2">Layanan Unggulan</span>
        </v-chip>
      </div>

      <!-- Section Heading -->
      <h2 class="text-h3 text-center font-weight-bold mb-16 text-black">
        Layanan Perawatan Klinik
      </h2>

      <!-- Services Carousel -->
      <div class="services-carousel position-relative">
        <v-row>
          <v-col cols="12">
            <v-slide-group
              v-model="selectedService"
              class="pa-4"
              selected-class="bg-primary"
              show-arrows
            >
              <v-slide-group-item
                v-for="service in services"
                :key="service.title"
              >
                <v-card
                  class="service-card mx-3"
                  width="360"
                  elevation="0"
                  rounded="xl"
                >
                  <v-img
                    :src="service.image"
                    width="360"
                    height="371"
                    class="rounded-xl"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="primary"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
          </v-col>
        </v-row>

        <!-- Navigation Dots -->
        <div class="text-center mt-6">
          <div class="d-inline-flex gap-2">
            <v-btn
              v-for="(_, i) in services"
              :key="i"
              icon="mdi-circle"
              size="x-small"
              variant="text"
              :color="selectedService === i ? 'primary' : 'grey'"
              @click="selectedService = i"
            ></v-btn>
          </div>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "ServicesSection",
});

const selectedService = ref(0);

const services = [
  {
    title: "Scaling Gigi",
    description:
      "Untuk membersihkan atau menghilangkan karang yang menempel di gigi gusi",
    image: "/images/services/service-teeth-scaling.png",
  },
  {
    title: "Pasang Behel Gigi",
    description:
      "Digunakan untuk memperbaiki posisi gigi yang tidak rata atau tidak sejajar",
    image: "/images/services/service-teeth-scaling.png",
  },
  {
    title: "Perawatan Gigi Anak",
    description: "Perawatan menyeluruh untuk gigi buah hati anda",
    image: "/images/services/service-teeth-scaling.png",
  },
  {
    title: "Bleaching",
    description:
      "Bertujuan untuk memutihkan gigi yang mengalami perubahan warna",
    image: "/images/services/service-teeth-scaling.png",
  },
];
</script>

<style scoped>
.services-section {
  background-color: white;
}

.service-card {
  transition: all 0.3s ease;
  border: 1px solid #eee;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1) !important;
}

/* Custom navigation arrows */
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

/* Responsive adjustments */
@media (max-width: 599px) {
  .service-card {
    width: 260px !important;
  }

  :deep(.v-slide-group__prev),
  :deep(.v-slide-group__next) {
    display: none !important;
  }
}
</style>
