import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ProgressClient } from "@/components/progress/ProgressClient";

export default async function ProgressPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isGuest = !user;

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8 sm:space-y-10">
      {/* Guest Notice */}
      {isGuest && (
        <div className="border border-rule bg-paper p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase font-bold text-accent-blue block">
              MODE TAMU // PROGRES TERSIMPAN DI PERANGKAT INI
            </span>
            <p className="text-xs text-muted">
              Progres belajarmu saat ini tersimpan di browser. Masuk atau buat akun agar riwayat belajar tersimpan aman di akunmu.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/register"
              className="px-4 py-2 bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              Daftar
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 border border-rule hover:border-ink text-ink bg-canvas font-mono text-xs uppercase tracking-wider transition-colors"
            >
              Masuk
            </Link>
          </div>
        </div>
      )}

      {/* Header Section */}
      <section className="border-b border-rule pb-6 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-red" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            07 // PROGRES BELAJAR
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-ink">
          Progres Belajar
        </h1>
        <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
          Ringkasan kemajuanmu dari penyelesaian unit HSK 1, akurasi latihan soal, dan jumlah frasa yang kamu simpan.
        </p>
      </section>

      {/* Dynamic Progress Client */}
      <ProgressClient userId={user?.id} isGuest={isGuest} />
    </div>
  );
}
