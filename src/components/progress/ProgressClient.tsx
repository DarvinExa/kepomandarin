"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import {
  StudyMetrics,
  LessonProgress,
  fetchStudyMetrics,
  fetchUserProgress,
  toggleLessonProgress,
} from "@/lib/progress";

interface ProgressClientProps {
  userId?: string | null;
  isGuest: boolean;
}

const HSK1_LESSONS = [
  { slug: "01", title: "Salam & Sopan Santun", hanzi: "问候与礼貌", pinyin: "Wènhòu yǔ Lǐmào" },
  { slug: "02", title: "Identitas & Perkenalan", hanzi: "自我介绍", pinyin: "Zìwǒ Jièshào" },
  { slug: "03", title: "Angka & Kuantitas Mandiri", hanzi: "数字与数量", pinyin: "Shùzì yǔ Shùliàng" },
  { slug: "04", title: "Tanggal, Hari & Waktu", hanzi: "日期与时间", pinyin: "Rìqī yǔ Shíjiān" },
  { slug: "05", title: "Keluarga & Kepemilikan", hanzi: "家庭与所有", pinyin: "Jiātíng yǔ Suǒyǒu" },
  { slug: "06", title: "Rutinitas Harian & Jadwal", hanzi: "日常作息", pinyin: "Rìcháng Zuòxī" },
  { slug: "07", title: "Makanan & Minuman", hanzi: "饮食与点餐", pinyin: "Yǐnshí yǔ Diǎncān" },
  { slug: "08", title: "Tempat, Posisi & Arah Dasar", hanzi: "方位与地点", pinyin: "Fāngwèi yǔ Dìdiǎn" },
  { slug: "09", title: "Belanja & Harga", hanzi: "购物与价格", pinyin: "Gòuwù yǔ Jiàgé" },
  { slug: "10", title: "Cuaca & Kondisi", hanzi: "天气与状态", pinyin: "Tiānqì yǔ Zhuàngtài" },
  { slug: "11", title: "Kemampuan & Permintaan Santun", hanzi: "能力与礼貌", pinyin: "Nénglì yǔ Lǐmào" },
  { slug: "12", title: "Review Integratif & Ujian Akhir", hanzi: "综合评估", pinyin: "Zōnghé Pínggū" },
];

export function ProgressClient({ userId, isGuest }: ProgressClientProps) {
  const [metrics, setMetrics] = useState<StudyMetrics>({
    completedLessonsCount: 0,
    totalLessonsCount: 12,
    completedLessonSlugs: [],
    averageAccuracy: null,
    totalPhrasesSaved: 0,
    reviewedVocabularyCount: 0,
    totalVocabularyInCurriculum: 150,
    unresolvedErrorsCount: 0,
    hsk1MasteryPercent: 0,
    errorCategoryBreakdown: [],
  });

  const [progressMap, setProgressMap] = useState<Record<string, LessonProgress>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let ignore = false;
    Promise.all([fetchStudyMetrics(userId), fetchUserProgress(userId)]).then(([m, p]) => {
      if (!ignore) {
        setMetrics(m);
        setProgressMap(p);
        setIsLoading(false);
      }
    });
    return () => {
      ignore = true;
    };
  }, [userId]);

  const handleToggleLesson = (slug: string) => {
    startTransition(async () => {
      await toggleLessonProgress(slug, userId);
      const [m, p] = await Promise.all([
        fetchStudyMetrics(userId),
        fetchUserProgress(userId),
      ]);
      setMetrics(m);
      setProgressMap(p);
    });
  };

  const metricCards = [
    {
      index: "01",
      label: "Unit Pelajaran Selesai",
      value: `${metrics.completedLessonsCount} / ${metrics.totalLessonsCount}`,
      unit: "Unit HSK 1",
      detail:
        metrics.completedLessonsCount === metrics.totalLessonsCount
          ? "Seluruh silabus HSK 1 telah kamu selesaikan"
          : `${metrics.totalLessonsCount - metrics.completedLessonsCount} unit tersisa untuk dituntaskan`,
    },
    {
      index: "02",
      label: "Akurasi Latihan",
      value: metrics.averageAccuracy !== null ? `${metrics.averageAccuracy}%` : "-",
      unit: "Rata-rata Akurasi",
      detail:
        metrics.averageAccuracy !== null
          ? "Dari hasil latihan soal yang kamu kerjakan"
          : "Selesaikan latihan soal untuk melihat akurasi",
    },
    {
      index: "03",
      label: "Kosakata Dipelajari",
      value: `${metrics.reviewedVocabularyCount} / ${metrics.totalVocabularyInCurriculum}`,
      unit: "Kata Dipelajari",
      detail: `${metrics.totalPhrasesSaved} frasa tersimpan di buku frasa`,
    },
    {
      index: "04",
      label: "Catatan Kesalahan",
      value: `${metrics.unresolvedErrorsCount}`,
      unit: "Perlu Dipelajari",
      detail:
        metrics.unresolvedErrorsCount === 0
          ? "Semua kesalahan sudah kamu pelajari"
          : "Buka Jurnal Kesalahan untuk meninjau kembali",
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* 1. Bar Indikator Status Penyimpanan */}
      {isGuest && (
        <div className="border border-rule bg-paper p-3 font-mono text-xs flex items-center justify-between">
          <span className="text-muted uppercase">
            STATUS PROGRES: TERSIMPAN DI BROWSER INI (MODE TAMU)
          </span>
          <span className="text-ink font-semibold">
            {metrics.completedLessonsCount} / 5 UNIT SELESAI
          </span>
        </div>
      )}

      {/* 2. Grid 4 Metrik Objektif */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-rule divide-y sm:divide-y-0 sm:divide-x divide-rule bg-paper">
        {metricCards.map((m) => (
          <div key={m.label} className="p-6 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-muted">
              <span>METRIK // {m.index}</span>
            </div>
            <p className="text-3xl sm:text-4xl font-black text-ink font-mono">
              {isLoading ? "..." : m.value}
            </p>
            <div className="border-t border-rule pt-2 space-y-0.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-ink">
                {m.label}
              </h2>
              <p className="text-[11px] text-muted">{m.detail}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Panel Bilah Kemajuan HSK 1 */}
      <section className="border border-rule bg-canvas p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rule pb-4">
          <div className="flex items-center gap-3">
            <img
              src={metrics.hsk1MasteryPercent >= 70 ? "/images/mascot-celebrating.png" : "/images/mascot-studying.png"}
              alt="Maskot Progres Belajar"
              className="w-12 h-12 object-contain shrink-0"
            />
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink">
                Tingkat Penguasaan Kurikulum HSK 1
              </h3>
              <p className="text-xs text-muted">
                Dihitung berdasarkan penyelesaian {metrics.totalLessonsCount} unit pelajaran dan frasa yang kamu simpan.
              </p>
            </div>
          </div>
          <div className="font-mono text-2xl font-black text-ink">
            {isLoading ? "0%" : `${metrics.hsk1MasteryPercent}%`}
          </div>
        </div>

        {/* Progress Bar Geometris Bauhaus */}
        <div className="w-full h-4 border border-ink bg-paper relative overflow-hidden">
          <div
            className="h-full bg-accent-red transition-all duration-500 ease-out"
            style={{ width: `${isLoading ? 0 : metrics.hsk1MasteryPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between font-mono text-xs text-muted pt-1">
          <span>{metrics.completedLessonsCount} DARI {metrics.totalLessonsCount} UNIT DITUNTASKAN</span>
          <span>TARGET LENGKAP: 100%</span>
        </div>
      </section>

      {/* 4. Sebaran Kategori Kesalahan Umum (Task 7.5) */}
      <section className="border border-rule bg-canvas p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rule pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-accent-red inline-block" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                POLA KESALAHAN // SEBARAN KATEGORI
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-ink mt-1">
              Kategori Kesalahan Umum
            </h3>
            <p className="text-xs text-muted">
              Sebaran jenis kesalahan dari latihan yang tersimpan di Jurnal Kesalahan.
            </p>
          </div>
          <Link
            href="/error-journal"
            className="font-mono text-xs uppercase tracking-wider text-ink underline underline-offset-4 hover:text-accent-red font-semibold shrink-0"
          >
            Buka Jurnal Kesalahan →
          </Link>
        </div>

        {isLoading ? (
          <div className="p-6 text-center border border-rule bg-paper">
            <span className="font-mono text-xs text-muted uppercase animate-pulse">
              Memuat analitik sebaran kesalahan...
            </span>
          </div>
        ) : metrics.errorCategoryBreakdown.length === 0 ? (
          <div className="border border-rule bg-paper p-6 text-center space-y-2">
            <p className="font-mono text-xs font-bold uppercase text-ink">
              Belum Ada Data Kesalahan Tercatat
            </p>
            <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
              Kerjakan latihan interaktif untuk menguji pemahaman struktur kalimat, ejaan pinyin, dan pembeda nada.
            </p>
            <div className="pt-1">
              <Link
                href="/practice"
                className="inline-block px-4 py-2 bg-ink text-canvas font-mono text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors"
              >
                Mulai Latihan Terarah
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Multi-Segment Bar */}
            <div className="w-full h-4 border border-ink bg-paper flex overflow-hidden">
              {metrics.errorCategoryBreakdown.map((item, idx) => {
                const colors = [
                  "bg-accent-red",
                  "bg-accent-blue",
                  "bg-accent-yellow",
                  "bg-ink",
                  "bg-neutral-400",
                ];
                const color = colors[idx % colors.length];
                return (
                  <div
                    key={item.category}
                    className={`h-full ${color}`}
                    style={{ width: `${item.percent}%` }}
                    title={`${item.category}: ${item.count} (${item.percent}%)`}
                  />
                );
              })}
            </div>

            {/* Category Cards Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {metrics.errorCategoryBreakdown.map((item, idx) => {
                const colors = [
                  "bg-accent-red",
                  "bg-accent-blue",
                  "bg-accent-yellow",
                  "bg-ink",
                  "bg-neutral-400",
                ];
                const color = colors[idx % colors.length];
                return (
                  <div
                    key={item.category}
                    className="border border-rule bg-paper p-3.5 space-y-1.5 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 ${color} inline-block`} />
                        <span className="font-mono text-xs font-bold uppercase text-ink">
                          {item.category}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-black text-ink">
                        {item.percent}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted border-t border-rule pt-1 font-mono">
                      <span>Frekuensi</span>
                      <span>{item.count} Catatan</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* 5. Daftar Silabus & Status Penyelesaian Per Unit */}
      <section className="space-y-4">
        <div className="border-b border-rule pb-2 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Status Penyelesaian 5 Unit Silabus HSK 1
          </span>
          <span className="font-mono text-xs font-semibold text-ink">
            KONTROL KEMAJUAN
          </span>
        </div>

        <div className="border border-rule divide-y divide-rule bg-paper">
          {HSK1_LESSONS.map((les) => {
            const isDone = !!progressMap[les.slug]?.isCompleted;

            return (
              <div
                key={les.slug}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-canvas/50 transition-colors"
              >
                {/* Informasi Unit */}
                <div className="flex items-start sm:items-center gap-4">
                  <span className="font-mono text-sm font-bold text-muted w-10 shrink-0">
                    {"//"} {les.slug}
                  </span>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-3">
                      <h4 className="text-base font-bold uppercase tracking-tight text-ink">
                        {les.title}
                      </h4>
                      <span className="font-chinese text-base font-bold text-muted">
                        {les.hanzi}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-muted">{les.pinyin}</p>
                  </div>
                </div>

                {/* Status & Aksi */}
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <Link
                    href={`/lessons/${les.slug}`}
                    className="font-mono text-xs uppercase tracking-wider px-3 py-1.5 border border-rule hover:border-ink bg-canvas text-ink transition-colors"
                  >
                    Buka Materi
                  </Link>
                  <Link
                    href={`/lessons/${les.slug}/practice`}
                    className="font-mono text-xs uppercase tracking-wider px-3 py-1.5 border border-rule hover:border-ink bg-canvas text-ink transition-colors"
                  >
                    Latihan Unit
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleToggleLesson(les.slug)}
                    disabled={isPending}
                    className={`font-mono text-xs uppercase tracking-wider px-4 py-1.5 border transition-colors cursor-pointer ${
                      isDone
                        ? "bg-ink text-canvas border-ink font-bold hover:bg-neutral-800"
                        : "bg-paper text-ink border-rule hover:border-ink hover:bg-canvas"
                    }`}
                  >
                    {isDone ? "✓ Selesai Dipelajari" : "Tandai Selesai"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
