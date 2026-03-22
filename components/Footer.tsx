"use client";

import { BUSINESS_INFO, PHONE_HREF } from "@/lib/constants";
import Logo from "@/components/ui/Logo";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t border-black/[0.06] bg-[var(--page-bg)] px-6 py-10 text-sm tracking-wide sm:px-8 sm:py-12"
      role="contentinfo"
    >
      <Reveal variant="up-sm" className="block w-full" threshold={0.15}>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center shrink-0" aria-label="ElectroInstall">
          <Logo size="sm" animated={false} showText />
        </Link>
        <nav aria-label="Link-uri footer" className="flex flex-wrap justify-center gap-6 sm:gap-8">
          <Link
            href="/politica-confidentialitate"
            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-medium"
          >
            {t.footer.privacy}
          </Link>
          <Link
            href="/termeni-conditii"
            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-medium"
          >
            {t.footer.terms}
          </Link>
          <Link href="/blog" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-medium">
            Blog
          </Link>
          <Link href="#contact" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-medium">
            {t.nav.contact}
          </Link>
        </nav>
        <div className="text-center md:text-end">
          <a
            href={PHONE_HREF}
            className="block font-display font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors mb-1"
          >
            {BUSINESS_INFO.phone}
          </a>
          <p className="text-[var(--text-muted)] font-semibold text-xs sm:text-sm">
            © {year} ElectroInstall · {BUSINESS_INFO.location}
          </p>
        </div>
      </div>
      </Reveal>
    </footer>
  );
}
