"use client";

import { useState } from "react";
import { TONE_SANDHI_RULES, type ToneSandhiRule } from "@/lib/tones";
import { AudioPlayer } from "@/components/audio/AudioPlayer";

export function ToneSandhiMatrix() {
  const [activeRuleId, setActiveRuleId] = useState<string>(TONE_SANDHI_RULES[0].id);

  const activeRule: ToneSandhiRule =
    TONE_SANDHI_RULES.find((r) => r.id === activeRuleId) ?? TONE_SANDHI_RULES[0];

  return (
    <div className="border border-rule bg-paper space-y-0">
      {/* 1. Bar Navigasi Kaidah Sandhi */}
      <div className="border-b border-rule bg-canvas p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-blue" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            MATRIKS PERUBAHAN NADA // TONE SANDHI
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {TONE_SANDHI_RULES.map((rule, idx) => {
            const isSelected = rule.id === activeRuleId;
            return (
              <button
                key={rule.id}
                type="button"
                onClick={() => setActiveRuleId(rule.id)}
                className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 border transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-ink text-canvas border-ink font-bold"
                    : "bg-paper text-ink border-rule hover:border-ink hover:bg-canvas"
                }`}
              >
                {`0${idx + 1} // ${rule.name.split(" (")[0]}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Kartu Utama Bedah Kaidah Terpilih */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Rumus Formula Geometris */}
        <div className="border border-rule bg-canvas p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted block">
              Rumus Mutasi Fonetik
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-ink uppercase tracking-tight">
              {activeRule.name}
            </h3>
          </div>
          <div className="shrink-0">
            <span className="font-mono text-xs sm:text-sm font-bold px-3.5 py-1.5 bg-accent-yellow text-ink border border-rule block text-center">
              {activeRule.formula}
            </span>
          </div>
        </div>

        {/* Kondisi Pemicu & Penjelasan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-rule bg-canvas p-5 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent-red font-bold block">
              Kondisi Pemicu Sandhi
            </span>
            <p className="text-xs sm:text-sm text-ink leading-relaxed">
              {activeRule.triggerCondition}
            </p>
          </div>

          <div className="border border-rule bg-canvas p-5 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent-blue font-bold block">
              Alasan Fisiologis Pita Suara
            </span>
            <p className="text-xs sm:text-sm text-ink leading-relaxed">
              {activeRule.description}
            </p>
          </div>
        </div>

        {/* Catatan Kritis untuk Pembelajar */}
        <div className="p-4 bg-paper border-l-4 border-l-accent-red border border-rule space-y-1">
          <span className="font-mono text-[10px] uppercase font-bold text-ink block">
            Prinsip Penulisan Pinyin vs Pelafalan Nyata:
          </span>
          <p className="text-xs text-muted leading-relaxed">
            {activeRule.whyItMatters}
          </p>
        </div>

        {/* Tabel Komparasi Contoh Kata HSK 1 */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              Contoh Kasus HSK 1 Autentik:
            </span>
            <span className="font-mono text-[11px] text-muted">
              {activeRule.examples.length} FRASA CONTOH
            </span>
          </div>

          <div className="border border-rule divide-y divide-rule bg-canvas">
            {activeRule.examples.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-paper transition-colors"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-bold text-ink">
                      {item.writtenHanzi}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      Tertulis: <span className="line-through">{item.writtenPinyin}</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    <span className="font-mono text-xs font-bold text-status-success bg-canvas px-2 py-0.5 border border-rule">
                      Dilafalkan: {item.spokenPinyin}
                    </span>
                    <span className="text-xs text-muted">
                      · {item.translation}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <AudioPlayer
                    text={item.audioText}
                    pinyin={item.spokenPinyin}
                    size="md"
                    showSpeedToggle={true}
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
