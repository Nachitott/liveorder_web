import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: ReactNode;
  description?: string;
  className?: string;
};

export function SectionHeading({
  index,
  kicker,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.22em] text-lime">{index}</span>
        <span className="h-px w-10 bg-bone/20" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40">
          {kicker}
        </span>
      </div>
      <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.045em]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-bone/55">{description}</p>
      )}
    </div>
  );
}
