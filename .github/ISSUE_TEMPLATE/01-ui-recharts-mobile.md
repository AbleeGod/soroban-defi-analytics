---
name: "[CLOSED] UI – Fix Recharts container responsiveness on mobile"
about: "Resolved sample issue: Recharts ResponsiveContainer overflowed on small viewports"
title: "[UI] Fix Recharts container responsiveness on mobile viewports"
labels: ["bug", "ui", "good first issue", "resolved"]
---

## Problem

On viewport widths below `480px` the `<VolumeChart />` component rendered a
fixed-width SVG that overflowed its parent container, causing horizontal scroll
on the dashboard page.

**Steps to reproduce:**

1. Open the dashboard on a device (or DevTools) at ≤ 480 px wide.
2. Scroll to the "30-Day Volume Trends" section.
3. The chart SVG was wider than the screen — horizontal scroll appeared.

**Expected:** Chart scales down and fills the available width with no overflow.

## Root cause

`ResponsiveContainer` requires its parent to have an explicit width. The
wrapping `<div>` had `width: auto` which caused Recharts to fall back to a
hardcoded internal width.

## Fix applied

Added `w-full` and `min-w-0` to the parent `<div>` in `VolumeChart.tsx` and
set `width="100%"` explicitly on `<ResponsiveContainer>`.

```tsx
// Before
<div className="card">
  <ResponsiveContainer height={300}>

// After
<div className="card w-full min-w-0 overflow-hidden">
  <ResponsiveContainer width="100%" height={300}>
```

**Status: Closed / Fixed in v0.2.0**
