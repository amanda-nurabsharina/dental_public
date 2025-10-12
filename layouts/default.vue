<template>
  <v-app>
    <TheHeader />

    <v-main>
      <slot />
    </v-main>

    <TheFooter />
  </v-app>
</template>

<script setup lang="ts">
import Footer from '~/components/Footer.vue';
</script>
