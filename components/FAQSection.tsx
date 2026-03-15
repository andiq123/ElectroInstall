"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/ui/SectionHeader";
import { PlusIcon, MinusIcon } from "@/components/ui/Icons";
import Reveal from "@/components/Reveal";

export default function FAQSection() {
  const { t } = useLanguage();
  const faq = t.faq as { title_part1: string; title_part2: string; items: Array<{ question: string; answer: string }> };
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const title = `${faq.title_part1} ${faq.title_part2}`;

  return (
    <section id="faq" className="scroll-mt-20 bg-[var(--bg-section-alt)] py-14 sm:py-24 lg:py-28 relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none hidden sm:block" 
           style={{ backgroundImage: 'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[var(--bg-base)] via-transparent to-[var(--bg-base)] opacity-80" />
      
      {/* Animated Glowing Orbs */}
      <div 
        className="absolute -left-64 top-1/4 w-[500px] h-[500px] bg-[var(--accent)] opacity-[0.04] blur-[100px] rounded-full pointer-events-none animate-orb"
      />
      <div 
        className="absolute -right-32 bottom-1/4 w-[400px] h-[400px] bg-[var(--primary)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none animate-orb-reverse delay-500"
      />

      <div className="container-inner max-w-4xl relative z-10">
        <Reveal>
          <SectionHeader
            title={title}
            centered
            className="mb-8 sm:mb-16"
          />
        </Reveal>
        
        <Reveal 
          className="flex flex-col gap-3 sm:gap-4" 
        >
          <ul role="list" className="flex flex-col gap-3 sm:gap-4">
            {faq.items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <li
                  key={index}
                  className="bg-white rounded-2xl border border-[var(--border-default)] shadow-sm overflow-hidden transition-colors hover:border-[var(--accent-muted)] animate-fadeInUp"
                >
                  <button
                    type="button"
                    className="w-full text-left px-5 py-4 sm:px-8 sm:py-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className={`text-[1.0625rem] sm:text-[1.125rem] font-semibold transition-colors ${isOpen ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`}>
                      {item.question}
                    </span>
                    <span 
                      className={`flex-shrink-0 w-8 h-8 rounded-full bg-[var(--bg-section-alt)] flex items-center justify-center text-[var(--accent)] transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                      aria-hidden
                    >
                      {isOpen ? <MinusIcon size="sm" /> : <PlusIcon size="sm" />}
                    </span>
                  </button>
                  
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 sm:px-8 sm:pb-8 text-[1rem] sm:text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-glass)] pt-3 sm:pt-4 mt-1 sm:mt-2">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
