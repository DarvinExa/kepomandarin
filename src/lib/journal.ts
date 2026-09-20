import { createClient } from "@/lib/supabase/client";
import { errorEntryInputSchema } from "@/lib/validations/schemas";

export interface ErrorEntry {
  id: string;
  user_id?: string;
  exercise_id?: string | null;
  hanzi: string;
  pinyin: string;
  translation: string;
  category: string;
  error_context?: string | null;
  notes?: string | null;
  is_resolved: boolean;
  created_at: string;
  updated_at?: string;
}

const LOCAL_STORAGE_KEY = "mandarin_lab_error_entries";

export const ERROR_CATEGORIES = [
  "Semua",
  "Pendengaran",
  "Nada",
  "Urutan Kata",
  "Tata Bahasa",
  "Kosakata",
  "Pinyin",
  "Lainnya",
] as const;

function getFromLocalStorage(): ErrorEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ErrorEntry[]) : [];
  } catch (err) {
    console.error("Gagal membaca error journal dari localStorage:", err);
    return [];
  }
}

function saveToLocalStorage(entries: ErrorEntry[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
  } catch (err) {
    console.error("Gagal menyimpan error journal ke localStorage:", err);
  }
}

/**
 * Mengambil daftar catatan kesalahan pengguna (dengan batas aman maksimal 50 baris).
 * Jika login, mengambil dari tabel `error_entries` Supabase.
 * Jika mode tamu, mengambil dari localStorage.
 */
export async function fetchErrorEntries(userId?: string | null): Promise<ErrorEntry[]> {
  if (userId) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("error_entries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (!error && data) {
        return data as ErrorEntry[];
      }
      console.warn("Supabase query error_entries gagal, menggunakan fallback lokal:", error);
    } catch (e) {
      console.warn("Koneksi Supabase gagal, fallback lokal:", e);
    }
  }

  return getFromLocalStorage();
}

/**
 * Menyimpan catatan kesalahan baru dengan validasi skema input.
 */
export async function addErrorEntry(
  item: Omit<ErrorEntry, "id" | "created_at" | "is_resolved"> & { is_resolved?: boolean },
  userId?: string | null
): Promise<ErrorEntry> {
  // Validasi data masukan menggunakan Zod
  const validated = errorEntryInputSchema.parse({
    exercise_id: item.exercise_id ?? null,
    hanzi: item.hanzi,
    pinyin: item.pinyin,
    translation: item.translation,
    category: item.category,
    error_context: item.error_context,
    notes: item.notes,
    is_resolved: item.is_resolved ?? false,
  });

  const newEntry: ErrorEntry = {
    id: `local_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    user_id: userId ?? undefined,
    exercise_id: validated.exercise_id ?? null,
    hanzi: validated.hanzi,
    pinyin: validated.pinyin,
    translation: validated.translation,
    category: validated.category,
    error_context: validated.error_context ?? null,
    notes: validated.notes ?? null,
    is_resolved: validated.is_resolved,
    created_at: new Date().toISOString(),
  };

  if (userId) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("error_entries")
        .insert({
          user_id: userId,
          exercise_id: newEntry.exercise_id,
          hanzi: newEntry.hanzi,
          pinyin: newEntry.pinyin,
          translation: newEntry.translation,
          category: newEntry.category,
          error_context: newEntry.error_context,
          notes: newEntry.notes,
          is_resolved: newEntry.is_resolved,
        })
        .select()
        .single();

      if (!error && data) {
        return data as ErrorEntry;
      }
      console.warn("Gagal menyimpan ke Supabase, simpan ke lokal:", error);
    } catch (e) {
      console.warn("Gagal terhubung ke Supabase:", e);
    }
  }

  // Simpan ke localStorage untuk mode tamu atau fallback offline
  const localList = getFromLocalStorage();
  const updated = [newEntry, ...localList];
  saveToLocalStorage(updated);
  return newEntry;
}

/**
 * Mengubah status pemahaman (sudah dipahami / belum).
 */
export async function toggleErrorEntryResolved(
  id: string,
  currentResolved: boolean,
  userId?: string | null
): Promise<boolean> {
  const nextResolved = !currentResolved;

  if (userId && !id.startsWith("local_")) {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("error_entries")
        .update({ is_resolved: nextResolved, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) {
        console.error("Gagal update status di Supabase:", error);
      }
    } catch (e) {
      console.error("Gagal terhubung ke Supabase:", e);
    }
  }

  // Perbarui juga di localStorage
  const localList = getFromLocalStorage();
  const updated = localList.map((entry) =>
    entry.id === id ? { ...entry, is_resolved: nextResolved } : entry
  );
  saveToLocalStorage(updated);
  return nextResolved;
}

/**
 * Menghapus catatan kesalahan dari database atau penyimpanan lokal.
 */
export async function removeErrorEntry(id: string, userId?: string | null): Promise<boolean> {
  if (userId && !id.startsWith("local_")) {
    try {
      const supabase = createClient();
      const { error } = await supabase.from("error_entries").delete().eq("id", id);
      if (error) {
        console.error("Gagal hapus di Supabase:", error);
      }
    } catch (e) {
      console.error("Gagal terhubung ke Supabase:", e);
    }
  }

  const localList = getFromLocalStorage();
  const updated = localList.filter((entry) => entry.id !== id);
  saveToLocalStorage(updated);
  return true;
}
