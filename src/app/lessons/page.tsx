import Link from "next/link";
import { getAllModules, getModuleById } from "@/lib/curriculum-modules";

export default async function LessonsPage() {
  const allModules = getAllModules();
  const hsk1Module = getModuleById("hsk1");
  const lessons = hsk1Module?.units ?? [];
  const completedCount = 1;
  const totalCount = lessons.length;

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8 sm:space-y-12">
      {/* Module Switcher Tabs (Bauhaus Grid Bar) */}
      <nav aria-label="Pemilih Modul Pembelajaran" className="border-b border-rule pb-3">
        <span className="font-mono text-[10px] uppercase text-muted tracking-widest block mb-2 font-bold">
          PILIH TINGKAT KURIKULUM:
        </span>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {allModules.map((m) => {
            const isActive = m.id === "hsk1";
            return (
              <Link
                key={m.id}
                href={`/lessons/${m.id}`}
                className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors border ${
                  isActive
                    ? "bg-ink text-canvas border-ink font-bold shadow-none"
                    : "bg-paper text-ink border-rule hover:border-ink hover:bg-canvas"
                }`}
              >
                <span>{m.title}</span>
                {m.status === "roadmap" && (
                  <span className="ml-1.5 text-[9px] text-muted opacity-80">(Draf)</span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* 1. Header Section */}
      <section className="border-b border-rule pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0">
          <img
            src="/images/mascot-studying.png"
            alt="Maskot KepoMandarin Belajar"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0"
          />
          <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-accent-red" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                02 // SILABUS HSK 1
              </span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-ink">
                Daftar Pelajaran HSK 1
              </h1>
              <p className="text-xs sm:text-sm text-muted max-w-2xl leading-relaxed pt-1">
                Dua belas unit pembelajaran kontekstual komprehensif yang menghubungkan sapaan, identitas, angka, waktu, keluarga, rutinitas, kuliner, lokasi, belanja, cuaca, kemampuan, dan evaluasi integratif tingkat HSK 1.
              </p>
            </div>
          </div>
        </div>

        <div className="shrink-0 font-mono text-xs text-muted flex items-center gap-3">
          <span className="px-2.5 py-1 border border-rule bg-paper">
            PROGRES: {completedCount} DARI {totalCount} SELESAI
          </span>
          <Link
            href="/hsk"
            className="hidden sm:inline text-xs font-mono uppercase underline underline-offset-4 text-ink hover:text-accent-red"
          >
            Kurikulum HSK →
          </Link>
        </div>
      </section>

      {/* 2. Prasyarat Fondasi Dasar */}
      <section className="border-2 border-ink bg-paper p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rule pb-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase font-bold text-accent-red tracking-wider">
              MODUL DASAR // SEBELUM HSK 1
            </span>
            <span className="text-rule">|</span>
            <span className="font-mono text-xs text-muted">DASAR MANDARIN</span>
          </div>
          <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 bg-status-success text-canvas">
            Mulai dari Sini
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-ink">
              Materi Dasar: Pinyin, 4 Nada & Aturan Menulis Hanzi
            </h2>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Pelajari 4 nada, bunyi vokal dan konsonan, aturan ejaan pinyin, serta aturan goresan Hanzi (Bǐshùn) melalui 10 unit terstruktur (F-01 s.d. F-10) sebelum masuk ke kosakata HSK 1.
            </p>
          </div>

          <Link
            href="/lessons/fundamentals"
            className="px-6 py-3.5 bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider font-bold transition-colors shrink-0 text-center"
          >
            Buka Fondasi Dasar (10 Unit) →
          </Link>
        </div>
      </section>

      {/* 3. Structured Editorial Lesson List */}
      <section className="space-y-4">
        <div className="border-b border-rule pb-2 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-muted font-bold">
            UNIT PELAJARAN INTI HSK 1
          </span>
          <span className="font-mono text-xs text-muted">{totalCount} PELAJARAN KONTEKSTUAL</span>
        </div>
        <div className="border border-rule divide-y divide-rule bg-paper">
          {lessons.map((lesson, index) => {
            const isFinished = index === 0;
            const isActive = index === 1;
            const statusLabel = isFinished
              ? "Selesai"
              : isActive
              ? "Direkomendasikan"
              : "Siap Dipelajari";

            return (
              <div
                key={lesson.id}
                className={`p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-colors ${
                  isActive ? "bg-canvas" : "bg-paper hover:bg-canvas/40"
                }`}
              >
                {/* Left: Identification & Objectives */}
                <div className="space-y-3 max-w-3xl">
                  {/* Top line indicator */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm font-black text-ink">
                      PELAJARAN {lesson.slug}
                    </span>
                    <span className="text-rule">·</span>
                    <span className="font-chinese text-base font-bold text-ink">
                      {lesson.hanzi}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      ({lesson.pinyin})
                    </span>
                    <span
                      className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 ${
                        isFinished
                          ? "bg-status-success text-canvas"
                          : isActive
                          ? "bg-accent-blue text-canvas"
                          : "border border-rule text-muted bg-paper"
                      }`}
                    >
                      {statusLabel}
                    </span>
                    {isFinished && (
                      <span className="font-mono text-[11px] text-muted">
                        Akurasi: 85%
                      </span>
                    )}
                  </div>

                  {/* Title and Translation */}
                  <div>
                    <Link
                      href={`/lessons/hsk1/${lesson.slug}`}
                      className="text-lg sm:text-xl font-bold uppercase tracking-tight text-ink hover:text-accent-red transition-colors inline-block"
                    >
                      {lesson.title}
                    </Link>
                    <p className="text-xs text-muted font-medium pt-0.5">
                      {lesson.translation}
                    </p>
                  </div>

                  {/* Objectives Statement */}
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {lesson.objectives}
                  </p>

                  {/* Lesson Meta Badges */}
                  <div className="flex items-center gap-4 text-xs font-mono text-muted pt-1">
                    <span>{lesson.vocabCount} KOSAKATA</span>
                    <span>·</span>
                    <span>± {lesson.durationMinutes} MENIT</span>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="shrink-0 flex flex-wrap lg:flex-col items-start lg:items-end gap-3 pt-2 lg:pt-0">
                  {isFinished ? (
                    <>
                      <Link
                        href={`/lessons/hsk1/${lesson.slug}`}
                        className="bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider px-5 py-3 font-semibold transition-colors text-center w-full sm:w-auto"
                      >
                        Tinjau Kembali
                      </Link>
                      <Link
                        href={`/lessons/hsk1/${lesson.slug}/practice`}
                        className="border border-rule hover:border-ink text-ink font-mono text-xs uppercase tracking-wider px-4 py-2 bg-paper transition-colors text-center w-full sm:w-auto"
                      >
                        Latihan Soal
                      </Link>
                    </>
                  ) : isActive ? (
                    <>
                      <Link
                        href={`/lessons/hsk1/${lesson.slug}`}
                        className="bg-accent-blue text-canvas hover:bg-ink font-mono text-xs uppercase tracking-wider px-6 py-3.5 font-bold transition-colors text-center w-full sm:w-auto shadow-none"
                      >
                        Mulai Pelajaran
                      </Link>
                      <span className="font-mono text-[10px] text-accent-red font-semibold">
                        ● SESI AKTIF BERIKUTNYA
                      </span>
                    </>
                  ) : (
                    <Link
                      href={`/lessons/hsk1/${lesson.slug}`}
                      className="border border-rule hover:border-ink text-ink font-mono text-xs uppercase tracking-wider px-5 py-3 bg-paper hover:bg-canvas transition-colors text-center w-full sm:w-auto"
                    >
                      Buka Pelajaran
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Laboratory Method Note */}
      <section className="border border-rule bg-canvas p-6 sm:p-8 space-y-3">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted block">
          Metode Belajar Terarah
        </span>
        <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-3xl">
          Setiap unit menyatukan teori pola kalimat, pelafalan audio kosakata, dan latihan soal
          pilihan ganda serta susun kalimat. Selesai latihan, kamu bisa langsung lanjut ke materi berikutnya.
        </p>
      </section>
    </div>
  );
}
