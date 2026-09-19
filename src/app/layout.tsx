import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_SC } from "next/font/google";
import { AppShell } from "@/components/navigation/AppShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Mandarin Context Lab : Platform Belajar HSK 1 Berbasis Konteks",
  description:
    "Platform belajar bahasa Mandarin berbasis konteks dengan materi terstruktur, latihan terarah, dan jurnal kesalahan pribadi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansSC.variable}`}
    >
      <body className="antialiased bg-canvas text-ink min-h-screen">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}


