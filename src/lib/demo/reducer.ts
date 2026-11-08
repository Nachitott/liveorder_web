import { createInitialState } from "./demo-data";
import { formatTimecode, parsePurchaseMessage } from "./fifo";
import type { ChatResult, DemoAction, DemoOrder, DemoState } from "./types";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "SET_STOCK": {
      if (state.phase !== "prelive") return state;

      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id !== action.productId) return product;

          const stockDisponible = clamp(product.stockDisponible + action.delta, 0, 5);

          return {
            ...product,
            stockDisponible,
            stockInicial: Math.max(product.stockInicial, stockDisponible),
          };
        }),
      };
    }

    case "START_LIVE": {
      if (state.phase !== "prelive") return state;

      return {
        ...state,
        phase: "live",
        orders: [],
        messages: [],
        startedAt: Date.now(),
        endedAt: null,
        sequence: 0,
        autoMode: true,
      };
    }

    case "RECEIVE_MESSAGE": {
      if (state.phase !== "live") return state;

      const parsed = parsePurchaseMessage(action.texto);
      const product = parsed
        ? state.products.find((item) => item.codigo === parsed.codigo)
        : undefined;

      let result: ChatResult = "ignorado";
      let products = state.products;
      let orders = state.orders;

      if (product) {
        result = product.stockDisponible > 0 ? "adjudicado" : "espera";

        if (result === "adjudicado") {
          products = state.products.map((item) =>
            item.id === product.id
              ? { ...item, stockDisponible: item.stockDisponible - 1 }
              : item,
          );
        }

        const order: DemoOrder = {
          id: `order-${state.sequence + 1}`,
          productoId: product.id,
          codigo: product.codigo,
          nombre: product.nombre,
          precio: product.precio,
          username: action.username,
          telefono: parsed?.telefono ?? null,
          estado: result === "adjudicado" ? "adjudicado" : "espera",
          timecode: formatTimecode(action.offsetMs),
          offsetMs: action.offsetMs,
          secuencia: state.sequence + 1,
        };

        orders = [...state.orders, order];
      }

      return {
        ...state,
        products,
        orders,
        messages: [
          ...state.messages,
          {
            id: `msg-${state.sequence + 1}`,
            username: action.username,
            texto: action.texto,
            resultado: result,
            codigo: parsed?.codigo,
            timecode: formatTimecode(action.offsetMs),
          },
        ],
        sequence: state.sequence + 1,
      };
    }

    case "CLOSE_LIVE": {
      if (state.phase !== "live") return state;

      return {
        ...state,
        phase: "postlive",
        endedAt: Date.now(),
        autoMode: false,
      };
    }

    case "GO_TO_PHASE": {
      if (action.phase === "prelive") return state;
      if (!state.startedAt) return state;
      if (action.phase === "audit" && state.phase !== "postlive" && state.phase !== "audit") {
        return state;
      }
      if (action.phase === "postlive" && state.phase === "live") return state;

      return { ...state, phase: action.phase };
    }

    case "SET_AUTO":
      return { ...state, autoMode: action.value };

    case "RESET":
      return createInitialState();

    default:
      return state;
  }
}
