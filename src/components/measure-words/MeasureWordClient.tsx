"use client";

import { useState } from "react";
import Link from "next/link";
import { MeasureWordGrid } from "./MeasureWordGrid";
import { MeasureWordFormula } from "./MeasureWordFormula";
import { addErrorEntry } from "@/lib/journal";
import {
  MEASURE_WORD_QUIZ_QUESTIONS,
  type MeasureWordQuizQuestion,
} from "@/lib/measure-words";

interface MeasureWordClientProps {
  userId?: string | null;
}

export function MeasureWordClient({ userId }: MeasureWordClientProps) {
  const [activeTab, setActiveTab] = useState<"catalog" | "formula" | "quiz">("catalog");

  // State untuk Kuis Latihan Kata Penggolong (Tab 3)
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [recordedToJournal, setRecordedToJournal] = useState(false);
  const [journalFeedback, setJournalFeedback] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const currentQ: MeasureWordQuizQuestion = MEASURE_WORD_QUIZ_QUESTIONS[quizIndex];

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
    if (quizIndex < MEASURE_WORD_QUIZ_QUESTIONS.length - 1) {
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
          hanzi: correctOption?.hanzi ?? "",
          pinyin: correctOption?.pinyin ?? "",
          translation: correctOption?.translation ?? "Kata Penggolong",
          category: "Tata Bahasa",
          error_context: `Kuis Kata Penggolong: ${currentQ.sentenceWithCloze} (Benda: ${currentQ.targetNoun}). Pilihan yang dipilih: ${chosenOption?.hanzi ?? ""} (${chosenOption?.pinyin ?? ""}).`,
          notes: currentQ.explanation,
        },
        userId
      );
      setRecordedToJournal(true);
      setJournalFeedback("Berhasil dicatat ke Jurnal Kesalahan dengan kategori Tata Bahasa.");
    } catch {
      setJournalFeedback("Gagal mencatat ke jurnal kesalahan. Coba lagi.");
    }
  };

  const selectedOpt = currentQ?.options.find((o) => o.id === selectedOptionId);
  const isSelectedCorrect = selectedOpt?.isCorrect ?? false;
  const isLastQuestion = quizIndex === MEASURE_WORD_QUIZ_QUESTIONS.length - 1;

  return (
    <div className="space-y-8">
      {/* 1. Sub-Navigasi Bilateral Laboratorium HSK 1 (4 Modul) */}
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
          <Link
            href="/tone-coach"
            className="px-3 py-1 border border-rule bg-paper text-muted hover:text-ink hover:border-ink transition-colors"
          >
            02 // Pelatih Nada
          </Link>
          <Link
            href="/hanzi-explorer"
            className="px-3 py-1 border border-rule bg-paper text-muted hover:text-ink hover:border-ink transition-colors"
          >
            03 // Karakter Hanzi
          </Link>
          <span className="px-3 py-1 bg-ink text-canvas border border-ink font-bold">
            04 // Kata Penggolong
          </span>
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
          onClick={() => setActiveTab("catalog")}
          className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-colors cursor-pointer ${
            activeTab === "catalog"
              ? "bg-ink text-canvas border-ink font-bold"
              : "bg-paper text-ink border-rule hover:border-ink"
          }`}
        >
          01 // Katalog Penggolong (量词)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("formula")}
          className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-colors cursor-pointer ${
            activeTab === "formula"
              ? "bg-accent-blue text-canvas border-accent-blue font-bold"
              : "bg-paper text-ink border-rule hover:border-ink"
          }`}
        >
          02 // Rumus Sintaksis Balok
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
          03 // Uji Pemilihan Penggolong
        </button>
      </div>

      {/* 3. Konten Sesuai Tab Terpilih */}
      {activeTab === "catalog" && <MeasureWordGrid />}

      {activeTab === "formula" && <MeasureWordFormula />}

      {activeTab === "quiz" && (
        <div className="border border-rule bg-paper space-y-0">
          {/* Header Kuis Kata Penggolong */}
          <div className="border-b border-rule bg-canvas p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-red" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                  UJI ASOSIASI BENDA & PENGGOLONG
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-ink uppercase tracking-tight">
                {currentQ.prompt}
              </h2>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-muted">
              <span>
                SOAL {quizIndex + 1} / {MEASURE_WORD_QUIZ_QUESTIONS.length}
              </span>
              <span className="w-1 h-3 bg-rule" aria-hidden="true" />
              <span>
                SKOR: {score.correct}/{score.total}
              </span>
            </div>
          </div>

          {/* Kalimat Rumpang & Opsi Pilihan */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Display Kalimat Rumpang Besar */}
            <div className="border border-rule bg-canvas p-6 sm:p-8 text-center space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted block">
                Kalimat Target Rumpang
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-ink">
                {currentQ.sentenceWithCloze}
              </div>
              <span className="font-mono text-xs text-muted block">
                Fokus Benda: <strong className="text-ink">{currentQ.targetNoun}</strong>
              </span>
            </div>

            {/* Pilihan Opsi Jawaban */}
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-muted block">
                Pilih Kata Penggolong yang Tepat:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                      className={`p-4 sm:p-5 border text-center transition-all flex flex-col items-center justify-between gap-2 cursor-pointer ${btnClass}`}
                    >
                      <span className="text-3xl sm:text-4xl font-bold font-mono">
                        {option.hanzi}
                      </span>
                      <div>
                        <span className="font-mono text-xs font-semibold block">
                          {option.pinyin}
                        </span>
                        <span className="text-[11px] opacity-80 block truncate">
                          {option.translation}
                        </span>
                      </div>

                      {hasAnswered && option.isCorrect && (
                        <span className="font-mono text-[10px] uppercase font-bold text-canvas">
                          ✓ Benar
                        </span>
                      )}
                      {hasAnswered && isSelected && !option.isCorrect && (
                        <span className="font-mono text-[10px] uppercase font-bold text-canvas">
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
                        ? "Penempatan Tepat // Kaidah Sesuai"
                        : "Penempatan Belum Tepat // Tinjauan Kaidah"}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-muted">
                    BENDA: {currentQ.targetNoun}
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
                      <span>Tercatat di Jurnal Kesalahan (Kategori: Tata Bahasa)</span>
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

      {/* 4. Catatan Teori Sintaksis Penggolong */}
      <section className="border border-rule bg-canvas p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-blue" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Prinsip Tata Bahasa Kata Penggolong (量词)
          </span>
        </div>
        <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-3xl">
          Dalam bahasa Mandarin, kata benda tidak memiliki bentuk jamak (seperti akhiran -s dalam bahasa
          Inggris). Oleh karena itu, kuantifikasi dan individualisasi benda diwujudkan melalui sistem
          kata penggolong (量词). Jangan pernah menghitung kata benda secara langsung tanpa menyisipkan
          kata penggolong yang sesuai.
        </p>
      </section>
    </div>
  );
}
