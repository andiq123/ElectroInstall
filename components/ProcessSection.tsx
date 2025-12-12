"use client";

import { SectionHeader } from "./ui";
import { PROCESS_STEPS } from "@/lib/section-data";

export default function ProcessSection() {
  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
      aria-labelledby="process-heading"
    >
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />

      <div className="container relative z-10 px-6 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <SectionHeader
          badge="Cum Funcționează"
          title="Proces Simplu în 4 Pași"
          subtitle="De la primul apel până la finalizarea lucrării, totul este simplu și transparent."
        />

        {/* Process Timeline */}
        <div className="process-grid mt-12 stagger-children">
          {PROCESS_STEPS.map((step, index) => (
            <div key={step.number} className="process-step lift-hover">
              <div className="process-number">{step.number}</div>
              <div className="process-icon">{step.icon}</div>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-description">{step.description}</p>
              {index < PROCESS_STEPS.length - 1 && (
                <div className="process-connector" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
