"use client";

export default function Marquee({
  phrases = ["UNITY"],
}: {
  phrases?: string[];
}) {
  // Build the repeated text with bullet separators
  const segment = phrases.join(" \u00B7 ");
  // Repeat enough times to fill the screen and loop seamlessly
  const repeated = Array(6).fill(segment).join(" \u2014 ");

  return (
    <div className="relative overflow-hidden border-y border-dark-400 py-4">
      <div className="animate-marquee flex whitespace-nowrap">
        <span className="font-display mr-4 text-sm font-medium tracking-[0.3em] text-dark-500 uppercase">
          {repeated}
          {" \u2014 "}
        </span>
        <span className="font-display text-sm font-medium tracking-[0.3em] text-dark-500 uppercase">
          {repeated}
          {" \u2014 "}
        </span>
      </div>
    </div>
  );
}
