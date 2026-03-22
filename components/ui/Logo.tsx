import { cn } from "@/lib/utils";

const LOGO_AMBER = "#D9943B";
const LOGO_INDIGO = "#4B5E8C";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  animated?: boolean;
  className?: string;
  light?: boolean;
}

const sizes = {
  sm: {
    container: "h-10 w-10 sm:h-11 sm:w-11",
    icon: "h-6 w-6 sm:h-7 sm:w-7",
    rowGap: "gap-[11px] sm:gap-[12px]",
    titleSize: "text-[1.0625rem] sm:text-lg",
    subtitleSize: "text-[0.6875rem] sm:text-xs",
    lineGap: "gap-0.5",
  },
  md: {
    container: "h-12 w-12 sm:h-14 sm:w-14",
    icon: "h-7 w-7 sm:h-8 sm:w-8",
    rowGap: "gap-4 sm:gap-[17px]",
    titleSize: "text-lg sm:text-xl",
    subtitleSize: "text-[0.6875rem] sm:text-xs",
    lineGap: "gap-0.5 sm:gap-1",
  },
  lg: {
    container: "h-14 w-14 sm:h-16 sm:w-16",
    icon: "h-8 w-8 sm:h-9 sm:w-9",
    rowGap: "gap-5 sm:gap-6",
    titleSize: "text-xl sm:text-2xl",
    subtitleSize: "text-xs sm:text-sm",
    lineGap: "gap-1",
  },
} as const;

const faceGradient = `linear-gradient(135deg, ${LOGO_AMBER} 0%, ${LOGO_INDIGO} 100%)`;
const glowGradient = `linear-gradient(135deg, ${LOGO_AMBER} 0%, ${LOGO_INDIGO} 100%)`;
const shineStrong =
  "linear-gradient(180deg, transparent, rgba(255,255,255,0.55), transparent)";
const shineSoft = "linear-gradient(180deg, transparent, rgba(255,255,255,0.35), transparent)";
const radialHover = "radial-gradient(circle at center, rgba(255,255,255,0.18) 0%, transparent 70%)";
const pingGradient = `linear-gradient(135deg, ${LOGO_AMBER} 0%, transparent 50%)`;

export function LogoIcon({
  size = "sm",
  animated = true,
  className = "",
}: Omit<LogoProps, "showText" | "light">) {
  const s = sizes[size];

  return (
    <div className={cn("relative shrink-0", s.container, className)}>
      {animated ? (
        <div
          className="absolute inset-0 rounded-[32%] opacity-50 blur-sm transition-all duration-500 group-hover:opacity-90 group-hover:blur-md"
          style={{ background: glowGradient }}
        />
      ) : null}

      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[32%]"
        style={{
          background: faceGradient,
          boxShadow: "0 4px 14px -2px rgba(75, 94, 140, 0.35), 0 0 0 1px rgba(0,0,0,0.04)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.22]" aria-hidden>
          <div className="absolute left-[22%] top-0 h-full w-px" style={{ background: shineStrong }} />
          <div className="absolute left-[38%] top-0 h-full w-[2px]" style={{ background: shineSoft }} />
          <div className="absolute right-[28%] top-0 h-full w-px" style={{ background: shineSoft }} />
        </div>

        <svg
          viewBox="0 0 32 32"
          fill="none"
          className={cn(s.icon, "relative z-10")}
          aria-hidden
        >
          <path d="M18.5 3L8 17h7l-2 12L25 15h-7l2.5-12z" fill="white" />
          <circle cx="10.2" cy="11" r="1.35" fill="white" />
          <circle cx="22.5" cy="21.5" r="1.15" fill="white" />
        </svg>

        {animated ? (
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: radialHover }}
          />
        ) : null}
      </div>

      {animated ? (
        <div
          className="pointer-events-none absolute -inset-1 rounded-[32%] opacity-0 transition-opacity group-hover:opacity-100 group-hover:animate-ping"
          style={{ background: pingGradient }}
        />
      ) : null}
    </div>
  );
}

export function LogoText({
  size = "sm",
  className = "",
  light = false,
}: {
  size?: keyof typeof sizes;
  className?: string;
  light?: boolean;
}) {
  const s = sizes[size];

  return (
    <div className={cn("flex min-w-0 flex-col justify-center", s.lineGap, className)}>
      <span
        className={cn(
          s.titleSize,
          "font-display font-black uppercase leading-none tracking-tight",
          light ? "text-white" : "text-black"
        )}
      >
        ELECTRO
      </span>
      <span
        className={cn(
          s.subtitleSize,
          "font-display font-medium uppercase leading-none tracking-[0.14em]",
          light ? "text-amber-200" : undefined
        )}
        style={light ? undefined : { color: LOGO_AMBER }}
      >
        INSTALL
      </span>
    </div>
  );
}

export default function Logo({
  size = "sm",
  showText = true,
  animated = true,
  className = "",
  light = false,
}: LogoProps) {
  const s = sizes[size];

  return (
    <div className={cn("group flex items-center", s.rowGap, className)}>
      <LogoIcon size={size} animated={animated} />
      {showText ? <LogoText size={size} light={light} /> : null}
    </div>
  );
}
