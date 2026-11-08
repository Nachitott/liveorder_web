"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LiveClock } from "@/components/brand/live-clock";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const messages = [
  { id: 1, user: "mica.g", initials: "MG", text: "Mío 4", time: "00:00:12.408" },
  { id: 2, user: "juli.r", initials: "JR", text: "Yo quiero 4", time: "00:00:12.412" },
  { id: 3, user: "sofi.m", initials: "SM", text: "Mío talle M", time: "00:00:12.468" },
];

export function HeroLive() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStep(4);
      return;
    }

    const interval = window.setInterval(() => {
      setStep((current) => (current >= 7 ? 0 : current + 1));
    }, 1800);

    return () => window.clearInterval(interval);
  }, [reduce]);

  const visible = Math.min(messages.length, step + 1);
  const adjudicated = step >= 3;
  const stock = step >= 7 ? 0 : step >= 5 ? 1 : 2;
  const soldOut = stock === 0;

  const status = soldOut
    ? "Stock bloqueado"
    : adjudicated
      ? "Pedido adjudicado"
      : "Escuchando el chat";

  const action = soldOut
    ? "Reiniciar demo"
    : step >= 5
      ? "Bloquear stock"
      : adjudicated
        ? "Confirmar venta"
        : "Adjudicar siguiente";

  const advance = () => {
    setStep((current) => {
      if (current >= 7) return 0;
      if (current < 3) return 3;
      if (current < 5) return 5;
      return 7;
    });
  };

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_50%_35%,rgba(134,59,255,0.24),transparent_62%)] blur-2xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-bone/10 bg-graphite/80 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-bone/10 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <Badge variant="live">Live</Badge>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-bone/35">
              1.2K viendo
            </span>
          </div>
          <LiveClock />
        </div>

        <div className="flex items-center gap-3 border-b border-bone/10 px-4 py-4">
          <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,rgba(134,59,255,0.72),rgba(255,92,69,0.4))] font-display text-xs font-bold tracking-[-0.04em]">
            BO
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-base font-semibold leading-tight tracking-[-0.03em]">
              Buzo Oversize Negro
            </p>
            <p className="mt-1 font-mono text-[9px] tracking-[0.14em] text-bone/35">
              $24.900 · TALLE M
            </p>
          </div>
          <div
            className={cn(
              "ml-auto rounded-lg border px-2.5 py-1.5 text-right transition-colors duration-500",
              soldOut
                ? "border-coral/30 bg-coral/10"
                : "border-lime/25 bg-lime/10",
            )}
          >
            <p
              className={cn(
                "font-mono text-[8px] uppercase tracking-[0.16em]",
                soldOut ? "text-coral/60" : "text-lime/60",
              )}
            >
              Stock
            </p>
            <p
              className={cn(
                "font-mono text-sm font-semibold tabular-nums",
                soldOut ? "text-coral" : "text-lime",
              )}
            >
              0{stock}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 pt-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/35">
            Chat en vivo
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-bone/25">
            {visible} mensajes
          </span>
        </div>

        <div className="h-[174px] overflow-hidden px-3 py-2">
          <AnimatePresence initial={false} mode="popLayout">
            {messages.slice(0, visible).map((message) => {
              const isWinner = message.id === 1 && adjudicated;

              return (
                <motion.div
                  key={message.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "mb-1.5 flex items-center gap-2.5 rounded-lg border px-2.5 py-2 transition-colors duration-500",
                    isWinner
                      ? "border-lime/25 bg-lime/[0.06]"
                      : "border-transparent bg-bone/[0.03]",
                  )}
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-steel font-mono text-[8px] text-bone/55">
                    {message.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[10px] font-medium text-bone/60">
                        @{message.user}
                      </span>
                      <span className="font-mono text-[8px] tabular-nums tracking-[0.06em] text-bone/20">
                        {message.time}
                      </span>
                    </div>
                    <p className="truncate text-xs text-bone/85">{message.text}</p>
                  </div>
                  {isWinner && (
                    <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.14em] text-lime">
                      OK
                    </span>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="border-t border-bone/10 px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/30">
              FIFO · orden exacto
            </span>
            <span
              aria-live="polite"
              className={cn(
                "font-mono text-[9px] uppercase tracking-[0.14em] transition-colors duration-500",
                soldOut ? "text-coral" : adjudicated ? "text-lime" : "text-bone/35",
              )}
            >
              {status}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bone/10">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-700",
                  soldOut
                    ? "bg-coral"
                    : "bg-[linear-gradient(90deg,var(--color-lime),var(--color-coral))]",
                )}
                style={{ width: `${(stock / 2) * 100}%` }}
              />
            </div>
            <button
              type="button"
              onClick={advance}
              className={cn(
                "inline-flex h-9 shrink-0 items-center justify-center rounded-lg px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] transition-all duration-300",
                soldOut
                  ? "bg-coral text-obsidian hover:bg-bone"
                  : "bg-lime text-obsidian hover:bg-bone",
              )}
            >
              {action}
            </button>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute -left-4 top-20 hidden rotate-[-5deg] items-center gap-2 rounded-lg border border-bone/10 bg-obsidian/80 px-3 py-2 font-mono text-[8px] tracking-[0.12em] text-bone/35 backdrop-blur sm:flex"
      >
        <span className="size-1.5 rounded-full bg-lime" />
        00:00:12.408
      </div>

      <div
        aria-hidden
        className="absolute -bottom-4 -right-3 hidden rotate-[4deg] items-center gap-2 rounded-lg border border-lime/20 bg-obsidian/85 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em] text-lime/70 backdrop-blur sm:flex"
      >
        Stock block · on
      </div>
    </div>
  );
}
