"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  UserSettings,
  fetchUserSettings,
  updateUserSettings,
  clearAllLocalData,
} from "@/lib/settings";

interface SettingsClientProps {
  userId?: string | null;
  email?: string | null;
  isGuest: boolean;
}

export function SettingsClient({ userId, email, isGuest }: SettingsClientProps) {
  const router = useRouter();
  const [settings, setSettings] = useState<UserSettings>({
    daily_goal_vocab: 5,
    show_pinyin: true,
    show_tone_marks: true,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let isMounted = true;
    fetchUserSettings(userId).then((data) => {
      if (isMounted) {
        setSettings(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [userId]);

  const handleUpdateGoal = (goal: number) => {
    startTransition(async () => {
      const updated = await updateUserSettings({ daily_goal_vocab: goal }, userId);
      setSettings(updated);
      setSaveStatus("Target harian berhasil diperbarui.");
      setTimeout(() => setSaveStatus(null), 3000);
    });
  };

  const handleTogglePinyin = () => {
    startTransition(async () => {
      const updated = await updateUserSettings({ show_pinyin: !settings.show_pinyin }, userId);
      setSettings(updated);
      setSaveStatus("Preferensi pinyin diperbarui.");
      setTimeout(() => setSaveStatus(null), 3000);
    });
  };

  const handleToggleToneMarks = () => {
    startTransition(async () => {
      const updated = await updateUserSettings(
        { show_tone_marks: !settings.show_tone_marks },
        userId
      );
      setSettings(updated);
      setSaveStatus("Preferensi tanda nada diperbarui.");
      setTimeout(() => setSaveStatus(null), 3000);
    });
  };

  const handleClearLocal = () => {
    if (
      confirm(
        "Apakah kamu yakin ingin membersihkan seluruh data latihan, frasa, dan progres di peramban ini?"
      )
    ) {
      clearAllLocalData();
      alert("Seluruh data lokal telah dibersihkan.");
      router.refresh();
    }
  };

  const handleSignOut = async () => {
    if (confirm("Keluar dari sesi akun saat ini?")) {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      {saveStatus && (
        <div className="p-3 bg-status-success/10 border-l-2 border-status-success font-mono text-xs text-status-success">
          {saveStatus}
        </div>
      )}

      <section className="border border-rule divide-y divide-rule bg-paper">
        {/* 1. Status Akun */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/images/mascot-neutral.png"
              alt="Avatar Pengguna KepoMandarin"
              className="w-12 h-12 border border-rule bg-canvas p-1 object-contain shrink-0"
            />
            <div className="space-y-1">
              <h2 className="text-sm font-bold uppercase tracking-wider text-ink">
                Status Akun & Sinkronisasi
              </h2>
              <p className="text-xs text-muted max-w-lg">
                {isGuest
                  ? "Saat ini kamu menggunakan mode tamu tanpa akun. Seluruh catatan tersimpan di browser ini. Buat akun untuk mengaktifkan sinkronisasi cloud lintas perangkat."
                  : `Terhubung sebagai ${email}. Riwayat belajar, frasa, dan diagnosis tersinkronisasi aman ke cloud.`}
              </p>
            </div>
          </div>
          {isGuest ? (
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/register"
                className="px-4 py-2 bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Daftar Akun
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 border border-rule hover:border-ink text-ink bg-canvas font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Masuk
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-xs font-semibold px-3 py-1.5 border border-rule bg-canvas text-status-success">
                Akun Cloud Aktif
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="px-3 py-1.5 border border-rule hover:border-ink text-muted hover:text-accent-red font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Keluar
              </button>
            </div>
          )}
        </div>

        {/* 2. Target Kosakata Harian */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink">
              Target Belajar Harian
            </h2>
            <p className="text-xs text-muted max-w-lg">
              Tentukan jumlah kosakata baru yang ingin kamu pelajari dan kuasai per hari.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {[3, 5, 10].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleUpdateGoal(num)}
                disabled={isPending || isLoading}
                className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 border transition-colors cursor-pointer ${
                  settings.daily_goal_vocab === num
                    ? "bg-ink text-canvas border-ink font-bold"
                    : "bg-canvas text-ink border-rule hover:border-ink"
                }`}
              >
                {num} Kata / Hari
              </button>
            ))}
          </div>
        </div>

        {/* 3. Tampilan Pinyin */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink">
              Tampilan Pinyin Otomatis
            </h2>
            <p className="text-xs text-muted max-w-lg">
              Menampilkan transkripsi bunyi pinyin di bawah setiap karakter Hanzi dalam wacana.
            </p>
          </div>
          <button
            type="button"
            onClick={handleTogglePinyin}
            disabled={isPending || isLoading}
            className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-colors cursor-pointer ${
              settings.show_pinyin
                ? "bg-ink text-canvas border-ink font-semibold"
                : "bg-canvas text-muted border-rule hover:border-ink"
            }`}
          >
            {settings.show_pinyin ? "Aktif" : "Non-aktif"}
          </button>
        </div>

        {/* 4. Tanda Nada Pinyin */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink">
              Diakritik Nada Pinyin
            </h2>
            <p className="text-xs text-muted max-w-lg">
              Menampilkan penanda diakritik nada (mā, má, mǎ, mà) untuk membedakan nada suara.
            </p>
          </div>
          <button
            type="button"
            onClick={handleToggleToneMarks}
            disabled={isPending || isLoading}
            className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-colors cursor-pointer ${
              settings.show_tone_marks
                ? "bg-ink text-canvas border-ink font-semibold"
                : "bg-canvas text-muted border-rule hover:border-ink"
            }`}
          >
            {settings.show_tone_marks ? "Diakritik Aktif" : "Hanya Angka"}
          </button>
        </div>

        {/* 5. Kebijakan Bahasa UI */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink">
              Bahasa Antarmuka
            </h2>
            <p className="text-xs text-muted">
              Seluruh petunjuk, label tombol, dan penjelasan kaidah disajikan dalam Bahasa Indonesia baku.
            </p>
          </div>
          <span className="font-mono text-xs font-semibold px-3 py-1.5 border border-rule bg-canvas text-ink">
            Bahasa Indonesia (Standar)
          </span>
        </div>

        {/* 6. Manajemen Data Lokal (Khusus Tamu) */}
        {isGuest && (
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-accent-red/5">
            <div className="space-y-1">
              <h2 className="text-sm font-bold uppercase tracking-wider text-accent-red">
                Reset Penyimpanan Lokal
              </h2>
              <p className="text-xs text-muted max-w-lg">
                Hapus seluruh progres belajar, frasa tersimpan, dan catatan evaluasi yang ada pada peramban ini.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearLocal}
              className="px-4 py-2 border border-accent-red text-accent-red hover:bg-accent-red hover:text-canvas font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer shrink-0"
            >
              Bersihkan Data
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
