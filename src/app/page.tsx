import {
  fetchProtocolMetrics,
  fetchLiquidityPools,
  fetchVolumeHistory,
  fetchDashboardSummary,
} from "@/services/sorobanApi";
import Header from "@/components/Header";
import MetricCard from "@/components/MetricCard";
import VolumeChart from "@/components/VolumeChart";
import PoolsTable from "@/components/PoolsTable";

export const revalidate = 60; // ISR: refresh every 60 seconds

export default async function DashboardPage() {
  // Fetch all data in parallel
  const [metrics, pools, volumeHistory, summary] = await Promise.all([
    fetchProtocolMetrics(),
    fetchLiquidityPools(),
    fetchVolumeHistory(),
    fetchDashboardSummary(),
  ]);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Sticky header with global stats */}
      <Header summary={summary} />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Protocol metric cards */}
        <section>
          <h2 className="section-title">Protocol Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </section>

        {/* Volume trend chart */}
        <section>
          <VolumeChart data={volumeHistory} />
        </section>

        {/* Liquidity pools table */}
        <section>
          <PoolsTable pools={pools} />
        </section>

        {/* Footer */}
        <footer className="pt-4 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>
            Soroban DeFi Analytics &mdash; open-source, MIT licensed
          </span>
          <span>
            Data is simulated. Production build connects to live RPC / indexer
            endpoints.
          </span>
        </footer>
      </main>
    </div>
  );
}
