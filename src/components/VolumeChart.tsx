"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import type { VolumeDataPoint } from "@/services/sorobanApi";

interface VolumeChartProps { data: VolumeDataPoint[]; }

const COLORS = { soroswap: "#6366f1", phoenix: "#f59e0b", blend: "#10b981" };

const formatUSD = (v: number) =>
  v >= 1_000_000 ? `$${(v/1_000_000).toFixed(1)}M`
  : v >= 1_000   ? `$${(v/1_000).toFixed(0)}K`
  : `$${v}`;

const formatDate = (s: string) =>
  new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric" });

export default function VolumeChart({ data }: VolumeChartProps) {
  return (
    // fix: w-full min-w-0 overflow-hidden prevents SVG overflow on mobile (closes #1)
    <div className="card w-full min-w-0 overflow-hidden animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="section-title mb-0">30-Day Volume Trends</h2>
          <p className="text-slate-400 text-sm mt-0.5">Daily trading volume by protocol (USD)</p>
        </div>
        <span className="badge-slate">Last 30 days</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            {Object.entries(COLORS).map(([k, c]) => (
              <linearGradient key={k} id={`g-${k}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={c} stopOpacity={0.3} />
                <stop offset="95%" stopColor={c} stopOpacity={0}   />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="date" tickFormatter={formatDate}
            tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={{ stroke: "#334155" }}
            tickLine={false} interval={4} />
          <YAxis tickFormatter={formatUSD}
            tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} width={56} />
          <Tooltip />
          <Legend wrapperStyle={{ paddingTop: "16px", fontSize: "12px" }} />
          {Object.entries(COLORS).map(([k, c]) => (
            <Area key={k} type="monotone" dataKey={k} stroke={c} strokeWidth={2}
              fill={`url(#g-${k})`} dot={false}
              activeDot={{ r: 4, stroke: c, strokeWidth: 2, fill: "#1e293b" }} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
