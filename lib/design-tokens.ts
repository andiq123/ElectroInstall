/**
 * Design Tokens - Single Source of Truth for Design System
 * Following SOLID principles: Single Responsibility for colors, gradients, and design values
 */

// Brand Color Palette
export const COLORS = {
  // Primary Brand Colors
  violet: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  fuchsia: {
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
  },
  amber: {
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },
  // Semantic Colors
  rose: '#f43f5e',
  emerald: '#10b981',
  cyan: '#06b6d4',
  blue: '#3b82f6',
} as const;

// Gradient Definitions - Reusable across components
export const GRADIENTS = {
  // Main brand gradient
  brand: 'from-violet-500 via-fuchsia-500 to-amber-500',
  brandHover: 'from-violet-600 via-fuchsia-600 to-amber-600',

  // Accent gradients
  accent: 'from-amber-400 via-orange-500 to-rose-500',

  // Category-specific gradients
  emergency: 'from-rose-500 via-red-500 to-orange-500',
  installation: 'from-amber-400 via-orange-500 to-rose-500',
  appliances: 'from-cyan-400 via-blue-500 to-violet-500',
  repair: 'from-emerald-400 via-green-500 to-teal-500',
  panels: 'from-violet-400 via-purple-500 to-fuchsia-500',
  wiring: 'from-blue-400 via-indigo-500 to-violet-500',

  // Utility gradients
  glow: 'from-violet-500/20 via-fuchsia-500/20 to-amber-500/20',
  subtle: 'from-violet-500/10 to-fuchsia-500/10',
} as const;

// Animation Durations
export const DURATIONS = {
  fast: 150,
  base: 300,
  slow: 500,
  xslow: 700,
} as const;

// Border Radius Tokens
export const RADIUS = {
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

// Spacing Scale
export const SPACING = {
  section: {
    sm: 'py-16 sm:py-20',
    md: 'py-24 sm:py-32',
    lg: 'py-32 sm:py-40 lg:py-48',
  },
} as const;

// Shadow Tokens
export const SHADOWS = {
  glow: {
    violet: 'shadow-violet-500/25',
    amber: 'shadow-amber-500/25',
    brand: 'shadow-violet-500/20',
  },
} as const;

// Typography
export const TYPOGRAPHY = {
  display: "font-[var(--font-display)] font-bold tracking-tight",
  heading: "font-bold tracking-tight",
  body: "leading-relaxed",
} as const;
