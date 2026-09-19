# Catatan Perubahan (Changelog) — Mandarin Context Lab

Seluruh perubahan dan pembaruan penting pada proyek **Mandarin Context Lab** dicatat dalam dokumen ini.

---

## [1.1.0] — 2026-09-19

### Alur Pembelajaran Terpadu (*Seamless Learning Progression*) & Modul Fondasi Dasar Mandarin

- **Modul Fondasi Dasar Mandarin (`/fundamentals`)**:
  - Ditempatkan sebelum HSK 1 sebagai prasyarat pemahaman komprehensif.
  - 4 Nada Dasar & Nada Netral dengan visualisator skala Chao 5-tingkat, audio percontohan kata kontras `ma` (妈, 麻, 马, 骂, 吗), dan kaidah penempatan nada vokal (`a > o > e > i/u > ü`).
  - 23 Inisial (*Shēngmǔ*) & 24 Final (*Yùnmǔ*) lengkap dengan audio interaktif per fonem dan panduan artikulasi lidah/bibir.
  - 8 Goresan Dasar Karakter Hanzi (*Yǒngzì Bāfǎ*) dan 7 Kaidah Utama Urutan Menulis (*Bǐshùn*).
  - Latihan evaluasi fondasi interaktif di akhir modul dengan tombol kelulusan langsung ke HSK 1 Pelajaran 01.
- **Alur Pembelajaran Mulus (*Seamless Progression*)**:
  - Di akhir setiap unit pelajaran teori ([`/lessons/[id]`](file:///c:/Users/EXA/OneDrive/Dokumen/Portofolio/mandarin-context-lab/develop/src/app/lessons/[id]/page.tsx)), pembelajar langsung dipandu melalui blok CTA menuju latihan unit tersebut (`/practice?lesson=[id]`).
  - Setiap unit memiliki set latihan lengkap mencakup 3 mode: Pilihan Ganda, Susun Kalimat, dan Menyimak Audio.
  - Pada layar ringkasan penyelesaian latihan, tombol kelulusan utama mengarahkan pembelajar langsung ke **Pelajaran Teori Berikutnya** (`/lessons/[XX+1]`), bukan langsung ke latihan unit baru, sehingga pembelajar memahami materi wacana terlebih dahulu. Pada Unit 05 (unit terakhir HSK 1), tombol mengarahkan ke Kurikulum HSK 2 (`/hsk/2`).
- **Pembersihan Bilah Navigasi (Navbar)**:
  - Menghapus tab menu global "Latihan" dari bilah navigasi (`NAV_ITEMS`) sehingga alur belajar terarah dan tidak membingungkan pengguna.
- **Total Rute Terkompilasi**: Bertambah menjadi **27 rute** Next.js (termasuk `/fundamentals`).

---

## [1.0.0] — 2026-09-19

### Rilis Penuh: Kurikulum Aktif HSK 1–5 & Laboratorium Pembelajaran Lengkap

Rilis komprehensif penuntasan seluruh fase pengembangan produk berdasarkan [roadmap.md](file:///c:/Users/EXA/OneDrive/Dokumen/Portofolio/mandarin-context-lab/docs/roadmap.md), mencakup kurikulum inti HSK 1 hingga HSK 5, 5 modul laboratorium auditori & ortografis, mesin latihan kontekstual, buku frasa personal, jurnal evaluasi kesalahan, serta pelacakan progres belajar.

---

### Fitur Baru Berdasarkan Fase

#### Fase 1 — Setup Fondasi & Desain Sistem Bauhaus / De Stijl / Constructivism
- Inisialisasi arsitektur Next.js (App Router), TypeScript strict mode, Tailwind CSS v4, dan Supabase PostgreSQL.
- Implementasi desain sistem estetika murni:
  - Geometri tegas tanpa *rounded corner* (`rounded-none`).
  - Palet warna solid terbatas (`bg-canvas`, `bg-paper`, `text-ink`, `accent-red`, `accent-blue`, `accent-yellow`).
  - Nol emoji, nol gradien, nol glassmorphism, nol ilustrasi generik.
  - Tipografi hierarkis editorial yang fungsional dengan dukungan font Mandarin `Noto Sans SC`.

#### Fase 2 — Alur Autentikasi & Mode Pembelajar Tamu (*Guest Mode*)
- Halaman pendaftaran (`/register`) dan masuk akun (`/login`) dengan validasi input server-side.
- Dukungan *Guest Fallback Mode*: pengguna dapat langsung belajar dan menyimpan data ke `localStorage` tanpa hambatan login wajib.

#### Fase 3 — Kurikulum Inti & Database Seeding (HSK 1)
- Struktur tabel database PostgreSQL Supabase: `curriculums`, `levels`, `lessons`, `vocabulary`, `exercises`.
- Seeding data berulang (>1.000 baris di `supabase/seed.sql`) untuk HSK 1: 5 pelajaran kontekstual lengkap (Sapaan, Angka & Waktu, Keluarga, Restoran, Arah & Lokasi) dengan 150 target kosakata.
- Sistem *hybrid data source*: sinkronisasi Supabase dengan *local memory fallback* tanpa latency jaringan.

#### Fase 4 — Mesin Latihan Kontekstual (*Practice Engine*)
- Kuis pilihan ganda terkontekstualisasi (*Multiple Choice*) dengan umpan balik visual instan.
- Kuis susun struktur kalimat (*Sentence Ordering / Unscramble*) yang melatih tata bahasa alami Mandarin.
- Layar rangkuman hasil sesi latihan dengan skor akurasi dan tombol perbaikan kesalahan (*Review Mistakes*).

#### Fase 5 — Buku Frasa Personal (*Phrasebook*)
- Manajemen frasa kosakata pribadi (`/phrasebook`): tambah frasa kustom, edit, hapus, dan pencarian cepat.
- Filter kategori tematik dan penyimpanan 1-klik dari seluruh pelajaran dan modul laboratorium.
- Keamanan isolasi baris data (Row-Level Security / RLS) per akun pengguna.

#### Fase 6 — Jurnal Pelacakan Kesalahan (*Error Journal*)
- Pencatatan otomatis setiap jawaban latihan yang salah ke dalam `/error-journal`.
- Kategorisasi kesalahan berdasarkan domain pembelajaran: Nada (*tones*), Tata Bahasa (*grammar*), Karakter (*hanzi*), dan Kosakata (*vocab*).
- Mekanisme penyelesaian (*resolve state*) saat pengguna berhasil memperbaiki pemahaman.

#### Fase 7 — Metrik Kemajuan & Evaluasi (*Progress Dashboard*)
- Dasbor analitik kemajuan belajar (`/progress`):
  - Jumlah pelajaran yang diselesaikan.
  - Akurasi rata-rata kuis latihan.
  - Diagnosis pola kesalahan terbanyak untuk arahan belajar personal.
  - Metrik kosakata yang telah dikuasai.

#### Fase 8 — Fondasi Auditori & Percobaan Perekaman
- Pemutar audio sintesis berbasis Web Speech API Mandarin (`zh-CN`).
- Pengatur kecepatan putar (*playback rate*) 0.75x (lambat) hingga 1.0x (normal).
- Komponen percobaan perekaman suara mandiri untuk perbandingan intonasi artikulasi.

#### Fase 9 — Modul Lanjutan Laboratorium & Struktur Kurikulum (9.1 – 9.9)
1. **Modul 9.1: Laboratorium Menyimak (`/listening`)**:
   - Latihan pasangan minimal fonem (*minimal pairs* `zh/j`, `sh/x`, `b/p`).
   - Kontras nada dan dikte kalimat kontekstual dengan integrasi langsung ke Jurnal Kesalahan.
2. **Modul 9.2: Pelatih Nada & Matriks Sandhi (`/tone-coach`)**:
   - Visualisator kontur nada 5 tingkat skala Chao (*Chao 5-pitch scale*) interaktif menggunakan SVG presisi.
   - Matriks 4 aturan *Tone Sandhi* Mandarin (nada 3+3, half-3rd tone, sandhi 不, dan sandhi 一).
   - Kuis diskriminasi nada dengan tombol pemutar audio percontohan.
3. **Modul 9.3: Penjelajah Radikal & Anatomi Hanzi (`/hanzi-explorer`)**:
   - Indeks 12 radikal semantik utama (氵, 亻, 讠, 艹, 口, 木, dll.) dengan arti dan karakter contoh.
   - Visualisator 4 struktur spasial karakter Mandarin: Kiri-Kanan (`[ ◧ ]`), Atas-Bawah (`[ ⬓ ]`), Lingkup (`[ ▣ ]`), dan Utuh Tunggal (`[ ■ ]`).
   - Pedoman 7 urutan goresan standar (*Bǐshùn*).
   - Kartu dekonstruksi karakter HSK 1 dan kuis identifikasi radikal.
4. **Modul 9.4: Penjelajah Kata Penggolong / Measure Words (`/measure-words`)**:
   - 10 kata penggolong esensial (`个`, `本`, `块`, `只`, `张`, `杯`, `岁`, `点`, `位`, `双`).
   - Sintesis formula 3-blok gaya Bauhaus: `[ Angka / Kata Tunjuk ] + [ Kata Penggolong ] + [ Kata Benda ]`.
   - Logika fisik bentuk/semantik dan kuis rumpang interaktif.
5. **Modul 9.5: Skenario Percakapan Kontekstual (`/scenarios`)**:
   - 4 skenario interaktif: Salam Kampus, Kedai Teh, Pasar Buah, dan Penjadwalan Waktu.
   - Mode peran bergantian (*role-play*) dua penutur: Pembicara A (Aksen Merah) vs Pembicara B (Aksen Biru).
   - Catatan etiket sosiokultural Tiongkok dan tombol 1-klik simpan frasa dialog.
6. **Modul 9.6: Kurikulum HSK 2 (`/hsk/2`)**:
   - Target 300 kata (CEFR A2), 6 formula tata bahasa inti (`了`, `比`, `过`, `离`, `正在`, `往/到`), 5 cetak biru pelajaran (Cuaca, Belanja, Transportasi, Wisata, Kesehatan), dan 150 kosakata tematik.
7. **Modul 9.7: Kurikulum HSK 3 (`/hsk/3`)**:
   - Target 600 kata (CEFR B1), 6 tata bahasa kunci (`把`, `被`, `起来/下去/出来`, `虽然...但是...`, `连...都...`, `只要...就...`), 5 cetak biru pelajaran (Rencana Liburan, Wawancara Kerja, Gaya Hidup Sehat, Tradisi Budaya, Layanan Publik), dan 300 kosakata tematik.
8. **Modul 9.8: Kurikulum HSK 4 (`/hsk/4`)**:
   - Target 1.200 kata (CEFR B2), 6 tata bahasa wacana konseptual (`反而`, `之所以...是因为...`, `对于/关于`, `难道...吗？`, `无论...都...`, `其实/究竟`), 5 cetak biru pelajaran (Percintaan, Stres Karir, Finansial Cerdas, Etika Komunikasi, Filosofi Bahagia), dan 600 kosakata tematik.
9. **Modul 9.9: Kurikulum HSK 5 (`/hsk/5`)**:
   - Target 2.500 kata (CEFR C1), 6 tata bahasa literasi formal (`自...以来/凭`, `未尝/何尝`, `日益/日渐`, `想必/势必`, `宁可...也...`, `总而言之/综上所述`), 5 cetak biru pelajaran (Sains Inovasi, Arsitektur Sejarah, Ekonomi Hijau, Seni Sastra, Dialog Peradaban), dan 1.300 kosakata tematik.

#### Transisi Status Kurikulum: Draft ke Aktif Penuh (HSK 1–5)
- Pembaruan status seluruh tingkatan HSK 1–5 menjadi **Kurikulum Resmi Aktif** (`is_active: true`) pada skema database dan file definisi kurikulum.
- Restrukturisasi halaman Peta Kurikulum (`/hsk`) menjadi navigasi editorial terpadu dengan kartu ringkasan untuk kelima tingkatan.
- Penyediaan akses langsung ke 26 rute halaman terkompilasi.

---

### Kepatuhan Kriteria Rilis (Release Gates Verification)

| Kriteria Rilis | Status | Catatan Verifikasi |
|---|---|---|
| **Alur End-to-End** | Terpenuhi | Navigasi antar 26 rute halaman berjalan lancar dari beranda hingga silabus HSK 5. |
| **Linting & Code Quality** | Terpenuhi | `npm run lint` menghasilkan **0 error dan 0 warning**. |
| **TypeScript Typecheck** | Terpenuhi | `npm run typecheck` menghasilkan **0 error** di seluruh codebase. |
| **Next.js Production Build** | Terpenuhi | Turbopack mengompilasi 26 rute (statis dan dinamis) dalam waktu < 2 detik. |
| **Responsive Layout** | Terpenuhi | Diuji pada lebar layar ponsel 390px dan layar desktop; tanpa *overflow horizontal*. |
| **State Kosong & Error** | Terpenuhi | Halaman phrasebook, jurnal kesalahan, dan dasbor progres memiliki *empty state* yang informatif. |
| **Kebijakan Bahasa** | Terpenuhi | 100% UI berbahasa Indonesia alami; konten Mandarin memuat Hanzi, Pinyin bernada, dan terjemahan. |

---

### Keterbatasan Teknis & Isu yang Diketahui (Known Issues / Technical Considerations)

1. **Sintesis Audio di Browser**:
   - Audio di beberapa browser/perangkat mengandalkan Web Speech API bawaan sistem operasi. Jika sistem operasi pengguna belum mengunduh suara paket bahasa Mandarin Tiongkok (`zh-CN`), browser dapat menggunakan suara fallback atau memerlukan izin audio pertama kali.
2. **Kuis Interaktif Formal Terpandu**:
   - Mesin kuis evaluasi formal bertahap saat ini difokuskan pada HSK 1 (5 unit pelajaran inti). Level HSK 2 hingga HSK 5 disajikan dengan naskah dialog pergantian tutur, matriks formula komparatif, dan penjelajah kosakata tematik yang dapat langsung disimpan ke Buku Frasa pribadi.
3. **Koneksi Database Supabase**:
   - Aplikasi dirancang dengan arsitektur *offline-first / local fallback*. Jika kredensial Supabase di `.env.local` tidak dihubungkan ke server cloud aktif, aplikasi secara otomatis beralih ke penyimpanan lokal browser tanpa mengganggu alur belajar.
