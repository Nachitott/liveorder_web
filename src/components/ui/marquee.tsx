import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  speed?: number;
};

function Track({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center">
          <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55">
            {item}
          </span>
          <span aria-hidden className="mx-5 size-1.5 shrink-0 rotate-45 bg-lime/70" />
        </span>
      ))}
    </div>
  );
}

export function Marquee({ items, className, speed = 32 }: MarqueeProps) {
  return (
    <div
      className={cn(
        "edge-fade-x group relative flex overflow-hidden border-y border-bone/10 bg-ink/60 py-4",
        className,
      )}
    >
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        <Track items={items} />
        <Track items={items} hidden />
      </div>
    </div>
  );
}
