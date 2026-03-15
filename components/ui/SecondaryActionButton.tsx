import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SecondaryActionButtonProps = {
  href: string;
  ariaLabel: string;
  className?: string;
  leading?: ReactNode;
  children: ReactNode;
};

export default function SecondaryActionButton({
  href,
  ariaLabel,
  className,
  leading,
  children,
}: SecondaryActionButtonProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex w-full items-center justify-center gap-3 min-h-[54px] px-8 py-3 rounded-2xl text-[0.9375rem] font-semibold text-[var(--text-primary)] bg-white border border-[var(--border-default)] shadow-sm transition-[border-color,color,transform,background-color] duration-200 hover:border-[var(--accent)] hover:text-[var(--accent-dark)] hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.99] sm:w-auto",
        className
      )}
    >
      {leading}
      <span className="tracking-tight">{children}</span>
    </a>
  );
}
