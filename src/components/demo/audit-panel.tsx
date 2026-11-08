import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  calculateTotals,
  formatDuration,
  formatPhone,
  formatPrice,
  formatSessionDate,
} from "@/lib/demo/fifo";
import type { DemoOrder, DemoProduct } from "@/lib/demo/types";

type AuditPanelProps = {
  products: DemoProduct[];
  orders: DemoOrder[];
  startedAt: number | null;
  endedAt: number | null;
  onBack: () => void;
  onReset: () => void;
};

export function AuditPanel({
  products,
  orders,
  startedAt,
  endedAt,
  onBack,
  onReset,
}: AuditPanelProps) {
  const totals = calculateTotals(orders);
  const duration = formatDuration((endedAt ?? Date.now()) - (startedAt ?? Date.now()));

  const summary = [
    { label: "Inicio de sesión", value: formatSessionDate(startedAt) },
    { label: "Duración", value: duration },
    { label: "Prendas adjudicadas", value: String(totals.adjudicated).padStart(2, "0") },
    { label: "Pedidos en espera", value: String(totals.waitlist).padStart(2, "0") },
    { label: "Compradores únicos", value: String(totals.buyers).padStart(2, "0") },
    { label: "Total a cobrar", value: formatPrice(totals.revenue) },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-violet">
            Paso 04 · Auditoría
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em]">
            Cada pedido tiene su marca de tiempo.
          </h3>
          <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-bone/45">
            El historial de la sesión queda ordenado y verificable: quién pidió, cuándo, qué
            código y en qué estado terminó.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" onClick={onBack} size="sm">
            Volver al cierre
          </Button>
          <button
            type="button"
            onClick={onReset}
            className="font-mono text-[8px] uppercase tracking-[0.14em] text-bone/30 transition-colors hover:text-bone/60"
          >
            Reiniciar demo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-bone/10 bg-bone/10 sm:grid-cols-3">
        {summary.map((item) => (
          <div key={item.label} className="bg-obsidian p-3.5">
            <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-bone/30">
              {item.label}
            </p>
            <p
              className={cn(
                "mt-1.5 text-sm font-semibold tabular-nums",
                item.label === "Total a cobrar" ? "font-mono text-lime" : "text-bone/80",
              )}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-bone/10 bg-obsidian/35 p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 px-0.5 pb-3">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/40">
              Historial de pedidos
            </p>
            <p className="mt-0.5 text-[11px] text-bone/30">
              Orden de llegada con prelación exacta
            </p>
          </div>
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-bone/25">
            {String(orders.length).padStart(2, "0")} eventos
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="grid min-h-32 place-items-center rounded-lg border border-dashed border-bone/10">
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-bone/25">
              No se registraron pedidos en esta sesión
            </p>
          </div>
        ) : (
          <div
            data-lenis-prevent
            className="max-h-[300px] overflow-auto rounded-lg border border-bone/10"
          >
            <table className="w-full min-w-[620px] text-left">
              <thead className="sticky top-0 z-10 bg-ink">
                <tr className="border-b border-bone/10">
                  {["#", "Hora", "Comprador", "Código", "Teléfono", "Estado"].map(
                    (heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-3 py-2.5 font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-bone/30"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-bone/[0.06] last:border-0 hover:bg-bone/[0.02]"
                  >
                    <td className="px-3 py-2.5 font-mono text-[9px] tabular-nums text-bone/35">
                      {String(order.secuencia).padStart(2, "0")}
                    </td>
                    <td className="px-3 py-2.5 font-mono text-[9px] tabular-nums text-bone/40">
                      {order.timecode}
                    </td>
                    <td className="px-3 py-2.5 text-[11px] text-bone/70">
                      @{order.username}
                    </td>
                    <td className="px-3 py-2.5 font-mono text-[9px] text-violet">
                      {order.codigo}
                    </td>
                    <td className="px-3 py-2.5 font-mono text-[9px] text-bone/45">
                      {formatPhone(order.telefono)}
                    </td>
                    <td className="px-3 py-2.5">
                      <span
                        className={cn(
                          "rounded border px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-[0.1em]",
                          order.estado === "adjudicado"
                            ? "border-lime/20 bg-lime/10 text-lime"
                            : "border-coral/20 bg-coral/10 text-coral",
                        )}
                      >
                        {order.estado === "adjudicado" ? "Adjudicado" : "En espera"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {products.map((product) => {
          const sold = Math.max(0, product.stockInicial - product.stockDisponible);

          return (
            <div key={product.id} className="rounded-xl border border-bone/10 bg-bone/[0.02] p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[8px] font-semibold tracking-[0.12em] text-violet">
                  {product.codigo}
                </span>
                <span className="font-mono text-[8px] tabular-nums text-bone/25">
                  {String(sold).padStart(2, "0")} / {String(product.stockInicial).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-1.5 truncate text-[11px] text-bone/55">{product.nombre}</p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-bone/10">
                <div
                  className={cn(
                    "h-full rounded-full",
                    product.stockDisponible === 0 ? "bg-coral" : "bg-lime",
                  )}
                  style={{
                    width: `${Math.min(
                      100,
                      (sold / Math.max(product.stockInicial, 1)) * 100,
                    )}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="font-mono text-[8px] leading-relaxed tracking-[0.12em] text-bone/20">
        Sesión efímera de demostración. Al recargar la página se reinicia el historial.
      </p>
    </div>
  );
}
