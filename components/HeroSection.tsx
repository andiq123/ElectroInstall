"use client";

import HeroVisual from "@/components/sections/HeroVisual";
import { HERO_CONTENT, TRUST_INDICATORS } from "@/lib/constants";

interface HeroSectionProps {
  onOpenModal?: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const { badge, headline, description, cta } = HERO_CONTENT;

  return (
    <section
      className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden pt-20 sm:pt-24 lg:pt-28"
      aria-labelledby="hero-heading"
    >
      {/* Background - Simplified */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[var(--bg-primary)]" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-0 relative z-10">
        <div className="w-full max-w-2xl lg:max-w-xl space-y-8">
          {/* Badge */}
          <div className="flex justify-center lg:justify-start animate-fadeInDown">
            <div className="badge badge-accent">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
              </span>
              <span>{badge.text.replace("⚡ ", "")}</span>
            </div>
          </div>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight text-center lg:text-left"
            style={{ fontFamily: "var(--font-display), system-ui" }}
          >
            {headline.parts.map((part, index) => (
              <span
                key={index}
                className={`block animate-fadeInUp ${
                  index === headline.gradientIndex
                    ? "text-gradient"
                    : "text-[var(--text-primary)]"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {part}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p
            className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed text-center lg:text-left animate-fadeIn"
            style={{ animationDelay: "0.3s" }}
          >
            {description}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fadeInUp"
            style={{ animationDelay: "0.4s" }}
          >
            <button onClick={onOpenModal} className="btn btn-primary group glow-hover pulse-accent">
              {cta.primary.text}
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
            <a href="tel:+373061110314" className="btn btn-secondary group">
              <svg
                className="w-5 h-5 text-[var(--accent)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {cta.secondary.text}
            </a>
          </div>

          {/* Trust Indicators */}
          <div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 animate-fadeIn"
            style={{ animationDelay: "0.5s" }}
          >
            {TRUST_INDICATORS.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
              >
                <svg
                  className="w-4 h-4 text-[var(--color-success)]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visual */}
      <HeroVisual />

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent pointer-events-none" />
    </section>
  );
}
