"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!fullName.trim()) {
      setErrorMessage("Nama lengkap wajib diisi.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Format alamat email tidak valid.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Kata sandi minimal harus terdiri dari 6 karakter.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (error) {
        // Terjemahkan pesan kesalahan umum Supabase ke Bahasa Indonesia yang alami
        if (error.message.toLowerCase().includes("already registered")) {
          setErrorMessage("Alamat email ini sudah terdaftar. Silakan masuk menggunakan akunmu.");
        } else if (error.message.toLowerCase().includes("password")) {
          setErrorMessage("Kata sandi terlalu lemah. Gunakan minimal 6 karakter.");
        } else {
          setErrorMessage(error.message || "Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
        }
        return;
      }

      if (data.user && !data.session) {
        setSuccessMessage(
          "Pendaftaran berhasil! Tautan konfirmasi telah dikirimkan ke email kamu. Silakan periksa kotak masuk untuk mengaktifkan akun sebelum masuk."
        );
      } else if (data.session && data.user) {
        // Buat record profil dasar (Task 2.6)
        try {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            full_name: fullName.trim(),
            username: email.trim().split("@")[0],
            updated_at: new Date().toISOString(),
          });
        } catch {
          // Abaikan kesalahan jika trigger DB sudah membuat profil
        }

        setSuccessMessage("Pendaftaran berhasil! Mengalihkan ke dasbor...");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1500);
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
            <span className="w-2.5 h-2.5 bg-accent-red" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              AUTENTIKASI SISTEM // 01
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 border border-rule bg-paper text-ink">
            Daftar Akun
          </span>
        </div>

        {/* Konten Form */}
        <div className="p-6 sm:p-10 space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-ink">
              Daftar Akun Baru
            </h1>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Mulai perjalanan belajar Mandarin terstruktur. Simpan frasa personal,
              evaluasi jurnal kesalahan, dan pantau penguasaan HSK 1.
            </p>
          </div>

          {/* Pesan Kesalahan */}
          {errorMessage && (
            <div
              role="alert"
              className="border-l-4 border-status-error bg-canvas p-4 font-mono text-xs text-status-error space-y-1"
            >
              <span className="font-bold uppercase block">Kekeliruan Pendaftaran</span>
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Pesan Sukses */}
          {successMessage && (
            <div
              role="status"
              className="border-l-4 border-status-success bg-canvas p-4 font-mono text-xs text-status-success space-y-1"
            >
              <span className="font-bold uppercase block">Pendaftaran Berhasil</span>
              <p>{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Nama Lengkap */}
            <div className="space-y-1.5">
              <label
                htmlFor="fullName"
                className="font-mono text-xs uppercase font-bold text-ink block tracking-wider"
              >
                Nama Lengkap
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="misal: Budi Santoso"
                disabled={isLoading}
                required
                className="w-full bg-canvas border border-rule hover:border-ink focus:border-ink px-4 py-3 font-sans text-sm text-ink outline-none transition-colors placeholder:text-muted/60 disabled:opacity-60"
              />
            </div>

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
              <label
                htmlFor="password"
                className="font-mono text-xs uppercase font-bold text-ink block tracking-wider"
              >
                Kata Sandi
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                disabled={isLoading}
                required
                className="w-full bg-canvas border border-rule hover:border-ink focus:border-ink px-4 py-3 font-mono text-sm text-ink outline-none transition-colors placeholder:text-muted/60 disabled:opacity-60"
              />
              <span className="font-mono text-[10px] text-muted block">
                Kombinasikan huruf dan angka untuk keamanan optimal.
              </span>
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
                    <span>Memproses Pendaftaran...</span>
                  </>
                ) : (
                  <span>Daftar Akun Baru</span>
                )}
              </button>
            </div>
          </form>

          {/* Tautan Masuk Akun */}
          <div className="border-t border-rule pt-4 text-center font-mono text-xs text-muted">
            <span>Sudah memiliki akun terdaftar? </span>
            <Link
              href="/login"
              className="text-ink font-bold underline underline-offset-4 hover:text-accent-red transition-colors"
            >
              Masuk di sini
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
