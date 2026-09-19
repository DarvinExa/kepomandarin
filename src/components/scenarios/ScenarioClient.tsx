"use client";

import { useState } from "react";
import Link from "next/link";
import { CONVERSATION_SCENARIOS, type ConversationScenario } from "@/lib/scenarios";
import { ScenarioPlayer } from "./ScenarioPlayer";

interface ScenarioClientProps {
  userId?: string | null;
}

export function ScenarioClient({ userId }: ScenarioClientProps) {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(
    CONVERSATION_SCENARIOS[0].id
  );

  const activeScenario: ConversationScenario =
    CONVERSATION_SCENARIOS.find((sc) => sc.id === activeScenarioId) ??
    CONVERSATION_SCENARIOS[0];

  return (
    <div className="space-y-8">
      {/* 1. Sub-Navigasi Bilateral Laboratorium HSK 1 (5 Modul) */}
      <div className="border border-rule bg-canvas p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-yellow" aria-hidden="true" />
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
          <Link
            href="/measure-words"
            className="px-3 py-1 border border-rule bg-paper text-muted hover:text-ink hover:border-ink transition-colors"
          >
            04 // Kata Penggolong
          </Link>
          <span className="px-3 py-1 bg-ink text-canvas border border-ink font-bold">
            05 // Skenario Percakapan
          </span>
        </div>
      </div>

      {/* 2. Seleksi 4 Skenario Percakapan Bauhaus */}
      <div className="space-y-3">
        <span className="font-mono text-xs uppercase tracking-wider text-muted block">
          Pilih Situasi Percakapan Nyata:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CONVERSATION_SCENARIOS.map((sc, idx) => {
            const isSelected = sc.id === activeScenarioId;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => setActiveScenarioId(sc.id)}
                className={`p-4 border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? "bg-ink text-canvas border-ink font-bold"
                    : "bg-paper text-ink border-rule hover:border-ink hover:bg-canvas"
                }`}
              >
                <div>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest block mb-1 ${
                      isSelected ? "text-accent-yellow" : "text-muted"
                    }`}
                  >
                    SKENARIO 0{idx + 1}
                  </span>
                  <h3 className="text-base font-bold uppercase tracking-tight leading-snug">
                    {sc.title}
                  </h3>
                </div>
                <span
                  className={`font-mono text-xs block ${
                    isSelected ? "text-canvas/80" : "text-muted"
                  }`}
                >
                  {sc.subtitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Header Ringkas Skenario Terpilih */}
      <div className="border border-rule bg-canvas p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase font-bold text-accent-red block">
            Situasi Aktif
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase tracking-tight">
            {activeScenario.title}
          </h2>
          <p className="text-xs sm:text-sm text-muted">
            Latar: <strong className="text-ink">{activeScenario.setting}</strong> · Tujuan: {activeScenario.contextGoal}
          </p>
        </div>

        {/* Indikator Dua Peran */}
        <div className="flex items-center gap-2 font-mono text-xs shrink-0">
          <span className="px-2.5 py-1 bg-accent-red text-canvas font-bold">
            A: {activeScenario.roleA.name.split(" ")[0]}
          </span>
          <span className="text-muted">vs</span>
          <span className="px-2.5 py-1 bg-accent-blue text-canvas font-bold">
            B: {activeScenario.roleB.name.split(" ")[0]} (Kamu)
          </span>
        </div>
      </div>

      {/* 4. Pemain Skenario Interaktif */}
      <ScenarioPlayer key={activeScenario.id} scenario={activeScenario} userId={userId} />
    </div>
  );
}
