"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ErrorEntry, fetchErrorEntries } from "@/lib/journal";

interface RecentErrorsDashboardProps {
  userId?: string | null;
}

export function RecentErrorsDashboard({ userId }: RecentErrorsDashboardProps) {
  const [errors, setErrors] = useState<ErrorEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchErrorEntries(userId).then((data) => {
      if (isMounted) {
        setErrors(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (isLoading) {
    return (
      <section className="border border-rule bg-paper p-6 space-y-3">
        <div className="font-mono text-xs text-muted uppercase animate-pulse">
          Memuat catatan kesalahan...
        </div>
      </section>
    );
  }

  // Ambil maksimal 3 kekeliruan yang belum terselesaikan
  const unresolved = errors.filter((e) => !e.is_resolved);
  const displayItems = unresolved.slice(0, 3);

  return (
    <section className="border border-rule bg-paper p-6 sm:p-8 space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rule pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-accent-red" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              CATATAN TERBARU // JURNAL KESALAHAN
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-ink">
            Kesalahan yang Perlu Kamu Pelajari Lagi
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-muted">
            <strong className="text-accent-red">{unresolved.length}</strong> BELUM DITINJAU
          </span>
          <Link
            href="/error-journal"
            className="font-mono text-xs uppercase tracking-wider text-ink underline underline-offset-4 hover:text-accent-red transition-colors font-semibold"
          >
            Lihat Semua di Jurnal →
          </Link>
        </div>
      </div>

      {/* Konten Kesalahan */}
      {displayItems.length === 0 ? (
        <div className="p-6 text-center border border-rule bg-canvas space-y-2">
          <p className="text-sm font-bold text-ink uppercase">
            Belum Ada Catatan Kesalahan
          </p>
          <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
            Semua soal yang pernah keliru sudah kamu pahami, atau kamu belum mencatat kesalahan baru dari latihan.
          </p>
          <div className="pt-2">
            <Link
              href="/lessons/01/practice"
              className="inline-block px-4 py-2 bg-ink text-canvas font-mono text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors"
            >
              Coba Latihan Soal
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="border border-rule bg-canvas p-4 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 border border-rule bg-paper text-accent-red">
                    {item.category}
                  </span>
                  <span className="font-mono text-[9px] text-muted uppercase">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <p className="font-chinese text-xl font-bold text-ink">
                    {item.hanzi}
                  </p>
                  <p className="font-mono text-xs text-muted font-semibold">
                    {item.pinyin}
                  </p>
                  <p className="text-xs text-ink font-medium">
                    {item.translation}
                  </p>
                </div>

                {item.notes && (
                  <p className="text-[11px] text-muted border-t border-rule pt-1.5 leading-snug line-clamp-2">
                    {item.notes}
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-rule flex items-center justify-between">
                <Link
                  href="/error-journal"
                  className="font-mono text-[11px] uppercase tracking-wider text-accent-red hover:underline font-semibold"
                >
                  Pelajari di Jurnal →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
