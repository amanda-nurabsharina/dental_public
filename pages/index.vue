<template>
  <div class="landing-page">
    <!-- Main content with white background -->
    <div class="main-content bg-white">
      <div class="page-container">
        <div class="content-wrapper">
          <HeroSection />
        </div>
        <div class="content-wrapper">
          <VisionSection />
        </div>
        <div class="content-wrapper">
          <ServicesSection />
        </div>
        <div class="content-wrapper">
          <DoctorsSection />
        </div>
        <div class="content-wrapper">
          <PromoSection />
        </div>
        <div class="content-wrapper">
          <TestimonialsSection />
        </div>
        <div class="content-wrapper">
          <ContactSection />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeroSection from "../components/home/HeroSection.vue";
import VisionSection from "../components/home/VisionSection.vue";
import ServicesSection from "../components/home/ServicesSection.vue";
import DoctorsSection from "../components/home/DoctorsSection.vue";
import PromoSection from "../components/home/PromoSection.vue";
import TestimonialsSection from "../components/home/TestimonialsSection.vue";
import ContactSection from "../components/home/ContactSection.vue";
</script>

<style scoped>
.landing-page {
  width: 100%;
  overflow-x: hidden;
}

.main-content,
.footer-section {
  width: 100%;
}

.page-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}

.content-wrapper {
  width: 100%;
  padding: 0 60px;
}

/* Responsive adjustments */
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
}

@media (max-width: 600px) {
  .content-wrapper {
    padding: 0 16px;
  }
}
</style>
