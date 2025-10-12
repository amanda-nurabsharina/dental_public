<template>
  <v-footer class="bg-background pt-16">
    <div class="page-container">
      <div class="content-wrapper">
        <v-row class="footer-row">
          <!-- Brand Column -->
          <v-col cols="12" md="8" class="pr-md-16">
            <div class="brand-section">
              <h2 class="text-h5 font-weight-bold text-black mb-4">
                Dental Diary.
              </h2>
              <p class="text-body-1 text-black">
                Memberikan pelayanan kesehatan gigi terbaik dengan teknologi
                modern dan pelayanan yang ramah
              </p>
            </div>
          </v-col>

          <!-- Quick Links -->
          <v-col cols="12" md="2">
            <h3 class="text-subtitle-1 font-weight-bold mb-6">Tautan Cepat</h3>
            <div class="d-flex flex-column" style="gap: 16px">
              <NuxtLink
                v-for="(link, index) in quickLinks"
                :key="index"
                :to="link.to"
                class="quick-link text-body-1 text-decoration-none text-grey-darken-1"
              >
                {{ link.title }}
              </NuxtLink>
            </div>
          </v-col>

          <!-- Contact Information -->
          <v-col cols="12" md="2">
            <div class="d-flex flex-column gap-6">
              <!-- Contact -->
              <div>
                <h3 class="text-subtitle-1 font-weight-bold mb-6">
                  Hubungi Kami
                </h3>
                <div class="d-flex flex-column mb-6" style="gap: 24px">
                  <a
                    href="tel:+6281021292122"
                    class="text-body-1 text-decoration-none text-black"
                  >
                    +628 102-1292-1222
                  </a>
                  <a
                    href="mailto:dentaldiary@gmail.com"
                    class="text-body-1 text-decoration-none text-black"
                  >
                    dentaldiary@gmail.com
                  </a>
                </div>
              </div>

              <!-- Social Media -->
              <div>
                <h3 class="text-subtitle-1 font-weight-bold mb-4">
                  Sosial Media
                </h3>
                <div class="d-flex gap-4">
                  <a
                    v-for="social in socialMedia"
                    :key="social.icon"
                    :href="social.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-link text-decoration-none"
                  >
                    <v-icon :icon="social.icon" color="primary" size="24" />
                  </a>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- Divider -->
        <v-divider class="my-8" color="grey-lighten-2" />

        <!-- Copyright -->
        <div class="text-center text-caption text-grey-darken-1">
          © {{ new Date().getFullYear() }} Dental Diary. All Rights Reserved |
          <span>Privacy Policy</span>
          |
          <span>Terms of Service</span>
          |
          <span>Sitemap</span>
          <span class="mt-2">
            Made with
            <v-icon color="red" size="x-small" class="mx-1">mdi-heart</v-icon>
            by Michelle S
          </span>
        </div>
      </div>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MainFooter',
});

const quickLinks = [
  { title: 'Beranda', to: '/' },
  { title: 'Tentang Klinik', to: '/about' },
  { title: 'Layanan Unggulan', to: '/services' },
  { title: 'Dokter Kami', to: '/doctors' },
];

const socialMedia = [
  { icon: 'mdi-instagram', link: 'https://instagram.com/dentaldiary' },
  { icon: 'mdi-facebook', link: 'https://facebook.com/dentaldiary' },
  { icon: 'mdi-music-note', link: 'https://tiktok.com/@dentaldiary' },
];
</script>

<style scoped>
.page-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}

.content-wrapper {
  width: 100%;
  padding: 0 60px;
}

.footer-row {
  --column-gap: 48px;
}

@media (min-width: 960px) {
  .footer-row > :nth-child(2),
  .footer-row > :nth-child(3) {
    padding-left: calc(var(--column-gap) / 2);
  }
}

/* Links */
.quick-link {
  transition: all 0.2s ease;
}

.quick-link:hover {
  color: var(--v-primary-base) !important;
  transform: translateX(4px);
}

/* Social Media */
.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--v-primary-20-base);
  transition: all 0.2s ease;
}

.social-link:hover {
  transform: translateY(-4px);
  background-color: var(--v-primary-base);
}

.social-link:hover .v-icon {
  color: green !important;
}

/* Responsive max-width */
@media (max-width: 1560px) {
  .page-container {
    max-width: 1280px;
  }
}

@media (max-width: 1360px) {
  .page-container {
    max-width: 1120px;
  }
}

@media (max-width: 960px) {
  .content-wrapper {
    padding: 0 32px;
  }

  .brand-section {
    margin-bottom: 40px;
  }

  .footer-row > [class*='col-'] {
    margin-bottom: 32px;
  }

  .footer-row > [class*='col-']:last-child {
    margin-bottom: 0;
  }
}

@media (max-width: 600px) {
  .content-wrapper {
    padding: 0 16px;
  }
}
</style>
