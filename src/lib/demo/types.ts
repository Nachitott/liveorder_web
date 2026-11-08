export type DemoPhase = "prelive" | "live" | "postlive" | "audit";

export type OrderStatus = "adjudicado" | "espera";

export type ChatResult = "adjudicado" | "espera" | "ignorado";

export type DemoProduct = {
  id: string;
  codigo: string;
  nombre: string;
  precio: number;
  stockInicial: number;
  stockDisponible: number;
};

export type DemoOrder = {
  id: string;
  productoId: string;
  codigo: string;
  nombre: string;
  precio: number;
  username: string;
  telefono: string | null;
  estado: OrderStatus;
  timecode: string;
  offsetMs: number;
  secuencia: number;
};

export type ChatMessage = {
  id: string;
  username: string;
  texto: string;
  resultado: ChatResult;
  codigo?: string;
  timecode: string;
};

export type Buyer = {
  username: string;
  telefono: string | null;
  items: string[];
  total: number;
  primeraCompra: string;
};

export type DemoState = {
  phase: DemoPhase;
  products: DemoProduct[];
  orders: DemoOrder[];
  messages: ChatMessage[];
  startedAt: number | null;
  endedAt: number | null;
  sequence: number;
  autoMode: boolean;
};

export type DemoAction =
  | { type: "SET_STOCK"; productId: string; delta: number }
  | { type: "START_LIVE" }
  | { type: "RECEIVE_MESSAGE"; username: string; texto: string; offsetMs: number }
  | { type: "CLOSE_LIVE" }
  | { type: "GO_TO_PHASE"; phase: DemoPhase }
  | { type: "SET_AUTO"; value: boolean }
  | { type: "RESET" };
