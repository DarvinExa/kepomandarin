import { createClient } from "@/lib/supabase/client";
import { savedPhraseInputSchema } from "@/lib/validations/schemas";

export interface SavedPhrase {
  id: string;
  user_id?: string;
  vocabulary_id?: string | null;
  hanzi: string;
  pinyin: string;
  translation: string;
  category: string;
  notes?: string | null;
  created_at: string;
  updated_at?: string;
}

const LOCAL_STORAGE_KEY = "mandarin_lab_saved_phrases";

export const PHRASE_CATEGORIES = [
  "Semua",
  "Umum",
  "Sapaan",
  "Restoran",
  "Arah & Lokasi",
  "Belanja",
  "Perkenalan",
  "Tata Bahasa",
] as const;

function getFromLocalStorage(): SavedPhrase[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedPhrase[]) : [];
  } catch (err) {
    console.error("Gagal membaca phrasebook dari localStorage:", err);
    return [];
  }
}

function saveToLocalStorage(phrases: SavedPhrase[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(phrases));
  } catch (err) {
    console.error("Gagal menyimpan phrasebook ke localStorage:", err);
  }
}

/**
 * Mengambil daftar frasa tersimpan pengguna (dengan batas aman maksimal 50 baris).
 */
export async function fetchSavedPhrases(userId?: string | null): Promise<SavedPhrase[]> {
  if (userId) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("saved_phrases")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (!error && data) {
        return data as SavedPhrase[];
      }
      console.warn("Supabase query saved_phrases gagal, gunakan fallback lokal:", error);
    } catch (e) {
      console.warn("Koneksi Supabase gagal, fallback lokal:", e);
    }
  }

  return getFromLocalStorage();
}

/**
 * Menyimpan frasa ke buku frasa pribadi dengan validasi skema input.
 */
export async function addSavedPhrase(
  item: Omit<SavedPhrase, "id" | "created_at">,
  userId?: string | null
): Promise<SavedPhrase> {
  // Validasi data masukan menggunakan Zod
  const validated = savedPhraseInputSchema.parse({
    vocabulary_id: item.vocabulary_id ?? null,
    hanzi: item.hanzi,
    pinyin: item.pinyin,
    translation: item.translation,
    category: item.category,
    notes: item.notes,
  });

  const newPhrase: SavedPhrase = {
    id: `local_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    user_id: userId ?? undefined,
    vocabulary_id: validated.vocabulary_id ?? null,
    hanzi: validated.hanzi,
    pinyin: validated.pinyin,
    translation: validated.translation,
    category: validated.category,
    notes: validated.notes ?? null,
    created_at: new Date().toISOString(),
  };

  if (userId) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("saved_phrases")
        .insert({
          user_id: userId,
          vocabulary_id: newPhrase.vocabulary_id,
          hanzi: newPhrase.hanzi,
          pinyin: newPhrase.pinyin,
          translation: newPhrase.translation,
          category: newPhrase.category,
          notes: newPhrase.notes,
        })
        .select()
        .single();

      if (!error && data) {
        return data as SavedPhrase;
      }
      console.warn("Gagal simpan frasa ke Supabase, fallback lokal:", error);
    } catch (e) {
      console.warn("Gagal terhubung ke Supabase:", e);
    }
  }

  const localList = getFromLocalStorage();
  // Cegah duplikasi Hanzi yang persis sama
  const exists = localList.some((p) => p.hanzi === newPhrase.hanzi);
  if (!exists) {
    const updated = [newPhrase, ...localList];
    saveToLocalStorage(updated);
  }
  return newPhrase;
}

/**
 * Menghapus frasa tersimpan.
 */
export async function removeSavedPhrase(id: string, userId?: string | null): Promise<boolean> {
  if (userId && !id.startsWith("local_")) {
    try {
      const supabase = createClient();
      const { error } = await supabase.from("saved_phrases").delete().eq("id", id);
      if (error) {
        console.error("Gagal hapus frasa di Supabase:", error);
      }
    } catch (e) {
      console.error("Gagal terhubung ke Supabase:", e);
    }
  }

  const localList = getFromLocalStorage();
  const updated = localList.filter((p) => p.id !== id);
  saveToLocalStorage(updated);
  return true;
}

/**
 * Memperbarui frasa tersimpan (edit catatan, arti terjemahan, pinyin, kategori, dll).
 */
export async function updateSavedPhrase(
  id: string,
  updates: Partial<Omit<SavedPhrase, "id" | "created_at" | "user_id">>,
  userId?: string | null
): Promise<SavedPhrase | null> {
  const updatedAt = new Date().toISOString();

  if (userId && !id.startsWith("local_")) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("saved_phrases")
        .update({
          ...updates,
          updated_at: updatedAt,
        })
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        const localList = getFromLocalStorage();
        const updatedLocal = localList.map((p) => (p.id === id ? { ...p, ...data } : p));
        saveToLocalStorage(updatedLocal);
        return data as SavedPhrase;
      }
      console.warn("Gagal memperbarui frasa di Supabase, fallback lokal:", error);
    } catch (e) {
      console.warn("Gagal terhubung ke Supabase:", e);
    }
  }

  const localList = getFromLocalStorage();
  const existing = localList.find((p) => p.id === id);
  if (!existing) return null;

  const updatedItem: SavedPhrase = {
    ...existing,
    ...updates,
    updated_at: updatedAt,
  };

  const updatedList = localList.map((p) => (p.id === id ? updatedItem : p));
  saveToLocalStorage(updatedList);
  return updatedItem;
}
