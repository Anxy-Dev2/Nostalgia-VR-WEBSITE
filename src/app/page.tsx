"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import BackgroundMusic from "@/components/BackgroundMusic";

const Preloader = dynamic(() => import("@/components/Preloader"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const ParticleField = dynamic(() => import("@/components/ParticleField"), {
  ssr: false,
});
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScroll>
      <BackgroundMusic />
      <Preloader />
      <CustomCursor />
      <ParticleField />
      <Navbar />

      <main className="relative z-10">
        <div className="h-screen flex items-center justify-center">
          <Hero />
        </div>
        <Marquee
          phrases={[
            "DREAMCORE",
            "WEIRDCORE",
            "FRUTIGER AERO",
            "BACKROOMS",
            "MULTIPLAYER",
            "META QUEST",
          ]}
        />
        <About />
        <div className="section-divider" />
        <Projects />
        <Marquee
          phrases={[
            "LIMINAL SPACES",
            "HORROR",
            "VR IMMERSION",
            "NOSTALGIA",
            "SURVIVE",
            "EXPLORE",
          ]}
        />
        <Experience />
        <div className="section-divider" />
        <Testimonials />
        <div className="section-divider" />
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
