"use client";

import { useState, useEffect, useTransition } from "react";
import { fetchUserProgress, toggleLessonProgress } from "@/lib/progress";

interface LessonCompletionButtonProps {
  lessonSlug: string;
  userId?: string | null;
}

export function LessonCompletionButton({
  lessonSlug,
  userId,
}: LessonCompletionButtonProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let isMounted = true;
    fetchUserProgress(userId).then((progressMap) => {
      if (isMounted) {
        setIsCompleted(!!progressMap[lessonSlug]?.isCompleted);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [lessonSlug, userId]);

  const handleToggle = () => {
    startTransition(async () => {
      const nextStatus = await toggleLessonProgress(lessonSlug, userId);
      setIsCompleted(nextStatus);
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-colors cursor-pointer ${
        isCompleted
          ? "bg-ink text-canvas border-ink font-bold hover:bg-neutral-800"
          : "bg-paper text-ink border-rule hover:border-ink hover:bg-canvas font-semibold"
      }`}
    >
      {isCompleted ? "✓ Pelajaran Ini Selesai" : "Tandai Pelajaran Selesai"}
    </button>
  );
}
