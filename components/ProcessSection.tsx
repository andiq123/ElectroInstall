"use client";

import { PROCESS_STEPS } from "@/lib/section-data";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

interface ProcessStepProps {
  step: (typeof PROCESS_STEPS)[number];
  index: number;
}

function ProcessStep({ step, index }: ProcessStepProps) {
  return (
    <div
      className="process-step relative flex flex-col items-center lg:items-start text-center lg:text-left"
      style={{ "--step-delay": `${index * 80}ms` } as React.CSSProperties}
    >
      {/* Decorative Connector for Steps */}
      {index < PROCESS_STEPS.length - 1 && (
        <div className="hidden lg:block absolute top-[48px] left-[100%] w-full h-[1px] bg-gradient-to-r from-[var(--accent)]/30 to-transparent z-0" />
      )}

      {/* Step Point */}
      <div className="relative w-24 h-24 mb-10 z-10 group/step">
        <div className="absolute inset-0 rounded-[2rem] border border-[var(--border-glass)] bg-[var(--bg-elevated)] flex items-center justify-center text-3xl shadow-2xl transition-colors duration-300 group-hover/step:border-[var(--accent)] group-hover/step:shadow-[0_0_40px_var(--accent-glow)]">
          <div className="text-[var(--text-secondary)] transition-colors duration-300 group-hover/step:text-[var(--accent)]">
            {step.icon}
          </div>
        </div>

        {/* Active Glow Ring - visible on hover */}
        <div className="absolute -inset-2 rounded-[2.2rem] border-2 border-[var(--accent)] blur-[2px] opacity-0 group-hover/step:opacity-100 transition-opacity duration-300" />

        {/* Step Number Badge */}
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-black italic text-[10px] border border-[var(--border-glass)] bg-[var(--bg-base)] text-[var(--text-secondary)] shadow-xl z-20 transition-colors duration-300 group-hover/step:bg-[var(--accent)] group-hover/step:text-[var(--text-inverted)]">
          {index + 1}
        </div>
      </div>

      <div className="max-w-xs">
        <h3 className="process-step-title text-2xl font-black mb-4 tracking-tight uppercase italic text-[var(--text-primary)]">
          {step.title}
        </h3>
        <p className="process-step-desc text-[var(--text-secondary)] text-sm font-medium leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function ProcessSection() {
  const { t } = useLanguage();

  const translatedSteps = PROCESS_STEPS.map((step, index) => ({
    ...step,
    title: t.process.steps[index].title,
    description: t.process.steps[index].description,
  }));

  return (
    <Section id="proces" bgType="elevated">
      <SectionHeader
        layout="split"
        title={
          <>
            {t.process.title_part1} <br />
            <span className="text-[var(--accent)] not-italic">{t.process.title_part2}</span>
          </>
        }
        subtitle={t.process.subtitle}
      />

      {/* Step Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 relative">
        {translatedSteps.map((step, index) => (
          <div key={step.title} className="relative group">
            <ProcessStep step={step} index={index} />
          </div>
        ))}
      </div>

      <div className="mt-32 pt-12 border-t border-[var(--border-glass)] flex flex-col items-center gap-6">
        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[var(--accent)] opacity-40">
          {t.common.work_done_right}
        </span>
        <div className="w-px h-24 bg-gradient-to-b from-[var(--accent)] to-transparent" />
      </div>
    </Section>
  );
}
