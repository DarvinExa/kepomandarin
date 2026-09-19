import { createClient } from "@/lib/supabase/client";

export interface UserSettings {
  daily_goal_vocab: number;
  show_pinyin: boolean;
  show_tone_marks: boolean;
}

const LOCAL_STORAGE_KEY = "mandarin_lab_settings";

const DEFAULT_SETTINGS: UserSettings = {
  daily_goal_vocab: 5,
  show_pinyin: true,
  show_tone_marks: true,
};

function getLocalSettings(): UserSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<UserSettings>) } : DEFAULT_SETTINGS;
  } catch (err) {
    console.error("Gagal membaca settings dari localStorage:", err);
    return DEFAULT_SETTINGS;
  }
}

function saveLocalSettings(settings: UserSettings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error("Gagal menyimpan settings ke localStorage:", err);
  }
}

/**
 * Mengambil preferensi pengguna.
 */
export async function fetchUserSettings(userId?: string | null): Promise<UserSettings> {
  const local = getLocalSettings();

  if (userId) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("user_settings")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (!error && data) {
        return {
          daily_goal_vocab: data.daily_goal_vocab,
          show_pinyin: data.show_pinyin,
          show_tone_marks: data.show_tone_marks,
        };
      }
    } catch (e) {
      console.warn("Gagal mengambil settings dari Supabase, fallback lokal:", e);
    }
  }

  return local;
}

/**
 * Memperbarui preferensi pengguna.
 */
export async function updateUserSettings(
  newValues: Partial<UserSettings>,
  userId?: string | null
): Promise<UserSettings> {
  const current = getLocalSettings();
  const updated: UserSettings = { ...current, ...newValues };
  saveLocalSettings(updated);

  if (userId) {
    try {
      const supabase = createClient();
      const { error } = await supabase.from("user_settings").upsert(
        {
          user_id: userId,
          daily_goal_vocab: updated.daily_goal_vocab,
          show_pinyin: updated.show_pinyin,
          show_tone_marks: updated.show_tone_marks,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

      if (error) {
        console.warn("Gagal update user_settings di Supabase:", error);
      }
    } catch (e) {
      console.warn("Koneksi Supabase gagal saat update settings:", e);
    }
  }

  return updated;
}

/**
 * Menghapus seluruh data lokal browser (mode tamu).
 */
export function clearAllLocalData(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("mandarin_lab_progress");
    localStorage.removeItem("mandarin_lab_error_entries");
    localStorage.removeItem("mandarin_lab_saved_phrases");
    localStorage.removeItem("mandarin_lab_settings");
  } catch (err) {
    console.error("Gagal membersihkan data lokal:", err);
  }
}
