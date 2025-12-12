/**
 * GradientText Component - Reusable gradient text styling
 * SOLID: Single responsibility for text gradient effects
 */

import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  variant?: 'brand' | 'amber' | 'violet' | 'custom';
  customGradient?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  className?: string;
}

const gradientStyles = {
  brand: 'bg-[image:var(--gradient-main)]',
  amber: 'bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600',
  violet: 'bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-500',
  custom: '',
};

export default function GradientText({
  children,
  variant = 'brand',
  customGradient,
  as: Component = 'span',
  className = ''
}: GradientTextProps) {
  const gradient = variant === 'custom' && customGradient
    ? customGradient
    : gradientStyles[variant];

  return (
    <Component className={`
      ${gradient}
      bg-clip-text text-transparent
      ${className}
    `}>
      {children}
    </Component>
  );
}
