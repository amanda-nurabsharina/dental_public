# Panduan Testing Fitur Filter Multi-Cabang

Berikut adalah langkah-langkah untuk memverifikasi fitur filter cabang yang baru diimplementasikan:

## 1. Persiapan

Pastikan aplikasi Backend dan Frontend sedang berjalan.

- **Backend**: `go run cmd/main.go` (lakukan restart jika sebelumnya sudah berjalan)
- **Frontend**: `npm run dev`

## 2. Testing Halaman Dokter

1. Buka halaman `/doctors`.
2. Anda akan melihat dropdown "Pilih Cabang" di sebelah kiri kolom pencarian.
3. Secara default, dropdown kosong dan menampilkan dokter dari semua cabang.
4. Pilih salah satu cabang dari dropdown.
5. Verifikasi bahwa daftar dokter yang tampil hanya berasal dari cabang tersebut.
6. Klik salah satu kartu dokter.
7. Di dalam modal detail dokter, periksa di sebelah nama dokter, seharusnya muncul nama cabang dalam kurung, contoh: `(Cabang Jakarta)`.

## 3. Testing Halaman Layanan

1. Buka halaman `/services`.
2. Gunakan dropdown "Pilih Cabang" untuk memfilter layanan.
3. Verifikasi daftar layanan sesuai dengan cabang yang dipilih.
4. Klik salah satu layanan.
5. Pastikan nama cabang muncul di bagian atas judul layanan di dalam modal, contoh: `Layanan Klinik - Cabang Jakarta`.

## 4. Testing Halaman Promo

1. Buka halaman `/promo`.
2. Gunakan dropdown "Pilih Cabang".
3. Periksa daftar promo yang tampil.
4. Pada kartu promo, nama cabang akan muncul di bagian bawah gambar jika tersedia.
5. Klik promo untuk melihat detail, nama cabang juga harus muncul di samping label "Promo Klinik".

## Catatan Teknis

- Backend endpoint baru:
  - `GET /publicappointment/multibranch/doctors`
  - `GET /publicappointment/multibranch/services`
  - `GET /publicappointment/multibranch/promos`
- Jika data tidak muncul, pastikan database cabang terkait dapat diakses oleh backend.
