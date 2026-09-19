-- Migration: Create exercises table
-- Description: Task 4.1 - Skema tabel latihan (exercises) untuk mode Pilihan Ganda & Susun Kalimat

CREATE TABLE IF NOT EXISTS public.exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level_id UUID NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
    type TEXT NOT NULL CHECK (type IN ('multiple_choice', 'sentence_ordering')),
    prompt TEXT NOT NULL,
    context_hanzi TEXT NOT NULL,
    context_pinyin TEXT NOT NULL,
    context_translation TEXT NOT NULL,
    options JSONB NOT NULL DEFAULT '[]'::jsonb,
    correct_answer TEXT NOT NULL,
    explanation TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index untuk performa query
CREATE INDEX IF NOT EXISTS idx_exercises_level_id ON public.exercises(level_id);
CREATE INDEX IF NOT EXISTS idx_exercises_lesson_id ON public.exercises(lesson_id);
CREATE INDEX IF NOT EXISTS idx_exercises_type ON public.exercises(type);
CREATE INDEX IF NOT EXISTS idx_exercises_order ON public.exercises(order_index ASC);

-- Row Level Security (RLS)
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses Baca Publik
DROP POLICY IF EXISTS "Allow public read access to exercises" ON public.exercises;
CREATE POLICY "Allow public read access to exercises"
    ON public.exercises
    FOR SELECT
    USING (true);
