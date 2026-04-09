"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { getHomeChrome, type HomeChromeCopy } from "@/lib/homeChrome";
import type { Locale, Translations } from "@/lib/locales";
import { BUSINESS_INFO } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import Logo from "@/components/ui/Logo";
import { homeUi } from "@/lib/homeUi";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#avantaje", labelKey: "benefits" as const },
  { href: "#servicii", labelKey: "services" as const },
  { href: "#faq", labelKey: "faq" as const },
  { href: "#contact", labelKey: "contact" as const },
] as const;

interface NavbarProps {
  chrome?: HomeChromeCopy;
  common?: Pick<Translations["common"], "cta_primary" | "cta_rapid">;
  locale?: Locale;
  nav?: Pick<
    Translations["nav"],
    "appointments" | "benefits" | "contact" | "faq" | "services"
  >;
  onOpenModal?: () => void;
}

export default function Navbar({
  chrome,
  common,
  locale,
  nav,
  onOpenModal,
}: NavbarProps) {
  const { locale: contextLocale, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const resolvedLocale = locale ?? contextLocale;
  const resolvedChrome = chrome ?? getHomeChrome(resolvedLocale);
  const resolvedCommon = common ?? {
    cta_primary: t.common.cta_primary,
    cta_rapid: t.common.cta_rapid,
  };
  const resolvedNav = nav ?? {
    appointments: t.nav.appointments,
    benefits: t.nav.benefits,
    contact: t.nav.contact,
    faq: t.nav.faq,
    services: t.nav.services,
  };

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  const navLinks = NAV_LINKS.map(({ href, labelKey }) => ({
    href,
    label: resolvedNav[labelKey],
  }));

  return (
    <>
      <header
        className={cn(
          "nav-bar-in fixed left-0 right-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300",
          scrolled
            ? "border-black/[0.07] bg-white/92 shadow-[0_4px_24px_rgba(0,0,0,0.07)] backdrop-blur-2xl"
            : "border-black/[0.04] bg-white/75 shadow-[0_20px_80px_rgba(25,28,30,0.06)] backdrop-blur-xl"
        )}
      >
        <div
          className={cn(
            homeUi.container,
            "flex items-center justify-between gap-4 py-3.5 sm:py-4"
          )}
        >
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center"
            aria-label={resolvedChrome.homeLabel}
          >
            <Logo size="sm" showText animated={false} light={false} />
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex xl:gap-10"
            aria-label={resolvedChrome.mainNavigation}
          >
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={homeUi.navLinkDesktop}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LanguageSwitcher locale={resolvedLocale} />
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-primary)] transition-colors hover:bg-black/[0.05] lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="nav-drawer"
              aria-label={
                menuOpen ? resolvedChrome.closeMenu : resolvedChrome.openMenu
              }
            >
              {menuOpen ? <CloseIcon size="lg" /> : <MenuIcon size="lg" />}
            </button>
            <button
              type="button"
              onClick={() => onOpenModal?.()}
              className={homeUi.navCta}
            >
              {resolvedCommon.cta_rapid}
            </button>
          </div>
        </div>
      </header>

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
            "absolute right-0 top-0 flex h-full w-full max-w-[min(320px,88vw)] flex-col border-l border-black/[0.06] bg-[var(--page-bg)] shadow-xl transition-transform duration-300 ease-out",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-black/[0.06] p-4">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex min-w-0 items-center"
              aria-label={resolvedChrome.homeLabel}
            >
              <Logo size="sm" showText animated={false} light={false} />
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-black/[0.05]"
              onClick={closeMenu}
              aria-label={resolvedChrome.close}
            >
              <CloseIcon size="md" />
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col gap-1 overflow-auto p-4"
            aria-label={resolvedChrome.mobileMenu}
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3.5 font-display text-base font-bold text-[var(--text-primary)] transition-colors hover:bg-white"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="space-y-3 border-t border-black/[0.06] p-4">
            <button
              type="button"
              onClick={() => {
                closeMenu();
                onOpenModal?.();
              }}
              className="w-full rounded-full bg-[var(--accent-light)] py-3.5 font-display text-sm font-bold text-zinc-900 shadow-md ring-1 ring-amber-600/15 transition-colors hover:bg-[#ffcd38]"
            >
              {resolvedCommon.cta_primary}
            </button>
            <p className="text-xs text-[var(--text-muted)]">
              {resolvedNav.appointments}: {BUSINESS_INFO.phone}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
