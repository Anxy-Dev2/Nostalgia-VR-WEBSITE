"use client";

import { gameInfo, features } from "@/data";
import { FadeUp, WordReveal } from "./TextReveal";

export default function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeUp>
          <p className="font-display mb-3 text-sm uppercase tracking-[0.3em] text-accent">
            About the Game
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display mb-12 max-w-3xl text-3xl font-bold text-heading md:text-5xl">
            Step into the liminal. Survive the nostalgia.
          </h2>
        </FadeUp>

        <div className="mb-20 grid gap-8 md:grid-cols-2">
          <WordReveal
            text={gameInfo.description}
            className="text-lg leading-relaxed text-body"
            delay={0.2}
          />
          <WordReveal
            text="Built by Dimensional Studios in Unity, Nostalgia VR brings the internet's most haunting aesthetic movements to life in virtual reality. Explore alone or with friends — but beware, not everything that feels familiar is safe."
            className="text-lg leading-relaxed text-body"
            delay={0.4}
          />
        </div>

        {/* Game Screenshots */}
        <div className="mb-4">
          <FadeUp>
            <p className="font-display mb-4 text-xs uppercase tracking-[0.3em] text-muted">Screenshots</p>
          </FadeUp>
          <div className="mb-16 grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              "/images/499300678_1848351745863318_8395553442842836685_n.webp",
              "/images/499304952_807345415771593_7754528317547681484_n.webp",
              "/images/499308204_1955555365325593_3560555466996128099_n.webp",
              "/images/499308575_1569272050817681_85275160892773403_n.webp",
              "/images/com.DimensionStudios.NostalgiaVR-20260502-000733.jpg",
              "/images/IMG_1067.png",
            ].map((src, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="aspect-video overflow-hidden rounded-xl border border-dark-400/50 bg-dark-300">
                  <img
                    src={src}
                    alt={`Nostalgia VR screenshot ${i + 1}`}
                    className="h-full w-full object-cover opacity-75 transition-all duration-500 hover:opacity-100 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Community Photos */}
        <div className="mb-16">
          <FadeUp>
            <p className="font-display mb-4 text-xs uppercase tracking-[0.3em] text-muted">Community</p>
          </FadeUp>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              "/images/a79475a416ca468ebf833347f30181fe.jpg",
              "/images/be24ec2c466a44f9ae5faba3e3984c51.jpg",
              "/images/com.DimensionStudios.NostalgiaVR-20260501-233809.jpg",
              "/images/com.DimensionStudios.NostalgiaVR-20260502-100602.jpg",
              "/images/com.DimensionStudios.NostalgiaVR-20260503-142328.jpg",
              "/images/499304952_807345415771593_7754528317547681484_n (1).webp",
            ].map((src, i) => (
              <FadeUp key={src} delay={i * 0.08}>
                <div className="aspect-square overflow-hidden rounded-xl border border-dark-400/50 bg-dark-300">
                  <img
                    src={src}
                    alt={`Nostalgia VR community ${i + 1}`}
                    className="h-full w-full object-cover opacity-75 transition-all duration-500 hover:opacity-100 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <FadeUp key={feature.title} delay={i * 0.1}>
              <div className="group rounded-2xl border border-dark-400 bg-dark-200 p-6 transition-all duration-300 hover:border-accent/30 hover:bg-dark-300">
                <span className="font-display mb-4 block text-3xl font-bold text-dark-500 transition-colors group-hover:text-accent/50">
                  {feature.icon}
                </span>
                <h3 className="font-display mb-2 text-lg font-semibold text-heading">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
