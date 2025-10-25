<template>
  <div>
    <BaseBreadcrumb />
    <div class="container mt-16 mb-16">
      <v-card border class="!rounded-lg">
        <v-card-title>
          <span class="!text-medium-medium">Reservasi</span>
        </v-card-title>
        <v-divider />

        <v-card-text class="!pt-6 !pb-16 md:!px-10">
          <div class="flex flex-col md:grid grid-cols-2 gap-x-5 gap-y-1.5">
            <!-- Nama -->
            <div class="space-y-2">
              <div class="text-regular-medium required">Nama</div>
              <v-text-field
                v-model="form.nama"
                placeholder="Masukkan nama"
                variant="outlined"
              />
            </div>

            <!-- No Telepon -->
            <div class="space-y-2">
              <div class="text-regular-medium required">No Telepon</div>
              <v-text-field
                v-model="form.noTelepon"
                placeholder="Masukkan nomor telepon"
                variant="outlined"
                type="tel"
              />
            </div>

            <!-- Status Pasien -->
            <div class="space-y-2">
              <div class="text-regular-medium required">Status Pasien</div>
              <v-select
                v-model="form.statusPasien"
                placeholder="Pilih status pasien"
                variant="outlined"
                :items="statusPasienOptions"
              />
            </div>

            <!-- Cabang Klinik -->
            <div class="space-y-2">
              <div class="text-regular-medium required">Cabang Klinik</div>
              <v-select
                v-model="form.cabangKlinik"
                placeholder="Pilih cabang klinik"
                variant="outlined"
                :items="cabangKlinikOptions"
              />
            </div>

            <!-- Dokter -->
            <div class="space-y-2">
              <div class="text-regular-medium required">Dokter</div>
              <v-select
                v-model="form.dokter"
                placeholder="Pilih dokter"
                variant="outlined"
                :items="dokterOptions"
              />
            </div>

            <!-- Tanggal Kedatangan -->
            <div class="space-y-2">
              <div class="text-regular-medium required">Tanggal Kedatangan</div>
              <v-text-field
                v-model="form.tanggalKedatangan"
                type="date"
                variant="outlined"
                :rounded="8"
              />
            </div>

            <div
              class="col-span-full p-6 rounded-2xl flex flex-col md:flex-row w-full gap-6 border border-grey-200 mb-7"
            >
              <div
                class="md:max-w-[8.125rem] w-full h-auto max-h-[20.5rem] rounded-[1.25rem] overflow-hidden"
              >
                <img
                  src="/images/doctors/doctor2.png"
                  alt=""
                  class="h-full w-full object-cover object-center"
                />
              </div>
              <div class="space-y-2">
                <div class="text-small-bold text-primary">
                  Kedokteran Gigi Anak
                </div>
                <div class="text-large-semibold">drg. Shine Sari</div>
                <p class="text-regular-normal">
                  Spesialis anak dengan pendekatan ramah dan teknik khusus
                  mengatasi kecemasan dental pada anak.
                </p>
                <div class="flex items-center gap-x-2">
                  <IconStar />
                  4,9
                </div>
                <div class="text-regular-bold">Jadwal Praktek</div>
                <div>Senin - Rabu</div>
              </div>
            </div>

            <!-- Rencana Perawatan -->
            <div class="space-y-2 col-span-full">
              <div class="text-regular-medium">Rencana Perawatan</div>
              <v-textarea
                v-model="form.rencanaPerawatan"
                placeholder="Masukkan rencana perawatan"
                variant="outlined"
                rows="4"
              />
            </div>

            <!-- Submit Button -->
            <div class="col-span-2 pt-2">
              <v-btn
                color="primary"
                size="x-large"
                class="!glowing-btn-primary"
                @click="submitReservation"
              >
                Konfirmasi Reservasi
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';

// Form data
const form = reactive({
  nama: '',
  noTelepon: '',
  statusPasien: '',
  cabangKlinik: '',
  dokter: '',
  tanggalKedatangan: '',
  rencanaPerawatan: '',
});

// Options for select dropdowns
const statusPasienOptions = [
  { title: 'Pasien Baru', value: 'baru' },
  { title: 'Pasien Lama', value: 'lama' },
];

const cabangKlinikOptions = [
  { title: 'Cabang Jakarta Pusat', value: 'jakarta-pusat' },
  { title: 'Cabang Jakarta Selatan', value: 'jakarta-selatan' },
  { title: 'Cabang Jakarta Utara', value: 'jakarta-utara' },
  { title: 'Cabang Jakarta Barat', value: 'jakarta-barat' },
  { title: 'Cabang Jakarta Timur', value: 'jakarta-timur' },
];

const dokterOptions = [
  { title: 'Dr. Ahmad Santoso, Sp.KG', value: 'dr-ahmad-santoso' },
  { title: 'Dr. Sari Wijaya, Sp.KGA', value: 'dr-sari-wijaya' },
  { title: 'Dr. Budi Pratama, Sp.BM', value: 'dr-budi-pratama' },
  { title: 'Dr. Rina Kusuma, Sp.Ort', value: 'dr-rina-kusuma' },
  { title: 'Dr. Hendro Setiawan, Sp.KG', value: 'dr-hendro-setiawan' },
];

// Submit function
const submitReservation = () => {
  // Validate required fields
  const requiredFields = [
    'nama',
    'noTelepon',
    'statusPasien',
    'cabangKlinik',
    'dokter',
    'tanggalKedatangan',
  ];
  const emptyFields = requiredFields.filter(
    (field) => !form[field as keyof typeof form]
  );

  if (emptyFields.length > 0) {
    alert('Mohon lengkapi semua field yang wajib diisi!');
    return;
  }

  // Process reservation
  console.log('Form data:', form);
  alert('Reservasi berhasil dibuat!');

  // Reset form after successful submission
  Object.keys(form).forEach((key) => {
    form[key as keyof typeof form] = '';
  });
};
</script>
<style></style>
