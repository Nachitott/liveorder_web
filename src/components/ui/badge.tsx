import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  live: "border-coral/30 bg-coral/10 text-coral",
  lime: "border-lime/30 bg-lime/10 text-lime",
  outline: "border-bone/15 bg-transparent text-bone/60",
  muted: "border-bone/10 bg-bone/5 text-bone/55",
} as const;

type BadgeProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  dot?: boolean;
};

export function Badge({ children, variant = "outline", className, dot }: BadgeProps) {
  const showDot = dot ?? variant === "live";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[9px] font-medium uppercase leading-none tracking-[0.18em]",
        variants[variant],
        className,
      )}
    >
      {showDot && (
        <span
          aria-hidden
          className={cn(
            "size-1.5 rounded-full",
            variant === "live" ? "animate-pulse-live bg-coral" : "bg-lime",
          )}
        />
      )}
      {children}
    </span>
  );
}
