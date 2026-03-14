"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
}

export default function Reveal({ 
  children, 
  className, 
  delay = 0,
  yOffset = 40,
  duration = 0.6
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "-100px",
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transform: isVisible ? "translateY(0)" : `translateY(${yOffset}px)`,
        opacity: isVisible ? 1 : 0,
        transition: `all ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
      className={cn("w-full h-full", className)}
    >
      {children}
    </div>
  );
}
