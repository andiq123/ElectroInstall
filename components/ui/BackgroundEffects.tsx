/**
 * BackgroundEffects Component - Reusable background decorations
 * SOLID: Single responsibility for decorative backgrounds
 */

interface BackgroundEffectsProps {
  variant?: "default" | "hero" | "subtle" | "reversed";
  withGrid?: boolean;
  className?: string;
}

interface OrbConfig {
  position: string;
  size: string;
  gradient: string;
  blur: string;
  animate: boolean;
  delay?: string;
}

export default function BackgroundEffects({
  variant = "default",
  withGrid = true,
  className = "",
}: BackgroundEffectsProps) {
  const orbConfigs: Record<string, OrbConfig[]> = {
    default: [
      {
        position: "top-0 left-1/4",
        size: "w-[800px] h-[800px]",
        gradient: "from-violet-500/10 to-fuchsia-500/10",
        blur: "blur-3xl",
        animate: true,
      },
      {
        position: "bottom-0 right-1/4",
        size: "w-[600px] h-[600px]",
        gradient: "from-amber-500/15 to-orange-500/10",
        blur: "blur-3xl",
        animate: false,
        delay: "1s",
      },
    ],
    hero: [
      {
        position: "-top-40 -right-40",
        size: "w-[700px] h-[700px]",
        gradient: "from-violet-500/20 to-fuchsia-500/15",
        blur: "blur-3xl",
        animate: true,
      },
      {
        position: "-bottom-40 -left-40",
        size: "w-[600px] h-[600px]",
        gradient: "from-amber-500/20 to-orange-500/15",
        blur: "blur-3xl",
        animate: true,
        delay: "1.5s",
      },
      {
        position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        size: "w-[500px] h-[500px]",
        gradient: "from-fuchsia-500/10 to-violet-500/10",
        blur: "blur-3xl",
        animate: false,
      },
    ],
    subtle: [
      {
        position: "top-0 right-0",
        size: "w-[600px] h-[600px]",
        gradient: "from-amber-500/15 to-orange-500/10",
        blur: "blur-3xl",
        animate: false,
      },
      {
        position: "bottom-0 left-0",
        size: "w-[500px] h-[500px]",
        gradient: "from-violet-500/15 to-fuchsia-500/10",
        blur: "blur-3xl",
        animate: false,
      },
    ],
    reversed: [
      {
        position: "top-0 right-0",
        size: "w-[600px] h-[600px]",
        gradient: "from-amber-500/15 to-orange-500/10",
        blur: "blur-3xl",
        animate: false,
      },
      {
        position: "bottom-0 left-0",
        size: "w-[500px] h-[500px]",
        gradient: "from-violet-500/15 to-fuchsia-500/10",
        blur: "blur-3xl",
        animate: false,
      },
    ],
  };

  const orbs = orbConfigs[variant];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-gradient-start)] via-transparent to-[var(--brand-gradient-end)]" />

      {/* Animated orbs */}
      {orbs.map((orb, index) => (
        <div
          key={index}
          className={`
            absolute ${orb.position} ${orb.size}
            bg-gradient-to-r ${orb.gradient}
            rounded-full ${orb.blur}
            ${orb.animate ? "animate-pulse" : ""}
          `}
          style={orb.delay ? { animationDelay: orb.delay } : undefined}
        />
      ))}

      {/* Grid pattern */}
      {withGrid && (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      )}
    </div>
  );
}

// Standalone Glow Orb component for custom positioning
export function GlowOrb({
  color = "violet",
  size = "md",
  position,
  animate = false,
  className = "",
}: {
  color?: "violet" | "amber" | "fuchsia" | "cyan";
  size?: "sm" | "md" | "lg" | "xl";
  position?: string;
  animate?: boolean;
  className?: string;
}) {
  const colorStyles = {
    violet: "from-violet-500/20 to-fuchsia-500/15",
    amber: "from-amber-500/20 to-orange-500/15",
    fuchsia: "from-fuchsia-500/20 to-pink-500/15",
    cyan: "from-cyan-500/20 to-blue-500/15",
  };

  const sizeStyles = {
    sm: "w-[300px] h-[300px]",
    md: "w-[500px] h-[500px]",
    lg: "w-[700px] h-[700px]",
    xl: "w-[900px] h-[900px]",
  };

  return (
    <div
      className={`
        absolute ${position || ""} ${sizeStyles[size]}
        bg-gradient-to-r ${colorStyles[color]}
        rounded-full blur-3xl
        ${animate ? "animate-pulse" : ""}
        ${className}
      `}
    />
  );
}
