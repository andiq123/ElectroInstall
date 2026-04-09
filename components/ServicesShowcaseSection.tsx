import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { homeUi } from "@/lib/homeUi";
import type { Translations } from "@/lib/locales";
import { staggerMs } from "@/lib/stagger";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

const SERVICE_KEYS = ["installation", "repair", "emergency"] as const;
const SERVICE_HREFS = {
  installation: "/instalatii-electrice-chisinau",
  repair: "/preturi-instalatii-electrice",
  emergency: "/electrician-24-7-chisinau",
} as const;
const IMAGES = [
  "/electric-panel-photo.webp",
  "/electric-panel-being-tested.webp",
  "/male-electrician-at-the-panel.webp",
] as const;

const SERVICE_NUMBERS = ["01", "02", "03"] as const;

type ServicesShowcaseSectionProps = {
  services: Translations["services"] & {
    title_part1: string;
    title_part2: string;
    subtitle: string;
    showcase_explore: string;
    categories: Record<
      (typeof SERVICE_KEYS)[number],
      { title: string; subtitle: string }
    >;
  };
};

export default function ServicesShowcaseSection({
  services,
}: ServicesShowcaseSectionProps) {

  return (
    <section
      id="servicii"
      className={cn(homeUi.section, "overflow-hidden bg-[var(--bg-base)]")}
      aria-labelledby="servicii-heading"
    >
      <div className={homeUi.container}>
        {/* ── Section header ──────────────────────────────── */}
        <div
          className={cn(
            "flex flex-col gap-8 md:flex-row md:items-end md:justify-between",
            homeUi.introBlock
          )}
        >
          <Reveal variant="left" className="max-w-2xl">
            <h2 id="servicii-heading" className={homeUi.displayTitle}>
              {services.title_part1}{" "}
              <span className="text-[var(--accent)]">{services.title_part2}</span>
            </h2>
          </Reveal>
          <Reveal
            variant="right"
            className="max-w-sm shrink-0 md:text-end"
            delay={80}
          >
            <p className={cn(homeUi.bodyLead, "mb-5 sm:mb-6")}>
              {services.subtitle}
            </p>
            <Link
              href="/servicii-chisinau"
              className={cn(homeUi.linkAccent, "group inline-flex items-center gap-1.5")}
            >
              {services.showcase_explore}
              <ChevronRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2.5}
                aria-hidden
              />
            </Link>
          </Reveal>
        </div>

        {/* ── Service cards ───────────────────────────────── */}
        <div className={cn("grid grid-cols-1 md:grid-cols-3", homeUi.gridGapWide)}>
          {SERVICE_KEYS.map((key, index) => {
            const cat = services.categories[key];
            const img = IMAGES[index];
            const num = SERVICE_NUMBERS[index];
            const offset = index === 1 ? "md:translate-y-12" : "";

            return (
              <Reveal
                key={key}
                variant="up-lg"
                delay={staggerMs(index, 110, 120)}
                className={offset}
              >
                <Link href={SERVICE_HREFS[key]} className="group block h-full">
                  {/* Image with overlays */}
                  <div className="relative overflow-hidden rounded-t-2xl rounded-br-none rounded-bl-2xl aspect-[3/4] mb-6 sm:mb-8 bg-[var(--bg-section-alt)]">
                    <Image
                      src={img}
                      alt={cat.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={65}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Bottom gradient scrim */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                      aria-hidden
                    />

                    {/* Number label — top-left */}
                    <span
                      className="absolute top-4 left-4 font-display text-[0.65rem] font-black tracking-[0.22em] uppercase text-white/60 sm:top-5 sm:left-5"
                      aria-hidden
                    >
                      {num}
                    </span>

                    {/* Category title inside image at bottom */}
                    <p className="absolute bottom-4 left-4 right-4 font-display text-base font-bold text-white leading-snug sm:bottom-5 sm:left-5 sm:right-5 sm:text-lg">
                      {cat.title}
                    </p>
                  </div>

                  {/* Below-image text */}
                  <p className={homeUi.bodySm}>{cat.subtitle}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-bold text-[var(--accent-dark)]">
                    Vezi detalii
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
