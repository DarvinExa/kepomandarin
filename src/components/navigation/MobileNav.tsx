"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppIcon } from "@/components/ui/AppIcon";
import { NAV_ITEMS } from "./nav-config";

const bottomHrefs = ["/", "/hsk", "/listening", "/error-journal", "/progress"];

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const bottomItems = NAV_ITEMS.filter((item) => bottomHrefs.includes(item.href));

  return (
    <>
      <header className="km-mobile-appbar">
        <Link href="/" aria-label="KepoMandarin"><img src="/images/logo-text.png" alt="KepoMandarin" /></Link>
        <div>
          <Link href="/settings" className="km-mobile-profile" aria-label="Buka pengaturan">
            <img src="/images/mascot-neutral.png" alt="" />
          </Link>
          <button type="button" className="km-menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Tutup menu" : "Buka menu"}>
            <AppIcon name={open ? "close" : "menu"} />
          </button>
        </div>
      </header>

      {open && (
        <div className="km-mobile-drawer">
          <nav aria-label="Semua navigasi">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={active(item.href) ? "is-active" : ""}>
                <AppIcon name={item.icon} />
                <span><strong>{item.label}</strong><small>{item.description}</small></span>
              </Link>
            ))}
          </nav>
        </div>
      )}

      <nav className="km-mobile-tabs" aria-label="Navigasi cepat">
        {bottomItems.map((item) => (
          <Link key={item.href} href={item.href} className={active(item.href) ? "is-active" : ""}>
            <AppIcon name={item.icon} />
            <span>{item.shortLabel}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}