# Soroban DeFi Analytics

[![CI](https://github.com/your-org/soroban-defi-analytics/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/soroban-defi-analytics/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-indigo.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

An open-source **React & Next.js 14** dashboard providing real-time TVL metrics,
liquidity pool tracking, and 30-day volume trends across protocols built on
**Stellar Soroban** — Soroswap DEX, Phoenix DEX, Blend Capital, and Aquarius.

---

## Features

| Feature | Details |
|---------|---------|
| Protocol cards | TVL, 24h volume, APY, and 24h change per protocol |
| Volume trend chart | 30-day stacked area chart (Recharts) with dark-mode tooltip |
| Liquidity pool table | All active pools with pair, fee tier, and APY |
| Sticky header | Aggregated stats bar with live indicator |
| ISR revalidation | Data refreshes every 60 seconds via Next.js ISR |
| Fully typed | 100% TypeScript with strict mode enabled |
| Responsive | Mobile-first layout, tested down to 320 px |

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 14](https://nextjs.org) (App Router) |
| Language | TypeScript 5 |
| Styling | [Tailwind CSS 3](https://tailwindcss.com) |
| Charts | [Recharts 2](https://recharts.org) |
| Icons | [Lucide React](https://lucide.dev) |
| CI | GitHub Actions |

---

## Quick start

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10

### Install and run

```bash
# Clone the repo
git clone https://github.com/your-org/soroban-defi-analytics.git
cd soroban-defi-analytics

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

```bash
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
npm run type-check   # TypeScript type check (no emit)
```

---

## Project structure

```
soroban-defi-analytics/
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind base + component classes
│   │   ├── layout.tsx           # Root layout with metadata
│   │   └── page.tsx             # Main dashboard (async Server Component)
│   ├── components/
│   │   ├── Header.tsx           # Sticky header with aggregated stats
│   │   ├── MetricCard.tsx       # Per-protocol TVL / volume / APY card
│   │   ├── PoolsTable.tsx       # Liquidity pool table
│   │   └── VolumeChart.tsx      # 30-day Recharts area chart
│   └── services/
│       └── sorobanApi.ts        # Mock data service (swap for live APIs)
├── .github/
│   ├── workflows/
│   │   └── ci.yml               # Lint → type-check → build pipeline
│   ├── ISSUE_TEMPLATE/          # 4 ready-to-publish issue templates
│   └── pull_request_template.md
├── .env.example                 # Environment variable reference
├── CHANGELOG.md                 # Version history (v0.1.0, v0.2.0)
├── CONTRIBUTING.md              # Contribution guide
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Environment variables

Copy `.env.example` to `.env.local` and set values as needed.

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_USE_MOCK_DATA` | `true` | Use mock data instead of live APIs |
| `NEXT_PUBLIC_SOROSWAP_API_URL` | `https://api.soroswap.finance` | Soroswap indexer base URL |
| `NEXT_PUBLIC_HORIZON_URL` | `https://horizon.stellar.org` | Stellar Horizon RPC endpoint |
| `MERCURY_API_KEY` | — | Mercury Indexer API key (server-side only) |

---

## Connecting to live data

The data service lives entirely in `src/services/sorobanApi.ts`. Each function
returns a typed interface — swap the mock `return` for a real `fetch()` call
without touching any component.

```ts
// Before (mock)
export const fetchProtocolMetrics = async (): Promise<ProtocolMetric[]> => {
  return [ /* hardcoded data */ ];
};

// After (live — example)
export const fetchProtocolMetrics = async (): Promise<ProtocolMetric[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SOROSWAP_API_URL}/pools`);
  const json = await res.json();
  return json.map(mapToProtocolMetric); // your mapper
};
```

See [Issue #3](.github/ISSUE_TEMPLATE/03-integration-soroswap-api.md) for the
full integration spec.

---

## Open issues & roadmap

| # | Title | Label |
|---|-------|-------|
| [#1](.github/ISSUE_TEMPLATE/01-ui-recharts-mobile.md) | Fix Recharts container responsiveness on mobile | ✅ Resolved in v0.2.0 |
| [#2](.github/ISSUE_TEMPLATE/02-feat-currency-switcher.md) | Add USD / XLM currency switcher | `good first issue` |
| [#3](.github/ISSUE_TEMPLATE/03-integration-soroswap-api.md) | Live Soroswap DEX API adapter | `enhancement` |
| [#4](.github/ISSUE_TEMPLATE/04-feat-csv-export.md) | CSV export for historical pool TVL | `bounty` |

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for
the full workflow, coding standards, and PR checklist.

**New to the codebase?** Start with the
[`good first issue`](.github/ISSUE_TEMPLATE/02-feat-currency-switcher.md) —
the currency switcher only requires adding a React context and wiring up
existing components.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full release history.

**Latest — v0.2.0 (2026-06-14)**
- Added `VolumeChart`, `PoolsTable`, and `Header` components
- Added 30-day mock volume history and `DashboardSummary` API
- Fixed Recharts mobile overflow bug
- Added GitHub Actions CI workflow

---

## License

[MIT](LICENSE) © 2026 Soroban DeFi Analytics Contributors
