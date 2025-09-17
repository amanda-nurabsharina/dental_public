<template>
  <section class="testimonials-section py-16">
    <v-container>
      <h2 class="text-h3 text-center font-weight-bold mb-12">
        What Our Patients Say
      </h2>

      <v-carousel
        cycle
        height="400"
        hide-delimiter-background
        show-arrows="hover"
      >
        <v-carousel-item
          v-for="(page, pageIndex) in testimonialPages"
          :key="pageIndex"
        >
          <v-row>
            <v-col
              v-for="(testimonial, index) in page"
              :key="index"
              cols="12"
              md="4"
            >
              <v-card class="h-100 pa-6" variant="outlined">
                <div class="d-flex flex-column h-100">
                  <v-rating
                    v-model="testimonial.rating"
                    color="amber"
                    density="compact"
                    readonly
                    half-increments
                    class="mb-4"
                  ></v-rating>

                  <v-card-text class="text-body-1 flex-grow-1">
                    "{{ testimonial.comment }}"
                  </v-card-text>

                  <v-divider class="mb-4"></v-divider>

                  <div class="d-flex align-center">
                    <v-avatar
                      :image="testimonial.avatar"
                      size="48"
                      class="mr-4"
                    ></v-avatar>
                    <div>
                      <div class="text-subtitle-1 font-weight-bold">
                        {{ testimonial.name }}
                      </div>
                      <div class="text-caption text-grey">
                        {{ testimonial.date }}
                      </div>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    name: "Emma Thompson",
    avatar: "/images/avatar-1.jpg",
    rating: 5,
    comment:
      "Amazing experience! Dr. Johnson and her team made my Invisalign journey so smooth and comfortable.",
    date: "September 2025",
  },
  {
    name: "James Wilson",
    avatar: "/images/avatar-2.jpg",
    rating: 4.5,
    comment:
      "Very professional service. The staff is friendly and the facilities are modern and clean.",
    date: "August 2025",
  },
  {
    name: "Sofia Garcia",
    avatar: "/images/avatar-3.jpg",
    rating: 5,
    comment:
      "Best dental clinic in town! My kids love coming here for their check-ups.",
    date: "August 2025",
  },
  {
    name: "David Chen",
    avatar: "/images/avatar-4.jpg",
    rating: 5,
    comment:
      "Excellent cosmetic dentistry work. My new veneers look absolutely natural!",
    date: "July 2025",
  },
  {
    name: "Linda Martinez",
    avatar: "/images/avatar-5.jpg",
    rating: 4.5,
    comment:
      "Very thorough cleaning and examination. The hygienist was gentle and informative.",
    date: "July 2025",
  },
  {
    name: "Michael Brown",
    avatar: "/images/avatar-6.jpg",
    rating: 5,
    comment:
      "Great emergency service when I needed it most. Available 24/7 and very responsive.",
    date: "June 2025",
  },
  {
    name: "Sarah Anderson",
    avatar: "/images/avatar-7.jpg",
    rating: 5,
    comment:
      "The team here is amazing! They made my dental implant procedure completely painless.",
    date: "June 2025",
  },
  {
    name: "Robert Taylor",
    avatar: "/images/avatar-8.jpg",
    rating: 4.5,
    comment:
      "Very reasonable prices and they accept all major insurance plans. Highly recommend!",
    date: "May 2025",
  },
  {
    name: "Emily White",
    avatar: "/images/avatar-9.jpg",
    rating: 5,
    comment:
      "Dr. Chen is fantastic! He explained everything in detail and made me feel at ease.",
    date: "May 2025",
  },
  {
    name: "Daniel Lee",
    avatar: "/images/avatar-10.jpg",
    rating: 5,
    comment:
      "State-of-the-art equipment and very knowledgeable staff. Best dental experience ever!",
    date: "April 2025",
  },
  {
    name: "Maria Rodriguez",
    avatar: "/images/avatar-11.jpg",
    rating: 4.5,
    comment:
      "Love the family-friendly atmosphere. My whole family comes here for dental care.",
    date: "April 2025",
  },
  {
    name: "Thomas Wilson",
    avatar: "/images/avatar-12.jpg",
    rating: 5,
    comment:
      "The teeth whitening treatment gave amazing results. Very happy with the outcome!",
    date: "March 2025",
  },
  {
    name: "Anna Kim",
    avatar: "/images/avatar-13.jpg",
    rating: 5,
    comment:
      "Professional and caring staff. They really go above and beyond for patient care.",
    date: "March 2025",
  },
  {
    name: "William Johnson",
    avatar: "/images/avatar-14.jpg",
    rating: 4.5,
    comment:
      "Excellent orthodontic care. My daughter's braces experience has been great.",
    date: "February 2025",
  },
  {
    name: "Rachel Green",
    avatar: "/images/avatar-15.jpg",
    rating: 5,
    comment:
      "The most comfortable dental office I've ever been to. Highly recommended!",
    date: "February 2025",
  },
];

// Group testimonials into pages of 3
const testimonialPages = testimonials.reduce((acc, curr, i) => {
  const pageIndex = Math.floor(i / 3);
  if (!acc[pageIndex]) {
    acc[pageIndex] = [];
  }
  acc[pageIndex].push(curr);
  return acc;
}, [] as (typeof testimonials)[]);
</script>

<style scoped>
.testimonials-section {
  background-color: white;
}

.v-card {
  transition: transform 0.3s;
}

.v-card:hover {
  transform: translateY(-4px);
}
</style>
