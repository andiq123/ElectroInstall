"use client";

import ProfessionalHeroVisual from "@/components/sections/ProfessionalHeroVisual";
import { useLanguage } from "@/context/LanguageContext";
import { BUSINESS_INFO } from "@/lib/constants";

interface HeroSectionProps {
  onOpenModal?: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[100svh] flex items-center pt-24 sm:pt-32 overflow-hidden bg-[var(--bg-base)]"
    >
      <div className="sr-only">
        <h1>ElectroInstall - Servicii Electrice Profesionale în Chișinău</h1>
        <p>Oferim servicii de electrician autorizat, montaj instalații, intervenții de urgență și mentenanță electrică în toată Moldova și suburbiile Chișinăului.</p>
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] max-w-[600px] h-[50vw] max-h-[600px] bg-[radial-gradient(circle,rgba(250,204,21,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="hero-visual-entrance hidden xl:block absolute top-[88%] -right-24 -translate-y-1/2 w-[min(1000px,55vw)] aspect-square pointer-events-none select-none z-0">
        <ProfessionalHeroVisual />
      </div>

      <div className="hero-entrance container relative z-10 px-6 sm:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center flex-grow text-center lg:text-left">
        <div className="w-full lg:w-[58%] py-12 lg:py-0">
          <div className="hero-entrance-item mb-5 flex items-center justify-center lg:justify-start gap-3" style={{ "--hero-delay": "80ms" } as React.CSSProperties}>
            <div className="h-px w-8 bg-[var(--accent)]" />
            <span className="text-xs font-semibold tracking-widest text-[var(--accent)] uppercase">
              {t.hero.status_label}
            </span>
          </div>

          <h1
            id="hero-heading"
            className="hero-entrance-item hero-headline-entrance text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--text-primary)] leading-tight tracking-tight mb-6"
            style={{ "--hero-delay": "160ms" } as React.CSSProperties}
          >
            {t.hero.headline_parts[0]}{" "}
            <span className="text-[var(--accent)]">{t.hero.headline_parts[1]}</span>{" "}
            {t.hero.headline_parts[2]}
          </h1>

          <p className="hero-entrance-item text-base lg:text-lg text-[var(--text-secondary)] mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed" style={{ "--hero-delay": "240ms" } as React.CSSProperties}>
            {t.hero.description}
          </p>

          <div className="hero-entrance-item flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-8" style={{ "--hero-delay": "320ms" } as React.CSSProperties}>
            <button
              onClick={onOpenModal}
              className="w-full sm:w-auto px-8 py-4 bg-[var(--accent)] text-black font-semibold text-sm rounded-full hover:opacity-95 active:opacity-90 transition-opacity"
            >
              {t.common.cta_primary}
            </button>
            <a
              href="#servicii"
              className="w-full sm:w-auto px-8 py-4 bg-[var(--bg-elevated)] border border-[var(--border-glass)] text-[var(--text-primary)] font-medium text-sm rounded-full hover:border-[var(--accent)]/30 text-center flex items-center justify-center gap-2"
            >
              {t.nav.services}
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 14l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`}
            className="hero-entrance-item inline-flex items-center gap-3 mb-10 group/phone"
            aria-label={t.common.call_now}
            style={{ "--hero-delay": "400ms" } as React.CSSProperties}
          >
            <span className="flex w-11 h-11 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] group-hover/phone:bg-[var(--accent)] group-hover/phone:text-black transition-colors">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 5.5A2.5 2.5 0 015.5 3h1.5a2.5 2.5 0 012.3 1.5l1.0 2.2a2.5 2.5 0 01-.6 2.8l-1.3 1.3a11 11 0 005.4 5.4l1.3-1.3a2.5 2.5 0 012.8-.6l2.2 1.0a2.5 2.5 0 011.5 2.3v1.5a2.5 2.5 0 01-2.5 2.5H18.5a15.5 15.5 0 01-15.5-15.5V5.5z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="text-left">
              <span className="block text-xs font-medium text-[var(--text-muted)]">{t.common.phone_personal}</span>
              <span className="text-lg font-semibold text-[var(--text-primary)] group-hover/phone:text-[var(--accent)] transition-colors">{BUSINESS_INFO.phone}</span>
            </div>
          </a>

          <div className="hero-entrance-item flex flex-wrap items-center justify-center lg:justify-start gap-10 sm:gap-16" style={{ "--hero-delay": "480ms" } as React.CSSProperties}>
            {[
              { label: t.why_us.stats.experience, value: "8+" },
              { label: t.why_us.stats.cases, value: "300+" },
              { label: t.nav.appointments, value: t.common.work_done_right },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs font-medium text-[var(--text-muted)]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#servicii"
        className="hero-entrance-item absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-70 transition-opacity"
        aria-label={t.nav.services}
        style={{ "--hero-delay": "560ms" } as React.CSSProperties}
      >
        <span className="text-xs font-medium text-[var(--text-muted)]">{t.nav.services}</span>
        <div className="w-px h-8 bg-[var(--accent)]/50" />
      </a>
    </section>
  );
}
