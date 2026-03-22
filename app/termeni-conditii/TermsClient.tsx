"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { homeUi } from "@/lib/homeUi";
import { cn } from "@/lib/utils";

export default function TermsClient() {
  const { t, locale } = useLanguage();

  return (
    <>
      <Navbar />
      <main id="main-content" className={cn(homeUi.pageMain, homeUi.pageContent)}>
        <div className={homeUi.containerNarrow}>
          <header className="mb-12 sm:mb-16">
            <h1 className={cn(homeUi.displayTitle, "text-left")}>
              <span className="block">{t.legal.terms.title_part1}</span>
              <span className="block text-[var(--accent)]">{t.legal.terms.title_part2}</span>
            </h1>
            <div className="mt-6 h-px w-16 bg-[var(--border-decorative)]" aria-hidden />
          </header>

          <div className={cn(homeUi.legalStack)}>
            {t.legal.terms.sections.map(
              (section: { title: string; content: string }, i: number) => (
                <section key={i}>
                  <h2 className={homeUi.legalH2}>{section.title}</h2>
                  <p className={homeUi.legalBody}>{section.content}</p>
                </section>
              )
            )}

            <section className={homeUi.legalDivider}>
              <p className={homeUi.legalMeta}>
                {t.legal.last_update}:{" "}
                {new Date().toLocaleDateString(locale === "ro" ? "ro-RO" : "ru-RU")}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
