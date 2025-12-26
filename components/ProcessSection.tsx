"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/section-data";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

interface ProcessStepProps {
  step: typeof PROCESS_STEPS[number];
  index: number;
  scrollYProgress: import("framer-motion").MotionValue<number>;
}

function ProcessStep({ step, index, scrollYProgress }: ProcessStepProps) {
  const stepStart = 0.15 + (index * 0.15);
  const stepPeak = 0.25 + (index * 0.15);
  const stepEnd = 0.35 + (index * 0.15);

  const isActive = useTransform(
    scrollYProgress,
    [stepStart, stepPeak, stepEnd],
    [0.4, 1, 0.4]
  );

  const iconScale = useTransform(
    scrollYProgress,
    [stepStart, stepPeak, stepEnd],
    [0.9, 1.1, 0.9]
  );

  const glowOpacity = useTransform(
    scrollYProgress,
    [stepStart, stepPeak, stepEnd],
    [0, 1, 0]
  );

  const stepTitleColor = useTransform(
    scrollYProgress,
    [stepStart, stepPeak, stepEnd],
    ["var(--text-secondary)", "var(--accent)", "var(--accent)"]
  );

  return (
    <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left">
      {/* Decorative Connector for Steps */}
      {index < PROCESS_STEPS.length - 1 && (
        <div className="hidden lg:block absolute top-[48px] left-[100%] w-full h-[1px] bg-gradient-to-r from-[var(--accent)]/30 to-transparent z-0" />
      )}

      {/* Step Point */}
      <div className="relative w-24 h-24 mb-10 z-10">
        <motion.div 
          style={{ 
            scale: iconScale,
            backgroundColor: "var(--bg-elevated)",
            boxShadow: useTransform(
              scrollYProgress,
              [stepStart, stepPeak, stepEnd],
              ["0 0 0px transparent", "0 0 40px var(--accent-glow)", "0 0 0px transparent"]
            ),
            borderColor: useTransform(
              scrollYProgress,
              [stepStart, stepPeak, stepEnd],
              ["var(--border-glass)", "var(--accent)", "var(--border-glass)"]
            )
          }}
          className="absolute inset-0 rounded-[2rem] border transition-all duration-300 flex items-center justify-center text-3xl shadow-2xl"
        >
          <motion.div style={{ color: stepTitleColor }}>
            {step.icon}
          </motion.div>
        </motion.div>
        
        {/* Active Glow Ring */}
        <motion.div 
          style={{ opacity: glowOpacity }}
          className="absolute -inset-2 rounded-[2.2rem] border-2 border-[var(--accent)] blur-[2px]"
        />

        {/* Step Number Badge */}
        <motion.div 
          style={{
            backgroundColor: useTransform(
              scrollYProgress,
              [stepStart, stepPeak, stepEnd],
              ["var(--bg-base)", "var(--accent)", "var(--accent)"]
            ),
            color: useTransform(
              scrollYProgress,
              [stepStart, stepPeak, stepEnd],
              ["var(--text-secondary)", "var(--text-inverted)", "var(--text-inverted)"]
            )
          }}
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-black italic text-[10px] border border-[var(--border-glass)] shadow-xl z-20"
        >
          {index + 1}
        </motion.div>
      </div>

      <div className="max-w-xs">
        <motion.h3 
          style={{ 
            color: stepTitleColor,
            opacity: isActive
          }}
          className="text-2xl font-black mb-4 tracking-tight uppercase italic"
        >
          {step.title}
        </motion.h3>
        <motion.p 
          style={{ 
            opacity: useTransform(scrollYProgress, [stepStart, stepPeak, stepEnd], [0.5, 1, 0.5])
          }}
          className="text-[var(--text-secondary)] text-sm font-medium leading-relaxed"
        >
          {step.description}
        </motion.p>
      </div>
    </div>
  );
}

import { useLanguage } from "@/context/LanguageContext";

export default function ProcessSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const translatedSteps = PROCESS_STEPS.map((step, index) => ({
    ...step,
    title: t.process.steps[index].title,
    description: t.process.steps[index].description,
  }));

  return (
    <Section ref={containerRef} id="proces" bgType="elevated">
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
              <ProcessStep 
                step={step} 
                index={index} 
                scrollYProgress={scrollYProgress}
              />
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
