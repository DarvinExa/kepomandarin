import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { RecentErrorsDashboard } from "@/components/dashboard/RecentErrorsDashboard";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let learnerName = "Pembelajar";
  let completedLessonsCount = 0;
  let recentAccuracy: number | null = null;
  let nextLessonSlug = "01";

  if (user) {
    learnerName =
      (user.user_metadata?.full_name as string) ||
      user.email?.split("@")[0] ||
      "Pembelajar";

    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

      if (profile?.full_name) {
        learnerName = profile.full_name;
      }
    } catch {
      // Abaikan bila tabel profil belum siap
    }

    try {
      const { data: progressRows } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id);

      if (progressRows && progressRows.length > 0) {
        const completedSlugs = new Set(
          progressRows.filter((r) => r.is_completed).map((r) => r.lesson_slug)
        );
        completedLessonsCount = completedSlugs.size;

        // Cari unit pertama yang belum selesai (01 s.d. 05)
        for (let i = 1; i <= 5; i++) {
          const s = String(i).padStart(2, "0");
          if (!completedSlugs.has(s)) {
            nextLessonSlug = s;
            break;
          }
        }

        const scored = progressRows.filter((r) => r.practice_accuracy > 0);
        if (scored.length > 0) {
          recentAccuracy = Math.round(
            scored.reduce((acc, cur) => acc + Number(cur.practice_accuracy), 0) /
              scored.length
          );
        }
      }
    } catch {
      // Abaikan bila belum ada data
    }
  }

  const isGuest = !user;
  const totalLessons = 5;
  const totalVocabInCurriculum = 85;
  const progressPercent = Math.round((completedLessonsCount / totalLessons) * 100);

  const LESSON_INFO: Record<
    string,
    { title: string; hanzi: string; pinyin: string; translation: string; objective: string }
  > = {
    "01": {
      title: "Sapaan Sopan",
      hanzi: "问候",
      pinyin: "Wènhòu",
      translation: "Sapaan Sehari-hari & Penutupan Percakapan",
      objective:
        "Meletakkan fondasi etika komunikasi berbahasa Mandarin, aturan sandhi nada ke-3, serta ucapan perpisahan santun.",
    },
    "02": {
      title: "Identitas Diri",
      hanzi: "自我介绍",
      pinyin: "Zìwǒ Jièshào",
      translation: "Perkenalan Nama & Asal Kewarganegaraan",
      objective:
        "Mempelajari kata ganti orang, kata kerja kopula 是 (adalah), dan cara menanyakan nama orang lain secara natural.",
    },
    "03": {
      title: "Angka & Waktu",
      hanzi: "数字与时间",
      pinyin: "Shùzì yǔ Shíjiān",
      translation: "Penghitungan Dasar, Jam, Hari & Tanggal",
      objective:
        "Menyatakan hitungan angka, jam, menit, serta urutan waktu dalam kalender Mandarin dari unit besar ke kecil.",
    },
    "04": {
      title: "Keluarga & Relasi",
      hanzi: "家庭与关系",
      pinyin: "Jiātíng yǔ Guānxì",
      translation: "Anggota Keluarga & Hubungan Sosial",
      objective:
        "Penyebutan anggota keluarga, kepemilikan partikel 的, dan penggunaan kata bantu bilangan dasar.",
    },
    "05": {
      title: "Aktivitas Harian",
      hanzi: "日常活动",
      pinyin: "Rìcháng Huódòng",
      translation: "Kegiatan Rutin, Lokasi & Kebiasaan",
      objective:
        "Menggabungkan seluruh fondasi: struktur keterangan tempat sebelum kata kerja dan pertanyaan partikel 吗.",
    },
  };

  const currentLesson = LESSON_INFO[nextLessonSlug] ?? LESSON_INFO["01"];

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8 sm:space-y-12">
      {/* 1. Header / Greeting */}
      <section className="border-b border-rule pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
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
                ? "Belajar bahasa Mandarin lewat contoh kalimat nyata. Kamu bisa langsung coba tanpa daftar, atau buat akun buat simpan progres belajarmu."
                : "Lanjut belajar HSK 1 dan coba latihan soal hari ini."}
            </p>
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

      {/* 3. Diagnosis Kesalahan Terkini (Task 6.6) */}
      <RecentErrorsDashboard userId={user?.id} />

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
              Latihan dengar audio buat membedakan bunyi mirip dan intonasi nada.
            </p>
          </Link>

          {/* Shortcut 3: Frasa Tersimpan */}
          <Link
            href="/phrasebook"
            className="p-6 space-y-3 hover:bg-canvas transition-colors group block"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent-yellow text-ink">
                03 // FRASA
              </span>
              <span className="text-xs font-mono text-muted group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
            <h4 className="text-base font-bold text-ink uppercase tracking-tight">
              Buku Frasa
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Simpan kata dan kalimat penting yang sering kamu pakai sehari-hari.
            </p>
          </Link>

          {/* Shortcut 4: Jurnal Kesalahan */}
          <Link
            href="/error-journal"
            className="p-6 space-y-3 hover:bg-canvas transition-colors group block"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-ink">
                04 // JURNAL
              </span>
              <span className="text-xs font-mono text-muted group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
            <h4 className="text-base font-bold text-ink uppercase tracking-tight">
              Jurnal Kesalahan
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Cek lagi kesalahan nada, pinyin, atau kalimat biar nggak keulang.
            </p>
          </Link>
        </div>
      </section>

      {/* 6. Footer Catatan Prinsip Belajar */}
      <footer className="border-t border-rule pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-muted">
        <div>
          <span>MANDARIN CONTEXT LAB</span>
          <span className="mx-2">·</span>
          <span>DASBOR EDITORIAL HSK 1</span>
        </div>
        <div>
          <span>FOKUS SATU KONTEKS SECARA TUNTAS</span>
        </div>
      </footer>
    </div>
  );
}
