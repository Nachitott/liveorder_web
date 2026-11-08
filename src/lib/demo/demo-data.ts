import type { DemoProduct, DemoState } from "./types";

export const initialProducts: DemoProduct[] = [
  {
    id: "buzo-oversize",
    codigo: "BUZO4",
    nombre: "Buzo Oversize Negro",
    precio: 24900,
    stockInicial: 2,
    stockDisponible: 2,
  },
  {
    id: "remera-essential",
    codigo: "REMEM",
    nombre: "Remera Essential Blanca",
    precio: 12900,
    stockInicial: 3,
    stockDisponible: 3,
  },
  {
    id: "pantalon-cargo",
    codigo: "PANT",
    nombre: "Pantalón Cargo Beige",
    precio: 31900,
    stockInicial: 2,
    stockDisponible: 2,
  },
];

export type AutoMessage = {
  username: string;
  texto: string;
  delay: number;
};

export const autoMessages: AutoMessage[] = [
  { username: "mica.g", texto: "BUZO4 3884112233", delay: 1500 },
  { username: "tiktok_fan_99", texto: "Hola! Tienen talles?", delay: 1400 },
  { username: "juli.r", texto: "BUZO4 3885998877", delay: 1700 },
  { username: "sofi.m", texto: "QUIERO REMEM 3886554433", delay: 1500 },
  { username: "lucas_buyer", texto: "REMEM 3884001122", delay: 1400 },
  { username: "vale.c", texto: "PANT 3887112233", delay: 1600 },
  { username: "caro.trendy", texto: "REMEM 3885998877", delay: 1500 },
  { username: "luz.v", texto: "PANT 3884112233", delay: 1400 },
  { username: "valentina_chic", texto: "REMEM 3886554433", delay: 1600 },
  { username: "marcos_live", texto: "PANT 3884001122", delay: 1500 },
];

export const burstBuyers = [
  { username: "wanda.live", telefono: "3884223344" },
  { username: "nico.fit", telefono: "3885334455" },
  { username: "anto.shop", telefono: "3886445566" },
  { username: "fede.style", telefono: "3887556677" },
  { username: "rosa.trend", telefono: "3888667788" },
] as const;

export function createInitialState(): DemoState {
  return {
    phase: "prelive",
    products: initialProducts.map((product) => ({ ...product })),
    orders: [],
    messages: [],
    startedAt: null,
    endedAt: null,
    sequence: 0,
    autoMode: true,
  };
}
