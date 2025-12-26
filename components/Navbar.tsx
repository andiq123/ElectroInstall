"use client";

import { useState, useEffect, useCallback } from "react";
import NavLogo from "@/components/NavLogo";
import { BUSINESS_INFO } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface NavbarProps {
  onOpenModal?: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { href: '#servicii', label: t.nav.services },
    { href: '#despre', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ];

  const [shouldRenderMenu, setShouldRenderMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    if (nextState) setShouldRenderMenu(true);
  };
  
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const timer = setTimeout(() => setShouldRenderMenu(false), 350);
      return () => clearTimeout(timer);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) closeMenu();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[var(--bg-elevated)]/80 backdrop-blur-xl border-b border-[var(--border-glass)] py-4 shadow-2xl"
            : "bg-transparent py-6"
        }`}
        role="navigation"
        aria-label="Navigare principală"
      >
        <div className="container px-6 sm:px-8 max-w-7xl mx-auto flex items-center justify-between">
          <NavLogo />

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative px-2 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)] transition-all duration-300"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            
            <LanguageSwitcher />

            <div className="ml-6">
              <button 
                onClick={onOpenModal}
                className="relative group px-10 py-4 rounded-full bg-[var(--accent)] text-black font-black uppercase tracking-widest text-[10px] overflow-hidden transition-all duration-300 shadow-lg hover:shadow-[var(--shadow-accent)]"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 transition-colors">{t.common.cta_rapid}</span>
              </button>
            </div>
          </div>

          <button
            className="md:hidden group relative w-12 h-12 flex items-center justify-center rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-glass)] shadow-sm transition-all active:scale-90"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="space-y-1.5" aria-hidden="true">
              <span className={`block h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${isMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
              <span className={`block h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${isMenuOpen ? "opacity-0" : "w-4"}`} />
              <span className={`block h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${isMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {shouldRenderMenu && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500 ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMenu}
          />

          <div
            id="mobile-menu"
            className={`absolute top-0 right-0 h-full w-full sm:max-w-md bg-[var(--bg-base)] border-l border-[var(--border-glass)] p-10 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Meniu mobil"
          >
            <div className="flex items-center justify-between mb-20">
              <NavLogo />
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <button 
                  onClick={closeMenu}
                  className="w-12 h-12 rounded-full border border-[var(--border-glass)] flex items-center justify-center hover:bg-white/5 transition-all text-[var(--text-primary)]"
                  aria-label="Închide meniul"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            <nav className="flex flex-col gap-10">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="group block text-5xl font-black italic uppercase tracking-tighter text-[var(--text-primary)] hover:text-[var(--accent)] transition-all"
                  style={{ 
                    transitionDelay: `${index * 50}ms`,
                    transform: isMenuOpen ? 'translateX(0)' : 'translateX(50px)',
                    opacity: isMenuOpen ? 1 : 0
                  }}
                >
                  <span className="inline-block group-hover:translate-x-4 transition-transform duration-300">
                    {link.label}
                  </span>
                </a>
              ))}
            </nav>

            <div className="mt-auto pt-10 border-t border-[var(--border-glass)]">
              <button
                onClick={() => { closeMenu(); onOpenModal?.(); }}
                className="w-full py-6 rounded-3xl bg-[var(--accent)] text-black font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-xl"
              >
                {t.common.cta_primary}
              </button>
              
              <div className="mt-8 flex items-center gap-4 text-xs font-black uppercase tracking-widest text-[var(--text-secondary)]">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                {t.nav.appointments}: {BUSINESS_INFO.phone}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
