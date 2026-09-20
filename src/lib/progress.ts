import { createClient } from "@/lib/supabase/client";
import { practiceAttemptInputSchema } from "@/lib/validations/schemas";
import { fetchSavedPhrases } from "@/lib/phrasebook";
import { fetchErrorEntries } from "@/lib/journal";

export interface LessonProgress {
  lessonSlug: string;
  isCompleted: boolean;
  completedAt?: string;
  practiceScore?: number;
  practiceAccuracy?: number;
}

export interface PracticeAttempt {
  lessonSlug: string;
  score: number;
  total: number;
  accuracy: number;
  completedAt: string;
}

export interface ErrorCategoryStat {
  category: string;
  count: number;
  percent: number;
}

export interface StudyMetrics {
  completedLessonsCount: number;
  totalLessonsCount: number;
  completedLessonSlugs: string[];
  averageAccuracy: number | null;
  totalPhrasesSaved: number;
  reviewedVocabularyCount: number;
  totalVocabularyInCurriculum: number;
  unresolvedErrorsCount: number;
  hsk1MasteryPercent: number;
  errorCategoryBreakdown: ErrorCategoryStat[];
}

const LOCAL_STORAGE_KEY = "mandarin_lab_progress";

function getLocalProgress(): Record<string, LessonProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, LessonProgress>) : {};
  } catch (err) {
    console.error("Gagal membaca progres dari localStorage:", err);
    return {};
  }
}

function saveLocalProgress(data: Record<string, LessonProgress>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Gagal menyimpan progres ke localStorage:", err);
  }
}

/**
 * Mengambil status penyelesaian per unit pelajaran.
 */
export async function fetchUserProgress(
  userId?: string | null
): Promise<Record<string, LessonProgress>> {
  const localData = getLocalProgress();

  if (userId) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", userId);

      if (!error && data) {
        const cloudMap: Record<string, LessonProgress> = {};
        for (const row of data) {
          cloudMap[row.lesson_slug] = {
            lessonSlug: row.lesson_slug,
            isCompleted: row.is_completed,
            completedAt: row.completed_at,
            practiceScore: row.practice_score,
            practiceAccuracy: row.practice_accuracy,
          };
        }
        // Gabungkan dengan data lokal
        return { ...localData, ...cloudMap };
      }
    } catch (e) {
      console.warn("Gagal mengambil user_progress dari Supabase, fallback lokal:", e);
    }
  }

  return localData;
}

/**
 * Beralih status penyelesaian unit pelajaran (Tandai Selesai / Batalkan).
 */
export async function toggleLessonProgress(
  lessonSlug: string,
  userId?: string | null
): Promise<boolean> {
  const currentMap = getLocalProgress();
  const currentStatus = !!currentMap[lessonSlug]?.isCompleted;
  const nextStatus = !currentStatus;

  // Update local
  currentMap[lessonSlug] = {
    lessonSlug,
    isCompleted: nextStatus,
    completedAt: nextStatus ? new Date().toISOString() : undefined,
    practiceScore: currentMap[lessonSlug]?.practiceScore ?? 0,
    practiceAccuracy: currentMap[lessonSlug]?.practiceAccuracy ?? 0,
  };
  saveLocalProgress(currentMap);

  if (userId) {
    try {
      const supabase = createClient();
      const { error } = await supabase.from("user_progress").upsert(
        {
          user_id: userId,
          lesson_slug: lessonSlug,
          is_completed: nextStatus,
          completed_at: nextStatus ? new Date().toISOString() : new Date(0).toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id, lesson_slug" }
      );

      if (error) {
        console.warn("Gagal update progres di Supabase:", error);
      }
    } catch (e) {
      console.warn("Koneksi Supabase gagal saat toggle progres:", e);
    }
  }

  return nextStatus;
}

/**
 * Menyimpan hasil attempt pengerjaan sesi latihan (Task 4.5).
 */
export async function recordPracticeAttempt(
  data: {
    lessonSlug?: string | null;
    score: number;
    total: number;
    accuracy: number;
  },
  userId?: string | null
): Promise<void> {
  const slug = data.lessonSlug || "all";
  const completedAt = new Date().toISOString();

  // Validasi data latihan menggunakan Zod
  const validated = practiceAttemptInputSchema.parse({
    lessonSlug: slug,
    score: data.score,
    total: data.total,
    accuracy: data.accuracy,
  });

  // 1. Perbarui local progress map
  const currentMap = getLocalProgress();
  const existing = currentMap[slug] || {
    lessonSlug: slug,
    isCompleted: false,
  };

  currentMap[slug] = {
    ...existing,
    practiceScore: validated.score,
    practiceAccuracy: validated.accuracy,
    completedAt,
  };
  saveLocalProgress(currentMap);

  // 2. Simpan ke log riwayat attempt di localStorage
  if (typeof window !== "undefined") {
    try {
      const attemptsRaw = localStorage.getItem("mandarin_lab_practice_attempts");
      const attempts: PracticeAttempt[] = attemptsRaw ? JSON.parse(attemptsRaw) : [];
      attempts.unshift({
        lessonSlug: slug,
        score: data.score,
        total: data.total,
        accuracy: data.accuracy,
        completedAt,
      });
      localStorage.setItem(
        "mandarin_lab_practice_attempts",
        JSON.stringify(attempts.slice(0, 50))
      );
    } catch (e) {
      console.error("Gagal mencatat attempt log ke localStorage:", e);
    }
  }

  // 3. Jika pengguna terautentikasi dan unit adalah 01 s.d. 05, simpan ke Supabase user_progress
  if (userId && slug !== "all") {
    try {
      const supabase = createClient();
      await supabase.from("user_progress").upsert(
        {
          user_id: userId,
          lesson_slug: slug,
          practice_score: data.score,
          practice_accuracy: data.accuracy,
          updated_at: completedAt,
        },
        { onConflict: "user_id, lesson_slug" }
      );
    } catch (e) {
      console.warn("Gagal menyimpan exercise attempt ke Supabase:", e);
    }
  }
}

/**
 * Menghitung metrik analitik perkembangan belajar gabungan.
 */
export async function fetchStudyMetrics(userId?: string | null): Promise<StudyMetrics> {
  const [progressMap, savedPhrases, errorEntries] = await Promise.all([
    fetchUserProgress(userId),
    fetchSavedPhrases(userId),
    fetchErrorEntries(userId),
  ]);

  const totalLessonsCount = 12;
  const completedLessonSlugs = Object.values(progressMap)
    .filter((p) => p.isCompleted)
    .map((p) => p.lessonSlug);

  const completedLessonsCount = completedLessonSlugs.length;

  // Hitung rata-rata akurasi jika ada pengerjaan
  const scoredLessons = Object.values(progressMap).filter(
    (p) => typeof p.practiceAccuracy === "number" && p.practiceAccuracy > 0
  );
  const averageAccuracy =
    scoredLessons.length > 0
      ? Math.round(
          scoredLessons.reduce((acc, curr) => acc + (curr.practiceAccuracy ?? 0), 0) /
            scoredLessons.length
        )
      : null;

  const totalPhrasesSaved = savedPhrases.length;
  const unresolvedErrorsCount = errorEntries.filter((e) => !e.is_resolved).length;

  // Rumus penguasaan objektif HSK 1:
  // 12 unit bernilai masing-masing ~6.67% (maks 80%), frasa tersimpan berkontribusi s.d. 20%
  const lessonContribution = (completedLessonsCount / totalLessonsCount) * 80;
  const phraseContribution = Math.min(20, totalPhrasesSaved * 2);
  const hsk1MasteryPercent = Math.min(100, Math.round(lessonContribution + phraseContribution));

  // Hitung jumlah kosakata yang telah ditinjau (150 Kosakata HSK 1)
  const LESSON_VOCAB_MAP: Record<string, number> = {
    "01": 10,
    "02": 15,
    "03": 12,
    "04": 14,
    "05": 12,
    "06": 12,
    "07": 12,
    "08": 12,
    "09": 11,
    "10": 10,
    "11": 14,
    "12": 16,
  };
  const totalVocabularyInCurriculum = 150;

  let vocabFromLessons = 0;
  for (const slug of completedLessonSlugs) {
    vocabFromLessons += LESSON_VOCAB_MAP[slug] || 0;
  }
  const reviewedVocabularyCount = Math.min(
    totalVocabularyInCurriculum,
    vocabFromLessons + Math.min(totalPhrasesSaved, totalVocabularyInCurriculum - vocabFromLessons)
  );

  // Hitung sebaran kategori kesalahan umum (Task 7.5)
  const categoryCounts: Record<string, number> = {};
  for (const entry of errorEntries) {
    const cat = entry.category || "Lainnya";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  }

  const totalErrors = errorEntries.length;
  const errorCategoryBreakdown: ErrorCategoryStat[] = Object.entries(categoryCounts)
    .map(([category, count]) => ({
      category,
      count,
      percent: totalErrors > 0 ? Math.round((count / totalErrors) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    completedLessonsCount,
    totalLessonsCount,
    completedLessonSlugs,
    averageAccuracy,
    totalPhrasesSaved,
    reviewedVocabularyCount,
    totalVocabularyInCurriculum,
    unresolvedErrorsCount,
    hsk1MasteryPercent,
    errorCategoryBreakdown,
  };
}
