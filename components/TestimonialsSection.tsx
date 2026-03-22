"use client";

import { useCallback, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { homeUi } from "@/lib/homeUi";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

interface Testimonial {
  quote: string;
  name: string;
  service: string;
}

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
        <Reveal variant="left" className="lg:col-span-4">
          <div>
          <span className={homeUi.kicker}>{eyebrow}</span>
          <h2
            id="testimonials-heading"
            className={cn(homeUi.displayTitle, "mb-6 sm:mb-8")}
          >
            {headline}
          </h2>
          <div className={cn(homeUi.gridGap, "flex")}>
            <button
              type="button"
              onClick={() => go(-1)}
              className={cn(homeUi.iconCircleNav, "touch-manipulation")}
              aria-label="Testimonial anterior"
            >
              <span className="text-lg leading-none" aria-hidden>
                ‹
              </span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className={cn(homeUi.iconCircleNav, "touch-manipulation")}
              aria-label="Testimonial următor"
            >
              <span className="text-lg leading-none" aria-hidden>
                ›
              </span>
            </button>
          </div>
          </div>
        </Reveal>

        <Reveal variant="blur" className="lg:col-span-8" delay={100}>
          <figure
            className={cn(
              homeUi.cardSurface,
              "relative overflow-hidden p-10 sm:p-14 lg:p-16 asymmetric-image"
            )}
          >
            <span
              className="text-[8rem] sm:text-[10rem] lg:text-[12rem] font-black absolute -top-6 -left-2 sm:-top-10 sm:-left-6 opacity-[0.06] text-[var(--text-primary)] leading-none select-none pointer-events-none font-display"
              aria-hidden
            >
              “
            </span>
            <div key={index} className="relative z-10 testimonial-quote-swap">
              <blockquote>
                <p className={cn(homeUi.quoteBody, "mb-10 sm:mb-12")}>
                  &ldquo;{current.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center gap-4 sm:gap-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[var(--bg-section-alt)] flex items-center justify-center text-[var(--text-primary)] font-display font-black text-xl border border-black/[0.06]">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <p className={cn(homeUi.cardTitle, "!mb-0")}>{current.name}</p>
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
