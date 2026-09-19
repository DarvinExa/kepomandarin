import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAllModules, getModuleById } from "@/lib/curriculum-modules";

export function generateStaticParams() {
  return [
    { modul: "fundamentals" },
    { modul: "hsk1" },
    { modul: "hsk2" },
    { modul: "hsk3" },
    { modul: "hsk4" },
    { modul: "hsk5" },
    { modul: "01" },
    { modul: "02" },
    { modul: "03" },
    { modul: "04" },
    { modul: "05" },
  ];
}

interface PageProps {
  params: Promise<{ modul: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { modul } = await params;
  if (["01", "02", "03", "04", "05"].includes(modul)) {
    return { title: `Pelajaran ${modul} | Mandarin Context Lab` };
  }
  const currentModule = getModuleById(modul);

  if (!currentModule) {
    return {
      title: "Modul Tidak Ditemukan | Mandarin Context Lab",
    };
  }

  return {
    title: `${currentModule.title} (${currentModule.hanziTitle}) : Silabus Pembelajaran | Mandarin Context Lab`,
    description: currentModule.description,
  };
}

export default async function ModuleLessonsPage({ params }: PageProps) {
  const { modul } = await params;

  // Kompatibilitas mundur: jika rute lama /lessons/01 s.d. 05
  if (["01", "02", "03", "04", "05"].includes(modul)) {
    redirect(`/lessons/hsk1/${modul}`);
  }

  const currentModule = getModuleById(modul);

  if (!currentModule) {
    notFound();
  }

  const allModules = getAllModules();

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8 sm:space-y-12">
      {/* 1. Module Switcher Tabs (Bauhaus Grid Bar) */}
      <nav aria-label="Pemilih Modul Pembelajaran" className="border-b border-rule pb-3">
        <span className="font-mono text-[10px] uppercase text-muted tracking-widest block mb-2 font-bold">
          PILIH TINGKAT KURIKULUM:
        </span>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {allModules.map((m) => {
            const isActive = m.id === currentModule.id;
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

      {/* 2. Editorial Header Section */}
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
                {`${currentModule.badge} · ${currentModule.hanziTitle} (${currentModule.pinyinTitle})`}
              </span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-ink">
                {currentModule.title}
              </h1>
              <p className="text-xs sm:text-sm text-muted max-w-2xl leading-relaxed pt-1">
                {currentModule.description}
              </p>
            </div>
          </div>
        </div>

        <div className="shrink-0 font-mono text-xs text-muted flex items-center gap-3">
          <span className="px-2.5 py-1 border border-rule bg-paper">
            TOTAL: {currentModule.unitsCount} UNIT PELAJARAN
          </span>
          <Link
            href="/hsk"
            className="hidden sm:inline text-xs font-mono uppercase underline underline-offset-4 text-ink hover:text-accent-red"
          >
            Peta Kurikulum →
          </Link>
        </div>
      </section>

      {/* 3. Structured Editorial Lesson List (Sesuai Desain Bauhaus & Screenshot) */}
      <section className="space-y-4">
        <div className="border-b border-rule pb-2 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-muted font-bold">
            DAFTAR UNIT PEMBELAJARAN
          </span>
          <span className="font-mono text-xs text-muted">
            {currentModule.unitsCount} UNIT TERSTRUKTUR
          </span>
        </div>

        <div className="border border-rule divide-y divide-rule bg-paper">
          {currentModule.units.map((unit, index) => {
            const isFirst = index === 0;

            return (
              <div
                key={unit.id}
                className={`p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-colors ${
                  isFirst ? "bg-canvas" : "bg-paper hover:bg-canvas/40"
                }`}
              >
                {/* Left: Identification & Objectives */}
                <div className="space-y-3 max-w-3xl">
                  {/* Top line indicator */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm font-black text-ink">
                      PELAJARAN {unit.slug}
                    </span>
                    <span className="text-rule">·</span>
                    <span className="font-chinese text-base font-bold text-ink">
                      {unit.hanzi}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      ({unit.pinyin})
                    </span>
                    <span
                      className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 ${
                        isFirst
                          ? "bg-accent-blue text-canvas"
                          : "border border-rule text-muted bg-paper"
                      }`}
                    >
                      {isFirst ? "Mulai dari Sini" : "Siap Dipelajari"}
                    </span>
                  </div>

                  {/* Title and Translation */}
                  <div>
                    <Link
                      href={`/lessons/${currentModule.id}/${unit.slug}`}
                      className="text-lg sm:text-xl font-bold uppercase tracking-tight text-ink hover:text-accent-red transition-colors inline-block"
                    >
                      {unit.title}
                    </Link>
                    <p className="text-xs text-muted font-medium pt-0.5">
                      {unit.translation}
                    </p>
                  </div>

                  {/* Objectives Statement */}
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {unit.objectives}
                  </p>

                  {/* Meta Badges */}
                  <div className="flex items-center gap-4 text-xs font-mono text-muted pt-1">
                    <span>{unit.vocabCount} MATERI INTI</span>
                    <span>·</span>
                    <span>± {unit.durationMinutes} MENIT</span>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="shrink-0 flex flex-wrap lg:flex-col items-start lg:items-end gap-3 pt-2 lg:pt-0">
                  <Link
                    href={`/lessons/${currentModule.id}/${unit.slug}`}
                    className={`font-mono text-xs uppercase tracking-wider px-6 py-3.5 font-bold transition-colors text-center w-full sm:w-auto ${
                      isFirst
                        ? "bg-ink text-canvas hover:bg-black"
                        : "border border-rule hover:border-ink text-ink bg-paper hover:bg-canvas"
                    }`}
                  >
                    Buka Pelajaran
                  </Link>
                  <Link
                    href={`/lessons/${currentModule.id}/${unit.slug}/practice`}
                    className="border border-rule hover:border-ink text-ink font-mono text-xs uppercase tracking-wider px-4 py-2 bg-paper transition-colors text-center w-full sm:w-auto"
                  >
                    Latihan Soal →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Laboratory Method Note */}
      <section className="border border-rule bg-canvas p-6 sm:p-8 space-y-3">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted block">
          Alur Belajar Mulus
        </span>
        <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-3xl">
          Pelajari teori unit terlebih dahulu (tata bahasa, kosakata, dan dialog audio).
          Setelah selesai, kamu bisa langsung masuk ke latihan soal interaktif, dan melanjutkan
          secara mulus ke unit berikutnya.
        </p>
      </section>
    </div>
  );
}
