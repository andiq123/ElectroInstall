"use client";

import { REASONS, STATS } from "@/lib/section-data";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyChooseUs() {
  const { t } = useLanguage();
  
  const translatedReasons = REASONS.map((reason, index) => ({
    ...reason,
    title: t.why_us.reasons[index].title,
    description: t.why_us.reasons[index].description,
  }));

  const translatedStats = [
    { ...STATS[0], label: t.why_us.stats.experience },
    { ...STATS[1], label: t.why_us.stats.cases },
    { ...STATS[2], label: t.why_us.stats.transparency },
  ];

  return (
    <Section id="despre" bgType="wash-slate">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div className="lg:sticky lg:top-32">
          <SectionHeader 
            title={
              <>
                {t.why_us.title_part1} <br />
                <span className="text-[var(--accent)]">{t.why_us.title_part2}</span>
              </>
            }
            subtitle={t.why_us.subtitle}
            className="mb-10"
          />
          <div className="grid grid-cols-2 gap-4">
            {translatedStats.map((stat) => (
              <div 
                key={stat.label} 
                className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-glass)]"
              >
                <div className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-1 flex items-baseline gap-1">
                  {stat.value}
                  <span className="text-lg text-[var(--accent)] font-semibold">{stat.suffix}</span>
                </div>
                <p className="text-xs font-medium text-[var(--text-muted)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {translatedReasons.map((reason, index) => (
            <div 
              key={reason.title} 
              className={`p-6 sm:p-8 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-glass)] hover:border-[var(--accent)]/20 transition-colors ${index % 2 !== 0 ? "lg:ml-6" : ""}`}
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-base)] border border-[var(--border-glass)] flex items-center justify-center text-[var(--accent)] mb-5">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                {reason.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
