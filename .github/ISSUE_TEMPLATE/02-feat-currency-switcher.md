---
name: "[OPEN] FEAT – Currency display switcher (USD / XLM)"
about: "Good first issue: add a USD/XLM toggle to the header navbar"
title: "[FEAT] Add currency display switcher (USD / XLM) in header navbar"
labels: ["enhancement", "good first issue", "frontend"]
---

## Overview

Right now all monetary values on the dashboard are shown in USD. It would be
valuable for users to toggle between **USD** and **XLM** so they can reason
about pool sizes in native Stellar terms.

## Acceptance criteria

- [ ] A toggle/button group appears in the `<Header />` component (desktop +
      mobile responsive).
- [ ] Clicking **XLM** converts all displayed `tvl`, `volume24h`, and pool
      values using a live or mocked XLM/USD rate.
- [ ] The selected currency persists in `localStorage` across page refreshes.
- [ ] The XLM rate is fetched from `src/services/sorobanApi.ts`
      (`fetchXlmPrice(): Promise<number>` — to be added).
- [ ] Unit labels update (e.g. `$1.25M` → `9.2M XLM`).

## Suggested implementation

1. Add `fetchXlmPrice()` to `sorobanApi.ts` returning a mocked rate (e.g.
   `0.135`).
2. Create a `useCurrency` React context/hook in
   `src/hooks/useCurrency.ts`.
3. Wrap the app in a `CurrencyProvider` in `layout.tsx`.
4. Update `MetricCard`, `PoolsTable`, and `Header` stat pills to consume the
   context.

## Resources

- [Stellar Expert price API](https://stellar.expert/explorer/public)
- [Soroswap price feed](https://soroswap.finance)

> **Good first issue** — The data layer is already in place. This task only
> requires adding a context, a hook, and wiring up existing components.
