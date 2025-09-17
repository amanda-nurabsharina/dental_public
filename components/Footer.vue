<template>
  <v-footer class="bg-background pt-16">
    <v-container>
      <v-row class="footer-row">
        <!-- Brand Column -->
        <v-col cols="12" md="8" class="pr-md-16">
          <div class="brand-section">
            <h2 class="text-h5 font-weight-bold text-black mb-6">
              Dental Diary
            </h2>
            <p class="text-body-1 text-grey-darken-1">
              Memberikan pelayanan kesehatan gigi terbaik dengan teknologi
              modern dan pelayanan yang ramah.
            </p>
          </div>
        </v-col>

        <!-- Quick Links -->
        <v-col cols="12" md="2">
          <h3 class="text-h6 font-weight-medium mb-6">Tautan Cepat</h3>
          <v-list
            density="compact"
            bg-color="transparent"
            class="quick-links pa-0"
          >
            <v-list-item
              v-for="(link, index) in quickLinks"
              :key="index"
              :to="link.to"
              class="px-0 quick-link-item"
              color="grey-darken-1"
            >
              <v-list-item-title class="text-body-1">{{
                link.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- Contact Information -->
        <v-col cols="12" md="2">
          <h3 class="text-h6 font-weight-medium mb-6">Hubungi Kami</h3>
          <div class="contact-info">
            <div class="mb-4">
              <div class="d-flex align-center mb-3">
                <span class="text-body-1 text-grey-darken-1"
                  >+628 102-1292-1222</span
                >
              </div>
              <div class="d-flex align-center mb-3">
                <span class="text-body-1 text-grey-darken-1"
                  >dentaldiary@gmail.com</span
                >
              </div>
            </div>

            <div class="social-media">
              <h4 class="text-subtitle-1 font-weight-medium mb-4">
                Sosial Media
              </h4>
              <div class="d-flex gap-4">
                <v-btn
                  v-for="(social, index) in socialMedia"
                  :key="index"
                  :href="social.link"
                  target="_blank"
                  icon
                  color="primary"
                  variant="plain"
                  size="small"
                  class="social-btn"
                >
                  <v-icon>{{ social.icon }}</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Divider -->
      <v-divider class="my-6" color="grey-lighten-1" />

      <!-- Copyright -->
      <v-row>
        <v-col cols="12" class="text-center">
          <div class="text-caption text-grey-darken-1">
            © {{ new Date().getFullYear() }} Dental Diary. All rights reserved |
            <v-btn variant="text" color="primary" class="text-caption px-1"
              >Privacy Policy</v-btn
            >
            |
            <v-btn variant="text" color="primary" class="text-caption px-1"
              >Terms of Service</v-btn
            >
            |
            <v-btn variant="text" color="primary" class="text-caption px-1"
              >Sitemap</v-btn
            >
          </div>
          <div class="text-caption text-grey-darken-1 mt-1">
            Made with <v-icon color="red" size="small">mdi-heart</v-icon> by
            Michelle S
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
defineOptions({
  name: "MainFooter",
});

const quickLinks = [
  { title: "Home", to: "/", icon: "mdi-home" },
  { title: "Services", to: "/services", icon: "mdi-medical-bag" },
  { title: "Doctors", to: "/doctors", icon: "mdi-doctor" },
  { title: "Schedule", to: "/schedule", icon: "mdi-calendar" },
  { title: "Reviews", to: "/reviews", icon: "mdi-star" },
  { title: "Contact", to: "/contact", icon: "mdi-phone" },
];

const socialMedia = [
  { icon: "mdi-instagram", link: "https://instagram.com" },
  { icon: "mdi-facebook", link: "https://facebook.com" },
  { icon: "mdi-music-note", link: "https://tiktok.com" },
];
</script>

<style scoped>
.footer-row {
  --column-gap: 48px;
}

@media (min-width: 960px) {
  .footer-row > :nth-child(2),
  .footer-row > :nth-child(3) {
    padding-left: calc(var(--column-gap) / 2);
  }
}

.quick-link-item {
  min-height: 36px;
  transition: all 0.2s ease;
}

.quick-link-item:hover {
  color: var(--v-primary-base) !important;
  transform: translateX(4px);
}

.social-btn {
  transition: all 0.2s ease;
}

.social-btn:hover {
  transform: translateY(-2px);
}

/* Responsive adjustments */
@media (max-width: 959px) {
  .brand-section {
    margin-bottom: 40px;
  }

  .quick-links,
  .contact-info {
    margin-bottom: 32px;
  }
}
</style>
