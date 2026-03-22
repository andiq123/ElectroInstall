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
      <span className="text-[var(--accent)] italic">{highlight}</span>
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
      <div className="sr-only">
        <h1>
          Electrician Chișinău – {BUSINESS_INFO.phoneDisplay}. ElectroInstall – reparații și instalații electrice.
        </h1>
        <p>
          Sună la {BUSINESS_INFO.phoneDisplay}. Preț corect înainte de lucrare. Lucrări conform normelor. Disponibil 24/7.
        </p>
      </div>

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[var(--bg-base)] from-[8%] via-[var(--bg-base)]/70 via-[45%] to-transparent to-[78%]" />
        <div className="absolute inset-0 hero-bg-in">
          <Image
            src="/male-elictirican-at-the-panel.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-[0.52] brightness-[1.02] contrast-[1.04] saturate-[0.78]"
            sizes="100vw"
            aria-hidden
          />
        </div>
      </div>

      <div className={cn(homeUi.container, "relative z-20")}>
        <div className={cn(homeUi.gridGap, "grid grid-cols-1 items-center lg:grid-cols-12 lg:gap-12")}>
          <div className="lg:col-span-8">
            {hero.eyebrow && (
              <span className={cn("hero-in-1", homeUi.kicker)}>{hero.eyebrow}</span>
            )}
            <h1
              id="hero-heading"
              className="font-display text-[2.35rem] sm:text-6xl md:text-7xl lg:text-8xl font-black text-monolith text-[var(--text-primary)] leading-[0.92] mb-6 sm:mb-8 text-balance uppercase"
            >
              {hasSplit ? (
                <>
                  <span className="hero-in-2 block">{renderHeadline(hero.headline_1!, hero.highlight_1!)}</span>
                  <span className="hero-in-3 block mt-2 sm:mt-3">
                    {renderHeadline(hero.headline_2!, hero.highlight_2!)}
                  </span>
                </>
              ) : (
                <span className="hero-in-2 inline-block">{(t.hero as { headline: string }).headline}</span>
              )}
            </h1>

            <p className={cn("hero-in-4 mb-8 max-w-xl sm:mb-12", homeUi.bodyLead)}>
              {hero.subhead}
            </p>

            <div className={cn(homeUi.gridGap, "flex flex-col sm:flex-row sm:gap-6")}>
              <button
                type="button"
                onClick={() => onOpenModal?.()}
                className={cn("hero-in-5 w-full text-center sm:w-auto", homeUi.pillPrimary)}
              >
                {hero.cta}
              </button>
              <a
                href={PHONE_HREF}
                className={cn("hero-in-6 w-full sm:w-auto", homeUi.pillSecondary)}
              >
                <span className="text-[var(--text-muted)] font-semibold me-2">{hero.call_us}</span>
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>

      {hero.progress_from && hero.progress_to && (
        <div className="hero-progress-in absolute bottom-8 right-6 sm:right-10 xl:right-12 hidden md:block z-20">
          <div className="flex items-center gap-4 text-xs font-body-ui tracking-widest text-[var(--text-muted)] uppercase">
            <span>{hero.progress_from}</span>
            <div className="relative h-px w-24 overflow-hidden bg-[var(--border-decorative)]">
              <div className="absolute inset-y-0 left-0 w-1/3 bg-[var(--accent)]" />
            </div>
            <span>{hero.progress_to}</span>
          </div>
        </div>
      )}
    </section>
  );
}
