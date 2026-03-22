import React from "react";

interface SectionHeaderProps {
  badge?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  centered?: boolean;
  className?: string;
  layout?: "split" | "standard";
  inverted?: boolean;
}

const titleClass = "font-display text-[var(--text-h2)] font-semibold tracking-tight leading-[var(--leading-tight)]";
const subtitleClass = "text-[var(--text-body)] leading-[var(--leading-relaxed)]";

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = false,
  className = "",
  layout = "standard",
  inverted = false,
}: SectionHeaderProps) {
  const titleCls = inverted ? `${titleClass} !text-white` : `${titleClass} text-[var(--text-primary)]`;
  const subtitleCls = inverted ? `${subtitleClass} text-white/95` : `${subtitleClass} text-[var(--text-secondary)]`;
  const barCls = inverted ? "bg-[var(--accent-light)]" : "bg-[var(--accent)]";
  const badgeCls = inverted ? "text-[var(--accent-light)]" : "text-[var(--accent)]";

  if (layout === "split") {
    return (
      <header className={`flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12 items-center lg:items-end text-center lg:text-left ${className}`}>
        <div className="max-w-3xl">
          {badge && (
            <p className={`text-[var(--text-small)] font-medium mb-3 ${badgeCls}`}>
              {badge}
            </p>
          )}
          <h2 className={titleCls}>
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className={`text-[var(--text-body)] sm:text-[var(--text-body-lg)] leading-[var(--leading-relaxed)] max-w-xl lg:mb-2 border-l-0 lg:border-l-2 pl-0 lg:pl-6 mx-auto lg:mx-0 ${inverted ? "text-white/95 border-[var(--accent-light)]/30" : "text-[var(--text-secondary)] border-[var(--accent)]/30"}`}>
            {subtitle}
          </p>
        )}
      </header>
    );
  }

  return (
    <header className={`mb-12 ${centered ? "text-center" : "text-left"} ${className}`}>
      {badge && (
        <p className={`text-[var(--text-small)] font-medium mb-3 ${badgeCls}`}>
          {badge}
        </p>
      )}
      <h2 className={titleCls}>
        {title}
      </h2>
      <div className={`h-1 w-12 ${barCls} rounded-full mt-5 ${centered ? "mx-auto" : ""}`} />
      {subtitle && (
        <p className={`mt-5 max-w-2xl ${centered ? "mx-auto" : ""} ${subtitleCls}`}>
          {subtitle}
        </p>
      )}
    </header>
  );
}
