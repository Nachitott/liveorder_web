import { cn } from "@/lib/utils";
import type { DemoOrder } from "@/lib/demo/types";

export function OrderQueue({ orders }: { orders: DemoOrder[] }) {
  const adjudicated = orders.filter((order) => order.estado === "adjudicado").length;
  const waitlist = orders.filter((order) => order.estado === "espera").length;
  const visible = orders.slice(-14).reverse();

  return (
    <div className="rounded-xl border border-bone/10 bg-obsidian/50 p-3.5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/35">
            Cola FIFO
          </p>
          <p className="mt-0.5 text-[11px] text-bone/30">Orden exacto de llegada</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-md border border-lime/20 bg-lime/10 px-1.5 py-1 font-mono text-[8px] tabular-nums text-lime">
            {String(adjudicated).padStart(2, "0")} OK
          </span>
          <span className="rounded-md border border-coral/20 bg-coral/10 px-1.5 py-1 font-mono text-[8px] tabular-nums text-coral">
            {String(waitlist).padStart(2, "0")} ESP
          </span>
        </div>
      </div>

      <div
        data-lenis-prevent
        aria-live="polite"
        aria-label="Cola de pedidos adjudicados y en espera"
        className="mt-3 max-h-[246px] space-y-1.5 overflow-y-auto pr-0.5"
      >
        {visible.length === 0 ? (
          <div className="grid h-[150px] place-items-center rounded-lg border border-dashed border-bone/10">
            <p className="max-w-[22ch] text-center font-mono text-[8px] uppercase leading-relaxed tracking-[0.16em] text-bone/25">
              La cola se llena con el primer código válido
            </p>
          </div>
        ) : (
          visible.map((order) => (
            <div
              key={order.id}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-2 py-1.5",
                order.estado === "adjudicado"
                  ? "border-lime/15 bg-lime/[0.045]"
                  : "border-coral/15 bg-coral/[0.035]",
              )}
            >
              <span
                className={cn(
                  "w-6 shrink-0 font-mono text-[8px] tabular-nums",
                  order.estado === "adjudicado" ? "text-lime/70" : "text-coral/70",
                )}
              >
                {String(order.secuencia).padStart(2, "0")}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] text-bone/65">@{order.username}</p>
                <p className="truncate font-mono text-[8px] text-bone/30">
                  {order.codigo} · {order.timecode}
                </p>
              </div>

              <span
                className={cn(
                  "shrink-0 font-mono text-[7px] uppercase tracking-[0.12em]",
                  order.estado === "adjudicado" ? "text-lime" : "text-coral",
                )}
              >
                {order.estado === "adjudicado" ? "Adjudicado" : "En espera"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
