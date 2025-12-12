"use client";

import { BUSINESS_INFO, NAV_LINKS } from "@/lib/constants";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      role="contentinfo"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--accent-secondary-muted)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--accent-muted)" }}
      />

      <div className="container relative z-10 px-6 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <Logo size="lg" animated={false} />

            <p
              className="max-w-md leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Servicii electrice profesionale în {BUSINESS_INFO.location}.
              Licențiat, asigurat și disponibil 24/7 pentru toate nevoile tale
              electrice.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              {["Licențiat", "Asigurat", "24/7"].map((badge) => (
                <span key={badge} className="badge badge-accent">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3
              className="text-lg font-bold"
              style={{
                fontFamily: "var(--font-display), system-ui",
                color: "var(--text-primary)",
              }}
            >
              Navigare
            </h3>
            <nav aria-label="Link-uri rapide">
              <ul className="space-y-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 transition-colors duration-200"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "var(--accent)" }}
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/blog"
                    className="group flex items-center gap-2 transition-colors duration-200"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "var(--accent)" }}
                    />
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="group flex items-center gap-2 transition-colors duration-200"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "var(--accent)" }}
                    />
                    Pagina Principală
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3
              className="text-lg font-bold"
              style={{
                fontFamily: "var(--font-display), system-ui",
                color: "var(--text-primary)",
              }}
            >
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 transition-colors group"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{
                      background:
                        "linear-gradient(to bottom right, var(--accent), var(--accent-dark))",
                      boxShadow: "var(--shadow-accent)",
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      style={{ color: "var(--text-inverted)" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </span>
                  <span className="font-semibold">{BUSINESS_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-3 transition-colors group"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{
                      background:
                        "linear-gradient(to bottom right, var(--accent-secondary), var(--accent-secondary-dark))",
                      boxShadow: "var(--shadow-md)",
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      style={{ color: "var(--text-inverted)" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <span className="font-semibold break-all">
                    {BUSINESS_INFO.email}
                  </span>
                </a>
              </li>
              <li
                className="flex items-center gap-3"
                style={{ color: "var(--text-secondary)" }}
              >
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(to bottom right, var(--color-success), #16a34a)",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    style={{ color: "var(--text-inverted)" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <span>{BUSINESS_INFO.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-12 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--border-accent), transparent)",
          }}
        />

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
          style={{ color: "var(--text-tertiary)" }}
        >
          <p>
            © {currentYear} {BUSINESS_INFO.name}. Toate drepturile rezervate.
          </p>
          <p className="flex items-center gap-2">
            <span>Creat cu</span>
            <span style={{ color: "var(--color-error)" }}>♥</span>
            <span>în {BUSINESS_INFO.location}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
