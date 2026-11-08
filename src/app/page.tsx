import { LiveClock } from "@/components/brand/live-clock";
import { Logo } from "@/components/brand/logo";
import { SignalBars } from "@/components/brand/signal-bars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Grain } from "@/components/ui/grain";
import { GridBackdrop } from "@/components/ui/grid-backdrop";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Ticket } from "@/components/ui/ticket";
import { marqueeItems, navLinks, palette, site } from "@/content/site";

const queue = [
  {
    position: "01",
    name: "Mica G.",
    comment: "Mío 4",
    time: "00:00:12.408",
    status: "Adjudicado",
    active: true,
  },
  {
    position: "02",
    name: "Juli R.",
    comment: "Yo quiero 4",
    time: "00:00:12.412",
    status: "En espera",
    active: false,
  },
  {
    position: "03",
    name: "Sofi M.",
    comment: "Mío talle M",
    time: "00:00:12.468",
    status: "En espera",
    active: false,
  },
];

const typeSpecimens = [
  {
    role: "Display",
    family: "Bricolage Grotesque",
    usage: "Titulares, números y momentos de marca.",
    sample: "Vendé en vivo.",
    className: "font-display text-4xl font-bold tracking-[-0.05em] sm:text-5xl",
  },
  {
    role: "Texto",
    family: "Space Grotesk",
    usage: "Lectura, interfaz y conversación directa.",
    sample: "Cada “mío” tiene su lugar exacto en la fila.",
    className: "font-sans text-lg leading-relaxed text-bone/65",
  },
  {
    role: "Datos",
    family: "JetBrains Mono",
    usage: "Tiempos, stock, códigos y estados del sistema.",
    sample: "00:00:12.408  ·  FIFO  ·  STOCK 02",
    className: "font-mono text-sm tracking-[0.08em] text-lime",
  },
];

export default function Home() {
  return (
    <>
      <Grain />

      <header className="sticky top-0 z-50 border-b border-bone/10 bg-obsidian/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
          <Logo />

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/45 transition-colors hover:text-lime"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Badge variant="live" className="hidden sm:inline-flex">
              {site.phase}
            </Badge>
            <Button href={`mailto:${site.contactEmail}`} size="sm" arrow>
              Acceso
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <GridBackdrop />

          <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:pt-24">
            <div className="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <SignalBars />
                  <Badge variant="lime">Live commerce OS</Badge>
                  <LiveClock className="ml-1" />
                </div>

                <h1 className="mt-8 font-display text-[clamp(3.2rem,8.4vw,7.4rem)] font-bold leading-[0.86] tracking-[-0.055em]">
                  Vendé en vivo.
                  <br />
                  <span className="text-lime">Vendé en orden.</span>
                </h1>

                <p className="mt-7 max-w-xl text-base leading-relaxed text-bone/55 sm:text-lg">
                  Identidad visual y sistema de diseño de LiveOrder OS. Precisión de sala de
                  control, energía de live y cero fricción para quien vende.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button href="#sistema" size="lg" arrow>
                    Explorar sistema
                  </Button>
                  <Button href="#identidad" variant="secondary" size="lg">
                    Ver identidad
                  </Button>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/35">
                  <span>v0.1 / Brand foundation</span>
                  <span aria-hidden className="size-1 rounded-full bg-lime" />
                  <span>Fase 01 de 05</span>
                  <span aria-hidden className="size-1 rounded-full bg-coral" />
                  <span>Hecho para vender en vivo</span>
                </div>
              </div>

              <Reveal delay={0.15}>
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_50%_30%,rgba(122,92,255,0.22),transparent_65%)] blur-2xl"
                  />
                  <Ticket className="animate-float motion-reduce:animate-none">
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">
                          Order / #0042
                        </span>
                        <Badge variant="live">En vivo</Badge>
                      </div>

                      <div className="mt-5 flex items-center gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgba(122,92,255,0.65),rgba(255,92,69,0.35))] font-display text-sm font-bold tracking-[-0.04em]">
                          BO
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-display text-lg font-semibold leading-tight tracking-[-0.03em]">
                            Buzo Oversize Negro
                          </p>
                          <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-bone/35">
                            $24.900 · TALLE M
                          </p>
                        </div>
                        <div className="ml-auto rounded-lg border border-lime/25 bg-lime/10 px-2.5 py-1.5 text-right">
                          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-lime/60">
                            Stock
                          </p>
                          <p className="font-mono text-sm font-semibold text-lime">02</p>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-dashed border-bone/10 pt-4">
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/35">
                          Cola FIFO
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-bone/35">
                          3 solicitudes
                        </span>
                      </div>

                      <ul className="mt-2 divide-y divide-bone/[0.06]">
                        {queue.map((row) => (
                          <li key={row.position} className="flex items-center gap-3 py-3">
                            <span
                              className={`font-mono text-[10px] tabular-nums ${
                                row.active ? "text-lime" : "text-bone/25"
                              }`}
                            >
                              {row.position}
                            </span>
                            <span
                              aria-hidden
                              className={`size-1.5 shrink-0 rounded-full ${
                                row.active ? "bg-lime" : "bg-bone/20"
                              }`}
                            />
                            <div className="min-w-0">
                              <p className="truncate text-xs font-medium text-bone/80">
                                {row.name}
                              </p>
                              <p className="truncate font-mono text-[9px] tracking-[0.08em] text-bone/30">
                                “{row.comment}”
                              </p>
                            </div>
                            <div className="ml-auto text-right">
                              <p className="font-mono text-[9px] tabular-nums tracking-[0.06em] text-bone/40">
                                {row.time}
                              </p>
                              <p
                                className={`mt-0.5 font-mono text-[8px] uppercase tracking-[0.16em] ${
                                  row.active ? "text-lime" : "text-bone/25"
                                }`}
                              >
                                {row.status}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex items-center gap-3 border-t border-bone/10 pt-4">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bone/10">
                          <div className="h-full w-1/2 rounded-full bg-[linear-gradient(90deg,var(--color-lime),var(--color-coral))]" />
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-bone/35">
                          Export listo
                        </span>
                      </div>
                    </div>
                  </Ticket>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <Marquee items={marqueeItems} />

        <section id="sistema" className="relative border-b border-bone/10">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:py-24">
            <Reveal>
              <SectionHeading
                index="01"
                kicker="Sistema visual"
                title={
                  <>
                    Una identidad que se siente{" "}
                    <span className="text-lime">en tiempo real.</span>
                  </>
                }
                description="Obsidiana para el foco, lima para la acción y coral para lo que está pasando ahora. Nada de colores por defecto: cada tono tiene una función dentro del sistema."
              />
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {palette.map((color, index) => (
                <Reveal key={color.name} delay={index * 0.05}>
                  <div
                    className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl border border-bone/10 p-4 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5"
                    style={{ backgroundColor: color.hex, color: color.foreground }}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] opacity-60">
                      {color.role}
                    </span>
                    <div>
                      <span
                        aria-hidden
                        className="mb-4 block size-6 rounded-full border border-current opacity-25 transition-transform duration-500 group-hover:scale-125"
                      />
                      <p className="font-display text-sm font-semibold tracking-[-0.03em]">
                        {color.name}
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] tracking-[0.1em] opacity-50">
                        {color.hex}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="identidad" className="border-b border-bone/10">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:py-24">
            <Reveal>
              <SectionHeading
                index="02"
                kicker="Tipografía"
                title={
                  <>
                    Expresiva arriba.
                    <br />
                    <span className="text-stroke">Precisa abajo.</span>
                  </>
                }
                description="Una display con carácter para el impacto, una grotesca limpia para explicar y una monoespaciada para demostrar que el sistema no improvisa."
              />
            </Reveal>

            <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <Reveal>
                <div className="relative overflow-hidden rounded-2xl border border-bone/10 bg-graphite/40 p-6 sm:p-8">
                  <div className="flex items-end gap-1">
                    <span className="font-display text-[9rem] font-bold leading-[0.7] tracking-[-0.08em] sm:text-[12rem]">
                      A
                    </span>
                    <span className="font-display text-[9rem] font-bold leading-[0.7] tracking-[-0.08em] text-lime sm:text-[12rem]">
                      a
                    </span>
                  </div>
                  <div className="mt-8 flex items-end justify-between gap-4 border-t border-bone/10 pt-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/35">
                        Display / 700
                      </p>
                      <p className="mt-1 font-display text-sm font-semibold">
                        Bricolage Grotesque
                      </p>
                    </div>
                    <span className="font-mono text-[10px] text-lime">01</span>
                  </div>
                </div>
              </Reveal>

              <div className="divide-y divide-bone/10 border-y border-bone/10">
                {typeSpecimens.map((specimen, index) => (
                  <Reveal key={specimen.role} delay={index * 0.08}>
                    <div className="grid gap-4 py-6 sm:grid-cols-[120px_1fr] sm:items-center">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-lime">
                          {specimen.role}
                        </p>
                        <p className="mt-1 font-mono text-[9px] tracking-[0.08em] text-bone/35">
                          {specimen.family}
                        </p>
                      </div>
                      <div>
                        <p className={specimen.className}>{specimen.sample}</p>
                        <p className="mt-2 text-xs text-bone/35">{specimen.usage}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <Reveal>
                <div className="mb-6 flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-[0.22em] text-lime">03</span>
                  <span className="h-px w-10 bg-bone/20" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40">
                    Marca
                  </span>
                </div>
              </Reveal>

              <div className="grid gap-3 md:grid-cols-3">
                <Reveal>
                  <div className="flex min-h-56 flex-col justify-between rounded-2xl border border-bone/10 bg-graphite/50 p-6">
                    <Logo className="animate-float motion-reduce:animate-none" />
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/35">
                      Principal / fondo oscuro
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.08}>
                  <div
                    className="flex min-h-56 flex-col justify-between rounded-2xl border border-lime/30 p-6"
                    style={{ backgroundColor: "var(--color-lime)" }}
                  >
                    <Logo variant="mark" tone="dark" markClassName="size-14" />
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-obsidian/50">
                      Isotipo / fondo lima
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.16}>
                  <div
                    className="flex min-h-56 flex-col justify-between rounded-2xl border border-bone/20 p-6"
                    style={{ backgroundColor: "var(--color-bone)" }}
                  >
                    <Logo tone="dark" />
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-obsidian/50">
                      Invertido / fondo claro
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section id="componentes" className="border-b border-bone/10">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:py-24">
            <Reveal>
              <SectionHeading
                index="04"
                kicker="Componentes"
                title={
                  <>
                    Piezas con <span className="text-lime">pulso propio.</span>
                  </>
                }
                description="Los componentes base ya hablan el idioma de LiveOrder: bordes de ticket, timecodes, señales de estado y microinteracciones con intención."
              />
            </Reveal>

            <div className="mt-12 grid gap-3 lg:grid-cols-2">
              <Reveal>
                <div className="h-full rounded-2xl border border-bone/10 bg-graphite/40 p-6 sm:p-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone/35">
                    Acciones
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Button arrow>Quiero mi acceso</Button>
                    <Button variant="secondary" arrow>
                      Ver demo
                    </Button>
                    <Button variant="ghost">Más info</Button>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-bone/10 pt-6">
                    <Button size="sm">Small</Button>
                    <Button size="sm" variant="secondary">
                      Small
                    </Button>
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-bone/30">
                      Touch targets 44px
                    </span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="h-full rounded-2xl border border-bone/10 bg-graphite/40 p-6 sm:p-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone/35">
                    Estados
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-2.5">
                    <Badge variant="live">En vivo</Badge>
                    <Badge variant="lime">Adjudicado</Badge>
                    <Badge variant="outline">En espera</Badge>
                    <Badge variant="muted">Sin stock</Badge>
                  </div>
                  <div className="mt-7 flex items-center gap-3 border-t border-bone/10 pt-6">
                    <SignalBars />
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bone/10">
                      <div className="h-full w-[68%] rounded-full bg-lime" />
                    </div>
                    <span className="font-mono text-[9px] tracking-[0.12em] text-bone/40">
                      68%
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-bone/35">
                    Los estados nunca dependen solo del color: siempre tienen texto, forma y
                    posición.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="h-full rounded-2xl border border-bone/10 bg-graphite/40 p-6 sm:p-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone/35">
                    Ticket de venta
                  </p>
                  <Ticket className="mt-6 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/35">
                          Order / #0042
                        </p>
                        <p className="mt-1.5 font-display text-xl font-semibold tracking-[-0.03em]">
                          Mica G.
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] tracking-[0.08em] text-bone/35">
                          Buzo Oversize Negro · M
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-lg font-semibold text-lime">$24.900</p>
                        <Badge variant="lime" className="mt-2">
                          Adjudicado
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-5 flex items-end justify-between gap-4 border-t border-dashed border-bone/10 pt-4">
                      <div className="flex gap-[3px]">
                        {[10, 18, 12, 22, 8, 16, 24, 12, 20, 10, 18, 14, 22, 8, 16].map(
                          (height, index) => (
                            <span
                              key={index}
                              className="w-[2px] rounded-full bg-bone/30"
                              style={{ height }}
                            />
                          ),
                        )}
                      </div>
                      <span className="font-mono text-[9px] tabular-nums tracking-[0.12em] text-bone/35">
                        00:00:12.408
                      </span>
                    </div>
                  </Ticket>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-bone/10 bg-graphite/40 p-6 sm:p-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone/35">
                    Cinta de sistema
                  </p>
                  <div className="my-8 overflow-hidden rounded-xl border border-bone/10">
                    <Marquee items={marqueeItems} speed={22} className="border-0 py-3" />
                  </div>
                  <div className="space-y-2 font-mono text-[10px] uppercase tracking-[0.16em]">
                    <div className="flex justify-between text-bone/35">
                      <span>Latencia de captura</span>
                      <span className="text-lime">&lt; 1 ms</span>
                    </div>
                    <div className="flex justify-between text-bone/35">
                      <span>Orden de llegada</span>
                      <span className="text-lime">FIFO estricto</span>
                    </div>
                    <div className="flex justify-between text-bone/35">
                      <span>Movimiento</span>
                      <span className="text-lime">Reduced-motion ready</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="motion" className="border-b border-bone/10">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:py-24">
            <Reveal>
              <SectionHeading
                index="05"
                kicker="Lenguaje de movimiento"
                title={
                  <>
                    Se mueve porque <span className="text-lime">está pasando.</span>
                  </>
                }
                description="El motion no es decoración: jerarquiza, confirma y mantiene el ritmo de un live. Siempre con salida para quienes prefieren menos estímulo."
              />
            </Reveal>

            <div className="mt-12 grid gap-3 md:grid-cols-3">
              <Reveal>
                <div className="group h-full rounded-2xl border border-bone/10 bg-graphite/40 p-6 transition-colors hover:border-lime/30">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-lime">
                      01 / Signal
                    </span>
                    <SignalBars className="scale-125" />
                  </div>
                  <p className="mt-10 font-display text-2xl font-semibold tracking-[-0.04em]">
                    Indicadores que respiran.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-bone/45">
                    Barras y pulsos comunican actividad sin robarle foco al contenido.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="group h-full rounded-2xl border border-bone/10 bg-graphite/40 p-6 transition-colors hover:border-lime/30">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-lime">
                      02 / Reveal
                    </span>
                    <span className="font-mono text-[9px] text-bone/30">EASE-OUT-EXPO</span>
                  </div>
                  <div className="mt-10 space-y-2">
                    {[100, 78, 56].map((width) => (
                      <div
                        key={width}
                        className="h-2 rounded-full bg-[linear-gradient(90deg,var(--color-lime),rgba(200,255,61,0.08))]"
                        style={{ width: `${width}%` }}
                      />
                    ))}
                  </div>
                  <p className="mt-6 font-display text-2xl font-semibold tracking-[-0.04em]">
                    Entradas con jerarquía.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-bone/45">
                    Cada bloque aparece cuando corresponde, no cuando el usuario adivina.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="group h-full rounded-2xl border border-bone/10 bg-graphite/40 p-6 transition-colors hover:border-lime/30">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-lime">
                      03 / FIFO
                    </span>
                    <Badge variant="live">Live</Badge>
                  </div>
                  <div className="mt-10 space-y-2.5 font-mono text-[10px] tracking-[0.06em]">
                    <div className="flex justify-between border-b border-bone/10 pb-2 text-lime">
                      <span>00:00:12.408</span>
                      <span>ADJUDICADO</span>
                    </div>
                    <div className="flex justify-between border-b border-bone/10 pb-2 text-bone/35">
                      <span>00:00:12.412</span>
                      <span>EN ESPERA</span>
                    </div>
                    <div className="flex justify-between text-bone/25">
                      <span>00:00:12.468</span>
                      <span>EN ESPERA</span>
                    </div>
                  </div>
                  <p className="mt-6 font-display text-2xl font-semibold tracking-[-0.04em]">
                    El tiempo es la prueba.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-bone/45">
                    Los timestamps hacen visible la justicia del sistema.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="contacto" className="relative overflow-hidden">
          <GridBackdrop className="opacity-60" />
          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:py-28">
            <Reveal>
              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="lime">Fase 01 completa</Badge>
                  <LiveClock />
                </div>
                <h2 className="mt-7 font-display text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.05em]">
                  El próximo live puede ser el primero{" "}
                  <span className="text-lime">sin caos.</span>
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-bone/55">
                  Estamos construyendo la identidad y la landing de LiveOrder OS. La próxima fase
                  convierte este sistema en la experiencia completa del producto.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button href={`mailto:${site.contactEmail}`} size="lg" arrow>
                    Quiero mi acceso
                  </Button>
                  <Button href="#sistema" variant="secondary" size="lg">
                    Volver al sistema
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-bone/10 bg-ink/40">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <Logo />
              <p className="mt-3 max-w-xs text-xs leading-relaxed text-bone/35">
                El sistema operativo del live commerce. Adjudicación exacta, stock en tiempo real
                y una salida clara para cobrar.
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/35 transition-colors hover:text-lime"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`mailto:${site.contactEmail}`}
                className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/35 transition-colors hover:text-lime"
              >
                Contacto
              </a>
            </nav>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-bone/10 pt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/25 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 LiveOrder OS. Todos los derechos reservados.</span>
            <span className="text-lime/60">Phase 01 / Brand foundation</span>
          </div>
        </div>
      </footer>
    </>
  );
}
