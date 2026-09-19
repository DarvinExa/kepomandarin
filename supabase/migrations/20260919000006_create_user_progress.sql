-- Migration: Create user_progress and user_settings tables with Row Level Security
-- Created for Phase 6: Dynamic Progress Tracking and Settings

-- 1. Tabel user_progress (Pelacakan Penyelesaian Unit Pelajaran & Skor)
CREATE TABLE IF NOT EXISTS public.user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    lesson_slug TEXT NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT true,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    practice_score INTEGER DEFAULT 0,
    practice_accuracy NUMERIC(5,2) DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_user_lesson UNIQUE (user_id, lesson_slug)
);

CREATE INDEX IF NOT EXISTS idx_user_progress_user ON public.user_progress(user_id);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Pengguna dapat melihat progres belajarnya" ON public.user_progress;
CREATE POLICY "Pengguna dapat melihat progres belajarnya"
    ON public.user_progress FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Pengguna dapat mencatat progres belajarnya" ON public.user_progress;
CREATE POLICY "Pengguna dapat mencatat progres belajarnya"
    ON public.user_progress FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Pengguna dapat memperbarui progres belajarnya" ON public.user_progress;
CREATE POLICY "Pengguna dapat memperbarui progres belajarnya"
    ON public.user_progress FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Pengguna dapat menghapus progres belajarnya" ON public.user_progress;
CREATE POLICY "Pengguna dapat menghapus progres belajarnya"
    ON public.user_progress FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);


-- 2. Tabel user_settings (Preferensi Belajar Pengguna)
CREATE TABLE IF NOT EXISTS public.user_settings (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    daily_goal_vocab INTEGER NOT NULL DEFAULT 5,
    show_pinyin BOOLEAN NOT NULL DEFAULT true,
    show_tone_marks BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Pengguna dapat melihat pengaturannya" ON public.user_settings;
CREATE POLICY "Pengguna dapat melihat pengaturannya"
    ON public.user_settings FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Pengguna dapat membuat pengaturannya" ON public.user_settings;
CREATE POLICY "Pengguna dapat membuat pengaturannya"
    ON public.user_settings FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Pengguna dapat memperbarui pengaturannya" ON public.user_settings;
CREATE POLICY "Pengguna dapat memperbarui pengaturannya"
    ON public.user_settings FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
