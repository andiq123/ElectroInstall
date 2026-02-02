"use client";

import { useEffect, useState, useRef } from "react";
import ProfessionalHeroVisual from "@/components/sections/ProfessionalHeroVisual";
import { useLanguage } from "@/context/LanguageContext";
import { BUSINESS_INFO } from "@/lib/constants";

interface HeroSectionProps {
  onOpenModal?: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const { t } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 50;
      const y = (e.clientY - innerHeight / 2) / 50;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative min-h-[100svh] flex items-center pt-24 sm:pt-32 overflow-hidden bg-[var(--bg-base)]"
    >
      {/* AI Summary Landmark */}
      <div className="sr-only">
        <h1>ElectroInstall - Servicii Electrice Profesionale în Chișinău</h1>
        <p>Oferim servicii de electrician autorizat, montaj instalații, intervenții de urgență și mentenanță electrică în toată Moldova și suburbiile Chișinăului.</p>
      </div>
      {/* Premium Atmospheric Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.08)_0%,transparent_70%)] blur-[120px] animate-pulse-slow" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.05)_0%,transparent_70%)] blur-[100px]" />
        
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
        
        {/* Dynamic Light Beam */}
        <div 
          className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--accent)]/20 to-transparent transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(${mousePos.x * 20}px)` }}
        />
      </div>

      {/* Hero visual — entrance with delay */}
      <div className="hero-visual-entrance hidden xl:block absolute top-[95%] -right-40 xl:-right-60 -translate-y-1/2 w-[1300px] aspect-square pointer-events-none select-none z-0 opacity-80">
        <ProfessionalHeroVisual />
      </div>

      <div className="hero-entrance container relative z-10 px-6 sm:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center flex-grow text-center lg:text-left">
        <div className="w-full lg:w-[60%] py-12 lg:py-0">
          {/* 1. Status label */}
          <div className="hero-entrance-item mb-6 lg:mb-8 flex items-center justify-center lg:justify-start gap-4" style={{ "--hero-delay": "120ms" } as React.CSSProperties}>
             <div className="h-px w-10 bg-[var(--accent)]" />
             <span className="text-[10px] font-black tracking-[0.5em] text-[var(--accent)] uppercase">
               {t.hero.status_label}
             </span>
          </div>
 
          {/* 2. Headline — opacity only so parallax stays smooth */}
          <h1
            id="hero-heading"
            className="hero-entrance-item hero-headline-entrance text-5xl sm:text-7xl lg:text-7xl xl:text-8xl font-black text-[var(--text-primary)] leading-[0.85] tracking-tighter mb-8 italic uppercase"
            style={{ 
              "--hero-delay": "220ms",
              transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`
            } as React.CSSProperties}
          >
            {t.hero.headline_parts[0]} <br />
            <span className="text-[var(--accent)] not-italic inline-block py-1">{t.hero.headline_parts[1]}</span> <br />
            {t.hero.headline_parts[2]}
          </h1>
 
          {/* 3. Description */}
          <p className="hero-entrance-item text-lg lg:text-xl text-[var(--text-secondary)] mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium border-l-0 lg:border-l-2 pl-0 lg:pl-8" style={{ "--hero-delay": "380ms" } as React.CSSProperties}>
            {t.hero.description}
          </p>
 
          {/* 4. CTAs */}
          <div className="hero-entrance-item flex flex-col sm:flex-row items-center lg:items-start gap-6 mb-6" style={{ "--hero-delay": "480ms" } as React.CSSProperties}>
            <button
               onClick={onOpenModal}
               className="w-full sm:w-auto group relative px-12 py-6 bg-[var(--accent)] text-black font-black text-xs uppercase tracking-[.25em] rounded-full overflow-hidden shadow-2xl hover:shadow-[0_0_28px_rgba(250,204,21,0.2)] hover:scale-[1.02] active:scale-[0.99]"
            >
              <div className="absolute inset-0 bg-[var(--surface-white)] translate-y-full group-hover:translate-y-0" />
              <span className="relative z-10">{t.common.cta_primary}</span>
            </button>
            <a
              href="#servicii"
              className="w-full sm:w-auto px-10 py-6 bg-[var(--surface-white-soft)] border border-[var(--border-strong)] text-[var(--surface-white)] font-black text-xs uppercase tracking-widest rounded-full hover:bg-[var(--surface-white-strong)] hover:border-[var(--accent)]/25 text-center flex items-center justify-center gap-3 group"
            >
              {t.nav.services}
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 group-hover:translate-y-0.5" stroke="currentColor" strokeWidth="3">
                <path d="M19 14l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* 5. Phone */}
          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`}
            className="hero-entrance-item inline-flex items-center gap-3 mb-12 group/phone"
            aria-label={t.common.call_now}
            style={{ "--hero-delay": "580ms" } as React.CSSProperties}
          >
            <span className="flex w-12 h-12 items-center justify-center rounded-2xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] group-hover/phone:bg-[var(--accent)] group-hover/phone:text-black transition-colors">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 5.5A2.5 2.5 0 015.5 3h1.5a2.5 2.5 0 012.3 1.5l1.0 2.2a2.5 2.5 0 01-.6 2.8l-1.3 1.3a11 11 0 005.4 5.4l1.3-1.3a2.5 2.5 0 012.8-.6l2.2 1.0a2.5 2.5 0 011.5 2.3v1.5a2.5 2.5 0 01-2.5 2.5H18.5a15.5 15.5 0 01-15.5-15.5V5.5z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="text-left">
              <span className="block text-[9px] font-black uppercase tracking-[0.35em] text-[var(--accent)] opacity-90">{t.common.phone_personal}</span>
              <span className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight group-hover/phone:text-[var(--accent)] transition-colors">{BUSINESS_INFO.phone}</span>
            </div>
          </a>
 
          {/* 6. Stats */}
          <div className="hero-entrance-item flex flex-wrap items-center justify-center lg:justify-start gap-12 sm:gap-20" style={{ "--hero-delay": "680ms" } as React.CSSProperties}>
            {[
              { label: t.why_us.stats.experience, value: "8+" },
              { label: t.why_us.stats.cases, value: "300+" },
              { label: t.nav.appointments, value: t.common.work_done_right },
            ].map((item) => (
              <div key={item.label} className="group relative">
                <div className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tighter mb-1 uppercase italic">
                  {item.value}
                </div>
                <div className="text-[9px] font-black text-[var(--accent)] uppercase tracking-[0.4em] opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. Scroll guide */}
      <a
        href="#servicii"
        className="hero-entrance-item absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40 hover:opacity-60"
        aria-label={t.nav.services}
        style={{ "--hero-delay": "820ms" } as React.CSSProperties}
      >
        <span className="text-[9px] font-black uppercase tracking-[0.35em] text-[var(--accent)]">{t.nav.services}</span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--accent)] to-transparent" />
      </a>
    </section>
  );
}
