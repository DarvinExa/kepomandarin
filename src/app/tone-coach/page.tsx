import { createClient } from "@/lib/supabase/server";
import { ToneCoachClient } from "@/components/tones/ToneCoachClient";

export const metadata = {
  title: "Pelatih Nada (Tone Coach) · Mandarin Context Lab",
  description:
    "Eksplorasi visual kontur nada 5-skala Y.R. Chao dan kaidah perubahan nada (Tone Sandhi) HSK 1.",
};

export default async function ToneCoachPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8 sm:space-y-10">
      {/* 1. Header Section Bauhaus */}
      <section className="border-b border-rule pb-6 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-red" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            04 // PELATIH NADA & TONE SANDHI
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-ink">
              Pelatih Nada Mandarin
            </h1>
            <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
              Visualisasi kontur nada sistem 5-skala Y.R. Chao, aturan mutasi nada (Tone Sandhi),
              dan analisis perbedaan kontur vokal autentik tingkat dasar HSK 1.
            </p>
          </div>
          <div className="shrink-0 font-mono text-xs text-muted flex items-center gap-2">
            <span className="w-2 h-2 bg-accent-red inline-block" />
            <span>4 NADA + NETRAL + 4 SANDHI</span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Tone Coach Engine */}
      <ToneCoachClient userId={user?.id} />
    </div>
  );
}
