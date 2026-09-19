"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import {
  SavedPhrase,
  PHRASE_CATEGORIES,
  fetchSavedPhrases,
  addSavedPhrase,
  updateSavedPhrase,
  removeSavedPhrase,
} from "@/lib/phrasebook";

interface PhrasebookClientProps {
  userId?: string | null;
  isGuest: boolean;
}

export function PhrasebookClient({ userId, isGuest }: PhrasebookClientProps) {
  const [phrases, setPhrases] = useState<SavedPhrase[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPhrase, setEditingPhrase] = useState<SavedPhrase | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [formHanzi, setFormHanzi] = useState("");
  const [formPinyin, setFormPinyin] = useState("");
  const [formTranslation, setFormTranslation] = useState("");
  const [formCategory, setFormCategory] = useState("Umum");
  const [formNotes, setFormNotes] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchSavedPhrases(userId).then((data) => {
      if (isMounted) {
        setPhrases(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [userId]);

  const handleOpenCreateModal = () => {
    setEditingPhrase(null);
    setFormHanzi("");
    setFormPinyin("");
    setFormTranslation("");
    setFormCategory("Umum");
    setFormNotes("");
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (phrase: SavedPhrase) => {
    setEditingPhrase(phrase);
    setFormHanzi(phrase.hanzi);
    setFormPinyin(phrase.pinyin);
    setFormTranslation(phrase.translation);
    setFormCategory(phrase.category);
    setFormNotes(phrase.notes || "");
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPhrase(null);
    setFormError(null);
  };

  const handleSubmitPhrase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formHanzi.trim() || !formPinyin.trim() || !formTranslation.trim()) {
      setFormError("Karakter Hanzi, Pinyin, dan Terjemahan wajib diisi.");
      return;
    }

    setFormError(null);
    startTransition(async () => {
      if (editingPhrase) {
        const updated = await updateSavedPhrase(
          editingPhrase.id,
          {
            hanzi: formHanzi,
            pinyin: formPinyin,
            translation: formTranslation,
            category: formCategory,
            notes: formNotes,
          },
          userId
        );

        if (updated) {
          setPhrases((prev) =>
            prev.map((p) => (p.id === editingPhrase.id ? updated : p))
          );
        }
      } else {
        const created = await addSavedPhrase(
          {
            hanzi: formHanzi,
            pinyin: formPinyin,
            translation: formTranslation,
            category: formCategory,
            notes: formNotes,
          },
          userId
        );

        setPhrases((prev) => {
          if (prev.some((p) => p.hanzi === created.hanzi)) return prev;
          return [created, ...prev];
        });
      }

      handleCloseModal();
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus frasa ini dari buku frasa pribadimu?")) {
      startTransition(async () => {
        await removeSavedPhrase(id, userId);
        setPhrases((prev) => prev.filter((p) => p.id !== id));
      });
    }
  };

  const filteredPhrases = phrases.filter((item) => {
    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.hanzi.includes(q) ||
      item.pinyin.toLowerCase().includes(q) ||
      item.translation.toLowerCase().includes(q) ||
      (item.notes && item.notes.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* 1. Bar Metrik & Tombol Aksi */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rule pb-6">
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-accent-yellow inline-block" />
            <span className="text-muted">TOTAL FRASA TERSIMPAN:</span>
            <span className="font-bold text-ink">{phrases.length}</span>
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
            onClick={handleOpenCreateModal}
            className="bg-accent-yellow text-ink hover:bg-black hover:text-canvas font-mono text-xs uppercase tracking-wider px-5 py-2.5 font-bold transition-colors cursor-pointer border border-ink"
          >
            + Tambah Frasa Baru
          </button>
        </div>
      </div>

      {/* 2. Filter Bar & Pencarian */}
      <div className="space-y-4">
        {/* Pencarian */}
        <div className="max-w-md">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari frasa, pinyin, atau arti kata..."
              className="w-full text-xs font-mono px-3.5 py-2.5 border border-rule focus:border-ink focus:outline-none bg-paper text-ink"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 font-mono text-xs text-muted hover:text-ink cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Kategori Bar */}
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-muted block">
            Kategori Frasa:
          </span>
          <div className="flex flex-wrap gap-2">
            {PHRASE_CATEGORIES.map((cat) => (
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
      </div>

      {/* 3. Daftar Frasa */}
      {isLoading ? (
        <div className="p-12 text-center border border-rule bg-paper">
          <span className="font-mono text-xs text-muted uppercase animate-pulse">
            Memuat buku frasa...
          </span>
        </div>
      ) : filteredPhrases.length === 0 ? (
        <section className="border border-rule bg-paper p-8 sm:p-14 text-center space-y-4">
          <div className="flex justify-center">
            <img
              src={phrases.length === 0 ? "/images/mascot-sleepy.png" : "/images/mascot-sad.png"}
              alt={phrases.length === 0 ? "Maskot Koleksi Frasa Kosong" : "Maskot Tidak Ada Hasil"}
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
            />
          </div>
          <div className="inline-block border border-rule px-3 py-1 font-mono text-[11px] text-muted uppercase bg-canvas">
            Status Koleksi
          </div>
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-ink">
            {phrases.length === 0
              ? "Belum ada frasa tersimpan."
              : "Tidak ada frasa yang cocok dengan pencarian."}
          </h2>
          <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
            {phrases.length === 0
              ? "Kamu dapat menambahkan kalimat atau kosakata penting saat mempelajari unit HSK 1 atau memasukkannya secara mandiri di sini."
              : "Coba ganti kata kunci pencarian atau ubah filter kategori."}
          </p>
          {phrases.length === 0 && (
            <div className="pt-2">
              <Link
                href="/lessons"
                className="inline-block px-5 py-2.5 bg-ink text-canvas font-mono text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors"
              >
                Jelajahi Pelajaran HSK 1
              </Link>
            </div>
          )}
        </section>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPhrases.map((item) => (
            <article
              key={item.id}
              className="border border-ink bg-canvas p-5 space-y-4 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header kartu frasa */}
                <div className="flex items-center justify-between gap-2 border-b border-rule pb-2">
                  <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 border border-rule bg-paper text-ink">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(item)}
                      disabled={isPending}
                      className="font-mono text-xs text-muted hover:text-ink transition-colors cursor-pointer px-1"
                      title="Sunting frasa"
                    >
                      Sunting
                    </button>
                    <span className="text-rule">|</span>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={isPending}
                      className="font-mono text-xs text-muted hover:text-accent-red transition-colors cursor-pointer px-1"
                      title="Hapus frasa"
                    >
                      Hapus
                    </button>
                  </div>
                </div>

                {/* Konten Hanzi & Pinyin */}
                <div className="space-y-1">
                  <p className="font-chinese text-2xl sm:text-3xl font-bold text-ink leading-tight">
                    {item.hanzi}
                  </p>
                  <p className="font-mono text-sm font-semibold text-muted">
                    {item.pinyin}
                  </p>
                </div>

                {/* Terjemahan */}
                <div className="pt-1 border-t border-rule">
                  <span className="font-mono text-[10px] uppercase text-muted block mb-0.5">
                    ARTI INDONESIA
                  </span>
                  <p className="text-sm font-medium text-ink">{item.translation}</p>
                </div>

                {/* Catatan Kontekstual */}
                {item.notes && (
                  <div className="p-2.5 bg-paper border-l-2 border-accent-yellow space-y-0.5 text-xs">
                    <span className="font-mono text-[9px] uppercase font-bold text-muted block">
                      Catatan Penggunaan:
                    </span>
                    <p className="text-ink leading-relaxed">{item.notes}</p>
                  </div>
                )}
              </div>

              {/* Tanggal */}
              <div className="pt-2 text-right font-mono text-[9px] text-muted uppercase">
                {new Date(item.created_at).toLocaleDateString("id-ID")}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 4. Modal Tambah Frasa Baru */}
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
                  <span className="w-2 h-2 bg-accent-yellow inline-block" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    {editingPhrase ? "PERBARUI FRASA" : "TAMBAH FRASA MANDIRI"}
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-ink">
                  {editingPhrase ? "Sunting Frasa" : "Tambah Frasa Baru"}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
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
            <form onSubmit={handleSubmitPhrase} className="space-y-4">
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
                    placeholder="misal: 很高兴认识你。"
                    className="w-full font-chinese text-lg px-3 py-2 border border-rule focus:border-ink focus:outline-none bg-paper text-ink"
                  />
                </div>

                {/* Pinyin */}
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase font-bold text-ink block">
                    Pinyin & Nada *
                  </label>
                  <input
                    type="text"
                    required
                    value={formPinyin}
                    onChange={(e) => setFormPinyin(e.target.value)}
                    placeholder="misal: Hěn gāoxìng rènshi nǐ."
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
                  placeholder="misal: Sangat senang berkenalan denganmu."
                  className="w-full text-sm px-3 py-2 border border-rule focus:border-ink focus:outline-none bg-paper text-ink"
                />
              </div>

              {/* Kategori */}
              <div className="space-y-1">
                <label className="font-mono text-xs uppercase font-bold text-ink block">
                  Kategori Frasa *
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full font-mono text-xs uppercase px-3 py-2 border border-rule focus:border-ink focus:outline-none bg-paper text-ink"
                >
                  {PHRASE_CATEGORIES.filter((c) => c !== "Semua").map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Catatan Kontekstual */}
              <div className="space-y-1">
                <label className="font-mono text-xs uppercase font-bold text-ink block">
                  Catatan Penggunaan Konteks (Opsional)
                </label>
                <textarea
                  rows={3}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="misal: Digunakan pada pertemuan pertama dalam situasi formal maupun santai."
                  className="w-full text-xs px-3 py-2 border border-rule focus:border-ink focus:outline-none bg-paper text-ink resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-rule">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-rule hover:border-ink font-mono text-xs uppercase tracking-wider text-muted hover:text-ink transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2 bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
                >
                  {isPending
                    ? "Menyimpan..."
                    : editingPhrase
                    ? "Simpan Perubahan"
                    : "Simpan Frasa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
