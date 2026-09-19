-- Migration: Create Error Entries and Saved Phrases tables with RLS
-- Created for Phase 5: Error Journal and Personal Phrasebook

-- 1. Tabel error_entries (Jurnal Kesalahan)
CREATE TABLE IF NOT EXISTS public.error_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    exercise_id UUID REFERENCES public.exercises(id) ON DELETE SET NULL,
    hanzi TEXT NOT NULL,
    pinyin TEXT NOT NULL,
    translation TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Umum',
    error_context TEXT,
    notes TEXT,
    is_resolved BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index untuk query cepat per user dan status
CREATE INDEX IF NOT EXISTS idx_error_entries_user_id ON public.error_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_error_entries_resolved ON public.error_entries(user_id, is_resolved);

-- RLS untuk error_entries
ALTER TABLE public.error_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pengguna dapat melihat catatan kesalahan miliknya"
    ON public.error_entries FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Pengguna dapat menambah catatan kesalahan miliknya"
    ON public.error_entries FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Pengguna dapat memperbarui catatan kesalahan miliknya"
    ON public.error_entries FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Pengguna dapat menghapus catatan kesalahan miliknya"
    ON public.error_entries FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);


-- 2. Tabel saved_phrases (Buku Frasa Pribadi)
CREATE TABLE IF NOT EXISTS public.saved_phrases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    vocabulary_id UUID REFERENCES public.vocabulary(id) ON DELETE SET NULL,
    hanzi TEXT NOT NULL,
    pinyin TEXT NOT NULL,
    translation TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Umum',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index untuk query cepat per user dan kategori
CREATE INDEX IF NOT EXISTS idx_saved_phrases_user_id ON public.saved_phrases(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_phrases_category ON public.saved_phrases(user_id, category);

-- RLS untuk saved_phrases
ALTER TABLE public.saved_phrases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pengguna dapat melihat frasa tersimpan miliknya"
    ON public.saved_phrases FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Pengguna dapat menambah frasa tersimpan miliknya"
    ON public.saved_phrases FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Pengguna dapat memperbarui frasa tersimpan miliknya"
    ON public.saved_phrases FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Pengguna dapat menghapus frasa tersimpan miliknya"
    ON public.saved_phrases FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);
