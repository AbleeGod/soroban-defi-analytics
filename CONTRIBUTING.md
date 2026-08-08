# Contributing to Soroban DeFi Analytics

Thanks for your interest in contributing! This guide covers everything you need
to get a PR merged — from setting up your environment to the review process.

---

## Table of contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting started](#getting-started)
3. [Development workflow](#development-workflow)
4. [Coding standards](#coding-standards)
5. [Submitting a pull request](#submitting-a-pull-request)
6. [Issue labels](#issue-labels)
7. [Good first issues](#good-first-issues)

---

## Code of Conduct

Be respectful, constructive, and inclusive. We follow the
[Contributor Covenant v2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

---

## Getting started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 20.x |
| npm | ≥ 10.x |
| Git | any recent version |

### Local setup

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/soroban-defi-analytics.git
cd soroban-defi-analytics

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start the dev server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the dashboard.

---

## Development workflow

```
main              ← stable, tagged releases
  └── develop     ← integration branch
        └── feat/your-feature   ← your branch
```

1. Branch off `develop` (not `main`):
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feat/your-feature-name
   ```
2. Make your changes with small, focused commits.
3. Run checks locally before pushing:
   ```bash
   npm run lint          # ESLint
   npm run type-check    # TypeScript
   npm run build         # Production build
   ```
4. Push and open a PR targeting `develop`.

---

## Coding standards

- **TypeScript** — all new files must be `.ts` or `.tsx`. Avoid `any`.
- **Components** — React Server Components by default; add `"use client"` only
  when you need browser APIs or state.
- **Styling** — Tailwind utility classes only. No inline `style=` props unless
  unavoidable (e.g. dynamic chart colors).
- **Imports** — use the `@/` path alias for `src/` imports.
- **Formatting** — Prettier is not enforced yet, but keep indentation at 2
  spaces and avoid trailing whitespace.
- **Naming** — PascalCase for components and types, camelCase for functions and
  variables, kebab-case for file names (except components).

---

## Submitting a pull request

1. Fill out the PR template completely.
2. Link the related issue with `Closes #<issue-number>`.
3. Add screenshots for any visual change.
4. Ensure all CI checks pass (lint → type-check → build).
5. Request a review from `@maintainers`.

PRs are merged with **squash and merge** to keep the commit history clean.

---

## Issue labels

| Label | Meaning |
|-------|---------|
| `good first issue` | Suitable for first-time contributors |
| `enhancement` | New feature or improvement |
| `bug` | Something isn't working correctly |
| `integration` | Connecting to an external API or service |
| `bounty` | Carries a community reward |
| `help wanted` | Maintainers welcome outside help |
| `wontfix` | Out of scope for this project |

---

## Good first issues

Not sure where to start? Check the open issues tagged
[`good first issue`](../../issues?q=is%3Aopen+label%3A%22good+first+issue%22).

The **currency switcher** (`#2`) is a great starting point — it only requires
adding a React context and wiring up existing components.

---

Questions? Open a
[GitHub Discussion](../../discussions) or drop a comment on any open issue.
