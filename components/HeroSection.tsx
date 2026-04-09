"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { BUSINESS_INFO, PHONE_HREF } from "@/lib/constants";
import { homeUi } from "@/lib/homeUi";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  onOpenModal?: () => void;
}

function renderHeadline(line: string, highlight: string) {
  const i = line.indexOf(highlight);
  if (i === -1) return line;
  return (
    <>
      {line.slice(0, i)}
      <span className="text-[var(--accent-light)] italic">{highlight}</span>
      {line.slice(i + highlight.length)}
    </>
  );
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const { t } = useLanguage();
  const hero = t.hero as {
    eyebrow?: string;
    headline_1?: string;
    highlight_1?: string;
    headline_2?: string;
    highlight_2?: string;
    subhead: string;
    cta: string;
    call_us?: string;
    progress_from?: string;
    progress_to?: string;
  };

  const hasSplit =
    hero.headline_1 &&
    hero.highlight_1 &&
    hero.headline_2 &&
    hero.highlight_2;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[100dvh] flex items-center pt-24 sm:pt-28 pb-16 overflow-hidden bg-[var(--bg-base)]"
    >
      {/* ── Layered background ─────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {/* Dot-grid pattern — right 60 %, fades left */}
        <div
          className="absolute inset-0 z-20 opacity-[0.22]"
          style={{
            backgroundImage: `radial-gradient(circle, #a07800 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 20%, black 55%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 20%, black 55%, black 100%)",
          }}
          aria-hidden
        />
        {/* Left-side colour fade so text stays readable */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[var(--bg-base)] from-[10%] via-[var(--bg-base)]/80 via-[48%] to-transparent to-[82%]" />
        {/* Photo */}
        <div className="absolute inset-0 hero-bg-in">
          <Image
            src="/male-elictirican-at-the-panel.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-[0.48] brightness-[1.02] contrast-[1.06] saturate-[0.72]"
            sizes="100vw"
            aria-hidden
          />
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────── */}
      <div className={cn(homeUi.container, "relative z-20")}>
        <div className="grid grid-cols-1 items-center lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            {hero.eyebrow && (
              <span className={cn("hero-in-1", homeUi.kicker)}>
                {hero.eyebrow}
              </span>
            )}

            <h1
              id="hero-heading"
              className="font-display text-[2.35rem] sm:text-6xl md:text-7xl lg:text-8xl font-black text-monolith text-[var(--text-primary)] leading-[0.92] mb-6 sm:mb-8 text-balance uppercase"
            >
              {hasSplit ? (
                <>
                  <span className="hero-in-2 block">
                    {renderHeadline(hero.headline_1!, hero.highlight_1!)}
                  </span>
                  <span className="hero-in-3 block mt-2 sm:mt-3">
                    {renderHeadline(hero.headline_2!, hero.highlight_2!)}
                  </span>
                </>
              ) : (
                <span className="hero-in-2 inline-block">
                  {(t.hero as { headline: string }).headline}
                </span>
              )}
            </h1>

            <p
              className={cn(
                "hero-in-4 mb-8 max-w-xl sm:mb-12",
                homeUi.bodyLead
              )}
            >
              {hero.subhead}
            </p>

            <div className="hero-in-5 flex flex-col sm:flex-row gap-4 sm:gap-5">
              <button
                type="button"
                onClick={() => onOpenModal?.()}
                className={cn("w-full text-center sm:w-auto", homeUi.pillPrimary)}
              >
                {hero.cta}
              </button>
              <a
                href={PHONE_HREF}
                className={cn("w-full sm:w-auto", homeUi.pillSecondary)}
              >
                <span className="text-[var(--text-muted)] font-semibold me-2">
                  {hero.call_us}
                </span>
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom progress indicator ───────────────────────── */}
      {hero.progress_from && hero.progress_to && (
        <div className="hero-progress-in absolute bottom-8 right-6 sm:right-10 xl:right-12 hidden md:block z-20">
          <div className="flex items-center gap-4 text-xs font-body-ui tracking-widest text-[var(--text-muted)] uppercase">
            <span>{hero.progress_from}</span>
            <div className="relative h-px w-24 overflow-hidden bg-[var(--border-decorative)]">
              <div className="absolute inset-y-0 left-0 w-1/3 bg-[var(--accent-light)]" />
            </div>
            <span>{hero.progress_to}</span>
          </div>
        </div>
      )}
    </section>
  );
}
