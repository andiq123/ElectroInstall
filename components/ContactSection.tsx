"use client";

import { BUSINESS_INFO, SHOW_EMAIL } from "@/lib/constants";
import { PhoneIcon, LocationIcon, MailIcon } from "./ui/Icons";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

interface ContactSectionProps {
  onOpenModal?: () => void;
}

export default function ContactSection({ onOpenModal }: ContactSectionProps) {
  const { t } = useLanguage();

  return (
    <Section id="contact" bgType="base">
      <div className="max-w-2xl mb-16 sm:mb-24 mx-auto lg:mx-0 text-center lg:text-left">
        <SectionHeader 
          title={
            <>
              {t.contact.title_part1} <br />
              <span className="text-[var(--accent)]">{t.contact.title_part2}</span>
            </>
          }
          subtitle={t.contact.subtitle}
        />
      </div>

      {/* Contact Hubs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-24">
        {/* Phone Hub */}
        <a
          href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`}
          className="p-6 sm:p-8 rounded-2xl border border-[var(--border-glass)] bg-[var(--bg-elevated)] hover:border-[var(--accent)]/25 text-center transition-colors"
        >
          <div className="w-12 h-12 mx-auto mb-5 rounded-xl flex items-center justify-center bg-[var(--accent)] text-black">
            <PhoneIcon size="lg" />
          </div>
          <p className="text-xs font-medium text-[var(--text-muted)] mb-1">{t.common.phone_personal}</p>
          <p className="text-lg font-semibold text-[var(--text-primary)] mb-3">{BUSINESS_INFO.phone}</p>
          <span className="text-sm font-medium text-[var(--accent)]">{t.common.call_now}</span>
        </a>

        <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border-glass)] bg-[var(--bg-elevated)] text-center">
          <div className="w-12 h-12 mx-auto mb-5 rounded-xl flex items-center justify-center border border-[var(--border-glass)] text-[var(--accent)] bg-[var(--bg-base)]">
            <LocationIcon size="lg" />
          </div>
          <p className="text-xs font-medium text-[var(--text-muted)] mb-1">{t.common.location_central}</p>
          <p className="text-lg font-semibold text-[var(--text-primary)]">{BUSINESS_INFO.location}</p>
          <p className="text-xs text-[var(--text-muted)] mt-2">{t.common.chisinau_suburbs}</p>
        </div>

        {SHOW_EMAIL && (
        <button
          onClick={onOpenModal}
          className="p-6 sm:p-8 rounded-2xl border border-[var(--border-glass)] bg-[var(--bg-elevated)] hover:border-[var(--accent)]/25 text-center w-full transition-colors"
        >
          <div className="w-12 h-12 mx-auto mb-5 rounded-xl flex items-center justify-center bg-[var(--bg-base)] border border-[var(--border-glass)] text-[var(--text-primary)]">
            <MailIcon size="lg" />
          </div>
          <p className="text-xs font-medium text-[var(--text-muted)] mb-1">{t.common.email_personal}</p>
          <p className="text-lg font-semibold text-[var(--text-primary)] mb-3 break-all">{BUSINESS_INFO.email}</p>
          <span className="text-sm font-medium text-[var(--accent)]">{t.common.send_message}</span>
        </button>
      )}
      </div>

    </Section>
  );
}
