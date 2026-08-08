// scripts/publish-issues.mjs
// Run with: node scripts/publish-issues.mjs
// Publishes all 4 draft issues to GitHub and closes Issue 1.

// Set your token in the environment: $env:GITHUB_TOKEN = "ghp_..."
const TOKEN = process.env.GITHUB_TOKEN;
const REPO  = "Bigg770/soroban-defi-analytics";
const BASE  = `https://api.github.com/repos/${REPO}`;

const headers = {
  Authorization: `token ${TOKEN}`,
  Accept: "application/vnd.github+json",
  "Content-Type": "application/json",
  "User-Agent": "soroban-defi-analytics-bot",
};

async function apiPost(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`POST ${path} failed ${res.status}: ${JSON.stringify(json)}`);
  return json;
}

async function apiPatch(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`PATCH ${path} failed ${res.status}: ${JSON.stringify(json)}`);
  return json;
}

// ── Issue definitions ──────────────────────────────────────────────────────

const issues = [
  {
    title: "[UI] Fix Recharts container responsiveness on mobile viewports",
    labels: ["bug", "ui", "resolved"],
    body: `## Problem

On viewport widths below **480 px** the \`<VolumeChart />\` component rendered a fixed-width SVG that overflowed its parent container, causing a horizontal scrollbar across the dashboard on mobile devices.

## Steps to reproduce

1. Open the dashboard at \`http://localhost:3000\`
2. Open DevTools → responsive mode → set width to **375 px** (iPhone SE)
3. Scroll to the **"30-Day Volume Trends"** section
4. Observe the SVG canvas extending beyond the right edge of the screen

## Expected behaviour

The chart scales down proportionally and fills the available width with no overflow or horizontal scroll.

## Root cause

\`<ResponsiveContainer>\` requires its immediate parent to have an explicit width. The wrapping \`<div>\` used \`width: auto\`, causing Recharts to fall back to a hardcoded internal pixel width.

## Fix applied — v0.2.0

\`\`\`tsx
// Before
<div className="card">
  <ResponsiveContainer height={300}>

// After
<div className="card w-full min-w-0 overflow-hidden">
  <ResponsiveContainer width="100%" height={300}>
\`\`\`

**Resolved in:** v0.2.0 · commit \`e91143b\``,
    closeAfter: true,
  },
  {
    title: "[FEAT] Add currency display switcher (USD / XLM) in header navbar",
    labels: ["enhancement", "good first issue", "frontend"],
    body: `## Overview

All monetary values are currently shown in **USD**. Many Stellar ecosystem users prefer to reason about pool sizes in native **XLM**. This issue tracks adding a toggle to the header that switches all displayed values between USD and XLM.

## Acceptance criteria

- [ ] A **USD | XLM** toggle appears in \`<Header />\` and is fully responsive
- [ ] Clicking **XLM** converts all \`tvl\`, \`volume24h\`, and pool values using a live or mocked XLM/USD rate
- [ ] Selected currency persists in \`localStorage\` across page refreshes
- [ ] \`fetchXlmPrice(): Promise<number>\` added to \`sorobanApi.ts\`
- [ ] Unit labels update throughout (e.g. \`$1.25M\` → \`9.2M XLM\`)

## Suggested implementation

1. Add \`fetchXlmPrice()\` to \`sorobanApi.ts\` (mocked rate: \`0.135\`)
2. Create \`src/hooks/useCurrency.ts\` — React context + hook
3. Wrap the app in \`<CurrencyProvider>\` in \`layout.tsx\`
4. Update \`MetricCard\`, \`PoolsTable\`, and \`Header\` stat pills to read from context

## Resources

- [Stellar Expert price API](https://stellar.expert/explorer/public)
- [Soroswap price feed](https://soroswap.finance)

> **Good first issue** — the data layer is already in place. Estimated effort: ~3–4 hours.`,
  },
  {
    title: "[INTEGRATION] Add live Soroswap DEX API adapter for real-time pool indexing",
    labels: ["enhancement", "integration", "help wanted"],
    body: `## Background

\`src/services/sorobanApi.ts\` currently returns hardcoded mock data. To ship a production-ready dashboard, we need a real adapter that pulls **live** pool and volume data from the Soroswap DEX indexer.

## Goal

Replace (or extend behind an env flag) the mock \`fetchLiquidityPools()\` and \`fetchProtocolMetrics()\` with live HTTP calls to the Soroswap API, mapping responses to the existing TypeScript interfaces.

## Acceptance criteria

- [ ] New file \`src/services/adapters/soroswapAdapter.ts\` created
- [ ] Adapter fetches pool list from Soroswap's public endpoint
- [ ] Response mapped to the existing \`LiquidityPool\` interface — no breaking changes
- [ ] Network errors caught; UI falls back gracefully to last-known data
- [ ] \`NEXT_PUBLIC_SOROSWAP_API_URL\` env variable controls the base URL (documented in \`.env.example\`)
- [ ] Mock data path preserved when \`NEXT_PUBLIC_USE_MOCK_DATA=true\`

## Relevant links

- [Soroswap GitHub](https://github.com/soroswap)
- [Mercury Indexer](https://www.mercurydata.app/)
- [Stellar Horizon API](https://developers.stellar.org/api/horizon)

> Scoped to **read-only data fetching** — no wallet or transaction signing required.`,
  },
  {
    title: "[FEAT] Implement CSV export functionality for historical pool TVL data",
    labels: ["enhancement", "bounty", "help wanted", "frontend"],
    body: `## Overview

Users want to download the 30-day historical TVL and volume data shown in \`<VolumeChart />\` as a **CSV file** for offline analysis in spreadsheets or Python/pandas.

## 💰 Bounty

This issue carries a **community bounty**. Comment tagging \`@Bigg770\` before starting work so we can assign it and confirm the reward.

## Acceptance criteria

- [ ] An **"Export CSV"** button appears alongside \`<VolumeChart />\`  (desktop + mobile responsive)
- [ ] Clicking triggers a **client-side** file download — no server round-trip
- [ ] CSV columns: \`date\`, \`soroswap_volume\`, \`phoenix_volume\`, \`blend_volume\`, \`total_volume\`
- [ ] Filename format: \`soroban-tvl-YYYY-MM-DD.csv\` using today's date
- [ ] Button is keyboard-focusable, has \`aria-label\`, shows brief loading state
- [ ] Tested in Chrome, Firefox, and Safari (latest stable)

## Starter utility

The utility function is already scaffolded in \`src/utils/exportCsv.ts\` — just wire up the button in \`VolumeChart.tsx\`:

\`\`\`tsx
"use client";
import { downloadCsv, buildCsvFilename } from "@/utils/exportCsv";

// Inside VolumeChart component:
<button
  onClick={() => downloadCsv(data, buildCsvFilename())}
  aria-label="Export chart data as CSV"
  className="badge-slate hover:bg-slate-600 transition-colors"
>
  Export CSV
</button>
\`\`\`

## Out of scope

- Excel \`.xlsx\` format (separate future issue)
- Server-side CSV streaming`,
  },
];

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const created = [];

  for (const issue of issues) {
    const { closeAfter, ...payload } = issue;
    console.log(`\nCreating: ${payload.title}`);
    const result = await apiPost("/issues", payload);
    console.log(`  ✓ #${result.number} — ${result.html_url}`);
    created.push({ ...result, closeAfter });
  }

  // Close Issue 1
  const toClose = created.find((i) => i.closeAfter);
  if (toClose) {
    console.log(`\nClosing #${toClose.number} as resolved...`);
    const closed = await apiPatch(`/issues/${toClose.number}`, {
      state: "closed",
      state_reason: "completed",
    });
    console.log(`  ✓ #${closed.number} is now ${closed.state}`);
  }

  console.log("\n✅ All issues published successfully!");
  console.log(`   View at: https://github.com/${REPO}/issues`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
