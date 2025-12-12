"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./ui";
import { REASONS, STATS } from "@/lib/section-data";

// Animated counter component
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="stat-value">
      {count}
      {suffix}
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section
      id="despre"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
      aria-labelledby="why-heading"
    >
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="container relative z-10 px-6 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <SectionHeader
          badge="De Ce Noi"
          title="ElectroInstall - Alegerea Potrivită"
          subtitle="Suntem dedicați să oferim cele mai bune servicii electrice în Chișinău cu profesionalism și integritate."
        />

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 stagger-children">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="why-card lift-hover shine-hover"
              style={{ "--card-color": reason.color } as React.CSSProperties}
            >
              <div className="why-icon">{reason.icon}</div>
              <h3 className="why-title">{reason.title}</h3>
              <p className="why-description">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="stats-container mt-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-item">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
