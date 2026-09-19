"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Format alamat email tidak valid.");
      return;
    }

    if (!password) {
      setErrorMessage("Kata sandi wajib diisi.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        // Terjemahkan pesan kesalahan umum Supabase ke Bahasa Indonesia yang alami
        if (
          error.message.toLowerCase().includes("invalid login credentials") ||
          error.message.toLowerCase().includes("invalid_credentials")
        ) {
          setErrorMessage("Email atau kata sandi belum tepat. Silakan periksa kembali.");
        } else if (error.message.toLowerCase().includes("email not confirmed")) {
          setErrorMessage(
            "Alamat email belum dikonfirmasi. Silakan periksa kotak masuk atau spam email kamu untuk tautan aktivasi."
          );
        } else {
          setErrorMessage(error.message || "Terjadi kendala saat masuk akun. Silakan coba lagi.");
        }
        return;
      }

      if (data.session && data.user) {
        // Pastikan record profil dasar tersedia (Task 2.6)
        try {
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", data.user.id)
            .maybeSingle();

          if (!existingProfile) {
            await supabase.from("profiles").insert({
              id: data.user.id,
              full_name:
                (data.user.user_metadata?.full_name as string) ||
                email.trim().split("@")[0],
              username: email.trim().split("@")[0],
              updated_at: new Date().toISOString(),
            });
          }
        } catch {
          // Abaikan kesalahan non-kritis sinkronisasi profil
        }

        setSuccessMessage("Berhasil masuk! Mengalihkan ke dasbor...");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1000);
      }
    } catch {
      setErrorMessage("Gagal terhubung ke server autentikasi. Periksa koneksi internetmu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-xl mx-auto py-8 sm:py-16">
      {/* Box Container Utama bergaya Bauhaus / Constructivism */}
      <div className="border-2 border-ink bg-paper">
        {/* Header Bar */}
        <div className="border-b border-rule px-6 py-4 bg-canvas flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-accent-blue" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              AUTENTIKASI SISTEM // 02
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 border border-rule bg-paper text-ink">
            Masuk Akun
          </span>
        </div>

        {/* Konten Form */}
        <div className="p-6 sm:p-10 space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-ink">
              Masuk ke Akun
            </h1>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Akses kembali kemajuan belajar, latihan tersimpan, serta catatan
              jurnal kesalahan personal kamu.
            </p>
          </div>

          {/* Pesan Kesalahan */}
          {errorMessage && (
            <div
              role="alert"
              className="border-l-4 border-status-error bg-canvas p-4 font-mono text-xs text-status-error space-y-1"
            >
              <span className="font-bold uppercase block">Kekeliruan Autentikasi</span>
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Pesan Sukses */}
          {successMessage && (
            <div
              role="status"
              className="border-l-4 border-status-success bg-canvas p-4 font-mono text-xs text-status-success space-y-1"
            >
              <span className="font-bold uppercase block">Autentikasi Berhasil</span>
              <p>{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="font-mono text-xs uppercase font-bold text-ink block tracking-wider"
              >
                Alamat Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                disabled={isLoading}
                required
                className="w-full bg-canvas border border-rule hover:border-ink focus:border-ink px-4 py-3 font-mono text-sm text-ink outline-none transition-colors placeholder:text-muted/60 disabled:opacity-60"
              />
            </div>

            {/* Input Kata Sandi */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="font-mono text-xs uppercase font-bold text-ink block tracking-wider"
                >
                  Kata Sandi
                </label>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi akunmu"
                disabled={isLoading}
                required
                className="w-full bg-canvas border border-rule hover:border-ink focus:border-ink px-4 py-3 font-mono text-sm text-ink outline-none transition-colors placeholder:text-muted/60 disabled:opacity-60"
              />
            </div>

            {/* Tombol Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider py-4 font-bold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="w-2 h-2 bg-accent-yellow animate-pulse" aria-hidden="true" />
                    <span>Memverifikasi Kredensial...</span>
                  </>
                ) : (
                  <span>Masuk ke Akun</span>
                )}
              </button>
            </div>
          </form>

          {/* Tautan Daftar Akun Baru */}
          <div className="border-t border-rule pt-4 text-center font-mono text-xs text-muted">
            <span>Belum memiliki akun terdaftar? </span>
            <Link
              href="/register"
              className="text-ink font-bold underline underline-offset-4 hover:text-accent-red transition-colors"
            >
              Daftar akun baru di sini
            </Link>
          </div>
        </div>

        {/* Footer Palette Bar */}
        <div className="grid grid-cols-3 gap-1 p-3 border-t border-rule bg-canvas" aria-hidden="true">
          <div className="h-1 bg-accent-red" />
          <div className="h-1 bg-accent-blue" />
          <div className="h-1 bg-accent-yellow" />
        </div>
      </div>
    </div>
  );
}
