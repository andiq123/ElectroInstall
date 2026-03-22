"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PhoneIcon } from "@/components/ui/Icons";
import { BUSINESS_INFO, PHONE_HREF } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { homeUi } from "@/lib/homeUi";
import { cn } from "@/lib/utils";

const PHONE_DISPLAY = BUSINESS_INFO.phoneDisplay;

export default function ServiciiChisinauClient() {
  const { t } = useLanguage();
  const data = t.legal.servicii_chisinau;
  const servicesList = Array.isArray(data.services_list) ? (data.services_list as string[]) : [];
  const whyReasons = Array.isArray(data.why_local_reasons) ? data.why_local_reasons : [];

  return (
    <>
      <Navbar />
      <main id="main-content" className={homeUi.pageMain}>
        <header className="relative overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
          <div className="absolute inset-0 bg-[var(--bg-section-alt)]" aria-hidden />
          <div
            className="absolute inset-0 opacity-100"
            style={{ backgroundImage: "var(--gradient-hero-glow)" }}
            aria-hidden
          />
          <div className={cn(homeUi.containerNarrow, "relative z-10 text-center")}>
            <p className={cn(homeUi.kicker, "w-full text-center")}>{data.title_part1}</p>
            <h1 className={cn(homeUi.titleLeadCard, "text-balance")}>{BUSINESS_INFO.location}</h1>
            <p className="mt-4">
              <a
                href={PHONE_HREF}
                className={cn(homeUi.cardTitleLg, "text-[var(--text-primary)] transition-colors hover:text-[var(--accent-dark)]")}
                aria-label={`${t.common.call_now} ${PHONE_DISPLAY}`}
              >
                {PHONE_DISPLAY}
              </a>
            </p>
            {data.intro ? <p className={cn(homeUi.bodyLead, "mx-auto mt-6 max-w-2xl text-balance")}>{data.intro}</p> : null}
            <Link href="/#contact" className={cn(homeUi.pillPrimarySm, "mt-8 inline-flex gap-2")}>
              {t.common.cta_primary}
            </Link>
          </div>
        </header>

        <div className={cn(homeUi.containerNarrow, homeUi.gridGap, "flex flex-col py-16 sm:py-20")}>
          <section className={cn(homeUi.gridGap, "flex flex-col")}>
            <h2 className={cn(homeUi.cardTitle, "text-xl sm:text-2xl")}>{data.coverage_title}</h2>
            <div className={cn(homeUi.gridGap, "flex flex-col text-[var(--text-secondary)]")}>
              <p className={homeUi.bodyLead}>
                {data.coverage_text1}
                <span className="font-semibold text-[var(--text-primary)]"> {data.sectors}</span>
              </p>
              <p className={homeUi.bodyLead}>
                {data.coverage_text2}
                <span className="font-semibold text-[var(--text-primary)]"> {data.suburbs}</span>
              </p>
            </div>
          </section>

          {data.services_list_title && servicesList.length > 0 ? (
            <section className={cn(homeUi.gridGap, "flex flex-col")}>
              <h2 className={cn(homeUi.cardTitle, "text-xl sm:text-2xl")}>{data.services_list_title}</h2>
              <ul className={cn(homeUi.gridGap, "grid sm:grid-cols-2")}>
                {servicesList.map((item, i) => (
                  <li
                    key={i}
                    className={cn(
                      homeUi.cardSurface,
                      "flex items-start gap-3 !bg-[var(--bg-elevated)] py-3 ps-4 pe-4"
                    )}
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                      aria-hidden
                    />
                    <span className={homeUi.bodySm}>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {data.why_local_title && whyReasons.length > 0 ? (
            <section className={cn(homeUi.gridGap, "flex flex-col")}>
              <h2 className={cn(homeUi.cardTitle, "text-xl sm:text-2xl")}>{data.why_local_title}</h2>
              <ul className={homeUi.gridGap}>
                {whyReasons.map((reason, i) => (
                  <li
                    key={i}
                    className={cn(
                      homeUi.cardSurface,
                      "flex items-start gap-4 !bg-[var(--bg-elevated)] p-5"
                    )}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-muted)] font-display text-sm font-bold text-[var(--accent)]">
                      {i + 1}
                    </span>
                    <span className={homeUi.bodyLead}>{reason}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className={cn(homeUi.cardSurface, "mx-auto max-w-2xl text-center")}>
            <h2 className={cn(homeUi.cardTitle, "mb-4 text-xl sm:text-2xl")}>{data.urgent_title}</h2>
            {data.urgent_text ? (
              <p className={cn(homeUi.bodyLead, "mx-auto mb-8 max-w-xl")}>{data.urgent_text}</p>
            ) : null}
            <a
              href={PHONE_HREF}
              className={cn(homeUi.pillPrimarySm, "inline-flex items-center gap-2")}
              aria-label={`${t.common.call_now} ${PHONE_DISPLAY}`}
            >
              <PhoneIcon size="sm" className="shrink-0" aria-hidden />
              {t.common.call_now} · {PHONE_DISPLAY}
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
