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
        <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-[var(--border-glass)] z-0" />
      )}

      <div className="relative w-16 h-16 mb-6 z-10 rounded-2xl border border-[var(--border-glass)] bg-[var(--bg-elevated)] flex items-center justify-center text-2xl text-[var(--accent)]">
        <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold border border-[var(--border-glass)] bg-[var(--bg-base)] text-[var(--text-muted)]">
          {index + 1}
        </span>
        {step.icon}
      </div>
      <div className="max-w-xs">
        <h3 className="process-step-title text-lg font-bold mb-2 text-[var(--text-primary)]">
          {step.title}
        </h3>
        <p className="process-step-desc text-[var(--text-secondary)] text-sm leading-relaxed">
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

      <div className="mt-20 pt-10 border-t border-[var(--border-glass)] text-center">
        <span className="text-sm text-[var(--text-muted)]">{t.common.work_done_right}</span>
      </div>
    </Section>
  );
}
