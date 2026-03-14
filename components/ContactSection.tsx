"use client";

import { BUSINESS_INFO, PHONE_HREF } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { PhoneIcon } from "@/components/ui/Icons";
import Reveal from "@/components/Reveal";

interface ContactSectionProps {
  onOpenModal?: () => void;
}

export default function ContactSection({ onOpenModal }: ContactSectionProps) {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden bg-[var(--bg-section-alt)]">
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-0" />
      
      <div className="container-inner relative z-10">
        <Reveal 
          className="relative rounded-[2.5rem] overflow-hidden bg-white shadow-[var(--shadow-premium)] p-8 sm:p-16 lg:p-24 text-center border border-[var(--border-glass)]"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)]" />
          <div 
            className="absolute -bottom-24 -right-24 w-64 h-64 bg-[var(--accent)] opacity-[0.06] blur-[80px] rounded-full pointer-events-none animate-orb"
          />
          <div 
            className="absolute -top-24 -left-24 w-64 h-64 bg-[var(--primary)] opacity-[0.04] blur-[80px] rounded-full pointer-events-none animate-orb-reverse delay-500"
          />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 
              className="font-[var(--font-display)] text-[2.5rem] sm:text-[3.5rem] font-extrabold text-[var(--text-primary)] leading-tight tracking-tight mb-6 animate-fadeInUp delay-100"
            >
              {t.contact.title_part1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)]">{t.contact.title_part2}</span>
            </h2>
            
            <p 
              className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10 animate-fadeInUp delay-200"
            >
              {t.contact.subtitle}
            </p>
            
            <div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fadeInUp delay-300"
            >
              <button
                type="button"
                onClick={onOpenModal}
                className="w-full sm:w-auto min-h-[56px] px-8 py-4 rounded-xl text-base font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] shadow-lg shadow-[var(--primary)]/20 transition-all border border-transparent hover:scale-105 active:scale-95"
              >
                {t.common.cta_primary}
              </button>
              
              <a
                href={PHONE_HREF}
                className="w-full sm:w-auto flex items-center justify-center gap-3 min-h-[56px] px-8 py-4 rounded-xl text-base font-bold text-[var(--text-primary)] bg-white border-2 border-[var(--border-strong)] hover:border-[var(--accent)] hover:text-[var(--accent-dark)] transition-all shadow-sm hover:scale-105 active:scale-95"
                aria-label={t.common.call_now}
              >
                <PhoneIcon size="sm" />
                <span className="tracking-wide">{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
            
            {t.contact.trust_line && (
              <p 
                className="mt-8 text-sm font-medium text-[var(--text-muted)] animate-fadeInUp delay-400"
              >
                {t.contact.trust_line}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
