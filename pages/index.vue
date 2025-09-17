<template>
  <div class="landing-page">
    <!-- Main content with white background -->
    <div class="main-content bg-white">
      <div class="section-container">
        <HeroSection />
      </div>
      <div class="section-container">
        <VisionSection />
      </div>
      <div class="section-container">
        <ServicesSection />
      </div>
      <div class="section-container">
        <DoctorsSection />
      </div>
      <div class="section-container">
        <PromoSection />
      </div>
      <div class="section-container">
        <TestimonialsSection />
      </div>
    </div>

    <!-- Footer section with background color -->
    <div
      class="footer-section"
      style="background-color: var(--v-background-base)"
    >
      <div class="section-container">
        <ContactSection />
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
}

.main-content {
  width: 100%;
}

.footer-section {
  width: 100%;
}

.section-container {
  width: 100%;
  padding: 0 60px;
}

/* Responsive padding for smaller screens */
@media (max-width: 960px) {
  .section-container {
    padding: 0 32px;
  }
}

@media (max-width: 600px) {
  .section-container {
    padding: 0 16px;
  }
}
</style>
