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
                :loading="isLoadingBranches || isLoading"
                :disabled="isLoadingBranches || isLoading"
              />
            </div>

            <!-- Dokter -->
            <div class="space-y-2">
              <div class="text-regular-medium required">
                Dokter
                <span
                  v-if="useAvailableDoctors"
                  class="text-sm text-green-600 font-normal"
                >
                  (Dokter tersedia pada tanggal yang dipilih)
                </span>
              </div>
              <v-autocomplete
                v-model="form.dokter"
                v-model:search="doctorSearchQuery"
                :placeholder="
                  useAvailableDoctors
                    ? 'Pilih dokter yang tersedia'
                    : 'Cari dan pilih dokter'
                "
                variant="outlined"
                :items="dokterOptions"
                :loading="isLoadingDoctors || isLoading"
                :disabled="isLoading"
                item-title="title"
                item-value="value"
                clearable
                :no-data-text="
                  useAvailableDoctors
                    ? 'Tidak ada dokter tersedia pada tanggal/waktu yang dipilih'
                    : 'Tidak ada dokter ditemukan'
                "
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

            <!-- Waktu Kedatangan (Optional) -->
            <!-- <div class="space-y-2">
              <div class="text-regular-medium">Waktu Kedatangan (Opsional)</div>
              <v-text-field
                v-model="selectedTime"
                type="time"
                variant="outlined"
                :rounded="8"
                placeholder="Pilih waktu untuk melihat dokter yang tersedia"
                hint="Pilih waktu untuk melihat dokter yang tersedia pada jam tersebut"
              />
              <div v-if="form.tanggalKedatangan" class="text-sm text-gray-600">
                <v-switch
                  v-model="useAvailableDoctors"
                  color="primary"
                  :label="
                    useAvailableDoctors
                      ? 'Tampilkan dokter yang tersedia saja'
                      : 'Tampilkan semua dokter'
                  "
                  density="compact"
                  hide-details
                  @update:model-value="debouncedFetchDoctors(doctorSearchQuery)"
                />
              </div>
            </div> -->

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
                :loading="isSubmitting"
                :disabled="isSubmitting"
                @click="submitReservation"
              >
                {{ isSubmitting ? 'Memproses...' : 'Konfirmasi Reservasi' }}
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, computed, watch } from 'vue';
import type {
  Branch,
  Doctor,
  CreatePublicAppointmentRequest,
} from '~/composables/useApi';

// Composables
const { createPublicAppointment } = useAppointments();
const { fetchBranches } = useBranches();
const { fetchDoctors, getAvailableDoctors } = useDoctors();

// Reactive state
const form = reactive({
  nama: '',
  noTelepon: '',
  statusPasien: '' as 'married' | 'single' | '',
  cabangKlinik: '',
  dokter: '',
  tanggalKedatangan: '',
  rencanaPerawatan: '',
});

const isLoading = ref(false);
const isSubmitting = ref(false);
const isLoadingDoctors = ref(false);
const isLoadingBranches = ref(false);
const branches = ref<Branch[]>([]);
const doctors = ref<Doctor[]>([]);
const doctorSearchQuery = ref('');
const useAvailableDoctors = ref(false);
const selectedTime = ref('');

// Options for status pasien based on backend enum
const statusPasienOptions = [
  { title: 'Menikah', value: 'married' },
  { title: 'Belum Menikah', value: 'single' },
];

// Computed options for selects
const cabangKlinikOptions = computed(() =>
  branches.value.map((branch) => ({
    title: branch.name,
    value: branch.id,
  }))
);

const dokterOptions = computed(() =>
  doctors.value.map((doctor) => ({
    title: doctor.user?.profile?.full_name || `Doctor ${doctor.id}`,
    subtitle: useAvailableDoctors.value
      ? `${
          doctor.user?.profile?.specialization || 'Kedokteran Gigi Umum'
        } - Tersedia pada tanggal ini`
      : doctor.user?.profile?.specialization || 'Kedokteran Gigi Umum',
    value: doctor.id,
  }))
);

// Submit function with API integration
const submitReservation = async () => {
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

  isSubmitting.value = true;

  try {
    // Prepare appointment date in ISO format
    const appointmentDate = new Date(form.tanggalKedatangan).toISOString();

    const requestData: CreatePublicAppointmentRequest = {
      doctor_id: form.dokter,
      clinic_branch_id: form.cabangKlinik,
      phone_number: form.noTelepon,
      treatment_plan: form.rencanaPerawatan || '',
      appointment_date: appointmentDate,
      name: form.nama,
      status_patient: form.statusPasien as 'married' | 'single',
      description: form.rencanaPerawatan || '',
    };

    console.log('Submitting reservation:', requestData);

    const response = await createPublicAppointment(requestData);

    console.log('Reservation created successfully:', response);
    alert('Reservasi berhasil dibuat! Kami akan menghubungi Anda segera.');

    // Reset form after successful submission
    Object.keys(form).forEach((key) => {
      form[key as keyof typeof form] = '';
    });
  } catch (error: unknown) {
    console.error('Error creating reservation:', error);

    let errorMessage =
      'Terjadi kesalahan saat membuat reservasi. Silakan coba lagi.';

    if (error && typeof error === 'object' && 'data' in error) {
      const apiError = error as { data?: { message?: string } };
      if (apiError.data?.message) {
        errorMessage = apiError.data.message;
      }
    } else if (error instanceof Error && error.message) {
      errorMessage = error.message;
    }

    alert(errorMessage);
  } finally {
    isSubmitting.value = false;
  }
};

// Debounced doctor search function
const fetchDoctorsWithSearch = async (searchQuery = '') => {
  isLoadingDoctors.value = true;
  try {
    let doctorsData: Doctor[];

    // Use available doctors if date is selected and we have a date
    if (useAvailableDoctors.value && form.tanggalKedatangan) {
      doctorsData = await getAvailableDoctors(
        form.tanggalKedatangan,
        selectedTime.value
      );
      // Filter by search query if provided
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        doctorsData = doctorsData.filter((doctor) =>
          doctor.user?.profile?.full_name?.toLowerCase().includes(searchLower)
        );
      }
    } else {
      // Fallback to regular search
      doctorsData = await fetchDoctors(searchQuery, 1, 50);
    }

    doctors.value = doctorsData;
  } catch (error) {
    console.error('Error fetching doctors:', error);
  } finally {
    isLoadingDoctors.value = false;
  }
};

const debouncedFetchDoctors = useDebounceFn(fetchDoctorsWithSearch, 300);

// Fetch available doctors when date changes
const fetchAvailableDoctorsForDate = async () => {
  if (!form.tanggalKedatangan) {
    useAvailableDoctors.value = false;
    return;
  }

  useAvailableDoctors.value = true;
  form.dokter = ''; // Clear selected doctor when date changes
  await debouncedFetchDoctors(doctorSearchQuery.value);
};

// Watch for doctor search query changes
watch(doctorSearchQuery, (newQuery) => {
  debouncedFetchDoctors(newQuery);
});

// Watch for date changes to fetch available doctors
watch(
  () => form.tanggalKedatangan,
  () => {
    fetchAvailableDoctorsForDate();
  }
);

// Watch for time changes to refetch available doctors
watch(selectedTime, () => {
  if (form.tanggalKedatangan) {
    fetchAvailableDoctorsForDate();
  }
});

// Load branches and doctors separately for better UX
const loadBranches = async () => {
  isLoadingBranches.value = true;
  try {
    const branchesData = await fetchBranches();
    branches.value = branchesData;
  } catch (error) {
    console.error('Error loading branches:', error);
  } finally {
    isLoadingBranches.value = false;
  }
};

// Load data on component mount
onMounted(async () => {
  isLoading.value = true;
  try {
    // Load branches and doctors in parallel for better performance
    await Promise.all([loadBranches(), debouncedFetchDoctors('')]);
  } catch (error) {
    console.error('Error loading initial data:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>
<style></style>
