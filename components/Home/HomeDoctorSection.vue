<template>
  <section class="container">
    <div
      class="flex flex-col gap-y-6 items-center text-center max-w-[50.125rem] mx-auto mb-10"
    >
      <v-chip color="primary">Dokter Kami</v-chip>
      <h2 class="heading-4 md:heading-2 text-grey-900">
        Tim Dokter Spesialis Terpercaya
      </h2>
      <p class="text-small-normal md:text-regular-normal">
        Didukung oleh tim medis berpengalaman dan bersertifikat dengan keahlian
        di berbagai bidang kedokteran gigi untuk memberikan perawatan terbaik
        sesuai kebutuhan Anda.
      </p>
    </div>
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10"
    >
      <DoctorCard v-for="doctor in doctors" :key="doctor.id" :doctor="doctor" />
    </div>
    <div class="flex justify-center mt-10">
      <v-btn size="large" variant="outlined" to="/doctors"
        >Lihat Semua Dokter</v-btn
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { DoctorContent } from '~/composables/useApi';

defineOptions({
  name: 'DoctorsSection',
});

interface LegacyDoctor {
  id: number;
  name: string;
  specialist: string;
  rating: number;
  photo: string;
  badge: string;
  badgeColor: string;
}

type DoctorCardData = LegacyDoctor | DoctorContent;

const doctors = ref<DoctorCardData[]>([]);
const { fetchMultiBranchDoctors } = useDoctors();

const loadDoctors = async () => {
  try {
    const response = await fetchMultiBranchDoctors('', 1, 8);
    if (response?.data?.length) {
      doctors.value = response.data;
    }
  } catch (error) {
    console.error('Failed to fetch doctors for home section:', error);
  }
};

onMounted(loadDoctors);
</script>

<style scoped></style>
