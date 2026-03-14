"use client";

import { useLanguage } from "@/context/LanguageContext";

interface Testimonial {
  quote: string;
  name: string;
  service: string;
}

function QuoteMark() {
  return (
    <svg
      aria-hidden="true"
      className="w-8 h-8 text-[var(--accent)] opacity-25"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M11.3 2.6C6.1 5 3 9.2 3 14c0 3.5 2.5 6 5.5 6 2.7 0 4.5-2 4.5-4.5 0-2.4-1.7-4.2-3.8-4.5.3-2.3 2-4.8 4.6-6.3l-2.5-2.1zm10 0C16.1 5 13 9.2 13 14c0 3.5 2.5 6 5.5 6 2.7 0 4.5-2 4.5-4.5 0-2.4-1.7-4.2-3.8-4.5.3-2.3 2-4.8 4.6-6.3l-2.5-2.1z" />
    </svg>
  );
}

function TestimonialCard({ quote, name, service }: Testimonial) {
  return (
    <blockquote className="flex flex-col gap-4 p-6 sm:p-8 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-glass)] h-full">
      <QuoteMark />
      <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-[1.65] flex-1">
        {quote}
      </p>
      <footer className="pt-4 border-t border-[var(--border-glass)]">
        <p className="text-[0.9375rem] font-semibold text-[var(--text-primary)]">{name}</p>
        <p className="text-[var(--text-small)] text-[var(--text-muted)]">{service}</p>
      </footer>
    </blockquote>
  );
}

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const data = t.testimonials as { title: string; items: Testimonial[] };

  return (
    <section className="bg-[var(--bg-base)] border-t border-black/[0.06] py-16 sm:py-20 lg:py-24">
      <div className="container-inner">
        <h2 className="font-[var(--font-display)] text-[var(--text-h2)] font-semibold text-[var(--text-primary)] tracking-tight leading-[var(--leading-tight)] text-center mb-10 sm:mb-12">
          {data.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {data.items.map((item) => (
            <TestimonialCard key={item.name} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
