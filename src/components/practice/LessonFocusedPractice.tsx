"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { ExerciseItem, SentenceOrderingFragment } from "@/lib/practice";
import { stripTrailingPunctuation } from "@/lib/practice";
import { addErrorEntry } from "@/lib/journal";
import { recordPracticeAttempt } from "@/lib/progress";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { useClientSeed } from "@/lib/clientSeed";

function seededShuffle<T>(arr: T[], seedStr: string): T[] {
  const result = [...arr];
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  }
  for (let i = result.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export interface LessonPracticeInfo {
  id: string;
  slug: string;
  title: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  moduleId?: string;
  moduleTitle?: string;
  backHref?: string;
}

export interface NextNavInfo {
  label: string;
  href: string;
  title: string;
  isLastInCurriculum?: boolean;
}

interface LessonFocusedPracticeProps {
  lesson: LessonPracticeInfo;
  exercises: ExerciseItem[];
  userId?: string | null;
  nextNavigation?: NextNavInfo | null;
}

const LESSON_TITLES: Record<string, string> = {
  "01": "Sapaan Sopan",
  "02": "Identitas Diri",
  "03": "Angka & Waktu",
  "04": "Anggota Keluarga",
  "05": "Restoran & Lokasi",
};

const PINYIN_FALLBACKS: Record<string, string> = {
  "您": "nín",
  "你": "nǐ",
  "吗": "ma",
  "不": "bù",
  "我": "wǒ",
  "他": "tā",
  "她": "tā",
  "是": "shì",
  "的": "de",
  "呢": "ne",
  "个": "ge",
  "什么": "shénme",
  "谁": "shéi",
  "哪儿": "nǎr",
  "几": "jǐ",
  "十五": "shíwǔ",
  "五十": "wǔshí",
  "五": "wǔ",
  "十": "shí",
  "在": "zài",
  "爸爸": "bàba",
  "妈妈": "māma",
  "哥哥": "gēge",
  "妹妹": "mèimei",
  "喝茶": "hē chá",
  "喝水": "hē shuǐ",
  "吃米饭": "chī mǐfàn",
  "吃菜": "chī cài",
  "比": "bǐ",
  "很": "hěn",
  "和": "hé",
  "跟": "gēn",
  "便宜": "piányi",
  "贵": "guì",
  "买": "mǎi",
  "卖": "mài",
  "离": "lí",
  "往": "wǎng",
  "从": "cóng",
  "过": "guò",
  "了": "le",
  "着": "zhe",
  "感冒": "gǎnmào",
  "学习": "xuéxí",
  "工作": "gōngzuò",
  "旅游": "lǚyóu",
};

function parseOptionLabel(opt: string) {
  const match = opt.match(/^([^(]+)\s*\((.+)\)$/);
  if (match) {
    return {
      main: match[1].trim(),
      sub: match[2].trim(),
    };
  }
  const main = opt.trim();
  return {
    main,
    sub: PINYIN_FALLBACKS[main] ?? null,
  };
}

function getSpokenContext(exercise: ExerciseItem): string {
  if (exercise.type === "multiple_choice") {
    const cleanAnswer = exercise.correct_answer.replace(/\s*\(.*?\)/, "").trim();
    return exercise.context_hanzi.replace(/_{2,}/g, cleanAnswer);
  }
  return exercise.context_hanzi;
}

export function LessonFocusedPractice({
  lesson,
  exercises,
  userId,
  nextNavigation,
}: LessonFocusedPracticeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasSavedAttempt, setHasSavedAttempt] = useState(false);

  const clientSeed = useClientSeed();
  const [restartCount, setRestartCount] = useState(0);
  const sessionSeed = clientSeed + restartCount;

  const backTeoriHref =
    lesson.backHref ??
    (lesson.moduleId ? `/lessons/${lesson.moduleId}/${lesson.slug}` : `/lessons/${lesson.slug}`);

  // Jika tidak ada soal untuk unit ini
  if (!exercises || exercises.length === 0) {
    return (
      <div className="border border-rule bg-canvas p-8 sm:p-16 text-center space-y-4">
        <div className="inline-block border border-rule px-3 py-1 font-mono text-xs text-muted uppercase bg-paper">
          STATUS SOAL
        </div>
        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
          Belum ada soal latihan untuk unit {lesson.slug}.
        </h2>
        <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
          Silakan pelajari teori unit ini terlebih dahulu atau kembali ke silabus kurikulum.
        </p>
        <div className="pt-2">
          <Link
            href={backTeoriHref}
            className="inline-block px-6 py-3 bg-ink text-canvas font-mono text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors"
          >
            ← Kembali ke Materi {lesson.slug}
          </Link>
        </div>
      </div>
    );
  }

  // Selesai memeriksa satu soal
  const handleAnswerSubmitted = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }
  };

  // Lanjut ke soal berikutnya atau selesaikan sesi
  const handleNextQuestion = async () => {
    if (currentIndex + 1 < exercises.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      if (!hasSavedAttempt) {
        setHasSavedAttempt(true);
        const total = correctCount + incorrectCount;
        const calculatedAccuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;
        await recordPracticeAttempt(
          {
            lessonSlug: lesson.slug,
            score: correctCount,
            total,
            accuracy: calculatedAccuracy,
          },
          userId
        );
      }
    }
  };

  // Ulangi sesi latihan
  const handleRestart = () => {
    setRestartCount((prev) => prev + 1);
    setCurrentIndex(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setIsCompleted(false);
    setHasSavedAttempt(false);
  };

  // ==========================================
  // TAMPILAN SESI SELESAI (COMPLETION SCREEN)
  // ==========================================
  if (isCompleted) {
    const totalAnswered = correctCount + incorrectCount;
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

    const currentUnitNum = parseInt(lesson.slug, 10);
    const defaultNextUnitSlug =
      !isNaN(currentUnitNum) && currentUnitNum < 5
        ? String(currentUnitNum + 1).padStart(2, "0")
        : null;

    const silabusHref = lesson.moduleId ? `/lessons/${lesson.moduleId}` : "/lessons";
    const silabusLabel = lesson.moduleTitle ? `Silabus ${lesson.moduleTitle}` : "Silabus Pelajaran";

    return (
      <div className="border border-rule bg-canvas max-w-4xl mx-auto space-y-0">
        {/* Header Ringkasan Selesai */}
        <div className="p-6 sm:p-8 border-b border-rule bg-canvas flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <img
              src={accuracy >= 70 ? "/images/mascot-celebrating.png" : "/images/mascot-studying.png"}
              alt={accuracy >= 70 ? "Maskot Perayaan Sukses" : "Maskot Belajar Mandiri"}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0"
            />
            <div className="space-y-1 min-w-0">
              <span className="text-accent-red font-mono text-xs uppercase font-bold tracking-widest block">
                UNIT {lesson.slug} · {lesson.hanzi} ({lesson.pinyin.toUpperCase()})
              </span>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-ink truncate sm:whitespace-normal">
                LATIHAN SELESAI // PELAJARAN {lesson.slug}: {lesson.title.toUpperCase()}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="border border-rule px-3 py-1 font-mono text-xs font-bold text-ink bg-paper">
              {totalAnswered} SOAL TUNTAS
            </div>
            <span className="font-mono text-xs uppercase text-status-success font-bold">
              ✓ SELESAI
            </span>
          </div>
        </div>

        {/* Garis Progres Penuh */}
        <div className="w-full h-1.5 bg-status-success" aria-hidden="true" />

        {/* Ringkasan Metrik Akurasi */}
        <div className="p-6 sm:p-10 space-y-8">
          <div className="grid grid-cols-3 border border-rule divide-x divide-rule bg-paper">
            <div className="p-4 sm:p-6 text-center space-y-1">
              <span className="font-mono text-[10px] uppercase text-muted block">Akurasi</span>
              <span className="font-mono text-2xl sm:text-4xl font-black text-ink">
                {accuracy}%
              </span>
              <span className="text-[10px] text-muted block">Tingkat Ketepatan</span>
            </div>
            <div className="p-4 sm:p-6 text-center space-y-1">
              <span className="font-mono text-[10px] uppercase text-status-success font-semibold block">
                Benar
              </span>
              <span className="font-mono text-2xl sm:text-4xl font-black text-status-success">
                {correctCount}
              </span>
              <span className="text-[10px] text-muted block">Jawaban Tepat</span>
            </div>
            <div className="p-4 sm:p-6 text-center space-y-1">
              <span className="font-mono text-[10px] uppercase text-accent-red font-semibold block">
                Perlu Tinjau
              </span>
              <span className="font-mono text-2xl sm:text-4xl font-black text-accent-red">
                {incorrectCount}
              </span>
              <span className="text-[10px] text-muted block">Kekeliruan</span>
            </div>
          </div>

          {/* De Stijl Stripe */}
          <div className="grid grid-cols-3 gap-1" aria-hidden="true">
            <div className="h-1.5 bg-accent-red" />
            <div className="h-1.5 bg-accent-blue" />
            <div className="h-1.5 bg-accent-yellow" />
          </div>

          {/* Seamless Next Action */}
          <div className="border border-rule bg-paper p-6 space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent-red font-bold block">
              LANGKAH PEMBELAJARAN BERIKUTNYA
            </span>
            {nextNavigation ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-black text-ink text-base sm:text-lg uppercase">
                    {nextNavigation.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted">
                    {nextNavigation.isLastInCurriculum
                      ? "Kamu telah menyelesaikan semua unit pembelajaran. Hebat!"
                      : `Latihan unit ${lesson.slug} telah tuntas. Lanjutkan pemahaman ke unit berikutnya secara mulus.`}
                  </p>
                </div>
                <Link
                  href={nextNavigation.href}
                  className="px-8 py-4 bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-widest font-black transition-colors shrink-0 text-center"
                >
                  {nextNavigation.label} →
                </Link>
              </div>
            ) : defaultNextUnitSlug ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-black text-ink text-base sm:text-lg uppercase">
                    Pelajaran {defaultNextUnitSlug}: {LESSON_TITLES[defaultNextUnitSlug] ?? "Materi Baru"}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted">
                    Latihan unit ${lesson.slug} telah selesai. Lanjutkan pemahaman ke unit berikutnya secara mulus.
                  </p>
                </div>
                <Link
                  href={`/lessons/${defaultNextUnitSlug}`}
                  className="px-8 py-4 bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-widest font-black transition-colors shrink-0 text-center"
                >
                  Lanjut ke Pelajaran {defaultNextUnitSlug} →
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-black text-ink text-base sm:text-lg uppercase">
                    Selamat! Seluruh Silabus Telah Tuntas
                  </h4>
                  <p className="text-xs sm:text-sm text-muted">
                    Kamu telah menyelesaikan semua latihan unit pada modul ini. Lanjutkan perjalanan belajarmu.
                  </p>
                </div>
                <Link
                  href="/lessons"
                  className="px-8 py-4 bg-accent-red text-canvas hover:bg-black font-mono text-xs uppercase tracking-widest font-black transition-colors shrink-0 text-center"
                >
                  Lihat Semua Pelajaran →
                </Link>
              </div>
            )}
          </div>

          {/* Auxiliary Navigation Links */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleRestart}
                className="text-muted hover:text-ink underline underline-offset-4 cursor-pointer"
              >
                Ulangi Latihan Unit Ini
              </button>
              <span className="text-rule">·</span>
              <Link
                href={backTeoriHref}
                className="text-muted hover:text-ink underline underline-offset-4"
              >
                Kembali ke Teori Unit {lesson.slug}
              </Link>
              <span className="text-rule">·</span>
              <Link href={silabusHref} className="text-muted hover:text-ink underline underline-offset-4">
                {silabusLabel}
              </Link>
            </div>
            {incorrectCount > 0 && (
              <Link
                href="/error-journal"
                className="text-accent-red font-bold hover:underline underline-offset-4"
              >
                Tinjau Jurnal Kesalahan ({incorrectCount}) →
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentExercise = exercises[currentIndex];

  return (
    <LessonPracticeCard
      key={`${currentExercise.id}-${sessionSeed}`}
      lesson={lesson}
      exercise={currentExercise}
      questionIndex={currentIndex}
      totalQuestions={exercises.length}
      sessionSeed={sessionSeed}
      onAnswerSubmitted={handleAnswerSubmitted}
      onNextQuestion={handleNextQuestion}
      isLastQuestion={currentIndex + 1 >= exercises.length}
    />
  );
}

interface LessonPracticeCardProps {
  lesson: LessonPracticeInfo;
  exercise: ExerciseItem;
  questionIndex: number;
  totalQuestions: number;
  sessionSeed: number;
  onAnswerSubmitted: (isCorrect: boolean) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

function LessonPracticeCard({
  lesson,
  exercise,
  questionIndex,
  totalQuestions,
  sessionSeed,
  onAnswerSubmitted,
  onNextQuestion,
  isLastQuestion,
}: LessonPracticeCardProps) {
  const isListening = exercise.type === "listening";
  const isMultipleChoice = exercise.type === "multiple_choice" || isListening;

  const multipleChoiceOptions = useMemo(() => {
    if (!isMultipleChoice) return [];
    const rawOpts = exercise.options as string[];
    return seededShuffle(rawOpts, `${exercise.id}-${sessionSeed}`);
  }, [exercise.id, isMultipleChoice, exercise.options, sessionSeed]);

  // State Pilihan Ganda / Audio
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // State Susun Kalimat
  const [availableWords, setAvailableWords] = useState<SentenceOrderingFragment[]>(() => {
    if (isMultipleChoice) return [];
    return seededShuffle(
      exercise.options as SentenceOrderingFragment[],
      `${exercise.id}-${sessionSeed}`
    );
  });
  const [orderedWords, setOrderedWords] = useState<SentenceOrderingFragment[]>([]);

  // State Pemeriksaan & Feedback
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isJournalSaved, setIsJournalSaved] = useState(false);
  const [isSavingJournal, setIsSavingJournal] = useState(false);

  // Mode label display
  const currentModeLabel =
    exercise.type === "listening"
      ? "MENDENGAR"
      : exercise.type === "sentence_ordering"
      ? "SUSUN KALIMAT"
      : "PILIHAN GANDA";

  // Handler klik pilihan kata pada mode susun kalimat
  const handleSelectWord = (fragment: SentenceOrderingFragment, index: number) => {
    if (isAnswerChecked) return;
    setOrderedWords((prev) => [...prev, fragment]);
    setAvailableWords((prev) => prev.filter((_, i) => i !== index));
  };

  // Handler batal kata pada mode susun kalimat
  const handleDeselectWord = (fragment: SentenceOrderingFragment, index: number) => {
    if (isAnswerChecked) return;
    setAvailableWords((prev) => [...prev, fragment]);
    setOrderedWords((prev) => prev.filter((_, i) => i !== index));
  };

  // Handler hapus seluruh susunan kata
  const handleResetOrder = () => {
    if (isAnswerChecked) return;
    setAvailableWords(
      seededShuffle(
        exercise.options as SentenceOrderingFragment[],
        `${exercise.id}-${sessionSeed}`
      )
    );
    setOrderedWords([]);
  };

  // Simpan ke jurnal kesalahan
  const handleSaveToJournal = async () => {
    if (isJournalSaved || isSavingJournal) return;
    setIsSavingJournal(true);
    const userAns = isMultipleChoice
      ? selectedOption
      : orderedWords.map((w) => w.text).join(" ");

    await addErrorEntry({
      exercise_id: exercise.id,
      hanzi: exercise.context_hanzi,
      pinyin: exercise.context_pinyin,
      translation: exercise.context_translation,
      category:
        exercise.type === "sentence_ordering"
          ? "Urutan Kata"
          : isListening
          ? "Nada"
          : "Tata Bahasa",
      error_context: userAns ? `Jawabanmu: ${userAns}` : null,
      notes: exercise.explanation,
    });

    setIsSavingJournal(false);
    setIsJournalSaved(true);
  };

  // Periksa jawaban
  const handleCheckAnswer = () => {
    let correct = false;
    if (isMultipleChoice) {
      if (!selectedOption) return;
      correct = selectedOption.trim() === exercise.correct_answer.trim();
    } else {
      if (orderedWords.length === 0) return;

      const stripAll = (s: string) =>
        s
          .toLowerCase()
          .replace(/[。！？\.,!?;:\"'“”‘’，、]/g, "")
          .replace(/\s+/g, "")
          .trim();

      const stripWithSpaces = (s: string) =>
        s
          .toLowerCase()
          .replace(/[。！？\.,!?;:\"'“”‘’，、]/g, "")
          .replace(/\s+/g, " ")
          .trim();

      const userJoined = orderedWords.map((w) => w.text).join("");
      const userSpaced = orderedWords.map((w) => w.text).join(" ");

      const targetNoSpace = stripAll(exercise.correct_answer);
      const targetSpaced = stripWithSpaces(exercise.correct_answer);
      const hanziNoSpace = stripAll(exercise.context_hanzi);
      const transSpaced = stripWithSpaces(exercise.context_translation);

      correct =
        stripAll(userJoined) === targetNoSpace ||
        stripWithSpaces(userSpaced) === targetSpaced ||
        stripAll(userJoined) === hanziNoSpace ||
        stripWithSpaces(userSpaced) === transSpaced;
    }

    setIsCorrect(correct);
    setIsAnswerChecked(true);
    onAnswerSubmitted(correct);
  };

  return (
    <div className="border border-rule bg-canvas max-w-5xl mx-auto space-y-0">
      {/* 1. Header Minimal Sesuai Screenshot */}
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <span className="text-accent-red font-mono text-xs uppercase font-bold tracking-widest block">
            UNIT {lesson.slug} · {lesson.hanzi} ({lesson.pinyin.toUpperCase()})
          </span>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-ink">
            LATIHAN PELAJARAN {lesson.slug}: {lesson.title.toUpperCase()}
          </h1>
        </div>

        {/* Top Right Counter & Mode Badge */}
        <div className="flex items-center gap-3.5 shrink-0">
          <div className="border border-rule px-3.5 py-1.5 font-mono text-xs font-bold text-ink bg-canvas">
            SOAL {questionIndex + 1} DARI {totalQuestions}
          </div>
          <span className="font-mono text-xs uppercase text-muted tracking-wider">
            {currentModeLabel}
          </span>
        </div>
      </div>

      {/* 2. Garis Progres Linear Tepat di Bawah Header */}
      <div className="w-full h-1.5 bg-[#dcd7cb] relative">
        <div
          className="h-full bg-accent-blue transition-all duration-300"
          style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* 3. Konten Utama Soal */}
      <div className="p-6 sm:p-10 space-y-6">
        {/* Instruksi Soal & Pertanyaan */}
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-muted block">
            INSTRUKSI SOAL
          </span>
          <p className="text-base sm:text-lg font-bold text-ink leading-relaxed">
            {exercise.prompt}
          </p>
        </div>

        {/* Kotak Konteks / Stimulus Soal */}
        {isListening ? (
          /* A. Tipe Soal Mendengar (Listening) */
          <div className="border border-rule bg-[#ede9de] p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-accent-blue font-bold">
                STIMULUS AUDIO // SIMAK DENGAN TELITI
              </span>
              <span className="font-mono text-xs uppercase text-muted tracking-wider">
                MANDARIN LISAN
              </span>
            </div>

            {/* Pemutar Audio Utama */}
            <div className="bg-canvas p-4 sm:p-5 border border-rule flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-ink uppercase block">
                  Audio Pelafalan Soal
                </span>
                <span className="text-xs text-muted block">
                  Dengarkan kecepatan normal (1.0×) atau gunakan 0.75× lambat untuk meneliti nada.
                </span>
              </div>
              <div className="shrink-0">
                <AudioPlayer
                  text={exercise.context_hanzi}
                  pinyin={exercise.context_pinyin}
                  audioUrl={exercise.audio_url}
                  size="md"
                />
              </div>
            </div>

            {/* Sebelum diperiksa: Sembunyikan teks agar murni latihan listening */}
            {!isAnswerChecked ? (
              <div className="border border-dashed border-rule p-4 bg-paper/60 text-center">
                <p className="font-mono text-xs text-muted">
                  Teks Hanzi dan ejaan pinyin disembunyikan. Putar audio di atas lalu pilih jawaban yang tepat di bawah.
                </p>
              </div>
            ) : (
              /* Setelah diperiksa: Buka transkrip lengkap */
              <div className="border-t border-rule pt-4 space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted block">
                  TRANSKRIP AUDIO LENGKAP:
                </span>
                <p className="font-chinese text-3xl sm:text-4xl font-bold text-ink leading-tight">
                  {exercise.context_hanzi}
                </p>
                <div className="space-y-0.5 font-mono text-xs sm:text-sm text-ink">
                  <p className="font-semibold">{exercise.context_pinyin}</p>
                  <p className="text-muted font-sans text-xs">{exercise.context_translation}</p>
                </div>
              </div>
            )}
          </div>
        ) : exercise.type === "sentence_ordering" ? (
          /* B. Tipe Soal Susun Kalimat (Soal Bahasa Indonesia -> Susun Kalimat Mandarin) */
          <div className="border border-rule bg-[#ede9de] p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-muted font-bold">
                TARGET KALIMAT
              </span>
              <div className="shrink-0">
                <AudioPlayer
                  text={exercise.context_hanzi}
                  pinyin={exercise.context_pinyin}
                  audioUrl={exercise.audio_url}
                  size="sm"
                />
              </div>
            </div>

            {/* Stimulus soal: Menampilkan arti kalimat dalam Bahasa Indonesia */}
            <div className="space-y-1">
              <p className="text-xl sm:text-3xl font-bold text-ink leading-snug">
                &ldquo;{stripTrailingPunctuation(exercise.context_translation)}&rdquo;
              </p>
            </div>

            {/* Setelah diperiksa: Tampilkan kunci susunan karakter Mandarin lengkap */}
            {isAnswerChecked && (
              <div className="border-t border-rule pt-3 space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted block font-bold">
                  KUNCI SUSUNAN MANDARIN:
                </span>
                <p className="font-chinese text-2xl sm:text-3xl font-bold text-ink leading-tight">
                  {stripTrailingPunctuation(exercise.context_hanzi)}
                </p>
                <p className="font-mono text-xs sm:text-sm font-semibold text-muted">
                  {stripTrailingPunctuation(exercise.context_pinyin)}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* C. Tipe Soal Pilihan Ganda (Isi Kata Kosong) */
          <div className="border border-rule bg-[#ede9de] p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                CONTOH KALIMAT
              </span>
              <div className="shrink-0">
                <AudioPlayer
                  text={getSpokenContext(exercise)}
                  pinyin={exercise.context_pinyin}
                  audioUrl={exercise.audio_url}
                  size="sm"
                />
              </div>
            </div>

            <p className="font-chinese text-2xl sm:text-4xl font-bold text-ink leading-tight">
              {exercise.context_hanzi}
            </p>

            <div className="border-t border-rule pt-3 space-y-0.5">
              <p className="font-mono text-xs sm:text-sm font-semibold text-ink">
                {exercise.context_pinyin}
              </p>
              <p className="text-xs sm:text-sm text-muted">
                {exercise.context_translation}
              </p>
            </div>
          </div>
        )}

        {/* 4. Area Interaksi Jawaban */}
        {isMultipleChoice ? (
          /* Mode Pilihan Ganda & Audio: Grid 2x2 */
          <div className="space-y-3 pt-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted block">
              PILIH OPSI YANG TEPAT:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {multipleChoiceOptions.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                const letter = String.fromCharCode(65 + idx);
                const parsed = parseOptionLabel(opt);
                let optionStyle = "border-rule bg-canvas hover:border-ink text-ink";

                if (isAnswerChecked) {
                  if (opt === exercise.correct_answer) {
                    optionStyle = "border-2 border-status-success bg-status-success/15 text-ink font-bold";
                  } else if (isSelected) {
                    optionStyle = "border-2 border-accent-red bg-accent-red/10 text-ink line-through";
                  } else {
                    optionStyle = "border-rule bg-canvas opacity-40 text-muted";
                  }
                } else if (isSelected) {
                  optionStyle = "border-2 border-ink bg-canvas font-bold";
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={isAnswerChecked}
                    onClick={() => setSelectedOption(opt)}
                    className={`p-4 sm:p-5 border text-left flex items-center gap-4 transition-colors cursor-pointer ${optionStyle}`}
                  >
                    <span className="font-mono text-xs font-bold border border-rule w-7 h-7 flex items-center justify-center shrink-0 bg-paper">
                      {letter}
                    </span>
                    <div className="flex flex-col items-start leading-tight">
                      <span className="font-chinese text-base sm:text-xl font-bold">
                        {stripTrailingPunctuation(parsed.main)}
                      </span>
                      {parsed.sub && (
                        <span className="font-mono text-xs text-muted font-normal mt-0.5">
                          {stripTrailingPunctuation(parsed.sub)}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Mode Susun Kalimat */
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-muted block">
                SUSUNAN KALIMATMU:
              </span>
              {!isAnswerChecked && orderedWords.length > 0 && (
                <button
                  type="button"
                  onClick={handleResetOrder}
                  className="font-mono text-[11px] uppercase text-muted hover:text-accent-red underline underline-offset-4 cursor-pointer"
                >
                  Hapus Susunan
                </button>
              )}
            </div>

            <div className="min-h-[72px] border-2 border-dashed border-rule p-3.5 bg-[#ede9de]/40 flex flex-wrap items-center gap-2">
              {orderedWords.length === 0 ? (
                <span className="font-mono text-xs text-muted italic">
                  Klik potongan kata di bawah untuk menyusun kalimat...
                </span>
              ) : (
                orderedWords.map((word, idx) => (
                  <button
                    key={`${word.text}-${idx}`}
                    type="button"
                    disabled={isAnswerChecked}
                    onClick={() => handleDeselectWord(word, idx)}
                    className="border border-ink bg-canvas px-3.5 py-1.5 text-left hover:border-accent-red transition-colors cursor-pointer"
                  >
                    <span className="font-chinese font-bold text-base sm:text-lg text-ink block leading-none">
                      {stripTrailingPunctuation(word.text)}
                    </span>
                    {word.pinyin && (
                      <span className="font-mono text-[11px] text-muted block mt-0.5">
                        {stripTrailingPunctuation(word.pinyin)}
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="font-mono text-xs uppercase tracking-widest text-muted block">
                PILIHAN KATA:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {availableWords.map((word, idx) => (
                  <button
                    key={`${word.text}-${idx}`}
                    type="button"
                    disabled={isAnswerChecked}
                    onClick={() => handleSelectWord(word, idx)}
                    className="border border-rule hover:border-ink bg-canvas px-4 py-2.5 text-left transition-colors cursor-pointer"
                  >
                    <span className="font-chinese font-bold text-base sm:text-lg text-ink block leading-none">
                      {stripTrailingPunctuation(word.text)}
                    </span>
                    {word.pinyin && (
                      <span className="font-mono text-[11px] text-muted block mt-0.5">
                        {stripTrailingPunctuation(word.pinyin)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. Feedback Box saat Jawaban Diperiksa */}
        {isAnswerChecked && (
          <div
            className={`border-2 p-5 sm:p-6 space-y-3 ${
              isCorrect
                ? "border-status-success bg-status-success/5"
                : "border-accent-red bg-accent-red/5"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 pt-0.5">
                <img
                  src={isCorrect ? "/images/mascot-correct.png" : "/images/mascot-dizzy.png"}
                  alt={isCorrect ? "Maskot Jawaban Benar" : "Maskot Belum Tepat"}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs uppercase font-bold tracking-wider ${
                      isCorrect ? "text-status-success" : "text-accent-red"
                    }`}
                  >
                    {isCorrect ? "HASIL // BENAR" : "HASIL // BELUM TEPAT"}
                  </span>
                  <span className="font-mono text-[10px] text-muted uppercase">
                    Penjelasan
                  </span>
                </div>

                <p className="text-sm font-bold text-ink">
                  {isCorrect
                    ? "Bagus! Jawabanmu sudah benar."
                    : `Jawaban yang tepat: ${stripTrailingPunctuation(exercise.correct_answer)}`}
                </p>

                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {exercise.explanation}
                </p>
              </div>
            </div>

            {!isCorrect && (
              <div className="pt-2 border-t border-rule/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <span className="text-muted">
                  Kesalahan ini bisa kamu simpan ke jurnal buat dipelajari lagi.
                </span>
                <button
                  type="button"
                  onClick={handleSaveToJournal}
                  disabled={isJournalSaved || isSavingJournal}
                  className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                    isJournalSaved
                      ? "bg-accent-red text-canvas border-accent-red font-bold"
                      : "bg-canvas text-accent-red border-accent-red hover:bg-accent-red hover:text-canvas"
                  }`}
                >
                  {isSavingJournal
                    ? "Menyimpan..."
                    : isJournalSaved
                    ? "✓ Tersimpan di Jurnal"
                    : "+ Catat ke Jurnal"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* 6. Footer Minimal Sesuai Screenshot */}
        <div className="border-t border-rule pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="font-mono text-xs text-muted tracking-wider uppercase">
            MANDARIN CONTEXT LAB · {lesson.moduleTitle ?? "TINGKAT HSK 1"}
          </div>

          <div className="w-full sm:w-auto">
            {!isAnswerChecked ? (
              <button
                type="button"
                onClick={handleCheckAnswer}
                disabled={
                  isMultipleChoice
                    ? !selectedOption
                    : orderedWords.length === 0
                }
                className="w-full sm:w-auto px-8 py-3.5 bg-ink text-canvas hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
              >
                PERIKSA JAWABAN
              </button>
            ) : (
              <button
                type="button"
                onClick={onNextQuestion}
                className="w-full sm:w-auto px-8 py-3.5 bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
              >
                {isLastQuestion ? "SELESAIKAN LATIHAN →" : "SOAL BERIKUTNYA →"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
