import { cn } from "@/lib/utils";

const heights = ["8px", "16px", "11px", "14px"];

export function SignalBars({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("inline-flex h-4 items-end gap-[3px]", className)}>
      {heights.map((height, index) => (
        <span
          key={index}
          className="w-[3px] origin-bottom animate-signal rounded-full bg-lime"
          style={{
            height,
            animationDelay: `${index * 130}ms`,
          }}
        />
      ))}
    </span>
  );
}
