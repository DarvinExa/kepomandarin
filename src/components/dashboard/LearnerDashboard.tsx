"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppIcon, type AppIconName } from "@/components/ui/AppIcon";
import { RecentErrorsDashboard } from "@/components/dashboard/RecentErrorsDashboard";
import { fetchUserProgress, fetchStudyMetrics } from "@/lib/progress";

export interface DashboardUnit {
  slug: string;
  title: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  objective: string;
  vocabCount?: number;
}

export interface LearnerDashboardProps {
  userId?: string;
  learnerName: string;
  isGuest: boolean;
  completedLessonsCount: number;
  totalLessons: number;
  totalVocabInCurriculum: number;
  progressPercent: number;
  recentAccuracy: number | null;
  nextLessonSlug: string;
  currentLesson: {
    title: string;
    hanzi: string;
    pinyin: string;
    translation: string;
    objective: string;
  };
  units?: DashboardUnit[];
}

interface PathNode {
  icon: AppIconName;
  state: "done" | "current" | "locked" | "reward";
  label: string;
  subLabel?: string;
  href?: string;
}

export function LearnerDashboard({
  userId,
  learnerName,
  isGuest,
  completedLessonsCount: initialCompletedCount,
  totalLessons,
  totalVocabInCurriculum,
  progressPercent: initialProgressPercent,
  recentAccuracy: initialRecentAccuracy,
  nextLessonSlug: initialNextLessonSlug,
  currentLesson: initialCurrentLesson,
  units = [],
}: LearnerDashboardProps) {
  const [completedCount, setCompletedCount] = useState(initialCompletedCount);
  const [progressPercent, setProgressPercent] = useState(initialProgressPercent);
  const [recentAccuracy, setRecentAccuracy] = useState(initialRecentAccuracy);
  const [nextLessonSlug, setNextLessonSlug] = useState(initialNextLessonSlug);
  const [currentLesson, setCurrentLesson] = useState(initialCurrentLesson);
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());

  // Sinkronisasi data progres nyata (localStorage untuk Guest Mode dan Supabase untuk akun login)
  useEffect(() => {
    let isMounted = true;
    Promise.all([
      fetchUserProgress(userId),
      fetchStudyMetrics(userId),
    ]).then(([progressMap, metrics]) => {
      if (!isMounted) return;

      const doneSlugs = new Set(
        Object.values(progressMap)
          .filter((p) => p.isCompleted)
          .map((p) => p.lessonSlug)
      );

      setCompletedSlugs(doneSlugs);
      const doneCount = doneSlugs.size;
      setCompletedCount(doneCount);
      setProgressPercent(Math.min(100, Math.round((doneCount / totalLessons) * 100)));

      if (metrics.averageAccuracy !== null) {
        setRecentAccuracy(metrics.averageAccuracy);
      }

      // Cari unit pertama dalam kurikulum yang belum selesai
      let activeSlug = "01";
      for (const u of units) {
        if (!doneSlugs.has(u.slug)) {
          activeSlug = u.slug;
          break;
        }
      }
      setNextLessonSlug(activeSlug);

      const foundUnit = units.find((u) => u.slug === activeSlug);
      if (foundUnit) {
        setCurrentLesson({
          title: foundUnit.title,
          hanzi: foundUnit.hanzi,
          pinyin: foundUnit.pinyin,
          translation: foundUnit.translation,
          objective: foundUnit.objective,
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [userId, totalLessons, units]);

  // Bangun jalur pembelajaran Duolingo-style yang dinamis dengan sistem unlock milestone
  const nodes: PathNode[] = [];

  // 1. Fondasi Dasar (Node 0)
  const isFundamentalsDone = completedCount > 0 || completedSlugs.has("fundamentals");
  nodes.push({
    icon: "check",
    state: isFundamentalsDone ? "done" : "current",
    label: isFundamentalsDone ? "Fondasi Dasar Selesai" : "Fondasi Dasar Mandarin",
    subLabel: "Pīnyīn & 4 Nada Dasar",
    href: "/lessons/fundamentals",
  });

  // 2. Unit-unit Kurikulum HSK 1 (Unit 01 s/d 12) + Hadiah Milestone per 3 Unit
  units.forEach((u, index) => {
    const isDone = completedSlugs.has(u.slug);
    const isCurrent = u.slug === nextLessonSlug;

    let icon: AppIconName = "lock";
    let state: "done" | "current" | "locked" | "reward" = "locked";

    if (isDone) {
      icon = "check";
      state = "done";
    } else if (isCurrent) {
      icon = "play";
      state = "current";
    } else {
      icon = "lock";
      state = "locked";
    }

    nodes.push({
      icon,
      state,
      label: `Unit ${u.slug}: ${u.title}`,
      subLabel: u.translation,
      href: `/lessons/hsk1/${u.slug}`,
    });

    // Checkpoint Milestone setiap 3 unit (Unit 03, 06, 09, 12)
    const unitIndexNum = index + 1;
    if (unitIndexNum % 3 === 0) {
      const checkpointNum = unitIndexNum / 3;
      const isCheckpointUnlocked = completedCount >= unitIndexNum;

      const checkpointLabels: Record<number, string> = {
        1: "Checkpoint 1: Fondasi Percakapan",
        2: "Checkpoint 2: Kehidupan Sehari-hari",
        3: "Checkpoint 3: Kemandirian Sosial",
        4: "Checkpoint 4: Kelulusan HSK 1",
      };

      nodes.push({
        icon: "gift",
        state: isCheckpointUnlocked ? "reward" : "locked",
        label: checkpointLabels[checkpointNum] || `Checkpoint ${checkpointNum}`,
        subLabel: isCheckpointUnlocked ? "Buka ringkasan pencapaian" : `Selesaikan hingga Unit ${String(unitIndexNum).padStart(2, "0")}`,
        href: "/progress",
      });
    }
  });

  return (
    <div className="km-dashboard">
      <div className="km-dashboard-main">
        {isGuest && (
          <div className="mb-5 rounded-xl border-2 border-rule bg-paper px-4 py-3 text-sm text-muted flex items-center justify-between gap-4">
            <span>Mode tamu aktif. Progres belajarmu tersimpan otomatis di perangkat ini.</span>
            <Link href="/register" className="font-bold text-accent-red shrink-0">Simpan di Cloud</Link>
          </div>
        )}

        <section className="km-unit-card">
          <div className="km-unit-card-content">
            <small>Unit {nextLessonSlug} · HSK 1</small>
            <h1>{currentLesson.title}</h1>
            <p>{currentLesson.translation}</p>
          </div>
          <img src="/images/mascot-studying.png" alt="Maskot Belajar KepoMandarin" />
          <div className="km-unit-progress-wrap">
            <div className="km-unit-progress">
              <span style={{ width: `${progressPercent}%` }} />
            </div>
            <strong className="km-unit-count">{completedCount} / {totalLessons}</strong>
          </div>
        </section>

        <section className="km-learning-path" aria-label="Jalur pembelajaran">
          {nodes.map((node, index) => (
            <div className="km-path-row" key={`${node.label}-${index}`}>
              {node.href && node.state !== "locked" ? (
                <Link href={node.href} className={`km-path-node ${node.state}`} aria-label={node.label}>
                  <AppIcon name={node.icon} />
                  {node.state === "current" && (
                    <span className="km-path-label">
                      <strong className="block">{node.label}</strong>
                      {node.subLabel && <small className="block text-[10px] text-muted font-normal mt-0.5">{node.subLabel}</small>}
                    </span>
                  )}
                </Link>
              ) : (
                <button type="button" className={`km-path-node ${node.state}`} disabled aria-label={node.label}>
                  <AppIcon name={node.icon} />
                  {node.state === "current" && (
                    <span className="km-path-label">
                      <strong className="block">{node.label}</strong>
                      {node.subLabel && <small className="block text-[10px] text-muted font-normal mt-0.5">{node.subLabel}</small>}
                    </span>
                  )}
                </button>
              )}
            </div>
          ))}
        </section>

        <div className="mt-8">
          <RecentErrorsDashboard userId={userId} />
        </div>
      </div>

      <aside className="km-dashboard-side">
        <section className="km-side-card">
          <h2>Target HSK 1</h2>
          <div className="km-side-metric">
            <img src="/images/mascot-neutral.png" alt="" />
            <div>
              <strong>{progressPercent}% selesai</strong>
              <span>{completedCount} dari {totalLessons} unit tuntas</span>
            </div>
          </div>
        </section>

        <section className="km-side-card">
          <h2>Ringkasan belajar</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[var(--km-red-soft)] p-3">
              <strong className="text-xl">{totalVocabInCurriculum}</strong>
              <span className="block text-xs text-muted">Kosakata HSK 1</span>
            </div>
            <div className="rounded-xl bg-[var(--km-blue-soft)] p-3">
              <strong className="text-xl">{recentAccuracy === null ? "-" : `${recentAccuracy}%`}</strong>
              <span className="block text-xs text-muted">Akurasi Latihan</span>
            </div>
          </div>
        </section>

        <section className="km-side-card highlight">
          <h2>Pelajaran berikutnya</h2>
          <div className="hanzi font-chinese">{currentLesson.hanzi}</div>
          <strong>{currentLesson.pinyin}</strong>
          <p className="mt-2 text-sm text-muted">{currentLesson.objective}</p>
          <Link href={`/lessons/hsk1/${nextLessonSlug}`} className="km-btn km-btn-primary mt-4 w-full">
            Mulai pelajaran <AppIcon name="arrow" />
          </Link>
        </section>

        <section className="km-side-card">
          <h2>Halo, {learnerName}</h2>
          <p className="text-sm text-muted">Lanjutkan satu langkah kecil hari ini untuk menjaga ritme belajar.</p>
          <Link href="/progress" className="mt-3 inline-block font-bold text-accent-blue">
            Lihat riwayat progres lengkap →
          </Link>
        </section>
      </aside>
    </div>
  );
}