-- Migration: Curriculum Specification Alignment
-- Description: Task 1.2 - Penyelarasan skema data dengan spesifikasi kurikulum (16 komponen, tipe latihan, dan status mastery)

-- 1. Perbarui check constraint tipe latihan pada tabel exercises
ALTER TABLE public.exercises 
DROP CONSTRAINT IF EXISTS exercises_type_check;

ALTER TABLE public.exercises 
ADD CONSTRAINT exercises_type_check 
CHECK (type IN (
    'multiple_choice',
    'sentence_ordering',
    'listening',
    'matching',
    'fill_in_blank',
    'dictation',
    'pronunciation_imitation',
    'hanzi_recognition',
    'stroke_order',
    'reading_comprehension',
    'error_correction'
));

-- 2. Tambahkan kolom audio_url dan metadata terstruktur pada tabel exercises
ALTER TABLE public.exercises 
ADD COLUMN IF NOT EXISTS audio_url TEXT,
ADD COLUMN IF NOT EXISTS feedback_detail JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- 3. Tambahkan kolom metadata audit, status alur, dan komponen kurikulum pada tabel lessons
ALTER TABLE public.lessons 
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'reviewed', 'published')),
ADD COLUMN IF NOT EXISTS reviewer TEXT,
ADD COLUMN IF NOT EXISTS prerequisites TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS skills TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS curriculum_version TEXT DEFAULT '2026.1',
ADD COLUMN IF NOT EXISTS dialogue_context JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS pronunciation_focus JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS hanzi_components JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS skills_activities JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS checkpoint JSONB DEFAULT '{}'::jsonb;

-- 4. Tambahkan kolom kosakata pengayaan dan catatan penggunaan pada tabel vocabulary
ALTER TABLE public.vocabulary 
ADD COLUMN IF NOT EXISTS is_enrichment BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS inclusion_reason TEXT,
ADD COLUMN IF NOT EXISTS usage_notes TEXT,
ADD COLUMN IF NOT EXISTS tone_number INTEGER;

-- 5. Tambahkan kolom status penguasaan 4-tingkat dan skor 8 dimensi pada user_progress
ALTER TABLE public.user_progress 
ADD COLUMN IF NOT EXISTS mastery_status TEXT NOT NULL DEFAULT 'belum_dimulai' 
CHECK (mastery_status IN ('belum_dimulai', 'sedang_dipelajari', 'perlu_review', 'dikuasai')),
ADD COLUMN IF NOT EXISTS skill_scores JSONB DEFAULT '{}'::jsonb;
