"use client";

import { useState } from "react";
import Link from "next/link";
import { PitchContourVisualizer } from "./PitchContourVisualizer";
import { ToneSandhiMatrix } from "./ToneSandhiMatrix";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { addErrorEntry } from "@/lib/journal";
import { TONE_DRILL_QUESTIONS, type ToneDrillQuestion } from "@/lib/tones";

interface ToneCoachClientProps {
  userId?: string | null;
}

export function ToneCoachClient({ userId }: ToneCoachClientProps) {
  const [activeMainTab, setActiveMainTab] = useState<"contours" | "sandhi" | "practice">("contours");

  // State untuk Mode Latihan (Tab 3)
  const [drillIndex, setDrillIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [recordedToJournal, setRecordedToJournal] = useState(false);
  const [journalFeedback, setJournalFeedback] = useState<string | null>(null);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const currentQuestion: ToneDrillQuestion = TONE_DRILL_QUESTIONS[drillIndex];

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    if (hasAnswered) return;
    setSelectedOptionId(optionId);
    setHasAnswered(true);
    setStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNextQuestion = () => {
    if (drillIndex < TONE_DRILL_QUESTIONS.length - 1) {
      setDrillIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
      setRecordedToJournal(false);
      setJournalFeedback(null);
    }
  };

  const handlePrevQuestion = () => {
    if (drillIndex > 0) {
      setDrillIndex((prev) => prev - 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
      setRecordedToJournal(false);
      setJournalFeedback(null);
    }
  };

  const handleSaveToErrorJournal = async () => {
    if (!currentQuestion || recordedToJournal) return;

    const chosenOption = currentQuestion.options.find((o) => o.id === selectedOptionId);

    try {
      await addErrorEntry(
        {
          hanzi: currentQuestion.focusWord.hanzi,
          pinyin: currentQuestion.focusWord.pinyin,
          translation: currentQuestion.focusWord.translation,
          category: "Nada",
          error_context: `Kesalahan analisis nada: ${currentQuestion.title}. Jawaban yang dipilih: ${chosenOption?.label ?? "Kurang tepat"}.`,
          notes: `${currentQuestion.explanation.ruleTitle}: ${currentQuestion.explanation.detail}. Panduan: ${currentQuestion.explanation.indonesianTip}`,
        },
        userId
      );
      setRecordedToJournal(true);
      setJournalFeedback("Berhasil dicatat ke Jurnal Kesalahan dengan kategori Nada.");
    } catch {
      setJournalFeedback("Gagal mencatat ke jurnal. Coba lagi.");
    }
  };

  const selectedOpt = currentQuestion?.options.find((o) => o.id === selectedOptionId);
  const isSelectedCorrect = selectedOpt?.isCorrect ?? false;
  const isLastQuestion = drillIndex === TONE_DRILL_QUESTIONS.length - 1;

  return (
    <div className="space-y-8">
      {/* 1. Sub-Navigasi Bilateral Silang: Mendengar <-> Pelatih Nada */}
      <div className="border border-rule bg-canvas p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-accent-red" aria-hidden="true" />
          <span className="text-muted uppercase">MODUL PENDUKUNG HSK 1:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/listening"
            className="px-3 py-1 border border-rule bg-paper text-muted hover:text-ink hover:border-ink transition-colors"
          >
            01 // Mendengar
          </Link>
          <span className="px-3 py-1 bg-ink text-canvas border border-ink font-bold">
            02 // Pelatih Nada
          </span>
          <Link
            href="/hanzi-explorer"
            className="px-3 py-1 border border-rule bg-paper text-muted hover:text-ink hover:border-ink transition-colors"
          >
            03 // Karakter Hanzi
          </Link>
          <Link
            href="/measure-words"
            className="px-3 py-1 border border-rule bg-paper text-muted hover:text-ink hover:border-ink transition-colors"
          >
            04 // Kata Penggolong
          </Link>
          <Link
            href="/scenarios"
            className="px-3 py-1 border border-rule bg-paper text-muted hover:text-ink hover:border-ink transition-colors"
          >
            05 // Skenario Percakapan
          </Link>
        </div>
      </div>

      {/* 2. Pemilih Tab Utama Bauhaus */}
      <div className="flex flex-wrap gap-2 border-b border-rule pb-4">
        <button
          type="button"
          onClick={() => setActiveMainTab("contours")}
          className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-colors cursor-pointer ${
            activeMainTab === "contours"
              ? "bg-ink text-canvas border-ink font-bold"
              : "bg-paper text-ink border-rule hover:border-ink"
          }`}
        >
          01 // Kontur 5-Skala Chao
        </button>
        <button
          type="button"
          onClick={() => setActiveMainTab("sandhi")}
          className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-colors cursor-pointer ${
            activeMainTab === "sandhi"
              ? "bg-accent-blue text-canvas border-accent-blue font-bold"
              : "bg-paper text-ink border-rule hover:border-ink"
          }`}
        >
          02 // Kaidah Sandhi Nada
        </button>
        <button
          type="button"
          onClick={() => setActiveMainTab("practice")}
          className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-colors cursor-pointer ${
            activeMainTab === "practice"
              ? "bg-accent-red text-canvas border-accent-red font-bold"
              : "bg-paper text-ink border-rule hover:border-ink"
          }`}
        >
          03 // Uji Identifikasi Nada
        </button>
      </div>

      {/* 3. Konten Berdasarkan Tab Aktif */}
      {activeMainTab === "contours" && <PitchContourVisualizer />}

      {activeMainTab === "sandhi" && <ToneSandhiMatrix />}

      {activeMainTab === "practice" && (
        <div className="border border-rule bg-paper space-y-0">
          {/* Header Drill Latihan Nada */}
          <div className="border-b border-rule bg-canvas p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-red" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                  UJI ANALISIS AKUSTIK & SANDHI
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-ink uppercase tracking-tight">
                {currentQuestion.title}
              </h2>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-muted">
              <span>
                SOAL {drillIndex + 1} / {TONE_DRILL_QUESTIONS.length}
              </span>
              <span className="w-1 h-3 bg-rule" aria-hidden="true" />
              <span>
                SKOR: {stats.correct}/{stats.total}
              </span>
            </div>
          </div>

          {/* Stimulus Audio & Soal */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-muted block">
                Pertanyaan Nada:
              </span>
              <p className="text-sm sm:text-base text-ink font-medium leading-relaxed">
                {currentQuestion.prompt}
              </p>
            </div>

            {/* Pemutar Audio Geometris */}
            <div className="border border-rule bg-canvas p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-ink">
                    {currentQuestion.focusWord.hanzi}
                  </span>
                  <span className="font-mono text-sm text-muted">
                    {currentQuestion.focusWord.pinyin}
                  </span>
                </div>
                <span className="text-xs text-muted block">
                  ({currentQuestion.focusWord.translation})
                </span>
              </div>

              <div className="flex items-center gap-3">
                <AudioPlayer
                  text={currentQuestion.audioPrompt}
                  size="md"
                  showSpeedToggle={true}
                />
              </div>
            </div>

            {/* Opsi Pilihan Jawaban */}
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-muted block">
                Pilih Kesimpulan Fonetik:
              </span>
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  let btnClass = "bg-canvas text-ink border-rule hover:border-ink";

                  if (hasAnswered) {
                    if (option.isCorrect) {
                      btnClass = "bg-status-success text-canvas border-status-success font-bold";
                    } else if (isSelected && !option.isCorrect) {
                      btnClass = "bg-accent-red text-canvas border-accent-red font-bold";
                    } else {
                      btnClass = "bg-paper text-muted border-rule opacity-60";
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(option.id, option.isCorrect)}
                      className={`p-4 border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${btnClass}`}
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-semibold">{option.label}</p>
                        {option.sublabel && (
                          <span className="font-mono text-[11px] opacity-80 block pt-0.5">
                            {option.sublabel}
                          </span>
                        )}
                      </div>
                      {hasAnswered && option.isCorrect && (
                        <span className="font-mono text-xs uppercase font-bold text-canvas shrink-0">
                          ✓ Benar
                        </span>
                      )}
                      {hasAnswered && isSelected && !option.isCorrect && (
                        <span className="font-mono text-xs uppercase font-bold text-canvas shrink-0">
                          ✕ Keliru
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Panel Pembahasan & Artikulasi Setelah Menjawab */}
            {hasAnswered && (
              <div className="border border-rule bg-canvas p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rule pb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 ${
                        isSelectedCorrect ? "bg-status-success" : "bg-accent-red"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                      {isSelectedCorrect
                        ? "Analisis Akurat // Kaidah Terverifikasi"
                        : "Analisis Belum Tepat // Tinjauan Kaidah"}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-muted">
                    {currentQuestion.explanation.ruleTitle}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs sm:text-sm text-ink leading-relaxed">
                    {currentQuestion.explanation.detail}
                  </p>
                  <div className="p-3 bg-paper border border-rule text-xs text-muted space-y-1">
                    <span className="font-mono text-[10px] uppercase font-bold text-accent-blue block">
                      Petunjuk Praktis:
                    </span>
                    <p>{currentQuestion.explanation.indonesianTip}</p>
                  </div>
                </div>

                {/* Tombol Aksi Tambah ke Jurnal Kesalahan & Lanjut */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-rule">
                  {!recordedToJournal ? (
                    <button
                      type="button"
                      onClick={handleSaveToErrorJournal}
                      className="font-mono text-xs uppercase px-4 py-2 border border-rule hover:border-ink bg-paper text-ink transition-colors cursor-pointer text-center"
                    >
                      + Catat ke Jurnal Kesalahan
                    </button>
                  ) : (
                    <span className="font-mono text-xs text-status-success flex items-center gap-1.5">
                      <span>✓</span>
                      <span>Tercatat di Jurnal Kesalahan (Kategori: Nada)</span>
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrevQuestion}
                      disabled={drillIndex === 0}
                      className={`font-mono text-xs uppercase px-3 py-2 border transition-colors ${
                        drillIndex === 0
                          ? "border-rule text-muted bg-paper opacity-50 cursor-not-allowed"
                          : "border-rule hover:border-ink bg-canvas text-ink cursor-pointer"
                      }`}
                    >
                      ← Sebelumnya
                    </button>

                    {!isLastQuestion ? (
                      <button
                        type="button"
                        onClick={handleNextQuestion}
                        className="font-mono text-xs uppercase px-5 py-2 bg-ink text-canvas hover:bg-black font-semibold transition-colors cursor-pointer text-center"
                      >
                        Soal Berikutnya →
                      </button>
                    ) : (
                      <Link
                        href="/error-journal"
                        className="font-mono text-xs uppercase px-5 py-2 bg-accent-red text-canvas hover:bg-black font-semibold transition-colors text-center"
                      >
                        Buka Jurnal Kesalahan →
                      </Link>
                    )}
                  </div>
                </div>

                {journalFeedback && (
                  <p className="font-mono text-[11px] text-muted">{journalFeedback}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Catatan Teori Fondasi Nada */}
      <section className="border border-rule bg-canvas p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-red" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Prinsip Nada Mandarin
          </span>
        </div>
        <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-3xl">
          Mandarin adalah bahasa tonal sejati: perubahan tinggi-rendah nada pada suku kata yang sama
          akan mengubah makna kata seutuhnya (misalnya 妈 mā = ibu, 麻 má = rami, 马 mǎ = kuda, 骂
          mà = memarahi). Penguasaan kontur Y.R. Chao dan kaidah Sandhi adalah fondasi terpenting
          sebelum melangkah ke wacana panjang.
        </p>
      </section>
    </div>
  );
}
