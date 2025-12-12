"use client";

import { useState, useCallback, useEffect } from "react";

interface Spark {
  id: number;
  x: number;
  y: number;
  angle: number;
  delay: number;
}

export default function LightBulb() {
  const [isLit, setIsLit] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleLight = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Create sparks explosion effect
    const newSparks: Spark[] = [];
    for (let i = 0; i < 12; i++) {
      newSparks.push({
        id: Date.now() + i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        angle: (360 / 12) * i,
        delay: Math.random() * 0.2,
      });
    }
    setSparks(newSparks);

    // Toggle light state
    setTimeout(() => {
      setIsLit((prev) => !prev);
    }, 100);

    // Clear sparks after animation
    setTimeout(() => {
      setSparks([]);
      setIsAnimating(false);
    }, 800);
  }, [isAnimating]);

  // Update document class for page-wide effect
  useEffect(() => {
    if (isLit) {
      document.documentElement.classList.add("illuminated");
    } else {
      document.documentElement.classList.remove("illuminated");
    }
    return () => {
      document.documentElement.classList.remove("illuminated");
    };
  }, [isLit]);

  return (
    <>
      {/* Light Bulb Button */}
      <button
        onClick={toggleLight}
        className={`
          fixed bottom-6 right-6 z-[100]
          w-16 h-16 sm:w-20 sm:h-20
          rounded-full
          flex items-center justify-center
          cursor-pointer
          transition-all duration-500 ease-out
          focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]
          ${
            isLit
              ? "bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 shadow-[0_0_60px_rgba(251,191,36,0.8),0_0_120px_rgba(251,191,36,0.4)] scale-110"
              : "bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-tertiary)] border border-[var(--border-default)] shadow-lg hover:border-[var(--border-accent)] hover:shadow-[var(--shadow-glow-sm)]"
          }
          ${isAnimating ? "animate-shake" : ""}
        `}
        aria-label={isLit ? "Stinge lumina" : "Aprinde lumina"}
        aria-pressed={isLit}
        title={isLit ? "Click pentru a stinge" : "Click pentru a aprinde!"}
      >
        {/* Bulb Icon */}
        <div className="relative">
          <span
            className={`text-3xl sm:text-4xl transition-all duration-300 ${
              isLit ? "filter drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]" : ""
            }`}
          >
            💡
          </span>

          {/* Inner glow when lit */}
          {isLit && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-white/50 rounded-full blur-md animate-pulse" />
            </div>
          )}
        </div>

        {/* Sparks */}
        {sparks.map((spark) => (
          <div
            key={spark.id}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-spark-fly"
            style={{
              left: "50%",
              top: "50%",
              transform: `rotate(${spark.angle}deg) translateY(-40px)`,
              animationDelay: `${spark.delay}s`,
            }}
          />
        ))}

        {/* Pulsing ring when off */}
        {!isLit && !isAnimating && (
          <div className="absolute inset-0 rounded-full border-2 border-[var(--accent-primary)] opacity-50 animate-ping" />
        )}
      </button>

      {/* Tooltip hint */}
      {!isLit && (
        <div className="fixed bottom-24 right-6 sm:bottom-28 z-[99] pointer-events-none">
          <div className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-tertiary)] animate-bounce">
            Apasă pentru a aprinde! ⚡
          </div>
        </div>
      )}

      {/* Full page illumination overlay */}
      <div
        className={`
          fixed inset-0 pointer-events-none z-[90]
          transition-all duration-700 ease-out
          ${
            isLit
              ? "opacity-100 bg-gradient-radial from-amber-400/10 via-yellow-400/5 to-transparent"
              : "opacity-0"
          }
        `}
        style={{
          background: isLit
            ? "radial-gradient(ellipse at bottom left, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.05) 40%, transparent 70%)"
            : "transparent",
        }}
        aria-hidden="true"
      />

      {/* Power surge flash effect */}
      {isAnimating && (
        <div
          className="fixed inset-0 pointer-events-none z-[95] bg-amber-400/20 animate-flash"
          aria-hidden="true"
        />
      )}
    </>
  );
}
