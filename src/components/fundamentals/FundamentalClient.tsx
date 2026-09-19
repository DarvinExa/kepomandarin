"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FUNDAMENTAL_TONES,
  TONE_PLACEMENT_RULES,
  FUNDAMENTAL_INITIALS,
  FUNDAMENTAL_FINALS,
  FUNDAMENTAL_STROKES,
  FUNDAMENTAL_STROKE_RULES,
  FUNDAMENTAL_QUIZ,
} from "@/lib/fundamentals";
import { AudioPlayer } from "@/components/audio/AudioPlayer";

export function FundamentalClient() {
  const [activeTab, setActiveTab] = useState<"tones" | "initials" | "finals" | "strokes" | "quiz">("tones");
  const [finalCategoryFilter, setFinalCategoryFilter] = useState<string>("all");

  // State untuk latihan fondasi
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const filteredFinals =
    finalCategoryFilter === "all"
      ? FUNDAMENTAL_FINALS
      : FUNDAMENTAL_FINALS.filter((f) => f.type === finalCategoryFilter);

  const currentQuiz = FUNDAMENTAL_QUIZ[currentQuizIndex];

  const handleSelectOption = (opt: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(opt);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    if (selectedAnswer === currentQuiz.correctAnswer) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex + 1 < FUNDAMENTAL_QUIZ.length) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Banner Fondasi */}
      <section className="border-2 border-ink bg-paper p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rule pb-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-accent-red" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-ink font-bold">
              MODUL 00 // FONDASI DASAR MANDARIN
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-1 bg-accent-blue text-canvas uppercase font-bold">
              PRASYARAT HSK 1
            </span>
            <span className="font-mono text-xs px-2.5 py-1 border border-rule bg-canvas text-muted">
              NADA · PINYIN · GORESAN HANZI
            </span>
          </div>
        </div>

        <div className="space-y-2 max-w-4xl">
          <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-ink">
            Fondasi Fonetik, Nada & Kaidah Menulis Karakter
          </h2>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Sebelum mulai belajar materi HSK 1, pahami cara membaca Pīnyīn, kenali 4 nada dasar, serta aturan goresan menulis Hanzi (*Bǐshùn*) agar kamu punya dasar yang kuat.
          </p>
        </div>

        {/* Triple Stat Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border border-rule divide-x divide-rule bg-canvas pt-1">
          <div className="p-3 text-center">
            <span className="font-mono text-[10px] uppercase text-muted block">4 Nada Inti</span>
            <span className="font-mono text-base font-bold text-ink">Sì Shēng</span>
            <span className="text-[10px] text-muted block">+ Nada Netral</span>
          </div>
          <div className="p-3 text-center">
            <span className="font-mono text-[10px] uppercase text-muted block">23 Inisial</span>
            <span className="font-mono text-base font-bold text-ink">Shēngmǔ</span>
            <span className="text-[10px] text-muted block">Konsonan Dasar</span>
          </div>
          <div className="p-3 text-center">
            <span className="font-mono text-[10px] uppercase text-muted block">24 Final</span>
            <span className="font-mono text-base font-bold text-ink">Yùnmǔ</span>
            <span className="text-[10px] text-muted block">Vokal & Sengau</span>
          </div>
          <div className="p-3 text-center">
            <span className="font-mono text-[10px] uppercase text-muted block">Kaidah Goresan</span>
            <span className="font-mono text-base font-bold text-ink">Bǐshùn</span>
            <span className="text-[10px] text-muted block">8 Goresan Utama</span>
          </div>
        </div>
      </section>

      {/* 2. Tab Navigation */}
      <div className="flex border-b border-rule overflow-x-auto bg-canvas">
        <button
          type="button"
          onClick={() => setActiveTab("tones")}
          className={`px-5 py-3 font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer shrink-0 border-r border-rule ${
            activeTab === "tones"
              ? "bg-ink text-canvas"
              : "text-muted hover:text-ink hover:bg-paper"
          }`}
        >
          01 // 4 Nada & Aturan
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("initials")}
          className={`px-5 py-3 font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer shrink-0 border-r border-rule ${
            activeTab === "initials"
              ? "bg-ink text-canvas"
              : "text-muted hover:text-ink hover:bg-paper"
          }`}
        >
          02 // 23 Inisial (Konsonan)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("finals")}
          className={`px-5 py-3 font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer shrink-0 border-r border-rule ${
            activeTab === "finals"
              ? "bg-ink text-canvas"
              : "text-muted hover:text-ink hover:bg-paper"
          }`}
        >
          03 // 24 Final (Vokal)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("strokes")}
          className={`px-5 py-3 font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer shrink-0 border-r border-rule ${
            activeTab === "strokes"
              ? "bg-ink text-canvas"
              : "text-muted hover:text-ink hover:bg-paper"
          }`}
        >
          04 // Kaidah Menulis Hanzi
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("quiz")}
          className={`px-5 py-3 font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer shrink-0 ${
            activeTab === "quiz"
              ? "bg-accent-red text-canvas"
              : "text-accent-red hover:bg-accent-red hover:text-canvas"
          }`}
        >
          05 // Latihan Fondasi →
        </button>
      </div>

      {/* TAB 01: 4 NADA & ATURAN PENEMPATAN */}
      {activeTab === "tones" && (
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-xl font-bold uppercase tracking-tight text-ink">
              4 Nada Dasar & 1 Nada Netral (*Sì Shēng yǔ Qīngshēng*)
            </h3>
            <p className="text-xs sm:text-sm text-muted max-w-3xl leading-relaxed">
              Bahasa Mandarin adalah bahasa bernada (*tonal language*). Satu suku kata yang sama persis susunan huruf pinyinnya akan memiliki arti yang sama sekali berbeda bila diucapkan dengan kontur nada yang berbeda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FUNDAMENTAL_TONES.map((t) => (
              <div
                key={t.toneNumber}
                className="border-2 border-ink bg-paper p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-rule pb-2">
                    <span className="font-mono text-xs uppercase font-bold text-accent-red">
                      {t.hanziName} ({t.pinyinName})
                    </span>
                    <span className="font-mono text-xs text-muted font-bold">
                      {t.pitchContour}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-ink text-base">{t.name}</h4>
                    <p className="font-mono text-xs text-muted pt-0.5">Tanda: {t.markSymbol}</p>
                  </div>

                  <p className="text-xs text-muted leading-relaxed">{t.description}</p>
                </div>

                <div className="border border-rule bg-canvas p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-chinese text-2xl font-bold text-ink block leading-none">
                        {t.specimen.hanzi}
                      </span>
                      <span className="font-mono text-xs font-bold text-accent-blue block pt-1">
                        {t.specimen.pinyin}
                      </span>
                    </div>
                    <AudioPlayer text={t.specimen.hanzi} pinyin={t.specimen.pinyin} size="sm" showSpeedToggle={false} />
                  </div>
                  <p className="text-[11px] text-ink font-medium border-t border-rule pt-1.5">
                    Arti: <span className="text-muted">{t.specimen.translation}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Aturan Penempatan Tanda Nada */}
          <div className="border-2 border-ink bg-paper p-6 sm:p-8 space-y-4">
            <div className="border-b border-rule pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-mono text-xs uppercase text-accent-red font-bold block">
                  Kaidah Ortografi Pinyin
                </span>
                <h4 className="text-lg font-bold uppercase text-ink">
                  {TONE_PLACEMENT_RULES.title}
                </h4>
              </div>
              <span className="font-mono text-sm font-bold bg-ink text-canvas px-3 py-1">
                Rumus: {TONE_PLACEMENT_RULES.formula}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {TONE_PLACEMENT_RULES.rules.map((rule, idx) => (
                <div key={idx} className="p-3.5 border border-rule bg-canvas flex items-start gap-3">
                  <span className="w-5 h-5 bg-ink text-canvas font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-muted leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 02: 23 INISIAL */}
      {activeTab === "initials" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold uppercase tracking-tight text-ink">
              23 Inisial Bahasa Mandarin (*Shēngmǔ*)
            </h3>
            <p className="text-xs sm:text-sm text-muted max-w-3xl leading-relaxed">
              Inisial adalah konsonan pembuka pada suatu suku kata Mandarin. Perhatikan pembeda kritis seperti konsonan berhembus (*aspirated* misal: p, t, k, q, ch, c) dan konsonan lidah ditekuk (*retroflex* misal: zh, ch, sh, r).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {FUNDAMENTAL_INITIALS.map((init) => (
              <div
                key={init.letter}
                className="border border-rule bg-paper p-4 space-y-3 hover:border-ink transition-colors"
              >
                <div className="flex items-center justify-between border-b border-rule pb-2">
                  <span className="font-mono text-2xl font-black text-accent-red">
                    {init.letter}
                  </span>
                  <span className="font-mono text-[10px] uppercase text-muted bg-canvas border border-rule px-2 py-0.5">
                    {init.category}
                  </span>
                </div>

                <p className="text-xs text-muted leading-relaxed">
                  {init.articulationTip}
                </p>

                <div className="border border-rule bg-canvas p-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-chinese text-base font-bold text-ink">
                      {init.exampleHanzi}
                    </span>{" "}
                    <span className="font-mono text-xs text-accent-blue font-bold">
                      {init.examplePinyin}
                    </span>
                    <span className="text-[11px] text-muted block">
                      {init.exampleTranslation}
                    </span>
                  </div>
                  <AudioPlayer text={init.exampleHanzi} pinyin={init.examplePinyin} size="sm" showSpeedToggle={false} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 03: 24 FINAL */}
      {activeTab === "finals" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold uppercase tracking-tight text-ink">
                24 Final Bahasa Mandarin (*Yùnmǔ*)
              </h3>
              <p className="text-xs text-muted max-w-2xl">
                Bagian vokal suku kata yang terdiri atas vokal tunggal, majemuk gabungan, dan sengau nasal.
              </p>
            </div>

            {/* Filter Kategori Final */}
            <div className="flex flex-wrap gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setFinalCategoryFilter("all")}
                className={`font-mono text-[11px] uppercase px-3 py-1 border transition-colors cursor-pointer ${
                  finalCategoryFilter === "all"
                    ? "bg-ink text-canvas border-ink font-bold"
                    : "bg-paper text-ink border-rule hover:border-ink"
                }`}
              >
                Semua ({FUNDAMENTAL_FINALS.length})
              </button>
              <button
                type="button"
                onClick={() => setFinalCategoryFilter("Vokal Tunggal")}
                className={`font-mono text-[11px] uppercase px-3 py-1 border transition-colors cursor-pointer ${
                  finalCategoryFilter === "Vokal Tunggal"
                    ? "bg-ink text-canvas border-ink font-bold"
                    : "bg-paper text-ink border-rule hover:border-ink"
                }`}
              >
                Tunggal (6)
              </button>
              <button
                type="button"
                onClick={() => setFinalCategoryFilter("Vokal Majemuk")}
                className={`font-mono text-[11px] uppercase px-3 py-1 border transition-colors cursor-pointer ${
                  finalCategoryFilter === "Vokal Majemuk"
                    ? "bg-ink text-canvas border-ink font-bold"
                    : "bg-paper text-ink border-rule hover:border-ink"
                }`}
              >
                Majemuk (9)
              </button>
              <button
                type="button"
                onClick={() => setFinalCategoryFilter("Vokal Sengau (Nasal)")}
                className={`font-mono text-[11px] uppercase px-3 py-1 border transition-colors cursor-pointer ${
                  finalCategoryFilter === "Vokal Sengau (Nasal)"
                    ? "bg-ink text-canvas border-ink font-bold"
                    : "bg-paper text-ink border-rule hover:border-ink"
                }`}
              >
                Sengau (9)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredFinals.map((fin) => (
              <div
                key={fin.letter}
                className="border border-rule bg-paper p-4 space-y-3 hover:border-ink transition-colors"
              >
                <div className="flex items-center justify-between border-b border-rule pb-2">
                  <span className="font-mono text-2xl font-black text-accent-blue">
                    {fin.letter}
                  </span>
                  <span className="font-mono text-[10px] uppercase text-muted bg-canvas border border-rule px-2 py-0.5">
                    {fin.type}
                  </span>
                </div>

                <p className="text-xs text-muted leading-relaxed">
                  {fin.soundDescription}
                </p>

                <div className="border border-rule bg-canvas p-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-chinese text-base font-bold text-ink">
                      {fin.exampleHanzi}
                    </span>{" "}
                    <span className="font-mono text-xs text-accent-red font-bold">
                      {fin.examplePinyin}
                    </span>
                    <span className="text-[11px] text-muted block">
                      {fin.exampleTranslation}
                    </span>
                  </div>
                  <AudioPlayer text={fin.exampleHanzi} pinyin={fin.examplePinyin} size="sm" showSpeedToggle={false} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 04: GORESAN & KAIDAH MENULIS HANZI */}
      {activeTab === "strokes" && (
        <div className="space-y-8">
          {/* Bagian 1: 8 Goresan Dasar */}
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-accent-red font-bold block">
                ANATOMI GORESAN DASAR (YǑNGZÌ BĀFǍ)
              </span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-ink">
                8 Goresan Pembangun Seluruh Karakter Hanzi
              </h3>
              <p className="text-xs sm:text-sm text-muted max-w-3xl leading-relaxed">
                Setiap karakter Mandarin, betapapun rumitnya, selalu tersusun dari variasi 8 goresan dasar ini. Memahami arah dan karakter goresan membuat penulisan Hanzi menjadi seimbang, proporsional, dan estetis.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {FUNDAMENTAL_STROKES.map((st) => (
                <div key={st.name} className="border border-rule bg-paper p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-rule pb-2">
                    <span className="font-chinese text-3xl font-bold text-ink">
                      {st.visualSymbol}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-muted bg-canvas px-2 py-0.5 border border-rule">
                      {st.direction}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-ink">{st.name}</h4>
                    <p className="text-xs text-muted leading-relaxed pt-1">{st.description}</p>
                  </div>

                  <div className="border border-rule bg-canvas p-2 text-xs flex items-center justify-between">
                    <span className="text-muted">Contoh:</span>
                    <span className="font-chinese text-base font-bold text-ink">
                      {st.exampleChar}
                    </span>
                    <span className="font-mono text-[11px] text-accent-blue font-bold">
                      {st.examplePinyin}
                    </span>
                    <span className="text-muted text-[11px]">({st.exampleMeaning})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bagian 2: 7 Kaidah Utama Urutan Menulis */}
          <div className="space-y-4 pt-4 border-t border-rule">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-accent-blue font-bold block">
                KAIDAH URUTAN GORESAN (BǏSHÙN GUĪZÉ)
              </span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-ink">
                7 Kaidah Utama Menulis Karakter Mandarin
              </h3>
              <p className="text-xs sm:text-sm text-muted max-w-3xl leading-relaxed">
                Menulis Hanzi memiliki urutan baku (*stroke order*). Mengikuti kaidah urutan ini memudahkan mengingat memori motorik tangan dan menghasilkan karakter yang rapi.
              </p>
            </div>

            <div className="border border-rule divide-y divide-rule bg-paper">
              {FUNDAMENTAL_STROKE_RULES.map((rule) => (
                <div
                  key={rule.number}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-canvas/50 transition-colors"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-ink text-canvas font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {rule.number}
                      </span>
                      <h4 className="font-bold text-base text-ink">
                        {rule.ruleTitle}
                      </h4>
                      <span className="font-chinese text-sm text-accent-red font-bold">
                        {rule.hanziPrinciple}
                      </span>
                      <span className="font-mono text-xs text-muted">
                        ({rule.pinyinPrinciple})
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed pl-9">
                      {rule.explanation}
                    </p>
                    <p className="font-mono text-[11px] text-ink pl-9">
                      Tahapan: <span className="text-muted">{rule.strokeSteps}</span>
                    </p>
                  </div>

                  <div className="shrink-0 border border-rule bg-canvas p-3 text-center min-w-[110px]">
                    <span className="font-chinese text-2xl font-black text-ink block leading-none">
                      {rule.exampleChar}
                    </span>
                    <span className="font-mono text-xs text-accent-blue font-bold block pt-1">
                      {rule.examplePinyin}
                    </span>
                    <span className="text-[10px] text-muted block">({rule.exampleMeaning})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 05: LATIHAN EVALUASI FONDASI */}
      {activeTab === "quiz" && (
        <div className="space-y-6 max-w-2xl mx-auto">
          {!isQuizCompleted ? (
            <div className="border-2 border-ink bg-paper p-6 sm:p-10 space-y-6">
              {/* Progress Bar & Header */}
              <div className="space-y-2 border-b border-rule pb-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="uppercase font-bold text-accent-red tracking-wider">
                    LATIHAN FONDASI DASAR
                  </span>
                  <span className="text-muted">
                    SOAL {currentQuizIndex + 1} DARI {FUNDAMENTAL_QUIZ.length}
                  </span>
                </div>
                <div className="w-full bg-canvas h-1.5 border border-rule">
                  <div
                    className="bg-accent-red h-full transition-all duration-300"
                    style={{
                      width: `${((currentQuizIndex + 1) / FUNDAMENTAL_QUIZ.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Prompt Soal */}
              <div className="space-y-3">
                {currentQuiz.contextText && (
                  <div className="p-3 border border-rule bg-canvas font-mono text-xs text-ink flex items-center justify-between">
                    <span>{currentQuiz.contextText}</span>
                    {currentQuiz.audioText && (
                      <AudioPlayer text={currentQuiz.audioText} size="sm" showSpeedToggle={false} />
                    )}
                  </div>
                )}
                <h3 className="text-base sm:text-lg font-bold text-ink leading-relaxed">
                  {currentQuiz.prompt}
                </h3>
              </div>

              {/* Pilihan Jawaban */}
              <div className="space-y-2.5">
                {currentQuiz.options.map((opt) => {
                  const isSelected = selectedAnswer === opt;
                  let optStyle = "border-rule bg-canvas hover:border-ink text-ink";

                  if (isAnswerSubmitted) {
                    if (opt === currentQuiz.correctAnswer) {
                      optStyle = "border-status-success bg-status-success/15 text-ink font-bold";
                    } else if (isSelected) {
                      optStyle = "border-accent-red bg-accent-red/10 text-ink line-through";
                    }
                  } else if (isSelected) {
                    optStyle = "border-ink bg-ink text-canvas font-bold";
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full p-4 border text-left text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswerSubmitted && opt === currentQuiz.correctAnswer && (
                        <span className="font-mono text-xs font-bold text-status-success">✓ Benar</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Box saat jawaban disubmit */}
              {isAnswerSubmitted && (
                <div className="p-4 border border-rule bg-canvas space-y-1">
                  <span className="font-mono text-[11px] font-bold uppercase text-ink block">
                    Penjelasan:
                  </span>
                  <p className="text-xs text-muted leading-relaxed">
                    {currentQuiz.explanation}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex justify-end">
                {!isAnswerSubmitted ? (
                  <button
                    type="button"
                    disabled={!selectedAnswer}
                    onClick={handleSubmitAnswer}
                    className="px-6 py-3 bg-ink text-canvas font-mono text-xs uppercase tracking-wider font-bold hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Periksa Jawaban
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextQuiz}
                    className="px-6 py-3 bg-accent-red text-canvas font-mono text-xs uppercase tracking-wider font-bold hover:bg-black transition-colors"
                  >
                    {currentQuizIndex + 1 < FUNDAMENTAL_QUIZ.length ? "Soal Berikutnya →" : "Lihat Hasil Latihan →"}
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* HASIL KELULUSAN LATIHAN FONDASI & CTA SEAMLESS KE HSK 1 */
            <div className="border-2 border-ink bg-paper p-6 sm:p-10 space-y-6 text-center">
              <div className="inline-block border border-status-success px-3 py-1 font-mono text-xs text-status-success uppercase bg-status-success/10 font-bold">
                ✓ LATIHAN FONDASI DASAR SELESAI
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-ink">
                  Fondasi Dasar Selesai!
                </h3>
                <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
                  Skor latihanmu: <span className="font-mono font-bold text-ink">{quizScore}</span> dari{" "}
                  <span className="font-mono font-bold text-ink">{FUNDAMENTAL_QUIZ.length}</span> soal. Kamu sudah siap melanjutkan ke materi HSK 1.
                </p>
              </div>

              {/* De Stijl Accent Strip */}
              <div className="grid grid-cols-3 gap-1 max-w-xs mx-auto py-2" aria-hidden="true">
                <div className="h-1.5 bg-accent-red" />
                <div className="h-1.5 bg-accent-blue" />
                <div className="h-1.5 bg-accent-yellow" />
              </div>

              {/* SEAMLESS CTA: Lanjut ke HSK 1 Pelajaran 01 */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/lessons/01"
                  className="w-full sm:w-auto px-8 py-4 bg-ink text-canvas hover:bg-black font-mono text-xs uppercase tracking-widest font-black transition-colors block text-center"
                >
                  Lanjut ke HSK 1: Pelajaran 01 (Sapaan Sopan) →
                </Link>
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="w-full sm:w-auto px-5 py-4 border border-rule hover:border-ink text-ink font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer block text-center"
                >
                  Ulangi Latihan
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
