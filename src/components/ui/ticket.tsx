import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Ticket({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "ticket-cut relative overflow-hidden rounded-2xl border border-bone/10 bg-graphite/80 backdrop-blur-xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
