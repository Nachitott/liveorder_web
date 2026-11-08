import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LiveOrder OS — Vendé en vivo. Vendé en orden.",
  description:
    "El sistema operativo del live commerce. LiveOrder adjudica pedidos en orden exacto, bloquea el stock agotado y te entrega la lista lista para cobrar.",
  keywords: [
    "live commerce",
    "TikTok Live",
    "ventas en vivo",
    "gestión de pedidos",
    "stock en tiempo real",
    "LiveOrder OS",
  ],
  authors: [{ name: "LiveOrder OS" }],
  openGraph: {
    title: "LiveOrder OS — Vendé en vivo. Vendé en orden.",
    description:
      "El sistema operativo del live commerce. Adjudicación FIFO, stock en tiempo real y exportación en un clic.",
    type: "website",
    locale: "es_AR",
    siteName: "LiveOrder OS",
  },
  twitter: {
    card: "summary_large_image",
    title: "LiveOrder OS — Vendé en vivo. Vendé en orden.",
    description:
      "El sistema operativo del live commerce. Adjudicación FIFO, stock en tiempo real y exportación en un clic.",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-obsidian">
      <body
        className={`${bricolage.variable} ${space.variable} ${jetbrains.variable} min-h-screen bg-obsidian font-sans text-bone antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
