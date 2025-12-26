"use client";

import { ReactNode, forwardRef } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  bgType?: "base" | "elevated" | "wash-cobalt" | "wash-slate" | "wash-gold";
  withDecorations?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(({
  id,
  children,
  className = "",
  containerClassName = "",
  bgType = "base",
  withDecorations = true,
}, ref) => {
  const bgClasses = {
    base: "bg-[var(--bg-base)]",
    elevated: "bg-[var(--bg-elevated)]",
    "wash-cobalt": "bg-[var(--bg-wash-cobalt)]",
    "wash-slate": "bg-[var(--bg-wash-slate)]",
    "wash-gold": "bg-[var(--bg-wash-gold)]",
  }[bgType];

  return (
    <section
      ref={ref}
      id={id}
      className={`relative py-24 sm:py-32 overflow-hidden ${bgClasses} ${className}`}
    >
      {/* Universal Background Decorations */}
      {withDecorations && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="absolute inset-0 decorative-circuit" />
        </div>
      )}

      <div className={`container relative z-10 px-6 sm:px-8 max-w-7xl mx-auto ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
});

Section.displayName = "Section";

export default Section;
