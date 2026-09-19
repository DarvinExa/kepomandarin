"use client";

import { useState } from "react";
import { TONE_CONTOURS, type ToneContourData } from "@/lib/tones";
import { AudioPlayer } from "@/components/audio/AudioPlayer";

export function PitchContourVisualizer() {
  const [selectedToneNumber, setSelectedToneNumber] = useState<number>(1);

  const selectedContour =
    TONE_CONTOURS.find((c) => c.toneNumber === selectedToneNumber) ?? TONE_CONTOURS[0];

  // Ukuran viewBox SVG
  const width = 420;
  const height = 240;
  const paddingX = 60;
  const paddingY = 30;
  const innerWidth = width - paddingX * 2;
  const innerHeight = height - paddingY * 2;

  // Konversi koordinat Pitch (1-5) dan X (0-100) ke SVG (x, y)
  // Pitch 5 berada di atas (y kecil), Pitch 1 berada di bawah (y besar)
  const mapPitchToY = (pitch: number) => {
    const normalized = (pitch - 1) / 4; // 0 sampai 1
    return height - paddingY - normalized * innerHeight;
  };

  const mapPercentToX = (percent: number) => {
    return paddingX + (percent / 100) * innerWidth;
  };

  // Bangun path string SVG untuk kurva
  const generatePathD = (contour: ToneContourData) => {
    return contour.curvePoints
      .map((pt, i) => {
        const x = mapPercentToX(pt.x);
        const y = mapPitchToY(pt.pitch);
        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
      })
      .join(" ");
  };

  return (
    <div className="border border-rule bg-paper">
      {/* 1. Bar Tab Pemilihan Nada Bauhaus */}
      <div className="border-b border-rule bg-canvas p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-red" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            SISTEM 5-SKALA Y.R. CHAO
          </span>
        </div>

        {/* Tombol Seleksi Nada */}
        <div className="flex flex-wrap gap-1.5">
          {TONE_CONTOURS.map((t) => {
            const isSelected = t.toneNumber === selectedToneNumber;
            return (
              <button
                key={t.toneNumber}
                type="button"
                onClick={() => setSelectedToneNumber(t.toneNumber)}
                className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 border transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-ink text-canvas border-ink font-bold"
                    : "bg-paper text-ink border-rule hover:border-ink hover:bg-canvas"
                }`}
              >
                {t.toneNumber === 0 ? "Netral" : `Nada ${t.toneNumber}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Grid Visualisator Geometris SVG & Panel Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-rule">
        {/* Kolom Kiri: Diagram SVG Kontur (7 Kolom) */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-canvas flex flex-col justify-between space-y-6">
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted block">
              Grafik Registrasi Frekuensi Akustik
            </span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl sm:text-2xl font-black text-ink uppercase tracking-tight">
                {selectedContour.nameIndonesian}
              </h3>
              <span className="font-mono text-sm font-bold px-2 py-0.5 border border-rule bg-paper text-ink">
                SKALA: {selectedContour.chaoScale}
              </span>
            </div>
          </div>

          {/* Canvas SVG Geometris */}
          <div className="border border-rule bg-paper p-4 relative overflow-hidden">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-auto max-h-[260px] select-none"
              aria-label={`Grafik kontur frekuensi ${selectedContour.nameIndonesian}`}
            >
              {/* Garis Grid Skala 1 sampai 5 */}
              {[5, 4, 3, 2, 1].map((level) => {
                const y = mapPitchToY(level);
                const levelLabels: Record<number, string> = {
                  5: "5 Tinggi",
                  4: "4 Stgh Tinggi",
                  3: "3 Tengah",
                  2: "2 Stgh Rendah",
                  1: "1 Rendah",
                };
                return (
                  <g key={level}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={width - paddingX}
                      y2={y}
                      stroke="#E4E4E7"
                      strokeWidth="1"
                      strokeDasharray={level === 3 ? "none" : "2,2"}
                    />
                    <text
                      x={paddingX - 8}
                      y={y + 3.5}
                      textAnchor="end"
                      className="font-mono text-[9px] fill-[#71717A]"
                    >
                      {levelLabels[level]}
                    </text>
                  </g>
                );
              })}

              {/* Garis Axis Waktu (Bawah) */}
              <line
                x1={paddingX}
                y1={height - paddingY}
                x2={width - paddingX}
                y2={height - paddingY}
                stroke="#111111"
                strokeWidth="1.5"
              />
              <text
                x={paddingX}
                y={height - 10}
                textAnchor="start"
                className="font-mono text-[9px] fill-[#71717A] uppercase"
              >
                Awal Pelafalan (0%)
              </text>
              <text
                x={width - paddingX}
                y={height - 10}
                textAnchor="end"
                className="font-mono text-[9px] fill-[#71717A] uppercase"
              >
                Akhir (100%)
              </text>

              {/* Kurva Samaran untuk Nada Lainnya (Background Comparison) */}
              {TONE_CONTOURS.map((t) => {
                if (t.toneNumber === selectedToneNumber) return null;
                return (
                  <path
                    key={t.toneNumber}
                    d={generatePathD(t)}
                    fill="none"
                    stroke="#D4D4D8"
                    strokeWidth="1.5"
                    strokeDasharray="4,3"
                    opacity="0.5"
                  />
                );
              })}

              {/* Kurva Aktif Terpilih (Tegas Geometris) */}
              <path
                d={generatePathD(selectedContour)}
                fill="none"
                stroke={selectedContour.hexColor}
                strokeWidth="4"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />

              {/* Titik-titik Geometris Penanda */}
              {selectedContour.curvePoints.map((pt, idx) => {
                const cx = mapPercentToX(pt.x);
                const cy = mapPitchToY(pt.pitch);
                return (
                  <rect
                    key={idx}
                    x={cx - 4}
                    y={cy - 4}
                    width="8"
                    height="8"
                    fill={selectedContour.hexColor}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-muted border-t border-rule pt-3">
            <span>DIAGRAM CHAO 1930</span>
            <span>NOTASI DIAKRITIK: {selectedContour.symbol}</span>
          </div>
        </div>

        {/* Kolom Kanan: Ulasan Artikulasi & Contoh Audio (5 Kolom) */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-paper space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header Nama Mandarin */}
            <div className="border-b border-rule pb-3 flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-bold font-mono text-ink">
                  {selectedContour.nameChinese}
                </span>
                <span className="font-mono text-xs text-muted ml-2">
                  ({selectedContour.pinyinChinese})
                </span>
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                {selectedContour.description}
              </span>
            </div>

            {/* Mekanisme Anatomi Pita Suara */}
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted block">
                Mekanisme Pita Suara & Vokal
              </span>
              <p className="text-xs sm:text-sm text-ink leading-relaxed">
                {selectedContour.articulatoryMechanism}
              </p>
            </div>

            {/* Analogi Penutur Bahasa Indonesia */}
            <div className="p-3.5 bg-canvas border border-rule space-y-1">
              <span className="font-mono text-[10px] uppercase font-bold text-accent-blue block">
                Analogi Intonasi Indonesia:
              </span>
              <p className="text-xs text-ink leading-relaxed">
                {selectedContour.indonesianAnalogy}
              </p>
            </div>

            {/* Daftar Contoh Kosakata Autentik */}
            <div className="space-y-2 pt-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted block">
                Contoh Kosakata HSK 1 & Pelafalan
              </span>
              <div className="grid grid-cols-1 gap-2">
                {selectedContour.exampleWords.map((word) => (
                  <div
                    key={word.hanzi}
                    className="p-2.5 border border-rule bg-canvas flex items-center justify-between gap-3"
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-lg font-bold text-ink">{word.hanzi}</span>
                      <span className="font-mono text-xs font-semibold text-accent-blue">
                        {word.pinyin}
                      </span>
                      <span className="text-xs text-muted truncate max-w-[120px]">
                        ({word.translation})
                      </span>
                    </div>
                    <AudioPlayer
                      text={word.audioText}
                      pinyin={word.pinyin}
                      size="sm"
                      showSpeedToggle={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-rule pt-4">
            <p className="font-mono text-[11px] text-muted">
              Petunjuk: Latih pita suaramu meniru kurva register sebelum melanjutkan ke kaidah Sandhi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
