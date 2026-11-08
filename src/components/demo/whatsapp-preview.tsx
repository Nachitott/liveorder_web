"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { formatPhone, formatPrice } from "@/lib/demo/fifo";
import type { Buyer } from "@/lib/demo/types";

function buildMessage(buyer: Buyer) {
  const items = buyer.items.map((item) => `- ${item}`).join("\n");

  return [
    `Hola @${buyer.username}! Tus prendas del live fueron adjudicadas:`,
    "",
    items,
    "",
    `Total a pagar: ${formatPrice(buyer.total)}`,
    `Teléfono: ${formatPhone(buyer.telefono)}`,
    "Link de pago: (demo)",
  ].join("\n");
}

export function WhatsAppPreview({ buyer, onClose }: { buyer: Buyer; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const message = buildMessage(buyer);

  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-preview-title"
    >
      <button
        type="button"
        aria-label="Cerrar vista previa"
        onClick={onClose}
        className="absolute inset-0 bg-obsidian/85 backdrop-blur-sm"
      />

      <div
        data-lenis-prevent
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-bone/15 bg-ink shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-bone/10 p-5">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-lime/70">
              Vista previa · no envía mensajes
            </p>
            <h3
              id="whatsapp-preview-title"
              className="mt-1.5 font-display text-xl font-semibold tracking-[-0.035em]"
            >
              Cobro por WhatsApp
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="grid size-8 shrink-0 place-items-center rounded-lg border border-bone/10 font-mono text-xs text-bone/40 transition-colors hover:border-bone/30 hover:text-bone"
          >
            x
          </button>
        </div>

        <div className="p-5">
          <div className="rounded-xl border border-lime/20 bg-lime/[0.045] p-4">
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-lime/60">
              Mensaje para @{buyer.username}
            </p>
            <p className="mt-3 whitespace-pre-line font-mono text-[11px] leading-relaxed text-bone/70">
              {message}
            </p>
          </div>

          <p className="mt-3 text-[11px] leading-relaxed text-bone/30">
            En el producto real este mensaje se envía desde WhatsApp. En la demo solo se
            copia al portapapeles.
          </p>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button onClick={handleCopy} className="flex-1">
              Copiar mensaje
            </Button>
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Cerrar
            </Button>
          </div>

          <p
            aria-live="polite"
            className="mt-3 min-h-4 text-center font-mono text-[8px] uppercase tracking-[0.14em] text-lime/70"
          >
            {status === "copied" && "Mensaje copiado"}
            {status === "error" && "No se pudo copiar; seleccioná el texto"}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
