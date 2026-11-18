<template>
  <div class="border-1 border-secondary-2 rounded-4xl p-6 flex flex-col md:flex-row gap-6 w-full">
    <div class="min-h-64 max-h-64 md:min-w-64 md:max-w-64 w-full rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
      <iframe
        v-if="embedUrl"
        :src="embedUrl"
        width="100%"
        height="100%"
        style="border: 0"
        :allowfullscreen="true"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-400 text-sm">
        Peta tidak tersedia
      </div>
    </div>
    <ul class="space-y-3 flex-1">
      <li v-if="selectedBranch?.name" class="font-bold text-lg text-grey-900 mb-1">
        {{ selectedBranch.name }}
      </li>
      <li class="flex gap-x-4">
        <div
          class="rounded-2xl bg-primary-20 flex items-center justify-center min-w-12 max-w-12 min-h-12 max-h-12 flex-shrink-0"
        >
          <IconLocation />
        </div>
        <div class="space-y-1">
          <div class="text-medium-semibold">Lokasi</div>
          <p class="text-sm text-grey-700 leading-snug">{{ selectedBranch?.address }}</p>
        </div>
      </li>
      <li class="flex gap-x-4">
        <div
          class="rounded-2xl bg-primary-20 flex items-center justify-center min-w-12 max-w-12 min-h-12 max-h-12 flex-shrink-0"
        >
          <IconMail />
        </div>
        <div class="space-y-1">
          <div class="text-medium-semibold">Email</div>
          <a :href="`mailto:${selectedBranch?.email}`" class="text-sm text-primary hover:underline">{{
            selectedBranch?.email
          }}</a>
        </div>
      </li>
      <li class="flex gap-x-4">
        <div
          class="rounded-2xl bg-primary-20 flex items-center justify-center min-w-12 max-w-12 min-h-12 max-h-12 flex-shrink-0"
        >
          <IconWhatsapp />
        </div>
        <div class="space-y-1">
          <div class="text-medium-semibold">WhatsApp</div>
          <a
            :href="`https://wa.me/${(selectedBranch?.whatsapp || '').replace(/[^0-9]/g, '')}`"
            target="_blank"
            rel="noopener"
            class="text-sm text-primary hover:underline"
          >{{ selectedBranch?.whatsapp }}</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface BranchProps {
  id: string;
  name: string;
  address: string;
  email: string;
  whatsapp: string;
  mapUrl?: string;
  latitude?: number;
  longitude?: number;
}

defineOptions({
  name: 'HomeContactInfo',
});

const props = defineProps<{
  selectedBranch: BranchProps;
}>();

const embedUrl = computed(() => {
  if (props.selectedBranch?.mapUrl) {
    return props.selectedBranch.mapUrl;
  }
  if (props.selectedBranch?.latitude && props.selectedBranch?.longitude) {
    return `https://maps.google.com/maps?q=${props.selectedBranch.latitude},${props.selectedBranch.longitude}&z=15&output=embed`;
  }
  return '';
});
</script>

<style scoped></style>
