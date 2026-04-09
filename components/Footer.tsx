"use client";

import Link from "next/link";
import { Phone, MapPin, Mail } from "lucide-react";
import { BUSINESS_INFO, PHONE_HREF } from "@/lib/constants";
import Logo from "@/components/ui/Logo";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-[var(--page-bg)]"
      role="contentinfo"
    >
      {/* Amber top hairline */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,193,7,0.4) 30%, rgba(255,193,7,0.4) 70%, transparent)",
        }}
        aria-hidden
      />

      <Reveal variant="up-sm" className="block w-full" threshold={0.12}>
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-16">

          {/* ── 3-column grid ──────────────────────────────── */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-16">

            {/* Col 1: Brand */}
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="inline-flex items-center"
                aria-label="ElectroInstall – Pagina principală"
              >
                <Logo size="sm" animated={false} showText />
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-[var(--text-muted)]">
                Electrician autorizat în Chișinău. Lucrări electrice de calitate,
                preț corect, disponibil 24/7.
              </p>
            </div>

            {/* Col 2: Nav links */}
            <nav
              aria-label="Link-uri footer"
              className="flex flex-col gap-3 md:items-center"
            >
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-1">
                Navigare
              </p>
              {[
                { href: "/blog", label: "Blog" },
                { href: "/servicii-chisinau", label: t.nav.services },
                { href: "#contact", label: t.nav.contact },
                { href: "/politica-confidentialitate", label: t.footer.privacy },
                { href: "/termeni-conditii", label: t.footer.terms },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Col 3: Contact info */}
            <div className="flex flex-col gap-4 md:items-end md:text-end">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-1">
                Contact
              </p>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 font-display text-lg font-bold text-[var(--text-primary)] transition-colors hover:text-[var(--accent)] md:flex-row-reverse"
              >
                <Phone className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
                {BUSINESS_INFO.phone}
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--accent)] md:flex-row-reverse"
              >
                <Mail className="h-4 w-4 shrink-0 text-[var(--accent)]/60" aria-hidden />
                {BUSINESS_INFO.email}
              </a>
              <span className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] md:flex-row-reverse">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--accent)]/60" aria-hidden />
                {BUSINESS_INFO.location}
              </span>
            </div>
          </div>

          {/* ── Bottom bar ─────────────────────────────────── */}
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-black/[0.06] pt-8 sm:flex-row">
            <p className="text-xs text-[var(--text-muted)]">
              &copy; {year} ElectroInstall. Toate drepturile rezervate.
            </p>
            <p className="text-xs text-[var(--text-muted)]/60">
              Chișinău, Moldova
            </p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
