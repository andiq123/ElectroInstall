"use client";

import { BUSINESS_INFO } from "@/lib/constants";
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

            <p className="max-w-md text-xl text-[var(--text-secondary)] leading-relaxed font-medium italic">
              &quot;{t.common.work_done_right}. Lucruri bine făcute pentru casa ta.&quot;
            </p>
            
            <p className="max-w-md text-[var(--text-muted)] leading-relaxed opacity-70">
              {t.footer.about_text}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--accent)]">
              {t.nav.services}
            </h3>
            <nav aria-label="Link-uri rapide">
              <ul className="space-y-6">
                {footerNavLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all duration-300"
                    >
                      <span className="w-1 h-1 rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-4" />
                      <span className="text-base font-bold uppercase tracking-widest">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-12">
             <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--accent)]">
              CONTACT DIRECT
            </h3>
            
            <div className="space-y-8">
              <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`} className="group flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-glass)] flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-all">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Telefon Personal</p>
                  <p className="text-xl font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{BUSINESS_INFO.phone}</p>
                </div>
              </a>

              <div className="group flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-glass)] flex items-center justify-center text-[var(--accent)]">
                  <LocationIcon />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Acoperire</p>
                  <p className="text-xl font-black text-[var(--text-primary)]">{BUSINESS_INFO.location}</p>
                </div>
              </div>

              <a href={`mailto:${BUSINESS_INFO.email}`} className="group flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-glass)] flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-all">
                  <MailIcon />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Email</p>
                  <p className="text-xl font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors break-all">{BUSINESS_INFO.email}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-[var(--border-glass)] flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
          <p>© {currentYear} ElectroInstall. Radu - Electricianul tău de încredere.</p>
          
          <div className="flex items-center gap-8">
             <a href="/politica-confidentialitate" className="hover:text-[var(--text-primary)] transition-colors">{t.footer.privacy}</a>
             <a href="/termeni-conditii" className="hover:text-[var(--text-primary)] transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>

      {/* Subtle background decoration */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--accent)]/[0.02] blur-[100px] rounded-full -mr-64 -mb-64 pointer-events-none" />
    </footer>
  );
}
