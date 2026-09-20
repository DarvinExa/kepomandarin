import { z } from "zod";

/**
 * Skema validasi masukan penyimpanan frasa pribadi (Saved Phrase).
 * Menjamin batasan panjang teks dan mencegah payload berukuran raksasa.
 */
export const savedPhraseInputSchema = z.object({
  vocabulary_id: z.string().uuid().nullable().optional(),
  hanzi: z.string().trim().min(1, "Karakter Hanzi tidak boleh kosong").max(100, "Hanzi maksimal 100 karakter"),
  pinyin: z.string().trim().min(1, "Pinyin tidak boleh kosong").max(150, "Pinyin maksimal 150 karakter"),
  translation: z.string().trim().min(1, "Terjemahan tidak boleh kosong").max(300, "Terjemahan maksimal 300 karakter"),
  category: z.string().trim().max(50, "Kategori maksimal 50 karakter").default("Umum"),
  notes: z.string().trim().max(500, "Catatan maksimal 500 karakter").nullable().optional(),
});

export type SavedPhraseInput = z.infer<typeof savedPhraseInputSchema>;

/**
 * Skema validasi masukan catatan kesalahan belajar (Error Entry).
 */
export const errorEntryInputSchema = z.object({
  exercise_id: z.string().uuid().nullable().optional(),
  hanzi: z.string().trim().min(1, "Karakter Hanzi tidak boleh kosong").max(100, "Hanzi maksimal 100 karakter"),
  pinyin: z.string().trim().min(1, "Pinyin tidak boleh kosong").max(150, "Pinyin maksimal 150 karakter"),
  translation: z.string().trim().min(1, "Terjemahan tidak boleh kosong").max(300, "Terjemahan maksimal 300 karakter"),
  category: z.string().trim().max(50, "Kategori maksimal 50 karakter").default("Umum"),
  error_context: z.string().trim().max(500, "Konteks kesalahan maksimal 500 karakter").nullable().optional(),
  notes: z.string().trim().max(500, "Catatan maksimal 500 karakter").nullable().optional(),
  is_resolved: z.boolean().default(false),
});

export type ErrorEntryInput = z.infer<typeof errorEntryInputSchema>;

/**
 * Skema validasi masukan pencatatan progres hasil latihan (Practice Attempt).
 */
export const practiceAttemptInputSchema = z.object({
  lessonSlug: z.string().trim().min(1).max(20),
  score: z.number().int().min(0, "Skor minimal bernilai 0").max(1000, "Skor melebihi batas wajar"),
  total: z.number().int().min(1, "Total soal minimal 1").max(1000, "Total soal melebihi batas wajar"),
  accuracy: z.number().min(0, "Akurasi minimal 0%").max(100, "Akurasi maksimal 100%"),
});

export type PracticeAttemptInput = z.infer<typeof practiceAttemptInputSchema>;

/**
 * Skema validasi preferensi belajar pengguna (User Settings).
 */
export const userSettingsInputSchema = z.object({
  daily_goal_vocab: z.number().int().min(1, "Target minimal 1 kata").max(100, "Target maksimal 100 kata per hari"),
  show_pinyin: z.boolean(),
  show_tone_marks: z.boolean(),
});

export type UserSettingsInput = z.infer<typeof userSettingsInputSchema>;
