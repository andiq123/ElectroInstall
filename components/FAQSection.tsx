"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { homeUi } from "@/lib/homeUi";
import type { Translations } from "@/lib/locales";
import { staggerMs } from "@/lib/stagger";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

type FAQSectionProps = {
  faq: Translations["faq"] & {
    title_centered?: string;
    title_part1: string;
    title_part2: string;
    items: Array<{ question: string; answer: string }>;
  };
};

export default function FAQSection({ faq }: FAQSectionProps) {

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const title = faq.title_centered ?? `${faq.title_part1} ${faq.title_part2}`;

  return (
    <section id="faq" className={cn(homeUi.section, "bg-[var(--bg-base)]")}>
      <div className={homeUi.containerNarrow}>
        <Reveal variant="blur" className="block">
          <h2
            className={cn(
              homeUi.displayTitle,
              "mb-12 text-center sm:mb-16"
            )}
          >
            {title}
          </h2>
        </Reveal>

        <ul className="space-y-3 sm:space-y-4" role="list">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={index}>
                <Reveal
                  variant="up-sm"
                  delay={staggerMs(index, 55, 70)}
                  className="block"
                >
                  <div
                    className={cn(
                      "overflow-hidden rounded-2xl border transition-all duration-200",
                      isOpen
                        ? "border-amber-200/80 bg-amber-50/60 shadow-[0_2px_16px_-4px_rgba(255,193,7,0.18)]"
                        : "border-[var(--border-decorative)] bg-white hover:border-amber-200/50"
                    )}
                  >
                    {/* Question trigger */}
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-4 px-6 py-5 text-start sm:px-7 sm:py-6"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      id={`faq-question-${index}`}
                    >
                      <span
                        className={cn(
                          homeUi.cardTitle,
                          "leading-snug",
                          isOpen ? "text-[var(--accent-dark)]" : undefined
                        )}
                      >
                        {item.question}
                      </span>

                      {/* Lucide icon — rotates on open */}
                      <span
                        className={cn(
                          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200",
                          isOpen
                            ? "bg-[var(--accent-light)] text-zinc-900 shadow-[0_0_0_4px_rgba(255,193,7,0.15)]"
                            : "border border-[var(--border-decorative)] bg-white text-[var(--text-muted)]"
                        )}
                        aria-hidden
                      >
                        {isOpen ? (
                          <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
                        ) : (
                          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                        )}
                      </span>
                    </button>

                    {/* Answer */}
                    <div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      className={cn(
                        "grid transition-all duration-300 ease-in-out",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={cn(
                            homeUi.bodyLead,
                            "px-6 pb-6 pr-14 sm:px-7 sm:pb-7 sm:pr-16"
                          )}
                        >
                          {item.answer}
                        </p>
                      </div>
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
