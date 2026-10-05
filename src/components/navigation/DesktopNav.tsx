"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AppIcon } from "@/components/ui/AppIcon";
import { NAV_ITEMS } from "./nav-config";

export function DesktopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("Si Kepo");

  useEffect(() => {
    const supabase = createClient();
    const load = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
        if (data.user) {
          setName(data.user.user_metadata?.full_name || data.user.email?.split("@")[0] || "Si Kepo");
        }
      } catch {
        setUser(null);
      }
    };
    load();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) setName(session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "Si Kepo");
    });
    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await createClient().auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const active = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="km-desktop-nav">
      <Link href="/" className="km-nav-brand" aria-label="KepoMandarin">
        <img src="/images/logo-text.png" alt="KepoMandarin" />
      </Link>

      <nav className="km-nav-list" aria-label="Navigasi utama">
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className={`km-nav-link ${active(item.href) ? "is-active" : ""}`}>
            <AppIcon name={item.icon} />
            <span>{item.shortLabel}</span>
          </Link>
        ))}
      </nav>

      <div className="km-nav-footer">
        <Link href="/settings" className="km-user-card">
          <img src="/images/mascot-neutral.png" alt="" />
          <span><strong>{name}</strong><small>{user ? "Akun terhubung" : "Mode tamu"}</small></span>
        </Link>
        <div className="km-nav-actions">
          <ThemeToggle variant="compact" />
          {user ? (
            <button type="button" onClick={signOut}>Keluar</button>
          ) : (
            <Link href="/login">Masuk</Link>
          )}
        </div>
      </div>
    </aside>
  );
}