<template>
  <section class="container">
    <div
      class="mb-10 flex flex-col gap-y-6 mx-auto max-w-[50.125rem] text-center items-center"
    >
      <v-chip color="primary" size="x-large">Kontak Kami</v-chip>
      <h2 class="heading-2">Klinik Gigi Nadira Tusam di Batam</h2>
      <p>
        Didukung oleh tim medis berpengalaman dan bersertifikat dengan keahlian
        di berbagai bidang kedokteran gigi untuk memberikan perawatan terbaik
        sesuai kebutuhan Anda.
      </p>
    </div>
    <div class="flex gap-x-10">
      <div
        class="border-1 border-secondary-2 rounded-4xl p-6 max-w-[29.125rem]"
      >
        <h5 class="heading-5 mb-6">Klinik Gigi Nadira Tusam</h5>
        <ul class="space-y-2">
          <li class="flex gap-x-6">
            <div
              class="rounded-2xl bg-primary-20 flex items-center justify-center min-w-14 max-w-14 min-h-14 max-h-14"
            >
              <IconLocation />
            </div>
            <div class="space-y-2">
              <div class="text-large-semibold">Lokasi</div>
              <p>
                Pertokoan Esqarada, Bengkong Harapan 1 Blok A No. 8, Kel.
                Bengkong Laut, Kec. Bengkong, Kota Batam 29444
              </p>
            </div>
          </li>
          <li class="flex gap-x-6">
            <div
              class="rounded-2xl bg-primary-20 flex items-center justify-center min-w-14 max-w-14 min-h-14 max-h-14"
            >
              <IconMail />
            </div>
            <div class="space-y-2">
              <div class="text-large-semibold">Lokasi</div>
              <p>
                Pertokoan Esqarada, Bengkong Harapan 1 Blok A No. 8, Kel.
                Bengkong Laut, Kec. Bengkong, Kota Batam 29444
              </p>
            </div>
          </li>
          <li class="flex gap-x-6">
            <div
              class="rounded-2xl bg-primary-20 flex items-center justify-center min-w-14 max-w-14 min-h-14 max-h-14"
            >
              <IconWhatsapp />
            </div>
            <div class="space-y-2">
              <div class="text-large-semibold">Whatsapp</div>
              <a href="tel:+6281021921222"> +628 102-1292-1222 </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'ContactSection',
});

const selectedBranch = ref(0);

const branches = [
  {
    id: 'bengkong',
    name: 'Klinik Gigi Nadira Tusam - Bengkong',
    address:
      'Perkokoan Esqarada, Bengkong Harapan 1 Blok A No. 8, Kel. Bengkong Laut, Kec. Bengkong, Kota Batam 29444',
    email: 'dentaldiary@gmail.com',
    whatsapp: '+628 102-1292-1222',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...',
  },
  {
    id: 'tiban',
    name: 'Klinik Gigi Nadira Tusam - Tiban',
    address:
      'Komplek Tiban Centre, Blok B No. 15, Kel. Tiban Baru, Kec. Sekupang, Kota Batam 29425',
    email: 'dentaldiary.tiban@gmail.com',
    whatsapp: '+628 102-1292-1333',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...',
  },
  {
    id: 'batamcenter',
    name: 'Klinik Gigi Nadira Tusam - Batam Center',
    address:
      'Komplek Windsor Central, Blok C No. 28, Kel. Teluk Tering, Kec. Batam Kota, Kota Batam 29461',
    email: 'dentaldiary.center@gmail.com',
    whatsapp: '+628 102-1292-1444',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...',
  },
];
</script>

<style scoped></style>
