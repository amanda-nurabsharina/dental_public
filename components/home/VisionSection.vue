<template>
  <section class="vision-section py-16">
    <v-container>
      <h2 class="text-h3 text-center font-weight-bold mb-12">
        Why Choose Dental Diary?
      </h2>

      <v-row>
        <v-col
          v-for="(feature, index) in features"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="pa-6 h-100" variant="flat">
            <div class="d-flex flex-column align-center text-center">
              <v-icon
                :icon="feature.icon"
                color="green"
                size="48"
                class="mb-4"
              ></v-icon>
              <h3 class="text-h5 font-weight-bold mb-4">
                {{ feature.title }}
              </h3>
              <p class="text-body-1">
                {{ feature.description }}
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    icon: "mdi-heart",
    title: "Friendly Service",
    description: "Personal approach and warm atmosphere for every patient",
  },
  {
    icon: "mdi-certificate",
    title: "Expert Team",
    description: "Highly qualified professionals with years of experience",
  },
  {
    icon: "mdi-medical-bag",
    title: "Modern Equipment",
    description:
      "State-of-the-art technology for precise diagnostics and treatment",
  },
  {
    icon: "mdi-clock-outline",
    title: "Flexible Hours",
    description: "Convenient scheduling to fit your busy lifestyle",
  },
  {
    icon: "mdi-shield-check",
    title: "Safety First",
    description: "Strict adherence to sterilization and safety protocols",
  },
  {
    icon: "mdi-currency-usd",
    title: "Affordable Care",
    description: "Competitive pricing and flexible payment options",
  },
];
</script>

<style scoped>
.vision-section {
  background-color: white;
}
</style>
