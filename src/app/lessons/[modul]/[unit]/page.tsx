import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  getAllModules,
  getModuleById,
  getModuleUnit,
} from "@/lib/curriculum-modules";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { SavePhraseButton } from "@/components/phrasebook/SavePhraseButton";

export function generateStaticParams() {
  const modules = getAllModules();
  const params: { modul: string; unit: string }[] = [];

  for (const m of modules) {
    for (const u of m.units) {
      params.push({ modul: m.id, unit: u.slug });
    }
  }

  // Kompatibilitas mundur rute lama
  for (let i = 1; i <= 5; i++) {
    const s = String(i).padStart(2, "0");
    params.push({ modul: s, unit: "practice" });
  }

  return params;
}

interface PageProps {
  params: Promise<{ modul: string; unit: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { modul, unit } = await params;
  if (["01", "02", "03", "04", "05"].includes(modul)) {
    return { title: `Latihan Pelajaran ${modul} | Mandarin Context Lab` };
  }
  const unitDetail = getModuleUnit(modul, unit);
  const currentModule = getModuleById(modul);

  if (!unitDetail || !currentModule) {
    return {
      title: "Pelajaran Tidak Ditemukan | Mandarin Context Lab",
    };
  }

  return {
    title: `Pelajaran ${unitDetail.slug}: ${unitDetail.title} (${unitDetail.hanzi}) : ${currentModule.title} | Mandarin Context Lab`,
    description: unitDetail.overview,
  };
}

export default async function ModuleUnitDetailPage({ params }: PageProps) {
  const { modul, unit } = await params;

  // Kompatibilitas mundur: jika rute lama /lessons/01/practice
  if (["01", "02", "03", "04", "05"].includes(modul) && unit === "practice") {
    redirect(`/lessons/hsk1/${modul}/practice`);
  }

  const unitDetail = getModuleUnit(modul, unit);
  const currentModule = getModuleById(modul);

  if (!unitDetail || !currentModule) {
    notFound();
  }

  // Cari index unit untuk tombol navigasi prev/next
  const unitIndex = currentModule.units.findIndex((u) => u.slug === unit);
  const prevUnit = unitIndex > 0 ? currentModule.units[unitIndex - 1] : null;
  const nextUnit =
    unitIndex < currentModule.units.length - 1
      ? currentModule.units[unitIndex + 1]
      : null;

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8 sm:space-y-12">
      {/* 1. Breadcrumb & Navigation Back */}
      <section className="border-b border-rule pb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-muted">
          <Link
            href={`/lessons/${currentModule.id}`}
            className="hover:text-ink underline underline-offset-4"
          >
            ← Kembali ke Silabus {currentModule.title}
          </Link>
          <span className="text-rule">/</span>
          <span className="text-ink font-semibold">Pelajaran {unitDetail.slug}</span>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          {prevUnit && (
            <Link
              href={`/lessons/${currentModule.id}/${prevUnit.slug}`}
              className="border border-rule px-3 py-1 bg-paper hover:border-ink text-ink transition-colors"
            >
              ← Unit {prevUnit.slug}
            </Link>
          )}
          {nextUnit && (
            <Link
              href={`/lessons/${currentModule.id}/${nextUnit.slug}`}
              className="border border-rule px-3 py-1 bg-paper hover:border-ink text-ink transition-colors"
            >
              Unit {nextUnit.slug} →
            </Link>
          )}
        </div>
      </section>

      {/* 2. Hero Lesson Banner (Constructivist Editorial) */}
      <section className="border border-rule bg-paper p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-rule pb-4">
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-accent-red uppercase tracking-wider block">
              {currentModule.title} · Unit Pembelajaran {unitDetail.slug}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-ink">
              {unitDetail.title}
            </h1>
          </div>
          <div className="text-left sm:text-right">
            <span className="font-chinese text-3xl sm:text-4xl font-bold text-ink block leading-none">
              {unitDetail.hanzi}
            </span>
            <span className="font-mono text-sm text-muted">
              {unitDetail.pinyin}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center justify-between">
          <div className="lg:col-span-8 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted font-mono">
              Topik: {unitDetail.translation}
            </p>
            <p className="text-sm text-muted leading-relaxed max-w-2xl">
              {unitDetail.overview}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
            <Link
              href={`/lessons/${currentModule.id}/${unitDetail.slug}/practice`}
              className="bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider px-6 py-3.5 font-semibold transition-colors inline-block text-center w-full sm:w-auto"
            >
              Mulai Latihan Unit {unitDetail.slug} →
            </Link>
            <Link
              href="/phrasebook"
              className="border border-rule hover:border-ink text-ink bg-transparent font-mono text-xs uppercase tracking-wider px-5 py-3.5 font-medium transition-colors inline-block text-center w-full sm:w-auto"
            >
              Buku Frasa
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Grammar & Context Focus Rules */}
      {unitDetail.grammarRules.length > 0 && (
        <section className="space-y-4">
          <div className="border-b border-rule pb-2 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Tata Bahasa & Kaidah Inti
            </span>
            <span className="font-mono text-xs text-muted">STRUKTUR PEMBELAJARAN</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-rule divide-y md:divide-y-0 md:divide-x divide-rule bg-paper">
            {unitDetail.grammarRules.map((grammar, idx) => (
              <div key={idx} className="p-6 sm:p-8 space-y-3">
                <span className="font-mono text-xs font-bold text-accent-blue block">
                  KAIDAH // 0{idx + 1}
                </span>
                <h2 className="text-base font-bold text-ink uppercase tracking-tight">
                  {grammar.ruleTitle}
                </h2>
                {grammar.formula && (
                  <div className="border border-rule bg-canvas p-2.5 font-mono text-xs text-ink">
                    <span className="text-muted font-bold block text-[10px] uppercase">RUMUS:</span>
                    {grammar.formula}
                  </div>
                )}
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {grammar.explanation}
                </p>
                {grammar.example && (
                  <div className="border-t border-rule pt-2 font-mono text-xs text-ink font-semibold">
                    <span className="text-muted font-normal block text-[10px] uppercase">CONTOH:</span>
                    {grammar.example}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Vocabulary Section */}
      {unitDetail.vocabulary.length > 0 && (
        <section className="space-y-4">
          <div className="border-b border-rule pb-2 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Kosakata Inti ({unitDetail.vocabulary.length})
            </span>
            <span className="font-mono text-xs text-muted">KARAKTER & AUDIO</span>
          </div>

          <div className="border border-rule divide-y divide-rule bg-paper">
            {unitDetail.vocabulary.map((vocab, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-canvas/30 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <div className="w-14 h-14 bg-canvas border border-rule flex items-center justify-center shrink-0">
                    <span className="font-chinese text-2xl font-bold text-ink">
                      {vocab.hanzi}
                    </span>
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm font-bold text-ink">
                        {vocab.pinyin}
                      </span>
                      {vocab.tone && (
                        <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 border border-rule bg-canvas text-muted">
                          {vocab.tone}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-ink font-medium">
                      {vocab.translation}
                    </p>
                    {vocab.exampleHanzi && (
                      <p className="text-xs text-muted font-mono pt-0.5">
                        {vocab.exampleHanzi} {vocab.examplePinyin ? `(${vocab.examplePinyin})` : ""}
                        {vocab.exampleTranslation ? ` : ${vocab.exampleTranslation}` : ""}
                      </p>
                    )}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 self-end md:self-center">
                  <AudioPlayer
                    text={vocab.hanzi}
                    pinyin={vocab.pinyin}
                    size="sm"
                  />
                  <SavePhraseButton
                    hanzi={vocab.hanzi}
                    pinyin={vocab.pinyin}
                    translation={vocab.translation}
                    category={unitDetail.title}
                    notes={`Pelajaran ${unitDetail.slug}: ${unitDetail.title}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Dialogue Specimen Section */}
      {unitDetail.dialogue.length > 0 && (
        <section className="space-y-4">
          <div className="border-b border-rule pb-2 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Contoh Percakapan Kontekstual
            </span>
            <span className="font-mono text-xs text-muted">DIALOG</span>
          </div>

          <div className="border border-rule divide-y divide-rule bg-paper">
            {unitDetail.dialogue.map((line, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-canvas/30 transition-colors"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-8 h-8 rounded-none border border-rule bg-canvas flex items-center justify-center font-mono text-xs font-bold text-ink shrink-0">
                    {line.speaker}
                  </div>
                  <div className="space-y-1 min-w-0">
                    {line.role && (
                      <span className="font-mono text-[10px] uppercase text-muted block">
                        {line.role}
                      </span>
                    )}
                    <p className="font-chinese text-lg sm:text-xl font-bold text-ink">
                      {line.hanzi}
                    </p>
                    <p className="font-mono text-xs text-muted">
                      {line.pinyin}
                    </p>
                    <p className="text-xs sm:text-sm text-ink pt-0.5">
                      {line.translation}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 self-end sm:self-center">
                  <AudioPlayer
                    text={line.hanzi}
                    pinyin={line.pinyin}
                    size="sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Action CTA: Lanjut ke Latihan Soal Unit */}
      <section className="border-2 border-ink bg-paper p-6 sm:p-10 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4 max-w-2xl">
            <img
              src="/images/mascot-thinking.png"
              alt="Maskot Siap Latihan"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain shrink-0"
            />
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase font-bold text-accent-red tracking-wider block">
                EVALUASI PEMAHAMAN // UNIT {unitDetail.slug}
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-ink">
                Siap Menguji Pemahaman Unit Ini?
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Uji pemahaman kosakata dan struktur kalimat melalui latihan pilihan ganda,
                susun kalimat, dan menyimak audio. Setelah selesai, kamu bisa lanjut langsung ke unit berikutnya.
              </p>
            </div>
          </div>

          <Link
            href={`/lessons/${currentModule.id}/${unitDetail.slug}/practice`}
            className="px-8 py-4 bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-widest font-black transition-colors shrink-0 text-center"
          >
            Mulai Latihan Unit {unitDetail.slug} →
          </Link>
        </div>
      </section>
    </div>
  );
}
