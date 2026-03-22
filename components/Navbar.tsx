"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import Logo from "@/components/ui/Logo";
import { BUSINESS_INFO } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { homeUi } from "@/lib/homeUi";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#avantaje", labelKey: "benefits" as const },
  { href: "#servicii", labelKey: "services" as const },
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  const navLinks = NAV_LINKS.map(({ href, labelKey }) => ({
    href,
    label: t.nav[labelKey],
  }));

  return (
    <>
      <header className="nav-bar-in fixed top-0 left-0 right-0 z-50 bg-white/75 backdrop-blur-xl shadow-[0_20px_80px_rgba(25,28,30,0.06)] border-b border-black/[0.04]">
        <div
          className={cn(
            homeUi.container,
            "flex items-center justify-between gap-4 py-3.5 sm:py-4"
          )}
        >
          <Link
            href="/"
            className="flex items-center shrink-0 min-w-0"
            aria-label="ElectroInstall – Pagina principală"
          >
            <Logo size="sm" showText animated={false} light={false} />
          </Link>

          <nav
            className="hidden lg:flex items-center gap-8 xl:gap-10"
            aria-label="Navigare principală"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={homeUi.navLinkDesktop}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageSwitcher />
            <button
              type="button"
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-[var(--text-primary)] hover:bg-black/[0.05] transition-colors"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="nav-drawer"
              aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"}
            >
              {menuOpen ? <CloseIcon size="lg" /> : <MenuIcon size="lg" />}
            </button>
            <button
              type="button"
              onClick={() => onOpenModal?.()}
              className={homeUi.navCta}
            >
              {t.common.cta_rapid}
            </button>
          </div>
        </div>
      </header>

      {mounted && (
        <div
          id="nav-drawer"
          className="fixed inset-0 z-[100] lg:hidden"
          aria-hidden={!menuOpen}
          style={{ pointerEvents: menuOpen ? "auto" : "none" }}
        >
          <div
            className={cn(
              "absolute inset-0 bg-black/30 transition-opacity duration-300",
              menuOpen ? "opacity-100" : "opacity-0"
            )}
            onClick={closeMenu}
            aria-hidden
          />
          <aside
            className={cn(
              "absolute top-0 right-0 w-full max-w-[min(320px,88vw)] h-full bg-[var(--page-bg)] border-l border-black/[0.06] shadow-xl flex flex-col transition-transform duration-300 ease-out",
              menuOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="flex items-center justify-between p-4 border-b border-black/[0.06]">
              <Link href="/" onClick={closeMenu} className="flex items-center min-w-0" aria-label="ElectroInstall">
                <Logo size="sm" showText animated={false} light={false} />
              </Link>
              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-black/[0.05]"
                onClick={closeMenu}
                aria-label="Închide"
              >
                <CloseIcon size="md" />
              </button>
            </div>
            <nav className="flex flex-col p-4 gap-1 overflow-auto flex-1" aria-label="Meniu mobil">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="py-3.5 px-4 text-base font-display font-bold text-[var(--text-primary)] hover:bg-white rounded-xl transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-black/[0.06] space-y-3">
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onOpenModal?.();
                }}
                className="w-full rounded-full bg-[var(--accent-light)] text-zinc-900 py-3.5 font-display font-bold text-sm shadow-md ring-1 ring-amber-600/15 hover:bg-[#ffcd38] transition-colors"
              >
                {t.common.cta_primary}
              </button>
              <p className="text-xs text-[var(--text-muted)]">
                {t.nav.appointments}: {BUSINESS_INFO.phone}
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
