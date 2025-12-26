"use client";

/**
 * Card Component - Reusable card with multiple variants
 * SOLID: Open/Closed principle - extend via variants, not modification
 */

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'elevated' | 'gradient' | 'interactive';
  gradient?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

const paddingStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

const roundedStyles = {
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  '2xl': 'rounded-3xl',
  '3xl': 'rounded-[2rem]',
};

export default function Card({
  children,
  variant = 'default',
  gradient,
  padding = 'lg',
  rounded = '2xl',
  className = '',
  onClick,
  hoverEffect = true,
}: CardProps) {
  const baseStyles = `
    relative overflow-hidden
    ${paddingStyles[padding]}
    ${roundedStyles[rounded]}
    transition-all duration-300
  `;

  const variantStyles = {
    default: `
      bg-[var(--bg-elevated)]
      border border-[var(--border-glass)]
      ${hoverEffect ? 'hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--shadow-accent)]' : ''}
    `,
    glass: `
      bg-[var(--glass-bg)]
      backdrop-blur-xl
      border border-[var(--border-glass)]
      ${hoverEffect ? 'hover:border-[var(--accent)]/30 hover:bg-[var(--bg-elevated)]' : ''}
    `,
    elevated: `
      bg-[var(--bg-elevated)]
      border border-[var(--border-glass)]
      shadow-lg shadow-black/20
      ${hoverEffect ? 'hover:shadow-xl hover:shadow-[var(--shadow-accent)] hover:-translate-y-1' : ''}
    `,
    gradient: `
      ${gradient || 'bg-[var(--gradient-power)]'}
      text-[var(--text-inverted)]
      shadow-2xl
      ${hoverEffect ? 'hover:scale-[1.02] hover:shadow-[var(--shadow-accent)]' : ''}
    `,
    interactive: `
      bg-[var(--bg-elevated)]
      border border-[var(--border-glass)]
      cursor-pointer
      ${hoverEffect ? 'hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 hover:-translate-y-1' : ''}
    `,

  };

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}

// Subcomponent for gradient border effect
export function GradientBorderCard({
  children,
  className = '',
  padding = 'lg',
}: {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  return (
    <div className={`relative p-[1px] rounded-3xl bg-gradient-to-br from-violet-500/50 via-fuchsia-500/50 to-amber-500/50 ${className}`}>
      <div className={`bg-[var(--bg-elevated)] rounded-3xl ${paddingStyles[padding]}`}>
        {children}
      </div>
    </div>
  );
}
