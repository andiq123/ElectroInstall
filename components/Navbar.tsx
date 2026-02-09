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

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative px-2 py-1 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[var(--accent)] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
            
            <LanguageSwitcher />

            <div className="ml-4">
              <button 
                onClick={onOpenModal}
                className="px-6 py-3 rounded-full bg-[var(--accent)] text-black font-semibold text-sm hover:opacity-95 transition-opacity"
              >
                {t.common.cta_rapid}
              </button>
            </div>
          </div>

          <button
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-glass)]"
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

            <nav className="flex flex-col gap-6">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="block text-2xl font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                  style={{ 
                    transitionDelay: `${index * 40}ms`,
                    transform: isMenuOpen ? 'translateX(0)' : 'translateX(24px)',
                    opacity: isMenuOpen ? 1 : 0
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-[var(--border-glass)]">
              <button
                onClick={() => { closeMenu(); onOpenModal?.(); }}
                className="w-full py-4 rounded-xl bg-[var(--accent)] text-black font-semibold text-sm hover:opacity-95 transition-opacity"
              >
                {t.common.cta_primary}
              </button>
              <div className="mt-6 text-sm text-[var(--text-muted)]">
                {t.nav.appointments}: {BUSINESS_INFO.phone}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
