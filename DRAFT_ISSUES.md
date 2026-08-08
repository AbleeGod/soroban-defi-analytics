# Draft GitHub Issues

Ready-to-publish issue text for **soroban-defi-analytics**.
Copy each block into GitHub → Issues → New Issue when publishing.

---

## Issue 1 — CLOSED / RESOLVED SAMPLE

**Title:** `[UI] Fix Recharts container responsiveness on mobile viewports`

**Labels:** `bug` · `ui` · `resolved`

**Status:** Closed ✅

---

### Description

On viewport widths below **480 px** the `<VolumeChart />` component rendered a
fixed-width SVG that overflowed its parent container, causing a horizontal
scrollbar to appear across the entire dashboard page on mobile devices.

### Steps to reproduce

1. Open the dashboard at `http://localhost:3000`.
2. Open DevTools → responsive mode → set width to **375 px** (iPhone SE).
3. Scroll to the **"30-Day Volume Trends"** chart section.
4. Observe the SVG canvas extending beyond the right edge of the screen.

### Expected behaviour

The chart should scale down proportionally and fill the available container
width with no overflow or horizontal scroll.

### Root cause

`<ResponsiveContainer>` from Recharts requires its immediate parent to have an
**explicit width**. The wrapping `<div>` used `width: auto`, causing Recharts
to fall back to a hardcoded internal pixel width.

### Fix applied (v0.2.0)

```tsx
// Before
<div className="card">
  <ResponsiveContainer height={300}>

// After
<div className="card w-full min-w-0 overflow-hidden">
  <ResponsiveContainer width="100%" height={300}>
```

Added `w-full` and `min-w-0` to the wrapper `<div>` and passed an explicit
`width="100%"` prop to `<ResponsiveContainer>`.

**Resolved in:** v0.2.0 · PR #7

---

---

## Issue 2 — OPEN · GOOD FIRST ISSUE

**Title:** `[FEAT] Add currency display switcher (USD / XLM) in header navbar`

**Labels:** `enhancement` · `good first issue` · `frontend`

**Status:** Open 🟢

---

### Overview

All monetary values on the dashboard are currently shown in **USD**. Many
Stellar ecosystem users prefer to reason about pool sizes and yields in native
**XLM**. This issue tracks adding a toggle button to the header that switches
all displayed values between USD and XLM.

### Acceptance criteria

- [ ] A **USD | XLM** toggle/button group appears in the `<Header />` component
      and is fully responsive (desktop + mobile).
- [ ] Clicking **XLM** converts all `tvl`, `volume24h`, and pool values using a
      live or mocked XLM/USD exchange rate.
- [ ] The selected currency persists in `localStorage` across page refreshes.
- [ ] A `fetchXlmPrice(): Promise<number>` function is added to
      `src/services/sorobanApi.ts` returning a mocked rate (e.g. `0.135`).
- [ ] Unit labels update throughout (e.g. `$1.25M` → `9.2M XLM`).
- [ ] No breaking changes to existing component interfaces.

### Suggested implementation path

1. Add `fetchXlmPrice()` to `sorobanApi.ts`.
2. Create `src/hooks/useCurrency.ts` — a React context + hook.
3. Wrap the app in `<CurrencyProvider>` in `src/app/layout.tsx`.
4. Update `MetricCard`, `PoolsTable`, and `Header` stat pills to read from the
   context.

### Resources

- [Stellar Expert price API](https://stellar.expert/explorer/public)
- [Soroswap price feed](https://soroswap.finance)

> **Good first issue** — the data layer is already in place. This task only
> requires adding a context, a hook, and updating formatting in three existing
> components. Estimated effort: ~3–4 hours.

---

---

## Issue 3 — OPEN · ENHANCEMENT

**Title:** `[INTEGRATION] Add live Soroswap DEX API adapter for real-time pool indexing`

**Labels:** `enhancement` · `integration` · `help wanted`

**Status:** Open 🟢

---

### Background

`src/services/sorobanApi.ts` currently returns hardcoded mock data for all
protocol metrics and liquidity pools. To ship a production-ready dashboard, we
need a real API adapter that pulls **live** pool and volume data from the
**Soroswap DEX** indexer/subgraph.

### Goal

Replace (or extend behind an env flag) the mock `fetchLiquidityPools()` and
`fetchProtocolMetrics()` functions with live HTTP calls to the Soroswap API,
mapping responses to the existing TypeScript interfaces — no breaking changes
to dashboard components.

### Acceptance criteria

- [ ] New file `src/services/adapters/soroswapAdapter.ts` created.
- [ ] Adapter fetches pool list from Soroswap's public endpoint.
- [ ] Response mapped to the existing `LiquidityPool` interface.
- [ ] Network errors caught; UI falls back gracefully to last-known data.
- [ ] `NEXT_PUBLIC_SOROSWAP_API_URL` env variable controls the base URL
      (documented in `.env.example`).
- [ ] Mock data path preserved when `NEXT_PUBLIC_USE_MOCK_DATA=true` (for
      local dev and CI).
- [ ] New adapter covered by at least one integration test.

### Relevant links

- [Soroswap GitHub](https://github.com/soroswap)
- [Mercury Indexer](https://www.mercurydata.app/) — alternative historical data source
- [Stellar Horizon API](https://developers.stellar.org/api/horizon)

### Scope notes

Read-only data fetching only — no wallet connection or transaction signing
required for this issue.

---

---

## Issue 4 — OPEN · BOUNTY

**Title:** `[FEAT] Implement CSV export functionality for historical pool TVL data`

**Labels:** `enhancement` · `bounty` · `help wanted` · `frontend`

**Status:** Open 🟢 · 💰 Bounty attached

---

### Overview

Users want to download the 30-day historical TVL and volume data shown in the
`<VolumeChart />` component as a **CSV file** for offline analysis in
spreadsheet tools or Python/pandas scripts.

### 💰 Bounty

This issue carries a **community bounty**. Comment on this issue to express
interest before starting work — maintainers will assign it and confirm the
reward amount.

### Acceptance criteria

- [ ] An **"Export CSV"** button appears above or alongside the `<VolumeChart />`
      component (desktop + mobile responsive).
- [ ] Clicking it triggers a **client-side** file download — no server
      round-trip required.
- [ ] CSV columns: `date`, `soroswap_volume`, `phoenix_volume`,
      `blend_volume`, `total_volume`.
- [ ] Filename format: `soroban-tvl-YYYY-MM-DD.csv` using today's date.
- [ ] Button is fully accessible: keyboard-focusable, has a descriptive
      `aria-label`, and shows a brief loading state during generation.
- [ ] Tested and working in Chrome, Firefox, and Safari (latest stable).

### Suggested implementation

```ts
// src/utils/exportCsv.ts
import type { VolumeDataPoint } from "@/services/sorobanApi";

export function downloadCsv(data: VolumeDataPoint[], filename: string): void {
  const header = "date,soroswap_volume,phoenix_volume,blend_volume,total_volume\n";
  const rows = data
    .map(
      (r) =>
        `${r.date},${r.soroswap},${r.phoenix},${r.blend},${r.total}`
    )
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

Then wire a `"use client"` wrapper button in `VolumeChart.tsx` that calls
`downloadCsv(data, \`soroban-tvl-${new Date().toISOString().split("T")[0]}.csv\`)`.

### Out of scope

- Excel `.xlsx` format (separate future issue)
- Server-side CSV streaming or zip archives

> **Claim this bounty:** Drop a comment tagging `@maintainers` before you
> start work so we can assign it and avoid duplicate effort.

---

*Last updated: 2026-08-07*
