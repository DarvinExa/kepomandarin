"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("kepomandarin_theme_change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("kepomandarin_theme_change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): "light" | "dark" {
  return "light";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setAppTheme = (newTheme: "light" | "dark") => {
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
    try {
      localStorage.setItem("kepomandarin_theme", newTheme);
    } catch {
      // Abaikan jika localStorage dibatasi
    }
    window.dispatchEvent(new Event("kepomandarin_theme_change"));
  };

  const toggleTheme = () => {
    setAppTheme(theme === "light" ? "dark" : "light");
  };

  return { theme, setAppTheme, toggleTheme };
}

// Ikon Garis Monokromatik (Tanpa Emoji & Sesuai Anti-AI Slop)
function MoonIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-5.4-5.4c0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-5a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1zm0 18a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1zm10-9a1 1 0 0 0 1-1h-1a1 1 0 0 0 0 2h1a1 1 0 0 0-1-1zM3 12a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1zm14.95-6.364a1 1 0 0 0 1.414-1.414l-.707-.707a1 1 0 0 0-1.414 1.414l.707.707zm-11.314 11.314a1 1 0 0 0-1.414 1.414l.707.707a1 1 0 0 0 1.414-1.414l-.707-.707zm12.728 0a1 1 0 0 0-1.414-1.414l-.707.707a1 1 0 0 0 1.414 1.414l.707-.707zM5.343 6.343a1 1 0 0 0 1.414-1.414l-.707-.707a1 1 0 0 0-1.414 1.414l.707.707z" />
    </svg>
  );
}

interface ThemeToggleProps {
  variant?: "segmented" | "compact" | "vertical" | "icon";
  showLabel?: boolean;
  className?: string;
}

export function ThemeToggle({
  variant = "compact",
  showLabel = true,
  className = "",
}: ThemeToggleProps) {
  const { theme, setAppTheme, toggleTheme } = useTheme();

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "light" ? "Ganti ke Mode Gelap" : "Ganti ke Mode Terang"}
        title={theme === "light" ? "Ganti ke Mode Gelap (Dark Mode)" : "Ganti ke Mode Terang (Light Mode)"}
        className={`flex items-center gap-1.5 px-3 py-1.5 border border-rule hover:border-ink bg-paper text-ink font-mono text-xs uppercase tracking-wider transition-colors min-h-[40px] cursor-pointer focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none ${className}`}
      >
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
        <span className="font-bold">
          {theme === "light" ? "Gelap" : "Terang"}
        </span>
      </button>
    );
  }

  if (variant === "vertical") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "light" ? "Ganti ke Mode Gelap" : "Ganti ke Mode Terang"}
        title={theme === "light" ? "Ganti ke Mode Gelap (Dark Mode)" : "Ganti ke Mode Terang (Light Mode)"}
        className={`flex flex-col items-center justify-center py-2 px-1 border border-rule hover:border-ink bg-paper text-ink font-mono uppercase transition-colors min-h-[44px] cursor-pointer focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none w-full ${className}`}
      >
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
        <span className="text-[9px] font-bold tracking-tight mt-1 leading-none">
          {theme === "light" ? "Gelap" : "Terang"}
        </span>
      </button>
    );
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "light" ? "Ganti ke Mode Gelap" : "Ganti ke Mode Terang"}
        title={theme === "light" ? "Ganti ke Mode Gelap (Dark Mode)" : "Ganti ke Mode Terang (Light Mode)"}
        className={`flex items-center justify-center w-9 h-9 border border-rule hover:border-ink bg-paper text-ink transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none ${className}`}
      >
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 font-mono text-xs select-none ${className}`}>
      {showLabel && (
        <span className="text-muted uppercase tracking-widest font-semibold text-[10px]">
          TEMA
        </span>
      )}
      <div
        className="inline-flex border border-rule bg-paper p-0.5"
        role="radiogroup"
        aria-label="Pilihan Tema Tampilan"
      >
        <button
          type="button"
          role="radio"
          aria-checked={theme === "light"}
          onClick={() => setAppTheme("light")}
          className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none ${
            theme === "light"
              ? "bg-ink text-canvas font-bold border border-ink"
              : "text-muted hover:text-ink bg-transparent border border-transparent"
          }`}
        >
          Terang
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={theme === "dark"}
          onClick={() => setAppTheme("dark")}
          className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none ${
            theme === "dark"
              ? "bg-ink text-canvas font-bold border border-ink"
              : "text-muted hover:text-ink bg-transparent border border-transparent"
          }`}
        >
          Gelap
        </button>
      </div>
    </div>
  );
}
