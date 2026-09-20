import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { getModuleById, getModuleUnit } from "./curriculum-modules";

export type Curriculum = Database["public"]["Tables"]["curriculums"]["Row"];
export type CurriculumLevel = Database["public"]["Tables"]["levels"]["Row"];

export const DEFAULT_CURRICULUM: Curriculum = {
  id: "curriculum-hsk-std",
  code: "HSK",
  title: "Kurikulum Standar HSK",
  description:
    "Sistem standarisasi kemahiran bahasa Mandarin internasional untuk pembelajar non-penutur asli.",
  total_levels: 5,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const DEFAULT_LEVELS: CurriculumLevel[] = [
  {
    id: "level-hsk-1",
    curriculum_id: "curriculum-hsk-std",
    level_number: 1,
    code: "HSK 1",
    name: "Tingkat Dasar I",
    vocab_target: 150,
    target_focus: "Fondasi Percakapan & Pengenalan Nada",
    description:
      "Memahami dan menggunakan frasa serta kalimat sederhana untuk kebutuhan komunikasi konkrit sehari-hari.",
    is_active: true,
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "level-hsk-2",
    curriculum_id: "curriculum-hsk-std",
    level_number: 2,
    code: "HSK 2",
    name: "Tingkat Dasar II",
    vocab_target: 300,
    target_focus: "Aktivitas Harian & Arah",
    description:
      "Memperluas percakapan dasar, ungkapan perbandingan, penunjuk arah, dan situasi umum di tempat publik.",
    is_active: true,
    order_index: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "level-hsk-3",
    curriculum_id: "curriculum-hsk-std",
    level_number: 3,
    code: "HSK 3",
    name: "Tingkat Menengah I",
    vocab_target: 600,
    target_focus: "Komunikasi Mandiri",
    description:
      "Mampu berkomunikasi secara lancar dalam kehidupan akademis, pekerjaan, dan perjalanan santai.",
    is_active: true,
    order_index: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "level-hsk-4",
    curriculum_id: "curriculum-hsk-std",
    level_number: 4,
    code: "HSK 4",
    name: "Tingkat Menengah II",
    vocab_target: 1200,
    target_focus: "Wacana Konseptual",
    description:
      "Membahas berbagai topik sosial, berdiskusi mendalam, serta memahami bacaan naratif dan penjelasan abstrak.",
    is_active: true,
    order_index: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "level-hsk-5",
    curriculum_id: "curriculum-hsk-std",
    level_number: 5,
    code: "HSK 5",
    name: "Tingkat Mahir",
    vocab_target: 2500,
    target_focus: "Literasi Komprehensif",
    description:
      "Membaca koran dan majalah berbahasa Mandarin, menikmati film tanpa takarir, dan menyusun pidato terstruktur.",
    is_active: true,
    order_index: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export type Lesson = Database["public"]["Tables"]["lessons"]["Row"];

export const DEFAULT_LESSONS: Lesson[] = (() => {
  const hsk1 = getModuleById("hsk1");
  if (!hsk1 || !hsk1.units || hsk1.units.length === 0) {
    return [];
  }
  return hsk1.units.map((u, index) => {
    const full = getModuleUnit("hsk1", u.slug);
    return {
      id: `lesson-hsk1-${u.slug}`,
      level_id: "level-hsk-1",
      lesson_number: index + 1,
      slug: u.slug,
      title: u.title,
      hanzi: u.hanzi,
      pinyin: u.pinyin,
      translation: u.translation,
      objectives: u.objectives,
      overview: u.overview,
      grammar_focus: (full?.grammarRules || []) as unknown as Database["public"]["Tables"]["lessons"]["Row"]["grammar_focus"],
      dialogue_specimen: (full?.dialogue || []) as unknown as Database["public"]["Tables"]["lessons"]["Row"]["dialogue_specimen"],
      vocab_count: u.vocabCount,
      duration_minutes: u.durationMinutes,
      order_index: index + 1,
      is_published: true,
      created_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-01-01T00:00:00Z",
    };
  });
})();

export interface GrammarFocusItem {
  ruleTitle: string;
  explanation: string;
  example: string;
}

export interface DialogueSpecimenItem {
  speaker: string;
  hanzi: string;
  pinyin: string;
  translation: string;
}

export function parseGrammarFocus(grammarFocusJson: unknown): GrammarFocusItem[] {
  if (Array.isArray(grammarFocusJson)) {
    return grammarFocusJson as GrammarFocusItem[];
  }
  return [];
}

export function parseDialogueSpecimen(dialogueSpecimenJson: unknown): DialogueSpecimenItem[] {
  if (Array.isArray(dialogueSpecimenJson)) {
    return dialogueSpecimenJson as DialogueSpecimenItem[];
  }
  return [];
}

/**
 * Mengambil data kurikulum dari Supabase atau fallback ke data statis
 */
export async function getCurriculumData(code = "HSK"): Promise<Curriculum> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("curriculums")
      .select("*")
      .eq("code", code)
      .maybeSingle();

    if (!error && data) {
      return data;
    }
  } catch {
    // Gunakan data default jika koneksi gagal atau tabel belum siap
  }
  return DEFAULT_CURRICULUM;
}

/**
 * Mengambil daftar tingkatan level dari Supabase atau fallback ke data statis
 */
export async function getCurriculumLevels(): Promise<CurriculumLevel[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("levels")
      .select("*")
      .order("order_index", { ascending: true });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch {
    // Gunakan data default jika koneksi gagal atau tabel belum siap
  }
  return DEFAULT_LEVELS;
}

/**
 * Mengambil daftar pelajaran berdasarkan level_id atau fallback ke data statis
 */
export async function getLessonsByLevel(levelId?: string): Promise<Lesson[]> {
  try {
    const supabase = createClient();
    let query = supabase
      .from("lessons")
      .select("*")
      .order("order_index", { ascending: true });
    if (levelId) {
      query = query.eq("level_id", levelId);
    }
    const { data, error } = await query;

    if (!error && data && data.length > 0) {
      if (data.length >= DEFAULT_LESSONS.length) {
        return data;
      }
      // Jika database masih berisi sebagian data awal (misal migrasi 12 unit belum dieksekusi di cloud),
      // satukan data yang sudah ada dengan unit pelengkap dari DEFAULT_LESSONS
      const existingSlugs = new Set(data.map((l) => l.slug));
      const missing = DEFAULT_LESSONS.filter((l) => !existingSlugs.has(l.slug));
      return [...data, ...missing].sort((a, b) => a.order_index - b.order_index);
    }
  } catch {
    // Gunakan data default jika koneksi gagal atau tabel belum siap
  }
  return DEFAULT_LESSONS;
}

/**
 * Mengambil detail pelajaran berdasarkan slug (misal: "01", "02")
 */
export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (!error && data) {
      return data;
    }
  } catch {
    // Gunakan data default jika koneksi gagal atau tabel belum siap
  }
  return DEFAULT_LESSONS.find((l) => l.slug === slug) ?? null;
}

export type VocabularyItem = Database["public"]["Tables"]["vocabulary"]["Row"];

/**
 * Mengambil daftar kosakata berdasarkan lesson_id
 */
export async function getVocabularyByLesson(lessonId: string): Promise<VocabularyItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("vocabulary")
      .select("*")
      .eq("lesson_id", lessonId)
      .order("order_index", { ascending: true });

    if (!error && data) {
      return data;
    }
  } catch {
    // Abaikan kegagalan jaringan
  }
  return [];
}

/**
 * Mengambil daftar kosakata berdasarkan level_id
 */
export async function getVocabularyByLevel(levelId: string): Promise<VocabularyItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("vocabulary")
      .select("*")
      .eq("level_id", levelId)
      .order("order_index", { ascending: true });

    if (!error && data) {
      return data;
    }
  } catch {
    // Abaikan kegagalan jaringan
  }
  return [];
}
