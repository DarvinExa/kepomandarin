# Mandarin Context Lab

> **Platform Pembelajaran Bahasa Mandarin Berbasis Konteks Kalimat & Standar Tingkat HSK**  
> Dibangun dengan prinsip desain fungsional **Bauhaus**, **De Stijl**, dan **Constructivism**.

---

## 01 // Ikhtisar Produk

**Mandarin Context Lab** adalah platform web modern untuk mempelajari bahasa Mandarin secara mendalam, tenang, dan efektif. Tidak seperti aplikasi pembelajaran konvensional yang mengandalkan hafalan kata terisolasi atau elemen *gamification* berlebihan, Mandarin Context Lab menempatkan setiap kata dan pola tata bahasa ke dalam **konteks kalimat utuh**, dilengkapi pembiasaan auditori, pelacakan kesalahan personal, dan eksplorasi mandiri bertingkat dari **HSK 1 hingga HSK 5**.

---

## 02 // Karakteristik Visual & Desain Sistem

Desain antarmuka mematuhi prinsip ketat aliran **Bauhaus**, **De Stijl**, dan **Konstruktivisme Soviet**:

- **Geometri Tegas**: Struktur grid asimetris berbingkai garis tegas (`border-rule`, `border-ink`), tanpa sudut membulat (`rounded-none`).
- **Palet Warna Solid Terbatas**: Menggunakan warna dasar fungsional:
  - `bg-canvas` (`#F7F5F0` / Warm Paper) & `bg-paper` (`#FFFFFF`)
  - `text-ink` (`#121212` / Solid Charcoal) & `text-muted` (`#5A5A5A`)
  - Aksen primer De Stijl: `accent-red` (`#D9381E`), `accent-blue` (`#1B4D89`), `accent-yellow` (`#E5A93C`)
- **Tipografi sebagai Struktur Utama**: Kombinasi `Space Grotesk` (editorial), `Space Mono` (teknis/metrik), dan `Noto Sans SC` (karakter Hanzi proporsional).
- **Ketegasan Fungsional**: **0 emoji**, **0 gradien**, **0 efek glassmorphism/glow/neon**, dan **0 ilustrasi generik**. Setiap elemen visual memiliki fungsi pedagogis langsung.
- **Kebijakan Bahasa Konsisten**: Seluruh antarmuka pengguna disajikan dalam Bahasa Indonesia alami. Setiap entri Mandarin wajib memuat tiga serangkai: **Hanzi**, **Pinyin bernada**, dan **Terjemahan Bahasa Indonesia**.

---

## 03 // Arsitektur Kurikulum HSK (Tingkat 1 s.d. 5)

| Tingkat | Setara CEFR | Target Kosakata | Karakteristik Pedagogis & Fokus Pembelajaran | Status |
|---|---|---|---|---|
| **HSK 1** | CEFR A1 | 150 Kata | Fondasi pengenalan sapaan, angka/waktu, keluarga, restoran, dan lokasi. Dilengkapi 5 unit pelajaran terpandu, pemutar audio, kuis interaktif (pilihan ganda & susun kalimat), serta pencatatan otomatis ke Jurnal Kesalahan. | **Aktif Penuh** |
| **HSK 2** | CEFR A2 | 300 Kata | Perluasan rutinitas harian, cuaca, belanja, transportasi, dan kesehatan. Dilengkapi 6 formula tata bahasa (`了`, `比`, `过`, `离`, `正在`, `往/到`), 5 silabus unit, dan 150 kosakata tematik. | **Kurikulum Aktif** |
| **HSK 3** | CEFR B1 | 600 Kata | Kemandirian komunikasi dunia kerja, liburan, dan tradisi. Dilengkapi 6 tata bahasa kunci (`把`, `被`, `起来/下去/出来`, `虽然...但是...`, `连...都...`, `只要...就...`), 5 silabus unit, dan 300 kosakata tematik. | **Kurikulum Aktif** |
| **HSK 4** | CEFR B2 | 1.200 Kata | Wacana sosial konseptual, dinamika karir, finansial cerdas, dan filosofi hidup. Dilengkapi 6 tata bahasa retoris (`反而`, `之所以...是因为...`, `对于/关于`, `难道...吗？`, `无论...都...`, `其实/究竟`), 5 silabus unit, dan 600 kosakata tematik. | **Kurikulum Aktif** |
| **HSK 5** | CEFR C1 | 2.500 Kata | Literasi wacana formal (*shūmiànyǔ*), sains kecerdasan buatan, arsitektur peradaban, dan dialog global. Dilengkapi 6 tata bahasa literasi (`自...以来/凭`, `未尝/何尝`, `日益/日渐`, `想必/势必`, `宁可...也...`, `总而言之/综上所述`), 5 silabus unit, dan 1.300 kosakata tematik. | **Kurikulum Aktif** |

---

## 04 // Modul Khusus Laboratorium Pembelajaran

Selain kurikulum bertingkat, platform dilengkapi 5 laboratorium spesialis yang dapat diakses secara mandiri:

1. **Laboratorium Menyimak (`/listening`)**:
   - Latihan diskriminasi pasangan minimal fonem kritis (`zh/j`, `sh/x`, `b/p`).
   - Latihan kontras nada dan dikte kalimat kontekstual terintegrasi dengan Jurnal Kesalahan.
2. **Pelatih Nada & Matriks Sandhi (`/tone-coach`)**:
   - Visualisator kontur nada 5-tingkat skala Chao (*Chao 5-pitch scale*) interaktif menggunakan SVG geometris.
   - Matriks formula 4 variasi *Tone Sandhi* (nada 3+3, half-3rd tone, sandhi 不, dan sandhi 一).
   - Latihan auditif diskriminasi nada.
3. **Penjelajah Radikal & Struktur Hanzi (`/hanzi-explorer`)**:
   - Indeks 12 radikal semantik primer Mandarin beserta dekonstruksi visualnya.
   - Visualisator 4 jenis konfigurasi spasial Hanzi: Kiri-Kanan (`[ ◧ ]`), Atas-Bawah (`[ ⬓ ]`), Lingkup (`[ ▣ ]`), dan Utuh (`[ ■ ]`).
   - Pedoman 7 urutan goresan standar (*Bǐshùn*) dan kuis identifikasi radikal.
4. **Penjelajah Kata Penggolong (`/measure-words`)**:
   - 10 kata penggolong esensial (`个`, `本`, `块`, `只`, `张`, `杯`, `岁`, `点`, `位`, `双`).
   - Sintaks formula 3-blok Bauhaus: `[ Angka / Tunjuk ] + [ Kata Penggolong ] + [ Kata Benda ]`.
   - Logika fisik bentuk semantik dan kuis rumpang interaktif.
5. **Skenario Percakapan Kontekstual (`/scenarios`)**:
   - 4 situasi percakapan nyata: Salam Kampus, Kedai Teh, Pasar Buah, dan Penjadwalan Waktu.
   - Mode peran bergantian (*turn-based roleplay*) dua penutur (Pembicara A Merah vs Pembicara B Biru).
   - Catatan etiket sosiokultural dan penyimpanan dialog 1-klik ke Buku Frasa.

---

## 05 // Fitur Manajemen Pembelajar

- **Buku Frasa Personal (`/phrasebook`)**: Simpan frasa favorit atau kata sulit dari seluruh modul dengan 1-klik, tambah entri kustom, pencarian instan, dan filter kategori.
- **Jurnal Kesalahan (`/error-journal`)**: Pencatatan otomatis jawaban salah saat latihan kuis dengan label jenis kesalahan (Nada, Tata Bahasa, Karakter, Kosakata) dan pelacakan status perbaikan.
- **Dasbor Kemajuan (`/progress`)**: Statistik transparan mengenai penyelesaian materi, akurasi latihan, dan pola kelemahan belajar.
- **Autentikasi & Mode Tamu (`/login`, `/register`, `/settings`)**: Mendukung autentikasi Supabase serta mode tamu (*Guest Mode*) dengan penyimpanan `localStorage` instan tanpa hambatan pendaftaran.

---

## 06 // Peta Rute Aplikasi (26 Rute Terkompilasi)

```
/                     Beranda Utama & Navigasi Cepat
/fundamentals         Fondasi Dasar (4 Nada, Pīnyīn, 8 Goresan Hanzi)
/lessons              Daftar Unit Pelajaran HSK 1
/lessons/[id]         Detail Pelajaran Interaktif (01 s.d. 05)
/practice             Mesin Latihan Kuis Terintegrasi Tiap Unit
/phrasebook           Buku Frasa Kosakata Pribadi
/error-journal        Jurnal Pelacakan Kesalahan Belajar
/progress             Dasbor Metrik Kemajuan Belajar
/hsk                  Peta Kurikulum Terpadu (HSK 1–5)
/hsk/2                Kurikulum HSK 2 (Tingkat Dasar II)
/hsk/3                Kurikulum HSK 3 (Tingkat Menengah I)
/hsk/4                Kurikulum HSK 4 (Tingkat Menengah II)
/hsk/5                Kurikulum HSK 5 (Tingkat Mahir)
/listening            Laboratorium Menyimak & Dikte
/tone-coach           Pelatih Nada & Matriks Sandhi
/hanzi-explorer       Penjelajah Radikal & Struktur Karakter
/measure-words        Penjelajah Kata Penggolong (Measure Words)
/scenarios            Skenario Percakapan Kontekstual
/login                Halaman Masuk Akun
/register             Halaman Pendaftaran Akun
/settings             Pengaturan Profil & Preferensi Audio
/_not-found           Halaman 404 Estetika Bauhaus
```

---

## 07 // Tumpukan Teknologi (Tech Stack)

- **Framework**: Next.js 16 (App Router, Turbopack, React 19)
- **Bahasa**: TypeScript 5 (Strict Mode, 0 any policy)
- **Styling**: Tailwind CSS v4 (Custom Bauhaus palette & design tokens)
- **Database & Auth**: Supabase PostgreSQL dengan Row-Level Security (RLS)
- **Audio**: Web Speech API (`zh-CN` speech synthesis) dengan fallback mandiri
- **Linting & Formatting**: ESLint 9 flat config, Prettier-compliant

---

## 08 // Panduan Instalasi & Menjalankan Proyek

### Kebutuhan Sistem
- Node.js versi 18.18+ atau 20+
- npm atau pnpm

### Langkah Instalasi

1. **Klon repositori dan masuk ke direktori kerja**:
   ```bash
   cd develop
   ```

2. **Pasang dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables**:
   Salin `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *(Opsional: masukkan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Jika dibiarkan kosong, aplikasi otomatis berjalan dalam Offline Local-Fallback Mode).*

4. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Buka peramban di [http://localhost:3000](http://localhost:3000).

5. **Pengujian Kualitas Kode**:
   ```bash
   # Typecheck TypeScript
   npm run typecheck

   # Linter ESLint
   npm run lint

   # Kompilasi Produksi (Production Build)
   npm run build
   ```

---

## 09 // Lisensi & Hak Cipta

Dikembangkan sebagai portofolio edutech modern untuk platform **Mandarin Context Lab**.  
Seluruh hak cipta dilindungi.
