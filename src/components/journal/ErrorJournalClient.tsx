"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import {
  ErrorEntry,
  ERROR_CATEGORIES,
  fetchErrorEntries,
  addErrorEntry,
  toggleErrorEntryResolved,
  removeErrorEntry,
} from "@/lib/journal";

interface ErrorJournalClientProps {
  userId?: string | null;
  isGuest: boolean;
}

export function ErrorJournalClient({ userId, isGuest }: ErrorJournalClientProps) {
  const [entries, setEntries] = useState<ErrorEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "resolved">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [formHanzi, setFormHanzi] = useState("");
  const [formPinyin, setFormPinyin] = useState("");
  const [formTranslation, setFormTranslation] = useState("");
  const [formCategory, setFormCategory] = useState("Nada");
  const [formContext, setFormContext] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchErrorEntries(userId).then((data) => {
      if (isMounted) {
        setEntries(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [userId]);

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formHanzi.trim() || !formPinyin.trim() || !formTranslation.trim()) {
      setFormError("Karakter Hanzi, Pinyin, dan Terjemahan wajib diisi.");
      return;
    }

    setFormError(null);
    startTransition(async () => {
      const created = await addErrorEntry(
        {
          hanzi: formHanzi,
          pinyin: formPinyin,
          translation: formTranslation,
          category: formCategory,
          error_context: formContext,
          notes: formNotes,
        },
        userId
      );

      setEntries((prev) => [created, ...prev]);
      // Reset form
      setFormHanzi("");
      setFormPinyin("");
      setFormTranslation("");
      setFormContext("");
      setFormNotes("");
      setIsModalOpen(false);
    });
  };

  const handleToggleResolve = (id: string, current: boolean) => {
    startTransition(async () => {
      const updatedStatus = await toggleErrorEntryResolved(id, current, userId);
      setEntries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, is_resolved: updatedStatus } : item))
      );
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah kamu yakin ingin menghapus catatan evaluasi ini?")) {
      startTransition(async () => {
        await removeErrorEntry(id, userId);
        setEntries((prev) => prev.filter((item) => item.id !== id));
      });
    }
  };

  // Filter logic
  const filteredEntries = entries.filter((item) => {
    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
    const matchesStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "active"
        ? !item.is_resolved
        : item.is_resolved;
    return matchesCategory && matchesStatus;
  });

  const totalActive = entries.filter((e) => !e.is_resolved).length;
  const totalResolved = entries.filter((e) => e.is_resolved).length;

  return (
    <div className="space-y-8">
      {/* 1. Bar Statistik & Aksi */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rule pb-6">
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-accent-red inline-block" />
            <span className="text-muted">PERLU DITINJAU:</span>
            <span className="font-bold text-ink">{totalActive}</span>
          </div>
          <span className="text-rule">|</span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-status-success inline-block" />
            <span className="text-muted">SUDAH DIPAHAMI:</span>
            <span className="font-bold text-ink">{totalResolved}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isGuest && (
            <span className="hidden sm:inline font-mono text-[10px] text-muted uppercase">
              Penyimpanan: Lokal
            </span>
          )}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-accent-red text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider px-5 py-2.5 font-bold transition-colors cursor-pointer"
          >
            + Catat Kesalahan Baru
          </button>
        </div>
      </div>

      {/* 2. Filter Bar (Kategori & Status) */}
      <div className="space-y-4">
        {/* Kategori Bar */}
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-muted block">
            Filter Kategori:
          </span>
          <div className="flex flex-wrap gap-2">
            {ERROR_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 border transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-ink text-canvas border-ink font-semibold"
                    : "bg-paper text-ink border-rule hover:border-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Status Tab Bar */}
        <div className="flex items-center gap-2 border-b border-rule pb-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => setFilterStatus("all")}
            className={`pb-1 uppercase tracking-wider cursor-pointer border-b-2 transition-colors ${
              filterStatus === "all"
                ? "border-accent-red font-bold text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            Semua ({entries.length})
          </button>
          <span className="text-rule">/</span>
          <button
            type="button"
            onClick={() => setFilterStatus("active")}
            className={`pb-1 uppercase tracking-wider cursor-pointer border-b-2 transition-colors ${
              filterStatus === "active"
                ? "border-accent-red font-bold text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            Aktif Ditinjau ({totalActive})
          </button>
          <span className="text-rule">/</span>
          <button
            type="button"
            onClick={() => setFilterStatus("resolved")}
            className={`pb-1 uppercase tracking-wider cursor-pointer border-b-2 transition-colors ${
              filterStatus === "resolved"
                ? "border-accent-red font-bold text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            Sudah Dipahami ({totalResolved})
          </button>
        </div>
      </div>

      {/* 3. Daftar Catatan Kesalahan */}
      {isLoading ? (
        <div className="p-12 text-center border border-rule bg-paper">
          <span className="font-mono text-xs text-muted uppercase animate-pulse">
            Memuat catatan jurnal kesalahan...
          </span>
        </div>
      ) : filteredEntries.length === 0 ? (
        <section className="border border-rule bg-paper p-8 sm:p-14 text-center space-y-3">
          <div className="inline-block border border-rule px-3 py-1 font-mono text-[11px] text-muted uppercase bg-canvas">
            Status Jurnal
          </div>
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-ink">
            {entries.length === 0
              ? "Belum ada catatan kesalahan."
              : "Tidak ada catatan dengan filter saat ini."}
          </h2>
          <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
            {entries.length === 0
              ? "Saat kamu keliru menjawab latihan soal atau menemukan nada yang membingungkan, catat di sini untuk dipelajari lagi."
              : "Coba ubah pilihan kategori atau tab status untuk melihat catatan lainnya."}
          </p>
          {entries.length === 0 && (
            <div className="pt-2">
              <Link
                href="/lessons"
                className="inline-block px-5 py-2.5 bg-ink text-canvas font-mono text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors"
              >
                Mulai Latihan Soal
              </Link>
            </div>
          )}
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredEntries.map((item) => (
            <article
              key={item.id}
              className={`border transition-colors ${
                item.is_resolved
                  ? "border-rule bg-paper/60 opacity-80"
                  : "border-ink bg-canvas shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
              } p-5 sm:p-6 space-y-4`}
            >
              {/* Header Kartu */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 border border-rule bg-paper font-mono text-[11px] uppercase font-bold text-ink">
                    {item.category}
                  </span>
                  {item.is_resolved ? (
                    <span className="font-mono text-[11px] uppercase text-status-success font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 bg-status-success inline-block" />
                      SUDAH DIPAHAMI
                    </span>
                  ) : (
                    <span className="font-mono text-[11px] uppercase text-accent-red font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 bg-accent-red inline-block" />
                      PERLU DITINJAU
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleResolve(item.id, item.is_resolved)}
                    disabled={isPending}
                    className={`font-mono text-xs uppercase tracking-wider px-3 py-1 border transition-colors cursor-pointer ${
                      item.is_resolved
                        ? "bg-canvas text-ink border-rule hover:border-ink"
                        : "bg-status-success text-canvas border-status-success font-bold hover:bg-emerald-700"
                    }`}
                  >
                    {item.is_resolved ? "Tinjau Kembali" : "Tandai Sudah Paham"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    disabled={isPending}
                    className="font-mono text-xs uppercase tracking-wider px-2.5 py-1 text-muted hover:text-accent-red border border-transparent hover:border-rule transition-colors cursor-pointer"
                    title="Hapus catatan"
                  >
                    Hapus
                  </button>
                </div>
              </div>

              {/* Konten Utama Bahasa Mandarin */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-paper p-4 border border-rule">
                <div>
                  <span className="font-mono text-[10px] uppercase text-muted block mb-1">
                    01 / HANZI
                  </span>
                  <p
                    className={`font-chinese text-2xl sm:text-3xl font-bold text-ink ${
                      item.is_resolved ? "line-through decoration-rule" : ""
                    }`}
                  >
                    {item.hanzi}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-muted block mb-1">
                    02 / PINYIN & NADA
                  </span>
                  <p className="font-mono text-sm sm:text-base font-semibold text-ink">
                    {item.pinyin}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-muted block mb-1">
                    03 / TERJEMAHAN
                  </span>
                  <p className="text-sm font-semibold text-ink">{item.translation}</p>
                </div>
              </div>

              {/* Rincian Analisis & Diagnosis */}
              {(item.error_context || item.notes) && (
                <div className="space-y-2 text-xs sm:text-sm">
                  {item.error_context && (
                    <div className="p-3 bg-accent-red/5 border-l-2 border-accent-red space-y-0.5">
                      <span className="font-mono text-[10px] uppercase font-bold text-accent-red block">
                        Kekeliruan yang Terjadi:
                      </span>
                      <p className="text-ink">{item.error_context}</p>
                    </div>
                  )}
                  {item.notes && (
                    <div className="p-3 bg-paper border border-rule space-y-0.5">
                      <span className="font-mono text-[10px] uppercase font-bold text-muted block">
                        Analisis Kaidah & Catatan Evaluasi:
                      </span>
                      <p className="text-ink leading-relaxed">{item.notes}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Tanggal */}
              <div className="text-right font-mono text-[10px] text-muted uppercase">
                Dicatat pada: {new Date(item.created_at).toLocaleDateString("id-ID")}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 4. Modal Catat Kesalahan Baru */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-canvas border-2 border-ink w-full max-w-xl shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-rule pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent-red inline-block" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    EVALUASI MANDIRI
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-ink">
                  Catat Kesalahan Baru
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="font-mono text-sm font-bold text-muted hover:text-ink px-2 py-1 border border-rule hover:border-ink cursor-pointer"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-accent-red/10 border-l-2 border-accent-red text-xs text-accent-red font-mono">
                {formError}
              </div>
            )}

            {/* Form Input */}
            <form onSubmit={handleCreateEntry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Hanzi */}
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase font-bold text-ink block">
                    Karakter Hanzi *
                  </label>
                  <input
                    type="text"
                    required
                    value={formHanzi}
                    onChange={(e) => setFormHanzi(e.target.value)}
                    placeholder="misal: 谁 / 妈妈 / 吗"
                    className="w-full font-chinese text-lg px-3 py-2 border border-rule focus:border-ink focus:outline-none bg-paper text-ink"
                  />
                </div>

                {/* Pinyin */}
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase font-bold text-ink block">
                    Pinyin & Tanda Nada *
                  </label>
                  <input
                    type="text"
                    required
                    value={formPinyin}
                    onChange={(e) => setFormPinyin(e.target.value)}
                    placeholder="misal: shéi / māma / ma"
                    className="w-full font-mono text-sm px-3 py-2 border border-rule focus:border-ink focus:outline-none bg-paper text-ink"
                  />
                </div>
              </div>

              {/* Terjemahan */}
              <div className="space-y-1">
                <label className="font-mono text-xs uppercase font-bold text-ink block">
                  Arti / Terjemahan Bahasa Indonesia *
                </label>
                <input
                  type="text"
                  required
                  value={formTranslation}
                  onChange={(e) => setFormTranslation(e.target.value)}
                  placeholder="misal: siapa / ibu / partikel tanya (apakah)"
                  className="w-full text-sm px-3 py-2 border border-rule focus:border-ink focus:outline-none bg-paper text-ink"
                />
              </div>

              {/* Kategori */}
              <div className="space-y-1">
                <label className="font-mono text-xs uppercase font-bold text-ink block">
                  Kategori Kesalahan *
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full font-mono text-xs uppercase px-3 py-2 border border-rule focus:border-ink focus:outline-none bg-paper text-ink"
                >
                  {ERROR_CATEGORIES.filter((c) => c !== "Semua").map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Kekeliruan */}
              <div className="space-y-1">
                <label className="font-mono text-xs uppercase font-bold text-ink block">
                  Kekeliruan / Jawaban yang Pernah Salah (Opsional)
                </label>
                <input
                  type="text"
                  value={formContext}
                  onChange={(e) => setFormContext(e.target.value)}
                  placeholder="misal: Tertukar dengan nada ke-4 (shèi) atau salah urutan kata"
                  className="w-full text-xs px-3 py-2 border border-rule focus:border-ink focus:outline-none bg-paper text-ink"
                />
              </div>

              {/* Catatan / Kaidah */}
              <div className="space-y-1">
                <label className="font-mono text-xs uppercase font-bold text-ink block">
                  Catatan Evaluasi / Kaidah Tata Bahasa (Opsional)
                </label>
                <textarea
                  rows={3}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="misal: Kata tanya 'shéi' menggantikan posisi subjek/objek tanpa mengubah struktur kalimat dasar."
                  className="w-full text-xs px-3 py-2 border border-rule focus:border-ink focus:outline-none bg-paper text-ink resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-rule">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-rule hover:border-ink font-mono text-xs uppercase tracking-wider text-muted hover:text-ink transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2 bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
                >
                  {isPending ? "Menyimpan..." : "Simpan Catatan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
