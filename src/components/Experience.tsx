"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { experiences } from "@/data";
import { FadeUp } from "./TextReveal";

function WorkIcon({ color }: { color: string }) {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  );
}

function MilitaryIcon({ color }: { color: string }) {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function EducationIcon({ color }: { color: string }) {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zM3 9l9 5 9-5" />
    </svg>
  );
}

const typeIcons: Record<string, React.FC<{ color: string }>> = {
  work: WorkIcon,
  military: MilitaryIcon,
  education: EducationIcon,
};

const typeConfig: Record<string, { color: string; bg: string; label: string; border: string }> = {
  work: {
    color: "#f97316",
    bg: "rgba(249, 115, 22, 0.06)",
    border: "rgba(249, 115, 22, 0.15)",
    label: "Work",
  },
  military: {
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.06)",
    border: "rgba(16, 185, 129, 0.15)",
    label: "Military",
  },
  education: {
    color: "#3b82f6",
    bg: "rgba(59, 130, 246, 0.06)",
    border: "rgba(59, 130, 246, 0.15)",
    label: "Education",
  },
};

function ExperienceCard({
  exp,
  index,
  total,
}: {
  exp: (typeof experiences)[0];
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const config = typeConfig[exp.type];

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${y * -3}deg) rotateY(${x * 4}deg)`;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  }, []);

  const scaleDown = 1 - (total - 1 - index) * 0.01;

  return (
    <div
      className="sticky mb-10 last:mb-0"
      style={{
        top: `calc(90px + ${index * 28}px)`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.6,
          delay: 0.1,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative overflow-hidden rounded-2xl border bg-dark-200 shadow-xl shadow-black/20"
          style={{
            borderColor: config.border,
            transformStyle: "preserve-3d",
            willChange: "transform",
            transition: "transform 0.15s ease-out",
            transform: `scale(${scaleDown})`,
          }}
        >
          {/* Left accent stripe */}
          <div
            className="absolute top-0 bottom-0 left-0 w-1"
            style={{ backgroundColor: config.color }}
          />

          {/* Background watermark number */}
          <div
            className="pointer-events-none absolute -right-4 -top-6 select-none font-display text-[140px] font-black leading-none md:text-[180px]"
            style={{ color: `${config.color}06` }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Background gradient */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(ellipse at 80% 20%, ${config.color}08, transparent 60%)`,
            }}
          />

          <div className="relative flex flex-col gap-6 p-6 pl-7 md:flex-row md:items-start md:gap-10 md:p-8 md:pl-9">
            {/* Left: Period + Type */}
            <div className="shrink-0 md:w-44">
              <div
                className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: `${config.color}15`,
                  color: config.color,
                  border: `1px solid ${config.color}25`,
                }}
              >
                {(() => {
                  const Icon = typeIcons[exp.type];
                  return <Icon color={config.color} />;
                })()}
                {config.label}
              </div>
              <p
                className="font-display text-sm font-medium"
                style={{ color: `${config.color}cc` }}
              >
                {exp.period}
              </p>
            </div>

            {/* Right: Content */}
            <div className="flex-1">
              <h3 className="font-display mb-1 text-xl font-bold text-heading md:text-2xl">
                {exp.title}
              </h3>
              <p className="mb-4 text-sm text-accent">{exp.company}</p>
              <ul className="space-y-2">
                {exp.description.map((desc, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-sm leading-relaxed text-body"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <FadeUp>
          <p className="font-display mb-3 text-sm uppercase tracking-[0.3em] text-accent">
            Experience
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display mb-6 text-3xl font-bold text-heading md:text-5xl">
            Where I&apos;ve Been
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mb-16 max-w-xl text-body">
            From submarine electronics to full-stack development — each chapter
            built on discipline, problem-solving, and a drive to build.
          </p>
        </FadeUp>

        {/* Stacking Cards */}
        <div className="relative">
          {experiences.map((exp, i) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={i}
              total={experiences.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
