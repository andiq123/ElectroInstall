"use client";

import { BUSINESS_INFO } from "@/lib/constants";
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
      <div className="max-w-2xl mb-16 sm:mb-24">
        <SectionHeader 
          title={
            <>
              {t.contact.title_part1} <br />
              <span className="text-gradient not-italic">{t.contact.title_part2}</span>
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
          className="group relative p-8 sm:p-10 rounded-[var(--radius-3xl)] border border-[var(--border-glass)] bg-[var(--bg-elevated)] transition-all duration-500 hover:shadow-2xl hover:border-[var(--accent)]/50 text-center overflow-hidden"
        >
          <div className="w-14 h-14 mx-auto mb-8 rounded-2xl flex items-center justify-center bg-[var(--accent)] text-black shadow-md group-hover:scale-110 transition-transform">
             <PhoneIcon size="lg" />
          </div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-tertiary)] mb-2">
            {t.common.phone_personal}
          </h3>
          <p className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-4 tracking-tighter">
            {BUSINESS_INFO.phone}
          </p>
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--accent)] border-b border-[var(--accent)]/30 pb-1 hover:border-[var(--accent)] transition-all">
            {t.common.call_now}
          </span>
        </a>

        {/* Location Hub */}
        <div 
          className="group relative p-8 sm:p-10 rounded-[var(--radius-3xl)] border border-[var(--border-glass)] bg-[var(--bg-elevated)] transition-all duration-500 hover:shadow-2xl hover:border-[var(--accent)]/30 text-center overflow-hidden"
        >
          <div className="w-14 h-14 mx-auto mb-8 rounded-2xl flex items-center justify-center border border-[var(--border-glass)] text-[var(--accent)] bg-[var(--bg-accent)] group-hover:scale-110 transition-all">
             <LocationIcon size="lg" />
          </div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-tertiary)] mb-2">
            {t.common.location_central}
          </h3>
          <p className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-4 tracking-tighter">
            {BUSINESS_INFO.location}
          </p>
          <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.2em] opacity-40">
            {t.common.chisinau_suburbs}
          </span>
        </div>

        {/* Email Hub - Now triggers modal */}
        <button
          onClick={onOpenModal}
          className="group relative p-8 sm:p-10 rounded-[var(--radius-3xl)] border border-[var(--border-glass)] bg-[var(--bg-elevated)] transition-all duration-500 hover:shadow-2xl hover:border-[var(--accent)]/50 text-center overflow-hidden w-full"
        >
          <div className="w-14 h-14 mx-auto mb-8 rounded-2xl flex items-center justify-center bg-[var(--bg-base)] border border-[var(--border-glass)] text-white shadow-md group-hover:scale-110 transition-transform">
             <MailIcon size="lg" />
          </div>
          
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-tertiary)] mb-2">
            {t.common.email_personal}
          </h3>
          <p className="text-lg font-black text-[var(--text-primary)] mb-6 tracking-tight break-all">
            {BUSINESS_INFO.email}
          </p>
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--accent)] border-b border-[var(--accent)]/30 pb-1 hover:border-[var(--accent)] transition-all">
            {t.common.send_message}
          </span>
        </button>
      </div>

    </Section>
  );
}
