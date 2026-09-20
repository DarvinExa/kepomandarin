import Link from "next/link";
import { RecentErrorsDashboard } from "@/components/dashboard/RecentErrorsDashboard";

export interface LearnerDashboardProps {
  userId?: string;
  learnerName: string;
  isGuest: boolean;
  completedLessonsCount: number;
  totalLessons: number;
  totalVocabInCurriculum: number;
  progressPercent: number;
  recentAccuracy: number | null;
  nextLessonSlug: string;
  currentLesson: {
    title: string;
    hanzi: string;
    pinyin: string;
    translation: string;
    objective: string;
  };
}

export function LearnerDashboard({
  userId,
  learnerName,
  isGuest,
  completedLessonsCount,
  totalLessons,
  totalVocabInCurriculum,
  progressPercent,
  recentAccuracy,
  nextLessonSlug,
  currentLesson,
}: LearnerDashboardProps) {
  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8 sm:space-y-12">
      {/* 0. Top Bar untuk Mode Tamu (Navigasi Balik ke Landing Page) */}
      {isGuest && (
        <div className="border border-rule bg-canvas p-3 sm:px-4 sm:py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-muted">
            <span className="w-2 h-2 bg-accent-yellow" aria-hidden="true" />
            <span>Kamu sedang berada di Mode Dasbor Belajar Tamu.</span>
          </div>
          <Link
            href="/"
            className="text-accent-blue hover:text-ink font-bold transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>← Kembali ke Halaman Perkenalan (Landing Page)</span>
          </Link>
        </div>
      )}

      {/* 1. Header / Greeting */}
      <section className="border-b border-rule pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0">
          <img
            src="/images/mascot-greeting.png"
            alt="Maskot KepoMandarin Halo"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain shrink-0"
          />
          <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-accent-red" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                01 // BERANDA BELAJAR
              </span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-ink">
                {isGuest ? "Selamat Datang" : "Selamat Datang Kembali"}, {learnerName}
              </h1>
              <p className="text-xs sm:text-sm text-muted max-w-xl leading-relaxed pt-1">
                {isGuest
                  ? "Belajar bahasa Mandarin lewat contoh kalimat sehari-hari. Kamu bisa langsung coba tanpa daftar, atau buat akun buat simpan progres belajarmu."
                  : "Lanjut belajar HSK 1 dan coba latihan soal hari ini."}
              </p>
            </div>
          </div>
        </div>

        <div className="shrink-0 font-mono text-xs text-muted flex items-center gap-3">
          <span className="px-2.5 py-1 border border-rule bg-paper">
            TINGKAT: HSK 1
          </span>
          <span className="hidden sm:inline text-rule">|</span>
          <span
            className={`px-2.5 py-1 font-mono text-xs border ${
              isGuest
                ? "border-accent-yellow bg-canvas text-ink"
                : "border-rule bg-canvas text-status-success font-semibold"
            }`}
          >
            {isGuest ? "MODE TAMU // AKSES BEBAS" : "AKUN TERHUBUNG"}
          </span>
        </div>
      </section>

      {/* 1.5. Guest Callout Banner */}
      {isGuest && (
        <section className="border-2 border-ink bg-paper p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rule pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-accent-yellow" aria-hidden="true" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink">
                Belajar Tanpa Akun
              </span>
            </div>
            <span className="font-mono text-[10px] text-muted uppercase bg-canvas border border-rule px-2 py-0.5 self-start sm:self-auto">
              Akses Semua Materi
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-ink">
                Kamu Bisa Langsung Mulai Belajar HSK 1
              </h2>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Semua materi dan latihan bisa kamu buka langsung tanpa harus daftar. Kalau mau simpan hasil latihan dan progres secara permanen, kamu bisa buat akun kapan saja:
              </p>

              {/* Grid 3 Keuntungan Akun */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                <div className="border border-rule p-3.5 bg-canvas space-y-1">
                  <span className="font-mono text-[10px] font-bold uppercase text-accent-blue block">
                    01 // RIWAYAT
                  </span>
                  <p className="font-bold text-ink">Simpan Progres</p>
                  <p className="text-[11px] text-muted leading-snug">
                    Progres belajarmu tersimpan rapi dan bisa dibuka lagi dari perangkat mana pun.
                  </p>
                </div>
                <div className="border border-rule p-3.5 bg-canvas space-y-1">
                  <span className="font-mono text-[10px] font-bold uppercase text-accent-red block">
                    02 // RITME
                  </span>
                  <p className="font-bold text-ink">Target Harian</p>
                  <p className="text-[11px] text-muted leading-snug">
                    Tentukan target kosakata harian dan dapatkan konsistensi waktu belajar yang terukur.
                  </p>
                </div>
                <div className="border border-rule p-3.5 bg-canvas space-y-1">
                  <span className="font-mono text-[10px] font-bold uppercase text-ink block">
                    03 // EVALUASI
                  </span>
                  <p className="font-bold text-ink">Jurnal & Frasa</p>
                  <p className="text-[11px] text-muted leading-snug">
                    Catat diagnosis kekeliruan nada mandiri dan simpan frasa favorit ke cloud.
                  </p>
                </div>
              </div>
            </div>

            {/* Tombol Aksi Masuk / Daftar */}
            <div className="lg:col-span-4 flex flex-col gap-2.5 justify-center border-t lg:border-t-0 lg:border-l border-rule lg:pl-6 pt-4 lg:pt-0">
              <Link
                href="/register"
                className="w-full text-center bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider py-3.5 font-bold transition-colors block"
              >
                Daftar Akun Baru
              </Link>
              <Link
                href="/login"
                className="w-full text-center border border-rule hover:border-ink text-ink bg-canvas font-mono text-xs uppercase tracking-wider py-3 font-semibold transition-colors block"
              >
                Sudah Ada Akun? Masuk
              </Link>
              <span className="text-[10px] font-mono text-muted text-center block pt-1">
                Pendaftaran gratis tanpa biaya berlangganan.
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 2. Rekomendasi Pelajaran & Ringkasan Capaian */}
      <section className="grid grid-cols-1 lg:grid-cols-12 border border-rule divide-y lg:divide-y-0 lg:divide-x divide-rule bg-paper">
        {/* Kolom Kiri: Rekomendasi Pelajaran */}
        <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                Pelajaran Rekomendasi
              </span>
              <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 bg-accent-blue text-canvas">
                Unit {nextLessonSlug}
              </span>
            </div>

            <div>
              <span className="font-mono text-xs text-accent-red font-bold uppercase block pb-1">
                Unit {nextLessonSlug} · Kurikulum HSK 1
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-ink">
                {currentLesson.title}
              </h2>
            </div>

            {/* Specimen Box */}
            <div className="border border-rule p-4 sm:p-5 bg-canvas space-y-2">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-chinese text-2xl sm:text-3xl font-bold text-ink">
                  {currentLesson.hanzi}
                </span>
                <span className="font-mono text-xs text-muted">
                  {currentLesson.pinyin}
                </span>
              </div>
              <p className="text-xs font-semibold text-ink border-t border-rule pt-2">
                {currentLesson.translation}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              {currentLesson.objective}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            {completedLessonsCount === 0 ? (
              <>
                <Link
                  href="/lessons/fundamentals"
                  className="bg-accent-red text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider px-6 py-3.5 font-bold transition-colors inline-block"
                >
                  Mulai dari Fondasi Dasar →
                </Link>
                <Link
                  href={`/lessons/hsk1/${nextLessonSlug}`}
                  className="bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider px-6 py-3.5 font-semibold transition-colors inline-block"
                >
                  Pelajaran {nextLessonSlug}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={`/lessons/hsk1/${nextLessonSlug}`}
                  className="bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider px-6 py-3.5 font-semibold transition-colors inline-block"
                >
                  Lanjutkan Pelajaran {nextLessonSlug}
                </Link>
                <Link
                  href="/lessons"
                  className="border border-rule hover:border-ink text-ink bg-transparent font-mono text-xs uppercase tracking-wider px-5 py-3.5 font-medium transition-colors inline-block"
                >
                  Lihat Silabus HSK 1
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Ringkasan Capaian */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-canvas space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-rule pb-2">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                Ringkasan Capaian HSK 1
              </span>
              <span className="font-mono text-xs font-bold text-accent-red">
                {progressPercent}% TUNTAS
              </span>
            </div>

            {/* Geometric Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-3 border border-rule bg-paper relative">
                <div
                  className="h-full bg-accent-red transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between font-mono text-[10px] text-muted">
                <span>{completedLessonsCount} dari {totalLessons} unit selesai</span>
                <span>Target: 150 kata</span>
              </div>
            </div>

            {/* Metric Dual Blocks */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 border border-rule bg-paper space-y-1">
                <span className="font-mono text-[10px] text-muted uppercase block">
                  Akurasi Latihan
                </span>
                <span className="font-mono text-xl font-bold text-ink">
                  {recentAccuracy !== null ? `${recentAccuracy}%` : "-"}
                </span>
                <span className="text-[10px] text-muted block">Rata-rata kuis unit</span>
              </div>
              <div className="p-3 border border-rule bg-paper space-y-1">
                <span className="font-mono text-[10px] text-muted uppercase block">
                  Kosakata Inti
                </span>
                <span className="font-mono text-xl font-bold text-ink">
                  {totalVocabInCurriculum}
                </span>
                <span className="text-[10px] text-muted block">Kata terstruktur HSK 1</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-rule flex items-center justify-between text-xs font-mono">
            <Link
              href="/progress"
              className="text-ink font-semibold hover:text-accent-red flex items-center gap-1 uppercase"
            >
              <span>Lihat Progres Belajar Lengkap</span>
              <span>→</span>
            </Link>
            <span className="text-muted">HSK 1 FONDASI</span>
          </div>
        </div>
      </section>

      {/* 3. Diagnosis Kesalahan Terkini */}
      <RecentErrorsDashboard userId={userId} />

      {/* 4. Alur Pembelajaran 3 Tahap */}
      <section className="border border-rule bg-paper p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-rule pb-3">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Cara Belajar
          </span>
          <span className="font-mono text-xs text-status-success font-semibold">
            RUNTUT & PRAKTIS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="space-y-1">
            <span className="font-mono text-[10px] font-bold text-accent-red uppercase block">
              01 // DASAR & CONTOH
            </span>
            <h4 className="text-sm font-bold text-ink uppercase">Pahami Nada & Kalimat</h4>
            <p className="text-xs text-muted leading-relaxed">
              Pahami 4 nada dan pinyin di materi dasar, lalu pelajari percakapan Mandarin di tiap unit.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[10px] font-bold text-accent-blue uppercase block">
              02 // LATIHAN DI AKHIR UNIT
            </span>
            <h4 className="text-sm font-bold text-ink uppercase">Latihan Soal</h4>
            <p className="text-xs text-muted leading-relaxed">
              Selesai baca materi, kamu bisa langsung kerjakan latihan pilihan ganda, susun kalimat, dan audio sebelum lanjut ke unit berikutnya.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[10px] font-bold text-ink uppercase block">
              03 // CATAT KESALAHAN
            </span>
            <h4 className="text-sm font-bold text-ink uppercase">Catat di Jurnal</h4>
            <p className="text-xs text-muted leading-relaxed">
              Simpan kesalahan nada atau urutan kata ke Jurnal Kesalahan biar gampang kamu pelajari lagi.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Pintasan Cepat Menuju Modul Inti */}
      <section className="space-y-3">
        <span className="font-mono text-xs uppercase tracking-widest text-muted block">
          Menu Belajar
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-rule divide-y sm:divide-y-0 sm:divide-x divide-rule bg-paper">
          {/* Shortcut 1: Fondasi Dasar */}
          <Link
            href="/lessons/fundamentals"
            className="p-6 space-y-3 hover:bg-canvas transition-colors group block"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent-red">
                00 // DASAR
              </span>
              <span className="text-xs font-mono text-muted group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
            <h4 className="text-base font-bold text-ink uppercase tracking-tight">
              Fondasi Dasar
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Kuasai 4 nada, inisial konsonan, final vokal, dan aturan 8 goresan Hanzi.
            </p>
          </Link>

          {/* Shortcut 2: Latihan Mendengar */}
          <Link
            href="/listening"
            className="p-6 space-y-3 hover:bg-canvas transition-colors group block"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent-blue">
                01 // MENDENGAR
              </span>
              <span className="text-xs font-mono text-muted group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
            <h4 className="text-base font-bold text-ink uppercase tracking-tight">
              Latihan Mendengar
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Latih kepekaan telinga membedakan pasangan minimal bunyi dan kontur 4 nada.
            </p>
          </Link>

          {/* Shortcut 3: Pelatih Nada */}
          <Link
            href="/tone-coach"
            className="p-6 space-y-3 hover:bg-canvas transition-colors group block"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent-yellow">
                02 // NADA
              </span>
              <span className="text-xs font-mono text-muted group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
            <h4 className="text-base font-bold text-ink uppercase tracking-tight">
              Pelatih Nada
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Simulasi visual kontur nada tinggi-rendah dan aturan perubahan nada 3 serta kata &quot;bù&quot;.
            </p>
          </Link>

          {/* Shortcut 4: Buku Frasa */}
          <Link
            href="/phrasebook"
            className="p-6 space-y-3 hover:bg-canvas transition-colors group block"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-ink">
                03 // SIMPANAN
              </span>
              <span className="text-xs font-mono text-muted group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
            <h4 className="text-base font-bold text-ink uppercase tracking-tight">
              Koleksi Frasa
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Kumpulan kosakata dan contoh kalimat penting yang kamu simpan dari modul pelajaran.
            </p>
          </Link>
        </div>
      </section>

      {/* 6. Komponen Penjelajah Tambahan (Hanzi & Satuan Ukuran) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/hanzi-explorer"
          className="border border-rule bg-paper p-5 sm:p-6 space-y-2 hover:bg-canvas transition-colors block group"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-accent-red font-bold uppercase">
              Laboratorium Aksara
            </span>
            <span className="font-mono text-xs text-muted group-hover:translate-x-1 transition-transform">
              Buka Aksara →
            </span>
          </div>
          <h4 className="text-base font-bold text-ink uppercase">
            Penjelajah Hanzi & Radikal
          </h4>
          <p className="text-xs text-muted leading-relaxed">
            Pahami anatomi karakter Mandarin dari radikal dasar, dekomposisi piktografik, dan urutan goresan.
          </p>
        </Link>

        <Link
          href="/measure-words"
          className="border border-rule bg-paper p-5 sm:p-6 space-y-2 hover:bg-canvas transition-colors block group"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-accent-blue font-bold uppercase">
              Tata Bahasa Kontekstual
            </span>
            <span className="font-mono text-xs text-muted group-hover:translate-x-1 transition-transform">
              Buka Kata Satuan →
            </span>
          </div>
          <h4 className="text-base font-bold text-ink uppercase">
            Panduan Kata Satuan (量词)
          </h4>
          <p className="text-xs text-muted leading-relaxed">
            Kuasai pasangan kata satuan benda (个, 本, 张, 条, 只) agar berbicara Mandarin terdengar alami.
          </p>
        </Link>
      </section>
    </div>
  );
}
