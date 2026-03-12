"use client";

import { BUSINESS_INFO, PHONE_HREF } from "@/lib/constants";
import Logo from "@/components/ui/Logo";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/[0.06] bg-[var(--bg-base)]" role="contentinfo">
      <div className="w-full container-inner py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div className="flex items-center gap-6">
            <Logo size="sm" animated={false} showText={true} />
            <a href={PHONE_HREF} className="text-[var(--text-small)] font-semibold text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors">
              {BUSINESS_INFO.phone}
            </a>
          </div>
          <nav aria-label="Link-uri footer" className="flex flex-wrap items-center gap-6 text-[var(--text-small)]">
            <a href="#contact" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t.nav.contact}</a>
            <a href="/blog" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Blog</a>
            <a href="/politica-confidentialitate" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">{t.footer.privacy}</a>
            <a href="/termeni-conditii" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">{t.footer.terms}</a>
          </nav>
        </div>
        <p className="mt-8 pt-8 border-t border-black/[0.06] text-[var(--text-small)] text-[var(--text-muted)]">
          © {year} ElectroInstall · {BUSINESS_INFO.location}
        </p>
      </div>
    </footer>
  );
}
