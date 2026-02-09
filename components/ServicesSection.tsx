"use client";

import { SERVICE_CATEGORIES, BUSINESS_INFO } from "@/lib/constants";
import { VoltageSymbol } from "@/components/ui/ElectricityDecorations";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { SERVICE_ICONS } from "@/lib/icons/service-icons";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  useCases?: string[];
}

interface ServiceCardProps {
  category: ServiceCategory;
  index: number;
  onOpenModal?: () => void;
}

function ServiceCard({ category, index, onOpenModal }: ServiceCardProps) {
  const { t } = useLanguage();
  const isEmergency = category.id === "emergency";
  const Icon = SERVICE_ICONS[category.id];
  const useCases = category.useCases ?? [];
  const phoneHref = `tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`;

  return (
    <article
      className={`service-card relative bg-[var(--bg-elevated)] border border-[var(--border-glass)] rounded-2xl p-6 flex flex-col hover:border-[var(--accent)]/20 ${
        isEmergency ? "lg:col-span-8" : "lg:col-span-4"
      }`}
      style={{ "--card-delay": `${index * 80}ms` } as React.CSSProperties}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="service-card-icon w-14 h-14 rounded-xl bg-[var(--bg-base)] border border-[var(--border-glass)] flex items-center justify-center text-[var(--accent)]">
          {Icon}
        </div>
        {isEmergency && (
          <span className="px-3 py-1 bg-[var(--danger)] text-[var(--surface-white)] rounded-full text-xs font-semibold">
            {t.services.emergency_badge}
          </span>
        )}
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          {category.title}
        </h3>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">
          {category.subtitle}
        </p>
        {useCases.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-medium text-[var(--accent)] mb-2">
              {t.services.best_for_label}
            </p>
            <div className="flex flex-wrap gap-2">
              {useCases.map((uc) => (
                <span
                  key={uc}
                  className="px-2.5 py-1 rounded-lg bg-[var(--bg-base)] border border-[var(--border-glass)] text-xs text-[var(--text-secondary)]"
                >
                  {uc}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-2 mt-auto">
          {isEmergency ? (
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--danger)] text-[var(--surface-white)] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 5.5A2.5 2.5 0 015.5 3h1.5a2.5 2.5 0 012.3 1.5l1.0 2.2a2.5 2.5 0 01-.6 2.8l-1.3 1.3a11 11 0 005.4 5.4l1.3-1.3a2.5 2.5 0 012.8-.6l2.2 1.0a2.5 2.5 0 011.5 2.3v1.5a2.5 2.5 0 01-2.5 2.5H18.5a15.5 15.5 0 01-15.5-15.5V5.5z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t.common.call_now}
            </a>
          ) : (
            <>
              <button
                type="button"
                onClick={onOpenModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)]/10 border border-[var(--accent)]/25 text-[var(--accent)] rounded-lg text-sm font-medium hover:bg-[var(--accent)] hover:text-black transition-colors"
              >
                {t.common.cta_rapid}
              </button>
              <a
                href={phoneHref}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--border-glass)] text-[var(--text-secondary)] rounded-lg text-sm font-medium hover:border-[var(--accent)]/30 hover:text-[var(--accent)] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 5.5A2.5 2.5 0 015.5 3h1.5a2.5 2.5 0 012.3 1.5l1.0 2.2a2.5 2.5 0 01-.6 2.8l-1.3 1.3a11 11 0 005.4 5.4l1.3-1.3a2.5 2.5 0 012.8-.6l2.2 1.0a2.5 2.5 0 011.5 2.3v1.5a2.5 2.5 0 01-2.5 2.5H18.5a15.5 15.5 0 01-15.5-15.5V5.5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t.common.phone}
              </a>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

interface ServicesSectionProps {
  onOpenModal?: () => void;
}

export default function ServicesSection({ onOpenModal }: ServicesSectionProps) {
  const { t } = useLanguage();
  
  const translatedCategories = SERVICE_CATEGORIES.map(category => {
    const cat = t.services.categories[category.id as keyof typeof t.services.categories];
    return {
      ...category,
      title: cat.title,
      subtitle: cat.subtitle,
      useCases: "useCases" in cat ? (cat as { useCases: string[] }).useCases : undefined,
    };
  });

  return (
    <Section id="servicii" bgType="base">
      {/* Section Header with Split Layout */}
      <SectionHeader 
        layout="split"
        badge={t.services.badge}
        title={
          <>
            {t.services.title_part1} <br /> 
            <span className="text-[var(--accent)] not-italic">{t.services.title_part2}</span>
          </>
        }
        subtitle={t.services.subtitle}
      />

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
        {translatedCategories.map((category, index) => (
          <ServiceCard 
            key={category.id} 
            category={category} 
            index={index}
            onOpenModal={onOpenModal}
          />
        ))}
      </div>

      <div className="mt-20 bg-[var(--bg-elevated)] border border-[var(--border-glass)] rounded-2xl p-10 sm:p-14 text-center">
        <div className="w-14 h-14 rounded-xl bg-[var(--bg-base)] border border-[var(--border-glass)] flex items-center justify-center text-[var(--accent)] mx-auto mb-6">
          <VoltageSymbol className="w-7 h-7" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4">
          {t.services.hook_title_part1}{" "}
          <span className="text-[var(--accent)]">{t.services.hook_title_part2}</span>
        </h3>
        <p className="text-[var(--text-secondary)] mb-10 max-w-xl mx-auto">
          {t.services.hook_subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--accent)] text-black rounded-full font-semibold text-sm hover:opacity-95 transition-opacity"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 5.5A2.5 2.5 0 015.5 3h1.5a2.5 2.5 0 012.3 1.5l1.0 2.2a2.5 2.5 0 01-.6 2.8l-1.3 1.3a11 11 0 005.4 5.4l1.3-1.3a2.5 2.5 0 012.8-.6l2.2 1.0a2.5 2.5 0 011.5 2.3v1.5a2.5 2.5 0 01-2.5 2.5H18.5a15.5 15.5 0 01-15.5-15.5V5.5z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t.common.phone}
          </a>
          <button
            onClick={onOpenModal}
            className="px-8 py-4 bg-[var(--bg-base)] border border-[var(--border-glass)] text-[var(--text-primary)] rounded-full font-medium text-sm hover:border-[var(--accent)]/30 transition-colors"
          >
            {t.common.cta_rapid}
          </button>
        </div>
      </div>
    </Section>
  );
}
