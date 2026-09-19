"use client";

import { useState } from "react";
import { type ConversationScenario, type DialogueLine } from "@/lib/scenarios";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { addSavedPhrase } from "@/lib/phrasebook";
import { addErrorEntry } from "@/lib/journal";

interface ScenarioPlayerProps {
  scenario: ConversationScenario;
  userId?: string | null;
}

export function ScenarioPlayer({ scenario, userId }: ScenarioPlayerProps) {
  const [playMode, setPlayMode] = useState<"roleplay" | "fullscript">("roleplay");

  // State untuk Mode Role-Play Interaktif
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [hasAnsweredTurn, setHasAnsweredTurn] = useState(false);
  const [journalFeedback, setJournalFeedback] = useState<string | null>(null);
  const [savedPhraseIds, setSavedPhraseIds] = useState<Record<string, boolean>>({});

  const currentLine: DialogueLine | undefined = scenario.dialogue[currentTurnIndex];

  const handleSelectChoice = (choiceId: string) => {
    if (hasAnsweredTurn) return;
    setSelectedChoiceId(choiceId);
    setHasAnsweredTurn(true);
  };

  const handleNextTurn = () => {
    if (currentTurnIndex < scenario.dialogue.length - 1) {
      setCurrentTurnIndex((prev) => prev + 1);
      setSelectedChoiceId(null);
      setHasAnsweredTurn(false);
      setJournalFeedback(null);
    }
  };

  const handlePrevTurn = () => {
    if (currentTurnIndex > 0) {
      setCurrentTurnIndex((prev) => prev - 1);
      setSelectedChoiceId(null);
      setHasAnsweredTurn(false);
      setJournalFeedback(null);
    }
  };

  const handleSavePhrase = async (line: DialogueLine) => {
    try {
      await addSavedPhrase(
        {
          hanzi: line.hanzi,
          pinyin: line.pinyin,
          translation: line.translation,
          category: "Percakapan",
          notes: `Dari skenario percakapan: ${scenario.title} (${line.speakerName})`,
        },
        userId
      );
      setSavedPhraseIds((prev) => ({ ...prev, [line.id]: true }));
    } catch {
      console.warn("Gagal menyimpan frasa ke Buku Frasa");
    }
  };

  const handleRecordError = async (line: DialogueLine, choiceFeedback: string) => {
    try {
      await addErrorEntry(
        {
          hanzi: line.hanzi,
          pinyin: line.pinyin,
          translation: line.translation,
          category: "Tata Bahasa",
          error_context: `Kekeliruan respons percakapan pada skenario: ${scenario.title}.`,
          notes: choiceFeedback,
        },
        userId
      );
      setJournalFeedback("Dicatat ke Jurnal Kesalahan!");
    } catch {
      setJournalFeedback("Gagal mencatat ke jurnal.");
    }
  };

  const selectedChoice = currentLine?.userChoices?.find((c) => c.id === selectedChoiceId);
  const isLastTurn = currentTurnIndex === scenario.dialogue.length - 1;

  return (
    <div className="border border-rule bg-paper space-y-0">
      {/* 1. Bar Pengaturan Mode: Role-Play vs Naskah Utuh */}
      <div className="border-b border-rule bg-canvas p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-accent-blue" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              MODE PERCAKAPAN:
            </span>
          </div>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => {
                setPlayMode("roleplay");
                setCurrentTurnIndex(0);
                setSelectedChoiceId(null);
                setHasAnsweredTurn(false);
              }}
              className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 border transition-colors cursor-pointer ${
                playMode === "roleplay"
                  ? "bg-ink text-canvas border-ink font-bold"
                  : "bg-paper text-ink border-rule hover:border-ink"
              }`}
            >
              Role-Play Interaktif
            </button>
            <button
              type="button"
              onClick={() => setPlayMode("fullscript")}
              className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 border transition-colors cursor-pointer ${
                playMode === "fullscript"
                  ? "bg-accent-blue text-canvas border-accent-blue font-bold"
                  : "bg-paper text-ink border-rule hover:border-ink"
              }`}
            >
              Telaah Naskah Utuh
            </button>
          </div>
        </div>

        {/* Indikator Giliran / Status */}
        <span className="font-mono text-xs text-muted">
          {playMode === "roleplay"
            ? `GILIRAN ${currentTurnIndex + 1} / ${scenario.dialogue.length}`
            : `${scenario.dialogue.length} BARIS PERCAKAPAN`}
        </span>
      </div>

      {/* 2. Mode Role-Play Interaktif */}
      {playMode === "roleplay" && currentLine && (
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Giliran Bicara */}
          <div className="flex items-center justify-between border-b border-rule pb-3">
            <div className="flex items-center gap-2.5">
              <span
                className={`w-3 h-3 ${
                  currentLine.speakerRole === "A" ? "bg-accent-red" : "bg-accent-blue"
                }`}
                aria-hidden="true"
              />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                {currentLine.speakerName} ({currentLine.speakerRole === "A" ? scenario.roleA.title : scenario.roleB.title})
              </span>
            </div>
            <span className="font-mono text-[11px] text-muted uppercase">
              {currentLine.isUserTurn ? "Giliran Kamu Merespons" : "Lawan Bicara Berbicara"}
            </span>
          </div>

          {/* Dialog Lawan Bicara (Role A) */}
          {!currentLine.isUserTurn ? (
            <div className="border border-rule bg-canvas p-6 sm:p-8 space-y-5">
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-ink block leading-tight">
                  {currentLine.hanzi}
                </span>
                <span className="font-mono text-sm sm:text-base text-accent-blue block font-semibold">
                  {currentLine.pinyin}
                </span>
                <span className="text-xs sm:text-sm text-muted block pt-1">
                  ({currentLine.translation})
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-4">
                <AudioPlayer
                  text={currentLine.audioText}
                  pinyin={currentLine.pinyin}
                  size="md"
                  showSpeedToggle={true}
                />

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSavePhrase(currentLine)}
                    className="font-mono text-xs uppercase px-3 py-1.5 border border-rule hover:border-ink bg-paper text-ink transition-colors cursor-pointer"
                  >
                    {savedPhraseIds[currentLine.id] ? "✓ Tersimpan di Frasa" : "+ Simpan Frasa"}
                  </button>

                  <button
                    type="button"
                    onClick={handleNextTurn}
                    className="font-mono text-xs uppercase px-4 py-1.5 bg-ink text-canvas hover:bg-black font-semibold transition-colors cursor-pointer"
                  >
                    Giliran Kamu →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Giliran Pengguna Memilih Respons (Role B) */
            <div className="space-y-5">
              <div className="border border-rule bg-canvas p-4 sm:p-5">
                <span className="font-mono text-xs uppercase tracking-wider text-accent-blue font-bold block mb-1">
                  Pertanyaan / Stimulus Sebelumnya:
                </span>
                <p className="font-mono text-xs text-muted">
                  Dengarkan kembali ucapan lawan bicara di atas, lalu pilih jawaban yang paling
                  santun dan tepat.
                </p>
              </div>

              {/* Opsi Pilihan Jawaban Respons */}
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-muted block">
                  Pilih Respons Percakapan:
                </span>

                <div className="grid grid-cols-1 gap-3">
                  {currentLine.userChoices?.map((choice) => {
                    const isSelected = selectedChoiceId === choice.id;
                    let btnClass = "bg-canvas text-ink border-rule hover:border-ink";

                    if (hasAnsweredTurn) {
                      if (choice.isAppropriate) {
                        btnClass = "bg-status-success text-canvas border-status-success font-bold";
                      } else if (isSelected && !choice.isAppropriate) {
                        btnClass = "bg-accent-red text-canvas border-accent-red font-bold";
                      } else {
                        btnClass = "bg-paper text-muted border-rule opacity-60";
                      }
                    }

                    return (
                      <button
                        key={choice.id}
                        type="button"
                        disabled={hasAnsweredTurn}
                        onClick={() => handleSelectChoice(choice.id)}
                        className={`p-4 sm:p-5 border text-left transition-all flex flex-col gap-2 cursor-pointer ${btnClass}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-lg sm:text-xl font-bold font-mono">
                            {choice.hanzi}
                          </span>
                          {hasAnsweredTurn && choice.isAppropriate && (
                            <span className="font-mono text-xs uppercase font-bold text-canvas shrink-0">
                              ✓ Alami & Tepat
                            </span>
                          )}
                          {hasAnsweredTurn && isSelected && !choice.isAppropriate && (
                            <span className="font-mono text-xs uppercase font-bold text-canvas shrink-0">
                              ✕ Kurang Sesuai
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs opacity-90 block">
                          {choice.pinyin}
                        </span>
                        <span className="text-xs opacity-80 block">
                          {choice.translation}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ulasan Jawaban & Tombol Lanjut */}
              {hasAnsweredTurn && selectedChoice && (
                <div className="border border-rule bg-canvas p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-rule pb-2">
                    <span
                      className={`w-2.5 h-2.5 ${
                        selectedChoice.isAppropriate ? "bg-status-success" : "bg-accent-red"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                      {selectedChoice.isAppropriate
                        ? "Respons Alami // Sesuai Konteks"
                        : "Respons Kurang Tepat // Tinjauan Etika"}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-ink leading-relaxed">
                    {selectedChoice.feedback}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-3">
                    <div className="flex items-center gap-2">
                      {!selectedChoice.isAppropriate && (
                        <button
                          type="button"
                          onClick={() => handleRecordError(currentLine, selectedChoice.feedback)}
                          className="font-mono text-xs uppercase px-3 py-1.5 border border-rule hover:border-ink bg-paper text-ink transition-colors cursor-pointer"
                        >
                          + Catat ke Jurnal Kesalahan
                        </button>
                      )}
                      {journalFeedback && (
                        <span className="font-mono text-[11px] text-muted">{journalFeedback}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrevTurn}
                        className="font-mono text-xs uppercase px-3 py-1.5 border border-rule hover:border-ink bg-canvas text-ink transition-colors cursor-pointer"
                      >
                        ← Ulangi
                      </button>

                      {!isLastTurn ? (
                        <button
                          type="button"
                          onClick={handleNextTurn}
                          className="font-mono text-xs uppercase px-4 py-1.5 bg-ink text-canvas hover:bg-black font-semibold transition-colors cursor-pointer"
                        >
                          Lanjut Dialog →
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPlayMode("fullscript")}
                          className="font-mono text-xs uppercase px-4 py-1.5 bg-accent-blue text-canvas hover:bg-black font-semibold transition-colors cursor-pointer"
                        >
                          Lihat Naskah Utuh Selesai ✓
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. Mode Naskah Utuh (Full Script Reader) */}
      {playMode === "fullscript" && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="border border-rule bg-canvas p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase font-bold text-accent-blue block">
                Catatan Latar Skenario:
              </span>
              <p className="text-xs sm:text-sm text-ink">{scenario.setting}</p>
            </div>
            <span className="font-mono text-xs font-bold px-2.5 py-1 bg-paper border border-rule text-ink">
              Tujuan: {scenario.contextGoal}
            </span>
          </div>

          {/* Daftar Giliran Percakapan Berurutan */}
          <div className="border border-rule divide-y divide-rule bg-canvas">
            {scenario.dialogue.map((line, idx) => {
              const isA = line.speakerRole === "A";
              return (
                <div
                  key={line.id}
                  className={`p-5 space-y-3 transition-colors ${
                    isA ? "bg-canvas" : "bg-paper"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 ${
                          isA ? "bg-accent-red" : "bg-accent-blue"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                        {line.speakerName} ({isA ? scenario.roleA.title : scenario.roleB.title})
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-muted">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1 pl-4 border-l-2 border-rule">
                    <span className="text-xl sm:text-2xl font-bold text-ink block">
                      {line.hanzi}
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-semibold text-accent-blue block">
                      {line.pinyin}
                    </span>
                    <span className="text-xs text-muted block pt-0.5">
                      {line.translation}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 pl-4">
                    <AudioPlayer
                      text={line.audioText}
                      pinyin={line.pinyin}
                      size="sm"
                      showSpeedToggle={true}
                    />

                    <button
                      type="button"
                      onClick={() => handleSavePhrase(line)}
                      className="font-mono text-[11px] uppercase px-2.5 py-1 border border-rule hover:border-ink bg-canvas text-ink transition-colors cursor-pointer"
                    >
                      {savedPhraseIds[line.id] ? "✓ Tersimpan" : "+ Simpan ke Frasa"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Panel Etika Budaya & Kosakata Kunci */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="border border-rule bg-canvas p-5 space-y-2">
              <span className="font-mono text-[10px] uppercase font-bold text-accent-red block">
                {scenario.culturalEtiquette.title}
              </span>
              <p className="text-xs text-ink leading-relaxed">
                {scenario.culturalEtiquette.description}
              </p>
            </div>

            <div className="border border-rule bg-canvas p-5 space-y-2">
              <span className="font-mono text-[10px] uppercase font-bold text-accent-blue block">
                Kosakata Kunci Skenario:
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {scenario.keyVocabulary.map((vocab) => (
                  <span
                    key={vocab.hanzi}
                    className="font-mono text-xs px-2 py-1 bg-paper border border-rule text-ink"
                  >
                    {vocab.hanzi} ({vocab.pinyin}) · {vocab.translation}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
