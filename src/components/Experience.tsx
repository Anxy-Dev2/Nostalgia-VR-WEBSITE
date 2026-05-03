"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { specs } from "@/data";
import { FadeUp } from "./TextReveal";

const typeConfig: Record<string, { color: string; bg: string; label: string; border: string }> = {
  work: {
    color: "#a78bfa",
    bg: "rgba(167, 139, 250, 0.06)",
    border: "rgba(167, 139, 250, 0.15)",
    label: "Info",
  },
  military: {
    color: "#67e8f9",
    bg: "rgba(103, 232, 249, 0.06)",
    border: "rgba(103, 232, 249, 0.15)",
    label: "Spec",
  },
  education: {
    color: "#86efac",
    bg: "rgba(134, 239, 172, 0.06)",
    border: "rgba(134, 239, 172, 0.15)",
    label: "Tech",
  },
};

function SpecCard({ spec, index, total }: { spec: (typeof specs)[0]; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const config = typeConfig[spec.type];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${y * -3}deg) rotateY(${x * 4}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  }, []);

  const scaleDown = 1 - (total - 1 - index) * 0.01;

  return (
    <div className="sticky mb-10 last:mb-0" style={{ top: `calc(90px + ${index * 28}px)`, zIndex: index + 1 }}>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
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
          <div className="absolute top-0 bottom-0 left-0 w-1" style={{ backgroundColor: config.color }} />
          <div
            className="pointer-events-none absolute -right-4 -top-6 select-none font-display text-[140px] font-black leading-none md:text-[180px]"
            style={{ color: `${config.color}06` }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `radial-gradient(ellipse at 80% 20%, ${config.color}08, transparent 60%)` }}
          />

          <div className="relative flex flex-col gap-6 p-6 pl-7 md:flex-row md:items-start md:gap-10 md:p-8 md:pl-9">
            <div className="shrink-0 md:w-44">
              <div
                className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"
                style={{ backgroundColor: `${config.color}15`, color: config.color, border: `1px solid ${config.color}25` }}
              >
                {config.label}
              </div>
              <p className="font-display text-sm font-medium" style={{ color: `${config.color}cc` }}>
                {spec.period}
              </p>
            </div>

            <div className="flex-1">
              <h3 className="font-display mb-1 text-xl font-bold text-heading md:text-2xl">{spec.title}</h3>
              <p className="mb-4 text-sm text-accent">{spec.company}</p>
              <ul className="space-y-2">
                {spec.description.map((desc, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm leading-relaxed text-body">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: config.color }} />
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
    <section id="details" className="relative py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <FadeUp>
          <p className="font-display mb-3 text-sm uppercase tracking-[0.3em] text-accent">Game Details</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display mb-6 text-3xl font-bold text-heading md:text-5xl">
            Everything You Need to Know
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mb-16 max-w-xl text-body">
            Platform support, technical specs, developer info, and more — all in one place.
          </p>
        </FadeUp>

        <div className="relative">
          {specs.map((spec, i) => (
            <SpecCard key={spec.id} spec={spec} index={i} total={specs.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
