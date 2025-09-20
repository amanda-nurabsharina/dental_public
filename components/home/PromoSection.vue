<template>
  <section class="promo-section py-16">
    <!-- Section Badge -->
    <div class="text-center mb-4">
      <v-chip color="primary-20" class="px-4 py-2" variant="flat">
        <span class="text-primary text-body-2">Promo Terbaru</span>
      </v-chip>
    </div>

    <!-- Section Heading -->
    <div
      class="d-flex flex-column flex-md-row align-center justify-space-between mb-16"
    >
      <h2 class="text-h3 font-weight-bold text-black">
        Promo Menarik untuk Anda
      </h2>
      <v-btn
        variant="outlined"
        color="primary"
        class="text-none rounded-xl mt-10 mt-md-0"
        elevation="0"
        to="/promos"
      >
        Lihat Semua Promo
      </v-btn>
    </div>

    <!-- Promo Images -->
    <div class="promos-carousel position-relative">
      <v-row>
        <v-col cols="12">
          <v-slide-group
            v-model="selectedPromo"
            class="pa-4"
            selected-class="bg-primary"
            show-arrows
          >
            <v-slide-group-item v-for="promo in promos" :key="promo.id">
              <v-img
                :src="promo.image"
                :alt="promo.title"
                width="666"
                height="444"
                cover
                class="promo-image mx-3 rounded-xl"
                @click="handlePromoClick(promo)"
              >
                <template #placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular indeterminate color="primary" />
                  </v-row>
                </template>
              </v-img>
            </v-slide-group-item>
          </v-slide-group>
        </v-col>
      </v-row>

      <!-- Navigation Dots -->
      <div class="text-center mt-6">
        <div class="d-inline-flex gap-2">
          <v-btn
            v-for="(_, i) in promos"
            :key="i"
            icon="mdi-circle"
            size="x-small"
            variant="text"
            :color="selectedPromo === i ? 'primary' : 'grey'"
            @click="selectedPromo = i"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

defineOptions({
  name: "PromoSection",
});

const router = useRouter();
const selectedPromo = ref(0);

const promos = [
  {
    id: "julid-2025",
    title: "JULID - Juli Jadi Irit",
    image: "/images/promos/julid.png",
    link: "/promos/julid-2025",
  },
  {
    id: "juleha-2025",
    title: "JULEHA - Juli Lebih Hemat",
    image: "/images/promos/julid.png",
    link: "/promos/juleha-2025",
  },
];

const handlePromoClick = (promo: (typeof promos)[0]) => {
  router.push(promo.link);
};
</script>

<style scoped>
.promo-section {
  background-color: white;
}

.promo-image {
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.promo-image:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
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
@media (max-width: 959px) {
  .v-img {
    width: 400px !important;
  }
}

@media (max-width: 599px) {
  .v-img {
    width: 320px !important;
  }

  :deep(.v-slide-group__prev),
  :deep(.v-slide-group__next) {
    display: none !important;
  }
}
</style>
