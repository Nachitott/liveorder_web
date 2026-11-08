import { cn } from "@/lib/utils";

export function GridBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,255,61,0.12),transparent_62%)]" />
      <div className="absolute -left-40 top-1/3 size-[420px] rounded-full bg-violet/10 blur-[120px]" />
    </div>
  );
}
