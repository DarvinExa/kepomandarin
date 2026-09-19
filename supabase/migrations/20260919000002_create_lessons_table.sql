-- Migration: Create lessons table
-- Description: Task 3.2 - Skema tabel pelajaran (lessons) berelasi dengan tabel levels

CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level_id UUID NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
    lesson_number INTEGER NOT NULL,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    hanzi TEXT NOT NULL,
    pinyin TEXT NOT NULL,
    translation TEXT NOT NULL,
    objectives TEXT NOT NULL,
    overview TEXT,
    grammar_focus JSONB DEFAULT '[]'::jsonb,
    dialogue_specimen JSONB DEFAULT '[]'::jsonb,
    vocab_count INTEGER NOT NULL DEFAULT 10,
    duration_minutes INTEGER NOT NULL DEFAULT 10,
    order_index INTEGER NOT NULL DEFAULT 1,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_level_lesson_number UNIQUE (level_id, lesson_number),
    CONSTRAINT unique_level_lesson_slug UNIQUE (level_id, slug)
);

-- Index untuk performa query
CREATE INDEX IF NOT EXISTS idx_lessons_level_id ON public.lessons(level_id);
CREATE INDEX IF NOT EXISTS idx_lessons_slug ON public.lessons(slug);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON public.lessons(order_index ASC);

-- Row Level Security (RLS)
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses Baca Publik
DROP POLICY IF EXISTS "Allow public read access to lessons" ON public.lessons;
CREATE POLICY "Allow public read access to lessons"
    ON public.lessons
    FOR SELECT
    USING (true);
