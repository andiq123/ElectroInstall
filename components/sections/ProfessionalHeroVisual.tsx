"use client";

import { useEffect, useState, useRef } from "react";

export default function ProfessionalHeroVisual() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const x = (e.clientX - cx) / 80;
      const y = (e.clientY - cy) / 80;
      setPos({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full h-full flex items-center justify-center p-6 overflow-visible"
    >
      <div className="absolute inset-0 bg-[var(--accent)]/[0.04] blur-[80px] rounded-full scale-110 hero-visual-glow" />
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-[400px] hero-visual-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          transition: "transform 0.4s ease-out",
        }}
      >
        <g className="opacity-[0.08]">
          <path d="M60 200 H400" stroke="var(--text-primary)" strokeWidth="0.5" />
          <path d="M60 220 H400" stroke="var(--text-primary)" strokeWidth="0.5" />
          <path d="M0 100 V400" stroke="var(--text-primary)" strokeWidth="0.5" />
          <path d="M80 100 V400" stroke="var(--text-primary)" strokeWidth="0.5" />
        </g>

        <g style={{ transform: "translate(0,0)" }}>
          <path
            d="M80 200 H180 L220 160 H320 L360 200"
            stroke="var(--accent)"
            strokeWidth="2"
            className="opacity-35"
          />
          <path
            d="M80 220 H180 L220 260 H320 L360 220"
            stroke="var(--accent-cobalt)"
            strokeWidth="1.5"
            className="opacity-25"
          />
          <circle cx="180" cy="200" r="6" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="1.5" />
          <circle cx="320" cy="160" r="6" fill="var(--bg-primary)" stroke="var(--accent-cobalt)" strokeWidth="1.5" />
          <circle r="3" fill="var(--accent)" className="hero-energy-dot">
            <animateMotion
              path="M80 200 H180 L220 160 H320 L360 200"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="2" fill="var(--accent-cobalt)" className="opacity-70">
            <animateMotion
              path="M80 220 H180 L220 260 H320 L360 220"
              dur="5.5s"
              begin="1.2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        <g style={{ transform: `translate(${pos.x * 2}px, ${pos.y * 2}px)`, transition: "transform 0.35s ease-out" }}>
          <path
            d="M200 140 C220 140 240 160 245 200 L250 280 H150 L155 200 C160 160 180 140 200 140Z"
            fill="var(--text-primary)"
            className="opacity-95"
          />
          <path d="M150 280 H250 V300 H150 Z" fill="var(--bg-elevated)" />
          <path d="M185 140 C185 120 215 120 215 140" fill="var(--accent)" className="opacity-90" />
          <path d="M182 140 H218" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
          <path
            d="M165 180 L120 240 L120 280"
            stroke="var(--text-primary)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-95"
          />
          <path
            d="M235 180 L280 240 L280 280"
            stroke="var(--text-primary)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-95"
          />
          <circle cx="120" cy="280" r="8" fill="var(--text-primary)" className="opacity-95" />
          <circle cx="280" cy="280" r="8" fill="var(--text-primary)" className="opacity-95" />
          <g transform="translate(120, 280)">
            <circle r="10" fill="var(--text-primary)" className="opacity-95" />
            <path d="M0 -8 V20" stroke="var(--accent-cobalt)" strokeWidth="4" strokeLinecap="round" className="opacity-60" />
            <path d="M0 20 V28" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" className="hero-tool-tip" />
          </g>
          <g transform="translate(280, 280)">
            <circle r="10" fill="var(--text-primary)" className="opacity-95" />
            <path d="M-6 -4 L-8 24 M6 -4 L8 24" stroke="var(--text-secondary)" strokeWidth="5" strokeLinecap="round" className="opacity-70" />
          </g>
        </g>

        <ellipse
          cx="200"
          cy="200"
          rx="140"
          ry="160"
          stroke="var(--accent)"
          strokeWidth="0.5"
          className="opacity-20 hero-aura"
        />
      </svg>
    </div>
  );
}
