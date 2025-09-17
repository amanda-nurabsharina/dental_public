<template>
  <v-app-bar color="white" elevation="1" class="px-4">
    <v-app-bar-nav-icon
      color="black"
      class="hidden-md-and-up"
      @click="drawer = !drawer"
    />

    <!-- Desktop Layout -->
    <div class="d-none d-md-flex align-center header-container">
      <!-- Brand -->
      <div class="brand-section">
        <NuxtLink to="/" class="text-decoration-none">
          <span class="text-h5 font-weight-bold text-primary">Dental Diary</span>
        </NuxtLink>
      </div>

      <!-- Navigation Links -->
      <div class="nav-links-section">
        <v-btn
          v-for="item in menuItems"
          :key="item.title"
          :to="item.to"
          variant="plain"
          class="mx-1 text-black hover-effect"
        >
          {{ item.title }}
        </v-btn>
      </div>

      <!-- Reserve Button -->
      <div class="reserve-section">
        <v-btn
          color="primary"
          class="text-white rounded-xl"
          variant="flat"
          to="/reserve"
          elevation="0"
        >
          Reserve Now <v-icon icon="mdi-arrow-right" />
        </v-btn>
      </div>
    </div>

    <!-- Mobile Title -->
    <v-app-bar-title class="d-md-none">
      <NuxtLink to="/" class="text-decoration-none">
        <span class="text-h5 font-weight-bold text-primary">Dental Diary</span>
      </NuxtLink>
    </v-app-bar-title>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" temporary location="left">
    <v-list>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.to"
        class="text-black"
        link
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
      <v-divider class="my-2" />
      <v-list-item to="/reserve" class="bg-primary text-white" link>
        <v-list-item-title>Reserve Now</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "MainHeader",
});

const drawer = ref(false);

const menuItems = [
  { title: "Home", to: "/" },
  { title: "Services", to: "/services" },
  { title: "Doctors", to: "/doctors" },
  { title: "Schedule", to: "/schedule" },
  { title: "Reviews", to: "/reviews" },
  { title: "Contact Us", to: "/contact" },
];
</script>

<style scoped>
.v-btn {
  text-transform: none;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.hover-effect {
  transition: opacity 0.2s ease;
}

.hover-effect:hover {
  opacity: 0.7;
}

/* Ensure consistent height on mobile */
.v-app-bar {
  min-height: 64px !important;
}

/* Brand link hover effect */
.v-app-bar-title a:hover {
  opacity: 0.9;
}

/* Header Layout */
.header-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
}

.nav-links-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.brand-section,
.reserve-section {
  flex-shrink: 0;
}

/* Ensure minimum spacing between sections */
.brand-section {
  margin-right: 16px;
}

.reserve-section {
  margin-left: 16px;
}
</style>
