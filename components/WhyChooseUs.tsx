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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 sm:gap-32 items-start relative box-border">
        {/* Decorative background element for Why section */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[var(--accent)]/[0.03] blur-[120px] rounded-full pointer-events-none" />
        
        {/* Content Column - Sticky on Desktop */}
        <div className="lg:sticky lg:top-32">
          <SectionHeader 
            title={
              <>
                {t.why_us.title_part1} <br />
                <span className="text-gradient not-italic">{t.why_us.title_part2}</span>
              </>
            }
            subtitle={t.why_us.subtitle}
            className="mb-12"
          />

          {/* Stats Vertical Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {translatedStats.map((stat) => (
              <div 
                key={stat.label} 
                className="p-8 rounded-[var(--radius-3xl)] bg-[var(--bg-elevated)] shadow-xl border border-[var(--border-glass)] transition-all duration-500 hover:shadow-[var(--shadow-premium)] hover:-translate-y-1"
              >
                <div className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] mb-3 tracking-tighter flex items-baseline gap-1">
                  {stat.value}
                  <span className="text-xl sm:text-2xl text-[var(--accent)] font-bold">{stat.suffix}</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reasons Column - Creative Floating Cards */}
        <div className="space-y-6 relative">
          {translatedReasons.map((reason, index) => (
            <div 
              key={reason.title} 
              className={`group why-card ${
                index % 2 !== 0 ? "lg:translate-x-8" : ""
              }`}
            >
              <div className="relative p-10 sm:p-12 rounded-[var(--radius-4xl)] bg-[var(--bg-base)] border border-[var(--border-glass)] transition-all duration-700 hover:border-[var(--accent)]/40 hover:shadow-2xl overflow-hidden shadow-sm hover:bg-[var(--bg-elevated)]">
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--bg-accent)] text-[var(--accent)] flex items-center justify-center mb-8 border border-[var(--border-glass)] group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    {reason.icon}
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] mb-4 tracking-tight group-hover:text-[var(--accent)] transition-colors italic uppercase">
                    {reason.title}
                  </h3>
                  <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-normal">
                    {reason.description}
                  </p>
                </div>

                {/* Number indicator */}
                <div className="absolute top-8 right-10 text-6xl font-black text-[var(--text-primary)] opacity-[0.03] select-none group-hover:opacity-[0.07] transition-opacity">
                  0{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
