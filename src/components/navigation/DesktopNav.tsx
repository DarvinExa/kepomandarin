"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { NAV_ITEMS } from "./nav-config";

export function DesktopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mcl_nav_collapsed");
      if (saved === "true") {
        requestAnimationFrame(() => {
          setIsCollapsed(true);
        });
      }
    } catch {
      // Abaikan jika localStorage tidak diizinkan
    }
  }, []);

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
        // Abaikan bila tabel profil belum dapat diakses
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
        // Abaikan bila offline/gagal terhubung
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

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setFullName(null);
    router.push("/login");
    router.refresh();
  };

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("mcl_nav_collapsed", String(next));
      } catch {
        // Abaikan jika localStorage tidak diizinkan
      }
      return next;
    });
  };

  const isItemActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside
      className={`hidden lg:flex flex-col shrink-0 border-r border-rule bg-canvas min-h-screen sticky top-0 h-screen justify-between select-none transition-all duration-200 ease-in-out ${
        isCollapsed ? "w-20" : "w-64 xl:w-72"
      }`}
    >
      {/* Brand Header & Toggle */}
      <div>
        {isCollapsed ? (
          <div className="p-3 border-b border-rule flex flex-col items-center gap-2.5 min-h-[65px] justify-center">
            <Link
              href="/"
              title="Mandarin Context Lab: Beranda"
              className="flex items-center justify-center p-1 hover:opacity-80 transition-opacity"
            >
              <span
                className="w-4 h-4 bg-accent-red shrink-0"
                aria-hidden="true"
              />
            </Link>
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label="Perluas bilah navigasi"
              title="Perluas navigasi"
              className="w-full py-1 border border-rule hover:border-ink bg-paper text-ink font-mono text-xs transition-colors cursor-pointer text-center"
            >
              »
            </button>
          </div>
        ) : (
          <div className="p-4 border-b border-rule flex items-center justify-between min-h-[65px]">
            <Link href="/" className="group flex items-center gap-2.5 min-w-0">
              <span
                className="w-3.5 h-3.5 bg-accent-red shrink-0"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink block group-hover:text-accent-red transition-colors truncate">
                  Mandarin Lab
                </span>
                <span className="font-mono text-[9px] text-muted uppercase tracking-widest block truncate">
                  HSK 1 Editorial
                </span>
              </div>
            </Link>
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label="Persempit bilah navigasi"
              title="Persempit navigasi"
              className="px-2 py-1 border border-rule hover:border-ink bg-paper text-ink font-mono text-xs transition-colors cursor-pointer shrink-0 ml-2"
            >
              «
            </button>
          </div>
        )}

        {/* Navigation Links */}
        <nav aria-label="Navigasi Utama" className="flex flex-col">
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item.href);

            return isCollapsed ? (
              <Link
                key={item.href}
                href={item.href}
                title={`${item.index} · ${item.label}`}
                className={`group flex flex-col items-center justify-center py-3 border-b border-rule transition-colors relative ${
                  active
                    ? "bg-ink text-canvas font-semibold"
                    : "text-ink hover:bg-paper"
                }`}
              >
                <span
                  className={`font-mono text-xs font-bold leading-tight ${
                    active ? "text-accent-yellow" : "text-muted group-hover:text-ink"
                  }`}
                >
                  {item.index}
                </span>
                <span
                  className={`font-mono text-[9px] uppercase tracking-tighter truncate max-w-[68px] text-center pt-0.5 ${
                    active ? "text-canvas" : "text-muted group-hover:text-ink"
                  }`}
                >
                  {item.shortLabel}
                </span>
                {active && (
                  <span
                    className="absolute right-0 top-0 bottom-0 w-1 bg-accent-red"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center justify-between px-6 py-3.5 border-b border-rule text-xs transition-colors duration-150 ${
                  active
                    ? "bg-ink text-canvas font-semibold"
                    : "text-ink hover:bg-paper"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`font-mono text-[11px] shrink-0 ${
                      active ? "text-accent-yellow" : "text-muted"
                    }`}
                  >
                    {item.index}
                  </span>
                  <span className="tracking-wide truncate">{item.label}</span>
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
        </nav>
      </div>

      {/* Sidebar Footer: Profile & Auth Status */}
      {isCollapsed ? (
        <div className="p-3 border-t border-rule space-y-3 bg-canvas">
          {!isLoadingAuth && (
            <div className="text-center">
              {user ? (
                <div className="space-y-1.5 flex flex-col items-center">
                  <div
                    title={`${fullName || "Pembelajar"} (${user.email})`}
                    className="w-8 h-8 bg-ink text-canvas font-mono text-xs font-bold flex items-center justify-center border border-ink cursor-default"
                  >
                    {(fullName || user.email || "P")[0].toUpperCase()}
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    title="Keluar Akun"
                    aria-label="Keluar Akun"
                    className="font-mono text-[9px] uppercase tracking-wider text-muted hover:text-accent-red transition-colors cursor-pointer block text-center"
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <Link
                    href="/login"
                    title="Masuk ke Akun"
                    aria-label="Masuk ke Akun"
                    className="w-full text-center font-mono text-[10px] uppercase font-bold py-1.5 border border-rule hover:border-ink text-ink bg-paper transition-colors block"
                  >
                    Masuk
                  </Link>
                </div>
              )}
            </div>
          )}

          <div className="border-t border-rule pt-2 text-center">
            <span
              className="text-[10px] font-mono text-status-success font-bold block"
              title="Tingkat Aktif: HSK 1"
            >
              HSK 1
            </span>
          </div>

          <div className="grid grid-cols-3 gap-0.5 pt-0.5" aria-hidden="true">
            <div className="h-1 bg-accent-red" />
            <div className="h-1 bg-accent-blue" />
            <div className="h-1 bg-accent-yellow" />
          </div>
        </div>
      ) : (
        <div className="p-6 border-t border-rule space-y-4 bg-canvas">
          {/* User Auth Section */}
          {!isLoadingAuth && (
            <div>
              {user ? (
                <div className="space-y-3 pb-1">
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
                    className="w-full text-left font-mono text-[11px] uppercase tracking-wider text-muted hover:text-accent-red transition-colors flex items-center justify-between pt-1 cursor-pointer"
                  >
                    <span>Keluar Akun</span>
                    <span>→</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pb-1">
                  <span className="font-mono text-[10px] text-muted uppercase block tracking-wider">
                    Akun Belajar
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/login"
                      className="text-center font-mono text-xs uppercase tracking-wider py-2 bg-ink text-canvas hover:bg-black font-semibold transition-colors block"
                    >
                      Masuk
                    </Link>
                    <Link
                      href="/register"
                      className="text-center font-mono text-xs uppercase tracking-wider py-2 border border-rule hover:border-ink text-ink bg-paper transition-colors block"
                    >
                      Daftar
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Level Status & Curriculum */}
          <div className="space-y-1 border-t border-rule pt-3">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-muted">
              <span>Kurikulum</span>
              <span className="text-status-success font-bold">HSK 1</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-muted">
              <span>Status</span>
              <span className="text-ink font-semibold">Tingkat Dasar</span>
            </div>
          </div>

          {/* De Stijl Structural Palette Stripe */}
          <div className="grid grid-cols-3 gap-1 pt-1" aria-hidden="true">
            <div className="h-1.5 bg-accent-red" />
            <div className="h-1.5 bg-accent-blue" />
            <div className="h-1.5 bg-accent-yellow" />
          </div>
        </div>
      )}
    </aside>
  );
}
