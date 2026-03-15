"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import Logo from "@/components/ui/Logo";
import { ButtonWithIcon } from "@/components/ui";
import { BUSINESS_INFO } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const NAV_LINKS = [
  { href: "#faq", labelKey: "faq" as const },
  { href: "#contact", labelKey: "contact" as const },
] as const;

interface NavbarProps {
  onOpenModal?: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  const navLinks = NAV_LINKS.map(({ href, labelKey }) => ({ href, label: t.nav[labelKey] }));

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[var(--border-default)]">
        <div className="w-full flex items-center h-14 sm:h-16 gap-3 sm:gap-4 px-[var(--container-px)] sm:px-[var(--container-px-sm)]">
          {/* 1. Logo */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0"
            aria-label="ElectroInstall – Pagina principală"
          >
            <Logo size="sm" showText={true} animated={false} light={false} />
          </Link>

          {/* Spacer (equal with right spacer so nav is centered) */}
          <div className="min-w-0 flex-1 hidden md:block" aria-hidden />

          {/* 2. Nav links – centered (desktop only) */}
          <nav className="hidden md:flex items-center justify-center gap-6 flex-shrink-0" aria-label="Navigare principală">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[0.9375rem] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors whitespace-nowrap"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Spacer */}
          <div className="min-w-0 flex-1" aria-hidden />

          {/* 3. Language */}
          <div className="flex items-center flex-shrink-0">
            <LanguageSwitcher />
          </div>

          {/* 4. CTA (desktop) / Burger (mobile) – last */}
          <button
            type="button"
            className="md:hidden w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg text-[var(--text-primary)] hover:bg-black/[0.04] transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="nav-drawer"
            aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"}
          >
            {menuOpen ? <CloseIcon size="lg" /> : <MenuIcon size="lg" />}
          </button>
          <ButtonWithIcon
            onClick={() => onOpenModal?.()}
            text={t.common.cta_rapid}
            size="sm"
            className="hidden md:inline-flex whitespace-nowrap flex-shrink-0"
          />
        </div>
      </header>

      {/* Mobile drawer - above header when open */}
      {mounted && (
        <div
          id="nav-drawer"
          className="fixed inset-0 z-[100] md:hidden"
          aria-hidden={!menuOpen}
          style={{ pointerEvents: menuOpen ? "auto" : "none" }}
        >
          <div
            className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
            onClick={closeMenu}
            aria-hidden
          />
          <aside
            className={`absolute top-0 right-0 w-full max-w-[min(320px,85vw)] h-full bg-white border-l border-[var(--border-default)] shadow-xl flex flex-col transition-transform duration-300 ease-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[var(--border-default)]">
              <Link href="/" onClick={closeMenu} className="flex items-center" aria-label="ElectroInstall">
                <Logo size="sm" showText={true} animated={false} light={false} />
              </Link>
              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-xl text-[var(--text-secondary)] hover:bg-black/[0.04] hover:text-[var(--text-primary)] transition-colors"
                onClick={closeMenu}
                aria-label="Închide"
              >
                <CloseIcon size="md" />
              </button>
            </div>
            <nav className="flex flex-col p-4 sm:p-6 gap-1 overflow-auto flex-1" aria-label="Meniu mobil">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="py-3 px-4 text-base font-medium text-[var(--text-primary)] hover:bg-black/[0.04] rounded-xl transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="p-4 sm:p-6 border-t border-[var(--border-default)] space-y-3">
              <ButtonWithIcon
                onClick={() => {
                  closeMenu();
                  onOpenModal?.();
                }}
                text={t.common.cta_primary}
                className="w-full justify-center"
              />
              <p className="text-[var(--text-small)] text-[var(--text-muted)]">
                {t.nav.appointments}: {BUSINESS_INFO.phone}
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
