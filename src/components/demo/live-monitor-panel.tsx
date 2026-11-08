"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatTimecode } from "@/lib/demo/fifo";
import type { ChatMessage, DemoOrder, DemoProduct } from "@/lib/demo/types";
import { ChatFeed } from "./chat-feed";
import { OrderQueue } from "./order-queue";

type LiveMonitorPanelProps = {
  products: DemoProduct[];
  orders: DemoOrder[];
  messages: ChatMessage[];
  startedAt: number | null;
  autoMode: boolean;
  onSend: (username: string, texto: string) => void;
  onBurst: (codigo: string) => void;
  onToggleAuto: () => void;
  onClose: () => void;
  onReset: () => void;
};

function SessionClock({ startedAt }: { startedAt: number | null }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!startedAt) return;

    const tick = () => setElapsed(Date.now() - startedAt);
    tick();
    const interval = window.setInterval(tick, 97);
    return () => window.clearInterval(interval);
  }, [startedAt]);

  return (
    <span className="font-mono text-[10px] tabular-nums tracking-[0.14em] text-bone/45">
      {formatTimecode(elapsed)}
    </span>
  );
}

export function LiveMonitorPanel({
  products,
  orders,
  messages,
  startedAt,
  autoMode,
  onSend,
  onBurst,
  onToggleAuto,
  onClose,
  onReset,
}: LiveMonitorPanelProps) {
  const [username, setUsername] = useState("");
  const [texto, setTexto] = useState("");
  const [burstCode, setBurstCode] = useState(products[0]?.codigo ?? "");

  const totalStock = products.reduce((total, product) => total + product.stockDisponible, 0);
  const soldOut = totalStock === 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = texto.trim();
    if (!message) return;

    onSend(username.trim() || "comprador_live", message);
    setTexto("");
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge variant="live">Live</Badge>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-bone/35">
            1.2K viendo
          </span>
          <SessionClock startedAt={startedAt} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onToggleAuto}
            aria-pressed={autoMode}
            className={cn(
              "inline-flex h-8 items-center gap-2 rounded-lg border px-2.5 font-mono text-[8px] uppercase tracking-[0.14em] transition-colors",
              autoMode
                ? "border-lime/30 bg-lime/10 text-lime"
                : "border-bone/10 bg-bone/[0.03] text-bone/35",
            )}
          >
            <span
              aria-hidden
              className={cn("size-1.5 rounded-full", autoMode ? "bg-lime" : "bg-bone/30")}
            />
            Auto {autoMode ? "ON" : "OFF"}
          </button>

          <Button
            size="sm"
            variant="secondary"
            onClick={onClose}
            className="border-coral/25 text-coral hover:border-coral hover:bg-coral hover:text-obsidian"
          >
            Cerrar live
          </Button>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.18fr_0.82fr]">
        <div className="flex min-w-0 flex-col rounded-xl border border-bone/10 bg-obsidian/35 p-3">
          <div className="flex items-center justify-between gap-3 px-0.5 pb-2.5">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/40">
                Chat en vivo
              </p>
              <p className="mt-0.5 text-[11px] text-bone/30">
                Parser determinista · código + teléfono
              </p>
            </div>
            <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-bone/25">
              {String(messages.length).padStart(2, "0")} mensajes
            </span>
          </div>

          <ChatFeed messages={messages} />

          <form onSubmit={handleSubmit} className="mt-2.5 rounded-xl border border-bone/10 bg-bone/[0.02] p-2.5">
            <div className="flex flex-wrap gap-1.5">
              {products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setTexto(`${product.codigo} 3884112233`)}
                  className="rounded-md border border-violet/25 bg-violet/10 px-2 py-1 font-mono text-[8px] font-semibold tracking-[0.12em] text-violet transition-colors hover:border-violet/50 hover:bg-violet/20"
                >
                  {product.codigo}
                </button>
              ))}
            </div>

            <div className="mt-2 grid gap-1.5 sm:grid-cols-[0.72fr_1.28fr_auto]">
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="usuario"
                aria-label="Usuario de TikTok"
                className="h-9 min-w-0 rounded-lg border border-bone/10 bg-obsidian/60 px-2.5 font-mono text-[10px] text-bone placeholder:text-bone/20 focus:border-violet/50 focus:outline-none"
              />
              <input
                value={texto}
                onChange={(event) => setTexto(event.target.value)}
                placeholder="Ej: REMEM 3884112233"
                aria-label="Comentario del live"
                className="h-9 min-w-0 rounded-lg border border-bone/10 bg-obsidian/60 px-2.5 font-mono text-[10px] text-bone placeholder:text-bone/20 focus:border-violet/50 focus:outline-none"
              />
              <Button type="submit" size="sm" className="h-9">
                Enviar
              </Button>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <label
                htmlFor="burst-code"
                className="font-mono text-[8px] uppercase tracking-[0.14em] text-bone/25"
              >
                Ráfaga
              </label>
              <select
                id="burst-code"
                value={burstCode}
                onChange={(event) => setBurstCode(event.target.value)}
                className="h-8 rounded-lg border border-bone/10 bg-obsidian/60 px-2 font-mono text-[9px] text-bone/60 focus:border-violet/50 focus:outline-none"
              >
                {products.map((product) => (
                  <option key={product.id} value={product.codigo}>
                    {product.codigo} · {product.stockDisponible} u.
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => onBurst(burstCode)}
                className="inline-flex h-8 items-center rounded-lg border border-bone/10 bg-bone/[0.03] px-2.5 font-mono text-[8px] uppercase tracking-[0.12em] text-bone/45 transition-colors hover:border-lime/40 hover:text-lime"
              >
                Simular 5 compradores
              </button>
              <button
                type="button"
                onClick={onReset}
                className="ml-auto font-mono text-[8px] uppercase tracking-[0.14em] text-bone/25 transition-colors hover:text-bone/55"
              >
                Reiniciar
              </button>
            </div>
          </form>
        </div>

        <div className="min-w-0 space-y-2.5">
          <div className="rounded-xl border border-bone/10 bg-obsidian/50 p-3.5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/35">
                  Stock en vivo
                </p>
                <p className="mt-0.5 text-[11px] text-bone/30">
                  Se bloquea al llegar a cero
                </p>
              </div>
              <span
                className={cn(
                  "rounded-md border px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em]",
                  soldOut
                    ? "border-coral/25 bg-coral/10 text-coral"
                    : "border-lime/20 bg-lime/10 text-lime",
                )}
              >
                {soldOut ? "Bloqueado" : `${String(totalStock).padStart(2, "0")} u.`}
              </span>
            </div>

            <div className="mt-3 space-y-1.5">
              {products.map((product) => {
                const empty = product.stockDisponible === 0;
                const progress = Math.min(
                  100,
                  (product.stockDisponible / Math.max(product.stockInicial, 1)) * 100,
                );

                return (
                  <div
                    key={product.id}
                    className={cn(
                      "rounded-lg border px-2.5 py-2",
                      empty
                        ? "border-coral/20 bg-coral/[0.035]"
                        : "border-bone/10 bg-bone/[0.025]",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-[11px] text-bone/70">{product.nombre}</p>
                        <p className="font-mono text-[8px] tracking-[0.1em] text-violet/80">
                          {product.codigo}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "font-mono text-sm font-semibold tabular-nums",
                          empty ? "text-coral" : "text-lime",
                        )}
                      >
                        {String(product.stockDisponible).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-bone/10">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          empty ? "bg-coral" : "bg-lime",
                        )}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <OrderQueue orders={orders} />
        </div>
      </div>
    </div>
  );
}
