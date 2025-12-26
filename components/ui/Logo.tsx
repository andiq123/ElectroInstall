/**
 * Logo Component - Reusable brand logo with creative electric icon
 */

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  animated?: boolean;
  className?: string;
  light?: boolean;
}

const sizes = {
  sm: {
    container: "w-10 h-10 sm:w-11 sm:h-11",
    icon: "w-6 h-6 sm:w-7 sm:h-7",
    titleSize: "text-base sm:text-lg",
    subtitleSize: "text-xs sm:text-sm",
  },
  md: {
    container: "w-12 h-12 sm:w-14 sm:h-14",
    icon: "w-7 h-7 sm:w-8 sm:h-8",
    titleSize: "text-lg sm:text-xl",
    subtitleSize: "text-xs sm:text-sm",
  },
  lg: {
    container: "w-14 h-14 sm:w-16 sm:h-16",
    icon: "w-8 h-8 sm:w-9 sm:h-9",
    titleSize: "text-xl sm:text-2xl",
    subtitleSize: "text-sm",
  },
};

export function LogoIcon({
  size = "sm",
  animated = true,
  className = "",
}: Omit<LogoProps, "showText">) {
  const s = sizes[size];

  return (
    <div className={`relative ${s.container} ${className}`}>
      {/* Outer glow ring */}
      {animated && (
        <div
          className="absolute inset-0 rounded-xl opacity-60 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-500"
          style={{
            background:
              "linear-gradient(135deg, var(--accent) 0%, var(--accent-cobalt) 100%)",
          }}
        />
      )}

      {/* Main container */}
      <div
        className="relative w-full h-full rounded-xl flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 50%, var(--accent-cobalt) 100%)",
          boxShadow: "var(--shadow-accent)",
        }}
      >
        {/* Animated energy lines */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-0 left-1/4 w-px h-full"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(255,255,255,0.8), transparent)",
            }}
          />
          <div
            className="absolute top-0 right-1/3 w-px h-full"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(255,255,255,0.5), transparent)",
            }}
          />
        </div>

        {/* Custom Lightning Bolt SVG */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className={`${s.icon} relative z-10 drop-shadow-lg`}
          aria-hidden="true"
        >
          <path
            d="M18.5 3L8 17h7l-2 12L25 15h-7l2.5-12z"
            fill="white"
            className="drop-shadow-lg"
          />
          <path
            d="M17 6l-7 9h5l-1.5 8.5L22 16h-5l1.5-7z"
            fill="rgba(255,255,255,0.3)"
          />
          <circle cx="10" cy="10" r="1.5" fill="white" opacity="0.8" />
          <circle cx="22" cy="22" r="1" fill="white" opacity="0.6" />
        </svg>

        {/* Hover energy burst effect */}
        {animated && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)",
            }}
          />
        )}
      </div>

      {/* Pulse animation ring on hover */}
      {animated && (
        <div
          className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, var(--accent) 0%, transparent 50%)",
          }}
        />
      )}
    </div>
  );
}

export function LogoText({
  size = "sm",
  className = "",
  light = false,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  light?: boolean;
}) {
  const s = sizes[size];

  return (
    <div className={`flex flex-col leading-none ${className}`}>
      <span
        className={`${s.titleSize} font-black tracking-tight`}
        style={{ color: light ? "white" : "var(--text-primary)" }}
      >
        ELECTRO
      </span>
      <span className={`${s.subtitleSize} font-bold tracking-widest text-gradient`}>
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
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <LogoIcon size={size} animated={animated} />
      {showText && <LogoText size={size} light={light} />}
    </div>
  );
}
