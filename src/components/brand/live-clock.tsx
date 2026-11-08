"use client";

import { useEffect, useState } from "react";
import { cn, pad } from "@/lib/utils";

export function LiveClock({ className }: { className?: string }) {
  const [time, setTime] = useState("00:00:00.000");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${pad(
          now.getMilliseconds(),
          3,
        )}`,
      );
    };

    tick();
    const interval = window.setInterval(tick, 53);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <span
      className={cn(
        "font-mono text-[10px] tabular-nums tracking-[0.18em] text-bone/45",
        className,
      )}
    >
      {time}
    </span>
  );
}
