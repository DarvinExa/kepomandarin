import { createClient } from "@/lib/supabase/server";
import { MeasureWordClient } from "@/components/measure-words/MeasureWordClient";

export const metadata = {
  title: "Kata Bantu Bilangan (Measure Word Explorer) · Mandarin Context Lab",
  description:
    "Eksplorasi 10 kata bantu bilangan (量词 - liàngcí), rumus sintaksis balok, dan asosiasi benda HSK 1.",
};

export default async function MeasureWordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8 sm:space-y-10">
      {/* 1. Header Section Bauhaus */}
      <section className="border-b border-rule pb-6 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-blue" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            04 // KATA BANTU BILANGAN (量词)
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-ink">
              Eksplorasi Kata Penggolong
            </h1>
            <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
              Kuasai logika asosiasi fisik kata bantu bilangan (量词 - liàngcí), rumus penempatan
              sintaksis, dan kaidah kuantifikasi benda tingkat dasar HSK 1.
            </p>
          </div>
          <div className="shrink-0 font-mono text-xs text-muted flex items-center gap-2">
            <span className="w-2 h-2 bg-accent-blue inline-block" />
            <span>10 KATA PENGGOLONG + 3 RUMUS SINTAKSIS</span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Measure Word Engine */}
      <MeasureWordClient userId={user?.id} />
    </div>
  );
}
