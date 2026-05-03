"use client";

import { personalInfo } from "@/data";
import { FadeUp, WordReveal } from "./TextReveal";

const services = [
  {
    title: "Unity Physics Systems",
    description:
      "Designing custom full-body interaction, collision, and motion systems for immersive VR gameplay.",
    icon: "01",
  },
  {
    title: "VR Gameplay Design",
    description:
      "Building smooth locomotion, hand interaction, and tracking-driven player feel for headset experiences.",
    icon: "02",
  },
  {
    title: "Gorilla Tag Fan Games",
    description:
      "Creating movement-focused VR prototypes inspired by Gorilla Tag with climbing, momentum, and responsive controls.",
    icon: "03",
  },
  {
    title: "Game Tools & Prototypes",
    description:
      "Crafting reusable C# gameplay tools and interactive demos that speed up development and improve polish.",
    icon: "04",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <FadeUp>
          <p className="font-display mb-3 text-sm uppercase tracking-[0.3em] text-accent">
            About Me
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display mb-12 max-w-3xl text-3xl font-bold text-heading md:text-5xl">
            Building full-body VR systems, gameplay tools, and immersive Unity experiences
          </h2>
        </FadeUp>

        {/* Bio */}
        <div className="mb-20 grid gap-8 md:grid-cols-2">
          <WordReveal
            text={personalInfo.bio}
            className="text-lg leading-relaxed text-body"
            delay={0.2}
          />
          <WordReveal
            text={personalInfo.bioContinued}
            className="text-lg leading-relaxed text-body"
            delay={0.4}
          />
        </div>

        {/* Services Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <FadeUp key={service.title} delay={i * 0.1}>
              <div className="group rounded-2xl border border-dark-400 bg-dark-200 p-6 transition-all duration-300 hover:border-accent/30 hover:bg-dark-300">
                <span className="font-display mb-4 block text-3xl font-bold text-dark-500 transition-colors group-hover:text-accent/50">
                  {service.icon}
                </span>
                <h3 className="font-display mb-2 text-lg font-semibold text-heading">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
