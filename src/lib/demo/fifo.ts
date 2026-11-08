import type { Buyer, DemoOrder } from "./types";

function pad(value: number, length = 2) {
  return value.toString().padStart(length, "0");
}

const PHONE_REGEX = /\b(?:\+?\d{1,3})?\s*(?:9\s*)?(\d{8,12})\b/;

const STOPWORDS = new Set([
  "HOLA",
  "BUENAS",
  "GRACIAS",
  "SI",
  "NO",
  "MIO",
  "QUIERO",
  "LO",
  "PIDO",
  "YO",
  "TIENEN",
  "TIENE",
  "TALLE",
  "TALLES",
  "QUEDA",
  "QUEDAN",
  "EL",
  "LA",
  "LOS",
  "LAS",
  "DE",
  "DEL",
  "POR",
  "FAVOR",
  "PORFA",
  "DIJE",
  "PRIMERO",
  "UN",
  "UNA",
  "UNO",
  "COMO",
  "ESTAS",
  "ESTA",
  "ES",
  "ME",
  "MI",
  "PARA",
  "SIGUE",
  "HAY",
]);

export type ParsedMessage = {
  codigo: string;
  telefono: string | null;
};

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function parsePurchaseMessage(text: string): ParsedMessage | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const phoneMatch = trimmed.match(PHONE_REGEX);
  const telefono = phoneMatch ? phoneMatch[0].replace(/[\s-]/g, "") : null;
  const withoutPhone = phoneMatch ? trimmed.replace(phoneMatch[0], " ") : trimmed;

  const tokens = normalize(withoutPhone).toUpperCase().split(" ").filter(Boolean);
  const codigo = tokens.find((token) => !STOPWORDS.has(token) && !/^\d{1,3}$/.test(token));

  if (!codigo) return null;

  return { codigo, telefono };
}

export function formatPrice(value: number) {
  const formatted = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${formatted}`;
}

export function formatTimecode(ms: number) {
  const total = Math.max(0, Math.floor(ms));
  const hours = Math.floor(total / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const seconds = Math.floor((total % 60_000) / 1000);
  const millis = total % 1000;

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(millis, 3)}`;
}

export function formatDuration(ms: number) {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${pad(minutes)}:${pad(seconds)}`;
}

export function formatSessionDate(timestamp: number | null) {
  if (!timestamp) return "Sesión sin iniciar";

  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(timestamp));
}

export function formatPhone(phone: string | null) {
  if (!phone) return "Sin teléfono";

  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+54 9 ${digits.slice(0, 3)} ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return phone;
}

export function buildBuyers(orders: DemoOrder[]): Buyer[] {
  const buyers = new Map<string, Buyer>();

  for (const order of orders) {
    if (order.estado !== "adjudicado") continue;

    const existing = buyers.get(order.username);

    if (existing) {
      existing.items.push(order.codigo);
      existing.total += order.precio;
      if (!existing.telefono && order.telefono) existing.telefono = order.telefono;
      continue;
    }

    buyers.set(order.username, {
      username: order.username,
      telefono: order.telefono,
      items: [order.codigo],
      total: order.precio,
      primeraCompra: order.timecode,
    });
  }

  return Array.from(buyers.values());
}

export function calculateTotals(orders: DemoOrder[]) {
  const adjudicated = orders.filter((order) => order.estado === "adjudicado");
  const waitlist = orders.filter((order) => order.estado === "espera");

  return {
    revenue: adjudicated.reduce((total, order) => total + order.precio, 0),
    adjudicated: adjudicated.length,
    waitlist: waitlist.length,
    buyers: new Set(adjudicated.map((order) => order.username)).size,
  };
}
