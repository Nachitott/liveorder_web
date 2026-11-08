import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-lime text-obsidian hover:bg-bone hover:shadow-[0_0_32px_-6px_rgba(200,255,61,0.55)]",
  secondary:
    "border border-bone/15 bg-transparent text-bone hover:border-lime/60 hover:text-lime",
  ghost: "text-bone/65 hover:bg-bone/5 hover:text-bone",
} as const;

const sizes = {
  sm: "h-9 px-4 text-[10px]",
  md: "h-11 px-5 text-[11px]",
  lg: "h-12 px-6 text-xs",
} as const;

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  arrow?: boolean;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className="size-3.5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    >
      <path
        d="M4 12L12 4M12 4H5.5M12 4V10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  arrow = false,
  target,
  rel,
  type = "button",
  disabled,
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "group inline-flex select-none items-center justify-center gap-2 rounded-xl font-mono font-semibold uppercase leading-none tracking-[0.14em] transition-all duration-300 ease-[var(--ease-out-expo)] disabled:pointer-events-none disabled:opacity-40",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
