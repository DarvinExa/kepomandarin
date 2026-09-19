"use client";

import { useState, useTransition } from "react";
import { addSavedPhrase } from "@/lib/phrasebook";

interface SavePhraseButtonProps {
  hanzi: string;
  pinyin: string;
  translation: string;
  category?: string;
  notes?: string;
  vocabularyId?: string;
  userId?: string | null;
}

export function SavePhraseButton({
  hanzi,
  pinyin,
  translation,
  category = "Kosakata Pelajaran",
  notes,
  vocabularyId,
  userId,
}: SavePhraseButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    if (isSaved) return;

    startTransition(async () => {
      await addSavedPhrase(
        {
          vocabulary_id: vocabularyId ?? null,
          hanzi,
          pinyin,
          translation,
          category,
          notes,
        },
        userId
      );
      setIsSaved(true);
    });
  };

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={isSaved || isPending}
      className={`font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 border transition-colors cursor-pointer shrink-0 ${
        isSaved
          ? "bg-accent-yellow text-ink border-ink font-bold"
          : "bg-paper text-ink border-rule hover:border-ink hover:bg-canvas"
      }`}
      title={isSaved ? "Sudah tersimpan di buku frasa" : "Simpan ke buku frasa"}
    >
      {isPending ? "Menyimpan..." : isSaved ? "✓ Tersimpan" : "+ Simpan ke Frasa"}
    </button>
  );
}
