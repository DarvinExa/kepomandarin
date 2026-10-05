# KepoMandarin

> Platform Pembelajaran Bahasa Mandarin Interaktif Berbasis Konteks Kalimat dan Standar HSK.  
> Dirancang dengan arsitektur web modern serta estetika visual fungsional terinspirasi Bauhaus dan De Stijl.

---

## Deskripsi Produk

**KepoMandarin** adalah platform web pembelajaran bahasa Mandarin yang berfokus pada pemahaman konteks kalimat utuh, bukan sekadar menghafal kosakata terpisah. Pembelajar dibimbing secara bertahap mulai dari fondasi fonetik dasar (Pinyin dan 4 nada), 12 unit materi terstruktur HSK 1, latihan interaktif tiga mode (pilihan ganda, susun kalimat, dan audio menyimak), hingga modul laboratorium tematik seperti pelatih nada, penjelajah Hanzi, kata bantu bilangan, skenario percakapan, dan jurnal kesalahan personal.

Platform ini mengusung pendekatan *local-first hybrid*: pengguna dapat langsung belajar secara penuh menggunakan **Mode Tamu** tanpa kewajiban mendaftar akun, dengan seluruh progres tersimpan aman di browser. Ketika pengguna memilih untuk membuat akun, progres belajar otomatis tersinkronisasi ke database cloud Supabase.

---

## Karakteristik Desain & Pengalaman Pengguna

Antarmuka KepoMandarin memadukan estetika konstruktivis yang bersih, tegas, dan bebas distraksi:

- **Struktur Grid Tegas**: Tata letak geometris asimetris dengan garis batas tegas (`border-rule`, `border-ink`), tanpa sudut membulat berlebihan.
- **Palet Warna Solid De Stijl**: Menggunakan warna fungsional seperti krem kertas (`bg-canvas`), putih bersih (`bg-paper`), arang solid (`text-ink`), serta aksen primer merah (`accent-red`), biru (`accent-blue`), dan kuning (`accent-yellow`).
- **Dukungan Tema Terang dan Gelap**: Pengguna dapat dengan mudah beralih antara mode gelap dan mode terang melalui tombol switch di bilah navigasi.
- **Tipografi Jelas**: Tipografi editorial modern dipadukan dengan font Mandarin proporsional `Noto Sans SC` untuk keterbacaan karakter Hanzi yang optimal.
- **Bebas Distraksi**: Tanpa elemen dekoratif mengganggu, tanpa gradien mencolok, dan tanpa animasi berlebihan. Setiap komponen dibuat untuk mendukung fokus belajar.
- **Tiga Serangkai Bahasa**: Setiap kosakata dan kalimat penting selalu dilengkapi tiga elemen: Hanzi, Pinyin bernada, dan terjemahan Bahasa Indonesia.

---

## Fitur Utama

### 1. Dasbor Belajar & Jalur Pembelajaran Dinamis
- **Jalur Belajar Duolingo-style**: Visualisasi peta belajar yang dinamis mencakup 12 unit HSK 1 dan simpul fondasi dasar.
- **Status Unit Otomatis**: Unit otomatis berubah status menjadi selesai (*done* dengan centang emas), sedang aktif (*current* dengan tombol putar), atau terkunci (*locked*).
- **Sistem Hadiah Milestone**: Checkpoint milestone terbuka setiap kelipatan 3 unit (Unit 03, 06, 09, dan 12) untuk mengevaluasi pencapaian pembelajar.
- **Bilah Samping Metrik**: Menampilkan persentase penguasaan kurikulum, akurasi latihan soal terkini, target kosakata, dan rekomendasi pelajaran berikutnya.

### 2. Modul Fondasi Dasar Mandarin (`/fundamentals`)
- **Pinyin Lengkap**: Panduan 23 inisial (*Shēngmǔ*) dan 24 final (*Yùnmǔ*) dengan audio pelafalan interaktif.
- **4 Nada Dasar & Nada Netral**: Visualisasi kontur nada berbasis skala Chao 5-tingkat dengan contoh audio fonem kontras.
- **Kaidah Penulisan Hanzi**: 8 goresan dasar (*Yǒngzì Bāfǎ*) dan 7 aturan utama urutan menulis karakter (*Bǐshùn*).

### 3. Kurikulum HSK Terpadu (HSK 1 s.d. HSK 5)
- **HSK 1 (12 Unit Lengkap)**:
  - Unit 01: Sapaan Sopan & Etika Komunikasi
  - Unit 02: Angka, Kuantitas & Transaksi
  - Unit 03: Waktu, Jam & Jadwal Harian
  - Unit 04: Belanja, Harga & Tawar-Menawar
  - Unit 05: Arah, Lokasi & Transportasi
  - Unit 06: Makanan, Minuman & Restoran
  - Unit 07: Keluarga, Relasi & Pekerjaan Rumah
  - Unit 08: Rutinitas, Hobi & Waktu Luang
  - Unit 09: Cuaca, Musim & Pakaian
  - Unit 10: Pekerjaan, Kantor & Profesi
  - Unit 11: Kesehatan, Tubuh & Perasaan
  - Unit 12: Evaluasi Komprehensif & Simulasi HSK 1
- **HSK 2 sampai HSK 5**: Peta silabus lengkap dengan formula tata bahasa esensial, ratusan target kosakata tematik, dan contoh kalimat berstandar internasional.

### 4. Mesin Latihan Interaktif (`/practice`)
- Tiga mode latihan per unit: **Pilihan Ganda**, **Susun Struktur Kalimat**, dan **Menyimak Audio**.
- Evaluasi langsung dengan skor instan, penjelasan konteks, dan integrasi otomatis ke Jurnal Kesalahan saat jawaban keliru.

### 5. Laboratorium Belajar Mandiri
- **Pelatih Nada & Matriks Sandhi (`/tone-coach`)**: Visualisator kurva nada interaktif dan tabel aturan perubahan nada (*Tone Sandhi* 3+3, kata 不, dan kata 一).
- **Laboratorium Menyimak (`/listening`)**: Latihan membedakan fonem kritis yang sering tertukar (seperti zh/j, sh/x, b/p) dan dikte kalimat.
- **Penjelajah Hanzi (`/hanzi-explorer`)**: Dekonstruksi radikal pembentuk karakter dan 4 pola tata letak spasial Hanzi.
- **Kata Bantu Bilangan (`/measure-words`)**: Panduan aturan pakai kata penggolong esensial Mandarin lengkap dengan formula dan kartu latihan.
- **Skenario Percakapan Kontekstual (`/scenarios`)**: Simulasi dialog dunia nyata dengan sistem bermain peran (*roleplay*) dua penutur.

### 6. Alat Manajemen Pembelajar Pribadi
- **Buku Frasa Personal (`/phrasebook`)**: Simpan frasa favorit dengan satu klik, buat catatan kustom, dan cari kosakata dengan cepat.
- **Jurnal Kesalahan (`/error-journal`)**: Evaluasi riwayat kesalahan kuis, dikelompokkan berdasarkan kategori (Nada, Tata Bahasa, Karakter, Kosakata).
- **Dasbor Progres Belajar (`/progress`)**: Laporan statistik lengkap mengenai akurasi, materi yang dituntaskan, dan frasa yang dikuasai.
- **Mode Tamu & Akun Cloud**: Akses langsung tanpa login, dengan opsi daftar akun di Supabase untuk sinkronisasi antarperangkat.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, React 19)
- **Bahasa**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS v4 dengan sistem token warna dan tema gelap/terang
- **Database & Autentikasi**: Supabase PostgreSQL dengan Row-Level Security (RLS)
- **Penyimpanan Lokal**: Web Storage API (`localStorage`) untuk Mode Tamu instan
- **Audio & Sintesis Suara**: Web Speech API (`zh-CN` speech synthesis) dengan fallback audio mandiri
- **Validasi Data**: Zod v3 untuk validasi input dan skema data
- **Ikon**: Komponen SVG kustom bebas dependensi pihak ketiga yang berat

---

## Struktur Rute Aplikasi

```
/                     Dasbor Utama Pembelajar & Jalur Belajar HSK 1
/fundamentals         Modul Fondasi Dasar (Pinyin, 4 Nada, Goresan Hanzi)
/lessons              Daftar Modul & Pelajaran HSK 1
/lessons/[modul]/[unit] Detail Materi Pelajaran (Tata Bahasa, Dialog, Kosakata)
/lessons/[modul]/[unit]/practice Mesin Latihan Kuis Interaktif Unit
/practice             Latihan Kuis Mandiri (Pilihan Ganda, Susun Kalimat, Audio)
/hsk                  Peta Kurikulum Terpadu HSK 1 sampai HSK 5
/hsk/[level]          Detail Kurikulum Tingkat Lanjutan (HSK 2 s.d. HSK 5)
/listening            Laboratorium Menyimak & Dikte Fonem
/tone-coach           Pelatih Nada & Matriks Formula Tone Sandhi
/hanzi-explorer       Penjelajah Radikal & Struktur Karakter Hanzi
/measure-words        Panduan & Latihan Kata Bantu Bilangan
/scenarios            Simulasi Skenario Percakapan Kontekstual
/phrasebook           Buku Frasa Kosakata Pribadi
/error-journal        Jurnal Pelacakan & Evaluasi Kesalahan
/progress             Dasbor Metrik & Rekapitulasi Progres Belajar
/login                Halaman Masuk Akun
/register             Halaman Pendaftaran Akun
/settings             Pengaturan Profil & Preferensi Belajar
```

---

## Panduan Menjalankan Proyek

### Prasyarat Sistem
- Node.js versi 18.18+ atau 20+
- npm atau pnpm

### Langkah Instalasi

1. **Masuk ke folder proyek**:
   ```bash
   cd develop
   ```

2. **Pasang dependensi paket**:
   ```bash
   npm install
   ```

3. **Pengaturan Variabel Lingkungan**:
   Salin file `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *(Opsional: masukkan URL dan Anon Key Supabase. Jika tidak diisi, aplikasi tetap dapat digunakan 100% menggunakan Mode Tamu lokal).*

4. **Jalankan Server Development**:
   ```bash
   npm run dev
   ```
   Buka peramban di [http://localhost:3000](http://localhost:3000).

5. **Uji Kualitas Kode & Build Produksi**:
   ```bash
   # Pengecekan tipe data TypeScript
   npm run typecheck

   # Pengecekan linter
   npm run lint

   # Build produksi
   npm run build
   ```

---

## Lisensi & Kontribusi

Proyek ini dikembangkan secara independen sebagai platform edutech interaktif untuk pembelajaran bahasa Mandarin modern. Seluruh hak cipta dilindungi.
