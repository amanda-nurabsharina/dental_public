<template>
  <div class="border-1 border-secondary-2 rounded-4xl p-6 flex gap-x-6 w-full">
    <div class="min-h-64 max-h-64 min-w-64 max-w-64 rounded-lg overflow-hidden">
      <iframe
        :src="selectedBranch?.mapUrl"
        width="100%"
        height="100%"
        style="border: 0"
        :allowfullscreen="true"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </div>
    <ul class="space-y-2">
      <li class="flex gap-x-6">
        <div
          class="rounded-2xl bg-primary-20 flex items-center justify-center min-w-14 max-w-14 min-h-14 max-h-14"
        >
          <IconLocation />
        </div>
        <div class="space-y-2">
          <div class="text-large-semibold">Lokasi</div>
          <p>{{ selectedBranch?.address }}</p>
        </div>
      </li>
      <li class="flex gap-x-6">
        <div
          class="rounded-2xl bg-primary-20 flex items-center justify-center min-w-14 max-w-14 min-h-14 max-h-14"
        >
          <IconMail />
        </div>
        <div class="space-y-2">
          <div class="text-large-semibold">Email</div>
          <a :href="`mailto:${selectedBranch?.email}`">{{
            selectedBranch?.email
          }}</a>
        </div>
      </li>
      <li class="flex gap-x-6">
        <div
          class="rounded-2xl bg-primary-20 flex items-center justify-center min-w-14 max-w-14 min-h-14 max-h-14"
        >
          <IconWhatsapp />
        </div>
        <div class="space-y-2">
          <div class="text-large-semibold">WhatsApp</div>
          <a
            :href="`https://wa.me/${selectedBranch?.whatsapp.replace(
              /[^0-9]/g,
              ''
            )}`"
            >{{ selectedBranch?.whatsapp }}</a
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Branch {
  id: string;
  name: string;
  address: string;
  email: string;
  whatsapp: string;
  mapUrl: string;
}

defineOptions({
  name: 'HomeContactInfo',
});

defineProps<{
  selectedBranch: Branch;
}>();
</script>

<style scoped></style>
