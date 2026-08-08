import type { VolumeDataPoint } from "@/services/sorobanApi";

/**
 * Triggers a client-side CSV download of historical pool volume data.
 * @param data     Array of VolumeDataPoint from fetchVolumeHistory()
 * @param filename e.g. "soroban-tvl-2026-08-07.csv"
 */
export function downloadCsv(data: VolumeDataPoint[], filename: string): void {
  const header = "date,soroswap_volume,phoenix_volume,blend_volume,total_volume\n";
  const rows = data
    .map((r) => `${r.date},${r.soroswap},${r.phoenix},${r.blend},${r.total}`)
    .join("\n");
  const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.setAttribute("aria-label", `Download ${filename}`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Returns filename in format: soroban-tvl-YYYY-MM-DD.csv */
export function buildCsvFilename(): string {
  return `soroban-tvl-${new Date().toISOString().split("T")[0]}.csv`;
}
