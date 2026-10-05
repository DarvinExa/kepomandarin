# KepoMandarin design system

## Tujuan

Antarmuka menggunakan pola pembelajaran berbasis progres yang ringan, jelas, dan menyenangkan. Struktur konten KepoMandarin tetap dipertahankan. Perubahan hanya menyentuh presentasi, hierarki, navigasi responsif, dan umpan balik visual.

## Prinsip

1. Materi dan data yang sudah ada tidak diubah.
2. Setiap layar memiliki satu tindakan utama.
3. Status harus terlihat dari bentuk, label, dan ikon. Warna tidak boleh menjadi satu-satunya pembeda.
4. Gunakan aset KepoMandarin yang sudah ada. Jangan mengganti logo atau maskot dengan ikon generik.
5. Hindari dekorasi tanpa fungsi, emoji, bahasa promosi berlebihan, dan tanda baca em dash.
6. Gunakan kalimat pendek dan langsung.

## Warna

| Token | Nilai | Fungsi |
|---|---:|---|
| `--km-red` | `#E84B3C` | Merek, tindakan utama, pelajaran aktif |
| `--km-red-dark` | `#B8322B` | Bayangan tombol merah |
| `--km-red-soft` | `#FFF0EE` | Latar status aktif dan salah |
| `--km-gold` | `#FFC800` | Progres, pencapaian, tingkat selesai |
| `--km-gold-dark` | `#D59C00` | Bayangan elemen emas |
| `--km-blue` | `#1CB0F6` | Audio, informasi, hadiah |
| `--km-blue-dark` | `#168FCB` | Bayangan elemen biru |
| `--km-green` | `#58A700` | Jawaban benar dan status sukses |
| `--km-ink` | `#3C3C3C` | Teks utama |
| `--km-muted` | `#777777` | Teks sekunder |
| `--km-line` | `#E5E5E5` | Border dan pemisah |
| `--km-soft` | `#F7F7F7` | Latar sekunder |

Merah dan emas adalah warna merek. Hijau hanya dipakai untuk keberhasilan. Biru dipakai untuk audio dan informasi.

## Tipografi

Gunakan `Arial Rounded MT Bold`, `Nunito`, lalu font sistem sebagai fallback.

| Peran | Ukuran |
|---|---:|
| Judul halaman | 28 px desktop, 23 px mobile |
| Judul kartu | 16 sampai 24 px |
| Isi | 15 px |
| Label | 11 sampai 12 px |

Isi panjang memakai Arial agar tetap mudah dibaca. Judul dan tombol memakai bentuk rounded yang lebih kuat.

## Spacing

Gunakan skala 4, 8, 12, 16, 20, 24, 28, 32, dan 48 px.

- Jarak elemen dalam kartu: 12 sampai 20 px.
- Jarak antarkartu: 16 sampai 18 px.
- Jarak area utama dan panel samping: 48 px.
- Padding halaman desktop: 30 px di atas dan 80 px di bawah.

## Bentuk

- Radius tombol kecil: 12 sampai 14 px.
- Radius kartu: 16 sampai 18 px.
- Node pelajaran: lingkaran atau bentuk bulat penuh.
- Border: 2 px.
- Bayangan memakai warna solid pada sumbu Y. Hindari blur besar.

Contoh tombol merah:

```css
background: var(--km-red);
box-shadow: 0 5px var(--km-red-dark);
```

## Layout

### Desktop

- Sidebar tetap: 254 px.
- Kolom materi: maksimal 680 px.
- Panel samping: 320 px.
- Jarak kolom: 48 px.

### Mobile

- Header merek di atas.
- Navigasi utama di bawah.
- Panel samping disembunyikan.
- Semua kartu menjadi satu kolom.
- Target sentuh minimal 44 px.

## Komponen

### Sidebar

Gunakan logo asli `public/images/logo-text.png`. Item aktif memakai latar merah muda, border merah muda, dan teks merah.

### Unit card

Menampilkan nama unit, deskripsi, progres, dan maskot. Isi data berasal dari prop `data.unit`.

### Learning path

Status yang didukung:

- `complete`: emas
- `current`: merah
- `locked`: abu-abu
- `reward`: biru

### Quiz

Jawaban benar menggunakan `mascot-correct.png`. Jawaban salah menggunakan `mascot-sad.png`. Teks hasil harus menjelaskan tindakan berikutnya.

### Aset maskot

| Aset | Penggunaan |
|---|---|
| `mascot-studying.png` | Unit dan silabus |
| `mascot-thinking.png` | Soal dan petunjuk |
| `mascot-correct.png` | Jawaban benar |
| `mascot-sad.png` | Jawaban salah |
| `mascot-frustrated.png` | Jurnal kesalahan |
| `mascot-celebrating.png` | Progres dan pencapaian |
| `mascot-neutral.png` | Profil dan setelan |
| `mascot-greeting.png` | Frasa dan sapaan |
| `mascot-dizzy.png` | Kesalahan berulang |
| `mascot-sleepy.png` | Status tidak aktif |

## Data dan integrasi

Komponen utama menerima `KepoMandarinData` melalui prop `data`. Jangan memindahkan data produksi ke file komponen. Hubungkan data Laravel, Inertia, atau API yang sudah ada ke tipe tersebut.

`demoData.ts` hanya untuk preview dan boleh dihapus setelah integrasi.

Navigasi dapat dihubungkan ke router yang sudah ada melalui `onNavigate`. Pembukaan pelajaran dapat dihubungkan melalui `onLessonOpen`.

## Aksesibilitas

- Setiap tombol ikon memiliki `aria-label`.
- Gambar dekoratif memakai `alt=""`.
- Teks normal harus memiliki rasio kontras minimal 4.5:1.
- Fokus keyboard harus terlihat.
- Umpan balik tidak hanya mengandalkan warna.
- Animasi harus menghormati `prefers-reduced-motion`.