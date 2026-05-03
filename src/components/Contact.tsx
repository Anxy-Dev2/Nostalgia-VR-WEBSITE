"use client";

import { gameInfo } from "@/data";
import { FadeUp } from "./TextReveal";

const rules = [
  "No toxicity",
  "No racism",
  "No modding or hacking the game",
  "No inappropriate gestures",
  "No making people uncomfortable",
  "No spamming",
  "No slurs",
  "Don't be a pedo",
  "Don't abuse staff powers",
  "Don't beg or ask for moderator",
];

const privacyPoints = [
  "Microphone used only during multiplayer sessions — never recorded or stored.",
  "No personal information collected (name, email, address, location).",
  "Multiplayer powered by Photon Unity Networking (Photon Realtime).",
  "Photon processes only a random User ID and session IDs to connect players.",
  "Data is never sold, shared, or used for advertising.",
  "Not intended for children under 13.",
];

export default function Contact() {
  return (
    <section id="community" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-24">

        {/* Community + CTA */}
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <FadeUp>
              <p className="font-display mb-3 text-sm uppercase tracking-[0.3em] text-accent">Community</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display mb-6 text-3xl font-bold text-heading md:text-5xl">
                Join the<br />
                <span className="gradient-text">Community</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="mb-8 max-w-md text-body">
                Connect with other players, report bugs, get updates, and find friends to explore the liminal spaces with.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dark-400 bg-dark-200">
                    <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.055a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Discord Server</p>
                    <a href={gameInfo.discord} target="_blank" rel="noopener noreferrer" className="text-sm text-heading transition-colors hover:text-accent">
                      discord.gg/tpnqKTGk
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dark-400 bg-dark-200">
                    <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Developer</p>
                    <p className="text-sm text-heading">Constantplot · Dimensional Studios</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dark-400 bg-dark-200">
                    <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Contact</p>
                    <a href="mailto:ConstantplotGames@outlook.com" className="text-sm text-heading transition-colors hover:text-accent">
                      ConstantplotGames@outlook.com
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.3}>
            <div className="flex flex-col gap-5 rounded-2xl border border-dark-400 bg-dark-200 p-6 md:p-8">
              <div>
                <h3 className="font-display mb-2 text-xl font-bold text-heading">Ready to explore?</h3>
                <p className="text-sm text-body">Download Nostalgia VR on the Meta Quest store and start your journey through the liminal.</p>
              </div>
              <div className="space-y-3">
                <a
                  href={gameInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-accent py-3.5 text-sm font-semibold text-dark transition-transform hover:scale-[1.02]"
                >
                  <span className="relative z-10">Get on Meta Quest</span>
                  <div className="absolute inset-0 bg-accent-hover opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                <a
                  href={gameInfo.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-lg border border-dark-400 py-3.5 text-sm font-medium text-heading transition-all hover:border-accent/50 hover:bg-accent-dim"
                >
                  Join the Discord
                </a>
              </div>
              <div className="border-t border-dark-400 pt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-display text-xl font-bold text-heading">{gameInfo.rating}</p>
                  <p className="text-xs text-muted">Rating</p>
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-heading">{gameInfo.totalRatings}</p>
                  <p className="text-xs text-muted">Ratings</p>
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-heading">4</p>
                  <p className="text-xs text-muted">Headsets</p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Rules + Privacy */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Rules */}
          <FadeUp>
            <div className="rounded-2xl border border-dark-400 bg-dark-200 p-6 md:p-8">
              <p className="font-display mb-2 text-xs uppercase tracking-[0.3em] text-accent">Community Rules</p>
              <h3 className="font-display mb-6 text-xl font-bold text-heading">Follow the Rules</h3>
              <p className="mb-4 text-xs text-muted">Breaking any rule will result in a ban.</p>
              <ol className="space-y-2">
                {rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-body">
                    <span className="font-mono text-xs text-accent/60 shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                    {rule}
                  </li>
                ))}
              </ol>
            </div>
          </FadeUp>

          {/* Privacy */}
          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-dark-400 bg-dark-200 p-6 md:p-8">
              <p className="font-display mb-2 text-xs uppercase tracking-[0.3em] text-accent">Privacy Policy</p>
              <h3 className="font-display mb-6 text-xl font-bold text-heading">Your Data & Privacy</h3>
              <ul className="space-y-3 mb-6">
                {privacyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-body">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="border-t border-dark-400 pt-4 space-y-1">
                <p className="text-xs text-muted">
                  For Photon data deletion:{" "}
                  <a href="https://dashboard.photonengine.com/en-US/Account/Contact" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    dashboard.photonengine.com
                  </a>
                </p>
                <p className="text-xs text-muted">
                  Questions?{" "}
                  <a href="mailto:ConstantplotGames@outlook.com" className="text-accent hover:underline">
                    ConstantplotGames@outlook.com
                  </a>
                </p>
              </div>
            </div>
          </FadeUp>
        </div>

      </div>
    </section>
  );
}
