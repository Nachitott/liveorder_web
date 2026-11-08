import type { Buyer } from "./types";

function escapeCell(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

export function buyersToCsv(buyers: Buyer[]) {
  const headers = [
    "Usuario_TikTok",
    "Telefono",
    "Prendas",
    "Cantidad",
    "Total_ARS",
    "Estado",
  ];

  const rows = buyers.map((buyer) => [
    `@${buyer.username}`,
    buyer.telefono ?? "Sin telefono",
    buyer.items.join(" / "),
    String(buyer.items.length),
    String(buyer.total),
    "Listo para cobro",
  ]);

  return [headers.join(","), ...rows.map((row) => row.map(escapeCell).join(","))].join("\n");
}

export function downloadBuyersCsv(buyers: Buyer[]) {
  const csv = buyersToCsv(buyers);
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = `liveorder_cierre_${date}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
