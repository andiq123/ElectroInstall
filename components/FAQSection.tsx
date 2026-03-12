"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/ui/SectionHeader";
import { PlusIcon, MinusIcon } from "@/components/ui/Icons";

export default function FAQSection() {
  const { t } = useLanguage();
  const faq = t.faq as { title_part1: string; title_part2: string; items: Array<{ question: string; answer: string }> };
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const title = `${faq.title_part1} ${faq.title_part2}`;

  return (
    <section id="faq" className="scroll-mt-[4.5rem] bg-[var(--bg-base)] border-t border-black/[0.06] py-16 sm:py-20 lg:py-24">
      <div className="container-inner">
        <SectionHeader
          title={title}
          centered
          className="mb-10 sm:mb-12"
        />
        <ul className="faq-list max-w-3xl mx-auto" role="list">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li
                key={index}
                className={`faq-item ${isOpen ? "active" : ""}`}
              >
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="faq-question">{item.question}</span>
                  <span className="faq-icon" aria-hidden>
                    {isOpen ? <MinusIcon size="sm" /> : <PlusIcon size="sm" />}
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className="faq-content"
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  aria-hidden={!isOpen}
                >
                  <p className="faq-answer">{item.answer}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
