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
      className={`service-card relative group bg-[var(--bg-elevated)] border border-[var(--border-glass)] rounded-[var(--radius-2xl)] p-8 overflow-hidden flex flex-col hover:border-[var(--accent)]/40 hover:shadow-[0_0_30px_rgba(250,204,21,0.05)] hover:-translate-y-1 transition-[transform,border-color,box-shadow] duration-200 ease-out ${
        isEmergency ? "lg:col-span-8" : "lg:col-span-4"
      }`}
      style={{ "--card-delay": `${index * 100}ms` } as React.CSSProperties}
    >
      {/* Visual Header */}
      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-glass)] flex items-center justify-center text-[var(--accent)] shadow-xl group-hover:shadow-[var(--shadow-accent-sm)] group-hover:scale-105 transition-transform duration-200 ease-out">
          {Icon}
        </div>
        {isEmergency && (
          <div className="px-4 py-1.5 bg-[var(--danger)] text-[var(--surface-white)] rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse shadow-lg flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--surface-white)] animate-ping" />
            {t.services.emergency_badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-grow">
        <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight mb-4 uppercase italic">
          {category.title}
        </h3>
        <p className="text-[var(--text-secondary)] font-medium leading-relaxed mb-6 max-w-sm">
          {category.subtitle}
        </p>

        {/* Best-for use cases */}
        {useCases.length > 0 && (
          <div className="mb-8">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--accent)] mb-3 opacity-90">
              {t.services.best_for_label}
            </p>
            <div className="flex flex-wrap gap-2">
              {useCases.map((uc) => (
                <span
                  key={uc}
                  className="px-3 py-1.5 rounded-lg bg-[var(--bg-base)] border border-[var(--border-glass)] text-[11px] font-bold text-[var(--text-secondary)]"
                >
                  {uc}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Per-card CTAs */}
        <div className="flex flex-wrap gap-3 mt-auto">
          {isEmergency ? (
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--danger)] text-[var(--surface-white)] rounded-xl text-xs font-black uppercase tracking-wider hover:opacity-90 transition-opacity"
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
                className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] rounded-xl text-xs font-black uppercase tracking-wider hover:bg-[var(--accent)] hover:text-black transition-colors"
              >
                {t.common.cta_rapid}
              </button>
              <a
                href={phoneHref}
                className="inline-flex items-center gap-2 px-5 py-3 border border-[var(--border-strong)] text-[var(--text-secondary)] rounded-xl text-xs font-bold uppercase tracking-wider hover:border-[var(--accent)]/40 hover:text-[var(--accent)] transition-colors"
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

      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[var(--accent)]/[0.05] blur-3xl rounded-full group-hover:bg-[var(--accent)]/[0.1] transition-colors duration-500" />
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

      {/* High-Impact Contact Hook */}
      <div className="mt-32 relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)]/30 to-[var(--info)]/20 rounded-[var(--radius-3xl)] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-[var(--bg-elevated)] border border-[var(--border-glass)] rounded-[var(--radius-3xl)] p-12 sm:p-20 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)]/[0.05] rounded-full blur-[100px] -mr-48 -mt-48" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-glass)] flex items-center justify-center text-[var(--accent)] mb-10 shadow-xl">
              <VoltageSymbol className="w-10 h-10" />
            </div>
            
            <h3 className="text-3xl sm:text-6xl font-black text-[var(--text-primary)] mb-8 uppercase italic tracking-tighter leading-tight">
              {t.services.hook_title_part1} <br />
              <span className="text-[var(--accent)] not-italic">{t.services.hook_title_part2}</span>
            </h3>
            
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-14 max-w-2xl font-medium leading-relaxed">
              {t.services.hook_subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <a 
                href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`}
                className="px-12 py-6 bg-[var(--accent)] text-black rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-[var(--surface-white)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 5.5A2.5 2.5 0 015.5 3h1.5a2.5 2.5 0 012.3 1.5l1.0 2.2a2.5 2.5 0 01-.6 2.8l-1.3 1.3a11 11 0 005.4 5.4l1.3-1.3a2.5 2.5 0 012.8-.6l2.2 1.0a2.5 2.5 0 011.5 2.3v1.5a2.5 2.5 0 01-2.5 2.5H18.5a15.5 15.5 0 01-15.5-15.5V5.5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t.common.phone}
              </a>
              <button
                onClick={onOpenModal}
                className="px-12 py-6 bg-[var(--surface-white-soft)] border border-[var(--border-strong)] text-[var(--surface-white)] rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-[var(--surface-white-strong)] hover:border-[var(--accent)]/30 transition-all active:scale-95"
              >
                {t.common.cta_rapid}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
