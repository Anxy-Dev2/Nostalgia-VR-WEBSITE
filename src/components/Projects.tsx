"use client";

import { useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data";
import type { Project } from "@/data";
import { FadeUp } from "./TextReveal";

const devicon = (name: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;

// Tag → icon + color mapping
const tagMeta: Record<string, { icon: string; color: string }> = {
  "Next.js 15": { icon: devicon("nextjs"), color: "#ffffff" },
  "Next.js": { icon: devicon("nextjs"), color: "#ffffff" },
  "TypeScript": { icon: devicon("typescript"), color: "#3178C6" },
  "Tailwind CSS": { icon: devicon("tailwindcss", "original"), color: "#06B6D4" },
  "React": { icon: devicon("react"), color: "#61DAFB" },
  "MongoDB": { icon: devicon("mongodb"), color: "#47A248" },
  "Lua": { icon: devicon("lua"), color: "#9977FF" },
  "JavaScript": { icon: devicon("javascript"), color: "#F7DF1E" },
  "C#": { icon: devicon("csharp"), color: "#239120" },
  "Unity": { icon: devicon("unity"), color: "#ffffff" },
  "SQL": { icon: devicon("azuresqldatabase"), color: "#4479A1" },
  "FiveM": { icon: "", color: "#f97316" },
  "RedM": { icon: "", color: "#DC143C" },
  "Documentation": { icon: "", color: "#a78bfa" },
  "Game Dev": { icon: "", color: "#facc15" },
};

function TechTag({ tag }: { tag: string }) {
  const [hovered, setHovered] = useState(false);
  const meta = tagMeta[tag];
  const color = meta?.color || "#888";
  const icon = meta?.icon;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-0 overflow-hidden rounded-full border transition-all duration-300 ease-out"
      style={{
        backgroundColor: hovered ? `${color}15` : "rgba(255,255,255,0.04)",
        borderColor: hovered ? `${color}30` : "rgba(255,255,255,0.06)",
        padding: hovered ? "4px 10px 4px 6px" : "4px 6px",
      }}
    >
      <div className="flex h-5 w-5 shrink-0 items-center justify-center">
        {icon ? (
          <img
            src={icon}
            alt={tag}
            className="h-3.5 w-3.5"
            style={{
              filter: hovered
                ? `drop-shadow(0 0 4px ${color}60)`
                : "grayscale(80%) opacity(0.6)",
              transition: "filter 0.3s ease",
            }}
            loading="lazy"
          />
        ) : (
          <span
            className="text-[9px] font-bold leading-none"
            style={{ color: hovered ? color : "#666" }}
          >
            {tag.slice(0, 2)}
          </span>
        )}
      </div>
      <div
        className="overflow-hidden whitespace-nowrap transition-all duration-300 ease-out"
        style={{
          maxWidth: hovered ? "120px" : "0px",
          opacity: hovered ? 1 : 0,
        }}
      >
        <span
          className="text-[11px] font-medium leading-none"
          style={{ color: hovered ? color : "#888" }}
        >
          {tag}
        </span>
      </div>
    </div>
  );
}

// Extract hex colors from Tailwind gradient class for use in JS
const gradientColors: Record<string, { from: string; to: string }> = {
  "from-orange-500/20 to-red-500/20": { from: "#f97316", to: "#ef4444" },
  "from-emerald-500/20 to-teal-500/20": { from: "#10b981", to: "#14b8a6" },
  "from-teal-500/20 to-cyan-500/20": { from: "#14b8a6", to: "#06b6d4" },
  "from-purple-500/20 to-blue-500/20": { from: "#a855f7", to: "#3b82f6" },
  "from-yellow-500/20 to-orange-500/20": { from: "#eab308", to: "#f97316" },
  "from-cyan-500/20 to-blue-500/20": { from: "#06b6d4", to: "#3b82f6" },
  "from-rose-500/20 to-pink-500/20": { from: "#f43f5e", to: "#ec4899" },
};

function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const colors = gradientColors[project.gradient] || { from: "#f97316", to: "#fb923c" };

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

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    }
    if (spotlightRef.current) {
      spotlightRef.current.style.background = "transparent";
    }
  }, []);

  const num = String(index + 1).padStart(2, "0");
  const hasImage = !!project.image;

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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative overflow-hidden rounded-2xl border border-dark-400/50 bg-dark-200"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          transition: "transform 0.15s ease-out, border-color 0.3s ease",
          borderColor: isHovered ? `${colors.from}30` : undefined,
        }}
      >
        {/* Mouse-following spotlight */}
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Top gradient border glow */}
        <div
          className="absolute top-0 right-0 left-0 h-[1px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.from}60, ${colors.to}60, transparent)`,
          }}
        />

        {/* Background watermark number */}
        <div
          className="pointer-events-none absolute -right-3 -top-4 select-none font-display font-black leading-none opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.06]"
          style={{
            fontSize: featured ? "200px" : "140px",
            color: colors.from,
          }}
        >
          {num}
        </div>

        {/* Image that uncovers from the right on hover */}
        {hasImage && (
          <div
            className="pointer-events-none absolute top-0 right-0 bottom-0 z-30 overflow-hidden"
            style={{
              width: isHovered ? (featured ? "45%" : "35%") : "0%",
              transition: "width 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            {/* Fade edge so the image blends into the card */}
            <div
              className="absolute inset-0 z-10"
              style={{
                background: `linear-gradient(to right, ${isHovered ? "rgba(17,17,17,0.95)" : "rgba(17,17,17,1)"} 0%, transparent 40%)`,
                transition: "background 0.6s ease",
              }}
            />
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover object-center"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "scale(1)" : "scale(1.05)",
                transition: "opacity 0.5s ease 0.1s, transform 0.6s ease",
              }}
              loading="lazy"
            />
            {/* Color tint overlay */}
            <div
              className="absolute inset-0 z-20 mix-blend-color"
              style={{
                background: `linear-gradient(135deg, ${colors.from}20, ${colors.to}10)`,
                opacity: isHovered ? 0.3 : 0,
                transition: "opacity 0.5s ease",
              }}
            />
          </div>
        )}

        {/* Main content */}
        <div className={`relative z-20 ${featured ? "p-8 md:p-10" : "p-6 md:p-8"}`}>
          {/* Header row */}
          <div className={`flex items-start justify-between ${featured ? "mb-6" : "mb-4"}`}>
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="font-mono text-xs font-medium"
                  style={{ color: colors.from }}
                >
                  {num}
                </span>
                <div
                  className="h-[1px] w-8 transition-all duration-500 group-hover:w-12"
                  style={{ backgroundColor: colors.from }}
                />
                <span className="text-[10px] uppercase tracking-widest text-dark-500">
                  {project.liveUrl ? "Live" : "Open Source"}
                </span>
              </div>

              <h3
                className={`font-display font-bold text-heading transition-colors duration-300 ${
                  featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                }`}
              >
                {project.title}
              </h3>
            </div>

            {/* Arrow link */}
            {(project.liveUrl || project.sourceUrl) && (
              <a
                href={project.liveUrl || project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dark-400/50 text-muted transition-all duration-300 group-hover:border-transparent group-hover:text-heading"
                style={{
                  backgroundColor: isHovered ? `${colors.from}15` : "transparent",
                  borderColor: isHovered ? `${colors.from}30` : undefined,
                }}
              >
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            )}
          </div>

          {/* Description */}
          <p
            className={`leading-relaxed text-body/80 ${
              featured
                ? "mb-8 max-w-2xl text-sm md:text-base"
                : "mb-6 text-sm"
            }`}
            style={{
              maxWidth: hasImage && isHovered ? "60%" : undefined,
              transition: "max-width 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            {project.description}
          </p>

          {/* Bottom row: Tags + Links */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <TechTag key={tag} tag={tag} />
              ))}
            </div>

            <div className="flex items-center gap-5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium transition-colors duration-300"
                  style={{ color: isHovered ? colors.from : "#777" }}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit
                </a>
              )}
              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-heading"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Source
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div
          className="absolute right-0 bottom-0 left-0 h-[1px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.from}30, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const featured = projects[0];
  const secondRow = projects.slice(1, 3);
  const thirdRow = projects.slice(3);

  return (
    <section id="projects" className="relative py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-accent/[0.02] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-purple-500/[0.02] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeUp>
          <p className="font-display mb-3 text-sm uppercase tracking-[0.3em] text-accent">
            Projects
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display mb-6 text-3xl font-bold text-heading md:text-5xl">
            Selected Work
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mb-16 max-w-xl text-body">
            Real-world projects ranging from enterprise community platforms to
            open-source game frameworks.
          </p>
        </FadeUp>

        {/* Bento Grid */}
        <div className="flex flex-col gap-5">
          {/* Featured — full width */}
          <ProjectCard project={featured} index={0} featured />

          {/* Second row — 2 columns */}
          <div className="grid gap-5 md:grid-cols-2">
            {secondRow.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i + 1} />
            ))}
          </div>

          {/* Third row — 3 columns */}
          <div className="grid gap-5 md:grid-cols-3">
            {thirdRow.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
