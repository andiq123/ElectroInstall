"use client";

import { useState } from "react";
import { SectionHeader } from "./ui";
import { FAQ_ITEMS } from "@/lib/section-data";
import { PlusIcon, MinusIcon } from "./ui/Icons";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="container relative z-10 px-6 sm:px-8 md:px-12 lg:px-20 max-w-4xl mx-auto">
        <SectionHeader
          badge="Întrebări Frecvente"
          title="Ai Întrebări? Avem Răspunsuri"
          subtitle="Găsește răspunsuri la cele mai comune întrebări despre serviciile noastre electrice."
        />

        {/* FAQ Accordion */}
        <div className="faq-list mt-12">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "active" : ""}`}
            >
              <button
                onClick={() => toggleItem(index)}
                className="faq-trigger"
                aria-expanded={openIndex === index}
                aria-controls={`faq-content-${index}`}
              >
                <span className="faq-question">{item.question}</span>
                <span className="faq-icon">
                  {openIndex === index ? <MinusIcon /> : <PlusIcon />}
                </span>
              </button>
              <div
                id={`faq-content-${index}`}
                className="faq-content"
                role="region"
                aria-labelledby={`faq-trigger-${index}`}
              >
                <p className="faq-answer">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact link */}
        <div className="text-center mt-12">
          <p className="text-[var(--text-secondary)]">
            Nu ai găsit răspunsul?{" "}
            <a
              href="#contact"
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              Contactează-ne mai jos
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
