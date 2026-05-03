"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/data";
import type { Skill } from "@/data";
import { FadeUp } from "./TextReveal";

function SkillCard({
  skill,
  isSelected,
  onSelect,
  onDeselect,
}: {
  skill: Skill;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
}) {
  return (
    <div
      onMouseEnter={onSelect}
      onMouseLeave={onDeselect}
      className="group relative"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className={`relative flex flex-col items-center gap-2 rounded-xl border p-4 transition-all duration-300 md:p-5 ${
          isSelected
            ? "z-10 scale-110 border-transparent bg-dark-200"
            : "border-dark-400/50 bg-dark-200/60 hover:border-dark-400"
        }`}
        style={{
          transform: isSelected ? "translateZ(40px)" : "translateZ(0px)",
          boxShadow: isSelected
            ? `0 20px 50px -10px ${skill.color}30, 0 0 30px ${skill.color}15, inset 0 1px 0 ${skill.color}20`
            : "none",
          transition: "transform 0.3s ease, box-shadow 0.3s ease, scale 0.3s ease, border-color 0.3s ease, background-color 0.3s ease",
        }}
      >
        {/* Glow ring behind icon */}
        <div
          className="absolute top-3 h-12 w-12 rounded-full opacity-0 blur-xl transition-opacity duration-300 md:top-4"
          style={{
            backgroundColor: skill.color,
            opacity: isSelected ? 0.3 : 0,
          }}
        />

        {/* Icon */}
        <div className="relative flex h-10 w-10 items-center justify-center md:h-12 md:w-12">
          {skill.icon ? (
            <img
              src={skill.icon}
              alt={skill.name}
              className={`h-8 w-8 transition-all duration-300 md:h-10 md:w-10 ${
                isSelected ? "scale-110 drop-shadow-lg" : "opacity-70 grayscale"
              }`}
              style={{
                filter: isSelected
                  ? `drop-shadow(0 0 8px ${skill.color}80)`
                  : "grayscale(100%) opacity(0.7)",
              }}
              loading="lazy"
            />
          ) : (
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all duration-300 md:h-10 md:w-10 md:text-sm ${
                isSelected ? "scale-110" : "opacity-70"
              }`}
              style={{
                backgroundColor: isSelected ? `${skill.color}30` : "#222",
                color: isSelected ? skill.color : "#666",
                boxShadow: isSelected ? `0 0 12px ${skill.color}40` : "none",
              }}
            >
              {skill.name.slice(0, 2)}
            </div>
          )}
        </div>

        {/* Name */}
        <span
          className={`text-center text-xs font-medium transition-colors duration-300 md:text-sm ${
            isSelected ? "text-heading" : "text-muted"
          }`}
        >
          {skill.name}
        </span>

        {/* Active indicator dot */}
        <div
          className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full transition-all duration-300"
          style={{
            backgroundColor: skill.color,
            opacity: isSelected ? 1 : 0,
            transform: `translateX(-50%) scale(${isSelected ? 1 : 0})`,
            boxShadow: isSelected ? `0 0 8px ${skill.color}` : "none",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetRotation.current = { x: y * -6, y: x * 8 };
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetRotation.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      currentRotation.current.x +=
        (targetRotation.current.x - currentRotation.current.x) * 0.08;
      currentRotation.current.y +=
        (targetRotation.current.y - currentRotation.current.y) * 0.08;

      if (gridRef.current) {
        gridRef.current.style.transform = `
          rotateX(${currentRotation.current.x}deg)
          rotateY(${currentRotation.current.y}deg)
        `;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <section id="skills" className="relative py-32" ref={sectionRef}>
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.03] blur-[100px]"
          style={{
            backgroundColor: selectedSkill?.color || "#f97316",
            transition: "background-color 0.5s ease",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeUp>
          <p className="font-display mb-3 text-sm uppercase tracking-[0.3em] text-accent">
            Tech Stack
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display mb-6 text-3xl font-bold text-heading md:text-5xl">
            Skills & Technologies
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mb-4 max-w-xl text-body">
            Hover to explore the tools and languages I use to build — from web
            apps to game frameworks.
          </p>
        </FadeUp>

        {/* Selected Skill Detail */}
        <div className="mb-10 h-20">
          <AnimatePresence mode="wait">
            {selectedSkill ? (
              <motion.div
                key={selectedSkill.name}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `${selectedSkill.color}15`,
                    border: `1px solid ${selectedSkill.color}30`,
                    boxShadow: `0 0 20px ${selectedSkill.color}10`,
                  }}
                >
                  {selectedSkill.icon ? (
                    <img
                      src={selectedSkill.icon}
                      alt={selectedSkill.name}
                      className="h-8 w-8"
                      style={{
                        filter: `drop-shadow(0 0 6px ${selectedSkill.color}60)`,
                      }}
                    />
                  ) : (
                    <span
                      className="text-lg font-bold"
                      style={{ color: selectedSkill.color }}
                    >
                      {selectedSkill.name.slice(0, 2)}
                    </span>
                  )}
                </div>
                <div>
                  <h3
                    className="font-display text-xl font-bold"
                    style={{ color: selectedSkill.color }}
                  >
                    {selectedSkill.name}
                  </h3>
                  <p className="text-sm text-body">{selectedSkill.desc}</p>
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                className="flex items-center gap-2 pt-4 text-sm text-dark-500 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent/50" />
                Hover over a skill to explore
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* 3D Tilting Skill Grid */}
        <FadeUp delay={0.3}>
          <div style={{ perspective: "1200px" }}>
            <div
              ref={gridRef}
              className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
                transition: "transform 0.05s linear",
              }}
            >
              {skills.map((skill) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  isSelected={selectedSkill?.name === skill.name}
                  onSelect={() => setSelectedSkill(skill)}
                  onDeselect={() => setSelectedSkill(null)}
                />
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
