import Link from "next/link";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { getModuleById } from "@/lib/curriculum-modules";

export function PublicLandingPage() {
  const hsk1Module = getModuleById("hsk1");
  const units = hsk1Module?.units ?? [];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-12 sm:space-y-16">
      {/* 0. Top Editorial Notification Bar */}
      <div className="border-b border-rule pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-muted">
          <span className="w-2.5 h-2.5 bg-accent-red" aria-hidden="true" />
          <span className="uppercase tracking-wider font-bold text-ink">
            KepoMandarin
          </span>
          <span className="text-rule">/</span>
          <span>Belajar Mandarin Buat Si Kepo</span>
        </div>
        <div className="flex items-center gap-2 text-muted">
          <span className="text-status-success font-semibold">100% GRATIS</span>
        </div>
      </div>

      {/* 1. Hero Section (Bauhaus Asymmetrical Composition) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 border-2 border-ink bg-paper">
        {/* Kolom Kiri: Value Proposition & CTAs */}
        <div className="lg:col-span-7 p-6 sm:p-12 flex flex-col justify-between space-y-8 border-b lg:border-b-0 lg:border-r-2 border-ink">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-accent-yellow" aria-hidden="true" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                METODE KONTEKSTUAL // BUKAN HAFALAN KOSONG
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-ink leading-none">
                Belajar Mandarin Buat Si Kepo
              </h1>
              <p className="text-sm sm:text-base text-muted leading-relaxed max-w-xl">
                Belajar bahasa Mandarin secara tenang, fokus, dan teratur. Tanpa distraksi berlebihan, setiap kosakata disajikan dalam tiga format terstruktur dengan audio penutur asli dan panduan nada yang mudah dipahami.
              </p>
            </div>

            {/* 3 Fitur Kunci Mikro */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs border-t border-rule">
              <div className="space-y-0.5">
                <span className="font-bold text-accent-red block">150+ KATA</span>
                <span className="text-muted text-[11px]">Silabus standar HSK 1</span>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-accent-blue block">TRI-FORMAT</span>
                <span className="text-muted text-[11px]">Hanzi, Pinyin & Nada, Arti</span>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-ink block">JURNAL MANDIRI</span>
                <span className="text-muted text-[11px]">Diagnosis kesalahan latihan</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/?view=dashboard"
                className="bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider px-6 py-4 font-bold text-center transition-colors block"
              >
                Mulai Belajar Langsung (Mode Tamu) →
              </Link>
              <Link
                href="/register"
                className="border border-rule hover:border-ink bg-canvas text-ink font-mono text-xs uppercase tracking-wider px-6 py-4 font-semibold text-center transition-colors block"
              >
                Daftar Akun Baru
              </Link>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-muted pt-1">
              <span>Akses penuh seluruh 12 unit tanpa wajib daftar.</span>
              <Link href="/login" className="underline hover:text-ink">
                Sudah punya akun? Masuk
              </Link>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Maskot & Live Specimen Card */}
        <div className="lg:col-span-5 bg-canvas p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between border-b border-rule pb-3">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-muted">
              SPESIMEN PEMBELAJARAN
            </span>
            <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-accent-blue text-canvas font-bold">
              AUDIO INTERAKTIF
            </span>
          </div>

          {/* Maskot KepoMandarin */}
          <div className="flex justify-center py-2">
            <img
              src="/images/mascot-greeting.png"
              alt="Maskot KepoMandarin Menyapa"
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain drop-shadow-[0_3px_8px_rgba(0,0,0,0.08)] select-none"
            />
          </div>

          {/* Live Interactive Specimen Card */}
          <div className="border border-rule bg-paper p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted font-bold">
                Contoh Percakapan Sehari-hari
              </span>
              <AudioPlayer
                text="你好！很高兴认识你。"
                pinyin="Nǐ hǎo! Hěn gāoxìng rènshí nǐ."
                size="sm"
              />
            </div>

            <div className="space-y-1">
              <p className="font-chinese text-2xl font-bold text-ink leading-tight">
                你好！很高兴认识你。
              </p>
              <p className="font-mono text-xs sm:text-sm font-semibold text-accent-blue">
                Nǐ hǎo! Hěn gāoxìng rènshí nǐ.
              </p>
              <p className="text-xs text-ink font-medium pt-1 border-t border-rule">
                Halo! Senang sekali bisa mengenalmu.
              </p>
            </div>

            <div className="pt-2 border-t border-rule/60 flex items-center justify-between text-[10px] font-mono text-muted">
              <span>Unit 01: Sapaan Sopan</span>
              <span className="text-accent-red font-bold">Klik tombol audio untuk mendengar bunyi</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tiga Pilar Filosofi Belajar (Bauhaus Grid 3 Kolom) */}
      <section className="space-y-4">
        <div className="border-b border-rule pb-2 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-muted font-bold">
            02 // PRINSIP & METODE BELAJAR
          </span>
          <span className="font-mono text-xs text-muted">
            TIGA PILAR PEDAGOGI
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-rule divide-y md:divide-y-0 md:divide-x divide-rule bg-paper">
          {/* Pilar 1 */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent-red">
                PILAR 01
              </span>
              <span className="w-2.5 h-2.5 bg-accent-red" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-ink">
              Konteks Kalimat Utuh
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Bukan sekadar menghafal daftar kata terpisah. Setiap kosakata disajikan dalam kalimat utuh tri-format (Hanzi, Pinyin dengan tanda nada, dan terjemahan bahasa Indonesia alami) agar kamu langsung tahu cara memakainya dalam obrolan sehari-hari.
            </p>
            <div className="pt-2 border-t border-rule font-mono text-[10px] text-muted">
              FORMAT KONSISTEN // BEBAS RANCU
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent-blue">
                PILAR 02
              </span>
              <span className="w-2.5 h-2.5 bg-accent-blue" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-ink">
              Sains Nada & Pelafalan
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Bahasa Mandarin adalah bahasa bernada. Kami menyediakan visualisasi kontur 4 nada, laboratorium pelafalan, dan panduan posisi lidah yang mudah dipahami pemula tanpa membingungkan dengan istilah akademik yang berbelit-belit.
            </p>
            <div className="pt-2 border-t border-rule font-mono text-[10px] text-muted">
              PANDUAN VISUAL // POSISI LIDAH JELAS
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent-yellow">
                PILAR 03
              </span>
              <span className="w-2.5 h-2.5 bg-accent-yellow" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-ink">
              Jurnal Kesalahan Mandiri
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Belajar dari kesalahan adalah kunci kemahiran. Setiap kekeliruan saat latihan soal dicatat secara otomatis ke dalam Jurnal Kesalahan agar kamu bisa meninjau, mendiagnosis letak kelemahan nada atau tata bahasa, dan mencoba lagi.
            </p>
            <div className="pt-2 border-t border-rule font-mono text-[10px] text-muted">
              EVALUASI PERSONAL // TINJAU MANDIRI
            </div>
          </div>
        </div>
      </section>

      {/* 3. Showcase Fitur Platform (Grid 4 Modul Bauhaus) */}
      <section className="space-y-4">
        <div className="border-b border-rule pb-2 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-muted font-bold">
            03 // FITUR PLATFORM
          </span>
          <span className="font-mono text-xs text-muted">MODUL TERSEDIA</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-rule divide-y sm:divide-y-0 sm:divide-x divide-rule bg-paper">
          <div className="p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-accent-red block">
              MODUL 01
            </span>
            <h4 className="text-base font-bold text-ink uppercase tracking-tight">
              Kurikulum HSK 1
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              12 unit pembelajaran berurutan mencakup 150 kosakata standar, tata bahasa esensial, dan dialog situasional.
            </p>
            <Link
              href="/hsk"
              className="text-xs font-mono font-bold uppercase text-ink hover:text-accent-red block pt-2"
            >
              Lihat Silabus →
            </Link>
          </div>

          <div className="p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-accent-blue block">
              MODUL 02
            </span>
            <h4 className="text-base font-bold text-ink uppercase tracking-tight">
              Latihan Mendengar
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Latih kepekaan telinga membedakan pasangan minimal konsonan, vokal sengau, dan kontur nada yang mirip.
            </p>
            <Link
              href="/listening"
              className="text-xs font-mono font-bold uppercase text-ink hover:text-accent-blue block pt-2"
            >
              Buka Latihan Audio →
            </Link>
          </div>

          <div className="p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-accent-yellow block">
              MODUL 03
            </span>
            <h4 className="text-base font-bold text-ink uppercase tracking-tight">
              Pelatih Nada & Sandhi
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Pahami aturan perubahan nada kata &quot;bù&quot; (tidak), kata &quot;yī&quot; (satu), dan aturan nada 3 ganda (3+3 menjadi 2+3).
            </p>
            <Link
              href="/tone-coach"
              className="text-xs font-mono font-bold uppercase text-ink hover:text-accent-yellow block pt-2"
            >
              Pelajari Aturan Nada →
            </Link>
          </div>

          <div className="p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-ink block">
              MODUL 04
            </span>
            <h4 className="text-base font-bold text-ink uppercase tracking-tight">
              Koleksi Buku Frasa
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Simpan frasa dan kosakata favorit saat belajar di unit mana pun untuk dipelajari kembali saat senggang.
            </p>
            <Link
              href="/phrasebook"
              className="text-xs font-mono font-bold uppercase text-ink hover:text-accent-red block pt-2"
            >
              Buka Koleksi →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Kurikulum HSK 1 Overview (12 Unit Mini-Grid) */}
      <section className="space-y-4">
        <div className="border-b border-rule pb-2 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-muted font-bold">
            04 // SILABUS PEMBELAJARAN HSK 1
          </span>
          <span className="font-mono text-xs text-muted">
            12 UNIT TERSTRUKTUR
          </span>
        </div>

        <div className="border border-rule bg-paper">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-rule">
            {units.map((unit) => (
              <Link
                key={unit.id}
                href={`/lessons/hsk1/${unit.slug}`}
                className="p-4 sm:p-5 hover:bg-canvas transition-colors space-y-2 block group border-b border-rule"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-accent-red">
                    UNIT {unit.slug}
                  </span>
                  <span className="font-chinese text-sm font-bold text-ink group-hover:text-accent-blue transition-colors">
                    {unit.hanzi}
                  </span>
                </div>
                <h5 className="font-bold text-sm text-ink group-hover:text-accent-red transition-colors line-clamp-1">
                  {unit.title}
                </h5>
                <p className="text-[11px] text-muted line-clamp-1">
                  {unit.translation}
                </p>
                <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-muted">
                  <span>{unit.vocabCount} kosakata</span>
                  <span>± {unit.durationMinutes} mnt</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Banner Penutup & Ajakan Bertindak (Constructivist CTA Block) */}
      <section className="border-2 border-ink bg-ink text-canvas p-8 sm:p-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-yellow font-bold block">
              MULAI SEKARANG JUGA
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-canvas">
              Siap Mulai Belajar Bahasa Mandarin Bersama KepoMandarin
            </h2>
            <p className="text-xs sm:text-sm text-canvas/80 leading-relaxed">
              Coba langsung materi dan latihan soal tanpa harus mendaftar, atau buat akun gratis untuk menyimpan progres belajarmu secara permanen.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/?view=dashboard"
              className="bg-canvas text-ink hover:bg-white font-mono text-xs uppercase tracking-wider px-6 py-4 font-bold text-center transition-colors block"
            >
              Masuk ke Dasbor Belajar →
            </Link>
            <Link
              href="/register"
              className="border border-canvas/40 hover:border-canvas text-canvas font-mono text-xs uppercase tracking-wider px-6 py-4 font-semibold text-center transition-colors block"
            >
              Daftar Akun Baru
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
