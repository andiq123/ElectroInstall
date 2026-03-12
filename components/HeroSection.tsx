"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { BUSINESS_INFO, PHONE_HREF } from "@/lib/constants";

interface HeroSectionProps {
  onOpenModal?: () => void;
}

function renderHeadline(line: string, highlight: string) {
  const i = line.indexOf(highlight);
  if (i === -1) return line;
  return (
    <>
      {line.slice(0, i)}
      <span className="text-[var(--accent)]">{highlight}</span>
      {line.slice(i + highlight.length)}
    </>
  );
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const { t } = useLanguage();
  const hero = t.hero as {
    headline_1?: string;
    highlight_1?: string;
    headline_2?: string;
    highlight_2?: string;
    subhead: string;
    cta: string;
  };

  const hasSplit = hero.headline_1 && hero.highlight_1 && hero.headline_2 && hero.highlight_2;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative bg-white border-b border-black/[0.06]"
    >
      <div className="sr-only">
        <h1>ElectroInstall – Electrician Chișinău. Reparații și instalații electrice.</h1>
        <p>Preț corect înainte de lucrare. Lucrări conform normelor. Disponibil pentru urgențe 24/7.</p>
      </div>

      <div className="container-inner py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[70vh] lg:min-h-[75vh]">
          <div className="order-2 lg:order-1 flex flex-col justify-center animate-fadeInUp">
            <h1
              id="hero-heading"
              className="font-[var(--font-display)] text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] font-bold text-[var(--text-primary)] leading-[1.1] tracking-tight mb-6"
            >
              {hasSplit ? (
                <>
                  <span className="block">{renderHeadline(hero.headline_1!, hero.highlight_1!)}</span>
                  <span className="block mt-1">{renderHeadline(hero.headline_2!, hero.highlight_2!)}</span>
                </>
              ) : (
                (t.hero as { headline: string }).headline
              )}
            </h1>
            <p className="text-[1.125rem] text-[var(--text-secondary)] leading-[1.65] max-w-xl mb-8">
              {hero.subhead}
            </p>
            <button
              type="button"
              onClick={onOpenModal}
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 py-3.5 rounded-lg text-[1rem] font-semibold text-white bg-[var(--text-primary)] hover:opacity-90 transition-opacity w-fit"
            >
              {hero.cta}
              <ArrowRightIcon size="sm" />
            </button>
            <p className="mt-6 text-[0.8125rem] sm:text-[var(--text-caption)] text-[var(--text-muted)] tracking-[0.02em]">
              <span className="sr-only">{t.common.call_now}. </span>
              <a
                href={PHONE_HREF}
                className="text-[var(--text-tertiary)] hover:text-[var(--accent-dark)] transition-colors"
              >
                {BUSINESS_INFO.phone}
              </a>
            </p>
          </div>

          <div className="order-1 lg:order-2 relative w-full aspect-[4/3] max-h-[40vh] sm:max-h-[44vh] lg:max-h-[50vh] animate-fadeInUp delay-200">
            <div
              className="absolute inset-0 overflow-hidden bg-[var(--bg-base)] shadow-[var(--shadow-md)]"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 88%, 14% 0)",
                borderRadius: "1rem",
              }}
            >
              <Image
                src="/male-elictirican-at-the-panel.jpg"
                alt="Electrician la panoul de distribuție – ElectroInstall Chișinău"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="object-cover object-center contrast-[1.05] saturate-[0.97]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
