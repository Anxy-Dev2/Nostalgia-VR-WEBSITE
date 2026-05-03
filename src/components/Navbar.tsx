"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, gameInfo } from "@/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
          scrolled ? "glass py-3" : "py-5"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 1.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          <a
            href="#"
            className="font-display text-lg font-bold tracking-tight text-heading transition-colors hover:text-accent"
          >
            Nostalgia<span className="text-accent"> VR</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-underline text-sm text-muted transition-colors hover:text-heading"
              >
                {link.label}
              </a>
            ))}
            <a
              href={gameInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-accent/30 px-5 py-2 text-sm text-accent transition-all hover:border-accent hover:bg-accent/10"
            >
              Get the Game
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-[1.5px] w-6 bg-heading"
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-[1.5px] w-6 bg-heading"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-[1.5px] w-6 bg-heading"
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-3xl font-bold text-heading transition-colors hover:text-accent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
