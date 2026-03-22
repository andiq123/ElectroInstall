"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { homeUi } from "@/lib/homeUi";
import { staggerMs } from "@/lib/stagger";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

const SERVICE_KEYS = ["installation", "repair", "emergency"] as const;
const IMAGES = [
  "/electric-panel-photo.jpg",
  "/electric-panel-being-tested.jpg",
  "/male-elictirican-at-the-panel.jpg",
] as const;

export default function ServicesShowcaseSection() {
  const { t } = useLanguage();
  const services = t.services as {
    title_part1: string;
    title_part2: string;
    subtitle: string;
    showcase_explore: string;
    categories: Record<
      (typeof SERVICE_KEYS)[number],
      { title: string; subtitle: string }
    >;
  };

  const explore = services.showcase_explore;
  const detailHref = "/servicii-chisinau";

  return (
    <section
      id="servicii"
      className={cn(homeUi.section, "overflow-hidden bg-[var(--bg-base)]")}
      aria-labelledby="servicii-heading"
    >
      <div className={homeUi.container}>
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
          <Reveal variant="right" className="max-w-sm shrink-0 md:text-end" delay={80}>
            <p className={cn(homeUi.bodyLead, "mb-5 sm:mb-6")}>{services.subtitle}</p>
            <Link href={detailHref} className={cn(homeUi.linkAccent, "group")}>
              {explore}
              <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </Link>
          </Reveal>
        </div>

        <div className={cn("grid grid-cols-1 md:grid-cols-3", homeUi.gridGapWide)}>
          {SERVICE_KEYS.map((key, index) => {
            const cat = services.categories[key];
            const img = IMAGES[index];
            const offset = index === 1 ? "md:translate-y-12" : "";
            return (
              <Reveal key={key} variant="up-lg" delay={staggerMs(index, 110, 120)} className={offset}>
                <article className="group h-full">
                <div className="relative overflow-hidden asymmetric-image aspect-[3/4] mb-6 sm:mb-8 bg-[var(--bg-section-alt)]">
                  <Image
                    src={img}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className={cn(homeUi.cardTitleLg, "mb-2")}>{cat.title}</h3>
                <p className={homeUi.bodySm}>{cat.subtitle}</p>
              </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
