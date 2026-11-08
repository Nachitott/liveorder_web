import { SignalBars } from "@/components/brand/signal-bars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GridBackdrop } from "@/components/ui/grid-backdrop";
import { Reveal } from "@/components/ui/reveal";
import { HeroLive } from "@/components/sections/hero-live";
import { whatsappUrl } from "@/content/site";

const trustPoints = [
  "Sin comisiones por venta",
  "Extensión liviana",
  "Compatible con TikTok Live",
];

export function Hero() {
  return (
    <section id="producto" className="relative scroll-mt-24 overflow-hidden">
      <GridBackdrop />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:pt-20">
        <div className="grid gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <SignalBars />
              <Badge variant="live">Beta cerrada · 20 vendedores</Badge>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/30">
                Live commerce OS
              </span>
            </div>

            <h1 className="mt-8 font-display text-[clamp(3.2rem,8.4vw,7.4rem)] font-bold leading-[0.86] tracking-[-0.055em]">
              Vendé en vivo.
              <br />
              <span className="text-lime">Vendé en orden.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-bone/55 sm:text-lg">
              LiveOrder adjudica cada “mío” en el orden exacto, bloquea el stock agotado y te
              entrega la lista lista para cobrar. Sin comisiones. Sin cuaderno. Sin caos.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={whatsappUrl} target="_blank" rel="noreferrer" size="lg" arrow>
                Quiero mi acceso
              </Button>
              <Button href="#problema" variant="secondary" size="lg">
                Ver el problema
              </Button>
            </div>

            <ul className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2">
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-bone/35"
                >
                  <span aria-hidden className="size-1 rounded-full bg-lime" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={0.12}>
            <HeroLive />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
