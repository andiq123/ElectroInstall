"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { BUSINESS_INFO, PHONE_HREF, SITE_URL } from "@/lib/constants";
import { homeUi } from "@/lib/homeUi";
import type { ServicePageContent } from "@/lib/service-pages";
import { cn } from "@/lib/utils";

type ServiceLandingPageProps = {
  page: ServicePageContent;
};

export default function ServiceLandingPage({ page }: ServiceLandingPageProps) {
  const canonicalUrl = `${SITE_URL.replace(/\/$/, "")}/${page.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Acasă", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: page.title, item: canonicalUrl },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.description,
    serviceType: page.title,
    provider: {
      "@type": "LocalBusiness",
      name: "ElectroInstall",
      telephone: BUSINESS_INFO.phone.replace(/\s/g, ""),
      areaServed: "Chișinău, Moldova",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: "Chișinău",
    },
    url: canonicalUrl,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Navbar />
      <main id="main-content" className={homeUi.pageMain}>
        <JsonLd data={breadcrumbSchema} />
        <JsonLd data={serviceSchema} />
        <JsonLd data={faqSchema} />

        <section className="relative overflow-hidden border-b border-black/[0.06] bg-[var(--bg-section-alt)] pt-24 pb-14 sm:pt-28 sm:pb-18 lg:pt-32 lg:pb-20">
          <div
            className="absolute inset-0 opacity-100"
            style={{ backgroundImage: "var(--gradient-hero-glow)" }}
            aria-hidden
          />
          <div className={cn(homeUi.containerNarrow, "relative z-10")}>
            <span className={homeUi.kicker}>{page.kicker}</span>
            <h1 className={cn(homeUi.displayTitle, "max-w-3xl text-balance")}>
              {page.title}
            </h1>
            <p className={cn(homeUi.bodyLead, "mt-6 max-w-3xl")}>{page.lede}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href={PHONE_HREF} className={homeUi.pillPrimarySm}>
                Sună: {BUSINESS_INFO.phoneDisplay}
              </a>
              <Link href="/#contact" className={cn(homeUi.pillSecondary, "px-6 py-3 text-sm")}>
                Cere programare
              </Link>
            </div>
          </div>
        </section>

        <section className={cn(homeUi.section, "bg-[var(--page-bg)]")}>
          <div className={cn(homeUi.containerNarrow, "space-y-16 sm:space-y-20")}>
            <div className="space-y-4">
              {page.intro.map((paragraph) => (
                <p key={paragraph} className={homeUi.bodyLead}>
                  {paragraph}
                </p>
              ))}
            </div>

            <section>
              <h2 className={cn(homeUi.cardTitleLg, "mb-5")}>Ce include serviciul</h2>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {page.benefits.map((benefit) => (
                  <li key={benefit} className={cn(homeUi.cardSurface, "px-5 py-4")}>
                    <p className={homeUi.bodyLead}>{benefit}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className={cn(homeUi.cardTitleLg, "mb-5")}>Situații frecvente</h2>
              <div className={cn(homeUi.cardSurface, "overflow-hidden")}>
                <table className="min-w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-black/[0.06] bg-[var(--bg-section-alt)] text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                      <th className="px-5 py-4 font-bold sm:px-6">Lucrare</th>
                      <th className="px-5 py-4 font-bold sm:px-6">Detalii</th>
                    </tr>
                  </thead>
                  <tbody>
                    {page.detailRows.map((row) => (
                      <tr key={row.service} className="border-b border-black/[0.05] align-top last:border-b-0">
                        <td className="px-5 py-4 sm:px-6">
                          <p className={cn(homeUi.cardTitle, "!text-base")}>{row.service}</p>
                          <p className={cn(homeUi.bodySm, "mt-1")}>{row.note}</p>
                        </td>
                        <td className="px-5 py-4 font-display text-base font-bold text-[var(--accent-dark)] sm:px-6">
                          {row.detail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className={cn(homeUi.cardTitleLg, "mb-5")}>Cum lucrăm</h2>
              <div className="space-y-4">
                {page.process.map((step, index) => (
                  <article key={step.title} className={cn(homeUi.cardSurface, "flex gap-4 px-5 py-5 sm:px-6")}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-muted)] font-display text-sm font-bold text-[var(--accent-dark)]">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className={cn(homeUi.cardTitle, "mb-2 text-base")}>{step.title}</h3>
                      <p className={homeUi.bodyLead}>{step.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className={cn(homeUi.cardTitleLg, "mb-5")}>Întrebări frecvente</h2>
              <div className="space-y-4">
                {page.faqs.map((faq) => (
                  <article key={faq.question} className={cn(homeUi.cardSurface, "px-5 py-5 sm:px-6")}>
                    <h3 className={cn(homeUi.cardTitle, "mb-2 text-base")}>{faq.question}</h3>
                    <p className={homeUi.bodyLead}>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={cn(homeUi.cardSurface, "p-6 sm:p-8")}>
              <h2 className={cn(homeUi.cardTitleLg, "mb-4")}>Pagini conexe</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {page.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl bg-[var(--bg-section-alt)] px-4 py-4 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-amber-50"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-2xl bg-[var(--primary)] p-8 text-white sm:p-10">
              <h2 className={cn(homeUi.displayTitleOnInverse, "mb-4 !text-3xl sm:!text-4xl")}>
                Ai nevoie de o verificare rapidă?
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                Sună la {BUSINESS_INFO.phoneDisplay} sau lasă un mesaj din
                formularul de pe homepage. Spune ce problemă ai, în ce sector
                ești și dacă este o lucrare urgentă.
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <a href={PHONE_HREF} className={homeUi.pillPrimarySm}>
                  Sună acum
                </a>
                <Link href="/#contact" className={cn(homeUi.pillSecondaryOnInverse, "px-6 py-3 text-sm")}>
                  Trimite mesaj
                </Link>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
