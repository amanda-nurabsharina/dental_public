<template>
  <section class="doctors-section py-16">
    <v-container>
      <h2 class="text-h3 text-center font-weight-bold mb-12">
        Meet Our Expert Doctors
      </h2>

      <v-row>
        <v-col
          v-for="(doctor, index) in doctors"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="h-100">
            <v-img :src="doctor.photo" height="400" cover></v-img>

            <v-card-item>
              <v-card-title class="text-h5 mb-1">
                {{ doctor.name }}
              </v-card-title>
              <v-card-subtitle class="mb-2">
                {{ doctor.specialist }}
              </v-card-subtitle>

              <v-rating
                v-model="doctor.rating"
                color="amber"
                density="compact"
                readonly
                half-increments
              ></v-rating>

              <v-card-text class="text-body-1">
                {{ doctor.description }}
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="green"
                  variant="text"
                  :to="'/doctors/' + doctor.id"
                >
                  View Profile
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="green"
                  variant="flat"
                  :to="'/reserve?doctor=' + doctor.id"
                >
                  Book Appointment
                </v-btn>
              </v-card-actions>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>

      <div class="text-center mt-8">
        <v-btn color="green" variant="outlined" size="large" to="/doctors">
          View All Doctors
        </v-btn>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialist: "Orthodontist",
    rating: 4.8,
    photo: "/images/doctor-1.jpg",
    description:
      "Specializing in braces and Invisalign with 15 years of experience in creating beautiful smiles.",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialist: "Cosmetic Dentist",
    rating: 4.9,
    photo: "/images/doctor-2.jpg",
    description:
      "Expert in cosmetic dentistry procedures including veneers, whitening, and smile makeovers.",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialist: "Pediatric Dentist",
    rating: 4.7,
    photo: "/images/doctor-3.jpg",
    description:
      "Dedicated to providing gentle and fun dental care for children of all ages.",
  },
];
</script>

<style scoped>
.doctors-section {
  background-color: white;
}

.v-card {
  transition: transform 0.3s;
}

.v-card:hover {
  transform: translateY(-8px);
}
</style>
