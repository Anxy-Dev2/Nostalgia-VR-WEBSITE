"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  ),
});

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const currentRole = personalInfo.roles[roleIndex];

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 60);
      } else {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-4 px-6 md:grid-cols-[5fr_7fr] md:px-12">
        {/* Left - Text */}
        <div>
          <motion.p
            className="font-display mb-4 text-sm uppercase tracking-[0.4em] text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2 }}
          >
            Unity Developer & VR Physics Engineer
          </motion.p>

          <motion.h1
            className="font-display mb-2 text-6xl font-bold leading-[0.9] tracking-tighter text-heading sm:text-7xl lg:text-8xl xl:text-9xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 2.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {personalInfo.displayName}
            <span className="gradient-text">.</span>
          </motion.h1>

          <motion.div
            className="mb-6 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.6 }}
          >
            <span className="font-mono text-base text-accent md:text-lg">
              {displayText}
            </span>
            <span className="animate-pulse-glow ml-0.5 text-accent">|</span>
          </motion.div>

          <motion.p
            className="mb-8 max-w-md text-base leading-relaxed text-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.8 }}
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3 }}
          >
            <a
              href="#projects"
              className="group relative overflow-hidden rounded-full bg-accent px-8 py-3.5 text-center text-sm font-medium text-dark transition-transform hover:scale-105"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-accent-hover opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-dark-400 px-8 py-3.5 text-center text-sm font-medium text-heading transition-all hover:border-accent/50 hover:bg-accent-dim"
            >
              Get In Touch
            </a>
          </motion.div>

          {/* Interaction hint */}
          <motion.p
            className="mt-6 text-xs text-dark-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
          >
            &#x2190; Drag to explore the constellation &rarr;
          </motion.p>
        </div>

        {/* Right - 3D Scene */}
        <motion.div
          className="relative -mr-12 h-[450px] md:h-[650px] lg:h-[750px] xl:h-[800px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 2.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Scene3D />

          {/* Glow behind 3D scene */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[100px]" />
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
          <span className="text-xs uppercase tracking-widest text-muted">
            Scroll
          </span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-muted to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
