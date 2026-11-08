import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  calculateTotals,
  formatDuration,
  formatPrice,
  formatSessionDate,
} from "@/lib/demo/fifo";
import type { Buyer, DemoOrder, DemoProduct } from "@/lib/demo/types";
import { BuyerTable } from "./buyer-table";

type PostLivePanelProps = {
  products: DemoProduct[];
  orders: DemoOrder[];
  buyers: Buyer[];
  startedAt: number | null;
  endedAt: number | null;
  onExport: () => void;
  onOpenWhatsApp: (buyer: Buyer) => void;
  onAudit: () => void;
  onReset: () => void;
};

export function PostLivePanel({
  products,
  orders,
  buyers,
  startedAt,
  endedAt,
  onExport,
  onOpenWhatsApp,
  onAudit,
  onReset,
}: PostLivePanelProps) {
  const totals = calculateTotals(orders);
  const duration = formatDuration((endedAt ?? Date.now()) - (startedAt ?? Date.now()));
  const soldProducts = products.filter((product) => product.stockDisponible === 0).length;

  const metrics = [
    {
      label: "Total a cobrar",
      value: formatPrice(totals.revenue),
      tone: "lime" as const,
    },
    {
      label: "Prendas adjudicadas",
      value: String(totals.adjudicated).padStart(2, "0"),
      tone: "lime" as const,
    },
    {
      label: "Demanda en espera",
      value: String(totals.waitlist).padStart(2, "0"),
      tone: totals.waitlist > 0 ? ("coral" as const) : ("bone" as const),
    },
    {
      label: "Compradores únicos",
      value: String(totals.buyers).padStart(2, "0"),
      tone: "bone" as const,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-violet">
            Paso 03 · Post-Live
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em]">
            Cierre listo para cobrar.
          </h3>
          <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-bone/45">
            La matriz consolida a cada comprador con sus prendas, teléfono y total. Exportá el
            CSV o prepará el cobro por WhatsApp.
          </p>
          <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.14em] text-bone/25">
            {formatSessionDate(startedAt)} · {duration} · {soldProducts} productos agotados
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={onExport} disabled={buyers.length === 0} size="sm" arrow>
            Exportar CSV
          </Button>
          <Button variant="secondary" onClick={onAudit} size="sm">
            Ver auditoría
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

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-bone/10 bg-bone/10 sm:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-obsidian p-3.5 sm:p-4">
            <p
              className={cn(
                "font-display text-2xl font-bold tracking-[-0.05em] sm:text-3xl",
                metric.tone === "lime"
                  ? "text-lime"
                  : metric.tone === "coral"
                    ? "text-coral"
                    : "text-bone",
              )}
            >
              {metric.value}
            </p>
            <p className="mt-1 text-[10px] leading-snug text-bone/35">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-bone/10 bg-obsidian/35 p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 px-0.5 pb-3">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/40">
              Matriz de compradores
            </p>
            <p className="mt-0.5 text-[11px] text-bone/30">
              Un registro por persona, listo para cobrar
            </p>
          </div>
          <span className="rounded-md border border-lime/20 bg-lime/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-lime">
            {String(buyers.length).padStart(2, "0")} compradores
          </span>
        </div>

        <BuyerTable buyers={buyers} onOpenWhatsApp={onOpenWhatsApp} />
      </div>

      {totals.waitlist > 0 && (
        <div className="flex flex-col gap-1.5 rounded-xl border border-coral/20 bg-coral/[0.035] p-3.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-bone/55">
            <span className="font-mono text-coral">{totals.waitlist}</span> pedidos quedaron en
            espera sin stock. No se incluyen en el cobro.
          </p>
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-coral/70">
            Demanda real del live
          </span>
        </div>
      )}

      <p className="font-mono text-[8px] leading-relaxed tracking-[0.12em] text-bone/20">
        El CSV incluye usuario, teléfono, prendas, cantidad y total. No se envía ningún mensaje
        real.
      </p>
    </div>
  );
}
