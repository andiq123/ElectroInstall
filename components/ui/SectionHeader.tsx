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
      <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 items-center lg:items-end text-center lg:text-left ${className}`}>
        <div className="max-w-3xl">
          {badge && (
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <div className="w-8 h-px bg-[var(--accent)]" />
              <span className="text-xs font-semibold tracking-widest text-[var(--accent)] uppercase">
                {badge}
              </span>
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl lg:mb-2 border-l-0 lg:border-l-2 pl-0 lg:pl-6 mx-auto lg:mx-0">
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`mb-12 sm:mb-16 ${centered ? "text-center mx-auto" : ""} ${className}`}>
      <div className={`relative inline-block ${centered ? "mx-auto text-center" : "text-left"}`}>
        {badge && (
          <span className="block text-xs font-semibold tracking-widest text-[var(--accent)] uppercase mb-3">
            {badge}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 text-[var(--text-primary)] leading-tight">
          {title}
        </h2>
        <div className={`h-1 w-12 bg-[var(--accent)] mt-6 rounded-full ${centered ? "mx-auto" : ""}`} />
      </div>
      {subtitle && (
        <p className={`mt-6 text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
