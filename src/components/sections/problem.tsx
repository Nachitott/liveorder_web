import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { whatsappUrl } from "@/content/site";
import { cn } from "@/lib/utils";

const stats = [
  {
    value: "30%",
    label: "de los pedidos se pierde entre comentarios",
    tone: "coral",
  },
  {
    value: "2–3 h",
    label: "de trabajo manual después de cada live",
    tone: "coral",
  },
  {
    value: "1 regla",
    label: "FIFO clara, auditable y sin discusiones",
    tone: "lime",
  },
  {
    value: "1 clic",
    label: "para exportar la lista lista para cobrar",
    tone: "lime",
  },
] as const;

const pains = [
  {
    index: "01",
    metric: "30%",
    title: "Chat saturado",
    body: "Los comentarios pasan tan rápido que los pedidos se pierden antes de que puedas leerlos.",
  },
  {
    index: "02",
    metric: "2–3 h",
    title: "Tres horas después",
    body: "Terminás el live y te quedan horas pasando pedidos a mano a un cuaderno o a Excel.",
  },
  {
    index: "03",
    metric: "Sobreventa",
    title: "Stock que ya no está",
    body: "Prometés una prenda que se agotó y generás reclamos que dañan tu reputación.",
  },
  {
    index: "04",
    metric: "Disputas",
    title: "¿Quién llegó primero?",
    body: "El chat discute por prelación y la desconfianza se instala en plena transmisión.",
  },
] as const;

const chaosMessages = [
  { user: "@mica.g", text: "Mío 4", rotate: -1.5, opacity: 0.9, lost: false },
  { user: "@juli.r", text: "Yo dije primero", rotate: 1.2, opacity: 0.7, lost: true },
  { user: "@sofi.m", text: "Mío talle M", rotate: -0.8, opacity: 0.8, lost: false },
  { user: "@luz.v", text: "¿Queda el negro?", rotate: 1.8, opacity: 0.55, lost: true },
  { user: "@vale.c", text: "Quiero 2", rotate: -2.1, opacity: 0.45, lost: true },
] as const;

const orderRows = [
  {
    position: "01",
    user: "mica.g",
    comment: "Mío 4",
    time: "12.408",
    state: "Adjudicado",
  },
  {
    position: "02",
    user: "juli.r",
    comment: "Yo quiero 4",
    time: "12.412",
    state: "En espera",
  },
  {
    position: "03",
    user: "sofi.m",
    comment: "Mío talle M",
    time: "12.468",
    state: "En espera",
  },
] as const;

export function Problem() {
  return (
    <section id="problema" className="relative scroll-mt-24 border-b border-bone/10">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            index="01"
            kicker="El problema"
            title={
              <>
                El live dura dos horas.
                <br />
                <span className="text-coral">El desorden, tres.</span>
              </>
            }
            description="No perdés ventas por vender mal. Las perdés porque el chat va más rápido que cualquier planilla, cuaderno o memoria."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-bone/10 bg-bone/10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-obsidian p-5 sm:p-6">
              <p
                className={cn(
                  "font-display text-3xl font-bold tracking-[-0.05em] sm:text-4xl",
                  stat.tone === "coral" ? "text-coral" : "text-lime",
                )}
              >
                {stat.value}
              </p>
              <p className="mt-2 max-w-[17ch] text-xs leading-relaxed text-bone/40">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {pains.map((pain, index) => (
            <Reveal key={pain.index} delay={index * 0.06}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-bone/10 bg-graphite/40 p-6 transition-colors duration-500 hover:border-coral/30 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-coral">
                    {pain.index}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-bone/25">
                    {pain.metric}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-[-0.04em]">
                  {pain.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-bone/45">
                  {pain.body}
                </p>
                <span
                  aria-hidden
                  className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-coral/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-3 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-coral/15 bg-coral/[0.035] p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-coral">
                    Sin LiveOrder
                  </p>
                  <p className="mt-1.5 font-display text-lg font-semibold tracking-[-0.03em]">
                    Chat, papel y memoria.
                  </p>
                </div>
                <Badge className="border-coral/30 bg-coral/10 text-coral">Caos</Badge>
              </div>

              <div className="mt-6 space-y-2">
                {chaosMessages.map((message) => (
                  <div
                    key={message.user}
                    className="flex items-center gap-2.5 rounded-lg border border-bone/[0.06] bg-bone/[0.03] px-3 py-2.5"
                    style={{
                      transform: `rotate(${message.rotate}deg)`,
                      opacity: message.opacity,
                    }}
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-steel font-mono text-[8px] text-bone/45">
                      {message.user.slice(1, 3).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[10px] text-bone/45">{message.user}</p>
                      <p className="truncate text-xs text-bone/70">{message.text}</p>
                    </div>
                    {message.lost && (
                      <span className="ml-auto shrink-0 font-mono text-[8px] uppercase tracking-[0.12em] text-coral/60">
                        sin leer
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                <span className="rounded-full border border-coral/20 bg-coral/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-coral">
                  30% perdido
                </span>
                <span className="rounded-full border border-coral/20 bg-coral/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-coral">
                  horas después
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-lime/20 bg-lime/[0.035] p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-lime">
                    Con LiveOrder
                  </p>
                  <p className="mt-1.5 font-display text-lg font-semibold tracking-[-0.03em]">
                    Orden exacto, en vivo.
                  </p>
                </div>
                <Badge variant="lime">En orden</Badge>
              </div>

              <div className="mt-6 space-y-2">
                {orderRows.map((row) => (
                  <div
                    key={row.position}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg border px-3 py-2.5",
                      row.state === "Adjudicado"
                        ? "border-lime/20 bg-lime/[0.06]"
                        : "border-bone/[0.06] bg-bone/[0.03]",
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[9px] tabular-nums",
                        row.state === "Adjudicado" ? "text-lime" : "text-bone/25",
                      )}
                    >
                      {row.position}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[10px] text-bone/45">@{row.user}</p>
                      <p className="truncate text-xs text-bone/75">“{row.comment}”</p>
                    </div>
                    <div className="ml-auto shrink-0 text-right">
                      <p className="font-mono text-[8px] tabular-nums text-bone/30">
                        00:00:{row.time}
                      </p>
                      <p
                        className={cn(
                          "font-mono text-[8px] uppercase tracking-[0.12em]",
                          row.state === "Adjudicado" ? "text-lime" : "text-bone/25",
                        )}
                      >
                        {row.state}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6">
                <div className="flex items-center justify-between rounded-xl border border-lime/15 bg-obsidian/40 px-3 py-2.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-lime/70">
                    Lista lista para cobrar
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-bone/35">
                    Export · 1 clic
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-lime/20 bg-lime/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <p className="font-display text-xl font-semibold tracking-[-0.035em] sm:text-2xl">
                No es un problema de esfuerzo. Es un problema de sistema.
              </p>
              <p className="mt-1.5 text-sm text-bone/45">
                LiveOrder pone reglas claras donde hoy hay memoria, suerte y capturas de
                pantalla.
              </p>
            </div>
            <Button
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="shrink-0"
              arrow
            >
              Quiero ordenar mi live
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
