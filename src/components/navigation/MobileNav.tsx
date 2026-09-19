"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { NAV_ITEMS } from "./nav-config";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const fetchProfile = async (currentUser: User) => {
      setFullName(currentUser.user_metadata?.full_name || null);
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", currentUser.id)
          .single();
        if (profile?.full_name) {
          setFullName(profile.full_name);
        }
      } catch {
        // Abaikan bila tabel belum dapat diakses
      }
    };

    const checkUser = async () => {
      try {
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();
        setUser(currentUser);
        if (currentUser) {
          await fetchProfile(currentUser);
        }
      } catch {
        // Abaikan error koneksi
      } finally {
        setIsLoadingAuth(false);
      }
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await fetchProfile(currentUser);
      } else {
        setFullName(null);
      }
      setIsLoadingAuth(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setFullName(null);
    setIsOpen(false);
    router.push("/login");
    router.refresh();
  };

  const isItemActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="lg:hidden sticky top-0 z-40 bg-canvas border-b border-rule">
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 min-h-[60px]">
        <Link
          href="/"
          className="flex items-center gap-2 text-ink"
          onClick={handleLinkClick}
          title="KepoMandarin: Beranda"
        >
          <img
            src="/images/logo-text.png"
            alt="KepoMandarin"
            className="h-10 sm:h-11 w-auto max-w-[175px] object-contain"
          />
        </Link>

        {/* User initials (if logged in) + Menu Toggle Button */}
        <div className="flex items-center gap-2">
          {user && (
            <div className="w-7 h-7 bg-ink text-canvas font-mono text-[11px] font-bold flex items-center justify-center shrink-0 border border-ink">
              {(fullName || user.email || "P")[0].toUpperCase()}
            </div>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            className="flex items-center gap-2 px-3 py-1.5 border border-rule hover:border-ink bg-paper text-ink font-mono text-xs uppercase tracking-wider transition-colors min-h-[44px] min-w-[44px] justify-center"
          >
            <span>{isOpen ? "Tutup" : "Menu"}</span>
            <span
              className={`w-2 h-2 shrink-0 ${
                isOpen ? "bg-accent-red" : "bg-ink"
              }`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* Expandable Mobile Navigation Drawer */}
      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navigasi Utama Ponsel"
          className="border-t border-rule bg-canvas shadow-none"
        >
          <div className="divide-y divide-rule">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center justify-between px-4 py-4 min-h-[48px] text-sm transition-colors ${
                    active
                      ? "bg-ink text-canvas font-semibold"
                      : "text-ink hover:bg-paper"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs ${
                        active ? "text-accent-yellow" : "text-muted"
                      }`}
                    >
                      {item.index}
                    </span>
                    <span className="tracking-wide">{item.label}</span>
                  </div>
                  {active && (
                    <span
                      className="w-2 h-2 bg-accent-red shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Drawer Footer: User Auth Status & Phase */}
          <div className="p-4 border-t border-rule bg-paper space-y-3">
            {!isLoadingAuth && (
              <div>
                {user ? (
                  <div className="space-y-2 border-b border-rule pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-ink text-canvas font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {(fullName || user.email || "P")[0].toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-ink truncate">
                          {fullName || "Pembelajar"}
                        </p>
                        <p className="font-mono text-[10px] text-muted truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full text-left font-mono text-xs uppercase tracking-wider text-muted hover:text-accent-red transition-colors flex items-center justify-between pt-1 cursor-pointer"
                    >
                      <span>Keluar Akun</span>
                      <span>→</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 border-b border-rule pb-3">
                    <span className="font-mono text-[10px] text-muted uppercase block">
                      Akun Belajar
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/login"
                        onClick={handleLinkClick}
                        className="text-center font-mono text-xs uppercase tracking-wider py-2.5 bg-ink text-canvas hover:bg-black font-semibold transition-colors block"
                      >
                        Masuk
                      </Link>
                      <Link
                        href="/register"
                        onClick={handleLinkClick}
                        className="text-center font-mono text-xs uppercase tracking-wider py-2.5 border border-rule hover:border-ink text-ink bg-canvas transition-colors block"
                      >
                        Daftar
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between text-[11px] font-mono uppercase text-muted">
              <span>Kurikulum Aktif</span>
              <span className="text-status-success font-bold">HSK 1</span>
            </div>
            <div className="grid grid-cols-3 gap-1 pt-1" aria-hidden="true">
              <div className="h-1 bg-accent-red" />
              <div className="h-1 bg-accent-blue" />
              <div className="h-1 bg-accent-yellow" />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
