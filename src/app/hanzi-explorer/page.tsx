import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { HanziExplorerClient } from "@/components/hanzi/HanziExplorerClient";

export const metadata = {
  title: "Eksplorasi Karakter (Hanzi Explorer) · KepoMandarin",
  description:
    "Eksplorasi 12 radikal semantik, dekonstruksi struktur spasial, dan urutan goresan karakter Mandarin HSK 1.",
};

export default async function HanziExplorerPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8 sm:space-y-10">
      {/* 1. Header Section Bauhaus */}
      <section className="border-b border-rule pb-6 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-yellow" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            04 // EKSPLORASI KARAKTER & RADIKAL
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-ink">
              Eksplorasi Karakter Hanzi
            </h1>
            <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
              Bedah anatomi piktograf, 12 radikal semantik pembentuk makna, dekonstruksi struktur
              spasial, dan kaidah urutan goresan karakter tingkat dasar HSK 1.
            </p>
          </div>
          <div className="shrink-0 font-mono text-xs text-muted flex items-center gap-2">
            <span className="w-2 h-2 bg-accent-yellow inline-block" />
            <span>12 RADIKAL + 4 STRUKTUR SPASIAL</span>
          </div>
        </div>
      </section>

      {/* 2. Sub-Navigasi Bilateral Laboratorium Modul HSK 1 */}
      <div className="border border-rule bg-canvas p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-accent-yellow" aria-hidden="true" />
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
          <span className="px-3 py-1 bg-ink text-canvas border border-ink font-bold">
            03 // Karakter Hanzi
          </span>
          <Link
            href="/measure-words"
            className="px-3 py-1 border border-rule bg-paper text-muted hover:text-ink hover:border-ink transition-colors"
          >
            04 // Kata Penggolong
          </Link>
          <Link
            href="/scenarios"
            className="px-3 py-1 border border-rule bg-paper text-muted hover:text-ink hover:border-ink transition-colors"
          >
            05 // Skenario Percakapan
          </Link>
        </div>
      </div>

      {/* 3. Interactive Hanzi Explorer Engine */}
      <HanziExplorerClient userId={user?.id} />
    </div>
  );
}
