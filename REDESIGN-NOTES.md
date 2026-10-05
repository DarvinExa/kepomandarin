# KepoMandarin redesign notes

## Ringkasan

Seluruh aplikasi memakai sistem visual baru yang terinspirasi pola interaksi aplikasi belajar Duolingo, dengan identitas merah dan emas KepoMandarin.

Data, materi, rute, autentikasi, penyimpanan progres, audio, latihan, dan integrasi Supabase tetap dipertahankan.

## Perubahan utama

- halaman depan baru dengan hero, maskot, nilai utama, fitur, silabus, dan CTA
- sidebar desktop baru dengan ikon SVG
- app bar dan bottom navigation mobile
- dashboard baru dengan learning path vertikal
- kartu unit merah dan progress bar emas
- panel ringkasan belajar
- header merah konsisten pada halaman modul
- kartu dengan radius, border 2 px, dan bayangan solid
- tombol utama merah
- tombol audio dan informasi biru
- status sukses hijau
- layout autentikasi tanpa sidebar
- dukungan dark mode tetap dipertahankan
- layout responsif untuk desktop, tablet, dan mobile

## File utama yang diubah

- `src/app/globals.css`
- `src/components/navigation/AppShell.tsx`
- `src/components/navigation/DesktopNav.tsx`
- `src/components/navigation/MobileNav.tsx`
- `src/components/navigation/nav-config.ts`
- `src/components/ui/AppIcon.tsx`
- `src/components/landing/PublicLandingPage.tsx`
- `src/components/dashboard/LearnerDashboard.tsx`
- `src/app/login/page.tsx`
- `src/app/register/page.tsx`

## Validasi

- TypeScript typecheck lulus
- ESLint lulus tanpa error
- production build lulus
- 136 halaman statis dan dinamis berhasil dibuat
- halaman depan diperiksa pada desktop dan mobile
- dashboard diperiksa pada desktop
- kurikulum HSK diperiksa pada desktop
- listening diperiksa pada mobile
- halaman login diperiksa pada desktop

## Catatan

ESLint masih menampilkan peringatan lama tentang penggunaan elemen `img`. Peringatan tersebut tidak menghambat build.

`npm audit` melaporkan dependency yang perlu ditinjau secara terpisah. Tidak dilakukan pembaruan dependency paksa karena dapat menimbulkan perubahan besar di luar ruang lingkup redesign.