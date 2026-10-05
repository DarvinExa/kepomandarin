import Link from "next/link";
import { getModuleById } from "@/lib/curriculum-modules";
import { AppIcon } from "@/components/ui/AppIcon";

const featureCards = [
  {
    image: "/images/mascot-thinking.png",
    title: "Konteks kalimat utuh",
    text: "Setiap kosakata disajikan dalam Hanzi, pinyin bernada, dan terjemahan Indonesia agar pengguna memahami cara pakainya.",
  },
  {
    image: "/images/mascot-studying.png",
    title: "Nada dan pelafalan",
    text: "Visualisasi empat nada, latihan audio, dan panduan pelafalan membantu pemula membangun dasar yang tepat.",
  },
  {
    image: "/images/mascot-correct.png",
    title: "Jurnal kesalahan",
    text: "Jawaban yang keliru dicatat agar pengguna dapat meninjau pola kelemahan dan berlatih kembali.",
  },
];

const modules = [
  ["01", "Kurikulum HSK 1", "12 unit pembelajaran dengan 150 kosakata standar.", "/hsk"],
  ["02", "Latihan mendengar", "Latihan bunyi, vokal sengau, dan kontur nada.", "/listening"],
  ["03", "Pelatih nada dan sandhi", "Panduan perubahan nada dalam percakapan.", "/tone-coach"],
  ["04", "Buku frasa", "Koleksi frasa dan kosakata pilihan pengguna.", "/phrasebook"],
];

export function PublicLandingPage() {
  const units = getModuleById("hsk1")?.units ?? [];

  return (
    <div className="km-public-landing">
      <header className="km-landing-header km-landing-wrap">
        <Link href="/" aria-label="KepoMandarin">
          <img src="/images/logo-text.png" alt="KepoMandarin" />
        </Link>
        <nav aria-label="Akun">
          <Link href="/login" className="km-btn">Masuk</Link>
          <Link href="/register" className="km-btn km-btn-primary">Daftar gratis</Link>
        </nav>
      </header>

      <main>
        <section className="km-hero km-landing-wrap">
          <div className="km-hero-copy">
            <small>Belajar Mandarin buat si kepo</small>
            <h1>Mandarin jadi lebih mudah dipahami.</h1>
            <p>Belajar bahasa Mandarin melalui konteks kalimat sehari-hari, audio, panduan nada, dan kurikulum HSK yang tersusun bertahap.</p>
            <div className="km-hero-actions">
              <Link href="/?view=dashboard" className="km-btn km-btn-primary">Mulai belajar gratis <AppIcon name="arrow" /></Link>
              <Link href="/register" className="km-btn">Buat akun</Link>
            </div>
          </div>
          <div className="km-hero-art">
            <img src="/images/logo.png" alt="Maskot KepoMandarin" />
            <div className="km-float-card one"><small>Latihan nada</small><strong>mā · má · mǎ · mà</strong></div>
            <div className="km-float-card two"><small>Kurikulum aktif</small><strong>HSK 1 sampai 5</strong></div>
          </div>
        </section>

        <section className="km-value-strip">
          <div className="km-value-grid km-landing-wrap">
            <div className="km-value"><span>150</span><div><strong>150+ kata</strong><small>Silabus standar HSK 1</small></div></div>
            <div className="km-value"><span>3</span><div><strong>Tri-format</strong><small>Hanzi, pinyin, dan arti</small></div></div>
            <div className="km-value"><span>12</span><div><strong>12 unit</strong><small>Belajar secara bertahap</small></div></div>
          </div>
        </section>

        <section className="km-landing-section km-landing-wrap">
          <div className="km-section-head">
            <small>Metode KepoMandarin</small>
            <h2>Belajar yang terasa ringan dan terarah</h2>
            <p>Materi tetap lengkap, tetapi disusun menjadi langkah kecil agar pengguna tahu apa yang perlu dipelajari berikutnya.</p>
          </div>
          <div className="km-feature-grid">
            {featureCards.map((feature) => (
              <article className="km-feature-card" key={feature.title}>
                <img src={feature.image} alt="" />
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="km-landing-section km-modules">
          <div className="km-landing-wrap">
            <div className="km-section-head">
              <small>Fitur pembelajaran</small>
              <h2>Semua alat belajar dalam satu tempat</h2>
              <p>Gunakan materi HSK, latihan mendengar, pelatih nada, dan buku frasa sesuai kebutuhan.</p>
            </div>
            <div className="km-module-list">
              {modules.map(([number, title, text, href]) => (
                <article className="km-module-row" key={number}>
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                  <Link href={href}>Buka <AppIcon name="arrow" className="inline-block h-4 w-4 ml-1" /></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="km-landing-section km-landing-wrap">
          <div className="km-section-head">
            <small>Silabus HSK 1</small>
            <h2>Mulai dari percakapan yang berguna</h2>
            <p>Seluruh unit lama tetap tersedia dengan materi, kosakata, dan tujuan belajar yang sama.</p>
          </div>
          <div className="km-module-list">
            {units.map((unit) => (
              <article className="km-module-row" key={unit.id}>
                <span>{unit.slug}</span>
                <div>
                  <h3>{unit.title} <span className="font-chinese">{unit.hanzi}</span></h3>
                  <p>{unit.translation}</p>
                </div>
                <Link href={`/lessons/hsk1/${unit.slug}`}>Pelajari <AppIcon name="arrow" className="inline-block h-4 w-4 ml-1" /></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="km-landing-cta">
          <div>
            <h2>Mulai pelajaran pertama hari ini.</h2>
            <p>Semua materi dapat dibuka dalam mode tamu. Buat akun jika ingin menyimpan progres dan hasil latihan.</p>
            <Link href="/?view=dashboard" className="km-btn">Mulai belajar <AppIcon name="arrow" /></Link>
          </div>
          <img src="/images/mascot-celebrating.png" alt="" />
        </section>
      </main>

      <footer className="km-landing-footer">
        <div className="km-landing-wrap">
          <img src="/images/logo-text.png" alt="KepoMandarin" />
          <p>Belajar Mandarin melalui konteks, audio, dan kurikulum HSK.</p>
        </div>
      </footer>
    </div>
  );
}