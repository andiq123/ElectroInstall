"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { BUSINESS_INFO, PHONE_HREF } from "@/lib/constants";
import { ButtonWithIcon, SecondaryActionButton } from "@/components/ui";

const PHONE_DISPLAY = BUSINESS_INFO.phoneDisplay;

interface HeroSectionProps {
  onOpenModal?: () => void;
}

function renderHeadline(line: string, highlight: string) {
  const i = line.indexOf(highlight);
  if (i === -1) return line;
  return (
    <>
      {line.slice(0, i)}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] selection:text-white relative">
        {highlight}
        <span 
          className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-[var(--accent)] to-transparent rounded-full animate-scaleIn delay-800"
          style={{ transformOrigin: "left" }}
        />
      </span>
      {line.slice(i + highlight.length)}
    </>
  );
}



export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const { t } = useLanguage();
  const hero = t.hero as {
    headline_1?: string;
    highlight_1?: string;
    headline_2?: string;
    highlight_2?: string;
    subhead: string;
    cta: string;
    badge_text?: string;
    call_us?: string;
  };

  const hasSplit = hero.headline_1 && hero.highlight_1 && hero.headline_2 && hero.highlight_2;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative bg-[var(--bg-base)] overflow-hidden"
    >
      <div className="sr-only">
        <h1>Electrician Chișinău – {PHONE_DISPLAY}. ElectroInstall – reparații și instalații electrice.</h1>
        <p>Sună la {PHONE_DISPLAY}. Preț corect înainte de lucrare. Lucrări conform normelor. Disponibil 24/7.</p>
      </div>

      {/* Animated Glowing Background Orbs */}
      <div 
        className="absolute top-[10%] -left-[10%] w-[40vw] h-[40vw] bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 pointer-events-none animate-orb hidden sm:block"
      />
      <div 
        className="absolute bottom-[10%] -right-[10%] w-[35vw] h-[35vw] bg-[var(--primary)] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 pointer-events-none animate-orb-reverse delay-500 hidden sm:block"
      />
      
      {/* Clean Grid Decorative Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none hidden sm:block" 
           style={{ backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-[var(--bg-base)] to-[var(--bg-base)] opacity-80 block" />

      <div className="container-inner py-10 sm:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center min-h-[60vh] sm:min-h-[70vh]">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col justify-center">
            <h1
              id="hero-heading"
              className="font-[var(--font-display)] text-[1.95rem] sm:text-[3.1rem] lg:text-[3.85rem] font-bold text-[var(--text-primary)] leading-[1.1] tracking-tight mb-4 sm:mb-6 animate-fadeInUp delay-100 text-balance"
            >
              {hasSplit ? (
                <>
                  <span className="block">{renderHeadline(hero.headline_1!, hero.highlight_1!)}</span>
                  <span className="block mt-2">{renderHeadline(hero.headline_2!, hero.highlight_2!)}</span>
                </>
              ) : (
                (t.hero as { headline: string }).headline
              )}
            </h1>
            
            <p className="text-[1rem] sm:text-[1.125rem] text-[var(--text-secondary)] leading-relaxed max-w-lg mb-6 sm:mb-10 animate-fadeInUp delay-200">
              {hero.subhead}
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 animate-fadeInUp delay-300">
              <ButtonWithIcon
                onClick={onOpenModal}
                text={hero.cta}
                className="w-full sm:w-auto justify-center"
              />
              
              <SecondaryActionButton
                href={PHONE_HREF}
                ariaLabel={t.common.call_now}
              >
                <span aria-hidden="true" className="text-[var(--text-muted)]">{hero.call_us}</span>
                {PHONE_DISPLAY}
              </SecondaryActionButton>
            </div>
          </div>

          {/* Visual Content */}
          <div className="order-1 lg:order-2 lg:col-span-6 relative w-full aspect-[16/10] sm:aspect-[4/3] lg:aspect-square max-h-[290px] sm:max-h-[500px] lg:max-h-none mx-auto animate-fadeIn delay-300">
            {/* Animated Decorative Ring */}
            <div 
              className="absolute -inset-8 border border-[var(--accent)] rounded-full opacity-20 pointer-events-none hidden sm:block animate-spin-slow"
              style={{ borderStyle: "dashed", borderWidth: "2px" }}
            />
            
            {/* Layered Decorative Elements */}
            <div className="absolute -inset-2 sm:-inset-8 border pointer-events-none border-[var(--border-glass)] rounded-[2rem] sm:rounded-[3rem] opacity-50 bg-[var(--bg-section-alt)]/20 backdrop-blur-sm" />
            <div className="absolute inset-2 sm:inset-8 bg-gradient-to-tr from-[var(--bg-inset)] to-white rounded-2xl sm:rounded-3xl shadow-[var(--shadow-premium)] rotate-3 sm:rotate-6 opacity-35 sm:opacity-40 transition-transform duration-700 hover:rotate-2" />
            
            <div className="absolute inset-0 bg-white rounded-2xl sm:rounded-3xl shadow-[var(--shadow-lg)] overflow-hidden border border-white/40 ring-1 ring-black/5 group">
              <Image
                src="/male-elictirican-at-the-panel.jpg"
                alt="Electrician la panoul de distribuție – ElectroInstall Chișinău"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="object-cover object-center transition-transform sm:hover:scale-110 duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none mix-blend-overlay opacity-80 group-hover:opacity-50 transition-opacity duration-700" />
            </div>

            {/* Premium Clean Badge */}
            <div className="absolute -bottom-4 -left-3 sm:-bottom-8 sm:-left-8 bg-white/90 backdrop-blur-xl border border-[var(--border-default)] rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-[var(--shadow-lg)] w-max animate-fadeInUp delay-600">
              <div className="flex items-center gap-5">
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-[var(--primary)] flex items-center justify-center text-white rounded-lg sm:rounded-xl shadow-[var(--shadow-md)]">
                   <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                   </svg>
                </div>
                <div>
                  <p className="font-[var(--font-display)] font-extrabold text-[1rem] sm:text-[1.25rem] text-[var(--text-primary)] leading-none mb-0.5 sm:mb-1">100+</p>
                  <p className="text-[0.6875rem] sm:text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wide sm:tracking-wider">{hero.badge_text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
