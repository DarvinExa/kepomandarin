"use client";

import { useState } from "react";
import { AudioPlayer } from "@/components/audio/AudioPlayer";

interface FormulaCase {
  id: string;
  title: string;
  badge: string;
  prefixLabel: string;
  prefixHanzi: string;
  prefixPinyin: string;
  mwLabel: string;
  mwHanzi: string;
  mwPinyin: string;
  nounLabel: string;
  nounHanzi: string;
  nounPinyin: string;
  combinedPhrase: string;
  combinedPinyin: string;
  translation: string;
  explanation: string;
  indonesianComparison: string;
}

const FORMULA_CASES: FormulaCase[] = [
  {
    id: "f-numeral",
    title: "Rumus 1: Menyatakan Kuantitas / Jumlah",
    badge: "Angka + Penggolong + Benda",
    prefixLabel: "Angka (数词)",
    prefixHanzi: "三",
    prefixPinyin: "sān (3)",
    mwLabel: "Penggolong (量词)",
    mwHanzi: "个",
    mwPinyin: "gè",
    nounLabel: "Benda (名词)",
    nounHanzi: "苹果",
    nounPinyin: "píngguǒ",
    combinedPhrase: "三个苹果",
    combinedPinyin: "sān gè píngguǒ",
    translation: "tiga buah apel",
    explanation:
      "Dalam Mandarin, angka tidak boleh langsung bertemu kata benda. Pengucapan seperti *三苹果 (sān píngguǒ) adalah salah secara tata bahasa. Wajib disisipkan penggolong '个'.",
    indonesianComparison:
      "Mirip bahasa Indonesia: 'tiga ekor kucing' atau 'tiga buah apel', namun dalam Mandarin hukum ini mutlak tanpa pengecualian.",
  },
  {
    id: "f-demonstrative",
    title: "Rumus 2: Kata Tunjuk Ini / Itu (这 / 那)",
    badge: "Tunjuk + Penggolong + Benda",
    prefixLabel: "Kata Tunjuk",
    prefixHanzi: "这",
    prefixPinyin: "zhè (ini)",
    mwLabel: "Penggolong (量词)",
    mwHanzi: "本",
    mwPinyin: "běn",
    nounLabel: "Benda (名词)",
    nounHanzi: "书",
    nounPinyin: "shū",
    combinedPhrase: "这本书",
    combinedPinyin: "zhè běn shū",
    translation: "buku ini",
    explanation:
      "Saat menunjuk satu benda spesifik dengan '这' (ini) atau '那' (itu), kata penggolong tetap wajib hadir di antara kata tunjuk dan kata bendanya.",
    indonesianComparison:
      "Bahasa Indonesia langsung mengatakan 'buku ini', sedangkan Mandarin menyusunnya menjadi: 'ini + jilid + buku' (这本书).",
  },
  {
    id: "f-interrogative",
    title: "Rumus 3: Kalimat Tanya Berapa / Mana (几 / 哪)",
    badge: "Tanya + Penggolong + Benda",
    prefixLabel: "Kata Tanya",
    prefixHanzi: "几",
    prefixPinyin: "jǐ (berapa)",
    mwLabel: "Penggolong (量词)",
    mwHanzi: "位",
    mwPinyin: "wèi",
    nounLabel: "Benda (名词)",
    nounHanzi: "老师",
    nounPinyin: "lǎoshī",
    combinedPhrase: "几位老师",
    combinedPinyin: "jǐ wèi lǎoshī",
    translation: "berapa orang guru?",
    explanation:
      "Kata tanya '几' (jǐ - berapa untuk angka < 10) atau '哪' (nǎ - yang mana) selalu mewajibkan kehadiran kata penggolong sebelum menyebut bendanya.",
    indonesianComparison:
      "Seperti bertanya 'berapa orang guru?' dengan penekanan kata bantu bilangan santun '位'.",
  },
];

export function MeasureWordFormula() {
  const [activeFormulaId, setActiveFormulaId] = useState<string>(FORMULA_CASES[0].id);

  const activeCase =
    FORMULA_CASES.find((f) => f.id === activeFormulaId) ?? FORMULA_CASES[0];

  return (
    <div className="border border-rule bg-paper space-y-0">
      {/* 1. Bar Pemilihan Rumus */}
      <div className="border-b border-rule bg-canvas p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-blue" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            SINTAKSIS BALOK KATA PENGGOLONG MANDARIN
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {FORMULA_CASES.map((fc, idx) => {
            const isSelected = fc.id === activeFormulaId;
            return (
              <button
                key={fc.id}
                type="button"
                onClick={() => setActiveFormulaId(fc.id)}
                className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 border transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-ink text-canvas border-ink font-bold"
                    : "bg-paper text-ink border-rule hover:border-ink hover:bg-canvas"
                }`}
              >
                {`0${idx + 1} // ${fc.badge.split(" + ")[0]}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Visualisator Balok Sintaksis Geometris Bauhaus */}
      <div className="p-6 sm:p-8 space-y-8 bg-canvas border-b border-rule">
        <div className="space-y-2 text-center sm:text-left">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted block">
            Struktur Penempatan Sintaksis
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-ink uppercase tracking-tight">
            {activeCase.title}
          </h3>
        </div>

        {/* Diagram 3 Balok Geometris Konstruktivisme */}
        <div className="border border-rule bg-paper p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {/* Balok 1: Angka / Kata Tunjuk */}
            <div className="border border-rule bg-canvas p-4 sm:p-5 text-center min-w-[110px] sm:min-w-[140px] space-y-1">
              <span className="font-mono text-[10px] uppercase text-muted block">
                {activeCase.prefixLabel}
              </span>
              <span className="text-3xl sm:text-4xl font-black font-mono text-ink block">
                {activeCase.prefixHanzi}
              </span>
              <span className="font-mono text-xs text-muted block">
                {activeCase.prefixPinyin}
              </span>
            </div>

            <span className="text-3xl font-bold font-mono text-muted">+</span>

            {/* Balok 2: KATA PENGGOLONG (量词) : INTINYA BERWARNA MERAH */}
            <div className="border-2 border-accent-red bg-accent-red text-canvas p-4 sm:p-5 text-center min-w-[120px] sm:min-w-[150px] space-y-1 shadow-none">
              <span className="font-mono text-[10px] uppercase tracking-wider text-canvas/90 block font-bold">
                {activeCase.mwLabel}
              </span>
              <span className="text-4xl sm:text-5xl font-black font-mono block">
                {activeCase.mwHanzi}
              </span>
              <span className="font-mono text-xs font-bold text-accent-yellow block">
                {activeCase.mwPinyin}
              </span>
            </div>

            <span className="text-3xl font-bold font-mono text-muted">+</span>

            {/* Balok 3: Kata Benda */}
            <div className="border border-rule bg-canvas p-4 sm:p-5 text-center min-w-[110px] sm:min-w-[140px] space-y-1">
              <span className="font-mono text-[10px] uppercase text-muted block">
                {activeCase.nounLabel}
              </span>
              <span className="text-3xl sm:text-4xl font-black font-mono text-ink block">
                {activeCase.nounHanzi}
              </span>
              <span className="font-mono text-xs text-muted block">
                {activeCase.nounPinyin}
              </span>
            </div>

            <span className="text-3xl font-bold font-mono text-muted">=</span>

            {/* Balok Hasil Penggabungan */}
            <div className="border-2 border-ink bg-ink text-canvas p-4 sm:p-5 text-center min-w-[130px] sm:min-w-[160px] space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted block">
                Frasa Utuh
              </span>
              <span className="text-3xl sm:text-4xl font-black block">
                {activeCase.combinedPhrase}
              </span>
              <span className="font-mono text-xs font-bold text-accent-yellow block">
                {activeCase.combinedPinyin}
              </span>
              <span className="text-xs text-canvas/80 truncate block">
                ({activeCase.translation})
              </span>
            </div>
          </div>
        </div>

        {/* Audio Pelafalan Frasa Hasil Gabungan */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-rule bg-paper p-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase font-bold text-ink">
              Dengarkan Frasa:
            </span>
            <span className="font-mono text-sm font-bold text-accent-red">
              {activeCase.combinedPhrase} ({activeCase.combinedPinyin})
            </span>
          </div>

          <div className="shrink-0">
            <AudioPlayer
              text={activeCase.combinedPhrase}
              pinyin={activeCase.combinedPinyin}
              size="md"
              showSpeedToggle={true}
            />
          </div>
        </div>
      </div>

      {/* 3. Panel Komparasi Dua Kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-rule">
        <div className="p-6 sm:p-8 bg-paper space-y-3">
          <span className="font-mono text-[10px] uppercase font-bold text-accent-red block">
            Kaidah Wajib Sintaksis Mandarin:
          </span>
          <p className="text-xs sm:text-sm text-ink leading-relaxed">
            {activeCase.explanation}
          </p>
        </div>

        <div className="p-6 sm:p-8 bg-canvas space-y-3">
          <span className="font-mono text-[10px] uppercase font-bold text-accent-blue block">
            Komparasi dengan Bahasa Indonesia:
          </span>
          <p className="text-xs sm:text-sm text-ink leading-relaxed">
            {activeCase.indonesianComparison}
          </p>
        </div>
      </div>
    </div>
  );
}
