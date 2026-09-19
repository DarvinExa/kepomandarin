-- Migration: Create vocabulary table
-- Description: Task 3.4 - Skema tabel kosakata (vocabulary) berelasi dengan tabel levels dan lessons

CREATE TABLE IF NOT EXISTS public.vocabulary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level_id UUID NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
    hanzi TEXT NOT NULL,
    pinyin TEXT NOT NULL,
    tone TEXT NOT NULL,
    translation TEXT NOT NULL,
    part_of_speech TEXT,
    example_hanzi TEXT NOT NULL,
    example_pinyin TEXT NOT NULL,
    example_translation TEXT NOT NULL,
    audio_url TEXT,
    order_index INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index untuk performa query
CREATE INDEX IF NOT EXISTS idx_vocabulary_level_id ON public.vocabulary(level_id);
CREATE INDEX IF NOT EXISTS idx_vocabulary_lesson_id ON public.vocabulary(lesson_id);
CREATE INDEX IF NOT EXISTS idx_vocabulary_hanzi ON public.vocabulary(hanzi);
CREATE INDEX IF NOT EXISTS idx_vocabulary_order ON public.vocabulary(order_index ASC);

-- Row Level Security (RLS)
ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses Baca Publik
DROP POLICY IF EXISTS "Allow public read access to vocabulary" ON public.vocabulary;
CREATE POLICY "Allow public read access to vocabulary"
    ON public.vocabulary
    FOR SELECT
    USING (true);
