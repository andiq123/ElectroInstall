"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BUSINESS_INFO, CTA_ACCENT_CLASS, PHONE_HREF } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";

const PHONE_DISPLAY = BUSINESS_INFO.phoneDisplay;

export default function ServiciiChisinauClient() {
  const { t } = useLanguage();
  const data = t.legal.servicii_chisinau;
  const servicesList = Array.isArray(data.services_list) ? (data.services_list as string[]) : [];
  const whyReasons = Array.isArray(data.why_local_reasons) ? data.why_local_reasons : [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--bg-base)]">
        <header className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[var(--bg-section-alt)]" aria-hidden />
          <div className="absolute inset-0 opacity-100" style={{ backgroundImage: "var(--gradient-hero-glow)" }} aria-hidden />
          <div className="container relative z-10 px-6 sm:px-8 max-w-4xl mx-auto text-center">
            <p className="text-sm font-semibold tracking-widest text-[var(--accent)] uppercase mb-4">
              {data.title_part1}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] tracking-tight leading-tight">
              {BUSINESS_INFO.location}
            </h1>
            <p className="mt-4 text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
              <a href={PHONE_HREF} className="hover:text-[var(--accent-dark)] transition-colors" aria-label={t.common.call_now}>
                Sună <span className="font-bold tracking-tight">{PHONE_DISPLAY}</span>
              </a>
            </p>
            {data.intro && (
              <p className="mt-6 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                {data.intro}
              </p>
            )}
            <Link
              href="/#contact"
              className={`inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full font-semibold text-sm ${CTA_ACCENT_CLASS}`}
            >
              {t.common.cta_primary}
            </Link>
          </div>
        </header>

        <div className="container px-6 sm:px-8 max-w-4xl mx-auto py-16 sm:py-20 space-y-20">
          <section>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight mb-6">
              {data.coverage_title}
            </h2>
            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <p>
                {data.coverage_text1}
                <span className="text-[var(--text-primary)] font-semibold"> {data.sectors}</span>
              </p>
              <p>
                {data.coverage_text2}
                <span className="text-[var(--text-primary)] font-semibold"> {data.suburbs}</span>
              </p>
            </div>
          </section>

          {data.services_list_title && servicesList.length > 0 && (
            <section>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight mb-8">
                {data.services_list_title}
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {servicesList.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 py-3 px-4 rounded-[var(--radius-xl)] bg-[var(--bg-elevated)] border border-[var(--border-glass)] text-[var(--text-secondary)]"
                  >
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {data.why_local_title && whyReasons.length > 0 && (
            <section>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight mb-8">
                {data.why_local_title}
              </h2>
              <ul className="space-y-4">
                {whyReasons.map((reason, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-[var(--radius-xl)] border border-[var(--border-glass)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] leading-relaxed"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--accent-muted)] text-[var(--accent)] font-display font-bold text-sm flex items-center justify-center">
                      {i + 1}
                    </span>
                    {reason}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="glass-panel p-8 sm:p-10 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight mb-4">
              {data.urgent_title}
            </h2>
            {data.urgent_text && (
              <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-8 leading-relaxed">
                {data.urgent_text}
              </p>
            )}
            <a
              href={PHONE_HREF}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm ${CTA_ACCENT_CLASS}`}
              aria-label={t.common.call_now}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2.5}>
                <path d="M3 5.5A2.5 2.5 0 015.5 3h1.5a2.5 2.5 0 012.3 1.5l1.0 2.2a2.5 2.5 0 01-.6 2.8l-1.3 1.3a11 11 0 005.4 5.4l1.3-1.3a2.5 2.5 0 012.8-.6l2.2 1.0a2.5 2.5 0 011.5 2.3v1.5a2.5 2.5 0 01-2.5 2.5H18.5a15.5 15.5 0 01-15.5-15.5V5.5z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t.common.call_now} · {PHONE_DISPLAY}
            </a>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
}
