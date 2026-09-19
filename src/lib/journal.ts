import { createClient } from "@/lib/supabase/client";

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
 * Mengambil daftar catatan kesalahan pengguna.
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
        .order("created_at", { ascending: false });

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
 * Menyimpan catatan kesalahan baru (dari latihan atau input mandiri).
 */
export async function addErrorEntry(
  item: Omit<ErrorEntry, "id" | "created_at" | "is_resolved"> & { is_resolved?: boolean },
  userId?: string | null
): Promise<ErrorEntry> {
  const newEntry: ErrorEntry = {
    id: `local_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    user_id: userId ?? undefined,
    exercise_id: item.exercise_id ?? null,
    hanzi: item.hanzi.trim(),
    pinyin: item.pinyin.trim(),
    translation: item.translation.trim(),
    category: item.category || "Umum",
    error_context: item.error_context?.trim() || null,
    notes: item.notes?.trim() || null,
    is_resolved: item.is_resolved ?? false,
    created_at: new Date().toISOString(),
  };

  if (userId) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("error_entries")
        .insert({
          user_id: userId,
          exercise_id: item.exercise_id ?? null,
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
