import { DemoSection } from "@/components/demo/demo-section";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { Grain } from "@/components/ui/grain";
import { Marquee } from "@/components/ui/marquee";
import { marqueeItems } from "@/content/site";

export default function Home() {
  return (
    <>
      <Grain />
      <SiteHeader />

      <main className="pt-16">
        <Hero />
        <Marquee items={marqueeItems} speed={38} />
        <Problem />
        <DemoSection />
      </main>

      <SiteFooter />
    </>
  );
}
