"use client";

import { useState, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";
import NavLogo from "@/components/NavLogo";
import { NAV_LINKS } from "@/lib/constants";

interface NavbarProps {
  onOpenModal?: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mobile menu rendering
  useEffect(() => {
    if (isMenuOpen) {
      setShouldRenderMenu(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const timer = setTimeout(() => setShouldRenderMenu(false), 350);
      return () => clearTimeout(timer);
    }
  }, [isMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) closeMenu();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass shadow-lg"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Navigare principală"
      >
        <div className="w-full flex items-center justify-center">
          <div className="max-w-[88rem] w-full">
            <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 lg:h-24 px-6 sm:px-8 md:px-12 lg:px-20">
              <NavLogo />

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-2 lg:gap-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--accent-primary)] rounded-full transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
                <div className="ml-4">
                  <Button size="sm" variant="primary" onClick={onOpenModal}>
                    Comandă Acum
                  </Button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 hover:bg-[var(--bg-elevated)] active:scale-95"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Închide meniul" : "Deschide meniul"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <div className="relative w-6 h-5">
                  <span
                    aria-hidden
                    className={`absolute left-0 right-0 h-0.5 rounded-full transition-all duration-300 ease-out ${
                      isMenuOpen
                        ? "top-1/2 -translate-y-1/2 rotate-45 bg-[var(--accent-primary)]"
                        : "top-0 bg-[var(--text-secondary)]"
                    }`}
                  />
                  <span
                    aria-hidden
                    className={`absolute left-0 right-0 h-0.5 bg-[var(--text-secondary)] rounded-full top-1/2 -translate-y-1/2 transition-all duration-300 ${
                      isMenuOpen ? "opacity-0 scale-0" : "opacity-100"
                    }`}
                  />
                  <span
                    aria-hidden
                    className={`absolute left-0 right-0 h-0.5 rounded-full transition-all duration-300 ease-out ${
                      isMenuOpen
                        ? "top-1/2 -translate-y-1/2 -rotate-45 bg-[var(--accent-primary)]"
                        : "bottom-0 bg-[var(--text-secondary)]"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay & Panel */}
      {shouldRenderMenu && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-400 ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Mobile Menu Panel */}
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Meniu de navigare"
            className={`
              absolute top-0 right-0 h-full w-full sm:max-w-sm
              bg-[var(--bg-secondary)] border-l border-[var(--border-subtle)]
              transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${
                isMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-[var(--accent-primary)] rounded-full" />
                <span className="text-base font-semibold text-[var(--text-primary)]">
                  Navigare
                </span>
              </div>
              <button
                onClick={closeMenu}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--border-accent)] transition-all duration-200"
                aria-label="Închide meniul"
              >
                <svg
                  className="w-5 h-5 text-[var(--text-secondary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Content */}
            <div className="px-6 py-8 overflow-y-auto h-[calc(100%-4rem)]">
              <nav className="space-y-2" aria-label="Meniu mobil">
                {NAV_LINKS.map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="group flex items-center justify-between px-4 py-4 rounded-xl text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-all duration-200"
                    style={{
                      animation: isMenuOpen
                        ? `slideInRight 0.4s cubic-bezier(0.16,1,0.3,1) ${index * 0.06}s both`
                        : "none",
                    }}
                  >
                    <span>{link.label}</span>
                    <svg
                      className="w-5 h-5 text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                ))}
              </nav>

              {/* CTA Button */}
              <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
                <Button
                  variant="primary"
                  onClick={() => {
                    closeMenu();
                    onOpenModal?.();
                  }}
                  className="w-full py-4 text-base"
                >
                  Comandă Acum
                </Button>
              </div>

              {/* Contact Quick Access */}
              <div className="mt-6 p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                <p className="text-sm text-[var(--text-tertiary)] mb-2">
                  Apelează direct:
                </p>
                <a
                  href="tel:+373061110314"
                  className="text-lg font-bold text-[var(--accent-primary)] hover:underline"
                >
                  +373 061110314
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
