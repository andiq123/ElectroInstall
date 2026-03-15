"use client";

import type { ButtonHTMLAttributes } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonWithIconProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  text?: string;
  size?: "sm" | "md";
};

export default function ButtonWithIcon({
  text = "Let's Collaborate",
  className,
  type = "button",
  size = "md",
  ...props
}: ButtonWithIconProps) {
  const sizeClass =
    size === "sm"
      ? "h-11 px-1 ps-5 pe-13 text-[0.875rem]"
      : "h-[3.25rem] px-1 ps-6 pe-14 text-[0.9375rem]";

  return (
    <Button
      type={type}
      className={cn(
        "group relative inline-flex w-fit items-center justify-start overflow-hidden rounded-2xl border border-transparent bg-[var(--primary)] font-semibold text-white shadow-[var(--shadow-md)] cursor-pointer touch-manipulation transition-[padding,background-color,transform,box-shadow] duration-500 ease-out hover:bg-[var(--primary-hover)] hover:ps-14 hover:pe-6 active:scale-[0.99] active:ps-14 active:pe-6 focus-visible:ps-14 focus-visible:pe-6 motion-reduce:transition-none",
        sizeClass,
        className
      )}
      {...props}
    >
      <span className="relative z-10 whitespace-nowrap transition-transform duration-500 ease-out motion-reduce:transition-none">
        {text}
      </span>
      <div className="absolute right-1 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--primary)] transition-[right,transform] duration-500 ease-out group-hover:right-[calc(100%-40px)] group-hover:rotate-45 group-active:right-[calc(100%-40px)] group-active:rotate-45 group-focus-visible:right-[calc(100%-40px)] group-focus-visible:rotate-45 motion-reduce:transition-none">
        <ArrowUpRight size={16} />
      </div>
    </Button>
  );
}
