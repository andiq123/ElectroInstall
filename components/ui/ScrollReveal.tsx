"use client";

import { useEffect, useRef, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (shouldReduceMotion) {
      element.classList.add("revealed");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay if specified
          setTimeout(() => {
            element.classList.add("revealed");
          }, delay);

          // Unobserve if only animate once
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          element.classList.remove("revealed");
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, once, shouldReduceMotion]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal scroll-reveal-${direction} ${className}`}
    >
      {children}
    </div>
  );
}

// Hook for using reveal on existing elements
export function useScrollReveal(options?: { threshold?: number; once?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (shouldReduceMotion) {
      element.classList.add("revealed");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("revealed");
          if (options?.once !== false) {
            observer.unobserve(element);
          }
        } else if (options?.once === false) {
          element.classList.remove("revealed");
        }
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options?.threshold, options?.once, shouldReduceMotion]);

  return ref;
}

export default ScrollReveal;
