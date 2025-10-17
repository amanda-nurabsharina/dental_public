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
// Components are auto-imported in Nuxt 3
</script>
