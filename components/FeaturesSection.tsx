import { Fragment } from "react";
import { ArrowRight, BadgeCheck, Cable, Timer } from "lucide-react";
import { homeUi } from "@/lib/homeUi";
import type { Translations } from "@/lib/locales";
import { staggerMs } from "@/lib/stagger";
import { cn } from "@/lib/utils";
import { BoltIcon } from "@/components/ui/Icons";
import Reveal from "@/components/Reveal";

type BentoCard = { title: string; body: string };
type Stat = { value: string; label: string };

type FeaturesSectionProps = {
  home: Translations["home"] & {
    bento_cards: BentoCard[];
    stats: Stat[];
  };
};

export default function FeaturesSection({ home }: FeaturesSectionProps) {

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

          {/* ── Lead card ─────────────────────────────────────── */}
          <Reveal variant="blur" className="md:col-span-2">
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-black/[0.05] bg-white p-8 shadow-sm sm:p-12">
              {/* Ambient glow orb */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-[0.07]"
                style={{ background: "radial-gradient(circle, #ffc107 0%, transparent 70%)" }}
                aria-hidden
              />
              <div>
                {/* Icon with amber ring */}
                <div className="mb-6 sm:mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 shadow-[0_0_0_6px_rgba(255,193,7,0.10)] ring-1 ring-amber-200/60">
                  <BoltIcon size="lg" className="!h-7 !w-7 text-[var(--accent)]" />
                </div>
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
                <ArrowRight className="h-7 w-7" strokeWidth={2} />
              </div>
            </div>
          </Reveal>

          {/* ── Feature cards ─────────────────────────────────── */}
          {cards.slice(0, 2).map((card, i) => {
            const Icon = icons[i] ?? BadgeCheck;
            const isAccent = i === 1;
            return (
              <Reveal key={card.title} variant="up" delay={staggerMs(i, 95, 90)}>
                <div
                  className={cn(
                    "flex h-full flex-col justify-between rounded-2xl border p-8 sm:p-10",
                    isAccent
                      ? "border-amber-300/40 bg-gradient-to-br from-amber-400 to-[#ffcd38] shadow-[0_8px_32px_-8px_rgba(255,193,7,0.45)]"
                      : "border-black/[0.05] bg-white shadow-sm"
                  )}
                >
                  <div
                    className={cn(
                      "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl sm:mb-6",
                      isAccent
                        ? "bg-black/10 ring-1 ring-black/10"
                        : "bg-amber-50 shadow-[0_0_0_5px_rgba(255,193,7,0.08)] ring-1 ring-amber-200/60"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5 sm:h-6 sm:w-6",
                        isAccent ? "text-zinc-900" : "text-[var(--accent)]"
                      )}
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </div>
                  <div>
                    <h3
                      className={cn(
                        homeUi.cardTitle,
                        "mb-2",
                        isAccent ? "text-zinc-900" : undefined
                      )}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={cn(
                        homeUi.bodySm,
                        isAccent ? "text-zinc-800/80" : undefined
                      )}
                    >
                      {card.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}

          {/* ── Third card + stats row ─────────────────────────── */}
          {thirdCard ? (
            <div
              className={cn(
                "grid grid-cols-1 md:col-span-4 md:grid-cols-4",
                homeUi.gridGap
              )}
            >
              <Reveal
                variant="up"
                delay={staggerMs(2, 95, 90)}
                className="md:col-span-1"
              >
                <div className="flex h-full flex-col justify-between rounded-2xl border border-black/[0.05] bg-white p-8 shadow-sm sm:p-10">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 shadow-[0_0_0_5px_rgba(255,193,7,0.08)] ring-1 ring-amber-200/60 sm:mb-6">
                    <ThirdIcon
                      className="h-5 w-5 text-[var(--accent)] sm:h-6 sm:w-6"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </div>
                  <div>
                    <h3 className={cn(homeUi.cardTitle, "mb-2")}>
                      {thirdCard.title}
                    </h3>
                    <p className={homeUi.bodySm}>{thirdCard.body}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="scale" delay={380} className="md:col-span-3">
                <div className="flex h-full min-h-[11rem] flex-col justify-center rounded-2xl border border-black/[0.05] bg-white px-4 py-8 shadow-sm sm:px-8 sm:py-10">
                  <div
                    className="flex flex-col items-stretch gap-6 sm:flex-row sm:items-center sm:justify-evenly sm:gap-0"
                    role="list"
                    aria-label="Statistici"
                  >
                    {stats.map((s, idx) => (
                      <Fragment key={s.label}>
                        {idx > 0 && (
                          <div
                            className="hidden h-12 w-px shrink-0 bg-zinc-100 sm:block"
                            aria-hidden
                          />
                        )}
                        <div
                          role="listitem"
                          className="flex flex-1 flex-col items-center justify-center text-center"
                        >
                          <p
                            className="font-display text-3xl font-black tabular-nums leading-none sm:text-4xl md:text-[2.5rem]"
                            style={{
                              background:
                                "linear-gradient(135deg, #785900 0%, #ffc107 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            {s.value}
                          </p>
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
              <div className="rounded-2xl border border-black/[0.05] bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-12">
                <div
                  className="flex flex-col items-center gap-8 sm:flex-row sm:justify-evenly sm:gap-0"
                  role="list"
                  aria-label="Statistici"
                >
                  {stats.map((s, idx) => (
                    <Fragment key={s.label}>
                      {idx > 0 && (
                        <div
                          className="hidden h-12 w-px shrink-0 bg-zinc-100 sm:block"
                          aria-hidden
                        />
                      )}
                      <div
                        role="listitem"
                        className="flex flex-col items-center text-center"
                      >
                        <p
                          className="font-display text-3xl font-black tabular-nums leading-none sm:text-4xl md:text-[2.5rem]"
                          style={{
                            background:
                              "linear-gradient(135deg, #785900 0%, #ffc107 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {s.value}
                        </p>
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
