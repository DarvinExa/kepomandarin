export interface NavItem {
  label: string;
  shortLabel: string;
  href: string;
  index: string;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Beranda",
    shortLabel: "Beranda",
    href: "/",
    index: "01",
    description: "Ringkasan belajar dan panduan materi",
  },
  {
    label: "Kurikulum HSK",
    shortLabel: "Silabus",
    href: "/hsk",
    index: "02",
    description: "Materi belajar HSK 1 sampai HSK 5",
  },
  {
    label: "Latihan Mendengar",
    shortLabel: "Mendengar",
    href: "/listening",
    index: "03",
    description: "Latihan dengar bunyi dan nada",
  },
  {
    label: "Buku Frasa",
    shortLabel: "Frasa",
    href: "/phrasebook",
    index: "04",
    description: "Daftar kata dan kalimat pilihanmu",
  },
  {
    label: "Jurnal Kesalahan",
    shortLabel: "Jurnal",
    href: "/error-journal",
    index: "05",
    description: "Catatan kesalahan buat dipelajari lagi",
  },
  {
    label: "Progres Belajar",
    shortLabel: "Progres",
    href: "/progress",
    index: "06",
    description: "Pantau hasil belajar dan akurasi",
  },
  {
    label: "Pengaturan",
    shortLabel: "Setelan",
    href: "/settings",
    index: "07",
    description: "Atur akun dan tampilan",
  },
];
