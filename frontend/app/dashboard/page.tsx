'use client';

import { MetricGrid } from '@/components/features/dashboard/MetricGrid';
import { ForecastChart } from '@/components/features/dashboard/ForecastChart';
import { AlertSummary } from '@/components/features/dashboard/AlertSummary';

export default function DashboardPage() {
  return (
    <div className="flex-1 overflow-auto p-6 space-y-6">
      {/* Upper Section: Forecast Chart */}
      <div>
        <ForecastChart />
      </div>

      {/* Lower Section: KPI Cards and Alert Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Alert Summary (1 column) */}
        <div>
          <AlertSummary />
        </div>

        {/* Right: KPI Cards (2 columns) */}
        <div className="lg:col-span-2">
          <MetricGrid />
        </div>
      </div>
    </div>
  );
}
