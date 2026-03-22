"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PlusIcon, MinusIcon } from "@/components/ui/Icons";
import { homeUi } from "@/lib/homeUi";
import { staggerMs } from "@/lib/stagger";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

export default function FAQSection() {
  const { t } = useLanguage();
  const faq = t.faq as {
    title_centered?: string;
    title_part1: string;
    title_part2: string;
    items: Array<{ question: string; answer: string }>;
  };

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const title = faq.title_centered ?? `${faq.title_part1} ${faq.title_part2}`;

  return (
    <section id="faq" className={cn(homeUi.section, "bg-[var(--bg-base)]")}>
      <div className={homeUi.containerNarrow}>
        <Reveal variant="blur" className="block">
          <h2 className={cn(homeUi.displayTitle, "mb-12 text-center sm:mb-16")}>
            {title}
          </h2>
        </Reveal>
        <ul className="space-y-0" role="list">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li
                key={index}
                className="group mb-6 border-b border-[var(--border-decorative)] pb-6 last:mb-0 sm:mb-8 sm:pb-8"
              >
                <Reveal variant="up-sm" delay={staggerMs(index, 55, 70)} className="block">
                <button
                  type="button"
                  className="w-full flex justify-between items-start gap-4 text-start"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className={cn(homeUi.cardTitle, "leading-snug")}>
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-decorative)] text-[var(--accent)] transition-transform duration-300",
                      isOpen ? "rotate-45" : ""
                    )}
                    aria-hidden
                  >
                    {isOpen ? <MinusIcon size="sm" /> : <PlusIcon size="sm" />}
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className={cn(homeUi.bodyLead, "pe-12")}>
                      {item.answer}
                    </p>
                  </div>
                </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
