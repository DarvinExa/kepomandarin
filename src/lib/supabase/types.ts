export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      error_entries: {
        Row: {
          id: string;
          user_id: string;
          exercise_id: string | null;
          hanzi: string;
          pinyin: string;
          translation: string;
          category: string;
          error_context: string | null;
          notes: string | null;
          is_resolved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          exercise_id?: string | null;
          hanzi: string;
          pinyin: string;
          translation: string;
          category?: string;
          error_context?: string | null;
          notes?: string | null;
          is_resolved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          exercise_id?: string | null;
          hanzi?: string;
          pinyin?: string;
          translation?: string;
          category?: string;
          error_context?: string | null;
          notes?: string | null;
          is_resolved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      saved_phrases: {
        Row: {
          id: string;
          user_id: string;
          vocabulary_id: string | null;
          hanzi: string;
          pinyin: string;
          translation: string;
          category: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          vocabulary_id?: string | null;
          hanzi: string;
          pinyin: string;
          translation: string;
          category?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          vocabulary_id?: string | null;
          hanzi?: string;
          pinyin?: string;
          translation?: string;
          category?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string | null;
          lesson_slug: string;
          is_completed: boolean;
          mastery_status?: "belum_dimulai" | "sedang_dipelajari" | "perlu_review" | "dikuasai";
          skill_scores?: Json;
          completed_at: string;
          practice_score: number;
          practice_accuracy: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id?: string | null;
          lesson_slug: string;
          is_completed?: boolean;
          mastery_status?: "belum_dimulai" | "sedang_dipelajari" | "perlu_review" | "dikuasai";
          skill_scores?: Json;
          completed_at?: string;
          practice_score?: number;
          practice_accuracy?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string | null;
          lesson_slug?: string;
          is_completed?: boolean;
          mastery_status?: "belum_dimulai" | "sedang_dipelajari" | "perlu_review" | "dikuasai";
          skill_scores?: Json;
          completed_at?: string;
          practice_score?: number;
          practice_accuracy?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_settings: {
        Row: {
          user_id: string;
          daily_goal_vocab: number;
          show_pinyin: boolean;
          show_tone_marks: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          daily_goal_vocab?: number;
          show_pinyin?: boolean;
          show_tone_marks?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          daily_goal_vocab?: number;
          show_pinyin?: boolean;
          show_tone_marks?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      curriculums: {
        Row: {
          id: string;
          code: string;
          title: string;
          description: string | null;
          total_levels: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          title: string;
          description?: string | null;
          total_levels?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          title?: string;
          description?: string | null;
          total_levels?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      levels: {
        Row: {
          id: string;
          curriculum_id: string;
          level_number: number;
          code: string;
          name: string;
          vocab_target: number;
          target_focus: string;
          description: string;
          is_active: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          curriculum_id: string;
          level_number: number;
          code: string;
          name: string;
          vocab_target?: number;
          target_focus: string;
          description: string;
          is_active?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          curriculum_id?: string;
          level_number?: number;
          code?: string;
          name?: string;
          vocab_target?: number;
          target_focus?: string;
          description?: string;
          is_active?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      lessons: {
        Row: {
          id: string;
          level_id: string;
          lesson_number: number;
          slug: string;
          title: string;
          hanzi: string;
          pinyin: string;
          translation: string;
          objectives: string;
          overview: string | null;
          grammar_focus: Json;
          dialogue_specimen: Json;
          vocab_count: number;
          duration_minutes: number;
          order_index: number;
          is_published: boolean;
          status?: "draft" | "reviewed" | "published";
          reviewer?: string | null;
          prerequisites?: string[];
          skills?: string[];
          curriculum_version?: string;
          dialogue_context?: Json;
          pronunciation_focus?: Json;
          hanzi_components?: Json;
          skills_activities?: Json;
          checkpoint?: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          level_id: string;
          lesson_number: number;
          slug: string;
          title: string;
          hanzi: string;
          pinyin: string;
          translation: string;
          objectives: string;
          overview?: string | null;
          grammar_focus?: Json;
          dialogue_specimen?: Json;
          vocab_count?: number;
          duration_minutes?: number;
          order_index?: number;
          is_published?: boolean;
          status?: "draft" | "reviewed" | "published";
          reviewer?: string | null;
          prerequisites?: string[];
          skills?: string[];
          curriculum_version?: string;
          dialogue_context?: Json;
          pronunciation_focus?: Json;
          hanzi_components?: Json;
          skills_activities?: Json;
          checkpoint?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          level_id?: string;
          lesson_number?: number;
          slug?: string;
          title?: string;
          hanzi?: string;
          pinyin?: string;
          translation?: string;
          objectives?: string;
          overview?: string | null;
          grammar_focus?: Json;
          dialogue_specimen?: Json;
          vocab_count?: number;
          duration_minutes?: number;
          order_index?: number;
          is_published?: boolean;
          status?: "draft" | "reviewed" | "published";
          reviewer?: string | null;
          prerequisites?: string[];
          skills?: string[];
          curriculum_version?: string;
          dialogue_context?: Json;
          pronunciation_focus?: Json;
          hanzi_components?: Json;
          skills_activities?: Json;
          checkpoint?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      vocabulary: {
        Row: {
          id: string;
          level_id: string;
          lesson_id: string | null;
          hanzi: string;
          pinyin: string;
          tone: string;
          tone_number?: number | null;
          translation: string;
          part_of_speech: string | null;
          usage_notes?: string | null;
          is_enrichment?: boolean;
          inclusion_reason?: string | null;
          example_hanzi: string;
          example_pinyin: string;
          example_translation: string;
          audio_url: string | null;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          level_id: string;
          lesson_id?: string | null;
          hanzi: string;
          pinyin: string;
          tone: string;
          tone_number?: number | null;
          translation: string;
          part_of_speech?: string | null;
          usage_notes?: string | null;
          is_enrichment?: boolean;
          inclusion_reason?: string | null;
          example_hanzi: string;
          example_pinyin: string;
          example_translation: string;
          audio_url?: string | null;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          level_id?: string;
          lesson_id?: string | null;
          hanzi?: string;
          pinyin?: string;
          tone?: string;
          tone_number?: number | null;
          translation?: string;
          part_of_speech?: string | null;
          usage_notes?: string | null;
          is_enrichment?: boolean;
          inclusion_reason?: string | null;
          example_hanzi?: string;
          example_pinyin?: string;
          example_translation?: string;
          audio_url?: string | null;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      exercises: {
        Row: {
          id: string;
          level_id: string;
          lesson_id: string | null;
          type:
            | "multiple_choice"
            | "sentence_ordering"
            | "listening"
            | "matching"
            | "fill_in_blank"
            | "dictation"
            | "pronunciation_imitation"
            | "hanzi_recognition"
            | "stroke_order"
            | "reading_comprehension"
            | "error_correction";
          prompt: string;
          context_hanzi: string;
          context_pinyin: string;
          context_translation: string;
          audio_url?: string | null;
          options: Json;
          correct_answer: string;
          explanation: string;
          feedback_detail?: Json;
          metadata?: Json;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          level_id: string;
          lesson_id?: string | null;
          type:
            | "multiple_choice"
            | "sentence_ordering"
            | "listening"
            | "matching"
            | "fill_in_blank"
            | "dictation"
            | "pronunciation_imitation"
            | "hanzi_recognition"
            | "stroke_order"
            | "reading_comprehension"
            | "error_correction";
          prompt: string;
          context_hanzi: string;
          context_pinyin: string;
          context_translation: string;
          audio_url?: string | null;
          options?: Json;
          correct_answer: string;
          explanation: string;
          feedback_detail?: Json;
          metadata?: Json;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          level_id?: string;
          lesson_id?: string | null;
          type?:
            | "multiple_choice"
            | "sentence_ordering"
            | "listening"
            | "matching"
            | "fill_in_blank"
            | "dictation"
            | "pronunciation_imitation"
            | "hanzi_recognition"
            | "stroke_order"
            | "reading_comprehension"
            | "error_correction";
          prompt?: string;
          context_hanzi?: string;
          context_pinyin?: string;
          context_translation?: string;
          audio_url?: string | null;
          options?: Json;
          correct_answer?: string;
          explanation?: string;
          feedback_detail?: Json;
          metadata?: Json;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
