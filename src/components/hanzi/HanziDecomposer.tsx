"use client";

import { useState } from "react";
import {
  DECONSTRUCTED_HANZI_LIST,
  SPATIAL_STRUCTURES,
  type DeconstructedHanzi,
} from "@/lib/hanzi";
import { AudioPlayer } from "@/components/audio/AudioPlayer";

export function HanziDecomposer() {
  const [selectedHanziId, setSelectedHanziId] = useState<string>(
    DECONSTRUCTED_HANZI_LIST[0].id
  );

  const selectedItem: DeconstructedHanzi =
    DECONSTRUCTED_HANZI_LIST.find((item) => item.id === selectedHanziId) ??
    DECONSTRUCTED_HANZI_LIST[0];

  const spatialInfo = SPATIAL_STRUCTURES[selectedItem.spatialType];

  return (
    <div className="border border-rule bg-paper space-y-0">
      {/* 1. Bar Pemilihan Karakter Dekonstruksi */}
      <div className="border-b border-rule bg-canvas p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-blue" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            BEDAH ANATOMI KARAKTER HSK 1
          </span>
        </div>

        {/* Tab Pilihan Karakter */}
        <div className="flex flex-wrap gap-1.5">
          {DECONSTRUCTED_HANZI_LIST.map((item) => {
            const isSelected = item.id === selectedHanziId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedHanziId(item.id)}
                className={`font-mono text-sm px-3.5 py-1 border transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-ink text-canvas border-ink font-bold"
                    : "bg-paper text-ink border-rule hover:border-ink hover:bg-canvas"
                }`}
              >
                {item.hanzi}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Dekonstruksi Komponen Visual Geometris */}
      <div className="p-6 sm:p-8 space-y-8 bg-canvas border-b border-rule">
        {/* Persamaan Balok Karakter: Komponen A + Komponen B = Karakter Utuh */}
        <div className="border border-rule bg-paper p-6 sm:p-8 space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted block text-center sm:text-left">
            Dekomposisi Komponen Semantik & Fonetik
          </span>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {selectedItem.components.map((comp, idx) => (
              <div key={idx} className="flex items-center gap-3 sm:gap-6">
                {idx > 0 && (
                  <span className="text-2xl font-bold font-mono text-muted">+</span>
                )}
                <div className="border border-rule bg-canvas p-4 text-center min-w-[100px] sm:min-w-[130px] space-y-1">
                  <span className="text-3xl sm:text-4xl font-bold font-mono text-ink block">
                    {comp.symbol}
                  </span>
                  <span className="font-mono text-xs font-semibold text-accent-blue block">
                    {comp.pinyin}
                  </span>
                  <span className="font-mono text-[10px] text-muted uppercase block">
                    {comp.role.replace(/_/g, " ")}
                  </span>
                </div>
              </div>
            ))}

            <span className="text-2xl font-bold font-mono text-muted">=</span>

            {/* Karakter Utuh Hasil Penggabungan */}
            <div className="border-2 border-ink bg-ink text-canvas p-4 sm:p-5 text-center min-w-[120px] sm:min-w-[150px] space-y-1">
              <span className="text-4xl sm:text-5xl font-black block">
                {selectedItem.hanzi}
              </span>
              <span className="font-mono text-xs font-bold text-accent-yellow block">
                {selectedItem.pinyin}
              </span>
              <span className="text-[11px] text-canvas/80 truncate block">
                {selectedItem.translation}
              </span>
            </div>
          </div>
        </div>

        {/* Audio Pelafalan & Detail Ringkas */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-rule bg-paper p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-bold text-ink">
              RADIKAL UTAMA: {selectedItem.primaryRadical}
            </span>
            <span className="text-rule">|</span>
            <span className="font-mono text-xs text-muted">
              TOTAL GORESAN: {selectedItem.strokeCount}
            </span>
            <span className="text-rule">|</span>
            <span className="font-mono text-xs text-muted">
              {spatialInfo.visualSymbol} {spatialInfo.nameIndonesian}
            </span>
          </div>

          <div className="shrink-0">
            <AudioPlayer
              text={selectedItem.audioText}
              pinyin={selectedItem.pinyin}
              size="md"
              showSpeedToggle={true}
            />
          </div>
        </div>
      </div>

      {/* 3. Panel Dua Kolom: Kisah Etimologi & Urutan Goresan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-rule">
        {/* Kolom Kiri: Kisah Etimologi & Makna Piktograf (6 Kolom) */}
        <div className="lg:col-span-6 p-6 sm:p-8 bg-paper space-y-5">
          <div className="space-y-1 border-b border-rule pb-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent-red font-bold block">
              Logika Pembentukan Karakter
            </span>
            <h4 className="text-base font-bold text-ink uppercase tracking-tight">
              Kisah Simbolis di Balik Karakter {selectedItem.hanzi}
            </h4>
          </div>

          <p className="text-xs sm:text-sm text-ink leading-relaxed">
            {selectedItem.etymologyStory}
          </p>

          <div className="border border-rule bg-canvas p-4 space-y-2">
            <span className="font-mono text-[10px] uppercase font-bold text-accent-blue block">
              Peran Komponen Penyusun:
            </span>
            <div className="space-y-2 text-xs">
              {selectedItem.components.map((comp, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="font-mono font-bold text-ink shrink-0">
                    [{comp.symbol}]
                  </span>
                  <span className="text-muted leading-relaxed">
                    {comp.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Urutan Goresan Standar (Bǐshùn) (6 Kolom) */}
        <div className="lg:col-span-6 p-6 sm:p-8 bg-canvas space-y-5">
          <div className="space-y-1 border-b border-rule pb-3 flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent-blue font-bold block">
                Kaidah Penulisan Standar (笔顺)
              </span>
              <h4 className="text-base font-bold text-ink uppercase tracking-tight">
                Urutan Goresan Bertahap ({selectedItem.strokeCount} Goresan)
              </h4>
            </div>
            <span className="font-mono text-xs font-bold text-accent-red">
              {selectedItem.strokeCount} LANGKAH
            </span>
          </div>

          <div className="border border-rule divide-y divide-rule bg-paper">
            {selectedItem.strokeOrderSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-3 text-xs flex items-center gap-3 hover:bg-canvas transition-colors"
              >
                <span className="font-mono font-bold text-accent-blue shrink-0 w-6">
                  0{idx + 1}
                </span>
                <span className="font-mono text-ink font-medium leading-relaxed">
                  {step}
                </span>
              </div>
            ))}
          </div>

          <p className="font-mono text-[11px] text-muted">
            Kaidah dasar: Tulis dari kiri ke kanan, atas ke bawah, dan selesaikan bagian dalam
            sebelum menutup garis bawah pembungkus.
          </p>
        </div>
      </div>
    </div>
  );
}
