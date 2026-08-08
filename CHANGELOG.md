# Changelog

All notable changes to **soroban-defi-analytics** are documented here.

This project adheres to [Semantic Versioning](https://semver.org/) and the
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format.

---

## [Unreleased]

### Planned
- Live Soroswap DEX API adapter (`#3`)
- USD / XLM currency toggle in header (`#2`)
- CSV export for historical TVL data (`#4`)

---

## [0.2.0] — 2026-06-14

### Added
- **`VolumeChart` component** — 30-day stacked area chart using Recharts with
  gradient fills and a custom dark-mode tooltip.
- **`PoolsTable` component** — sortable liquidity pool table showing pair,
  protocol, TVL, 24h volume, fee tier, and APY.
- **`Header` component** — sticky top bar with aggregated stats (total TVL,
  24h volume, active protocols) and a live indicator pill.
- **`DashboardSummary` interface** and `fetchDashboardSummary()` function in
  `sorobanApi.ts`.
- **30-day mock volume history** (`fetchVolumeHistory()`) with realistic
  upward trend data across Soroswap, Phoenix, and Blend Capital.
- ISR revalidation (`export const revalidate = 60`) on the dashboard page.
- Tailwind custom scrollbar styles and Recharts tooltip dark-mode override.
- GitHub Actions CI workflow — lint, type-check, and build jobs.
- Pull request template and four draft issue templates.

### Fixed
- **[UI] Recharts `ResponsiveContainer` overflow on mobile viewports** — added
  `w-full min-w-0 overflow-hidden` to wrapper and explicit `width="100%"` prop
  (resolves `#1`).
- Corrected APY display rounding to one decimal place.

### Changed
- Upgraded dashboard layout from single-column to a responsive 4-column grid
  for protocol cards on `lg` breakpoints.
- Refactored `sorobanApi.ts`: split into four typed functions, added simulated
  network delay, expanded `ProtocolMetric` interface with `id`, `category`, and
  `change24h` fields.
- Updated `package.json` to pin `lucide-react@^0.294.0` and `clsx@^2.0.0`.

---

## [0.1.0] — 2026-04-02

### Added
- Initial project scaffold with **Next.js 14 App Router** and **TypeScript**.
- **Tailwind CSS** configuration with dark slate color palette.
- Basic `sorobanApi.ts` service returning mock data for three protocols:
  Soroswap DEX, Phoenix DEX, Blend Capital.
- Dashboard page (`src/app/page.tsx`) rendering metric cards (TVL, 24h volume,
  APY) in a responsive three-column grid.
- `package.json` with Recharts, Next.js 14, React 18, and Tailwind CSS.
- MIT license and initial `README.md`.

---

[Unreleased]: https://github.com/your-org/soroban-defi-analytics/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/your-org/soroban-defi-analytics/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/your-org/soroban-defi-analytics/releases/tag/v0.1.0
