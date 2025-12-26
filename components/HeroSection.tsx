"use client";

import { useEffect, useState, useRef } from "react";
import ProfessionalHeroVisual from "@/components/sections/ProfessionalHeroVisual";
import { useLanguage } from "@/context/LanguageContext";

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
      ref={sectionRef}
      className="relative min-h-fit lg:min-h-[85vh] flex flex-col pt-32 sm:pt-40 lg:pt-24 pb-16 overflow-hidden bg-[var(--bg-base)]"
      aria-labelledby="hero-heading"
    >
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

      {/* Hero Visual (Electrician Illustration) */}
      <div className="hidden xl:block absolute top-1/2 -right-40 xl:-right-60 -translate-y-1/2 w-[1300px] aspect-square pointer-events-none select-none z-0 opacity-80">
        <ProfessionalHeroVisual />
      </div>

      <div className="container relative z-10 px-6 sm:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center flex-grow">
        <div className="w-full lg:w-[60%] py-12 lg:py-0">
          {/* Status Label */}
          <div className="mb-6 lg:mb-8 flex items-center gap-4 animate-fade-in">
             <div className="h-px w-10 bg-[var(--accent)]" />
             <span className="text-[10px] font-black tracking-[0.5em] text-[var(--accent)] uppercase">
               {t.hero.status_label}
             </span>
          </div>

          <h1
            id="hero-heading"
            className="text-5xl sm:text-7xl lg:text-7xl xl:text-8xl font-black text-[var(--text-primary)] leading-[0.85] tracking-tighter mb-8 italic uppercase"
            style={{ 
              transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`
            }}
          >
            {t.hero.headline_parts[0]} <br />
            <span className="text-[var(--accent)] not-italic inline-block py-1">{t.hero.headline_parts[1]}</span> <br />
            {t.hero.headline_parts[2]}
          </h1>

          <p className="text-lg lg:text-xl text-[var(--text-secondary)] mb-10 max-w-xl leading-relaxed font-medium border-l-2 border-[var(--border-glass)] pl-8">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-16">
            <button
               onClick={onOpenModal}
               className="group relative px-12 py-6 bg-[var(--accent)] text-black font-black text-xs uppercase tracking-[.25em] rounded-full overflow-hidden transition-all duration-300 shadow-2xl hover:shadow-[0_0_40px_rgba(250,204,21,0.25)] hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-[var(--surface-white)] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">{t.common.cta_primary}</span>
            </button>
            <a
              href="#servicii"
              className="px-10 py-6 bg-[var(--surface-white-soft)] border border-[var(--border-strong)] text-[var(--surface-white)] font-black text-xs uppercase tracking-widest rounded-full hover:bg-[var(--surface-white-strong)] hover:border-[var(--accent)]/30 transition-all duration-300 text-center flex items-center justify-center gap-3 group"
            >
              {t.nav.services}
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 transition-transform group-hover:translate-y-1" stroke="currentColor" strokeWidth="3">
                <path d="M19 14l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Clean Performance Indicators */}
          <div className="flex flex-wrap items-center gap-12 sm:gap-20">
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

      {/* Ambient Scroll Guide */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
         <div className="w-px h-16 bg-gradient-to-b from-[var(--accent)] to-transparent" />
      </div>
    </section>
  );
}
