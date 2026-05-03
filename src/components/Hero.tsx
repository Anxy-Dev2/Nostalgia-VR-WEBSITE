"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { gameInfo } from "@/data";

const atmospheres = [
  "Dreamcore",
  "Weirdcore",
  "Frutiger Aero",
  "The Backrooms",
  "Liminal Horror",
];

export default function Hero() {
  const [atmoIndex, setAtmoIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const current = atmospheres[atmoIndex];
    if (!isDeleting) {
      if (displayText.length < current.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length + 1));
        }, 70);
      } else {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 35);
      } else {
        setIsDeleting(false);
        setAtmoIndex((prev) => (prev + 1) % atmospheres.length);
      }
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayText, isDeleting, atmoIndex]);

  const stars = Math.round(parseFloat(gameInfo.rating));

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden liminal-fog">
      {/* Background ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-purple-900/10 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12 py-32">
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <img
            src="/images/Untitled3.png"
            alt="Logo"
            className="h-auto max-w-[800px] w-full max-h-[500px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
          />
        </motion.div>

        <motion.div
          className="mb-6 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.6 }}
        >
          <span className="font-mono text-base text-accent md:text-lg">{displayText}</span>
          <span className="animate-pulse-glow ml-0.5 text-accent">|</span>
        </motion.div>

        <motion.p
          className="mb-8 max-w-xl text-base leading-relaxed text-body"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.8 }}
        >
          {gameInfo.tagline} — A multiplayer VR horror game featuring Dreamcore, Weirdcore, Frutiger Aero, and Backrooms levels. Play with friends on Meta Quest.
        </motion.p>

        {/* Rating */}
        <motion.div
          className="mb-8 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.9 }}
        >
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className="h-4 w-4"
                fill={i < stars ? "#a78bfa" : "none"}
                stroke="#a78bfa"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            ))}
          </div>
          <span className="font-display text-lg font-bold text-heading">{gameInfo.rating}</span>
          <span className="text-sm text-muted">({gameInfo.totalRatings} ratings)</span>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3 }}
        >
          <a
            href={gameInfo.website}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-full bg-accent px-8 py-3.5 text-center text-sm font-medium text-dark transition-transform hover:scale-105"
          >
            <span className="relative z-10 text-dark font-semibold">Get on Meta Quest</span>
            <div className="absolute inset-0 bg-accent-hover opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
          <a
            href={gameInfo.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-dark-400 px-8 py-3.5 text-center text-sm font-medium text-heading transition-all hover:border-accent/50 hover:bg-accent-dim"
          >
            Join Discord
          </a>
        </motion.div>

        {/* Platform badges */}
        <motion.div
          className="mt-8 flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4 }}
        >
          {gameInfo.platforms.map((p) => (
            <span
              key={p}
              className="rounded-full border border-dark-400 bg-dark-200 px-3 py-1 text-xs text-muted"
            >
              {p}
            </span>
          ))}
        </motion.div>

        {/* Screenshots */}
        <motion.div
          className="mt-12 grid grid-cols-2 gap-3 max-w-2xl md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6 }}
        >
          {[
            "/images/499300678_1848351745863318_8395553442842836685_n.webp",
            "/images/499304952_807345415771593_7754528317547681484_n.webp",
            "/images/499308204_1955555365325593_3560555466996128099_n.webp",
            "/images/499308575_1569272050817681_85275160892773403_n.webp",
          ].map((src, i) => (
            <div
              key={src}
              className="aspect-video overflow-hidden rounded-xl border border-dark-400/50 bg-dark-300"
            >
              <img
                src={src}
                alt={`Nostalgia VR screenshot ${i + 1}`}
                className="h-full w-full object-cover opacity-80 transition-opacity duration-300 hover:opacity-100"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-widest text-muted">Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-muted to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
