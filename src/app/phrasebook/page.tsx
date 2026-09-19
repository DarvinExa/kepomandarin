import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PhrasebookClient } from "@/components/phrasebook/PhrasebookClient";

export default async function PhrasebookPage() {
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
            <span className="font-mono text-[10px] uppercase font-bold text-ink block bg-accent-yellow px-2 py-0.5 w-fit">
              MODE TAMU // PENYIMPANAN DI PERANGKAT INI
            </span>
            <p className="text-xs text-muted">
              Koleksi frasamu saat ini tersimpan di browser. Masuk atau buat akun agar frasa tersimpan aman di akunmu.
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
          <span className="w-2.5 h-2.5 bg-accent-yellow" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            05 // BUKU FRASA PRIBADI
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-ink">
              Buku Frasa
            </h1>
            <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
              Kumpulan kalimat dan kosakata Mandarin yang kamu simpan sendiri untuk latihan percakapan sehari-hari.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Phrasebook Client */}
      <PhrasebookClient userId={user?.id} isGuest={isGuest} />

      {/* Specimen Guideline Structure */}
      <section className="border border-rule bg-canvas p-6 sm:p-8 space-y-4">
        <span className="font-mono text-xs font-bold uppercase text-muted block">
          Format Tiga Unsur Belajar
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 border border-rule divide-y sm:divide-y-0 sm:divide-x divide-rule bg-paper">
          <div className="p-4 space-y-1">
            <span className="font-mono text-[10px] uppercase text-muted block">01 / KARAKTER</span>
            <p className="font-chinese text-2xl font-bold text-ink">这是我的书。</p>
            <p className="text-xs text-muted">Hanzi (Mandarin Sederhana)</p>
          </div>
          <div className="p-4 space-y-1">
            <span className="font-mono text-[10px] uppercase text-muted block">02 / PELAFALAN</span>
            <p className="font-mono text-sm font-semibold text-ink">Zhè shì wǒ de shū.</p>
            <p className="text-xs text-muted">Pinyin dengan tanda nada</p>
          </div>
          <div className="p-4 space-y-1">
            <span className="font-mono text-[10px] uppercase text-muted block">03 / ARTI</span>
            <p className="text-sm font-semibold text-ink">Ini adalah buku saya.</p>
            <p className="text-xs text-muted">Terjemahan Bahasa Indonesia</p>
          </div>
        </div>
      </section>
    </div>
  );
}
