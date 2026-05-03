"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const pos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const speed = 0.15;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gsap.to(dot, { x: e.clientX - 4, y: e.clientY - 4, duration: 0.1 });
    };

    const handleMouseEnterInteractive = () => {
      gsap.to(cursor, {
        scale: 2,
        borderColor: "rgba(167, 139, 250, 0.5)",
        duration: 0.3,
      });
    };

    const handleMouseLeaveInteractive = () => {
      gsap.to(cursor, {
        scale: 1,
        borderColor: "rgba(255, 255, 255, 0.3)",
        duration: 0.3,
      });
    };

    const tick = () => {
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;
      gsap.set(cursor, { x: pos.x - 20, y: pos.y - 20 });
      requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(tick);

    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor="pointer"]'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterInteractive);
      el.addEventListener("mouseleave", handleMouseLeaveInteractive);
    });

    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll(
        'a, button, [data-cursor="pointer"]'
      );
      newElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnterInteractive);
        el.addEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden h-10 w-10 rounded-full border border-white/30 mix-blend-difference md:block"
        style={{ willChange: "transform" }}
      />
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-2 w-2 rounded-full bg-accent md:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
