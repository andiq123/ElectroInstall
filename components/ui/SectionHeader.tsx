/**
 * SectionHeader Component - Reusable section headers
 */

import Badge from "./Badge";

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: "accent" | "secondary" | "success" | "error" | "outline";
  title: string;
  titleGradient?: string;
  subtitle?: string;
  subtitleHighlight?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  badge,
  badgeVariant = "accent",
  title,
  titleGradient,
  subtitle,
  subtitleHighlight,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignStyles = {
    left: "text-left",
    center: "text-center",
  };

  // Split title by line breaks
  const titleParts = title.split("\n");
  const hasMultipleLines = titleParts.length > 1;

  return (
    <div
      className={`mb-16 sm:mb-20 lg:mb-24 ${alignStyles[align]} ${className}`}
    >
      {badge && (
        <div
          className={`${align === "center" ? "flex justify-center" : ""} mb-8`}
        >
          <Badge variant={badgeVariant}>{badge}</Badge>
        </div>
      )}

      <h2
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        style={{
          fontFamily: "var(--font-display), system-ui",
          color: "var(--text-primary)",
        }}
      >
        {hasMultipleLines ? (
          titleParts.map((part, index) => (
            <span key={index} className="block">
              {index === 1 && titleGradient !== "none" ? (
                <span className="text-gradient">{part}</span>
              ) : (
                <span>{part}</span>
              )}
            </span>
          ))
        ) : (
          <span>{title}</span>
        )}
      </h2>

      {subtitle && (
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          {subtitle}
          {subtitleHighlight && (
            <span className="font-semibold" style={{ color: "var(--accent)" }}>
              {" "}
              {subtitleHighlight}
            </span>
          )}
        </p>
      )}
    </div>
  );
}
