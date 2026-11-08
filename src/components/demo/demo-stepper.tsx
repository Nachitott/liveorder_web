import { cn } from "@/lib/utils";
import type { DemoPhase } from "@/lib/demo/types";

const steps: { phase: DemoPhase; index: string; label: string; short: string }[] = [
  { phase: "prelive", index: "01", label: "Pre-Live", short: "Stock" },
  { phase: "live", index: "02", label: "Live Monitor", short: "Live" },
  { phase: "postlive", index: "03", label: "Post-Live", short: "Cierre" },
  { phase: "audit", index: "04", label: "Auditoría", short: "Auditoría" },
];

const order: DemoPhase[] = ["prelive", "live", "postlive", "audit"];

export function DemoStepper({ phase }: { phase: DemoPhase }) {
  const current = order.indexOf(phase);

  return (
    <ol className="grid grid-cols-4 gap-1.5 sm:gap-2">
      {steps.map((step, index) => {
        const active = step.phase === phase;
        const complete = index < current;

        return (
          <li
            key={step.phase}
            className={cn(
              "flex flex-col items-start gap-1 rounded-xl border px-2 py-2 transition-colors sm:flex-row sm:items-center sm:gap-2.5 sm:px-3 sm:py-2.5",
              active
                ? "border-violet/40 bg-violet/10"
                : complete
                  ? "border-lime/20 bg-lime/[0.04]"
                  : "border-bone/10 bg-bone/[0.02]",
            )}
          >
            <span
              className={cn(
                "grid size-5 shrink-0 place-items-center rounded-md font-mono text-[8px] tabular-nums sm:size-7 sm:rounded-lg sm:text-[9px]",
                active
                  ? "bg-violet text-bone"
                  : complete
                    ? "bg-lime/15 text-lime"
                    : "bg-bone/5 text-bone/30",
              )}
            >
              {complete ? "OK" : step.index}
            </span>
            <div className="min-w-0">
              <p
                className={cn(
                  "truncate font-mono text-[7px] uppercase tracking-[0.1em] sm:text-[9px] sm:tracking-[0.14em]",
                  active ? "text-bone" : complete ? "text-lime/70" : "text-bone/30",
                )}
              >
                <span className="sm:hidden">{step.short}</span>
                <span className="hidden sm:inline">{step.label}</span>
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
