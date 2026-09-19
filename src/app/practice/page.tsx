import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getLessonsByLevel } from "@/lib/curriculum";
import { getExercises } from "@/lib/practice";
import { PracticeEngine } from "@/components/practice/PracticeEngine";

interface PracticePageProps {
  searchParams: Promise<{
    mode?: string;
    lesson?: string;
  }>;
}

export default async function PracticePage({ searchParams }: PracticePageProps) {
  const { mode, lesson: lessonSlug } = await searchParams;

  const lessons = await getLessonsByLevel();
  const targetLesson = lessonSlug ? lessons.find((l) => l.slug === lessonSlug) : null;

  if (targetLesson) {
    redirect(`/lessons/hsk1/${targetLesson.slug}/practice`);
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const activeMode =
    mode === "multiple_choice" ||
    mode === "sentence_ordering" ||
    mode === "listening"
      ? mode
      : "all";

  const exercises = await getExercises({
    type: activeMode === "all" ? undefined : activeMode,
  });

  const pageTitle =
    activeMode === "multiple_choice"
      ? "Latihan Pilihan Ganda"
      : activeMode === "sentence_ordering"
      ? "Latihan Susun Kalimat"
      : activeMode === "listening"
      ? "Latihan Audio & Nada Mandarin"
      : "Latihan Soal HSK 1";

  const pageSubtitle =
    activeMode === "listening"
      ? "Latihan Mendengar Audio · HSK 1"
      : "Kurikulum HSK 1 · Tingkat Dasar";

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8 sm:space-y-10">
      {/* 1. Header Section */}
      <section className="border-b border-rule pb-6 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-blue" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            03 // LATIHAN SOAL
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/images/mascot-thinking.png"
              alt="Maskot Latihan Soal KepoMandarin"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain shrink-0"
            />
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-ink">
                Latihan Soal
              </h1>
              <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
                Uji pemahamanmu seputar susunan kalimat, pinyin, dan nada bahasa Mandarin langsung lewat konteks kalimat.
              </p>
            </div>
          </div>
          <div className="shrink-0 font-mono text-xs text-muted flex items-center gap-2">
            <span className="w-2 h-2 bg-status-success inline-block" />
            <span>{exercises.length} SOAL TERSEDIA</span>
          </div>
        </div>
      </section>

      {/* 2. Mode & Filter Controls */}
      <section className="space-y-4">
        {/* Filter Mode Latihan */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">
            Mode Latihan:
          </span>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/practice?${lessonSlug ? `lesson=${lessonSlug}` : ""}`}
              className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 border transition-colors ${
                activeMode === "all"
                  ? "bg-ink text-canvas border-ink font-semibold"
                  : "bg-paper text-ink border-rule hover:border-ink"
              }`}
            >
              Semua Mode
            </Link>
            <Link
              href={`/practice?mode=multiple_choice${lessonSlug ? `&lesson=${lessonSlug}` : ""}`}
              className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 border transition-colors ${
                activeMode === "multiple_choice"
                  ? "bg-ink text-canvas border-ink font-semibold"
                  : "bg-paper text-ink border-rule hover:border-ink"
              }`}
            >
              Pilihan Ganda
            </Link>
            <Link
              href={`/practice?mode=sentence_ordering${lessonSlug ? `&lesson=${lessonSlug}` : ""}`}
              className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 border transition-colors ${
                activeMode === "sentence_ordering"
                  ? "bg-ink text-canvas border-ink font-semibold"
                  : "bg-paper text-ink border-rule hover:border-ink"
              }`}
            >
              Susun Kalimat
            </Link>
            <Link
              href={`/practice?mode=listening${lessonSlug ? `&lesson=${lessonSlug}` : ""}`}
              className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 border transition-colors ${
                activeMode === "listening"
                  ? "bg-ink text-canvas border-ink font-semibold"
                  : "bg-paper text-ink border-rule hover:border-ink"
              }`}
            >
              Mendengar Audio
            </Link>
          </div>
        </div>

        {/* Filter Unit Pelajaran */}
        <div className="border border-rule bg-paper p-3 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted px-2">
            Pilihan Unit:
          </span>
          <Link
            href={`/practice?${activeMode !== "all" ? `mode=${activeMode}` : ""}`}
            className={`font-mono text-xs uppercase tracking-wider px-3 py-1 border transition-colors ${
              !lessonSlug
                ? "bg-accent-red text-canvas border-accent-red font-bold"
                : "border-rule text-ink hover:border-ink bg-canvas"
            }`}
          >
            Semua Unit
          </Link>
          {lessons.map((les) => (
            <Link
              key={les.id}
              href={`/practice?lesson=${les.slug}${
                activeMode !== "all" ? `&mode=${activeMode}` : ""
              }`}
              className={`font-mono text-xs uppercase tracking-wider px-3 py-1 border transition-colors ${
                lessonSlug === les.slug
                  ? "bg-accent-red text-canvas border-accent-red font-bold"
                  : "border-rule text-ink hover:border-ink bg-canvas"
              }`}
            >
              Unit {les.slug}
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Interactive Practice Engine */}
      <PracticeEngine
        key={`${activeMode}-${lessonSlug ?? "all"}`}
        initialExercises={exercises}
        title={pageTitle}
        subtitle={pageSubtitle}
        userId={user?.id}
        lessonSlug={undefined}
      />

      {/* 4. Information Box */}
      <section className="border border-rule bg-canvas p-6 sm:p-8 space-y-2">
        <span className="font-mono text-xs font-bold uppercase text-muted">
          Tips Belajar
        </span>
        <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-2xl">
          Setiap jawaban yang keliru akan disertai penjelasan tata bahasa atau nada. Kamu juga bisa menyimpannya ke{" "}
          <Link
            href="/error-journal"
            className="underline underline-offset-4 text-ink font-semibold hover:text-accent-red"
          >
            Jurnal Kesalahan
          </Link>{" "}
          agar bisa dipelajari lagi kapan saja.
        </p>
      </section>
    </div>
  );
}
