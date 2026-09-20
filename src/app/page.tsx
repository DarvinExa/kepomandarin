import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getModuleById, getModuleUnit } from "@/lib/curriculum-modules";
import { LearnerDashboard } from "@/components/dashboard/LearnerDashboard";
import { PublicLandingPage } from "@/components/landing/PublicLandingPage";

export const metadata: Metadata = {
  title: "KepoMandarin | Belajar Mandarin Buat Si Kepo",
  description:
    "Belajar Mandarin buat si kepo: platform belajar bahasa Mandarin berbasis konteks kalimat sehari-hari dan kurikulum HSK 1 yang tenang, fokus, dan teratur.",
};

interface HomePageProps {
  searchParams: Promise<{ view?: string }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { view } = await searchParams;

  // Jika pengunjung belum login dan tidak meminta tampilan dasbor secara eksplisit, tampilkan Landing Page
  if (!user && view !== "dashboard") {
    return <PublicLandingPage />;
  }

  // Jika sudah login atau tamu meminta tampilan dasbor (?view=dashboard)
  const hsk1Module = getModuleById("hsk1");
  const hsk1Units = hsk1Module?.units ?? [];
  const totalLessons = hsk1Units.length || 12;
  const totalVocabInCurriculum =
    hsk1Units.reduce((acc, u) => acc + (u.vocabCount || 0), 0) || 150;

  let learnerName = "Pembelajar";
  let completedLessonsCount = 0;
  let recentAccuracy: number | null = null;
  let nextLessonSlug = "01";

  if (user) {
    learnerName =
      (user.user_metadata?.full_name as string) ||
      user.email?.split("@")[0] ||
      "Pembelajar";

    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

      if (profile?.full_name) {
        learnerName = profile.full_name;
      }
    } catch {
      // Abaikan bila tabel profil belum siap
    }

    try {
      const { data: progressRows } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id);

      if (progressRows && progressRows.length > 0) {
        const completedSlugs = new Set(
          progressRows.filter((r) => r.is_completed).map((r) => r.lesson_slug)
        );
        completedLessonsCount = completedSlugs.size;

        // Cari unit pertama yang belum selesai (01 s.d. 12)
        for (const unit of hsk1Units) {
          if (!completedSlugs.has(unit.slug)) {
            nextLessonSlug = unit.slug;
            break;
          }
        }

        const scored = progressRows.filter((r) => r.practice_accuracy > 0);
        if (scored.length > 0) {
          recentAccuracy = Math.round(
            scored.reduce((acc, cur) => acc + Number(cur.practice_accuracy), 0) /
              scored.length
          );
        }
      }
    } catch {
      // Abaikan bila belum ada data
    }
  }

  const isGuest = !user;
  const progressPercent = Math.min(
    100,
    Math.round((completedLessonsCount / totalLessons) * 100)
  );

  const currentUnitDetail =
    getModuleUnit("hsk1", nextLessonSlug) ||
    getModuleUnit("hsk1", "01");

  const currentLesson = {
    title: currentUnitDetail?.title ?? "Sapaan Sopan",
    hanzi: currentUnitDetail?.hanzi ?? "问候",
    pinyin: currentUnitDetail?.pinyin ?? "Wènhòu",
    translation:
      currentUnitDetail?.translation ?? "Sapaan Sehari-hari & Penutupan Percakapan",
    objective:
      currentUnitDetail?.objectives ??
      "Meletakkan fondasi etika komunikasi berbahasa Mandarin, aturan sandhi nada ke-3, serta ucapan perpisahan santun.",
  };

  return (
    <LearnerDashboard
      userId={user?.id}
      learnerName={learnerName}
      isGuest={isGuest}
      completedLessonsCount={completedLessonsCount}
      totalLessons={totalLessons}
      totalVocabInCurriculum={totalVocabInCurriculum}
      progressPercent={progressPercent}
      recentAccuracy={recentAccuracy}
      nextLessonSlug={nextLessonSlug}
      currentLesson={currentLesson}
    />
  );
}
