"use client";

import { Fragment } from "react";
import { ArrowRight, BadgeCheck, Cable, Timer } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { homeUi } from "@/lib/homeUi";
import { staggerMs } from "@/lib/stagger";
import { cn } from "@/lib/utils";
import { BoltIcon } from "@/components/ui/Icons";
import Reveal from "@/components/Reveal";

type BentoCard = { title: string; body: string };
type Stat = { value: string; label: string };

const bentoShell = (...extra: (string | undefined | false)[]) =>
  cn(
    "flex h-full flex-col justify-between p-8 sm:p-10",
    homeUi.cardSurface,
    ...extra
  );

export default function FeaturesSection() {
  const { t } = useLanguage();
  const home = t.home as {
    features_title: string;
    features_subtitle: string;
    bento_cards: BentoCard[];
    stats: Stat[];
  };

  const cards = home.bento_cards ?? [];
  const stats = home.stats ?? [];
  const icons = [BadgeCheck, Timer, Cable] as const;
  const thirdCard = cards[2];
  const ThirdIcon = icons[2] ?? BadgeCheck;

  return (
    <section
      id="avantaje"
      className={cn(homeUi.section, "bg-[var(--bg-section-alt)]")}
      aria-labelledby="avantaje-heading"
    >
      <div className={homeUi.container}>
        <div className={cn("grid grid-cols-1 md:grid-cols-4", homeUi.gridGap)}>
          <Reveal variant="blur" className="md:col-span-2">
            <div
              className={cn(
                homeUi.cardSurface,
                "group flex h-full flex-col justify-between p-8 sm:p-12 asymmetric-image"
              )}
            >
              <div>
                <BoltIcon
                  size="lg"
                  className="!h-12 !w-12 text-[var(--accent)] sm:!h-14 sm:!w-14 mb-6 sm:mb-8"
                />
                <h2
                  id="avantaje-heading"
                  className={cn(homeUi.titleLeadCard, "mb-4 sm:mb-6")}
                >
                  {home.features_title}
                </h2>
                <p className={homeUi.bodyLead}>{home.features_subtitle}</p>
              </div>
              <div
                className="mt-8 text-[var(--accent)] transition-transform group-hover:translate-x-1 sm:mt-12"
                aria-hidden
              >
                <ArrowRight className="h-8 w-8" strokeWidth={2} />
              </div>
            </div>
          </Reveal>

          {cards.slice(0, 2).map((card, i) => {
            const Icon = icons[i] ?? BadgeCheck;
            const accent = i === 1;
            return (
              <Reveal key={card.title} variant="up" delay={staggerMs(i, 95, 90)}>
                <div
                  className={bentoShell(
                    accent ? "bg-[var(--accent-light)]" : "bg-[var(--bg-base)]"
                  )}
                >
                  <Icon
                    className={cn(
                      "mb-5 h-9 w-9 sm:mb-6 sm:h-10 sm:w-10",
                      accent ? "text-[var(--text-on-accent)]" : "text-[var(--accent)]"
                    )}
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <div>
                    <h3
                      className={cn(
                        homeUi.cardTitle,
                        "mb-2",
                        accent ? "text-[var(--text-on-accent)]" : undefined
                      )}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={cn(
                        homeUi.bodySm,
                        accent ? "text-[var(--text-on-accent)]/85" : undefined
                      )}
                    >
                      {card.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}

          {thirdCard ? (
            <div
              className={cn(
                "grid grid-cols-1 md:col-span-4 md:grid-cols-4",
                homeUi.gridGap
              )}
            >
              <Reveal variant="up" delay={staggerMs(2, 95, 90)} className="md:col-span-1">
                <div className={bentoShell("bg-[var(--bg-base)]")}>
                  <ThirdIcon
                    className="mb-5 h-9 w-9 text-[var(--accent)] sm:mb-6 sm:h-10 sm:w-10"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <div>
                    <h3 className={cn(homeUi.cardTitle, "mb-2")}>{thirdCard.title}</h3>
                    <p className={homeUi.bodySm}>{thirdCard.body}</p>
                  </div>
                </div>
              </Reveal>
              <Reveal variant="scale" delay={380} className="md:col-span-3">
                <div
                  className={cn(
                    homeUi.cardSurface,
                    "flex h-full min-h-[11rem] flex-col justify-center px-4 py-8 sm:px-8 sm:py-10"
                  )}
                >
                  <div
                    className="flex flex-col items-stretch gap-6 sm:flex-row sm:items-center sm:justify-evenly sm:gap-0"
                    role="list"
                    aria-label="Statistici"
                  >
                    {stats.map((s, idx) => (
                      <Fragment key={s.label}>
                        {idx > 0 ? (
                          <div className="hidden h-12 w-px shrink-0 bg-zinc-200 sm:block" aria-hidden />
                        ) : null}
                        <div
                          role="listitem"
                          className="flex flex-1 flex-col items-center justify-center text-center"
                        >
                          <p className={homeUi.statValue}>{s.value}</p>
                          <p className={homeUi.statLabel}>{s.label}</p>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          ) : (
            <Reveal variant="scale" className="md:col-span-4" delay={280}>
              <div
                className={cn(homeUi.cardSurface, "px-6 py-10 sm:px-10 sm:py-12")}
              >
                <div
                  className="flex flex-col items-center gap-8 sm:flex-row sm:justify-evenly sm:gap-0"
                  role="list"
                  aria-label="Statistici"
                >
                  {stats.map((s, idx) => (
                    <Fragment key={s.label}>
                      {idx > 0 ? (
                        <div className="hidden h-12 w-px shrink-0 bg-zinc-200 sm:block" aria-hidden />
                      ) : null}
                      <div role="listitem" className="flex flex-col items-center text-center">
                        <p className={homeUi.statValue}>{s.value}</p>
                        <p className={homeUi.statLabel}>{s.label}</p>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
