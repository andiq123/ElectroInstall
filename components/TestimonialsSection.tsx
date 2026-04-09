"use client";

import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { homeUi } from "@/lib/homeUi";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

interface Testimonial {
  quote: string;
  name: string;
  service: string;
}

const STARS = [0, 1, 2, 3, 4] as const;

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const data = t.testimonials as {
    title: string;
    eyebrow?: string;
    headline?: string;
    items: Testimonial[];
  };

  const items = data.items;
  const [index, setIndex] = useState(0);
  const current = items[index] ?? items[0];

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => {
        const n = items.length;
        if (n === 0) return 0;
        return (i + dir + n) % n;
      });
    },
    [items.length]
  );

  if (!current) return null;

  const eyebrow = data.eyebrow ?? data.title;
  const headline = data.headline ?? data.title;

  return (
    <section
      className={cn(homeUi.section, "bg-[var(--bg-section-alt)]")}
      aria-labelledby="testimonials-heading"
    >
      <div
        className={cn(
          homeUi.container,
          "grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
        )}
      >
        {/* ── Left: heading + nav ─────────────────────────── */}
        <Reveal variant="left" className="lg:col-span-4">
          <div>
            <span className={homeUi.kicker}>{eyebrow}</span>
            <h2
              id="testimonials-heading"
              className={cn(homeUi.displayTitle, "mb-8 sm:mb-10")}
            >
              {headline}
            </h2>

            {/* Nav buttons */}
            <div
              className="flex gap-3"
              role="group"
              aria-label="Navigare testimoniale"
            >
              <button
                type="button"
                onClick={() => go(-1)}
                className="flex h-12 w-12 touch-manipulation items-center justify-center rounded-full border border-[var(--border-decorative)] bg-white text-[var(--text-primary)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-zinc-900 sm:h-13 sm:w-13"
                aria-label={`Testimonial anterior (${index + 1} din ${items.length})`}
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="flex h-12 w-12 touch-manipulation items-center justify-center rounded-full border border-[var(--border-decorative)] bg-white text-[var(--text-primary)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-zinc-900 sm:h-13 sm:w-13"
                aria-label={`Testimonial următor (${index + 1} din ${items.length})`}
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden />
              </button>
            </div>

            {/* Dot pagination */}
            <div
              className="mt-6 flex items-center gap-2"
              role="tablist"
              aria-label="Selectare testimonial"
            >
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index
                      ? "w-6 bg-[var(--accent)]"
                      : "w-1.5 bg-[var(--border-decorative)] hover:bg-[var(--accent)]/40"
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Right: quote card ───────────────────────────── */}
        <Reveal variant="blur" className="lg:col-span-8" delay={100}>
          <figure
            className="relative overflow-hidden rounded-t-2xl rounded-br-none rounded-bl-2xl border border-black/[0.04] bg-white p-10 shadow-sm sm:p-14 lg:p-16"
            aria-live="polite"
            aria-atomic="true"
          >
            {/* Decorative large quote mark */}
            <span
              className="pointer-events-none absolute -top-4 -left-1 select-none font-display text-[7rem] font-black leading-none text-[var(--accent-light)] opacity-30 sm:text-[9rem] lg:text-[11rem]"
              aria-hidden
            >
              &ldquo;
            </span>

            <div key={index} className="relative z-10 testimonial-quote-swap">
              {/* 5-star row */}
              <div className="mb-6 flex items-center gap-1" aria-label="5 din 5 stele">
                {STARS.map((s) => (
                  <Star
                    key={s}
                    className="h-4 w-4 fill-[var(--accent-light)] text-[var(--accent-light)]"
                    aria-hidden
                  />
                ))}
              </div>

              <blockquote>
                <p className={cn(homeUi.quoteBody, "mb-10 sm:mb-12")}>
                  &ldquo;{current.quote}&rdquo;
                </p>
              </blockquote>

              <figcaption className="flex items-center gap-4 sm:gap-5">
                {/* Avatar with amber ring */}
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200 font-display text-xl font-black text-[var(--accent)] ring-2 ring-[var(--accent-light)] ring-offset-2 sm:h-16 sm:w-16 sm:text-2xl"
                  aria-hidden="true"
                >
                  {current.name.charAt(0)}
                </div>
                <div>
                  <p className={cn(homeUi.cardTitle, "!mb-0 !text-base sm:!text-lg")}>
                    {current.name}
                  </p>
                  <p className={homeUi.captionMeta}>{current.service}</p>
                </div>
              </figcaption>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
