import { Logo } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GridBackdrop } from "@/components/ui/grid-backdrop";
import { Reveal } from "@/components/ui/reveal";
import { navLinks, site, whatsappUrl } from "@/content/site";

export function SiteFooter() {
  return (
    <>
      <section id="acceso" className="relative scroll-mt-24 overflow-hidden">
        <GridBackdrop className="opacity-70" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:py-28">
          <Reveal>
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="lime">Acceso anticipado</Badge>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/30">
                  Beta cerrada · 20 cupos
                </span>
              </div>

              <h2 className="mt-7 font-display text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.05em]">
                Tu próximo live puede ser el primero{" "}
                <span className="text-lime">sin caos.</span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-bone/55">
                Estamos abriendo 20 cupos para vendedores que quieran probar LiveOrder OS antes
                del lanzamiento. Instalás la extensión, hacés tu live y cobrás con la lista
                lista.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={whatsappUrl} target="_blank" rel="noreferrer" size="lg" arrow>
                  Quiero mi acceso
                </Button>
                <Button
                  href={`mailto:${site.contactEmail}?subject=Quiero%20acceso%20a%20LiveOrder%20OS`}
                  variant="secondary"
                  size="lg"
                >
                  Escribir por email
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[9px] uppercase tracking-[0.14em] text-bone/30">
                <span>WhatsApp {site.whatsappDisplay}</span>
                <span aria-hidden className="size-1 rounded-full bg-lime" />
                <span>{site.contactEmail}</span>
                <span aria-hidden className="size-1 rounded-full bg-coral" />
                <span>Sin comisiones por venta</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-bone/10 bg-ink/40">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <Logo />
              <p className="mt-3 max-w-xs text-xs leading-relaxed text-bone/35">
                El sistema operativo del live commerce. Adjudicación exacta, stock en tiempo
                real y una salida clara para cobrar.
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
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/35 transition-colors hover:text-lime"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${site.contactEmail}`}
                className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/35 transition-colors hover:text-lime"
              >
                Email
              </a>
            </nav>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-bone/10 pt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/25 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 LiveOrder OS. Todos los derechos reservados.</span>
            <span className="text-lime/60">Hecho para vender en vivo.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
