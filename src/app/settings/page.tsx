import { createClient } from "@/lib/supabase/server";
import { SettingsClient } from "@/components/settings/SettingsClient";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isGuest = !user;

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8 sm:space-y-10">
      {/* Header Section */}
      <section className="border-b border-rule pb-6 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-ink" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            08 // KONFIGURASI SISTEM
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-ink">
          Pengaturan
        </h1>
        <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
          Preferensi target belajar harian, tampilan diakritik nada, dan status akun peramban.
        </p>
      </section>

      {/* Interactive Settings Component */}
      <SettingsClient
        userId={user?.id}
        email={user?.email}
        isGuest={isGuest}
      />
    </div>
  );
}
