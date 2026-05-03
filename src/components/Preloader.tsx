"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 100;
        }
        return Math.min(prev + Math.floor(Math.random() * 12) + 1, 100);
      });
    }, 80);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  useEffect(() => {
    if (count >= 100) {
      const timeout = setTimeout(() => setLoading(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [count]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="relative flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-display text-sm uppercase tracking-[0.3em] text-muted">
              Nostalgia VR
            </span>

            <div className="flex items-baseline gap-1">
              <motion.span
                className="font-display text-7xl font-bold text-heading tabular-nums md:text-9xl"
                key={count}
              >
                {count}
              </motion.span>
              <span className="font-display text-2xl text-muted md:text-4xl">%</span>
            </div>

            <div className="h-[1px] w-48 bg-dark-400 md:w-64">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <span className="font-display text-xs uppercase tracking-[0.2em] text-dark-500">
              Entering the liminal...
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
