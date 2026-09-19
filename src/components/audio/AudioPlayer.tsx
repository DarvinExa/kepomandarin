"use client";

import { useState, useRef } from "react";

interface AudioPlayerProps {
  text: string;
  pinyin?: string;
  audioUrl?: string | null;
  size?: "sm" | "md";
  showSpeedToggle?: boolean;
}

export function AudioPlayer({
  text,
  pinyin,
  audioUrl,
  size = "md",
  showSpeedToggle = true,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<0.75 | 1.0>(1.0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const playWithSpeechSynthesis = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setStatusMessage("Audio tidak didukung di peramban ini");
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = speed === 0.75 ? 0.7 : 0.95; // Sedikit lebih natural untuk Mandarin
    utterance.pitch = 1.0;

    // Cari suara Mandarin jika tersedia di sistem
    const voices = window.speechSynthesis.getVoices();
    const chineseVoice = voices.find(
      (v) => v.lang.startsWith("zh") || v.lang.includes("Chinese")
    );
    if (chineseVoice) {
      utterance.voice = chineseVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setStatusMessage(null);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setStatusMessage("Pelafalan suara gagal diputar");
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    // Jika ada file audio terhosting yang valid
    if (audioUrl) {
      try {
        if (!audioRef.current) {
          audioRef.current = new Audio(audioUrl);
        } else {
          audioRef.current.src = audioUrl;
        }

        audioRef.current.playbackRate = speed;
        audioRef.current.onplay = () => setIsPlaying(true);
        audioRef.current.onended = () => setIsPlaying(false);
        audioRef.current.onerror = () => {
          // Fallback anggun ke SpeechSynthesis jika audio file gagal diakses
          console.warn("Gagal memuat file audio, beralih ke sintesis vokal lokal:", audioUrl);
          playWithSpeechSynthesis();
        };

        audioRef.current.play().catch(() => {
          playWithSpeechSynthesis();
        });
      } catch {
        playWithSpeechSynthesis();
      }
    } else {
      // Fallback anggun langsung menggunakan SpeechSynthesis bawaan
      playWithSpeechSynthesis();
    }
  };

  const handleToggleSpeed = () => {
    const nextSpeed = speed === 1.0 ? 0.75 : 1.0;
    setSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const isSmall = size === "sm";

  return (
    <div className="inline-flex items-center gap-1.5 select-none">
      {/* Tombol Utama Putar / Jeda */}
      <button
        type="button"
        onClick={handlePlayToggle}
        aria-label={isPlaying ? `Jeda audio ${text}` : `Dengarkan pelafalan ${text} (${pinyin ?? ""})`}
        title={isPlaying ? "Jeda pelafalan" : `Dengarkan nada: ${text}`}
        className={`font-mono uppercase tracking-wider font-bold transition-colors cursor-pointer border flex items-center justify-center gap-1.5 ${
          isPlaying
            ? "bg-accent-red text-canvas border-accent-red"
            : "bg-paper text-ink border-rule hover:border-ink hover:bg-canvas"
        } ${isSmall ? "px-2 py-1 text-[11px]" : "px-3 py-1.5 text-xs"}`}
      >
        {isPlaying ? (
          <>
            <svg
              className="w-3 h-3 fill-current shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
            <span>Jeda</span>
          </>
        ) : (
          <>
            <svg
              className="w-3 h-3 fill-current shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span>Audio</span>
          </>
        )}
      </button>

      {/* Kontrol Kecepatan Pelafalan (1.0x / 0.75x) */}
      {showSpeedToggle && (
        <button
          type="button"
          onClick={handleToggleSpeed}
          title={speed === 1.0 ? "Ubah ke pelafalan lambat (0.75x) untuk meneliti nada" : "Kembali ke kecepatan normal (1.0x)"}
          className={`font-mono font-bold px-2 border transition-colors cursor-pointer ${
            speed === 0.75
              ? "bg-accent-blue text-canvas border-accent-blue"
              : "bg-paper text-muted border-rule hover:border-ink hover:text-ink"
          } ${isSmall ? "py-1 text-[10px]" : "py-1.5 text-[11px]"}`}
        >
          {speed === 0.75 ? "0.75× Lambat" : "1.0×"}
        </button>
      )}

      {/* Pesan status jika ada kendala peramban */}
      {statusMessage && (
        <span className="font-mono text-[10px] text-accent-red uppercase ml-1">
          {statusMessage}
        </span>
      )}
    </div>
  );
}
