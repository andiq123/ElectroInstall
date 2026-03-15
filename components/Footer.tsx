"use client";

import { BUSINESS_INFO, PHONE_HREF } from "@/lib/constants";
import Logo from "@/components/ui/Logo";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-base)] relative overflow-hidden" role="contentinfo">
      {/* Clean Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-30" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--primary)] opacity-[0.02] rounded-full blur-[100px] pointer-events-none translate-x-1/2 translate-y-1/2" />
      
      <div className="w-full container-inner py-12 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div className="flex items-center gap-6">
            <Logo size="sm" animated={false} showText={true} />
            <a href={PHONE_HREF} className="text-[var(--text-small)] font-semibold text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors">
              {BUSINESS_INFO.phone}
            </a>
          </div>
          <nav aria-label="Link-uri footer" className="flex flex-wrap items-center gap-6 text-[var(--text-small)] font-medium">
            <Link href="#contact" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t.nav.contact}</Link>
            <Link href="/blog" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Blog</Link>
            <Link href="/politica-confidentialitate" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">{t.footer.privacy}</Link>
            <Link href="/termeni-conditii" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">{t.footer.terms}</Link>
          </nav>
        </div>
        <p className="mt-8 pt-8 border-t border-[var(--border-default)] text-[var(--text-small)] text-[var(--text-muted)]">
          © {year} ElectroInstall · {BUSINESS_INFO.location}
        </p>
      </div>
    </footer>
  );
}
