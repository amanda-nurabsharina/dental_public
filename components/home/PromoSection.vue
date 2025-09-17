<template>
  <section class="promo-section py-16">
    <v-container>
      <h2 class="text-h3 text-center font-weight-bold mb-12">Special Offers</h2>

      <v-carousel
        cycle
        height="500"
        hide-delimiter-background
        show-arrows="hover"
      >
        <v-carousel-item
          v-for="(promo, i) in promos"
          :key="i"
          :src="promo.image"
          cover
        >
          <v-sheet class="fill-height" color="rgba(0, 0, 0, 0.5)">
            <v-container class="fill-height">
              <v-row align="center" justify="center">
                <v-col cols="12" md="8" class="text-center">
                  <div class="text-h4 font-weight-bold text-white mb-4">
                    {{ promo.title }}
                  </div>
                  <div class="text-h6 text-white mb-6">
                    {{ promo.description }}
                  </div>
                  <div class="text-h5 text-green mb-8">
                    {{ promo.discount }}
                  </div>
                  <v-btn color="green" size="large" :to="promo.link">
                    Book Now
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const promos = [
  {
    title: "New Patient Special",
    description: "Complete dental examination, cleaning, and X-rays",
    discount: "Save 30% Off Your First Visit",
    image: "/images/promo-1.jpg",
    link: "/reserve?promo=new-patient",
  },
  {
    title: "Family Package",
    description: "Dental check-ups for the whole family",
    discount: "Get 20% Off for 3 or More Family Members",
    image: "/images/promo-2.jpg",
    link: "/reserve?promo=family",
  },
  {
    title: "Teeth Whitening Special",
    description: "Professional teeth whitening treatment",
    discount: "Now Only $299 (Regular $499)",
    image: "/images/promo-3.jpg",
    link: "/reserve?promo=whitening",
  },
  {
    title: "Senior Citizen Discount",
    description: "Special care for our senior patients",
    discount: "25% Off All Services for Seniors",
    image: "/images/promo-4.jpg",
    link: "/reserve?promo=senior",
  },
];
</script>

<style scoped>
.promo-section {
  background-color: #f5f5f5;
}
</style>
