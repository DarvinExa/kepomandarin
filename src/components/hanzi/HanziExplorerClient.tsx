"use client";

import { useState } from "react";
import Link from "next/link";
import { HanziRadicalGrid } from "./HanziRadicalGrid";
import { HanziDecomposer } from "./HanziDecomposer";
import { addErrorEntry } from "@/lib/journal";
import { HANZI_QUIZ_QUESTIONS, type HanziQuizQuestion } from "@/lib/hanzi";

interface HanziExplorerClientProps {
  userId?: string | null;
}

export function HanziExplorerClient({ userId }: HanziExplorerClientProps) {
  const [activeTab, setActiveTab] = useState<"radicals" | "decompose" | "quiz">("radicals");

  // State untuk Kuis Identifikasi Radikal (Tab 3)
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [recordedToJournal, setRecordedToJournal] = useState(false);
  const [journalFeedback, setJournalFeedback] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const currentQ: HanziQuizQuestion = HANZI_QUIZ_QUESTIONS[quizIndex];

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    if (hasAnswered) return;
    setSelectedOptionId(optionId);
    setHasAnswered(true);
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNextQ = () => {
    if (quizIndex < HANZI_QUIZ_QUESTIONS.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
      setRecordedToJournal(false);
      setJournalFeedback(null);
    }
  };

  const handlePrevQ = () => {
    if (quizIndex > 0) {
      setQuizIndex((prev) => prev - 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
      setRecordedToJournal(false);
      setJournalFeedback(null);
    }
  };

  const handleSaveToErrorJournal = async () => {
    if (!currentQ || recordedToJournal) return;

    const chosenOption = currentQ.options.find((o) => o.id === selectedOptionId);
    const correctOption = currentQ.options.find((o) => o.isCorrect);

    try {
      await addErrorEntry(
        {
          hanzi: correctOption?.hanzi ?? currentQ.targetRadicalSymbol,
          pinyin: correctOption?.pinyin ?? "",
          translation: correctOption?.translation ?? currentQ.targetRadicalMeaning,
          category: "Kosakata",
          error_context: `Kuis Radikal: ${currentQ.prompt}. Pilihan yang dipilih: ${chosenOption?.hanzi ?? ""} (${chosenOption?.pinyin ?? ""}).`,
          notes: currentQ.explanation,
        },
        userId
      );
      setRecordedToJournal(true);
      setJournalFeedback("Berhasil dicatat ke Jurnal Kesalahan dengan kategori Kosakata.");
    } catch {
      setJournalFeedback("Gagal mencatat ke jurnal kesalahan. Coba lagi.");
    }
  };

  const selectedOpt = currentQ?.options.find((o) => o.id === selectedOptionId);
  const isSelectedCorrect = selectedOpt?.isCorrect ?? false;
  const isLastQuestion = quizIndex === HANZI_QUIZ_QUESTIONS.length - 1;

  return (
    <div className="space-y-8">
      {/* 1. Pemilih Tab Utama Bauhaus */}
      <div className="flex flex-wrap gap-2 border-b border-rule pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("radicals")}
          className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-colors cursor-pointer ${
            activeTab === "radicals"
              ? "bg-ink text-canvas border-ink font-bold"
              : "bg-paper text-ink border-rule hover:border-ink"
          }`}
        >
          01 // Radikal Semantik
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("decompose")}
          className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-colors cursor-pointer ${
            activeTab === "decompose"
              ? "bg-accent-blue text-canvas border-accent-blue font-bold"
              : "bg-paper text-ink border-rule hover:border-ink"
          }`}
        >
          02 // Dekonstruksi Spasial & Goresan
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("quiz")}
          className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-colors cursor-pointer ${
            activeTab === "quiz"
              ? "bg-accent-red text-canvas border-accent-red font-bold"
              : "bg-paper text-ink border-rule hover:border-ink"
          }`}
        >
          03 // Uji Identifikasi Radikal
        </button>
      </div>

      {/* 2. Konten Sesuai Tab Terpilih */}
      {activeTab === "radicals" && <HanziRadicalGrid />}

      {activeTab === "decompose" && <HanziDecomposer />}

      {activeTab === "quiz" && (
        <div className="border border-rule bg-paper space-y-0">
          {/* Header Kuis Radikal */}
          <div className="border-b border-rule bg-canvas p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-red" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                  UJI LOGIKA RADIKAL & SEMANTIK
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-ink uppercase tracking-tight">
                {currentQ.prompt}
              </h2>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-muted">
              <span>
                SOAL {quizIndex + 1} / {HANZI_QUIZ_QUESTIONS.length}
              </span>
              <span className="w-1 h-3 bg-rule" aria-hidden="true" />
              <span>
                SKOR: {score.correct}/{score.total}
              </span>
            </div>
          </div>

          {/* Opsi Pilihan Karakter */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-muted block">
                Pilih Karakter yang Tepat:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((option) => {
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
                      className={`p-4 sm:p-5 border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${btnClass}`}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold font-mono">{option.hanzi}</span>
                        <div>
                          <span className="font-mono text-xs font-semibold block">
                            {option.pinyin}
                          </span>
                          <span className="text-xs opacity-80 block truncate">
                            {option.translation}
                          </span>
                        </div>
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
                        ? "Analisis Tepat // Radikal Dikenali"
                        : "Analisis Belum Tepat // Tinjauan Radikal"}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-muted">
                    FOKUS RADIKAL: {currentQ.targetRadicalSymbol} ({currentQ.targetRadicalMeaning})
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-ink leading-relaxed">
                  {currentQ.explanation}
                </p>

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
                      <span>Tercatat di Jurnal Kesalahan (Kategori: Kosakata)</span>
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrevQ}
                      disabled={quizIndex === 0}
                      className={`font-mono text-xs uppercase px-3 py-2 border transition-colors ${
                        quizIndex === 0
                          ? "border-rule text-muted bg-paper opacity-50 cursor-not-allowed"
                          : "border-rule hover:border-ink bg-canvas text-ink cursor-pointer"
                      }`}
                    >
                      ← Sebelumnya
                    </button>

                    {!isLastQuestion ? (
                      <button
                        type="button"
                        onClick={handleNextQ}
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

      {/* 3. Catatan Kaidah Urutan Goresan Standar */}
      <section className="border border-rule bg-canvas p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-yellow" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Tujuh Kaidah Urutan Goresan (笔顺规则)
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs text-muted">
          <div className="border border-rule bg-paper p-3 space-y-1">
            <span className="font-mono font-bold text-ink block">1. Atas ke Bawah (先上后下)</span>
            <p>Contoh: 三 (sān), 言 (yán), selesaikan goresan atas terlebih dahulu.</p>
          </div>
          <div className="border border-rule bg-paper p-3 space-y-1">
            <span className="font-mono font-bold text-ink block">2. Kiri ke Kanan (先左后右)</span>
            <p>Contoh: 你 (nǐ), 他 (tā), selesaikan bagian kiri sebelum bagian kanan.</p>
          </div>
          <div className="border border-rule bg-paper p-3 space-y-1">
            <span className="font-mono font-bold text-ink block">3. Horizontal dulu, Vertikal kemudian (先横后竖)</span>
            <p>Contoh: 十 (shí), garis mendatar (横) ditarik sebelum garis tegak (竖).</p>
          </div>
          <div className="border border-rule bg-paper p-3 space-y-1">
            <span className="font-mono font-bold text-ink block">4. Masuk Dulu, Tutup Pintu Kemudian (先进入后关门)</span>
            <p>Contoh: 国 (guó), 四 (sì), selesaikan isi di dalam kotak sebelum menutup garis bawah.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
