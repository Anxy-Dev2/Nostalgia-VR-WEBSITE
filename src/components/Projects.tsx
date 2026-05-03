"use client";

import { useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { levels } from "@/data";
import type { Level } from "@/data";
import { FadeUp } from "./TextReveal";

const gradientColors: Record<string, { from: string; to: string }> = {
  "from-purple-500/20 to-pink-500/20": { from: "#a855f7", to: "#ec4899" },
  "from-cyan-500/20 to-blue-500/20": { from: "#06b6d4", to: "#3b82f6" },
  "from-teal-500/20 to-green-500/20": { from: "#14b8a6", to: "#22c55e" },
  "from-yellow-500/20 to-orange-500/20": { from: "#eab308", to: "#f97316" },
  "from-red-500/20 to-rose-500/20": { from: "#ef4444", to: "#f43f5e" },
  "from-slate-500/20 to-slate-700/20": { from: "#64748b", to: "#334155" },
};

function LevelTag({ tag }: { tag: string }) {
  return (
    <span className="rounded-full border border-dark-400/60 bg-dark-300/60 px-3 py-1 text-[11px] font-medium text-muted">
      {tag}
    </span>
  );
}

function LevelCard({
  level,
  index,
  featured = false,
}: {
  level: Level;
  index: number;
  featured?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const colors = gradientColors[level.gradient] || { from: "#a78bfa", to: "#c4b5fd" };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const spotlight = spotlightRef.current;
      if (!card || !spotlight) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = (x / rect.width - 0.5) * 2;
      const py = (y / rect.height - 0.5) * 2;
      card.style.transform = `perspective(800px) rotateX(${py * -3}deg) rotateY(${px * 4}deg)`;
      spotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${colors.from}12, transparent 40%)`;
    },
    [colors]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    if (spotlightRef.current) spotlightRef.current.style.background = "transparent";
  }, []);

  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative overflow-hidden rounded-2xl border border-dark-400/50 bg-dark-200"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          transition: "transform 0.15s ease-out, border-color 0.3s ease",
          borderColor: isHovered ? `${colors.from}30` : undefined,
        }}
      >
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
        <div
          className="absolute top-0 right-0 left-0 h-[1px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent, ${colors.from}60, ${colors.to}60, transparent)` }}
        />
        <div
          className="pointer-events-none absolute -right-3 -top-4 select-none font-display font-black leading-none opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.06]"
          style={{ fontSize: featured ? "200px" : "140px", color: colors.from }}
        >
          {num}
        </div>

        <div className={`relative z-20 ${featured ? "p-8 md:p-10" : "p-6 md:p-8"}`}>
          <div className={`flex items-start justify-between ${featured ? "mb-6" : "mb-4"}`}>
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-3">
                <span className="font-mono text-xs font-medium" style={{ color: colors.from }}>
                  {num}
                </span>
                <div
                  className="h-[1px] w-8 transition-all duration-500 group-hover:w-12"
                  style={{ backgroundColor: colors.from }}
                />
                <span className="text-[10px] uppercase tracking-widest text-dark-500">Level</span>
              </div>
              <h3
                className={`font-display font-bold text-heading transition-colors duration-300 ${
                  featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                }`}
              >
                {level.title}
              </h3>
            </div>
          </div>

          <p
            className={`leading-relaxed text-body/80 ${
              featured ? "mb-8 max-w-2xl text-sm md:text-base" : "mb-6 text-sm"
            }`}
          >
            {level.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {level.tags.map((tag) => (
              <LevelTag key={tag} tag={tag} />
            ))}
          </div>
        </div>

        <div
          className="absolute right-0 bottom-0 left-0 h-[1px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent, ${colors.from}30, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const featured = levels[0];
  const secondRow = levels.slice(1, 3);
  const thirdRow = levels.slice(3);

  return (
    <section id="levels" className="relative py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-purple-900/[0.04] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-cyan-900/[0.04] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeUp>
          <p className="font-display mb-3 text-sm uppercase tracking-[0.3em] text-accent">Levels</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display mb-6 text-3xl font-bold text-heading md:text-5xl">
            Explore the Worlds
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mb-16 max-w-xl text-body">
            Each level is a hand-crafted liminal space designed to evoke nostalgia, dread, and wonder. Explore alone or with friends.
          </p>
        </FadeUp>

        <div className="flex flex-col gap-5">
          <LevelCard level={featured} index={0} featured />
          <div className="grid gap-5 md:grid-cols-2">
            {secondRow.map((level, i) => (
              <LevelCard key={level.id} level={level} index={i + 1} />
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {thirdRow.map((level, i) => (
              <LevelCard key={level.id} level={level} index={i + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
