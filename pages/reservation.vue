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
                v-model="nama"
                placeholder="Masukkan nama"
                variant="outlined"
                v-bind="namaProps"
              />
            </div>

            <!-- No Telepon -->
            <div class="space-y-2">
              <div class="text-regular-medium required">No Telepon</div>
              <v-text-field
                v-model="noTelepon"
                placeholder="Masukkan nomor telepon"
                variant="outlined"
                type="tel"
                v-bind="noTeleponProps"
              />
            </div>

            <!-- Status Pasien -->
            <div class="space-y-2">
              <div class="text-regular-medium required">Status Pasien</div>
              <v-select
                v-model="statusPasien"
                placeholder="Pilih status pasien"
                persistent-placeholder
                variant="outlined"
                :items="statusPasienOptions"
                v-bind="statusPasienProps"
              />
            </div>

            <!-- Cabang Klinik -->
            <div class="space-y-2">
              <div class="text-regular-medium required">Cabang Klinik</div>
              <v-select
                v-model="cabangKlinik"
                placeholder="Pilih cabang klinik"
                variant="outlined"
                :items="cabangKlinikOptions"
                :loading="isLoadingBranches || isLoading"
                :disabled="isLoadingBranches || isLoading"
                v-bind="cabangKlinikProps"
              />
            </div>

            <!-- Tanggal Kedatangan -->
            <div class="space-y-2">
              <div class="text-regular-medium required">Tanggal Kedatangan</div>
              <v-date-input
                v-model="tanggalKedatanganInput"
                variant="outlined"
                :rounded="8"
                prepend-icon=""
                prepend-inner-icon="mdi-calendar"
                v-bind="tanggalKedatanganProps"
              />
            </div>

            <!-- Waktu Kedatangan -->
            <div class="space-y-2">
              <div class="text-regular-medium">Waktu Kedatangan (Opsional)</div>
              <v-text-field
                v-model="selectedTime"
                placeholder="Pilih waktu kedatangan"
                variant="outlined"
                type="time"
                clearable
                prepend-inner-icon="mdi-clock-outline"
                :disabled="!tanggalKedatangan"
                hint="Pilih waktu untuk filter dokter yang tersedia"
                persistent-hint
                @focus="onTimeFocus"
              >
                <v-menu
                  v-model="showTimeMenu"
                  :close-on-content-click="false"
                  activator="parent"
                  min-width="0"
                >
                  <v-time-picker
                    v-model="selectedTime"
                    format="24hr"
                    color="primary"
                    @update:minute="onMinutePicked"
                  />
                </v-menu>
              </v-text-field>
            </div>

            <!-- Dokter -->
            <div class="space-y-2">
              <div class="text-regular-medium required">
                Dokter
              </div>
              <v-autocomplete
                v-model="dokter"
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
                :hint="doctorFieldHint"
                :persistent-hint="Boolean(doctorFieldHint)"
                :no-data-text="
                  useAvailableDoctors
                    ? 'Tidak ada dokter tersedia pada tanggal/waktu yang dipilih'
                    : 'Tidak ada dokter ditemukan'
                "
                v-bind="dokterProps"
              />
            </div>

            <SelectedDoctorDetails :doctor-id="dokter || null" />

            <!-- Rencana Perawatan -->
            <div class="space-y-2 col-span-full">
              <div class="text-regular-medium">Rencana Perawatan</div>
              <v-textarea
                v-model="rencanaPerawatan"
                placeholder="Masukkan rencana perawatan"
                variant="outlined"
                rows="4"
                v-bind="rencanaPerawatanProps"
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
import { ref, onMounted, computed, watch } from 'vue';
import { useForm, type FieldState } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { object, string } from 'yup';
import { format } from 'date-fns';
import type {
  Branch,
  Doctor,
  CreatePublicAppointmentRequest,
} from '~/composables/useApi';

type PatientStatus = 'married' | 'single';
type ReservationFormValues = {
  nama: string;
  noTelepon: string;
  statusPasien: PatientStatus | '';
  cabangKlinik: string;
  dokter: string;
  tanggalKedatangan: string;
  rencanaPerawatan: string;
};

// Composables
const { createPublicAppointment } = useAppointments();
const { fetchBranches } = useBranches();
const { fetchDoctorsForDropdownByDate } = useDoctors();

const reservationSchema = toTypedSchema(
  object({
    nama: string().trim().required('Nama wajib diisi'),
    noTelepon: string()
      .trim()
      .required('No telepon wajib diisi')
      .matches(/^[0-9+][0-9\s-]{7,15}$/, 'Format nomor telepon tidak valid'),
    statusPasien: string()
      .oneOf(['married', 'single'], 'Status pasien tidak valid')
      .required('Status pasien wajib dipilih'),
    cabangKlinik: string().trim().required('Cabang klinik wajib dipilih'),
    dokter: string().trim().required('Dokter wajib dipilih'),
    tanggalKedatangan: string()
      .trim()
      .required('Tanggal kedatangan wajib diisi'),
    rencanaPerawatan: string().optional(),
  })
);

const initialFormValues: ReservationFormValues = {
  nama: '',
  noTelepon: '',
  statusPasien: '',
  cabangKlinik: '',
  dokter: '',
  tanggalKedatangan: '',
  rencanaPerawatan: '',
};

const vuetifyConfig = <T>(state: FieldState<T>) => ({
  props: {
    'error-messages': state.errors,
  },
});

const { handleSubmit, defineField, resetForm } = useForm<ReservationFormValues>(
  {
    validationSchema: reservationSchema,
    initialValues: initialFormValues,
    validateOnMount: false,
  }
);

const [nama, namaProps] = defineField('nama', vuetifyConfig);
const [noTelepon, noTeleponProps] = defineField('noTelepon', vuetifyConfig);
const [statusPasien, statusPasienProps] = defineField(
  'statusPasien',
  vuetifyConfig
);
const [cabangKlinik, cabangKlinikProps] = defineField(
  'cabangKlinik',
  vuetifyConfig
);
const [dokter, dokterProps] = defineField('dokter', vuetifyConfig);
const [tanggalKedatangan, tanggalKedatanganProps] = defineField(
  'tanggalKedatangan',
  vuetifyConfig
);
const [rencanaPerawatan, rencanaPerawatanProps] = defineField(
  'rencanaPerawatan',
  vuetifyConfig
);

const isLoading = ref(false);
const isSubmitting = ref(false);
const isLoadingDoctors = ref(false);
const isLoadingBranches = ref(false);
const branches = ref<Branch[]>([]);
const doctors = ref<Doctor[]>([]);
const doctorSearchQuery = ref('');
const useAvailableDoctors = ref(false);
const selectedTime = ref('');
const showTimeMenu = ref(false);

const formatDateToYMD = (date: Date) => format(date, 'yyyy-MM-dd');

const tanggalKedatanganInput = computed({
  get() {
    return tanggalKedatangan.value || null;
  },
  set(value: string | Date | null) {
    if (!value) {
      tanggalKedatangan.value = '';
      return;
    }

    if (value instanceof Date) {
      tanggalKedatangan.value = formatDateToYMD(value);
      return;
    }

    tanggalKedatangan.value = value;
  },
});

// Options for status pasien based on backend enum
const statusPasienOptions = [
  { title: 'Pasien Baru', value: 'married' },
  { title: 'Pasien Lama', value: 'single' },
];

// Time options for practice schedule filtering (08:00 - 21:00)
const timeOptions = [
  { title: '08:00', value: '08:00' },
  { title: '09:00', value: '09:00' },
  { title: '10:00', value: '10:00' },
  { title: '11:00', value: '11:00' },
  { title: '12:00', value: '12:00' },
  { title: '13:00', value: '13:00' },
  { title: '14:00', value: '14:00' },
  { title: '15:00', value: '15:00' },
  { title: '16:00', value: '16:00' },
  { title: '17:00', value: '17:00' },
  { title: '18:00', value: '18:00' },
  { title: '19:00', value: '19:00' },
  { title: '20:00', value: '20:00' },
  { title: '21:00', value: '21:00' },
];

// Computed options for selects
const cabangKlinikOptions = computed(() =>
  branches.value.map((branch) => ({
    title: branch.name,
    value: branch.id,
  }))
);

const dokterOptions = computed(() =>
  doctors.value.map((doctorItem) => ({
    title: doctorItem.user?.profile?.full_name || `Doctor ${doctorItem.id}`,
    subtitle: useAvailableDoctors.value
      ? `${
          doctorItem.user?.profile?.specialization || 'Kedokteran Gigi Umum'
        } - Tersedia pada ${tanggalKedatangan.value}${
          selectedTime.value ? ` pukul ${selectedTime.value}` : ''
        }`
      : doctorItem.user?.profile?.specialization || 'Kedokteran Gigi Umum',
    value: doctorItem.id,
  }))
);

const doctorFieldHint = computed(() => {
  if (!cabangKlinik.value && !tanggalKedatangan.value) {
    return 'Pilih cabang klinik dan tanggal kedatangan terlebih dahulu untuk menampilkan daftar dokter.';
  }
  if (!cabangKlinik.value) {
    return 'Pilih cabang klinik terlebih dahulu untuk menampilkan daftar dokter.';
  }
  if (!tanggalKedatangan.value) {
    return 'Pilih tanggal kedatangan terlebih dahulu untuk menampilkan daftar dokter.';
  }
  return '';
});

// Submit function with API integration
const submitReservation = handleSubmit(
  async (values) => {
    isSubmitting.value = true;

    try {
      const appointmentDate = new Date(values.tanggalKedatangan).toISOString();

      const requestData: CreatePublicAppointmentRequest = {
        doctor_id: values.dokter,
        clinic_branch_id: values.cabangKlinik,
        phone_number: values.noTelepon,
        treatment_plan: values.rencanaPerawatan || '',
        appointment_date: appointmentDate,
        name: values.nama,
        status_patient: values.statusPasien as PatientStatus,
        description: values.rencanaPerawatan || '',
      };

      await createPublicAppointment(requestData);
      alert('Reservasi berhasil dibuat! Kami akan menghubungi Anda segera.');

      resetForm({ values: { ...initialFormValues } });
      doctorSearchQuery.value = '';
      doctors.value = [];
      useAvailableDoctors.value = false;
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
  },
  ({ errors: submitErrors }) => {
    if (Object.keys(submitErrors).length) {
      alert('Mohon lengkapi semua field yang wajib diisi!');
    }
  }
);

// Debounced doctor search function
const fetchDoctorsWithSearch = async (searchQuery = '') => {
  console.log('[DEBUG] fetchDoctorsWithSearch called with:', {
    tanggalKedatangan: tanggalKedatangan.value,
    cabangKlinik: cabangKlinik.value,
    selectedTime: selectedTime.value,
  });

  // Require both date and branch to fetch doctors
  if (!tanggalKedatangan.value || !cabangKlinik.value) {
    console.log('[DEBUG] Missing required fields, skipping fetch');
    doctors.value = [];
    useAvailableDoctors.value = false;
    if (dokter.value) {
      dokter.value = '';
    }
    return;
  }

  isLoadingDoctors.value = true;
  try {
    let doctorsData: Doctor[] = [];
    const trimmedSearch = searchQuery.trim().toLowerCase();
    const sanitizedTime = selectedTime.value ? selectedTime.value.trim() : '';

    console.log('[DEBUG] Calling fetchDoctorsForDropdownByDate with:', {
      date: tanggalKedatangan.value,
      time: sanitizedTime || undefined,
      branchId: cabangKlinik.value,
    });

    // Pass branchId to fetch doctors from the correct branch database
    doctorsData = await fetchDoctorsForDropdownByDate(
      tanggalKedatangan.value,
      sanitizedTime || undefined,
      cabangKlinik.value // Pass the selected branch ID
    );
    console.log('[DEBUG] Received doctors:', doctorsData);
    useAvailableDoctors.value = true;

    if (trimmedSearch) {
      doctorsData = doctorsData.filter((doctorItem) =>
        doctorItem.user?.profile?.full_name
          ?.toLowerCase()
          .includes(trimmedSearch)
      );
    }

    doctors.value = doctorsData;
    clearDoctorIfUnavailable();
  } catch (error) {
    doctors.value = [];
    useAvailableDoctors.value = false;
    console.error('Error fetching doctors:', error);
  } finally {
    isLoadingDoctors.value = false;
  }
};

const debouncedFetchDoctors = useDebounceFn(fetchDoctorsWithSearch, 300);

// Handler for time input focus - select text
const onTimeFocus = (e: FocusEvent) => {
  const el = e.target as HTMLInputElement | null;
  if (el) requestAnimationFrame(() => el.select());
};

// Handler when minute is picked - close menu and refresh doctors
const onMinutePicked = () => {
  showTimeMenu.value = false;
  if (tanggalKedatangan.value && cabangKlinik.value) {
    debouncedFetchDoctors(doctorSearchQuery.value);
  }
};

// Watch for selectedTime changes to refresh doctors
watch(selectedTime, (newTime, oldTime) => {
  if (newTime !== oldTime && tanggalKedatangan.value && cabangKlinik.value) {
    debouncedFetchDoctors(doctorSearchQuery.value);
  }
});

const clearDoctorIfUnavailable = () => {
  if (!dokter.value) {
    return;
  }

  const stillAvailable = doctors.value.some(
    (doctorItem) => doctorItem.id === dokter.value
  );

  if (!stillAvailable) {
    dokter.value = '';
  }
};

// Watch for date changes to fetch available doctors
watch(tanggalKedatangan, (newDate, oldDate) => {
  if (!newDate) {
    selectedTime.value = '';
    useAvailableDoctors.value = false;
    doctors.value = [];
    isLoadingDoctors.value = false;
    if (dokter.value) {
      dokter.value = '';
    }
  }

  if (newDate && newDate !== oldDate) {
    debouncedFetchDoctors(doctorSearchQuery.value);
  }
});

// Watch for branch changes to refresh available doctors
watch(cabangKlinik, (newBranch, oldBranch) => {
  if (!newBranch) {
    doctors.value = [];
    useAvailableDoctors.value = false;
    if (dokter.value) {
      dokter.value = '';
    }
    return;
  }

  // Refresh doctors when branch changes
  if (newBranch !== oldBranch) {
    dokter.value = ''; // Clear selected doctor when branch changes
    if (tanggalKedatangan.value) {
      debouncedFetchDoctors(doctorSearchQuery.value);
    }
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
    await loadBranches();
  } catch (error) {
    console.error('Error loading initial data:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>
<style></style>
