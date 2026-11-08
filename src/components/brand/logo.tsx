import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "full" | "mark";
  tone?: "default" | "mono" | "dark";
  className?: string;
  markClassName?: string;
  wordClassName?: string;
};

export function Logo({
  variant = "full",
  tone = "default",
  className,
  markClassName,
  wordClassName,
}: LogoProps) {
  const primary = tone === "mono" ? "var(--color-bone)" : "var(--color-lime)";
  const accent = tone === "mono" ? "var(--color-bone)" : "var(--color-coral)";
  const markBackground = tone === "mono" ? "transparent" : "var(--color-obsidian)";
  const markStroke =
    tone === "mono"
      ? "color-mix(in srgb, var(--color-bone) 32%, transparent)"
      : "color-mix(in srgb, var(--color-bone) 16%, transparent)";
  const wordTone = tone === "dark" ? "text-obsidian" : "text-bone";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        role="img"
        aria-label={variant === "mark" ? "LiveOrder OS" : undefined}
        aria-hidden={variant === "full" ? true : undefined}
        className={cn("size-9 shrink-0", markClassName)}
      >
        <rect
          x="0.75"
          y="0.75"
          width="38.5"
          height="38.5"
          rx="10"
          fill={markBackground}
          stroke={markStroke}
          strokeWidth="1.5"
        />
        <rect x="9.25" y="21" width="4.5" height="10.5" rx="2.25" fill={primary} />
        <rect x="17.75" y="14" width="4.5" height="17.5" rx="2.25" fill={primary} />
        <rect x="26.25" y="18" width="4.5" height="13.5" rx="2.25" fill={accent} />
        <circle cx="28.5" cy="10.5" r="2.75" fill={primary} />
      </svg>

      {variant === "full" && (
        <span className="inline-flex items-baseline gap-1.5">
          <span
            className={cn(
              "font-display text-[1.3rem] font-bold leading-none tracking-[-0.055em]",
              wordTone,
              wordClassName,
            )}
          >
            LiveOrder
          </span>
          <span
            className={cn(
              "rounded-[5px] px-1.5 py-1 font-mono text-[0.5rem] font-bold leading-none tracking-[0.12em]",
              tone === "dark" ? "bg-obsidian text-lime" : "bg-lime text-obsidian",
            )}
          >
            OS
          </span>
        </span>
      )}
    </span>
  );
}
