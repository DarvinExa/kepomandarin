"use client";

import { useState } from "react";
import Link from "next/link";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { addErrorEntry } from "@/lib/journal";
import type { ListeningDrill, DrillOption } from "@/lib/phonetics";

interface ListeningLabClientProps {
  initialDrills: ListeningDrill[];
  userId?: string | null;
}

export function ListeningLabClient({
  initialDrills,
  userId,
}: ListeningLabClientProps) {
  const [activeTab, setActiveTab] = useState<"all" | "initials" | "tones" | "dictation">("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [recordedToJournal, setRecordedToJournal] = useState(false);
  const [journalFeedback, setJournalFeedback] = useState<string | null>(null);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    total: 0,
  });

  const filteredDrills = initialDrills.filter((d) => {
    if (activeTab === "all") return true;
    return d.type === activeTab;
  });

  const currentDrill: ListeningDrill | undefined = filteredDrills[currentIndex];

  const handleTabChange = (tab: "all" | "initials" | "tones" | "dictation") => {
    setActiveTab(tab);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setHasAnswered(false);
    setRecordedToJournal(false);
    setJournalFeedback(null);
  };

  const handleSelectOption = (option: DrillOption) => {
    if (hasAnswered) return;

    setSelectedOptionId(option.id);
    setHasAnswered(true);

    const isCorrect = option.isCorrect;
    setSessionStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNextDrill = () => {
    if (currentIndex < filteredDrills.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
      setRecordedToJournal(false);
      setJournalFeedback(null);
    }
  };

  const handlePrevDrill = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
      setRecordedToJournal(false);
      setJournalFeedback(null);
    }
  };

  const handleSaveToErrorJournal = async () => {
    if (!currentDrill || recordedToJournal) return;

    const selectedOption = currentDrill.options.find((o) => o.id === selectedOptionId);
    const hanzi =
      currentDrill.type === "dictation"
        ? currentDrill.fullSentence.hanzi
        : currentDrill.targetWord.hanzi;
    const pinyin =
      currentDrill.type === "dictation"
        ? currentDrill.fullSentence.pinyin
        : currentDrill.targetWord.pinyin;
    const translation =
      currentDrill.type === "dictation"
        ? currentDrill.fullSentence.translation
        : currentDrill.targetWord.translation;

    try {
      await addErrorEntry(
        {
          hanzi,
          pinyin,
          translation,
          category: "Pendengaran",
          error_context: `Salah mendengar: ${currentDrill.title} (${currentDrill.phoneticFocus}). Jawaban yang dipilih: ${selectedOption ? `${selectedOption.pinyin} (${selectedOption.hanzi})` : "Belum tepat"}.`,
          notes: `${currentDrill.articulatoryTip.mechanism}. Tips: ${currentDrill.articulatoryTip.indonesianComparison}`,
        },
        userId
      );
      setRecordedToJournal(true);
      setJournalFeedback("Berhasil dicatat ke Jurnal Kesalahan dengan kategori Pendengaran.");
    } catch {
      setJournalFeedback("Gagal mencatat ke jurnal. Coba lagi.");
    }
  };

  const selectedOption = currentDrill?.options.find((o) => o.id === selectedOptionId);
  const isSelectedCorrect = selectedOption?.isCorrect ?? false;
  const isLastDrill = currentIndex === filteredDrills.length - 1;

  if (!currentDrill) {
    return (
      <div className="border border-rule bg-canvas p-8 text-center space-y-4">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          Tidak ada materi latihan untuk kategori ini.
        </p>
        <button
          type="button"
          onClick={() => handleTabChange("all")}
          className="font-mono text-xs uppercase px-4 py-2 bg-ink text-canvas hover:bg-black font-semibold"
        >
          Lihat Semua Drill
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 1. Kategori Seleksi Tab Bauhaus */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rule pb-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleTabChange("all")}
            className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 border transition-colors cursor-pointer ${
              activeTab === "all"
                ? "bg-ink text-canvas border-ink font-bold"
                : "bg-paper text-ink border-rule hover:border-ink"
            }`}
          >
            Semua Modul
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("initials")}
            className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 border transition-colors cursor-pointer ${
              activeTab === "initials"
                ? "bg-accent-red text-canvas border-accent-red font-bold"
                : "bg-paper text-ink border-rule hover:border-ink"
            }`}
          >
            Pasangan Inisial (zh/j, b/p)
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("tones")}
            className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 border transition-colors cursor-pointer ${
              activeTab === "tones"
                ? "bg-accent-blue text-canvas border-accent-blue font-bold"
                : "bg-paper text-ink border-rule hover:border-ink"
            }`}
          >
            Kontur Nada (1 s/d 4)
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("dictation")}
            className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 border transition-colors cursor-pointer ${
              activeTab === "dictation"
                ? "bg-accent-yellow text-ink border-accent-yellow font-bold"
                : "bg-paper text-ink border-rule hover:border-ink"
            }`}
          >
            Diktasi Kalimat
          </button>
        </div>

        {/* Indikator Statistik Sesi */}
        <div className="flex items-center gap-3 font-mono text-xs text-muted">
          <span>
            DRILL {currentIndex + 1} / {filteredDrills.length}
          </span>
          <span className="w-1 h-3 bg-rule" aria-hidden="true" />
          <span>
            SKOR: {sessionStats.correct}/{sessionStats.total}
          </span>
        </div>
      </div>

      {/* 2. Kartu Utama Latihan Mendengar */}
      <div className="border border-rule bg-paper">
        {/* Header Kartu Drill */}
        <div className="p-4 sm:p-6 border-b border-rule bg-canvas flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 ${
                  currentDrill.type === "initials"
                    ? "bg-accent-red"
                    : currentDrill.type === "tones"
                    ? "bg-accent-blue"
                    : "bg-accent-yellow"
                }`}
                aria-hidden="true"
              />
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                {currentDrill.type === "initials"
                  ? "FONETIK // PASANGAN INISIAL"
                  : currentDrill.type === "tones"
                  ? "AKUSTIK // KONSILESTASI NADA"
                  : "SINTAKSIS // DIKTASI KALIMAT"}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-ink uppercase tracking-tight">
              {currentDrill.title}
            </h2>
          </div>

          <div className="shrink-0">
            <span className="font-mono text-xs font-bold px-2.5 py-1 border border-rule bg-paper text-ink">
              FOKUS: {currentDrill.phoneticFocus}
            </span>
          </div>
        </div>

        {/* Stimulus Audio & Instruksi */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-muted block">
              Instruksi Soal
            </span>
            <p className="text-sm sm:text-base text-ink font-medium leading-relaxed">
              {currentDrill.instruction}
            </p>
          </div>

          {/* Player Audio Stimulus Geometris */}
          <div className="border border-rule bg-canvas p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted block">
                Pemutar Audio
              </span>
              <p className="font-mono text-xs text-muted">
                Gunakan kecepatan <span className="text-ink font-bold">0.75× Lambat</span> jika
                ingin mendengar bunyi kata lebih jelas.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <AudioPlayer
                text={currentDrill.audioPrompt}
                pinyin={currentDrill.type === "tones" ? currentDrill.targetWord.pinyin : undefined}
                size="md"
                showSpeedToggle={true}
              />
            </div>
          </div>

          {/* Khusus Diktasi: Tampilkan Kalimat Rumpang */}
          {currentDrill.type === "dictation" && (
            <div className="border border-rule bg-paper p-4 sm:p-6 text-center space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted block">
                Teks Rumpang Kontekstual
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono tracking-wider text-ink">
                {currentDrill.displayCloze}
              </div>
            </div>
          )}

          {/* Opsi Pilihan Jawaban */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-muted block">
              Pilihan Respons:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentDrill.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                let btnStyle = "bg-canvas text-ink border-rule hover:border-ink";

                if (hasAnswered) {
                  if (option.isCorrect) {
                    btnStyle = "bg-status-success text-canvas border-status-success font-bold";
                  } else if (isSelected && !option.isCorrect) {
                    btnStyle = "bg-accent-red text-canvas border-accent-red font-bold";
                  } else {
                    btnStyle = "bg-paper text-muted border-rule opacity-60";
                  }
                }

                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={hasAnswered}
                    onClick={() => handleSelectOption(option)}
                    className={`p-4 sm:p-5 border text-left transition-all flex flex-col justify-between gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl sm:text-3xl font-bold">{option.hanzi}</span>
                      <span className="font-mono text-sm tracking-wide">
                        {option.pinyin}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-rule/30 pt-2 text-xs">
                      <span className="truncate">{option.translation}</span>
                      {hasAnswered && option.isCorrect && (
                        <span className="font-mono text-[10px] uppercase font-bold text-canvas">
                          ✓ Tepat
                        </span>
                      )}
                      {hasAnswered && isSelected && !option.isCorrect && (
                        <span className="font-mono text-[10px] uppercase font-bold text-canvas">
                          ✕ Keliru
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Panel Diagnosis & Artikulasi Setelah Menjawab */}
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
                      ? "Pendengaran Tepat // Analisis Fonetik Sesuai"
                      : "Diferensiasi Belum Tepat // Tinjauan Fonetik"}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-muted">
                  KUNCI: {currentDrill.type === "dictation" ? currentDrill.fullSentence.hanzi : currentDrill.targetWord.hanzi} ({currentDrill.type === "dictation" ? currentDrill.fullSentence.pinyin : currentDrill.targetWord.pinyin})
                </span>
              </div>

              {/* Ulasan Mekanisme Rongga Mulut & Lidah */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase text-ink">
                  {currentDrill.articulatoryTip.title}
                </h4>
                <p className="text-xs sm:text-sm text-ink leading-relaxed">
                  {currentDrill.articulatoryTip.mechanism}
                </p>
                <div className="p-3 bg-paper border border-rule text-xs text-muted space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-accent-blue block">
                    Komparasi Pembelajar Indonesia:
                  </span>
                  <p>{currentDrill.articulatoryTip.indonesianComparison}</p>
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
                    <span>Tercatat di Jurnal Kesalahan</span>
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevDrill}
                    disabled={currentIndex === 0}
                    className={`font-mono text-xs uppercase px-3 py-2 border transition-colors ${
                      currentIndex === 0
                        ? "border-rule text-muted bg-paper opacity-50 cursor-not-allowed"
                        : "border-rule hover:border-ink bg-canvas text-ink cursor-pointer"
                    }`}
                  >
                    ← Sebelumnya
                  </button>

                  {!isLastDrill ? (
                    <button
                      type="button"
                      onClick={handleNextDrill}
                      className="font-mono text-xs uppercase px-5 py-2 bg-ink text-canvas hover:bg-black font-semibold transition-colors cursor-pointer text-center"
                    >
                      Drill Berikutnya →
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

      {/* 4. Navigasi Bawah & Pintasan Penjelasan Teoretis */}
      <section className="border border-rule bg-canvas p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-yellow" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Panduan Pendengaran Mandiri
          </span>
        </div>
        <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-3xl">
          Bagi pemula, nada dan perbedaan bunyi seperti <code className="text-ink">zh/ch/sh</code> dengan <code className="text-ink">j/q/x</code> sering terdengar mirip. Di latihan ini, coba dengarkan suaranya terlebih dahulu sebelum melihat tulisan agar telingamu terbiasa secara alami.
        </p>
        <div className="pt-2">
          <Link
            href="/practice?mode=listening"
            className="font-mono text-xs uppercase tracking-wider text-ink underline underline-offset-4 hover:text-accent-red"
          >
            Beralih ke Sesi Latihan Audio →
          </Link>
        </div>
      </section>
    </div>
  );
}
