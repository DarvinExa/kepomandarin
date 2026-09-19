"use client";

import { useState, useRef, useEffect } from "react";
import { AudioPlayer } from "@/components/audio/AudioPlayer";

interface VoiceRecorderExperimentProps {
  targetHanzi: string;
  targetPinyin: string;
  targetTranslation: string;
  targetTone?: string;
  targetAudioUrl?: string | null;
}

export function VoiceRecorderExperiment({
  targetHanzi,
  targetPinyin,
  targetTranslation,
  targetTone,
  targetAudioUrl,
}: VoiceRecorderExperimentProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingRecorded, setIsPlayingRecorded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recordedAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    setErrorMessage(null);
    audioChunksRef.current = [];

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setErrorMessage("Perambanmu belum mendukung perekaman mikrofon.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
        const newUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(newUrl);

        // Hentikan seluruh track audio mikrofon
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 15) {
            // Batasi rekaman maksimal 15 detik untuk kata/frasa
            stopRecording();
            return 15;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err: unknown) {
      console.warn("Izin mikrofon ditolak atau tidak tersedia:", err);
      setErrorMessage("Akses mikrofon tidak diizinkan atau perangkat tidak ditemukan.");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const playRecordedAudio = () => {
    if (!audioUrl) return;

    if (recordedAudioRef.current) {
      recordedAudioRef.current.pause();
    }

    const audio = new Audio(audioUrl);
    recordedAudioRef.current = audio;

    audio.onplay = () => setIsPlayingRecorded(true);
    audio.onended = () => setIsPlayingRecorded(false);
    audio.onerror = () => setIsPlayingRecorded(false);

    audio.play().catch(() => setIsPlayingRecorded(false));
  };

  const handleClear = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setRecordingSeconds(0);
    setErrorMessage(null);
  };

  return (
    <div className="border border-rule bg-canvas p-6 sm:p-8 space-y-6">
      {/* Header Eksperimen */}
      <div className="border-b border-rule pb-4 space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-blue" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            08 // LABORATORIUM VOKAL (EKSPERIMEN MANDIRI)
          </span>
        </div>
        <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-ink">
          Komparasi Pelafalan & Nada
        </h3>
        <p className="text-xs text-muted max-w-xl leading-relaxed">
          Rekam suaramu dan dengarkan secara berdampingan dengan pelafalan standar untuk melatih ketepatan kontur nada secara mandiri tanpa penilaian otomatis.
        </p>
      </div>

      {/* Target Frasa yang Diuji */}
      <div className="border border-rule bg-paper p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted block">
            Target Komparasi
          </span>
          <div className="flex items-baseline gap-3">
            <span className="font-chinese text-2xl sm:text-3xl font-bold text-ink">
              {targetHanzi}
            </span>
            <span className="font-mono text-sm font-semibold text-muted">
              {targetPinyin}
            </span>
            {targetTone && (
              <span className="font-mono text-[11px] font-bold text-accent-blue px-2 py-0.5 border border-rule bg-canvas">
                {targetTone}
              </span>
            )}
          </div>
          <p className="text-xs text-ink">{targetTranslation}</p>
        </div>

        {/* Audio Baku Standar */}
        <div className="space-y-1.5 shrink-0">
          <span className="font-mono text-[10px] uppercase text-muted block">
            Pelafalan Acuan:
          </span>
          <AudioPlayer
            text={targetHanzi}
            pinyin={targetPinyin}
            audioUrl={targetAudioUrl}
            size="md"
          />
        </div>
      </div>

      {/* Kontrol Perekam */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {!isRecording ? (
            <button
              type="button"
              onClick={startRecording}
              className="px-5 py-2.5 bg-accent-red text-canvas font-mono text-xs uppercase tracking-wider font-bold hover:bg-ink transition-colors cursor-pointer flex items-center gap-2 border border-accent-red"
            >
              <span className="w-2.5 h-2.5 bg-canvas inline-block" />
              <span>Mulai Rekam Suaramu</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={stopRecording}
              className="px-5 py-2.5 bg-ink text-canvas font-mono text-xs uppercase tracking-wider font-bold hover:bg-black transition-colors cursor-pointer flex items-center gap-2 border border-ink animate-pulse"
            >
              <span className="w-2.5 h-2.5 bg-accent-red inline-block" />
              <span>Hentikan Rekaman ({recordingSeconds}s)</span>
            </button>
          )}

          {audioUrl && !isRecording && (
            <>
              <button
                type="button"
                onClick={playRecordedAudio}
                disabled={isPlayingRecorded}
                className="px-4 py-2.5 bg-paper text-ink border border-rule hover:border-ink font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <svg
                  className="w-3 h-3 fill-current shrink-0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>{isPlayingRecorded ? "Memutar Rekaman..." : "Dengarkan Suaramu"}</span>
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-2.5 font-mono text-xs text-muted hover:text-accent-red transition-colors cursor-pointer underline underline-offset-4"
              >
                Hapus Rekaman
              </button>
            </>
          )}
        </div>

        {errorMessage && (
          <div className="p-3 bg-accent-red/10 border-l-2 border-accent-red text-xs font-mono text-accent-red">
            {errorMessage}
          </div>
        )}

        {audioUrl && !isRecording && (
          <div className="p-3.5 border border-rule bg-paper space-y-1">
            <span className="font-mono text-[10px] uppercase font-bold text-muted block">
              Instruksi Refleksi Mandiri:
            </span>
            <p className="text-xs text-ink leading-relaxed">
              Dengarkan kembali rekaman suaramu bergantian dengan audio acuan di atas. Perhatikan apakah ketinggian nada (tinggi datar nada 1, naik nada 2, turun-naik nada 3, atau tegas jatuh nada 4) sudah sesuai.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
