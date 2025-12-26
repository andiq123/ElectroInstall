import React from "react";

interface SectionHeaderProps {
  badge?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  centered?: boolean;
  className?: string;
  layout?: "split" | "standard";
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = false,
  className = "",
  layout = "standard",
}: SectionHeaderProps) {
  if (layout === "split") {
    return (
      <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24 items-center lg:items-end text-center lg:text-left ${className}`}>
        <div className="max-w-3xl">
          {badge && (
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6 animate-fade-in">
              <div className="w-10 h-px bg-[var(--accent)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--accent)]">
                {badge}
              </span>
            </div>
          )}
          <h2 className="text-6xl sm:text-8xl font-black tracking-tighter italic uppercase text-[var(--text-primary)] leading-[0.85]">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-xl sm:text-2xl text-[var(--text-secondary)] font-medium leading-relaxed max-w-xl lg:mb-4 border-l-0 lg:border-l-2 pl-0 lg:pl-8 mx-auto lg:mx-0">
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`mb-16 sm:mb-24 ${centered ? "text-center mx-auto" : ""} ${className}`}>
      <div className={`relative inline-block ${centered ? "mx-auto text-center" : "text-left"}`}>
        {badge && (
          <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-[var(--accent)] mb-4">
            {badge}
          </span>
        )}
        <h2 className="text-5xl sm:text-8xl font-black tracking-tighter mb-4 italic uppercase text-[var(--text-primary)] leading-[0.85]">
          {title}
        </h2>
        <div className={`h-1.5 w-20 bg-[var(--accent)] mt-8 rounded-full ${centered ? "mx-auto" : ""}`} />
      </div>

      {subtitle && (
        <p className={`mt-10 text-xl text-[var(--text-secondary)] font-medium leading-relaxed max-w-2xl ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
