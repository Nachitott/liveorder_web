"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SignalBars } from "@/components/brand/signal-bars";
import { cn } from "@/lib/utils";
import type { ChatMessage, ChatResult } from "@/lib/demo/types";

const resultStyles: Record<ChatResult, string> = {
  adjudicado: "border-lime/25 bg-lime/[0.07]",
  espera: "border-coral/25 bg-coral/[0.06]",
  ignorado: "border-transparent bg-bone/[0.025]",
};

const resultLabels: Record<ChatResult, string> = {
  adjudicado: "Adjudicado",
  espera: "En espera",
  ignorado: "Ignorado",
};

const resultTextStyles: Record<ChatResult, string> = {
  adjudicado: "text-lime",
  espera: "text-coral",
  ignorado: "text-bone/25",
};

export function ChatFeed({ messages }: { messages: ChatMessage[] }) {
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    node.scrollTo({
      top: node.scrollHeight,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [messages.length, reduce]);

  return (
    <div
      ref={scrollRef}
      data-lenis-prevent
      role="log"
      aria-live="polite"
      aria-label="Chat simulado del live"
      className="h-[300px] overflow-y-auto rounded-xl border border-bone/10 bg-obsidian/60 p-2.5 sm:h-[340px]"
    >
      {messages.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
          <SignalBars />
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/30">
            Esperando el primer comentario
          </p>
        </div>
      ) : (
        <div className="space-y-1.5">
          {messages.slice(-40).map((message) => (
            <motion.div
              key={message.id}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "flex items-start gap-2.5 rounded-lg border px-2.5 py-2",
                resultStyles[message.resultado],
              )}
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-steel font-mono text-[8px] text-bone/55">
                {message.username.slice(0, 2).toUpperCase()}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="text-[10px] font-medium text-bone/60">
                    @{message.username}
                  </span>
                  <span className="font-mono text-[8px] tabular-nums tracking-[0.04em] text-bone/25">
                    {message.timecode}
                  </span>
                </div>
                <p className="mt-0.5 break-words text-xs leading-relaxed text-bone/85">
                  {message.texto}
                </p>
              </div>

              <span
                className={cn(
                  "shrink-0 pt-0.5 font-mono text-[7px] uppercase tracking-[0.12em] sm:text-[8px]",
                  resultTextStyles[message.resultado],
                )}
              >
                {resultLabels[message.resultado]}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
