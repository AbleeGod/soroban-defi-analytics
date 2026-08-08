---
name: "[OPEN] INTEGRATION – Live Soroswap DEX API adapter"
about: "Enhancement: replace mock data with live Soroswap pool indexer calls"
title: "[INTEGRATION] Add live Soroswap DEX API adapter for real-time pool indexing"
labels: ["enhancement", "integration", "help wanted"]
---

## Background

`src/services/sorobanApi.ts` currently returns hardcoded mock data. To make
the dashboard production-ready, we need a real API adapter for **Soroswap DEX**
that pulls live liquidity pool data from their indexer/subgraph.

## Goal

Replace (or extend) the mock `fetchLiquidityPools()` and
`fetchProtocolMetrics()` functions with live calls to the Soroswap API so the
dashboard displays real TVL, volume, and APY figures.

## Acceptance criteria

- [ ] New file `src/services/adapters/soroswapAdapter.ts` created.
- [ ] Adapter fetches pool list from Soroswap's public endpoint.
- [ ] Response is mapped to the existing `LiquidityPool` interface — no
      breaking changes to consumers.
- [ ] Errors are caught and the UI falls back gracefully to stale data.
- [ ] An `NEXT_PUBLIC_SOROSWAP_API_URL` env variable controls the base URL
      (documented in `.env.example`).
- [ ] Mock data path is preserved under `NEXT_PUBLIC_USE_MOCK_DATA=true` for
      local dev and CI.

## Relevant links

- [Soroswap GitHub](https://github.com/soroswap)
- [Soroswap API docs](https://api.soroswap.finance/docs) *(verify current URL)*
- [Mercury Indexer](https://www.mercurydata.app/) — alternative indexer

## Scope notes

This issue is scoped to **read-only data fetching** — no wallet or transaction
signing required.
