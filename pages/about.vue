<template>
  <div>
    <!-- Example: Override breadcrumb for this page with custom items -->
    <!-- <BaseBreadcrumb :items="customBreadcrumbs" /> -->

    <div class="page-container py-8">
      <h1 class="text-h3 font-weight-bold mb-4">Tentang Kami</h1>
      <p class="text-body-1">
        Halaman tentang kami dengan breadcrumb otomatis: Beranda / Tentang Kami
      </p>
    </div>
  </div>
</template>

<script setup>
// Example of custom breadcrumb items (commented out)
// const customBreadcrumbs = [
//   { title: 'Beranda', to: '/' },
//   { title: 'Tentang', to: '/about', disabled: true }
// ];

// Set page meta
definePageMeta({
  title: 'Tentang Kami',
});
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}
</style>
