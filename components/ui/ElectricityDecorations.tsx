"use client";

import React from "react";

/**
 * VoltageSymbol - Minimalist lightning bolt in a geometric shape
 */
export function VoltageSymbol({ className = "", color = "var(--accent)" }: { className?: string; color?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 bg-current opacity-5 blur-xl rounded-full animate-pulse" style={{ color }} />
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full relative z-10" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M13 2L3 14H12L11 22L21 10H12L13 2Z" 
          fill={color} 
          className="drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"
        />
      </svg>
    </div>
  );
}

/**
 * CircuitTrace - Single minimalist circuit line with a pulse animation
 */
export function CircuitTrace({ 
  className = "", 
  direction = "horizontal",
  color = "var(--accent)" 
}: { 
  className?: string; 
  direction?: "horizontal" | "vertical";
  color?: string;
}) {
  return (
    <div className={`relative overflow-hidden pointer-events-none ${className} ${direction === "horizontal" ? "h-px w-full" : "w-px h-full"}`}>
      <div 
        className={`absolute inset-0 opacity-20`} 
        style={{ backgroundColor: color }} 
      />
      <div 
        className={`absolute bg-current animate-flow-pulse`}
        style={{ 
          color,
          width: direction === "horizontal" ? "40px" : "100%", 
          height: direction === "vertical" ? "40px" : "100%",
          left: direction === "horizontal" ? "-40px" : "0",
          top: direction === "vertical" ? "-40px" : "0",
          boxShadow: `0 0 10px ${color}`
        }} 
      />
    </div>
  );
}

/**
 * ElectricArc - Subtle animated spark effect
 */
export function ElectricArc({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none overflow-visible ${className}`}>
      <svg viewBox="0 0 100 20" className="w-full h-auto overflow-visible" preserveAspectRatio="none">
        <path
          d="M0 10 Q25 0, 50 10 T100 10"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="0.5"
          strokeDasharray="2 4"
          className="animate-electric-buzz opacity-40"
        />
        <circle r="1" fill="var(--accent)" className="animate-spark">
          <animateMotion 
            path="M0 10 Q25 0, 50 10 T100 10" 
            dur="0.8s" 
            repeatCount="indefinite" 
          />
        </circle>
      </svg>
    </div>
  );
}

/**
 * GeometricDecoration - Minimal geometric shapes with tech feel
 */
export function GeometricDecoration({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute border border-[var(--accent)]/20 rotate-45 pointer-events-none ${className}`}>
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
    </div>
  );
}
