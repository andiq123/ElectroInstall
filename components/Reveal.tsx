"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type RevealVariant = "up" | "up-sm" | "up-lg" | "left" | "right" | "scale" | "blur";

const variantClass: Record<RevealVariant, string> = {
  up: "reveal-io",
  "up-sm": "reveal-io reveal-io--sm",
  "up-lg": "reveal-io reveal-io--lg",
  left: "reveal-io reveal-io--left",
  right: "reveal-io reveal-io--right",
  scale: "reveal-io reveal-io--scale",
  blur: "reveal-io reveal-io--blur",
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  rootMargin?: string;
  threshold?: number;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  rootMargin = "-48px 0px -8% 0px",
  threshold = 0.06,
}: RevealProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  const style = {
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      data-visible={visible ? "true" : "false"}
      style={style}
      className={cn(variantClass[variant], className)}
    >
      {children}
    </div>
  );
}
