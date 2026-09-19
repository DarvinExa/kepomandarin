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

interface PracticeEngineProps {
  initialExercises: ExerciseItem[];
  title?: string;
  subtitle?: string;
  userId?: string | null;
  lessonSlug?: string;
}

export function PracticeEngine({
  initialExercises,
  title = "Sesi Latihan Interaktif",
  subtitle = "HSK 1 · Latihan Konteks",
  userId,
  lessonSlug,
}: PracticeEngineProps) {
  const [exercises] = useState<ExerciseItem[]>(initialExercises);
  const [currentIndex, setCurrentIndex] = useState(0);
  const clientSeed = useClientSeed();
  const [restartCount, setRestartCount] = useState(0);
  const sessionSeed = clientSeed + restartCount;

  // State hasil sesi
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasSavedAttempt, setHasSavedAttempt] = useState(false);

  if (!exercises || exercises.length === 0) {
    return (
      <div className="border border-rule bg-paper p-8 sm:p-16 text-center space-y-4">
        <div className="inline-block border border-rule px-3 py-1 font-mono text-xs text-muted uppercase bg-canvas">
          Status Soal
        </div>
        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
          Tidak ada soal latihan untuk unit ini.
        </h2>
        <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
          Pilih unit latihan lain atau kembali ke silabus pembelajaran HSK 1.
        </p>
        <div className="pt-2">
          <Link
            href="/lessons"
            className="inline-block px-5 py-2.5 bg-ink text-canvas font-mono text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors"
          >
            Kembali ke Silabus
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
            lessonSlug,
            score: correctCount,
            total,
            accuracy: calculatedAccuracy,
          },
          userId
        );
      }
    }
  };

  // Ulangi sesi latihan dari awal
  const handleRestart = () => {
    setRestartCount((prev) => prev + 1);
    setCurrentIndex(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setIsCompleted(false);
    setHasSavedAttempt(false);
  };

  // Tampilan Ringkasan Selesai (Completion Screen)
  if (isCompleted) {
    const totalAnswered = correctCount + incorrectCount;
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

    const currentUnitNum = lessonSlug ? parseInt(lessonSlug, 10) : NaN;
    const nextUnitSlug =
      !isNaN(currentUnitNum) && currentUnitNum < 5
        ? String(currentUnitNum + 1).padStart(2, "0")
        : null;

    const LESSON_TITLES: Record<string, string> = {
      "01": "Sapaan Sopan",
      "02": "Identitas Diri",
      "03": "Angka & Waktu",
      "04": "Anggota Keluarga",
      "05": "Restoran & Lokasi",
    };

    return (
      <div className="border-2 border-ink bg-paper p-6 sm:p-12 space-y-8 max-w-2xl mx-auto">
        {/* Header Ringkasan */}
        <div className="border-b border-rule pb-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <img
            src={accuracy >= 70 ? "/images/mascot-celebrating.png" : "/images/mascot-studying.png"}
            alt={accuracy >= 70 ? "Maskot Perayaan Sukses" : "Maskot Belajar Mandiri"}
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0"
          />
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase font-bold text-accent-red tracking-widest">
                HASIL EVALUASI // SESI SELESAI
              </span>
              <span className="font-mono text-xs text-muted">
                {totalAnswered} SOAL DIKERJAKAN
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-ink">
              Ringkasan Sesi Latihan
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              Berikut adalah evaluasi akurasi pemahaman struktur kalimat, ejaan pinyin, dan pelafalan nada pada unit ini.
            </p>
          </div>
        </div>

        {/* Notifikasi Status Penyimpanan Sesi */}
        <div className="p-3.5 border border-status-success bg-status-success/10 flex items-center justify-between font-mono text-xs">
          <span className="font-bold text-status-success">
            ✓ HASIL LATIHAN TERSIMPAN
          </span>
          <span className="text-[10px] text-muted uppercase">
            {userId ? "Disimpan di akun" : "Disimpan di browser (tamu)"}
          </span>
        </div>

        {/* Metrik Skor Akurasi */}
        <div className="grid grid-cols-3 border border-rule divide-x divide-rule bg-canvas">
          <div className="p-4 sm:p-6 text-center space-y-1">
            <span className="font-mono text-[10px] uppercase text-muted block">Akurasi</span>
            <span className="font-mono text-2xl sm:text-4xl font-black text-ink">
              {accuracy}%
            </span>
            <span className="text-[10px] text-muted block">Akurasi Jawaban</span>
          </div>
          <div className="p-4 sm:p-6 text-center space-y-1">
            <span className="font-mono text-[10px] uppercase text-status-success font-semibold block">
              Benar
            </span>
            <span className="font-mono text-2xl sm:text-4xl font-black text-status-success">
              {correctCount}
            </span>
            <span className="text-[10px] text-muted block">Jawaban Benar</span>
          </div>
          <div className="p-4 sm:p-6 text-center space-y-1">
            <span className="font-mono text-[10px] uppercase text-accent-red font-semibold block">
              Salah
            </span>
            <span className="font-mono text-2xl sm:text-4xl font-black text-accent-red">
              {incorrectCount}
            </span>
            <span className="text-[10px] text-muted block">Perlu Dipelajari</span>
          </div>
        </div>

        {/* Bauhaus Accent Strip */}
        <div className="grid grid-cols-3 gap-1" aria-hidden="true">
          <div className="h-1.5 bg-accent-red" />
          <div className="h-1.5 bg-accent-blue" />
          <div className="h-1.5 bg-accent-yellow" />
        </div>

        {/* Seamless Next Action CTA Card */}
        <div className="border border-rule bg-canvas p-4 sm:p-6 space-y-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent-red font-bold block">
            LANGKAH BERIKUTNYA
          </span>
          {nextUnitSlug ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-ink text-sm sm:text-base">
                  Pelajaran {nextUnitSlug}: {LESSON_TITLES[nextUnitSlug] ?? "Materi Baru"}
                </h4>
                <p className="text-xs text-muted">
                  Lanjut ke materi pelajaran berikutnya, kosakata, dan contoh percakapan.
                </p>
              </div>
              <Link
                href={`/lessons/${nextUnitSlug}`}
                className="px-6 py-3.5 bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-widest font-black transition-colors shrink-0 text-center"
              >
                Lanjut ke Pelajaran {nextUnitSlug} →
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-ink text-sm sm:text-base">
                  Selamat! Seluruh Pelajaran HSK 1 Telah Selesai
                </h4>
                <p className="text-xs text-muted">
                  Semua 5 unit HSK 1 sudah kamu selesaikan. Kamu bisa lanjut melihat materi HSK 2.
                </p>
              </div>
              <Link
                href="/lessons/hsk2"
                className="px-6 py-3.5 bg-accent-red text-canvas hover:bg-black font-mono text-xs uppercase tracking-widest font-black transition-colors shrink-0 text-center"
              >
                Lanjut ke Pelajaran HSK 2 →
              </Link>
            </div>
          )}
        </div>

        {/* Secondary Auxiliary Actions */}
        <div className="pt-1 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRestart}
              className="text-muted hover:text-ink underline underline-offset-4 cursor-pointer"
            >
              Ulangi Latihan Ini
            </button>
            <span className="text-rule">·</span>
            <Link href="/lessons" className="text-muted hover:text-ink underline underline-offset-4">
              Silabus Pelajaran
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
    );
  }

  const currentQuestion = exercises[currentIndex];

  return (
    <QuestionCard
      key={`${currentQuestion.id}-${sessionSeed}`}
      question={currentQuestion}
      sessionSeed={sessionSeed}
      questionIndex={currentIndex}
      totalQuestions={exercises.length}
      title={title}
      subtitle={subtitle}
      onAnswerSubmitted={handleAnswerSubmitted}
      onNextQuestion={handleNextQuestion}
      isLastQuestion={currentIndex + 1 >= exercises.length}
    />
  );
}

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

interface QuestionCardProps {
  question: ExerciseItem;
  sessionSeed: number;
  questionIndex: number;
  totalQuestions: number;
  title: string;
  subtitle: string;
  onAnswerSubmitted: (isCorrect: boolean) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

function QuestionCard({
  question,
  sessionSeed,
  questionIndex,
  totalQuestions,
  title,
  subtitle,
  onAnswerSubmitted,
  onNextQuestion,
  isLastQuestion,
}: QuestionCardProps) {
  const isListening = question.type === "listening";
  const isMultipleChoice = question.type === "multiple_choice" || isListening;
  const multipleChoiceOptions = useMemo(() => {
    if (!isMultipleChoice) return [];
    return seededShuffle(question.options as string[], `${question.id}-${sessionSeed}`);
  }, [question.id, question.options, isMultipleChoice, sessionSeed]);

  // State Pilihan Ganda / Audio
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // State Susun Kalimat
  const [availableWords, setAvailableWords] = useState<SentenceOrderingFragment[]>(() => {
    if (isMultipleChoice) return [];
    return seededShuffle(
      question.options as SentenceOrderingFragment[],
      `${question.id}-${sessionSeed}`
    );
  });
  const [orderedWords, setOrderedWords] = useState<SentenceOrderingFragment[]>([]);

  // State Pemeriksaan
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isJournalSaved, setIsJournalSaved] = useState(false);
  const [isSavingJournal, setIsSavingJournal] = useState(false);

  const handleSaveToJournal = async () => {
    if (isJournalSaved || isSavingJournal) return;
    setIsSavingJournal(true);
    const userAns = isMultipleChoice
      ? selectedOption
      : orderedWords.map((w) => w.text).join(" ");
    await addErrorEntry({
      exercise_id: question.id,
      hanzi: question.context_hanzi,
      pinyin: question.context_pinyin,
      translation: question.context_translation,
      category:
        question.type === "sentence_ordering"
          ? "Urutan Kata"
          : isListening
          ? "Nada"
          : "Tata Bahasa",
      error_context: userAns ? `Jawabanmu: ${userAns}` : null,
      notes: question.explanation,
    });
    setIsSavingJournal(false);
    setIsJournalSaved(true);
  };

  // Handle klik blok kata di Susun Kalimat (pindahkan dari available ke ordered)
  const handleSelectWord = (fragment: SentenceOrderingFragment, index: number) => {
    if (isAnswerChecked) return;
    setOrderedWords((prev) => [...prev, fragment]);
    setAvailableWords((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle pembatalan blok kata (pindahkan dari ordered ke available)
  const handleDeselectWord = (fragment: SentenceOrderingFragment, index: number) => {
    if (isAnswerChecked) return;
    setAvailableWords((prev) => [...prev, fragment]);
    setOrderedWords((prev) => prev.filter((_, i) => i !== index));
  };

  // Reset susunan kata
  const handleResetOrder = () => {
    if (isAnswerChecked) return;
    setAvailableWords(
      seededShuffle(
        question.options as SentenceOrderingFragment[],
        `${question.id}-${sessionSeed}`
      )
    );
    setOrderedWords([]);
  };

  // Periksa jawaban
  const handleCheckAnswer = () => {
    let correct = false;
    if (isMultipleChoice) {
      if (!selectedOption) return;
      correct = selectedOption.trim() === question.correct_answer.trim();
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

      const targetNoSpace = stripAll(question.correct_answer);
      const targetSpaced = stripWithSpaces(question.correct_answer);
      const hanziNoSpace = stripAll(question.context_hanzi);
      const transSpaced = stripWithSpaces(question.context_translation);

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
    <div className="border border-rule bg-paper space-y-0">
      {/* 1. Header Sesi & Progress Bar */}
      <div className="border-b border-rule p-4 sm:p-6 bg-canvas flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-0.5">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent-red block">
            {subtitle}
          </span>
          <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-ink">
            {title}
          </h2>
        </div>

        {/* Indikator Progres Soal */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="border border-rule px-3 py-1 bg-paper text-ink font-semibold">
            SOAL {questionIndex + 1} DARI {totalQuestions}
          </span>
          <span className="text-[10px] text-muted uppercase">
            {isListening
              ? "Mendengar Audio"
              : isMultipleChoice
              ? "Pilihan Ganda"
              : "Susun Kalimat"}
          </span>
        </div>
      </div>

      {/* Baris Garis Progres Visual */}
      <div className="w-full h-1.5 bg-paper border-b border-rule relative">
        <div
          className="h-full bg-accent-blue transition-all duration-300"
          style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* 2. Soal & Konteks Wacana */}
      <div className="p-6 sm:p-10 space-y-6">
        {/* Prompt Instruksi */}
        <div className="space-y-1">
          <span className="font-mono text-xs font-bold text-muted uppercase tracking-widest block">
            Instruksi Soal
          </span>
          <p className="text-sm sm:text-base font-semibold text-ink leading-snug">
            {question.prompt}
          </p>
        </div>

        {/* Kotak Konteks Kalimat / Stimulus Audio */}
        {isListening ? (
          /* A. Tipe Soal Mendengar (Listening) */
          <div className="border border-rule bg-canvas p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-accent-blue tracking-wider">
                STIMULUS AUDIO // SIMAK DENGAN TELITI
              </span>
              <span className="font-mono text-[10px] text-muted uppercase">
                Mandarin Lisan
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-paper p-4 border border-rule">
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-ink block">
                  Audio Pelafalan Soal
                </span>
                <span className="text-xs text-muted">
                  Dengarkan pelafalan normal atau gunakan 0.75× untuk mencermati nada
                </span>
              </div>
              <div className="shrink-0">
                <AudioPlayer
                  text={question.context_hanzi}
                  pinyin={question.context_pinyin}
                  audioUrl={question.audio_url}
                  size="md"
                />
              </div>
            </div>

            {!isAnswerChecked ? (
              <div className="border border-dashed border-rule p-4 bg-paper/60 text-center">
                <p className="font-mono text-xs text-muted">
                  Teks Hanzi dan ejaan pinyin disembunyikan. Putar audio di atas lalu pilih jawaban yang tepat di bawah.
                </p>
              </div>
            ) : (
              <div className="space-y-2 border-t border-rule/60 pt-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted block">
                  Transkrip Lengkap:
                </span>
                <p className="font-chinese text-2xl sm:text-3xl font-bold text-ink">
                  {question.context_hanzi}
                </p>
                <div className="space-y-0.5 border-t border-rule/40 pt-1 font-mono text-xs sm:text-sm text-muted">
                  <p className="font-semibold text-ink">{question.context_pinyin}</p>
                  <p className="text-xs text-muted">{question.context_translation}</p>
                </div>
              </div>
            )}
          </div>
        ) : question.type === "sentence_ordering" ? (
          /* B. Tipe Soal Susun Kalimat (Soal Bahasa Indonesia -> Susun Kalimat Mandarin) */
          <div className="border border-rule bg-canvas p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted block font-bold">
                TARGET KALIMAT
              </span>
              <div className="shrink-0">
                <AudioPlayer
                  text={question.context_hanzi}
                  pinyin={question.context_pinyin}
                  audioUrl={question.audio_url}
                  size="sm"
                />
              </div>
            </div>

            {/* Stimulus Soal: Menampilkan arti kalimat dalam Bahasa Indonesia */}
            <div className="space-y-1">
              <p className="text-xl sm:text-3xl font-bold text-ink leading-snug">
                &ldquo;{stripTrailingPunctuation(question.context_translation)}&rdquo;
              </p>
            </div>

            {/* Setelah diperiksa: Buka kunci susunan karakter Mandarin lengkap */}
            {isAnswerChecked && (
              <div className="border-t border-rule pt-3 space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted block font-bold">
                  KUNCI SUSUNAN MANDARIN:
                </span>
                <p className="font-chinese text-2xl sm:text-3xl font-bold text-ink leading-tight">
                  {stripTrailingPunctuation(question.context_hanzi)}
                </p>
                <p className="font-mono text-xs sm:text-sm font-semibold text-muted">
                  {stripTrailingPunctuation(question.context_pinyin)}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* C. Tipe Soal Pilihan Ganda (Isi Kata Kosong) */
          <div className="border border-rule bg-canvas p-6 sm:p-8 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted block">
                Konteks Kalimat
              </span>
              <div className="shrink-0">
                <AudioPlayer
                  text={getSpokenContext(question)}
                  pinyin={question.context_pinyin}
                  audioUrl={question.audio_url}
                  size="sm"
                />
              </div>
            </div>
            <p className="font-chinese text-2xl sm:text-4xl font-bold text-ink leading-tight">
              {question.context_hanzi}
            </p>
            <div className="space-y-1 border-t border-rule pt-2 font-mono text-xs sm:text-sm text-muted">
              <p className="font-semibold text-ink">{question.context_pinyin}</p>
              <p className="text-xs text-muted">{question.context_translation}</p>
            </div>
          </div>
        )}

        {/* 3. Area Interaksi Jawaban */}
        {isMultipleChoice ? (
          /* Mode A: Pilihan Ganda */
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-muted block">
              Pilih Opsi yang Tepat:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {multipleChoiceOptions.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                const parsed = parseOptionLabel(opt);
                let optionStyle = "border-rule bg-paper hover:border-ink text-ink";

                if (isAnswerChecked) {
                  if (opt === question.correct_answer) {
                    optionStyle = "border-status-success bg-status-success/10 text-ink font-bold";
                  } else if (isSelected && !isCorrect) {
                    optionStyle = "border-accent-red bg-accent-red/10 text-accent-red font-bold";
                  } else {
                    optionStyle = "border-rule bg-paper opacity-50 text-muted";
                  }
                } else if (isSelected) {
                  optionStyle = "border-2 border-ink bg-ink text-canvas font-bold";
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={isAnswerChecked}
                    onClick={() => setSelectedOption(opt)}
                    className={`p-4 border text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold w-6 h-6 border border-current flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <div className="flex flex-col items-start leading-tight">
                        <span className="font-chinese text-base sm:text-xl font-bold">
                          {stripTrailingPunctuation(parsed.main)}
                        </span>
                        {parsed.sub && (
                          <span className="font-mono text-xs opacity-75 font-normal mt-0.5">
                            {stripTrailingPunctuation(parsed.sub)}
                          </span>
                        )}
                      </div>
                    </div>
                    {isAnswerChecked && opt === question.correct_answer && (
                      <span className="font-mono text-[10px] uppercase font-bold text-status-success shrink-0">
                        Jawaban Benar
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Mode B: Susun Kalimat */
          <div className="space-y-4">
            {/* Slot Kalimat Hasil Susunan Pengguna */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  Susunan Kalimatmu:
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

              <div className="min-h-[72px] border-2 border-dashed border-rule p-3 bg-canvas flex flex-wrap items-center gap-2">
                {orderedWords.length === 0 ? (
                  <span className="font-mono text-xs text-muted italic">
                    Klik blok kata di bawah untuk menyusun urutan kalimat...
                  </span>
                ) : (
                  orderedWords.map((word, idx) => (
                    <button
                      key={`${word.text}-${idx}`}
                      type="button"
                      disabled={isAnswerChecked}
                      onClick={() => handleDeselectWord(word, idx)}
                      className="border border-ink bg-paper px-3.5 py-1.5 text-left hover:border-accent-red group transition-colors cursor-pointer"
                    >
                      <span className="font-chinese font-bold text-sm sm:text-base text-ink block leading-none">
                        {stripTrailingPunctuation(word.text)}
                      </span>
                      {word.pinyin && (
                        <span className="font-mono text-[10px] text-muted block group-hover:text-accent-red">
                          {stripTrailingPunctuation(word.pinyin)}
                        </span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Pilihan Blok Kata yang Tersedia */}
            <div className="space-y-1.5">
              <span className="font-mono text-xs uppercase tracking-wider text-muted block">
                Pilihan Kata:
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {availableWords.map((word, idx) => (
                  <button
                    key={`${word.text}-${idx}`}
                    type="button"
                    disabled={isAnswerChecked}
                    onClick={() => handleSelectWord(word, idx)}
                    className="border border-rule hover:border-ink bg-paper px-4 py-2 text-left transition-colors cursor-pointer"
                  >
                    <span className="font-chinese font-bold text-sm sm:text-base text-ink block leading-none">
                      {stripTrailingPunctuation(word.text)}
                    </span>
                    {word.pinyin && (
                      <span className="font-mono text-[10px] text-muted block">
                        {stripTrailingPunctuation(word.pinyin)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. Panel Umpan Balik Instan (Feedback Area) */}
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
                    {isCorrect ? "HASIL // JAWABAN TEPAT" : "HASIL // BELUM TEPAT"}
                  </span>
                  <span className="font-mono text-[10px] text-muted uppercase">
                    Penjelasan
                  </span>
                </div>

                <p className="text-sm font-bold text-ink">
                  {isCorrect
                    ? "Bagus! Jawabanmu benar."
                    : `Jawaban yang benar: ${stripTrailingPunctuation(question.correct_answer)}`}
                </p>

                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            </div>

            {!isCorrect && (
              <div className="pt-2 border-t border-rule/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <span className="text-muted">
                  Kesalahan ini bisa kamu catat agar bisa dipelajari lagi.
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSaveToJournal}
                    disabled={isJournalSaved || isSavingJournal}
                    className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                      isJournalSaved
                        ? "bg-accent-red text-canvas border-accent-red font-bold"
                        : "bg-paper text-accent-red border-accent-red hover:bg-accent-red hover:text-canvas"
                    }`}
                  >
                    {isSavingJournal
                      ? "Menyimpan..."
                      : isJournalSaved
                      ? "✓ Tersimpan di Jurnal"
                      : "+ Catat ke Jurnal"}
                  </button>
                  <Link
                    href="/error-journal"
                    className="text-ink underline underline-offset-4 hover:text-accent-red transition-colors"
                  >
                    Buka Jurnal →
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. Tombol Tindakan (Check / Next) */}
        <div className="pt-4 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-muted">
            MANDARIN CONTEXT LAB · TINGKAT HSK 1
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!isAnswerChecked ? (
              <button
                type="button"
                onClick={handleCheckAnswer}
                disabled={
                  isMultipleChoice
                    ? !selectedOption
                    : orderedWords.length === 0
                }
                className="w-full sm:w-auto px-8 py-3.5 bg-ink text-canvas hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              >
                Periksa Jawaban
              </button>
            ) : (
              <button
                type="button"
                onClick={onNextQuestion}
                className="w-full sm:w-auto px-8 py-3.5 bg-accent-blue text-canvas hover:bg-ink font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              >
                {isLastQuestion ? "Lihat Hasil Akhir →" : "Soal Berikutnya →"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
