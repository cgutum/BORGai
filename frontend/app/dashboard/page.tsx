'use client';

import { ForecastChart } from '@/components/features/dashboard/ForecastChart';
import { KPIBadge } from '@/components/features/dashboard/KPIBadge';
import ForecastSelection from '@/components/features/filters/ForecastSelection';

export default function DashboardPage() {
  return (
    <div className="flex-1 overflow-auto">
      {/* Main Grid Container - KPI Badge spans both columns */}
      <div className="grid grid-cols-[20%_80%] gap-4 items-start">
        {/* KPI Badge Section - Spans both Filters and Chart columns */}
        <div className="col-span-2">
          <KPIBadge />
        </div>

        {/* Left: Filters (20% of 80% = 16% of total page) */}
        <div className="bg-white rounded-lg border border-[#E5E5E5] shadow-sm p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-[#000000]">Filters</h3>
          </div>
          <ForecastSelection />
        </div>

        {/* Right: Forecast Chart (80% of 80% = 64% of total page) */}
        <div className="flex flex-col">
          <ForecastChart />
        </div>
      </div>
    </div>
  );
}
