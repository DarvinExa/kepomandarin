import type { KepoMandarinData, LessonNode, LessonState } from "@/types/kepo";
import { DEFAULT_LESSONS, type Lesson } from "@/lib/curriculum";
import type { StudyMetrics } from "@/lib/progress";

export interface UserProfileInput {
  name?: string | null;
  email?: string | null;
  level?: string;
}

/**
 * Adapter untuk mengubah data internal KepoMandarin (Supabase Profile,
 * StudyMetrics, dan DEFAULT_LESSONS) menjadi format presentasi KepoMandarinData
 * pola Duolingo tanpa mengubah model atau database.
 */
export function adaptToKepoMandarinData(
  profile?: UserProfileInput | null,
  metrics?: Partial<StudyMetrics> | null,
  lessonsList: Lesson[] = DEFAULT_LESSONS
): KepoMandarinData {
  const completedSlugs = new Set(metrics?.completedLessonSlugs || []);
  const completedCount = metrics?.completedLessonsCount ?? completedSlugs.size;
  const totalCount = lessonsList.length || 12;

  let foundCurrent = false;

  const lessons: LessonNode[] = lessonsList.map((l, index) => {
    let state: LessonState = "locked";

    if (completedSlugs.has(l.slug)) {
      state = "complete";
    } else if (!foundCurrent) {
      // Pelajaran pertama yang belum selesai menjadi status aktif (current)
      state = "current";
      foundCurrent = true;
    } else if ((index + 1) % 4 === 0) {
      // Milestone review / hadiah setiap 4 unit
      state = "reward";
    } else {
      state = "locked";
    }

    return {
      id: l.id || `lesson-hsk1-${l.slug}`,
      title: `${l.lesson_number || index + 1}. ${l.title}`,
      state,
      href: `/lessons/hsk1/${l.slug}`,
    };
  });

  const xpEarned = completedCount * 45 + (metrics?.totalPhrasesSaved || 0) * 10;

  return {
    user: {
      name: profile?.name || "Pembelajar",
      level: profile?.level || "HSK 1",
      streak: completedCount > 0 ? 3 : 1,
      xp: xpEarned > 0 ? xpEarned : 50,
      hearts: 5,
      dailyMinutes: Math.min(completedCount * 12 + 5, 30),
      dailyTarget: 20,
    },
    unit: {
      eyebrow: "UNIT 1 · TINGKAT DASAR",
      title: "HSK 1: Fondasi Percakapan",
      description:
        "Kuasai salam, identitas, angka, dan tata bahasa esensial Mandarin penutur asli.",
      completed: completedCount,
      total: totalCount,
    },
    lessons,
    phraseOfTheDay: {
      hanzi: "你好！很高兴认识你。",
      pinyin: "Nǐ hǎo! Hěn gāoxìng rènshí nǐ.",
      meaning: "Halo! Senang berkenalan denganmu.",
    },
    quiz: {
      current: 1,
      total: 5,
      xp: 15,
      prompt: "Pilih terjemahan yang tepat untuk sapaan berikut:",
      phrase: {
        hanzi: "谢谢你",
        pinyin: "xiè xie nǐ",
        meaning: "Terima kasih",
      },
      choices: [
        { id: "c1", label: "Terima kasih", correct: true },
        { id: "c2", label: "Sama-sama", correct: false },
        { id: "c3", label: "Sampai jumpa", correct: false },
        { id: "c4", label: "Maaf", correct: false },
      ],
    },
  };
}
