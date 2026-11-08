import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/demo/fifo";
import type { DemoProduct } from "@/lib/demo/types";
import { ProductStockCard } from "./product-stock-card";

type PreLivePanelProps = {
  products: DemoProduct[];
  onAdjust: (productId: string, delta: number) => void;
  onStart: () => void;
  onReset: () => void;
};

export function PreLivePanel({ products, onAdjust, onStart, onReset }: PreLivePanelProps) {
  const totalStock = products.reduce((total, product) => total + product.stockDisponible, 0);
  const stockValue = products.reduce(
    (total, product) => total + product.stockDisponible * product.precio,
    0,
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.72fr]">
      <div>
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-violet">
            Paso 01 · Pre-Live
          </p>
          <h3 className="font-display text-2xl font-semibold tracking-[-0.04em]">
            Cargá el stock y sus códigos.
          </h3>
          <p className="max-w-lg text-sm leading-relaxed text-bone/45">
            Cada producto tiene un código de chat. Cuando alguien escribe ese código con su
            teléfono, el pedido entra a la cola FIFO.
          </p>
        </div>

        <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
          {products.map((product) => (
            <ProductStockCard
              key={product.id}
              product={product}
              editable
              onAdjust={(delta) => onAdjust(product.id, delta)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onReset}
          className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/30 transition-colors hover:text-bone/60"
        >
          Restaurar stock inicial
        </button>
      </div>

      <aside className="flex flex-col rounded-xl border border-bone/10 bg-obsidian/50 p-4 sm:p-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/35">
          Resumen de sesión
        </p>

        <dl className="mt-4 space-y-3">
          <div className="flex items-end justify-between gap-3 border-b border-bone/10 pb-3">
            <dt className="text-xs text-bone/40">Unidades cargadas</dt>
            <dd className="font-mono text-lg font-semibold tabular-nums text-lime">
              {String(totalStock).padStart(2, "0")}
            </dd>
          </div>
          <div className="flex items-end justify-between gap-3 border-b border-bone/10 pb-3">
            <dt className="text-xs text-bone/40">Valor del stock</dt>
            <dd className="font-mono text-sm tabular-nums text-bone/80">
              {formatPrice(stockValue)}
            </dd>
          </div>
          <div className="flex items-end justify-between gap-3">
            <dt className="text-xs text-bone/40">Productos</dt>
            <dd className="font-mono text-sm tabular-nums text-bone/80">
              {String(products.length).padStart(2, "0")}
            </dd>
          </div>
        </dl>

        <div className="mt-5 rounded-lg border border-violet/20 bg-violet/[0.06] p-3">
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-violet/80">
            Contrato del chat
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-bone/50">
            <span className="font-mono text-bone/75">CÓDIGO + TELÉFONO</span>. Ejemplo:{" "}
            <span className="font-mono text-violet">REMEM 3884112233</span>
          </p>
        </div>

        <div className="mt-auto pt-6">
          <Button onClick={onStart} disabled={totalStock === 0} className="w-full" arrow>
            Iniciar live
          </Button>
          <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.14em] text-bone/25">
            Todo ocurre en tu navegador
          </p>
        </div>
      </aside>
    </div>
  );
}
