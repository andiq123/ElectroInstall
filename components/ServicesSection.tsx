"use client";

import { SERVICE_CATEGORIES, BUSINESS_INFO } from "@/lib/constants";
import { useState } from "react";

// Icons
const Icons: Record<string, React.ReactNode> = {
  emergency: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-7 h-7"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M13 10V3L4 14h7v7l9-11h-7z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  installation: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-7 h-7"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  appliances: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-7 h-7"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M6 8h.01M10 8h.01M6 12h12M6 16h8" />
    </svg>
  ),
  repair: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-7 h-7"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  panels: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-7 h-7"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
      <circle cx="6" cy="6" r="1" fill="currentColor" />
    </svg>
  ),
  wiring: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-7 h-7"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
};

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section
      id="servicii"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-secondary)]">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--accent)] opacity-[0.04] blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--accent)] opacity-[0.03] blur-[100px]" />
        <div className="absolute inset-0 grid-pattern opacity-40" />
      </div>

      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--bg-primary)] to-transparent" />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="badge badge-accent mb-6 mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
            </span>
            <span>Servicii Electrice</span>
          </div>

          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "var(--font-display), system-ui" }}
          >
            <span className="text-[var(--text-primary)]">
              Tot ce ai nevoie,
            </span>
            <br />
            <span className="text-gradient">într-un singur loc</span>
          </h2>

          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            De la urgențe electrice până la instalații complete.
            <span className="text-[var(--accent)] font-semibold">
              {" "}
              Profesionalism garantat.
            </span>
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SERVICE_CATEGORIES.map((category, index) => {
            const Icon = Icons[category.id];
            const isActive = activeCategory === category.id;
            const isEmergency = category.id === "emergency";

            return (
              <article
                key={category.id}
                data-category={category.id}
                className={`service-card group p-6 sm:p-7 ${isEmergency ? "md:col-span-2 lg:col-span-1" : ""}`}
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-14 h-14 rounded-[var(--radius-xl)] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform"
                      style={{ background: `var(--cat-${category.id})` }}
                    >
                      {Icon}
                    </div>

                    {isEmergency && (
                      <span
                        className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border"
                        style={{
                          background: "rgba(239, 68, 68, 0.1)",
                          color: "var(--cat-emergency)",
                          borderColor: "rgba(239, 68, 68, 0.2)",
                        }}
                      >
                        24/7
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-[var(--text-tertiary)] mb-5">
                    {category.subtitle}
                  </p>

                  {/* Services list */}
                  <ul className="space-y-2.5">
                    {category.services.slice(0, 4).map((service) => (
                      <li
                        key={service}
                        className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"
                      >
                        <svg
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: `var(--cat-${category.id})` }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {service}
                      </li>
                    ))}
                  </ul>

                  {/* More indicator */}
                  {category.services.length > 4 && (
                    <div className="mt-4 pt-4 border-t border-[var(--border-subtle)]">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: `var(--cat-${category.id})` }}
                      >
                        +{category.services.length - 4} alte servicii
                      </span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
    </section>
  );
}
