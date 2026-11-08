import { Logo } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { navLinks, whatsappUrl } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-bone/10 bg-obsidian/65 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
        <a href="#producto" aria-label="LiveOrder OS — inicio">
          <Logo />
        </a>

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
            Beta cerrada
          </Badge>
          <Button href={whatsappUrl} target="_blank" rel="noreferrer" size="sm" arrow>
            Quiero acceso
          </Button>
        </div>
      </div>
    </header>
  );
}
