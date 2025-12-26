"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function TermeniConditii() {
  const { t, locale } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 bg-[var(--bg-base)]">
        <div className="container px-6 sm:px-8 max-w-4xl mx-auto">
          <header className="mb-16">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter italic uppercase text-[var(--text-primary)] leading-tight">
              {t.legal.terms.title_part1} <br />
              <span className="text-[var(--accent)] not-italic">{t.legal.terms.title_part2}</span>
            </h1>
            <div className="h-1.5 w-20 bg-[var(--accent)] mt-8 rounded-full" />
          </header>

          <div className="prose prose-invert prose-lg max-w-none text-[var(--text-secondary)] space-y-12">
            {t.legal.terms.sections.map((section: { title: string; content: string }, i: number) => (
              <section key={i}>
                <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight italic">{section.title}</h2>
                <p className="mt-4 font-medium leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}

            <section className="pt-10 border-t border-[var(--border-glass)]">
              <p className="text-sm italic opacity-60">
                {t.legal.last_update}: {new Date().toLocaleDateString(locale === 'ro' ? 'ro-RO' : 'ru-RU')}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
