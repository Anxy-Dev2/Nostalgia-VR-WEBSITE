"use client";

import { useState, type FormEvent } from "react";
import { personalInfo } from "@/data";
import { FadeUp } from "./TextReveal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const mailtoLink = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.name} (${formData.email})`;
      window.open(mailtoLink, "_blank");
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-16 md:grid-cols-2">
          {/* Left - Info */}
          <div>
            <FadeUp>
              <p className="font-display mb-3 text-sm uppercase tracking-[0.3em] text-accent">
                Contact
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display mb-6 text-3xl font-bold text-heading md:text-5xl">
                Let&apos;s Build
                <br />
                <span className="gradient-text">Something Great</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="mb-8 max-w-md text-body">
                Have a project in mind? I&apos;m always open to discussing
                new opportunities, creative ideas, or just having a chat.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dark-400 bg-dark-200">
                    <svg
                      className="h-4 w-4 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Email</p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm text-heading transition-colors hover:text-accent"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dark-400 bg-dark-200">
                    <svg
                      className="h-4 w-4 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Location</p>
                    <p className="text-sm text-heading">
                      {personalInfo.location}
                    </p>
                  </div>
                </div>

                {personalInfo.socials.github && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dark-400 bg-dark-200">
                      <svg
                        className="h-4 w-4 text-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted">GitHub</p>
                      <a
                        href={personalInfo.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-heading transition-colors hover:text-accent"
                      >
                        @{personalInfo.handle}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </FadeUp>
          </div>

          {/* Right - Form */}
          <FadeUp delay={0.3}>
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-dark-400 bg-dark-200 p-6 md:p-8"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs uppercase tracking-wider text-muted"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full rounded-lg border border-dark-400 bg-dark-300 px-4 py-3 text-sm text-heading outline-none transition-colors placeholder:text-dark-500 focus:border-accent/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs uppercase tracking-wider text-muted"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full rounded-lg border border-dark-400 bg-dark-300 px-4 py-3 text-sm text-heading outline-none transition-colors placeholder:text-dark-500 focus:border-accent/50"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs uppercase tracking-wider text-muted"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="w-full resize-none rounded-lg border border-dark-400 bg-dark-300 px-4 py-3 text-sm text-heading outline-none transition-colors placeholder:text-dark-500 focus:border-accent/50"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative w-full overflow-hidden rounded-lg bg-accent py-3.5 text-sm font-medium text-dark transition-transform hover:scale-[1.02] disabled:opacity-50"
              >
                <span className="relative z-10">
                  {status === "sending"
                    ? "Opening mail client..."
                    : status === "sent"
                      ? "Mail client opened!"
                      : status === "error"
                        ? "Something went wrong"
                        : "Send Message"}
                </span>
                <div className="absolute inset-0 bg-accent-hover opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
