"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BUSINESS_INFO } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";

export default function ServiciiChisinau() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 bg-[var(--bg-base)]">
        <div className="container px-6 sm:px-8 max-w-4xl mx-auto">
          <header className="mb-16">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter italic uppercase text-[var(--text-primary)] leading-tight">
              {t.legal.servicii_chisinau.title_part1} <br />
              <span className="text-[var(--accent)] not-italic">{BUSINESS_INFO.location}</span>
            </h1>
            <div className="h-1.5 w-20 bg-[var(--accent)] mt-8 rounded-full" />
          </header>

          <div className="prose prose-invert prose-lg max-w-none text-[var(--text-secondary)] space-y-12">
            <section>
              <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight italic">{t.legal.servicii_chisinau.coverage_title}</h2>
              <p className="mt-4 font-medium leading-relaxed">
                {t.legal.servicii_chisinau.coverage_text1}
                <span className="text-[var(--text-primary)] font-bold"> {t.legal.servicii_chisinau.sectors}</span>
              </p>
              <p className="mt-4 font-medium leading-relaxed">
                {t.legal.servicii_chisinau.coverage_text2}
                <span className="text-[var(--text-primary)] font-bold italic"> {t.legal.servicii_chisinau.suburbs}</span>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight italic">{t.legal.servicii_chisinau.why_local_title}</h2>
              <ul className="list-disc pl-6 mt-6 space-y-4 font-medium leading-relaxed">
                {t.legal.servicii_chisinau.why_local_reasons.map((reason: string, i: number) => (
                  <li key={i}>{reason}</li>
                ))}
              </ul>
            </section>

            <section className="bg-[var(--bg-elevated)] p-8 rounded-[var(--radius-3xl)] border border-[var(--border-glass)]">
              <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight italic mb-6">{t.legal.servicii_chisinau.urgent_title}</h2>
              <p className="font-medium mb-8 leading-relaxed">
                {t.legal.servicii_chisinau.urgent_text}
              </p>
              <a 
                href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center px-10 py-4 bg-[var(--accent)] text-black rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform"
              >
                {t.common.call_now} {BUSINESS_INFO.phone}
              </a>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
