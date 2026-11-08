import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/demo/fifo";
import type { DemoProduct } from "@/lib/demo/types";

type ProductStockCardProps = {
  product: DemoProduct;
  editable?: boolean;
  onAdjust?: (delta: number) => void;
};

export function ProductStockCard({ product, editable = false, onAdjust }: ProductStockCardProps) {
  const soldOut = product.stockDisponible === 0;
  const capacity = Math.max(product.stockInicial, 1);
  const progress = Math.min(100, (product.stockDisponible / capacity) * 100);

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-xl border p-3.5 transition-colors",
        soldOut ? "border-coral/25 bg-coral/[0.035]" : "border-bone/10 bg-obsidian/50",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="inline-flex rounded-md border border-violet/30 bg-violet/10 px-2 py-1 font-mono text-[9px] font-semibold tracking-[0.16em] text-violet">
            {product.codigo}
          </span>
          <p className="mt-2.5 truncate font-display text-sm font-semibold tracking-[-0.025em]">
            {product.nombre}
          </p>
          <p className="mt-0.5 font-mono text-[9px] tracking-[0.08em] text-bone/35">
            {formatPrice(product.precio)}
          </p>
        </div>

        {editable ? (
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => onAdjust?.(-1)}
              disabled={product.stockDisponible === 0}
              aria-label={`Restar stock a ${product.nombre}`}
              className="grid size-7 place-items-center rounded-lg border border-bone/10 font-mono text-sm text-bone/55 transition-colors hover:border-coral/40 hover:text-coral disabled:pointer-events-none disabled:opacity-25"
            >
              -
            </button>
            <span
              aria-live="polite"
              className={cn(
                "w-7 text-center font-mono text-sm font-semibold tabular-nums",
                soldOut ? "text-coral" : "text-lime",
              )}
            >
              {product.stockDisponible}
            </span>
            <button
              type="button"
              onClick={() => onAdjust?.(1)}
              disabled={product.stockDisponible >= 5}
              aria-label={`Sumar stock a ${product.nombre}`}
              className="grid size-7 place-items-center rounded-lg border border-bone/10 font-mono text-sm text-bone/55 transition-colors hover:border-lime/40 hover:text-lime disabled:pointer-events-none disabled:opacity-25"
            >
              +
            </button>
          </div>
        ) : (
          <div
            className={cn(
              "shrink-0 rounded-lg border px-2 py-1.5 text-right",
              soldOut ? "border-coral/25 bg-coral/10" : "border-lime/20 bg-lime/10",
            )}
          >
            <p
              className={cn(
                "font-mono text-[7px] uppercase tracking-[0.16em]",
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
              {String(product.stockDisponible).padStart(2, "0")}
            </p>
          </div>
        )}
      </div>

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-bone/10">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            soldOut ? "bg-coral" : "bg-lime",
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-bone/25">
          {soldOut ? "Stock bloqueado" : "Disponible"}
        </span>
        <span
          className={cn(
            "font-mono text-[8px] uppercase tracking-[0.14em]",
            soldOut ? "text-coral" : "text-lime/60",
          )}
        >
          {soldOut ? "Agotado" : `${product.stockDisponible} u.`}
        </span>
      </div>
    </article>
  );
}
