"use client";

import { testimonials } from "@/data";
import { FadeUp, StaggerContainer, StaggerItem } from "./TextReveal";

export default function Testimonials() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeUp>
          <p className="font-display mb-3 text-sm uppercase tracking-[0.3em] text-accent">
            Testimonials
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display mb-16 text-3xl font-bold text-heading md:text-5xl">
            What Others Say
          </h2>
        </FadeUp>

        <StaggerContainer
          className="grid gap-6 md:grid-cols-3"
          staggerDelay={0.15}
        >
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <div className="flex h-full flex-col rounded-2xl border border-dark-400 bg-dark-200 p-6 transition-all duration-300 hover:border-dark-500">
                {/* Quote Icon */}
                <svg
                  className="mb-4 h-8 w-8 text-accent/30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <p className="mb-6 flex-1 text-sm leading-relaxed text-body italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                <div className="border-t border-dark-400 pt-4">
                  <p className="font-display text-sm font-semibold text-heading">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted">{testimonial.role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
