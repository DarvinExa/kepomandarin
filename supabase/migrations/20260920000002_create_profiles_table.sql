-- Migration: Create profiles table with Row Level Security
-- Description: Task SEC-03 - Skema tabel profil pengguna, RLS, dan sinkronisasi otomatis auth.users

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index untuk pencarian username dan performa query
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 1. Kebijakan Akses Baca: Siapa pun (publik/login) dapat melihat data profil publik
DROP POLICY IF EXISTS "Profil dapat dibaca oleh publik" ON public.profiles;
CREATE POLICY "Profil dapat dibaca oleh publik"
    ON public.profiles FOR SELECT
    USING (true);

-- 2. Kebijakan Akses Buat: Pengguna terautentikasi hanya dapat membuat profil miliknya sendiri
DROP POLICY IF EXISTS "Pengguna dapat membuat profil miliknya" ON public.profiles;
CREATE POLICY "Pengguna dapat membuat profil miliknya"
    ON public.profiles FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

-- 3. Kebijakan Akses Perbarui: Pengguna hanya dapat memperbarui profil miliknya sendiri
DROP POLICY IF EXISTS "Pengguna dapat memperbarui profil miliknya" ON public.profiles;
CREATE POLICY "Pengguna dapat memperbarui profil miliknya"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 4. Fungsi dan Trigger Otomatis Pembuatan Profil saat Pengguna Mendaftar di auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, username, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        split_part(NEW.email, '@', 1),
        NEW.raw_user_meta_data->>'avatar_url'
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
