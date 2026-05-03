"use client";

import { reviews, gameInfo } from "@/data";
import { FadeUp, StaggerContainer, StaggerItem } from "./TextReveal";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-3.5 w-3.5"
          fill={i < rating ? "#a78bfa" : "none"}
          stroke="#a78bfa"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ))}
    </div>
  );
}

function RatingBar({ label, percent }: { label: string; percent: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-4 text-right text-xs text-muted">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-dark-400 overflow-hidden">
        <div
          className="h-full rounded-full bg-accent transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-8 text-xs text-muted">{percent}%</span>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="reviews" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FadeUp>
          <p className="font-display mb-3 text-sm uppercase tracking-[0.3em] text-accent">
            Player Reviews
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display mb-6 text-3xl font-bold text-heading md:text-5xl">
            What Players Say
          </h2>
        </FadeUp>

        {/* Rating Summary */}
        <FadeUp delay={0.15}>
          <div className="mb-16 flex flex-col gap-6 rounded-2xl border border-dark-400 bg-dark-200 p-6 md:flex-row md:items-center md:gap-12 md:p-8">
            <div className="flex flex-col items-center gap-2 shrink-0">
              <span className="font-display text-6xl font-bold text-heading">{gameInfo.rating}</span>
              <StarRating rating={Math.round(parseFloat(gameInfo.rating))} />
              <span className="text-xs text-muted">{gameInfo.totalRatings} ratings · {gameInfo.totalReviews} reviews</span>
            </div>
            <div className="flex-1 space-y-2">
              {Object.entries(gameInfo.ratingBreakdown)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([star, pct]) => (
                  <RatingBar key={star} label={star} percent={pct} />
                ))}
            </div>
          </div>
        </FadeUp>

        <StaggerContainer className="grid gap-6 md:grid-cols-3" staggerDelay={0.15}>
          {reviews.map((review) => (
            <StaggerItem key={review.id}>
              <div className="flex h-full flex-col rounded-2xl border border-dark-400 bg-dark-200 p-6 transition-all duration-300 hover:border-accent/20">
                <div className="mb-3 flex items-center justify-between">
                  <StarRating rating={review.rating} />
                  <span className="text-xs text-muted">{review.date}</span>
                </div>

                <p className="font-display mb-2 text-sm font-semibold text-heading">
                  {review.title}
                </p>

                <p className="mb-6 flex-1 text-sm leading-relaxed text-body">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="border-t border-dark-400 pt-4 flex items-center justify-between">
                  <p className="font-display text-sm font-semibold text-heading">
                    {review.name}
                  </p>
                  <span className="text-xs text-muted">{review.helpful} found helpful</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
