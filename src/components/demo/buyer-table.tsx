import { formatPhone, formatPrice } from "@/lib/demo/fifo";
import type { Buyer } from "@/lib/demo/types";

type BuyerTableProps = {
  buyers: Buyer[];
  onOpenWhatsApp: (buyer: Buyer) => void;
};

function PaymentButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-lime/25 bg-lime/[0.06] px-2.5 font-mono text-[8px] uppercase tracking-[0.12em] text-lime transition-colors hover:border-lime/60 hover:bg-lime/15"
    >
      <svg aria-hidden viewBox="0 0 16 16" fill="none" className="size-3">
        <path
          d="M13.3 7.5a5.3 5.3 0 0 1-7.9 4.6L2.7 13l.9-2.6a5.3 5.3 0 1 1 9.7-2.9Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
      Cobro
    </button>
  );
}

export function BuyerTable({ buyers, onOpenWhatsApp }: BuyerTableProps) {
  if (buyers.length === 0) {
    return (
      <div className="grid min-h-40 place-items-center rounded-xl border border-dashed border-bone/10 bg-bone/[0.015] p-6">
        <div className="text-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/30">
            Sin compradores adjudicados
          </p>
          <p className="mt-1.5 text-xs text-bone/25">
            Volvé al live para registrar pedidos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-x-auto rounded-xl border border-bone/10 md:block">
        <table className="w-full min-w-[620px] text-left">
          <thead>
            <tr className="border-b border-bone/10 bg-bone/[0.025]">
              {["Comprador", "Teléfono", "Prendas", "Total", ""].map((heading) => (
                <th
                  key={heading || "action"}
                  scope="col"
                  className="px-4 py-3 font-mono text-[8px] font-medium uppercase tracking-[0.16em] text-bone/30"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer) => (
              <tr
                key={buyer.username}
                className="border-b border-bone/[0.06] last:border-0 hover:bg-bone/[0.02]"
              >
                <td className="px-4 py-3">
                  <p className="text-xs font-medium text-bone/75">@{buyer.username}</p>
                  <p className="mt-0.5 font-mono text-[8px] text-bone/25">
                    Desde {buyer.primeraCompra}
                  </p>
                </td>
                <td className="px-4 py-3 font-mono text-[10px] text-bone/50">
                  {formatPhone(buyer.telefono)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {buyer.items.map((item, index) => (
                      <span
                        key={`${item}-${index}`}
                        className="rounded border border-violet/20 bg-violet/[0.07] px-1.5 py-0.5 font-mono text-[8px] text-violet"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs font-semibold tabular-nums text-lime">
                  {formatPrice(buyer.total)}
                </td>
                <td className="px-4 py-3 text-right">
                  <PaymentButton onClick={() => onOpenWhatsApp(buyer)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-2 md:hidden">
        {buyers.map((buyer) => (
          <article
            key={buyer.username}
            className="rounded-xl border border-bone/10 bg-bone/[0.02] p-3.5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium text-bone/75">@{buyer.username}</p>
                <p className="mt-0.5 font-mono text-[9px] text-bone/35">
                  {formatPhone(buyer.telefono)}
                </p>
              </div>
              <p className="shrink-0 font-mono text-xs font-semibold tabular-nums text-lime">
                {formatPrice(buyer.total)}
              </p>
            </div>
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1">
                {buyer.items.map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="rounded border border-violet/20 bg-violet/[0.07] px-1.5 py-0.5 font-mono text-[8px] text-violet"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <PaymentButton onClick={() => onOpenWhatsApp(buyer)} />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
