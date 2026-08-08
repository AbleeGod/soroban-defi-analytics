---
name: "[OPEN / BOUNTY] FEAT – CSV export for historical pool TVL data"
about: "Bounty issue: implement a CSV download for 30-day pool TVL history"
title: "[FEAT] Implement CSV export functionality for historical pool TVL data"
labels: ["enhancement", "bounty", "help wanted", "frontend"]
---

## Overview

Users want to download the 30-day historical TVL and volume data shown in the
`<VolumeChart />` component as a **CSV file** for offline analysis in Excel,
Google Sheets, or Python.

## 💰 Bounty

This issue carries a **community bounty**. See the project's bounty board for
current reward details.

## Acceptance criteria

- [ ] An **"Export CSV"** button appears above or below the `<VolumeChart />`
      component.
- [ ] Clicking it triggers a client-side download of a `.csv` file (no server
      round-trip required).
- [ ] The CSV includes columns: `date`, `soroswap_volume`, `phoenix_volume`,
      `blend_volume`, `total_volume`.
- [ ] Filename format: `soroban-tvl-YYYY-MM-DD.csv` (today's date).
- [ ] Button is accessible: keyboard focusable, has `aria-label`, shows a
      loading state briefly during generation.
- [ ] Works in Chrome, Firefox, and Safari (latest stable).

## Suggested implementation

```ts
// src/utils/exportCsv.ts
export function downloadCsv(data: VolumeDataPoint[], filename: string): void {
  const header = "date,soroswap,phoenix,blend,total\n";
  const rows = data
    .map((r) => `${r.date},${r.soroswap},${r.phoenix},${r.blend},${r.total}`)
    .join("\n");
  const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
```

## Out of scope

- Excel `.xlsx` format (separate future issue)
- Server-side CSV streaming

> Tag `@maintainers` in a comment before starting work to claim the bounty.
