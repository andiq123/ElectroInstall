import { type FC, type SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-7 h-7",
};

const iconBase = (size: IconProps["size"] = "md") => sizes[size];

export const PhoneIcon: FC<IconProps> = ({ size = "md", className = "", ...props }) => (
  <svg
    className={`${iconBase(size)} ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

export const ArrowLeftIcon: FC<IconProps> = ({ size = "md", className = "", ...props }) => (
  <svg
    className={`${iconBase(size)} ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export const MenuIcon: FC<IconProps> = ({ size = "md", className = "", ...props }) => (
  <svg
    className={`${iconBase(size)} ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const CloseIcon: FC<IconProps> = ({ size = "md", className = "", ...props }) => (
  <svg
    className={`${iconBase(size)} ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const PlusIcon: FC<IconProps> = ({ size = "md", className = "", ...props }) => (
  <svg
    className={`${iconBase(size)} ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

export const MinusIcon: FC<IconProps> = ({ size = "md", className = "", ...props }) => (
  <svg
    className={`${iconBase(size)} ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
  </svg>
);

export const BoltIcon: FC<IconProps> = ({ size = "md", className = "", ...props }) => (
  <svg
    className={`${iconBase(size)} ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
