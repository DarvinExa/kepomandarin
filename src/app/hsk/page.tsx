import Link from "next/link";
import { getCurriculumLevels, getLessonsByLevel } from "@/lib/curriculum";

export default async function HskPage() {
  const levels = await getCurriculumLevels();
  const primaryLevel = levels.find((lvl) => lvl.level_number === 1) ?? levels[0];
  const advancedLevels = levels.filter((lvl) => lvl.level_number > 1);
  const lessons = await getLessonsByLevel(primaryLevel?.id);

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-10 sm:space-y-14">
      {/* Header Section */}
      <section className="border-b border-rule pb-6 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-red" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            {`02 // PETA TINGKATAN HSK`}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-ink">
              Kurikulum HSK
            </h1>
            <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
              Kurikulum dirancang bertahap dari HSK 1 hingga HSK 5.
              Semua tingkatan sudah dilengkapi materi terstruktur, pola tata bahasa, dan daftar kosakata.
            </p>
          </div>
          <div className="shrink-0 font-mono text-xs text-muted flex items-center gap-2">
            <span className="w-2 h-2 bg-status-success inline-block" />
            <span className="font-bold text-ink">{`KURIKULUM AKTIF // HSK 1 SAMPAI 5`}</span>
          </div>
        </div>
      </section>

      {/* Prasyarat Fondasi Dasar */}
      <section className="border-2 border-ink bg-paper p-6 sm:p-8 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rule pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-accent-red" aria-hidden="true" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink">
              PRASYARAT WAJIB // TINGKAT 00
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted uppercase bg-canvas border border-rule px-2 py-0.5">
            Pīnyīn · 4 Nada · Kaidah Hanzi
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-ink">
              Modul Fondasi Dasar Mandarin
            </h2>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Pelajari 4 nada dasar, 23 konsonan, 24 vokal, serta aturan goresan Hanzi (*Bǐshùn*) sebelum masuk ke materi HSK 1.
            </p>
          </div>

          <Link
            href="/lessons/fundamentals"
            className="px-6 py-3 bg-accent-red text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider font-bold transition-colors shrink-0 text-center"
          >
            Buka Fondasi Dasar →
          </Link>
        </div>
      </section>

      {/* Primary Focus: HSK 1 Foundational Core Editorial Block */}
      {primaryLevel && (
        <section className="border-2 border-ink bg-paper">
          {/* Top Status Bar */}
          <div className="border-b border-rule px-6 py-3 bg-canvas flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-red">
                Tingkat Utama // Fondasi Terpandu
              </span>
              <span className="text-rule">|</span>
              <span className="font-mono text-xs text-muted">INTI KURIKULUM & LATIHAN INTERAKTIF</span>
            </div>
            <span className="font-mono text-[11px] uppercase font-bold px-2.5 py-1 bg-status-success text-canvas tracking-wider">
              Aktif Penuh
            </span>
          </div>

          {/* Content Layout: 12-column Constructivist split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-rule">
            {/* Left: Detail & Scope (Col 7) */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-xs text-muted uppercase tracking-widest block">
                    {primaryLevel.name}
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-ink">
                    {primaryLevel.code}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-muted leading-relaxed max-w-xl">
                  {primaryLevel.description}
                </p>

                {/* Scope Metrics Row */}
                <div className="grid grid-cols-3 border border-rule divide-x divide-rule bg-canvas pt-1">
                  <div className="p-3 text-center">
                    <span className="font-mono text-[10px] uppercase text-muted block">
                      Target
                    </span>
                    <span className="font-mono text-base sm:text-lg font-bold text-ink">
                      {primaryLevel.vocab_target}
                    </span>
                    <span className="text-[10px] text-muted block">Kosakata</span>
                  </div>
                  <div className="p-3 text-center">
                    <span className="font-mono text-[10px] uppercase text-muted block">
                      Materi
                    </span>
                    <span className="font-mono text-base sm:text-lg font-bold text-ink">
                      {lessons.length}
                    </span>
                    <span className="text-[10px] text-muted block">Pelajaran</span>
                  </div>
                  <div className="p-3 text-center">
                    <span className="font-mono text-[10px] uppercase text-muted block">
                      Metode
                    </span>
                    <span className="font-mono text-base sm:text-lg font-bold text-ink">
                      Konteks
                    </span>
                    <span className="text-[10px] text-muted block">Kuis & Jurnal</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/lessons/hsk1"
                  className="bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider px-6 py-3.5 font-semibold transition-colors inline-block"
                >
                  Mulai Belajar {primaryLevel.code}
                </Link>
                <Link
                  href="/lessons/fundamentals"
                  className="border-2 border-ink text-ink hover:bg-canvas font-mono text-xs uppercase tracking-wider px-6 py-3.5 font-bold transition-colors inline-block"
                >
                  Fondasi Dasar
                </Link>
                <Link
                  href="/phrasebook"
                  className="border border-rule hover:border-ink text-ink bg-transparent font-mono text-xs uppercase tracking-wider px-6 py-3.5 font-medium transition-colors inline-block"
                >
                  Buku Frasa
                </Link>
              </div>
            </div>

            {/* Right: Initial Lessons Outline (Col 5) */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-canvas space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-rule pb-2">
                  <Link
                    href="/lessons/hsk1"
                    className="font-mono text-xs uppercase tracking-widest text-ink hover:text-accent-red font-semibold flex items-center gap-1.5"
                  >
                    <span>{lessons.length} Pelajaran Inti {primaryLevel.code}</span>
                    <span>→</span>
                  </Link>
                  <span className="font-mono text-xs text-status-success font-semibold">
                    TERSEDIA
                  </span>
                </div>

                <div className="border border-rule divide-y divide-rule bg-paper">
                  {lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/lessons/hsk1/${lesson.slug}`}
                      className="p-3 flex items-center justify-between hover:bg-canvas transition-colors block group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-accent-red">
                          {lesson.slug}
                        </span>
                        <span className="text-xs font-semibold text-ink group-hover:text-accent-blue transition-colors">
                          {lesson.title}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-chinese text-sm font-bold text-ink block leading-none">
                          {lesson.hanzi}
                        </span>
                        <span className="font-mono text-[10px] text-muted">
                          {lesson.pinyin}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* De Stijl Accent Strip */}
              <div className="grid grid-cols-3 gap-1 pt-2" aria-hidden="true">
                <div className="h-1.5 bg-accent-red" />
                <div className="h-1.5 bg-accent-blue" />
                <div className="h-1.5 bg-accent-yellow" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Secondary Section: HSK 2 through HSK 5 Active Levels */}
      <section className="space-y-4">
        <div className="border-b border-rule pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted block">
              Tingkat Lanjutan
            </span>
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-ink">
              Kurikulum Lanjutan Aktif (HSK 2 sampai HSK 5)
            </h2>
          </div>
          <span className="font-mono text-xs text-status-success font-bold">
            STATUS: SEMUA TINGKATAN AKTIF & SIAP DIPELAJARI
          </span>
        </div>

        {/* Structured Editorial Table / List */}
        <div className="border border-rule divide-y divide-rule bg-paper">
          {advancedLevels.map((item) => {
            const isHsk2 = item.code === "HSK 2";
            const isHsk3 = item.code === "HSK 3";
            const isHsk4 = item.code === "HSK 4";
            const isHsk5 = item.code === "HSK 5";
            const levelHref = isHsk2
              ? "/lessons/hsk2"
              : isHsk3
              ? "/lessons/hsk3"
              : isHsk4
              ? "/lessons/hsk4"
              : isHsk5
              ? "/lessons/hsk5"
              : "/lessons";

            return (
              <div
                key={item.id}
                className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors bg-paper hover:bg-canvas/60"
              >
                {/* Level Info */}
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm font-black text-ink">
                      {item.code}
                    </span>
                    <span className="text-rule">·</span>
                    <span className="text-sm font-bold text-ink">
                      {item.name}
                    </span>
                    <span className="text-rule">·</span>
                    <span className="font-mono text-xs text-muted">
                      {item.vocab_target.toLocaleString("id-ID")} Kosakata
                    </span>
                    <span className="border border-status-success text-status-success bg-status-success/5 px-2 py-0.5 font-mono text-[10px] uppercase font-bold">
                      Kurikulum Aktif
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>

                  <div className="text-[11px] font-mono text-muted flex items-center gap-2 pt-1">
                    <span className="text-ink font-semibold">Fokus Utama:</span>
                    <span>{item.target_focus}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="shrink-0">
                  <Link
                    href={levelHref}
                    className="inline-block border-2 border-ink bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider px-5 py-2.5 text-center min-w-[150px] font-bold transition-colors"
                  >
                    Pelajari {item.code} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pedagogical Principle Manifesto Note */}
      <section className="border border-rule bg-canvas p-6 sm:p-8 space-y-3">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted block">
          Cara Kami Menyusun Materi
        </span>
        <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-3xl">
          Mandarin Context Lab mengutamakan proses belajar yang tenang dan terarah: materi disusun bertahap mulai dari fondasi nada dan hanzi, contoh nyata dalam kalimat, latihan langsung, hingga pencatatan kesalahan belajar untuk evaluasi mandiri.
        </p>
      </section>
    </div>
  );
}
