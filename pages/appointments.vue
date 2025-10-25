<template>
  <div>
    <BaseBreadcrumb />
    <div class="container mt-16 mb-16">
      <div
        class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6"
      >
        <div>
          <h1 class="text-2xl font-bold mb-2">Daftar Reservasi</h1>
          <p class="text-gray-600">Kelola reservasi pasien</p>
        </div>
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          @click="$router.push('/reservation')"
        >
          Buat Reservasi Baru
        </v-btn>
      </div>

      <!-- Search and Filters -->
      <v-card class="mb-6" elevation="0" border>
        <v-card-text>
          <div class="flex flex-col md:flex-row gap-4">
            <v-text-field
              v-model="searchQuery"
              label="Cari reservasi..."
              placeholder="Nama, telepon, atau rencana perawatan"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              clearable
              @input="debouncedSearch"
            />
            <v-btn
              color="primary"
              variant="outlined"
              :loading="isSearching"
              @click="searchAppointments"
            >
              Cari
            </v-btn>
          </div>
        </v-card-text>
      </v-card>

      <!-- Appointments List -->
      <v-card elevation="0" border>
        <v-card-title>
          <span class="text-lg font-semibold">
            Reservasi Terbaru
            <v-chip
              v-if="appointments.length > 0"
              color="primary"
              size="small"
              class="ml-2"
            >
              {{ pagination.total }}
            </v-chip>
          </span>
        </v-card-title>

        <v-divider />

        <div v-if="isLoading" class="p-8 text-center">
          <v-progress-circular indeterminate color="primary" class="mb-4" />
          <p>Memuat data reservasi...</p>
        </div>

        <div
          v-else-if="appointments.length === 0"
          class="p-8 text-center text-gray-500"
        >
          <v-icon size="64" class="mb-4 opacity-50">mdi-calendar-blank</v-icon>
          <p class="text-lg mb-2">Belum ada reservasi</p>
          <p>Reservasi pasien akan muncul di sini</p>
        </div>

        <div v-else>
          <v-list class="pa-0">
            <template
              v-for="(appointment, index) in appointments"
              :key="appointment.id"
            >
              <v-list-item class="px-6 py-4">
                <template #prepend>
                  <v-avatar color="primary" class="text-white">
                    {{ appointment.name.charAt(0).toUpperCase() }}
                  </v-avatar>
                </template>

                <v-list-item-title class="font-semibold mb-1">
                  {{ appointment.name }}
                  <v-chip
                    :color="
                      appointment.status_patient === 'married'
                        ? 'blue'
                        : 'green'
                    "
                    size="small"
                    variant="tonal"
                    class="ml-2"
                  >
                    {{
                      appointment.status_patient === 'married'
                        ? 'Menikah'
                        : 'Belum Menikah'
                    }}
                  </v-chip>
                </v-list-item-title>

                <v-list-item-subtitle class="mb-2">
                  <div class="flex flex-col gap-1">
                    <div class="flex items-center gap-2">
                      <v-icon size="16" color="gray">mdi-phone</v-icon>
                      <span>{{ appointment.phone_number }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <v-icon size="16" color="gray">mdi-calendar</v-icon>
                      <span>{{
                        formatDate(appointment.appointment_date)
                      }}</span>
                    </div>
                    <div
                      v-if="appointment.treatment_plan"
                      class="flex items-center gap-2"
                    >
                      <v-icon size="16" color="gray">mdi-medical-bag</v-icon>
                      <span>{{ appointment.treatment_plan }}</span>
                    </div>
                  </div>
                </v-list-item-subtitle>

                <template #append>
                  <div class="flex flex-col gap-2">
                    <v-btn
                      size="small"
                      variant="outlined"
                      color="primary"
                      @click="viewAppointment(appointment)"
                    >
                      Detail
                    </v-btn>
                    <v-btn
                      size="small"
                      variant="outlined"
                      color="error"
                      :loading="deletingId === appointment.id"
                      @click="confirmDelete(appointment)"
                    >
                      Hapus
                    </v-btn>
                  </div>
                </template>
              </v-list-item>

              <v-divider v-if="index < appointments.length - 1" />
            </template>
          </v-list>

          <!-- Pagination -->
          <div
            v-if="pagination.total_pages > 1"
            class="d-flex justify-center pa-6"
          >
            <v-pagination
              v-model="currentPage"
              :length="pagination.total_pages"
              :total-visible="7"
              @update:model-value="loadAppointments"
            />
          </div>
        </div>
      </v-card>
    </div>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="text-h6"> Konfirmasi Hapus </v-card-title>
        <v-card-text>
          Apakah Anda yakin ingin menghapus reservasi
          <strong>{{ selectedAppointment?.name }}</strong
          >? Tindakan ini tidak dapat dibatalkan.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="grey"
            variant="text"
            :disabled="isDeleting"
            @click="deleteDialog = false"
          >
            Batal
          </v-btn>
          <v-btn
            color="error"
            variant="flat"
            :loading="isDeleting"
            @click="deleteAppointment"
          >
            Hapus
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- View Detail Dialog -->
    <v-dialog v-model="detailDialog" max-width="600">
      <v-card v-if="selectedAppointment">
        <v-card-title class="text-h6 d-flex align-center">
          <v-avatar color="primary" class="text-white mr-3">
            {{ selectedAppointment.name.charAt(0).toUpperCase() }}
          </v-avatar>
          Detail Reservasi
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-6">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-600"
                >Nama Pasien</label
              >
              <p class="text-lg">{{ selectedAppointment.name }}</p>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-600"
                >No Telepon</label
              >
              <p class="text-lg">{{ selectedAppointment.phone_number }}</p>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-600"
                >Status Pasien</label
              >
              <p class="text-lg">
                {{
                  selectedAppointment.status_patient === 'married'
                    ? 'Menikah'
                    : 'Belum Menikah'
                }}
              </p>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-600"
                >Tanggal Reservasi</label
              >
              <p class="text-lg">
                {{ formatDate(selectedAppointment.appointment_date) }}
              </p>
            </div>

            <div v-if="selectedAppointment.treatment_plan">
              <label class="text-sm font-medium text-gray-600"
                >Rencana Perawatan</label
              >
              <p class="text-lg">{{ selectedAppointment.treatment_plan }}</p>
            </div>

            <div v-if="selectedAppointment.description">
              <label class="text-sm font-medium text-gray-600">Deskripsi</label>
              <p class="text-lg">{{ selectedAppointment.description }}</p>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-600"
                >Tanggal Dibuat</label
              >
              <p class="text-lg">
                {{ formatDate(selectedAppointment.created_at) }}
              </p>
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" variant="flat" @click="detailDialog = false">
            Tutup
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { PublicAppointment, PaginationInfo } from '~/composables/useApi';

// Composables
const { listAppointments, deleteAppointment: deleteAppointmentApi } =
  useAppointments();

// Head metadata
useHead({
  title: 'Daftar Reservasi',
  meta: [{ name: 'description', content: 'Kelola daftar reservasi pasien' }],
});

// Reactive state
const appointments = ref<PublicAppointment[]>([]);
const isLoading = ref(false);
const isSearching = ref(false);
const isDeleting = ref(false);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const deletingId = ref<string | null>(null);

// Dialog states
const deleteDialog = ref(false);
const detailDialog = ref(false);
const selectedAppointment = ref<PublicAppointment | null>(null);

// Pagination info
const pagination = ref<PaginationInfo>({
  page: 1,
  limit: 10,
  total: 0,
  total_pages: 0,
});

// Computed properties would go here if needed

// Methods
const loadAppointments = async (page: number = currentPage.value) => {
  isLoading.value = true;
  try {
    const response = await listAppointments({
      search: searchQuery.value,
      page,
      limit: itemsPerPage.value,
    });

    appointments.value = response.appointments;
    pagination.value = response.pagination;
    currentPage.value = page;
  } catch (error) {
    console.error('Error loading appointments:', error);
    // You might want to show a toast/snackbar here instead of alert
    alert('Gagal memuat data reservasi');
  } finally {
    isLoading.value = false;
  }
};

const searchAppointments = async () => {
  isSearching.value = true;
  currentPage.value = 1;
  await loadAppointments(1);
  isSearching.value = false;
};

// Debounced search
const debouncedSearch = useDebounceFn(async () => {
  if (searchQuery.value.length >= 3 || searchQuery.value.length === 0) {
    await searchAppointments();
  }
}, 500);

const viewAppointment = (appointment: PublicAppointment) => {
  selectedAppointment.value = appointment;
  detailDialog.value = true;
};

const confirmDelete = (appointment: PublicAppointment) => {
  selectedAppointment.value = appointment;
  deleteDialog.value = true;
};

const deleteAppointment = async () => {
  if (!selectedAppointment.value) return;

  isDeleting.value = true;
  deletingId.value = selectedAppointment.value.id;

  try {
    await deleteAppointmentApi(selectedAppointment.value.id);

    // Remove from local state
    appointments.value = appointments.value.filter(
      (app) => app.id !== selectedAppointment.value?.id
    );

    // Update pagination
    pagination.value.total -= 1;

    deleteDialog.value = false;
    selectedAppointment.value = null;

    // You might want to show a success toast/snackbar here
    alert('Reservasi berhasil dihapus');
  } catch (error) {
    console.error('Error deleting appointment:', error);
    alert('Gagal menghapus reservasi');
  } finally {
    isDeleting.value = false;
    deletingId.value = null;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Load appointments on mount
onMounted(() => {
  loadAppointments();
});
</script>
