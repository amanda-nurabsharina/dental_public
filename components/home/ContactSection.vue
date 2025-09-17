<template>
  <section class="contact-section py-16">
    <v-container>
      <h2 class="text-h3 text-center font-weight-bold mb-4">Contact Us</h2>
      <p class="text-body-1 text-center mb-12">
        We're here to help! Get in touch with us for any questions or to
        schedule an appointment.
      </p>

      <v-carousel
        cycle
        height="600"
        hide-delimiter-background
        show-arrows="hover"
      >
        <v-carousel-item v-for="(location, i) in locations" :key="i">
          <v-row>
            <!-- Contact Information -->
            <v-col cols="12" md="6">
              <v-card class="h-100 pa-6">
                <h3 class="text-h5 font-weight-bold mb-6">
                  {{ location.name }}
                </h3>

                <div class="mb-6">
                  <div class="d-flex align-center mb-4">
                    <v-icon
                      icon="mdi-map-marker"
                      color="green"
                      class="mr-4"
                      size="24"
                    ></v-icon>
                    <div class="text-body-1">
                      {{ location.address }}
                    </div>
                  </div>

                  <div class="d-flex align-center mb-4">
                    <v-icon
                      icon="mdi-phone"
                      color="green"
                      class="mr-4"
                      size="24"
                    ></v-icon>
                    <div class="text-body-1">
                      {{ location.phone }}
                    </div>
                  </div>

                  <div class="d-flex align-center mb-4">
                    <v-icon
                      icon="mdi-whatsapp"
                      color="green"
                      class="mr-4"
                      size="24"
                    ></v-icon>
                    <div class="text-body-1">
                      {{ location.whatsapp }}
                    </div>
                  </div>

                  <div class="d-flex align-center mb-4">
                    <v-icon
                      icon="mdi-email"
                      color="green"
                      class="mr-4"
                      size="24"
                    ></v-icon>
                    <div class="text-body-1">
                      {{ location.email }}
                    </div>
                  </div>

                  <div class="d-flex align-center">
                    <v-icon
                      icon="mdi-clock-outline"
                      color="green"
                      class="mr-4"
                      size="24"
                    ></v-icon>
                    <div>
                      <div class="text-body-1 font-weight-bold mb-2">
                        Opening Hours:
                      </div>
                      <div
                        v-for="(hours, day) in location.hours"
                        :key="day"
                        class="text-body-2"
                      >
                        {{ day }}: {{ hours }}
                      </div>
                    </div>
                  </div>
                </div>

                <v-btn
                  color="green"
                  block
                  size="large"
                  :to="'/reserve?location=' + location.id"
                >
                  Book Appointment
                </v-btn>
              </v-card>
            </v-col>

            <!-- Map -->
            <v-col cols="12" md="6">
              <v-card class="h-100">
                <iframe
                  :src="location.mapUrl"
                  width="100%"
                  height="600"
                  style="border: 0"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </v-card>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const locations = [
  {
    id: 1,
    name: "Dental Diary - Main Branch",
    address: "123 Main Street, Downtown, City, 12345",
    phone: "+1 (555) 123-4567",
    whatsapp: "+1 (555) 123-4567",
    email: "main@dentaldiary.com",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...",
    hours: {
      "Monday - Friday": "9:00 AM - 7:00 PM",
      Saturday: "9:00 AM - 5:00 PM",
      Sunday: "Closed",
    },
  },
  {
    id: 2,
    name: "Dental Diary - North Branch",
    address: "456 North Avenue, Northside, City, 12346",
    phone: "+1 (555) 234-5678",
    whatsapp: "+1 (555) 234-5678",
    email: "north@dentaldiary.com",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...",
    hours: {
      "Monday - Friday": "8:00 AM - 6:00 PM",
      Saturday: "9:00 AM - 4:00 PM",
      Sunday: "Closed",
    },
  },
  {
    id: 3,
    name: "Dental Diary - East Branch",
    address: "789 East Boulevard, Eastside, City, 12347",
    phone: "+1 (555) 345-6789",
    whatsapp: "+1 (555) 345-6789",
    email: "east@dentaldiary.com",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...",
    hours: {
      "Monday - Friday": "8:30 AM - 6:30 PM",
      Saturday: "9:00 AM - 3:00 PM",
      Sunday: "Closed",
    },
  },
];
</script>

<style scoped>
.contact-section {
  background-color: #f5f5f5;
}
</style>
