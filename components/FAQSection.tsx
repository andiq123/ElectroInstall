"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/section-data";
import { PlusIcon } from "./ui/Icons";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const translatedItems = FAQ_ITEMS.map((item, index) => ({
    ...item,
    question: t.faq.items[index]?.question || item.question,
    answer: t.faq.items[index]?.answer || item.answer,
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": translatedItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" bgType="wash-gold">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Decorative Accents specific to FAQ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--accent)]/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto">
        <SectionHeader 
          centered
          title={
            <>
              {t.faq.title_part1} <br />
              <span className="text-gradient not-italic">{t.faq.title_part2}</span>
            </>
          }
          className="mb-16 sm:mb-24"
        />

        {/* FAQ Accordion */}
        <div className="faq-list space-y-6">
          {translatedItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`group relative rounded-[var(--radius-3xl)] border transition-all duration-700 ${
                  isOpen 
                  ? "border-[var(--accent)]/30 bg-[var(--bg-elevated)] shadow-xl" 
                  : "border-[var(--border-glass)] bg-[var(--bg-base)] hover:bg-[var(--bg-elevated)]/50 hover:border-[var(--border-strong)] shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left p-8 flex items-center justify-between gap-8"
                  aria-expanded={isOpen}
                >
                  <span className={`text-xl sm:text-3xl font-black tracking-tighter leading-tight transition-colors duration-500 ${isOpen ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"}`}>
                    {item.question}
                  </span>
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl border border-[var(--border-glass)] flex items-center justify-center transition-all duration-700 ${isOpen ? "rotate-[225deg] bg-[var(--accent)] text-black" : "bg-[var(--bg-accent)] text-[var(--accent)] group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-black"}`}>
                    <PlusIcon />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="p-8 pt-0">
                    <div className="h-px w-full bg-[var(--border-glass)] mb-8" />
                    <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed font-medium max-w-2xl">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
