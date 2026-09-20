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
  for (let i = 1; i <= 12; i++) {
    const s = String(i).padStart(2, "0");
    params.push({ modul: s, unit: "practice" });
  }

  return params;
}

const HSK1_SLUGS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));

interface PageProps {
  params: Promise<{ modul: string; unit: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { modul, unit } = await params;
  if (HSK1_SLUGS.includes(modul)) {
    return { title: `Latihan Pelajaran ${modul} | KepoMandarin` };
  }
  const unitDetail = getModuleUnit(modul, unit);
  const currentModule = getModuleById(modul);

  if (!unitDetail || !currentModule) {
    return {
      title: "Pelajaran Tidak Ditemukan | KepoMandarin",
    };
  }

  return {
    title: `Pelajaran ${unitDetail.slug}: ${unitDetail.title} (${unitDetail.hanzi}) : ${currentModule.title} | KepoMandarin`,
    description: unitDetail.overview,
  };
}

export default async function ModuleUnitDetailPage({ params }: PageProps) {
  const { modul, unit } = await params;

  // Kompatibilitas mundur: jika rute lama /lessons/01/practice s.d. 12/practice
  if (HSK1_SLUGS.includes(modul) && unit === "practice") {
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

      {/* 3. Focus Pelafalan & Nada (Bila Ada) */}
      {unitDetail.pronunciationFocus && (
        <section className="space-y-4">
          <div className="border-b border-rule pb-2 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Fokus Pelafalan & Nada
            </span>
            <span className="font-mono text-xs text-muted">FONETIK</span>
          </div>

          <div className="border border-rule bg-paper p-6 sm:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {unitDetail.pronunciationFocus.sounds && (
                <div className="border border-rule bg-canvas p-3 space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-accent-blue block">
                    BUNYI TARGET
                  </span>
                  <p className="font-mono text-xs font-semibold text-ink">
                    {unitDetail.pronunciationFocus.sounds}
                  </p>
                </div>
              )}
              {unitDetail.pronunciationFocus.tones && (
                <div className="border border-rule bg-canvas p-3 space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-accent-red block">
                    KONTUR NADA
                  </span>
                  <p className="font-mono text-xs font-semibold text-ink">
                    {unitDetail.pronunciationFocus.tones}
                  </p>
                </div>
              )}
              {unitDetail.pronunciationFocus.toneCombinations && (
                <div className="border border-rule bg-canvas p-3 space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-status-success block">
                    KOMBINASI NADA
                  </span>
                  <p className="font-mono text-xs font-semibold text-ink">
                    {unitDetail.pronunciationFocus.toneCombinations}
                  </p>
                </div>
              )}
            </div>

            {unitDetail.pronunciationFocus.articulatoryTip && (
              <div className="border-t border-rule pt-3 text-xs sm:text-sm text-ink leading-relaxed">
                <span className="font-mono text-[10px] uppercase font-bold text-muted block mb-1">
                  PETUNJUK ARTIKULASI:
                </span>
                {unitDetail.pronunciationFocus.articulatoryTip}
              </div>
            )}

            {unitDetail.pronunciationFocus.commonErrors && (
              <div className="border-l-2 border-accent-red bg-canvas p-3 text-xs text-muted">
                <span className="font-mono text-[10px] uppercase font-bold text-accent-red block mb-0.5">
                  KESALAHAN UMUM PEMBELAJAR:
                </span>
                {unitDetail.pronunciationFocus.commonErrors}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. Grammar & Context Focus Rules */}
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
                {grammar.communicativeFunction && (
                  <p className="font-mono text-xs text-muted">
                    Fungsi: {grammar.communicativeFunction}
                  </p>
                )}
                {grammar.formula && (
                  <div className="border border-rule bg-canvas p-2.5 font-mono text-xs text-ink">
                    <span className="text-muted font-bold block text-[10px] uppercase">RUMUS:</span>
                    {grammar.formula}
                  </div>
                )}
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {grammar.explanation}
                </p>
                {grammar.positiveExamples && grammar.positiveExamples.length > 0 ? (
                  <div className="border-t border-rule pt-2 space-y-1.5">
                    <span className="text-muted font-normal block text-[10px] uppercase font-mono">CONTOH BENAR:</span>
                    {grammar.positiveExamples.map((ex, exIdx) => (
                      <div key={exIdx} className="font-mono text-xs text-ink">
                        <span className="font-chinese font-bold text-sm block">{ex.hanzi}</span>
                        <span className="text-muted block text-[11px]">{ex.pinyin}</span>
                        <span className="text-[11px] text-ink">{ex.translation}</span>
                      </div>
                    ))}
                  </div>
                ) : grammar.example ? (
                  <div className="border-t border-rule pt-2 font-mono text-xs text-ink font-semibold">
                    <span className="text-muted font-normal block text-[10px] uppercase">CONTOH:</span>
                    {grammar.example}
                  </div>
                ) : null}

                {grammar.usageConstraints && (
                  <div className="border-t border-rule pt-2 text-xs text-muted">
                    <span className="font-mono text-[10px] uppercase font-bold text-accent-red block">
                      BATAS PENGGUNAAN:
                    </span>
                    <p>{grammar.usageConstraints}</p>
                  </div>
                )}

                {grammar.commonErrors && (
                  <div className="border-t border-rule pt-2 text-xs text-muted">
                    <span className="font-mono text-[10px] uppercase font-bold text-accent-red block">
                      KESALAHAN UMUM:
                    </span>
                    <p>{grammar.commonErrors}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Struktur Karakter Hanzi & Komponen (Bila Ada) */}
      {unitDetail.hanziComponents && unitDetail.hanziComponents.length > 0 && (
        <section className="space-y-4">
          <div className="border-b border-rule pb-2 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Struktur Karakter Hanzi & Komponen ({unitDetail.hanziComponents.length})
            </span>
            <span className="font-mono text-xs text-muted">AKSARALOGI</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-rule divide-y sm:divide-y-0 sm:divide-x divide-rule bg-paper">
            {unitDetail.hanziComponents.map((hc, idx) => (
              <div key={idx} className="p-4 sm:p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-chinese text-3xl font-bold text-ink">{hc.hanzi}</span>
                  <span className="font-mono text-[10px] uppercase px-2 py-0.5 border border-rule bg-canvas text-muted">
                    {hc.strokeCount} Goresan
                  </span>
                </div>
                <div className="border-t border-rule pt-2 font-mono text-xs space-y-1">
                  <div>
                    <span className="text-muted block text-[10px] uppercase">STRUKTUR:</span>
                    <span className="font-bold text-ink">{hc.structure}</span>
                  </div>
                  <div>
                    <span className="text-muted block text-[10px] uppercase">KOMPONEN / RADIKAL:</span>
                    <span className="text-ink">{hc.components}</span>
                  </div>
                  {hc.notes && (
                    <p className="text-[11px] text-muted pt-1 leading-relaxed">
                      {hc.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Vocabulary Section */}
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
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-start justify-between gap-4 hover:bg-canvas/30 transition-colors"
              >
                <div className="space-y-2 min-w-0 flex-1">
                  {/* Baris 1: Hanzi & Pinyin Terintegrasi (Tanpa Kotak Kaku) */}
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                    <span className="font-chinese text-2xl sm:text-3xl font-bold text-ink tracking-wide">
                      {vocab.hanzi}
                    </span>
                    <span className="text-rule font-mono hidden sm:inline select-none" aria-hidden="true">
                      |
                    </span>
                    <span className="font-mono text-sm sm:text-base font-bold text-accent-blue">
                      {vocab.pinyin}
                    </span>
                    {vocab.partOfSpeech && (
                      <span className="font-mono text-[10px] uppercase px-2 py-0.5 border border-rule bg-canvas text-muted font-semibold tracking-wider">
                        {vocab.partOfSpeech}
                      </span>
                    )}
                    {vocab.tone && (
                      <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 border border-rule bg-canvas text-muted tracking-wider">
                        {vocab.tone}
                      </span>
                    )}
                  </div>

                  {/* Baris 2: Arti Terjemahan Bahasa Indonesia */}
                  <p className="text-sm sm:text-base text-ink font-medium leading-snug">
                    {vocab.translation}
                  </p>

                  {/* Baris 3: Catatan Penggunaan (jika ada) */}
                  {vocab.usageNotes && (
                    <p className="text-xs text-muted leading-relaxed">
                      <span className="font-mono font-bold uppercase text-[10px] tracking-wider text-muted mr-1.5">
                        Catatan:
                      </span>
                      {vocab.usageNotes}
                    </p>
                  )}

                  {/* Baris 4: Contoh Kalimat Terstruktur (Tri-Format: Hanzi, Pinyin, Terjemahan) */}
                  {vocab.exampleHanzi && (
                    <div className="mt-3 pt-2.5 border-t border-rule/60 pl-3 border-l-2 border-ink bg-canvas/30 p-3 space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted font-bold block mb-0.5">
                        Contoh Kalimat:
                      </span>
                      <p className="font-chinese text-base sm:text-lg font-bold text-ink leading-snug">
                        {vocab.exampleHanzi}
                      </p>
                      {vocab.examplePinyin && (
                        <p className="font-mono text-xs text-accent-blue font-semibold">
                          {vocab.examplePinyin}
                        </p>
                      )}
                      {vocab.exampleTranslation && (
                        <p className="text-xs sm:text-sm text-ink/80 leading-relaxed">
                          {vocab.exampleTranslation}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Tombol Aksi: Audio & Simpan Frasa */}
                <div className="shrink-0 flex items-center gap-2 self-end md:self-start md:pt-1">
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

      {/* 7. Kosakata Pengayaan (Bila Ada) */}
      {unitDetail.enrichmentVocabulary && unitDetail.enrichmentVocabulary.length > 0 && (
        <section className="space-y-4">
          <div className="border-b border-rule pb-2 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Kosakata Pengayaan ({unitDetail.enrichmentVocabulary.length})
            </span>
            <span className="font-mono text-xs text-muted">PENGEMBANGAN</span>
          </div>

          <div className="border border-rule divide-y divide-rule bg-paper">
            {unitDetail.enrichmentVocabulary.map((vocab, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 flex flex-col md:flex-row md:items-start justify-between gap-3 hover:bg-canvas/20 transition-colors"
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className="font-chinese text-xl sm:text-2xl font-bold text-ink">
                      {vocab.hanzi}
                    </span>
                    <span className="text-rule font-mono hidden sm:inline select-none" aria-hidden="true">
                      |
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-semibold text-accent-blue">
                      {vocab.pinyin}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-ink font-medium">
                    {vocab.translation}
                  </p>
                  {vocab.inclusionReason && (
                    <p className="text-[11px] text-muted font-mono">
                      <span className="uppercase text-[9px] font-bold text-muted mr-1">Alasan:</span>
                      {vocab.inclusionReason}
                    </p>
                  )}
                </div>
                <div className="shrink-0 self-end md:self-start md:pt-1">
                  <AudioPlayer text={vocab.hanzi} pinyin={vocab.pinyin} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Dialogue Specimen Section */}
      {unitDetail.dialogue.length > 0 && (
        <section className="space-y-4">
          <div className="border-b border-rule pb-2 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Contoh Percakapan Kontekstual
            </span>
            <span className="font-mono text-xs text-muted">DIALOG</span>
          </div>

          {unitDetail.dialogueContext && (
            <div className="border border-rule bg-canvas p-4 font-mono text-xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-accent-red block">
                KONTEKS SITUASI:
              </span>
              <p className="text-ink">
                <strong>Partisipan:</strong> {unitDetail.dialogueContext.participants} ·{" "}
                <strong>Lokasi:</strong> {unitDetail.dialogueContext.location} ·{" "}
                <strong>Tujuan:</strong> {unitDetail.dialogueContext.goal}
              </p>
              {unitDetail.dialogueContext.scenarioNotes && (
                <p className="text-muted text-[11px] pt-0.5">
                  {unitDetail.dialogueContext.scenarioNotes}
                </p>
              )}
            </div>
          )}

          <div className="border border-rule divide-y divide-rule bg-paper">
            {unitDetail.dialogue.map((line, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-canvas/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 min-w-0 flex-1">
                  <div className="shrink-0 flex sm:flex-col items-start gap-1 sm:w-28">
                    <span className="px-2.5 py-1 border border-ink bg-canvas font-mono text-xs font-bold text-ink uppercase tracking-wider text-center block">
                      {line.speaker}
                    </span>
                    {line.role && (
                      <span className="font-mono text-[10px] uppercase text-muted tracking-wider block">
                        {line.role}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
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

      {/* 9. Catatan Budaya / Pragmatik (Bila Ada) */}
      {unitDetail.culturalNotes && (
        <section className="border border-rule bg-canvas p-6 space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-blue block">
            Catatan Budaya & Pragmatik
          </span>
          <p className="text-xs sm:text-sm text-ink leading-relaxed">
            {unitDetail.culturalNotes}
          </p>
        </section>
      )}

      {/* 10. Checkpoint & Kriteria Ketuntasan (Bila Ada) */}
      {unitDetail.checkpoint && (
        <section className="border border-rule bg-paper p-6 space-y-2">
          <div className="flex items-center justify-between border-b border-rule pb-2">
            <span className="font-mono text-xs uppercase font-bold text-accent-red tracking-wider">
              Kriteria Ketuntasan Unit
            </span>
            <span className="font-mono text-xs font-black text-ink">
              Target Akurasi: {unitDetail.checkpoint.masteryThresholdPercent}%
            </span>
          </div>
          <p className="text-xs sm:text-sm text-ink pt-1">
            <strong>Syarat Selesai:</strong> {unitDetail.checkpoint.completionCriteria}
          </p>
          <p className="text-xs text-muted">
            <strong>Rekomendasi Remedial:</strong> {unitDetail.checkpoint.remedialRecommendation}
          </p>
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
