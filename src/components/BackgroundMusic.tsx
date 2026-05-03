"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Attempt to autoplay with muted first (browser policy)
    audio.volume = 0.25; // 25% volume - more audible
    audio.muted = false;
    audio.loop = true;

    const playAudio = async () => {
      try {
        await audio.play();
      } catch {
        // Fallback
      }
    };

    // Try play immediately
    playAudio();

    // Fallback interactions
    const handleUserInteraction = () => {
      playAudio();
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);
    // Try after short delay
    setTimeout(() => playAudio(), 1000);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/background-music.mp3"
        preload="none"
        muted={isMuted}
      />

      {/* Optional mute button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-8 right-8 z-40 h-10 w-10 rounded-full border border-dark-400 bg-dark-200 flex items-center justify-center text-xs text-muted hover:text-accent transition-colors"
        title={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </>
  );
}
