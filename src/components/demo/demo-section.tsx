"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { GridBackdrop } from "@/components/ui/grid-backdrop";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { autoMessages, burstBuyers, createInitialState } from "@/lib/demo/demo-data";
import { downloadBuyersCsv } from "@/lib/demo/csv";
import { buildBuyers } from "@/lib/demo/fifo";
import { demoReducer } from "@/lib/demo/reducer";
import type { Buyer } from "@/lib/demo/types";
import { AuditPanel } from "./audit-panel";
import { DemoStepper } from "./demo-stepper";
import { LiveMonitorPanel } from "./live-monitor-panel";
import { PostLivePanel } from "./post-live-panel";
import { PreLivePanel } from "./pre-live-panel";
import { WhatsAppPreview } from "./whatsapp-preview";

export function DemoSection() {
  const [state, dispatch] = useReducer(demoReducer, undefined, createInitialState);
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const autoIndexRef = useRef(0);
  const burstTimersRef = useRef<number[]>([]);

  const buyers = buildBuyers(state.orders);

  const getOffset = () => (state.startedAt ? Date.now() - state.startedAt : 0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      burstTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      burstTimersRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (state.phase !== "live") return;
    if (!state.autoMode || !visible || reduce) return;
    if (autoIndexRef.current >= autoMessages.length) return;

    const next = autoMessages[autoIndexRef.current];

    const timer = window.setTimeout(() => {
      const offset = state.startedAt ? Date.now() - state.startedAt : 0;
      dispatch({
        type: "RECEIVE_MESSAGE",
        username: next.username,
        texto: next.texto,
        offsetMs: offset,
      });
      autoIndexRef.current += 1;

      if (autoIndexRef.current >= autoMessages.length) {
        dispatch({ type: "SET_AUTO", value: false });
      }
    }, next.delay);

    return () => window.clearTimeout(timer);
  }, [state.phase, state.autoMode, state.messages.length, state.startedAt, visible, reduce]);

  const start = () => {
    autoIndexRef.current = 0;
    dispatch({ type: "START_LIVE" });
  };

  const reset = () => {
    burstTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    burstTimersRef.current = [];
    autoIndexRef.current = 0;
    setSelectedBuyer(null);
    dispatch({ type: "RESET" });
  };

  const send = (username: string, texto: string) => {
    dispatch({ type: "SET_AUTO", value: false });
    dispatch({ type: "RECEIVE_MESSAGE", username, texto, offsetMs: getOffset() });
  };

  const burst = (codigo: string) => {
    dispatch({ type: "SET_AUTO", value: false });
    burstTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    burstTimersRef.current = [];

    burstBuyers.forEach((buyer, index) => {
      const timer = window.setTimeout(() => {
        dispatch({
          type: "RECEIVE_MESSAGE",
          username: buyer.username,
          texto: `${codigo} ${buyer.telefono}`,
          offsetMs: getOffset(),
        });
      }, index * 240);

      burstTimersRef.current.push(timer);
    });
  };

  const toggleAuto = () => {
    if (!state.autoMode && autoIndexRef.current >= autoMessages.length) return;
    dispatch({ type: "SET_AUTO", value: !state.autoMode });
  };

  const closeLive = () => {
    burstTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    burstTimersRef.current = [];
    dispatch({ type: "CLOSE_LIVE" });
  };

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="relative scroll-mt-24 overflow-hidden border-b border-bone/10"
    >
      <GridBackdrop className="opacity-60" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:py-24">
        <Reveal>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              index="02"
              kicker="Demo interactiva"
              title={
                <>
                  El flujo real,
                  <br />
                  <span className="text-violet">en 60 segundos.</span>
                </>
              }
              description="Cargá stock, mirá cómo el chat se convierte en pedidos FIFO y cerrá con la lista lista para cobrar. Sin backend ni datos reales."
            />
            <Badge variant="outline" className="w-fit shrink-0">
              Sin backend · Datos de ejemplo
            </Badge>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 rounded-2xl border border-bone/10 bg-graphite/35 p-3 shadow-[0_30px_90px_-50px_rgba(134,59,255,0.5)] sm:p-5">
            <div className="flex flex-col gap-3 border-b border-bone/10 pb-3 sm:flex-row sm:items-center sm:justify-between">
              <DemoStepper phase={state.phase} />
              <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.16em] text-bone/25 sm:pl-3">
                Demo guiada · sesión efímera
              </span>
            </div>

            <div className="pt-4">
              {state.phase === "prelive" && (
                <PreLivePanel
                  products={state.products}
                  onAdjust={(productId, delta) =>
                    dispatch({ type: "SET_STOCK", productId, delta })
                  }
                  onStart={start}
                  onReset={reset}
                />
              )}

              {state.phase === "live" && (
                <LiveMonitorPanel
                  products={state.products}
                  orders={state.orders}
                  messages={state.messages}
                  startedAt={state.startedAt}
                  autoMode={state.autoMode}
                  onSend={send}
                  onBurst={burst}
                  onToggleAuto={toggleAuto}
                  onClose={closeLive}
                  onReset={reset}
                />
              )}

              {state.phase === "postlive" && (
                <PostLivePanel
                  products={state.products}
                  orders={state.orders}
                  buyers={buyers}
                  startedAt={state.startedAt}
                  endedAt={state.endedAt}
                  onExport={() => downloadBuyersCsv(buyers)}
                  onOpenWhatsApp={setSelectedBuyer}
                  onAudit={() => dispatch({ type: "GO_TO_PHASE", phase: "audit" })}
                  onReset={reset}
                />
              )}

              {state.phase === "audit" && (
                <AuditPanel
                  products={state.products}
                  orders={state.orders}
                  startedAt={state.startedAt}
                  endedAt={state.endedAt}
                  onBack={() => dispatch({ type: "GO_TO_PHASE", phase: "postlive" })}
                  onReset={reset}
                />
              )}
            </div>
          </div>
        </Reveal>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-bone/25">
            Datos de ejemplo · el producto real corre con tu catálogo
          </p>
          <a
            href="#acceso"
            className="font-mono text-[8px] uppercase tracking-[0.14em] text-lime/70 transition-colors hover:text-lime"
          >
            Quiero mi acceso →
          </a>
        </div>
      </div>

      {selectedBuyer && (
        <WhatsAppPreview buyer={selectedBuyer} onClose={() => setSelectedBuyer(null)} />
      )}
    </section>
  );
}
