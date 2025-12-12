/**
 * Badge Component - Reusable pill-shaped badges using theme variables
 */

interface BadgeProps {
  children: React.ReactNode;
  variant?: "accent" | "secondary" | "success" | "error" | "outline";
  pulse?: boolean;
  size?: "sm" | "md";
  className?: string;
}

interface VariantStyles {
  container: React.CSSProperties;
  dot: React.CSSProperties;
  text: React.CSSProperties;
}

export default function Badge({
  children,
  variant = "accent",
  pulse = true,
  size = "md",
  className = "",
}: BadgeProps) {
  const variants: Record<string, VariantStyles> = {
    accent: {
      container: {
        background: "var(--accent-muted)",
        borderColor: "var(--border-accent)",
      },
      dot: {
        background: "var(--accent)",
      },
      text: {
        color: "var(--accent)",
      },
    },
    secondary: {
      container: {
        background: "var(--accent-secondary-muted)",
        borderColor: "var(--accent-secondary)",
      },
      dot: {
        background: "var(--accent-secondary)",
      },
      text: {
        color: "var(--accent-secondary)",
      },
    },
    success: {
      container: {
        background: "rgba(34, 197, 94, 0.1)",
        borderColor: "rgba(34, 197, 94, 0.3)",
      },
      dot: {
        background: "var(--color-success)",
      },
      text: {
        color: "var(--color-success)",
      },
    },
    error: {
      container: {
        background: "rgba(239, 68, 68, 0.1)",
        borderColor: "rgba(239, 68, 68, 0.3)",
      },
      dot: {
        background: "var(--color-error)",
      },
      text: {
        color: "var(--color-error)",
      },
    },
    outline: {
      container: {
        background: "transparent",
        borderColor: "var(--border-default)",
      },
      dot: {
        background: "var(--text-secondary)",
      },
      text: {
        color: "var(--text-secondary)",
      },
    },
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-2",
    md: "px-4 py-2 text-sm gap-2.5",
  };

  const styles = variants[variant];

  return (
    <div
      className={`inline-flex items-center rounded-full border ${sizes[size]} ${className}`}
      style={styles.container}
    >
      {pulse ? (
        <span className="relative flex h-2 w-2">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={styles.dot}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={styles.dot}
          />
        </span>
      ) : (
        <span className="w-2 h-2 rounded-full" style={styles.dot} />
      )}
      <span
        className="font-semibold tracking-wider uppercase"
        style={styles.text}
      >
        {children}
      </span>
    </div>
  );
}
