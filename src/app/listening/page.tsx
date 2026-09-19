import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getAllListeningDrills } from "@/lib/phonetics";
import { ListeningLabClient } from "@/components/listening/ListeningLabClient";

export const metadata = {
  title: "Latihan Mendengar : Mandarin Context Lab",
  description:
    "Latihan mendengar audio, membedakan bunyi mirip, dan melatih kepekaan nada Mandarin HSK 1.",
};

export default async function ListeningLabPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const drills = getAllListeningDrills();

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8 sm:space-y-10">
      {/* 1. Header Section Bauhaus */}
      <section className="border-b border-rule pb-6 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-blue" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            04 // LATIHAN MENDENGAR AUDIO
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-ink">
              Latihan Mendengar
            </h1>
            <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
              Latih kepekaan telingamu terhadap bunyi bahasa Mandarin: bedakan konsonan mirip,
              kenali perbedaan nada, dan dengarkan kalimat HSK 1 dengan teliti.
            </p>
          </div>
          <div className="shrink-0 font-mono text-xs text-muted flex items-center gap-2">
            <span className="w-2 h-2 bg-accent-blue inline-block" />
            <span>{drills.length} LATIHAN TERSEDIA</span>
          </div>
        </div>
      </section>

      {/* 2. Sub-Navigasi Bilateral Laboratorium Modul HSK 1 */}
      <div className="border border-rule bg-canvas p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-accent-blue" aria-hidden="true" />
          <span className="text-muted uppercase">MODUL PENDUKUNG HSK 1:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 bg-ink text-canvas border border-ink font-bold">
            01 // Mendengar
          </span>
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
          <Link
            href="/scenarios"
            className="px-3 py-1 border border-rule bg-paper text-muted hover:text-ink hover:border-ink transition-colors"
          >
            05 // Skenario Percakapan
          </Link>
        </div>
      </div>

      {/* 3. Interactive Client Engine */}
      <ListeningLabClient initialDrills={drills} userId={user?.id} />
    </div>
  );
}
