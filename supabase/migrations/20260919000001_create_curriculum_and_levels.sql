-- Migration: Create curriculum and levels tables
-- Description: Task 3.1 - Skema tabel kurikulum dan tingkatan HSK

-- 1. Tabel Curriculums
CREATE TABLE IF NOT EXISTS public.curriculums (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    total_levels INTEGER NOT NULL DEFAULT 5,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Tabel Levels
CREATE TABLE IF NOT EXISTS public.levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    curriculum_id UUID NOT NULL REFERENCES public.curriculums(id) ON DELETE CASCADE,
    level_number INTEGER NOT NULL,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    vocab_target INTEGER NOT NULL DEFAULT 150,
    target_focus TEXT NOT NULL,
    description TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT false,
    order_index INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_curriculum_level UNIQUE (curriculum_id, level_number)
);

-- Index untuk performa query
CREATE INDEX IF NOT EXISTS idx_levels_curriculum_id ON public.levels(curriculum_id);
CREATE INDEX IF NOT EXISTS idx_levels_order ON public.levels(order_index ASC);

-- 3. Row Level Security (RLS)
ALTER TABLE public.curriculums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses: Siapa pun (pengguna publik maupun login) dapat membaca data kurikulum dan tingkatannya
DROP POLICY IF EXISTS "Allow public read access to curriculums" ON public.curriculums;
CREATE POLICY "Allow public read access to curriculums"
    ON public.curriculums
    FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow public read access to levels" ON public.levels;
CREATE POLICY "Allow public read access to levels"
    ON public.levels
    FOR SELECT
    USING (true);
