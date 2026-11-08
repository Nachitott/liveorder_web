# Fase 3 — Demo interactiva del flujo real

## Objetivo

Que un vendedor entienda y experimente LiveOrder OS en menos de 60 segundos, usando el **flujo real del prototipo** y no una interfaz inventada.

La demo no replica todo el SaaS: cuenta la historia que vende, desde el stock hasta el cobro.

## Fuente de verdad

Repositorio: `peluk467/liveorder-os`, rama `dev`.

| Paso de la demo | Pantalla real del prototipo | Qué se muestra |
| --- | --- | --- |
| 1. Cargar stock | `PreLivePage` | Productos, código de chat, stock y precio |
| 2. Vender en vivo | `LiveMonitorPage` | Chat, parser determinista, FIFO, adjudicados y lista de espera |
| 3. Cerrar y cobrar | `PostLivePage` | Compradores consolidados, total, teléfono, CSV y WhatsApp |
| 4. Auditar | `AuditoriaPage` | Historial con timestamps y detalle de la sesión |

Vocabulario obligatorio: **código de chat, stock, adjudicado, en espera, comprador, teléfono, cobro, CSV, sesión**.

## Alcance

### Paso 1 — Pre-Live / Inventario

- Tres productos de ejemplo con código de chat, stock y precio.
- El visitante puede ajustar el stock con controles simples.
- Se muestra la relación entre código y producto, tal como se carga en el prototipo.

### Paso 2 — Live Monitor

- Chat simulado con mensajes entrantes que incluyen código y teléfono.
- El parser determinista extrae el código y el teléfono.
- El motor FIFO adjudica al primero y manda el resto a lista de espera.
- El stock se bloquea al llegar a cero.
- El visitante puede escribir un comentario o disparar una ráfaga de 5 compradores.
- Timestamps visibles para demostrar la prelación.

### Paso 3 — Post-Live / Cierre

- Matriz consolidada por comprador: prendas, cantidad, teléfono y total.
- Botón **Exportar CSV** real, generado en el navegador.
- Botón **Cobrar por WhatsApp** que abre una vista previa del mensaje con opción de copiar. No envía mensajes reales.
- Métricas: total a cobrar, prendas adjudicadas y demanda en espera.

### Paso 4 — Auditoría

- Resumen liviano de la sesión con fecha, hora, ventas y compradores.
- No se implementa historial persistente ni navegación entre sesiones.

## Lo que es simulado y lo que no

| Elemento | Implementación |
| --- | --- |
| Backend / Supabase | No. Todo ocurre en el cliente. |
| Extensión de Chrome / DOM de TikTok | No. Chat simulado con el mismo contrato de datos. |
| Login / cuentas | No. Demo sin autenticación. |
| Parser y FIFO | Sí, lógica real simplificada. |
| Exportación CSV | Sí, descarga real. |
| WhatsApp | Solo vista previa y copia del mensaje. |
| Datos | De ejemplo, en memoria y reiniciables. |

Los tipos de datos deben reflejar los del prototipo: `Producto`, `Pedido`, `Comprador`, estados `adjudicado` y `espera`.

## Identidad aplicada

La demo usa el mismo sistema que la landing:

- Base obsidiana `#07080B`.
- Violeta de marca `#863BFF`, alineado al logo del producto.
- Lima de acción `#C8FF3D`.
- Coral live `#FF5C45`.
- Tipografías y primitives existentes.

La UI se inspira en las cards, stats y tablas del panel real, pero con la piel de marca de LiveOrder. No se imita la interfaz de TikTok.

## Arquitectura propuesta

```text
src/
  components/demo/
    demo-section.tsx          # orquestador y estado
    demo-stepper.tsx          # progreso PreLive → Live → PostLive → Auditoría
    pre-live-panel.tsx
    live-monitor-panel.tsx
    post-live-panel.tsx
    audit-panel.tsx
    chat-feed.tsx
    product-stock-card.tsx
    order-queue.tsx
    buyer-table.tsx
    whatsapp-preview.tsx
  lib/demo/
    types.ts
    demo-data.ts
    fifo.ts                   # parser + asignación determinista
    csv.ts                    # exportación
```

Estado local con `useReducer`; sin backend ni persistencia. La lógica FIFO y el parser van aislados para poder testearlos.

## Flujo de interacción

1. La demo arranca en **PreLive** con stock cargado y un CTA “Iniciar live”.
2. Al iniciar, el chat empieza a recibir mensajes y el visitante puede adjudicar.
3. Al agotarse el stock o pulsar “Cerrar live”, avanza a **PostLive**.
4. En PostLive puede exportar el CSV y ver el mensaje de WhatsApp.
5. “Reiniciar demo” vuelve al estado inicial sin recargar la página.

Debe existir un modo automático si el visitante no interactúa, pausado fuera del viewport y con fallback estático para `prefers-reduced-motion`.

## Criterios de aceptación

- El ciclo completo se entiende en menos de 60 segundos.
- Usa el vocabulario y los estados reales del prototipo.
- Funciona sin backend ni variables de entorno.
- CSV descargable y mensaje de WhatsApp copiable.
- Responsive en mobile y desktop.
- Navegable por teclado y con `aria-live` en la cola.
- Sin overflow, sin saltos de layout y con motion reducido.
- Datos y estado reiniciables.
- Lint y build de producción sin errores.

## Subfases de implementación

1. **3.1** Modelo de datos, parser, FIFO y shell con stepper.
2. **3.2** PreLive: stock, códigos y transición a live.
3. **3.3** Live Monitor: chat, adjudicación, bloqueo de stock y lista de espera.
4. **3.4** PostLive: consolidado, CSV y preview de WhatsApp.
5. **3.5** Auditoría, modo automático, responsive, accesibilidad y pulido.

Cada subfase se cierra con commit, push y el puerto local informado para revisión.

## Fuera de alcance

- Backend, Supabase, autenticación y pagos reales.
- Extensión de Chrome o scraping real de TikTok.
- Envío real de WhatsApp.
- Historial persistente entre sesiones.
- Réplica píxel por píxel del prototipo.
