"use client";

import { useState } from "react";
import { RADICALS_DATA, type RadicalInfo } from "@/lib/hanzi";
import { AudioPlayer } from "@/components/audio/AudioPlayer";

export function HanziRadicalGrid() {
  const [selectedRadicalId, setSelectedRadicalId] = useState<string>(RADICALS_DATA[0].id);

  const selectedRadical: RadicalInfo =
    RADICALS_DATA.find((r) => r.id === selectedRadicalId) ?? RADICALS_DATA[0];

  return (
    <div className="border border-rule bg-paper space-y-0">
      {/* 1. Header Eksplorasi Radikal */}
      <div className="border-b border-rule bg-canvas p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-red" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            12 BALOK PENYUSUN SEMANTIK HSK 1
          </span>
        </div>
        <span className="font-mono text-[11px] text-muted">
          PILIH RADIKAL UNTUK MEMBEDAH MAKNA ASALI
        </span>
      </div>

      {/* 2. Grid Radikal Bauhaus Geometris */}
      <div className="p-4 sm:p-6 border-b border-rule bg-canvas">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
          {RADICALS_DATA.map((rad) => {
            const isSelected = rad.id === selectedRadicalId;
            return (
              <button
                key={rad.id}
                type="button"
                onClick={() => setSelectedRadicalId(rad.id)}
                className={`p-3 sm:p-4 border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1.5 ${
                  isSelected
                    ? "bg-ink text-canvas border-ink font-bold shadow-none"
                    : "bg-paper text-ink border-rule hover:border-ink hover:bg-canvas"
                }`}
              >
                <span className="text-2xl sm:text-3xl font-bold font-mono">
                  {rad.symbol}
                </span>
                <span className="font-mono text-[10px] tracking-tight truncate w-full">
                  {rad.meaningIndonesian.split(" / ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Panel Kartu Detail Radikal Terpilih */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-rule">
        {/* Sisi Kiri: Makna Asal & Filosofi (7 Kolom) */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-canvas space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4 border-b border-rule pb-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent-red font-bold block">
                  Radikal Semantik (部首 - Bùshǒu)
                </span>
                <div className="flex items-baseline gap-3">
                  <h3 className="text-4xl sm:text-5xl font-black text-ink">
                    {selectedRadical.symbol}
                  </h3>
                  <div className="space-y-0.5">
                    <span className="font-mono text-sm font-bold text-ink block">
                      {selectedRadical.pinyin}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      Asal Karakter: <strong className="text-ink">{selectedRadical.originalHanzi}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <span className="font-mono text-xs font-bold px-2.5 py-1 bg-accent-yellow text-ink border border-rule inline-block">
                  {selectedRadical.meaningIndonesian}
                </span>
              </div>
            </div>

            {/* Filosofi Piktograf / Asal Simbol */}
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-muted block">
                Filosofi Bentuk & Logika Semantik:
              </span>
              <p className="text-sm sm:text-base text-ink leading-relaxed">
                {selectedRadical.symbolicOrigin}
              </p>
            </div>
          </div>

          <div className="p-4 bg-paper border border-rule space-y-1 text-xs text-muted">
            <span className="font-mono text-[10px] uppercase font-bold text-ink block">
              Prinsip Menghafal Hanzi:
            </span>
            <p>
              Menghafal radikal semantik mempermudahmu menebak makna kata baru meskipun belum
              pernah melihat karakter tersebut sebelumnya.
            </p>
          </div>
        </div>

        {/* Sisi Kanan: Karakter HSK 1 Terkait (5 Kolom) */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-paper space-y-4">
          <div className="flex items-center justify-between border-b border-rule pb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              Karakter HSK 1 dengan Radikal Ini:
            </span>
            <span className="font-mono text-[11px] text-muted">
              {selectedRadical.hsk1Examples.length} KATA
            </span>
          </div>

          <div className="space-y-2.5">
            {selectedRadical.hsk1Examples.map((ex) => (
              <div
                key={ex.hanzi}
                className="p-3.5 border border-rule bg-canvas flex items-center justify-between gap-3 hover:border-ink transition-colors"
              >
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="text-2xl font-bold text-ink shrink-0">
                    {ex.hanzi}
                  </span>
                  <div className="min-w-0">
                    <span className="font-mono text-xs font-bold text-accent-blue block">
                      {ex.pinyin}
                    </span>
                    <span className="text-xs text-muted truncate block">
                      {ex.translation}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <AudioPlayer
                    text={ex.audioText}
                    pinyin={ex.pinyin}
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
