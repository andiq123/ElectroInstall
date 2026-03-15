"use client";

import { BUSINESS_INFO, PHONE_HREF } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { PhoneIcon } from "@/components/ui/Icons";
import { ButtonWithIcon, SecondaryActionButton } from "@/components/ui";
import Reveal from "@/components/Reveal";

interface ContactSectionProps {
  onOpenModal?: () => void;
}

export default function ContactSection({ onOpenModal }: ContactSectionProps) {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-14 sm:py-24 lg:py-28 relative overflow-hidden bg-[var(--bg-section-alt)]">
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none hidden sm:block" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-0" />
      
      <div className="container-inner relative z-10">
        <Reveal 
          className="relative rounded-[1.5rem] sm:rounded-[2.25rem] overflow-hidden bg-white shadow-[var(--shadow-premium)] p-6 sm:p-14 lg:p-20 text-center border border-[var(--border-default)]"
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
              className="font-[var(--font-display)] text-[1.75rem] sm:text-[2.4rem] lg:text-[2.7rem] font-semibold text-[var(--text-primary)] leading-[var(--leading-tight)] tracking-tight mb-4 sm:mb-6 animate-fadeInUp delay-100 text-balance"
            >
              {t.contact.title_part1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)]">{t.contact.title_part2}</span>
            </h2>
            
            <p 
              className="text-[0.9875rem] sm:text-[var(--text-body-lg)] text-[var(--text-secondary)] leading-[1.65] sm:leading-[var(--leading-relaxed)] max-w-2xl mx-auto mb-6 sm:mb-10 animate-fadeInUp delay-200"
            >
              {t.contact.subtitle}
            </p>
            
            <div 
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-6 animate-fadeInUp delay-300"
            >
              <ButtonWithIcon
                onClick={onOpenModal}
                text={t.common.cta_primary}
                className="w-full sm:w-auto justify-center"
              />
              
              <SecondaryActionButton
                href={PHONE_HREF}
                ariaLabel={t.common.call_now}
                leading={<PhoneIcon size="sm" />}
              >
                {BUSINESS_INFO.phoneDisplay}
              </SecondaryActionButton>
            </div>
            
            {t.contact.trust_line && (
              <p 
                className="mt-6 sm:mt-8 text-sm font-medium text-[var(--text-muted)] animate-fadeInUp delay-400"
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
