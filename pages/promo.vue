<template lang="">
  <div>
    <BaseBreadcrumb />
    <div class="container mt-14 mb-16">
      <p class="text-regular-light text-neutral-60 mb-10">
        Menampilkan 1-10 of 170 hasil
      </p>

      <div class="grid md:grid-cols-2 gap-10 mb-10">
        <!-- Promo Card -->
        <div
          v-for="promo in promos"
          :key="promo.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img :src="promo.image" :alt="promo.title" class="w-full h-auto" />
        </div>
      </div>

      <v-pagination
        v-model="page"
        :length="length"
        rounded="circle"
        :total-visible="6"
        color="black"
        variant="text"
        active-color="primary"
      >
        <template #prev>
          <v-btn
            class="!size-12"
            :variant="page === 1 ? 'text' : 'outlined'"
            :class="[page === 1 ? '!bg-grey-100' : '!border-grey-200']"
            :ripple="page !== 1"
            @click="goToPreviousPage"
          >
            <IconRightArrowSlim
              size="16"
              class="rotate-180"
              :class="[page === 1 ? 'text-grey-300' : 'text-black']"
            />
          </v-btn>
        </template>
        <template #next>
          <v-btn
            class="!size-12"
            :variant="page === length ? 'text' : 'outlined'"
            :class="[page === length ? '!bg-grey-100' : '!border-grey-200']"
            :ripple="page !== length"
            @click="goToNextPage"
          >
            <IconRightArrowSlim
              size="16"
              :color-class="[page === length ? 'text-grey-300' : 'text-black']"
            />
          </v-btn>
        </template>
      </v-pagination>
    </div>
  </div>
</template>
<script setup>
const promos = [
  {
    id: 'julid-2025',
    title: 'JULID - Juli Jadi Irit',
    image: '/images/promos/julid.png',
    link: '/promos/julid-2025',
  },
  {
    id: 'juleha-2025',
    title: 'JULEHA - Juli Lebih Hemat',
    image: '/images/promos/julid.png',
    link: '/promos/juleha-2025',
  },
  {
    id: 'julehas-2025',
    title: 'JULEHA - Juli Lebih Hemat',
    image: '/images/promos/julid.png',
    link: '/promos/juleha-2025',
  },
  {
    id: 'julehas-2025',
    title: 'JULEHA - Juli Lebih Hemat',
    image: '/images/promos/julid.png',
    link: '/promos/juleha-2025',
  },
];

const page = ref(1);
const length = ref(21);

// Navigation functions
const goToPreviousPage = () => {
  if (page.value > 1) {
    page.value--;
  }
};

const goToNextPage = () => {
  if (page.value < length.value) {
    page.value++;
  }
};
</script>
<style lang=""></style>
