export const site = {
  name: "LiveOrder OS",
  shortName: "LiveOrder",
  tagline: "Vendé en vivo. Vendé en orden.",
  description:
    "LiveOrder adjudica cada pedido en el orden exacto, bloquea el stock agotado y te entrega la lista lista para cobrar. Sin comisiones por venta.",
  contactEmail: "nachotty2@gmail.com",
  whatsappNumber: "5493886022321",
  whatsappDisplay: "+54 9 388 602-2321",
  phase: "Phase 01",
};

export const whatsappUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  "Hola, quiero acceso a LiveOrder OS",
)}`;

export const navLinks = [
  { label: "Producto", href: "#producto" },
  { label: "El problema", href: "#problema" },
  { label: "Demo", href: "#demo" },
  { label: "Acceso", href: "#acceso" },
];

export const palette = [
  {
    name: "Obsidiana",
    role: "Base",
    hex: "#07080B",
    foreground: "#F4F1E8",
  },
  {
    name: "Grafito",
    role: "Superficie",
    hex: "#15181F",
    foreground: "#F4F1E8",
  },
  {
    name: "Acero",
    role: "Bordes",
    hex: "#222630",
    foreground: "#F4F1E8",
  },
  {
    name: "Lima señal",
    role: "Acción",
    hex: "#C8FF3D",
    foreground: "#07080B",
  },
  {
    name: "Coral live",
    role: "Alerta",
    hex: "#FF5C45",
    foreground: "#07080B",
  },
  {
    name: "Violeta marca",
    role: "Marca",
    hex: "#863BFF",
    foreground: "#F4F1E8",
  },
];

export const marqueeItems = [
  "FIFO en milisegundos",
  "Stock bloqueado",
  "Exportá en 1 clic",
  "Sin comisiones por venta",
  "Instalación inmediata",
  "Live commerce OS",
];
