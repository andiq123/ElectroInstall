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
  brand: 'bg-[var(--gradient-power)]',
  amber: 'linear-gradient(135deg, var(--accent-light) 0%, var(--accent) 50%, var(--accent-dark) 100%)',
  violet: 'linear-gradient(135deg, var(--info) 0%, var(--accent-cobalt) 100%)',
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
