export type ViewId =
  | "home"
  | "hsk"
  | "listening"
  | "phrasebook"
  | "journal"
  | "progress"
  | "settings";

export type LessonState = "complete" | "current" | "locked" | "reward";

export interface LessonNode {
  id: string;
  title: string;
  state: LessonState;
  href?: string;
}

export interface Phrase {
  hanzi: string;
  pinyin: string;
  meaning: string;
}

export interface QuizChoice {
  id: string;
  label: string;
  correct: boolean;
}

export interface KepoMandarinData {
  user: {
    name: string;
    level: string;
    streak: number;
    xp: number;
    hearts: number;
    dailyMinutes: number;
    dailyTarget: number;
  };
  unit: {
    eyebrow: string;
    title: string;
    description: string;
    completed: number;
    total: number;
  };
  lessons: LessonNode[];
  phraseOfTheDay: Phrase;
  quiz: {
    current: number;
    total: number;
    xp: number;
    prompt: string;
    phrase: Phrase;
    choices: QuizChoice[];
  };
}
