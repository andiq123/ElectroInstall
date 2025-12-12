"use client";

import { BUSINESS_INFO } from "@/lib/constants";
import { SectionHeader } from "./ui";
import { PhoneIcon, LocationIcon, MailIcon, CheckIcon } from "./ui/Icons";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="container relative z-10 px-6 sm:px-8 md:px-12 lg:px-20 max-w-5xl mx-auto">
        <SectionHeader
          badge="Contact"
          title="Contactează-ne"
          subtitle="Suntem disponibili 24/7 pentru urgențe electrice. Răspundem rapid la toate solicitările."
        />

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone */}
          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`}
            className="group p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-accent)] hover:shadow-lg transition-all"
          >
            <div className="text-center">
              <div
                className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center"
                style={{ background: "var(--gradient-accent)" }}
              >
                <PhoneIcon size="xl" className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                Telefon
              </h3>
              <p className="text-xl font-bold text-[var(--accent)] mb-2">
                {BUSINESS_INFO.phone}
              </p>
              <span className="text-sm text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors">
                Apasă pentru a suna →
              </span>
            </div>
          </a>

          {/* Location */}
          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <div className="text-center">
              <div
                className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center"
                style={{ background: "var(--accent-secondary)" }}
              >
                <LocationIcon size="xl" className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                Locație
              </h3>
              <p className="text-lg font-semibold text-[var(--text-primary)]">
                {BUSINESS_INFO.location}
              </p>
              <span className="text-sm text-[var(--text-tertiary)]">
                Servicii în toată regiunea
              </span>
            </div>
          </div>

          {/* Email */}
          <a
            href={`mailto:${BUSINESS_INFO.email}`}
            className="group p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all"
          >
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center bg-[var(--color-success)]">
                <MailIcon size="xl" className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                Email
              </h3>
              <p className="text-base font-semibold text-[var(--text-primary)] break-all">
                {BUSINESS_INFO.email}
              </p>
              <span className="text-sm text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors">
                Scrie-ne →
              </span>
            </div>
          </a>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-[var(--text-tertiary)]">
          {BUSINESS_INFO.paymentMethods.map((method) => (
            <div key={method} className="flex items-center gap-2">
              <CheckIcon size="sm" className="text-[var(--color-success)]" />
              <span>{method}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <CheckIcon size="sm" className="text-[var(--color-success)]" />
            <span>{BUSINESS_INFO.guarantee}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
