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
                :error-messages="errors.nama ? [errors.nama] : []"
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
                :error-messages="errors.noTelepon ? [errors.noTelepon] : []"
              />
            </div>

            <!-- Status Pasien -->
            <div class="space-y-2">
              <div class="text-regular-medium required">Status Pasien</div>
              <v-select
                v-model="statusPasien"
                placeholder="Pilih status pasien"
                variant="outlined"
                :items="statusPasienOptions"
                :error-messages="errors.statusPasien ? [errors.statusPasien] : []"
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
                :error-messages="errors.cabangKlinik ? [errors.cabangKlinik] : []"
              />
            </div>

            <!-- Tanggal Kedatangan -->
            <div class="space-y-2">
              <div class="text-regular-medium required">Tanggal Kedatangan</div>
              <v-text-field
                v-model="tanggalKedatangan"
                type="date"
                variant="outlined"
                :rounded="8"
                :error-messages="
                  errors.tanggalKedatangan ? [errors.tanggalKedatangan] : []
                "
              />
            </div>

            <!-- Dokter -->
            <div class="space-y-2">
              <div class="text-regular-medium required">
                Dokter
                <span
                  v-if="availableDoctorHint"
                  class="text-sm text-green-600 font-normal"
                >
                  ({{ availableDoctorHint }})
                </span>
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
                :no-data-text="
                  useAvailableDoctors
                    ? 'Tidak ada dokter tersedia pada tanggal/waktu yang dipilih'
                    : 'Tidak ada dokter ditemukan'
                "
                :error-messages="errors.dokter ? [errors.dokter] : []"
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
                :error-messages="
                  errors.rencanaPerawatan ? [errors.rencanaPerawatan] : []
                "
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
import { useForm, useFieldModel } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { object, string } from 'yup';
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

const { handleSubmit, errors, resetForm } = useForm<ReservationFormValues>({
  validationSchema: reservationSchema,
  initialValues: initialFormValues,
  validateOnMount: false,
});

const nama = useFieldModel<ReservationFormValues['nama']>('nama');
const noTelepon = useFieldModel<ReservationFormValues['noTelepon']>(
  'noTelepon'
);
const statusPasien = useFieldModel<ReservationFormValues['statusPasien']>(
  'statusPasien'
);
const cabangKlinik = useFieldModel<ReservationFormValues['cabangKlinik']>(
  'cabangKlinik'
);
const dokter = useFieldModel<ReservationFormValues['dokter']>('dokter');
const tanggalKedatangan =
  useFieldModel<ReservationFormValues['tanggalKedatangan']>(
    'tanggalKedatangan'
  );
const rencanaPerawatan =
  useFieldModel<ReservationFormValues['rencanaPerawatan']>(
    'rencanaPerawatan'
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

const availableDoctorHint = computed(() => {
  if (!useAvailableDoctors.value || !tanggalKedatangan.value) {
    return '';
  }

  const messageParts = [`tanggal ${tanggalKedatangan.value}`];

  if (selectedTime.value) {
    messageParts.push(`pukul ${selectedTime.value}`);
  }

  return `Menampilkan dokter yang tersedia pada ${messageParts.join(' ')}`;
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
  if (!tanggalKedatangan.value) {
    doctors.value = [];
    useAvailableDoctors.value = false;
    return;
  }

  isLoadingDoctors.value = true;
  try {
    let doctorsData: Doctor[] = [];
    const trimmedSearch = searchQuery.trim().toLowerCase();
    const sanitizedTime = selectedTime.value ? selectedTime.value.trim() : '';

    doctorsData = await fetchDoctorsForDropdownByDate(
      tanggalKedatangan.value,
      sanitizedTime || undefined
    );
    useAvailableDoctors.value = true;

    if (trimmedSearch) {
      doctorsData = doctorsData.filter((doctorItem) =>
        doctorItem.user?.profile?.full_name
          ?.toLowerCase()
          .includes(trimmedSearch)
      );
    }

    doctors.value = doctorsData;
  } catch (error) {
    doctors.value = [];
    useAvailableDoctors.value = false;
    console.error('Error fetching doctors:', error);
  } finally {
    isLoadingDoctors.value = false;
  }
};

const debouncedFetchDoctors = useDebounceFn(fetchDoctorsWithSearch, 300);

// Watch for doctor search query changes
watch(doctorSearchQuery, (newQuery) => {
  if (!tanggalKedatangan.value) {
    return;
  }
  debouncedFetchDoctors(newQuery);
});

// Watch for date changes to fetch available doctors
watch(tanggalKedatangan, (newDate, oldDate) => {
  if (dokter.value) {
    dokter.value = '';
  }

  if (!newDate) {
    selectedTime.value = '';
    useAvailableDoctors.value = false;
    doctors.value = [];
    isLoadingDoctors.value = false;
  }

  if (newDate && newDate !== oldDate) {
    debouncedFetchDoctors(doctorSearchQuery.value);
  }
});

// Watch for time changes to refetch available doctors
watch(selectedTime, (newTime, oldTime) => {
  if (!tanggalKedatangan.value) {
    return;
  }

  if (newTime !== oldTime) {
    if (dokter.value) {
      dokter.value = '';
    }
    debouncedFetchDoctors(doctorSearchQuery.value);
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
