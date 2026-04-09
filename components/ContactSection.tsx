"use client";

import { BUSINESS_INFO, PHONE_HREF } from "@/lib/constants";
import { homeUi } from "@/lib/homeUi";
import type { Translations } from "@/lib/locales";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

interface ContactSectionProps {
  common: Translations["common"];
  contact: Translations["contact"];
  onOpenModal?: () => void;
}

export default function ContactSection({
  common,
  contact,
  onOpenModal,
}: ContactSectionProps) {
  return (
    <section
      id="contact"
      className={cn(homeUi.section, "bg-[var(--bg-section-alt)]")}
    >
      <div className={homeUi.container}>
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--primary)] p-10 text-[var(--text-inverted)] sm:p-16 lg:p-20">

            {/* ── Background layers ──────────────────────────── */}
            {/* Radial amber glow — right */}
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-20"
              style={{
                background:
                  "radial-gradient(circle, #ffc107 0%, transparent 65%)",
              }}
              aria-hidden
            />
            {/* Radial amber glow — bottom-left */}
            <div
              className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full opacity-10"
              style={{
                background:
                  "radial-gradient(circle, #ffc107 0%, transparent 65%)",
              }}
              aria-hidden
            />
            {/* Noise / grain texture overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                backgroundSize: "220px 220px",
              }}
              aria-hidden
            />

            {/* ── Content ─────────────────────────────────────── */}
            <div className="relative z-10 max-w-2xl">
              <h2
                className={cn(
                  homeUi.displayTitleOnInverse,
                  "mb-6 sm:mb-8"
                )}
              >
                {contact.title_part1}{" "}
                <span className="text-[var(--accent-light)]">
                  {contact.title_part2}
                </span>
              </h2>

              <p
                className={cn(
                  homeUi.bodyLead,
                  "mb-8 !text-zinc-300 sm:mb-12"
                )}
              >
                {contact.subtitle}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                <button
                  type="button"
                  onClick={() => onOpenModal?.()}
                  className={cn(
                    "w-full sm:w-auto touch-manipulation",
                    homeUi.pillPrimary
                  )}
                >
                  {common.cta_primary}
                </button>
                <a
                  href={PHONE_HREF}
                  className={cn(
                    "w-full sm:w-auto",
                    homeUi.pillSecondaryOnInverse
                  )}
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>

              {contact.trust_line && (
                <p className="mt-8 text-sm font-medium text-zinc-500 sm:mt-10">
                  {contact.trust_line}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
