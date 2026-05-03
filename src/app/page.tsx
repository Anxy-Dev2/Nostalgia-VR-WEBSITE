"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { SocketProvider } from "@/context/SocketContext";

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
const LiveChat = dynamic(() => import("@/components/LiveChat"), {
  ssr: false,
});

export default function Home() {
  return (
    <SocketProvider>
      <SmoothScroll>
        <Preloader />
        <CustomCursor />
        <ParticleField />
        <Navbar />

        <main className="relative z-10">
          <Hero />
          <Marquee
            phrases={[
              "UNITY",
              "VR",
              "C#",
              "FULL-BODY PHYSICS",
              "GAMEPLAY SYSTEMS",
              "GORILLA TAG",
            ]}
          />
          <About />
          <div className="section-divider" />
          <Skills />
          <Marquee
            phrases={[
              "HURRICANE VR",
              "MOTION",
              "IMMERSION",
              "INTERACTION",
              "PROTOTYPING",
              "POLISH",
            ]}
          />
          <Experience />
          <div className="section-divider" />
          <Projects />
          <Marquee
            phrases={[
              "BUILDING THE FUTURE",
              "ONE LINE AT A TIME",
              "CLEAN CODE",
              "SHIP FAST",
              "SCALE SMART",
            ]}
          />
          <Testimonials />
          <div className="section-divider" />
          <Contact />
        </main>

        <Footer />
        <LiveChat />
      </SmoothScroll>
    </SocketProvider>
  );
}
