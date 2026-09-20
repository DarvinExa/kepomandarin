import { createClient } from "@/lib/supabase/server";
import { ScenarioClient } from "@/components/scenarios/ScenarioClient";

export const metadata = {
  title: "Skenario Percakapan (Conversation Scenarios) · KepoMandarin",
  description:
    "Latihan percakapan berbasis peran dan situasi sehari-hari HSK 1: perkenalan, kedai teh, belanja buah, dan janji temu.",
};

export default async function ScenariosPage() {
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
            05 // SKENARIO PERCAKAPAN KONTEKSTUAL
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-ink">
              Skenario Percakapan Sehari-hari
            </h1>
            <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
              Praktikkan dialog situasi sehari-hari turn-based: padukan pelafalan nada, pemakaian kata
              penggolong, dan etika kesantunan Mandarin tingkat dasar HSK 1.
            </p>
          </div>
          <div className="shrink-0 font-mono text-xs text-muted flex items-center gap-2">
            <span className="w-2 h-2 bg-accent-yellow inline-block" />
            <span>4 SITUASI PERCAKAPAN HSK 1</span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Scenario Engine */}
      <ScenarioClient userId={user?.id} />
    </div>
  );
}
