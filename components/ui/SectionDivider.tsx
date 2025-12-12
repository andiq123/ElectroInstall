"use client";

import { ReactNode } from "react";

/**
 * Modern Section Divider Component
 * Follows SOLID principles - Single Responsibility for each divider type
 * Provides creative, modern transitions between sections
 */

interface SectionDividerProps {
  variant?: 'electric' | 'pulse' | 'flow' | 'spark' | 'minimal';
  flip?: boolean;
  className?: string;
  fromColor?: string;
  toColor?: string;
}

// Electric Circuit Divider - Animated circuit lines
function ElectricDivider({ flip, className = '' }: { flip?: boolean; className?: string }) {
  return (
    <div className={`absolute ${flip ? 'top-0 rotate-180' : 'bottom-0'} left-0 right-0 h-24 sm:h-32 lg:h-40 pointer-events-none overflow-hidden ${className}`}>
      {/* Background gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[var(--bg-primary)]/50" />

      {/* Animated circuit lines */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
            <stop offset="20%" stopColor="rgb(139, 92, 246)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="rgb(217, 70, 239)" stopOpacity="0.8" />
            <stop offset="80%" stopColor="rgb(245, 158, 11)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="rgb(245, 158, 11)" stopOpacity="0" />
          </linearGradient>

          {/* Animated pulse */}
          <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0">
              <animate attributeName="offset" values="-0.3;1.3" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="5%" stopColor="white" stopOpacity="0.8">
              <animate attributeName="offset" values="-0.25;1.35" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="10%" stopColor="white" stopOpacity="0">
              <animate attributeName="offset" values="-0.2;1.4" dur="2s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>

        {/* Main circuit path */}
        <path
          d="M0,80 Q120,20 240,60 T480,40 T720,70 T960,30 T1200,50 T1440,80"
          fill="none"
          stroke="url(#circuit-gradient)"
          strokeWidth="2"
          className="opacity-60"
        />

        {/* Secondary paths */}
        <path
          d="M0,60 Q180,90 360,50 T720,80 T1080,40 T1440,70"
          fill="none"
          stroke="url(#circuit-gradient)"
          strokeWidth="1.5"
          className="opacity-40"
        />

        {/* Energy pulse overlay */}
        <path
          d="M0,80 Q120,20 240,60 T480,40 T720,70 T960,30 T1200,50 T1440,80"
          fill="none"
          stroke="url(#pulse-gradient)"
          strokeWidth="3"
          className="opacity-80"
        />
      </svg>

      {/* Glowing nodes */}
      <div className="absolute inset-0 flex items-center justify-around px-20">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="relative"
            style={{ animationDelay: `${i * 0.4}s` }}
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-violet-400 blur-sm animate-ping opacity-60" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Pulse Wave Divider - Smooth flowing energy waves
function PulseDivider({ flip, className = '' }: { flip?: boolean; className?: string }) {
  return (
    <div className={`absolute ${flip ? 'top-0 rotate-180' : 'bottom-0'} left-0 right-0 h-32 sm:h-40 lg:h-48 pointer-events-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wave-fill-1" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.15"/>
            <stop offset="50%" stopColor="rgb(217, 70, 239)" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="rgb(245, 158, 11)" stopOpacity="0.15"/>
          </linearGradient>
          <linearGradient id="wave-fill-2" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.1"/>
            <stop offset="50%" stopColor="rgb(217, 70, 239)" stopOpacity="0.15"/>
            <stop offset="100%" stopColor="rgb(245, 158, 11)" stopOpacity="0.1"/>
          </linearGradient>
          <linearGradient id="wave-stroke" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.5"/>
            <stop offset="50%" stopColor="rgb(217, 70, 239)" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="rgb(245, 158, 11)" stopOpacity="0.5"/>
          </linearGradient>
        </defs>

        {/* Background wave */}
        <path
          d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H0Z"
          fill="url(#wave-fill-2)"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H0Z;
              M0 120L48 105C96 90 192 70 288 65C384 60 480 65 576 75C672 85 768 90 864 85C960 80 1056 75 1152 75C1248 75 1344 80 1392 82L1440 85V120H0Z;
              M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H0Z
            "
          />
        </path>

        {/* Foreground wave */}
        <path
          d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 70C1200 65 1320 55 1380 50L1440 45V120H0Z"
          fill="url(#wave-fill-1)"
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 70C1200 65 1320 55 1380 50L1440 45V120H0Z;
              M0 120L60 95C120 80 240 55 360 50C480 45 600 55 720 65C840 75 960 80 1080 77.5C1200 75 1320 60 1380 55L1440 50V120H0Z;
              M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 70C1200 65 1320 55 1380 50L1440 45V120H0Z
            "
          />
        </path>

        {/* Top accent line */}
        <path
          d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 30C840 40 960 50 1080 50C1200 50 1320 40 1380 35L1440 30"
          fill="none"
          stroke="url(#wave-stroke)"
          strokeWidth="2"
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 30C840 40 960 50 1080 50C1200 50 1320 40 1380 35L1440 30;
              M0 50L60 40C120 30 240 15 360 12C480 9 600 15 720 25C840 35 960 45 1080 47C1200 50 1320 45 1380 40L1440 35;
              M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 30C840 40 960 50 1080 50C1200 50 1320 40 1380 35L1440 30
            "
          />
        </path>
      </svg>
    </div>
  );
}

// Flow Divider - Organic blob-like transition
function FlowDivider({ flip, className = '' }: { flip?: boolean; className?: string }) {
  return (
    <div className={`absolute ${flip ? 'top-0 rotate-180' : 'bottom-0'} left-0 right-0 h-24 sm:h-32 lg:h-40 pointer-events-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.25"/>
            <stop offset="30%" stopColor="rgb(217, 70, 239)" stopOpacity="0.3"/>
            <stop offset="70%" stopColor="rgb(232, 121, 249)" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="rgb(245, 158, 11)" stopOpacity="0.2"/>
          </linearGradient>
        </defs>

        {/* Organic blob shape */}
        <path
          d="M0,100 C0,100 50,85 150,80 C250,75 350,90 500,70 C650,50 750,40 900,50 C1050,60 1150,80 1250,75 C1350,70 1400,85 1440,100 L1440,100 L0,100 Z"
          fill="url(#flow-gradient)"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,100 C0,100 50,85 150,80 C250,75 350,90 500,70 C650,50 750,40 900,50 C1050,60 1150,80 1250,75 C1350,70 1400,85 1440,100 L1440,100 L0,100 Z;
              M0,100 C0,100 80,90 180,85 C280,80 380,65 530,75 C680,85 780,70 930,60 C1080,50 1180,75 1280,80 C1380,85 1420,90 1440,100 L1440,100 L0,100 Z;
              M0,100 C0,100 50,85 150,80 C250,75 350,90 500,70 C650,50 750,40 900,50 C1050,60 1150,80 1250,75 C1350,70 1400,85 1440,100 L1440,100 L0,100 Z
            "
          />
        </path>
      </svg>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 opacity-60"
            style={{
              left: `${10 + i * 12}%`,
              bottom: `${20 + (i % 3) * 20}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Spark Divider - Electric sparks and energy
function SparkDivider({ flip, className = '' }: { flip?: boolean; className?: string }) {
  return (
    <div className={`absolute ${flip ? 'top-0 rotate-180' : 'bottom-0'} left-0 right-0 h-20 sm:h-24 lg:h-32 pointer-events-none overflow-hidden ${className}`}>
      {/* Central glow line */}
      <div className="absolute bottom-1/2 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
        <div className="absolute inset-0 h-4 -top-2 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent blur-md" />
      </div>

      {/* Lightning bolts */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(245, 158, 11)" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="rgb(217, 70, 239)" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.4"/>
          </linearGradient>
        </defs>

        {/* Mini lightning bolts */}
        <g className="opacity-70">
          <path d="M200,0 L195,15 L205,12 L190,30" stroke="url(#lightning-gradient)" strokeWidth="2" fill="none" strokeLinecap="round">
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0s" />
          </path>
          <path d="M500,5 L495,20 L505,17 L490,35" stroke="url(#lightning-gradient)" strokeWidth="2" fill="none" strokeLinecap="round">
            <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
          </path>
          <path d="M850,0 L845,18 L855,15 L840,32" stroke="url(#lightning-gradient)" strokeWidth="2" fill="none" strokeLinecap="round">
            <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite" begin="1s" />
          </path>
          <path d="M1200,5 L1195,22 L1205,19 L1190,38" stroke="url(#lightning-gradient)" strokeWidth="2" fill="none" strokeLinecap="round">
            <animate attributeName="opacity" values="0;1;0" dur="2.2s" repeatCount="indefinite" begin="1.5s" />
          </path>
        </g>
      </svg>

      {/* Spark dots */}
      <div className="absolute bottom-1/2 left-0 right-0 flex justify-around px-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="relative"
          >
            <div
              className="w-1.5 h-1.5 rounded-full bg-amber-400"
              style={{
                animation: `spark ${1.5 + i * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Minimal Divider - Clean, subtle transition
function MinimalDivider({ flip, className = '' }: { flip?: boolean; className?: string }) {
  return (
    <div className={`absolute ${flip ? 'top-0 rotate-180' : 'bottom-0'} left-0 right-0 h-16 sm:h-20 lg:h-24 pointer-events-none ${className}`}>
      {/* Gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent opacity-50" />

      {/* Thin accent line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      </div>

      {/* Center diamond accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-2 h-2 rotate-45 bg-gradient-to-br from-violet-500 to-fuchsia-500 opacity-60" />
      </div>
    </div>
  );
}

// Main Export Component
export default function SectionDivider({
  variant = 'pulse',
  flip = false,
  className = ''
}: SectionDividerProps) {
  switch (variant) {
    case 'electric':
      return <ElectricDivider flip={flip} className={className} />;
    case 'pulse':
      return <PulseDivider flip={flip} className={className} />;
    case 'flow':
      return <FlowDivider flip={flip} className={className} />;
    case 'spark':
      return <SparkDivider flip={flip} className={className} />;
    case 'minimal':
      return <MinimalDivider flip={flip} className={className} />;
    default:
      return <PulseDivider flip={flip} className={className} />;
  }
}

// Named exports for direct usage
export { ElectricDivider, PulseDivider, FlowDivider, SparkDivider, MinimalDivider };
