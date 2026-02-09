"use client";

import { BUSINESS_INFO, SHOW_EMAIL } from "@/lib/constants";
import { PhoneIcon, LocationIcon, MailIcon } from "./ui/Icons";
import Logo from "@/components/ui/Logo";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  const footerNavLinks = [
    { href: '#servicii', label: t.nav.services },
    { href: '#despre', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
    { href: '/blog', label: 'Blog' }
  ];

  return (
    <footer
      className="relative overflow-hidden bg-[var(--bg-base)] border-t border-[var(--border-glass)]"
      role="contentinfo"
    >
      <div className="container px-6 sm:px-8 max-w-7xl mx-auto pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-24 mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-10">
            <div className="inline-block">
               <Logo size="lg" animated={false} />
            </div>

            <p className="max-w-md text-[var(--text-secondary)] leading-relaxed">
              &quot;{t.common.work_done_right}. Lucruri bine făcute pentru casa ta.&quot;
            </p>
            <p className="max-w-md text-sm text-[var(--text-muted)] leading-relaxed">
              {t.footer.about_text}
            </p>
            {t.footer.program && (
              <p className="text-sm font-medium text-[var(--accent)]">
                {t.footer.program}
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h3 className="text-sm font-semibold text-[var(--accent)] mb-4">
              {t.nav.services}
            </h3>
            <nav aria-label="Link-uri rapide">
              <ul className="space-y-4">
                {footerNavLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-12">
             <h3 className="text-sm font-semibold text-[var(--accent)] mb-4">
              Contact
            </h3>
            <div className="space-y-5">
              <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`} className="flex items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-glass)] flex items-center justify-center text-[var(--accent)]">
                  <PhoneIcon />
                </div>
                <span className="font-medium text-[var(--text-primary)]">{BUSINESS_INFO.phone}</span>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-glass)] flex items-center justify-center text-[var(--accent)]">
                  <LocationIcon />
                </div>
                <span className="text-[var(--text-primary)]">{BUSINESS_INFO.location}</span>
              </div>
              {SHOW_EMAIL && (
              <a href={`mailto:${BUSINESS_INFO.email}`} className="flex items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-glass)] flex items-center justify-center text-[var(--accent)]">
                  <MailIcon />
                </div>
                <span className="font-medium text-[var(--text-primary)] break-all">{BUSINESS_INFO.email}</span>
              </a>
            )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-[var(--border-glass)] flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-[var(--text-muted)]">
          <p>© {currentYear} ElectroInstall. Radu — Electricianul tău de încredere.</p>
          <div className="flex items-center gap-6">
            <a href="/politica-confidentialitate" className="hover:text-[var(--text-primary)] transition-colors">{t.footer.privacy}</a>
            <a href="/termeni-conditii" className="hover:text-[var(--text-primary)] transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
