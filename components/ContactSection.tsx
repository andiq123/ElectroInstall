"use client";

import { BUSINESS_INFO, PHONE_HREF } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { homeUi } from "@/lib/homeUi";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

interface ContactSectionProps {
  onOpenModal?: () => void;
}

export default function ContactSection({ onOpenModal }: ContactSectionProps) {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className={cn(homeUi.section, "bg-[var(--bg-section-alt)]")}
    >
      <div className={homeUi.container}>
        <Reveal variant="scale">
        <div className="bg-[var(--primary)] text-[var(--text-inverted)] rounded-xl p-10 sm:p-16 lg:p-20 relative overflow-hidden border border-black/10">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.12] pointer-events-none text-[var(--accent-light)]">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden>
              <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className={cn(homeUi.displayTitleOnInverse, "mb-6 sm:mb-8")}>
              {t.contact.title_part1}{" "}
              <span className="!text-[var(--accent-light)]">{t.contact.title_part2}</span>
            </h2>
            <p className={cn(homeUi.bodyLead, "mb-8 !text-zinc-200 sm:mb-12")}>
              {t.contact.subtitle}
            </p>
            <div className={cn(homeUi.gridGap, "flex flex-col sm:flex-row sm:gap-6")}>
              <button
                type="button"
                onClick={() => onOpenModal?.()}
                className={cn("w-full sm:w-auto", homeUi.pillPrimary, "touch-manipulation")}
              >
                {t.common.cta_primary}
              </button>
              <a
                href={PHONE_HREF}
                className={cn("w-full sm:w-auto", homeUi.pillSecondaryOnInverse)}
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
            {t.contact.trust_line ? (
              <p className="mt-8 sm:mt-10 text-sm font-medium !text-zinc-400">{t.contact.trust_line}</p>
            ) : null}
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
