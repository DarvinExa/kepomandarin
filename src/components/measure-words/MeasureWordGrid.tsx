"use client";

import { useState } from "react";
import { MEASURE_WORDS_DATA, type MeasureWordItem } from "@/lib/measure-words";
import { AudioPlayer } from "@/components/audio/AudioPlayer";

export function MeasureWordGrid() {
  const [selectedMwId, setSelectedMwId] = useState<string>(MEASURE_WORDS_DATA[0].id);

  const selectedMw: MeasureWordItem =
    MEASURE_WORDS_DATA.find((mw) => mw.id === selectedMwId) ?? MEASURE_WORDS_DATA[0];

  return (
    <div className="border border-rule bg-paper space-y-0">
      {/* 1. Header Eksplorasi Penggolong */}
      <div className="border-b border-rule bg-canvas p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-red" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            10 KATA BANTU BILANGAN FUNDAMENTAL HSK 1
          </span>
        </div>
        <span className="font-mono text-[11px] text-muted">
          PILIH PENGGOLONG UNTUK MEMBEDAH ASOSIASI BENDA
        </span>
      </div>

      {/* 2. Grid Seleksi 10 Kata Penggolong Bauhaus */}
      <div className="p-4 sm:p-6 border-b border-rule bg-canvas">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
          {MEASURE_WORDS_DATA.map((mw) => {
            const isSelected = mw.id === selectedMwId;
            return (
              <button
                key={mw.id}
                type="button"
                onClick={() => setSelectedMwId(mw.id)}
                className={`p-3.5 sm:p-4 border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-2 ${
                  isSelected
                    ? "bg-ink text-canvas border-ink font-bold shadow-none"
                    : "bg-paper text-ink border-rule hover:border-ink hover:bg-canvas"
                }`}
              >
                <span className="text-3xl sm:text-4xl font-black font-mono">
                  {mw.hanzi}
                </span>
                <div className="w-full">
                  <span className="font-mono text-xs block opacity-90">
                    {mw.pinyin}
                  </span>
                  <span className="font-mono text-[10px] text-muted truncate block w-full">
                    {mw.meaningIndonesian.split(" / ")[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Panel Detail Kata Penggolong Terpilih */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-rule">
        {/* Sisi Kiri: Logika Asosiasi Bentuk Fisik (7 Kolom) */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-canvas space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-rule pb-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent-red font-bold block">
                  Kategori Fisik Benda: {selectedMw.physicalCategory}
                </span>
                <div className="flex items-baseline gap-3">
                  <h3 className="text-5xl sm:text-6xl font-black text-ink font-mono">
                    {selectedMw.hanzi}
                  </h3>
                  <div>
                    <span className="font-mono text-base font-bold text-ink block">
                      {selectedMw.pinyin}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      Padanan: <strong className="text-ink">{selectedMw.indonesianEquivalent}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <span className="font-mono text-xs font-bold px-2.5 py-1 bg-accent-yellow text-ink border border-rule shrink-0">
                {selectedMw.meaningIndonesian}
              </span>
            </div>

            {/* Logika & Filosofi Pengelompokan */}
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-muted block">
                Logika Karakteristik Benda:
              </span>
              <p className="text-sm sm:text-base text-ink leading-relaxed">
                {selectedMw.logicDescription}
              </p>
            </div>

            {/* Daftar Kata Benda yang Umum Dipasangkan */}
            <div className="border border-rule bg-paper p-4 space-y-2">
              <span className="font-mono text-[10px] uppercase font-bold text-accent-blue block">
                Kata Benda Pasangan Wajib:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedMw.commonNouns.map((noun, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs px-2.5 py-1 bg-canvas border border-rule text-ink font-medium"
                  >
                    {noun}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-rule pt-4 text-xs font-mono text-muted">
            Kaidah Inti: Pasangkan kata penggolong berdasarkan bentuk geometris alami benda.
          </div>
        </div>

        {/* Sisi Kanan: Contoh Frasa Nyata HSK 1 (5 Kolom) */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-paper space-y-4">
          <div className="flex items-center justify-between border-b border-rule pb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              Contoh Frasa Autentik:
            </span>
            <span className="font-mono text-[11px] text-muted">
              {selectedMw.examples.length} CONTOH HSK 1
            </span>
          </div>

          <div className="space-y-3">
            {selectedMw.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-4 border border-rule bg-canvas flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-ink transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-ink">
                      {ex.fullPhrase}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-accent-blue block">
                    {ex.fullPinyin}
                  </span>
                  <span className="text-xs text-muted block truncate">
                    {ex.translation}
                  </span>
                </div>

                <div className="shrink-0 self-end sm:self-center">
                  <AudioPlayer
                    text={ex.audioText}
                    pinyin={ex.fullPinyin}
                    size="sm"
                    showSpeedToggle={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
