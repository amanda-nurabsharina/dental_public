<template>
  <section class="contact-section py-16">
    <!-- Section Badge -->
    <div class="text-center mb-4">
      <v-chip color="primary-20" class="px-4 py-2" variant="flat">
        <span class="text-primary text-body-2">Kontak Kami</span>
      </v-chip>
    </div>

    <!-- Section Heading -->
    <h2 class="text-h3 text-center font-weight-bold mb-4 text-black">
      Hubungi Kami
    </h2>

    <!-- Section Description -->
    <p
      class="text-body-1 text-grey-darken-1 text-center mb-16 max-w-lg mx-auto"
    >
      Didukung oleh tim medis berpengalaman dan bersertifikat dengan keahlian di
      berbagai bidang kedokteran gigi untuk memberikan perawatan terbaik sesuai
      kebutuhan Anda.
    </p>

    <!-- Branch Slider -->
    <div class="branch-slider position-relative">
      <!-- Navigation Arrows -->
      <div class="d-none d-md-flex navigation-arrows">
        <v-btn
          icon="mdi-chevron-left"
          variant="flat"
          size="large"
          color="primary"
          class="nav-arrow prev-arrow"
          :disabled="selectedBranch === 0"
          @click="selectedBranch--"
        />
        <v-btn
          icon="mdi-chevron-right"
          variant="flat"
          size="large"
          color="primary"
          class="nav-arrow next-arrow"
          :disabled="selectedBranch === branches.length - 1"
          @click="selectedBranch++"
        />
      </div>

      <!-- Branch Content -->
      <v-window v-model="selectedBranch" class="branch-window">
        <v-window-item
          v-for="branch in branches"
          :key="branch.id"
          :value="branches.indexOf(branch)"
        >
          <v-row>
            <!-- Contact Information -->
            <v-col cols="12" md="6">
              <v-card class="contact-card pa-8" variant="flat" rounded="xl">
                <h3 class="text-h5 font-weight-bold mb-8">
                  {{ branch.name }}
                </h3>

                <div class="contact-info">
                  <!-- Location -->
                  <div class="contact-item mb-6">
                    <div class="d-flex align-center mb-2">
                      <v-icon
                        color="primary"
                        icon="mdi-map-marker"
                        size="20"
                        class="mr-4"
                      />
                      <span class="text-subtitle-1 font-weight-medium"
                        >Lokasi</span
                      >
                    </div>
                    <p class="text-body-1 text-grey-darken-1 ml-9">
                      {{ branch.address }}
                    </p>
                  </div>

                  <!-- Email -->
                  <div class="contact-item mb-6">
                    <div class="d-flex align-center mb-2">
                      <v-icon
                        color="primary"
                        icon="mdi-email"
                        size="20"
                        class="mr-4"
                      />
                      <span class="text-subtitle-1 font-weight-medium"
                        >Email</span
                      >
                    </div>
                    <p class="text-body-1 text-grey-darken-1 ml-9">
                      {{ branch.email }}
                    </p>
                  </div>

                  <!-- WhatsApp -->
                  <div class="contact-item">
                    <div class="d-flex align-center mb-2">
                      <v-icon
                        color="primary"
                        icon="mdi-whatsapp"
                        size="20"
                        class="mr-4"
                      />
                      <span class="text-subtitle-1 font-weight-medium"
                        >Whatsapp</span
                      >
                    </div>
                    <p class="text-body-1 text-grey-darken-1 ml-9">
                      {{ branch.whatsapp }}
                    </p>
                  </div>
                </div>
              </v-card>
            </v-col>

            <!-- Map -->
            <v-col cols="12" md="6">
              <v-card class="map-card h-100" variant="flat" rounded="xl">
                <div class="map-container">
                  <iframe
                    :src="branch.mapUrl"
                    width="100%"
                    height="100%"
                    style="border: 0"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  />
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>

      <!-- Navigation Dots -->
      <div class="text-center mt-6">
        <div class="d-inline-flex gap-2">
          <v-btn
            v-for="(_, i) in branches"
            :key="i"
            icon="mdi-circle"
            size="x-small"
            variant="text"
            :color="selectedBranch === i ? 'primary' : 'grey'"
            @click="selectedBranch = i"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "ContactSection",
});

const selectedBranch = ref(0);

const branches = [
  {
    id: "bengkong",
    name: "Klinik Gigi Nadira Tusam - Bengkong",
    address:
      "Perkokoan Esqarada, Bengkong Harapan 1 Blok A No. 8, Kel. Bengkong Laut, Kec. Bengkong, Kota Batam 29444",
    email: "dentaldiary@gmail.com",
    whatsapp: "+628 102-1292-1222",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...",
  },
  {
    id: "tiban",
    name: "Klinik Gigi Nadira Tusam - Tiban",
    address:
      "Komplek Tiban Centre, Blok B No. 15, Kel. Tiban Baru, Kec. Sekupang, Kota Batam 29425",
    email: "dentaldiary.tiban@gmail.com",
    whatsapp: "+628 102-1292-1333",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...",
  },
  {
    id: "batamcenter",
    name: "Klinik Gigi Nadira Tusam - Batam Center",
    address:
      "Komplek Windsor Central, Blok C No. 28, Kel. Teluk Tering, Kec. Batam Kota, Kota Batam 29461",
    email: "dentaldiary.center@gmail.com",
    whatsapp: "+628 102-1292-1444",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...",
  },
];
</script>

<style scoped>
.contact-section {
  background-color: white;
}

.max-w-lg {
  max-width: 640px;
  margin: 0 auto;
}

.branch-slider {
  overflow: hidden;
}

.contact-card,
.map-card {
  border: 1px solid #eee;
  height: 100%;
  transition: all 0.3s ease;
}

.contact-card:hover,
.map-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.map-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
}

.map-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

/* Navigation Arrows */
.navigation-arrows {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  z-index: 1;
  justify-content: space-between;
  pointer-events: none;
  padding: 0 16px;
}

.nav-arrow {
  pointer-events: auto;
  background-color: white !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

.prev-arrow {
  transform: translateX(-50%);
}

.next-arrow {
  transform: translateX(50%);
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

/* Window Transitions */
:deep(.v-window__container) {
  height: auto !important;
}

:deep(.v-window-item) {
  transition: all 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 959px) {
  .map-card {
    height: 400px;
    margin-top: 24px;
  }
}
</style>
