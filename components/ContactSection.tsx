"use client";

import { BUSINESS_INFO, PHONE_HREF } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { PhoneIcon } from "@/components/ui/Icons";

interface ContactSectionProps {
  onOpenModal?: () => void;
}

export default function ContactSection({ onOpenModal }: ContactSectionProps) {
  const { t } = useLanguage();

  return (
    <section id="contact" className="scroll-mt-[4.5rem] bg-[var(--bg-base)] border-t border-black/[0.06] py-16 sm:py-20">
      <div className="container-inner text-center">
        <h2 className="font-[var(--font-display)] text-[2rem] sm:text-[2.25rem] font-bold text-[var(--text-primary)] leading-tight tracking-tight mb-4">
          {t.contact.title_part1} <span className="text-[var(--accent)]">{t.contact.title_part2}</span>
        </h2>
        <p className="text-[1.125rem] text-[var(--text-secondary)] leading-[1.65] max-w-2xl mx-auto mb-8">
          {t.contact.subtitle}
        </p>
        {t.contact.trust_line && (
          <p className="text-[var(--text-small)] font-medium text-[var(--text-secondary)] mb-8">
            {t.contact.trust_line}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenModal}
            className="min-h-[52px] px-8 py-3.5 rounded-lg text-[1rem] font-semibold text-white bg-[var(--text-primary)] hover:opacity-90 transition-opacity"
          >
            {t.common.cta_primary}
          </button>
          <a
            href={PHONE_HREF}
            className="flex items-center justify-center gap-2 min-h-[52px] px-8 py-3.5 rounded-lg text-[1rem] font-semibold text-[var(--text-primary)] border-2 border-[var(--border-strong)] hover:bg-black/[0.04] transition-colors"
            aria-label={t.common.call_now}
          >
            <PhoneIcon size="sm" />
            {BUSINESS_INFO.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
