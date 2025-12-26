"use client";

import { useEffect, useState, useRef } from "react";

export default function ProfessionalHeroVisual() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 25;
      const y = (e.clientY - top - height / 2) / 25;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center p-8 lg:p-12 overflow-visible"
    >
      {/* Glow Backdrop */}
      <div className="absolute inset-0 bg-[var(--accent)]/5 blur-[120px] rounded-full scale-110" />
      
      {/* Main SVG Composition */}
      <svg 
        viewBox="0 0 800 800" 
        className="w-full h-full max-w-[800px] drop-shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Intricate Circuit Grid (Background) */}
        <g className="opacity-[0.03] transition-opacity duration-1000">
          {Array.from({ length: 10 }).map((_, i) => (
            <path key={`h-${i}`} d={`M 0 ${i * 80} H 800`} stroke="var(--text-primary)" strokeWidth="1" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <path key={`v-${i}`} d={`M ${i * 80} 0 V 800`} stroke="var(--text-primary)" strokeWidth="1" />
          ))}
        </g>

        {/* Dynamic Professional Circuit Traces - Dual Tonal Energy */}
        <g 
          className="transition-transform duration-700 ease-out"
          style={{ transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)` }}
        >
          {/* Main Power Lines - Gold & Cobalt Mix */}
          <path 
            d="M50 400 H200 L250 350 H550 L600 400 H750" 
            stroke="var(--accent)" 
            strokeWidth="3" 
            className="opacity-40"
          />
          <path 
            d="M50 420 H200 L250 470 H550 L600 420 H750" 
            stroke="var(--accent-cobalt)" 
            strokeWidth="2" 
            className="opacity-30"
          />

          {/* Glowing Energy Flow - Dual speed particles */}
          <circle r="4" fill="var(--accent)" className="shadow-[0_0_15px_var(--accent)]">
            <animateMotion 
              path="M50 400 H200 L250 350 H550 L600 400 H750" 
              dur="2.5s" 
              repeatCount="indefinite" 
            />
          </circle>
          <circle r="3" fill="var(--accent-cobalt)" className="shadow-[0_0_10px_var(--accent-cobalt)]">
            <animateMotion 
              path="M50 420 H200 L250 470 H550 L600 420 H750" 
              dur="4s" 
              begin="1s"
              repeatCount="indefinite" 
            />
          </circle>

          {/* Tech Terminal Nodes with Multi-tonal Glows */}
          <circle cx="200" cy="400" r="10" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="2" />
          <circle cx="550" cy="350" r="10" fill="var(--bg-primary)" stroke="var(--accent-cobalt)" strokeWidth="2" />
          <circle cx="200" cy="400" r="4" fill="var(--accent)" className="animate-pulse" />
          <circle cx="550" cy="350" r="4" fill="var(--accent-cobalt)" className="animate-pulse" style={{ animationDelay: '1s' }} />
        </g>

        {/* Improved Professional Character Silhouette with Accent Highlights */}
        <g 
          className="transition-transform duration-500 ease-out"
          style={{ transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)` }}
        >
          {/* Character Glow */}
          <ellipse cx="400" cy="400" rx="100" ry="150" fill="var(--accent-cobalt)" className="opacity-[0.05] blur-3xl animate-pulse" />

          {/* Detailed Body Stance */}
          <path 
            d="M400 270 C440 270 470 290 475 340 L480 440 H320 L325 340 C330 290 360 270 400 270Z" 
            fill="var(--text-primary)" 
          />
          
          {/* Detailed Tool Belt - Highlighted */}
          <path d="M320 440 H480 V470 H320 Z" fill="var(--bg-elevated)" />
          <rect x="330" y="445" width="140" height="2" fill="var(--accent)" className="opacity-50" />

          {/* Professional Work Helmet - Solar Gold Highlight */}
          <path d="M360 270 C360 235 440 235 440 270" fill="var(--accent)" stroke="var(--accent)" strokeWidth="4" />
          <path d="M355 270 H445" stroke="var(--accent)" strokeWidth="8" strokeLinecap="round" />
          
          {/* Professional Working Arms */}
          <path 
            d="M330 350 L240 420 L240 500" 
            stroke="var(--text-primary)" 
            strokeWidth="32" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M470 350 L560 420 L560 500" 
            stroke="var(--text-primary)" 
            strokeWidth="32" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />

          {/* Specialized Tools Detail - Energy Charged */}
          <g transform="translate(240, 500)">
             <circle r="15" fill="var(--text-primary)" />
             <path d="M0 0 V60" stroke="var(--accent-cobalt)" strokeWidth="8" strokeLinecap="round" />
             <path d="M0 60 V70" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />
          </g>
          <g transform="translate(560, 500)">
             <circle r="15" fill="var(--text-primary)" />
             <path d="M-5 0 L-10 50 M5 0 L10 50" stroke="var(--text-secondary)" strokeWidth="8" strokeLinecap="round" />
          </g>

          {/* Sturdy Work Boots & Legs */}
          <path d="M355 465 L330 700" stroke="var(--text-primary)" strokeWidth="40" strokeLinecap="round" />
          <path d="M445 465 L470 700" stroke="var(--text-primary)" strokeWidth="40" strokeLinecap="round" />
          {/* Heavy Boots */}
          <rect x="290" y="700" width="60" height="25" rx="6" fill="var(--bg-base)" />
          <rect x="450" y="700" width="60" height="25" rx="6" fill="var(--bg-base)" />
        </g>

        {/* Tech Environment Symbols */}
        <g className="opacity-20 transition-all duration-1000">
           <path d="M650 150 Q700 150 700 200" stroke="var(--accent)" strokeWidth="1" fill="none" className="animate-pulse" />
           <rect x="100" y="100" width="30" height="30" rx="4" stroke="var(--text-tertiary)" strokeWidth="1" className="animate-float" />
        </g>

        {/* Energy Aura */}
        <ellipse cx="400" cy="400" rx="250" ry="350" stroke="var(--accent)" strokeWidth="0.5" className="opacity-30 animate-pulse" />
      </svg>
    </div>
  );
}
