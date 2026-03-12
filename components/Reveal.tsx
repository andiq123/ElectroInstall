"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

const REVEAL_ROOT_MARGIN = "0px 0px -80px 0px";
const REVEAL_THRESHOLD = 0.1;

interface RevealProps {
  children: ReactNode;
  className?: string;
}

export default function Reveal({ children, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true);
      },
      { rootMargin: REVEAL_ROOT_MARGIN, threshold: REVEAL_THRESHOLD }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${revealed ? "revealed" : ""}`.trim()}
    >
      {children}
    </div>
  );
}
