'use client';

import { AnalysisHeader } from '@/components/features/forecast-analysis/AnalysisHeader';
import { AnalysisTabs } from '@/components/features/forecast-analysis/AnalysisTabs';
import { TableControls } from '@/components/features/forecast-analysis/TableControls';
import { FeatureTable } from '@/components/features/forecast-analysis/FeatureTable';

export default function ForecastAnalysisPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <AnalysisHeader />

      {/* Tabs Navigation */}
      <AnalysisTabs>
        {/* Sub-view selector */}
        <div className="mb-4">
          <div className="flex items-center gap-4 text-sm">
            <button className="font-medium text-[#0065BD] border-b-2 border-[#0065BD] pb-2">
              ● Forecast Data Analysis
            </button>
            <button className="text-[#6E685F] hover:text-[#0065BD] pb-2">
              Aggregated View
            </button>
            <button className="text-[#6E685F] hover:text-[#0065BD] pb-2">
              Feature Contribution Analysis
            </button>
          </div>
        </div>

        {/* Table Controls */}
        <TableControls />

        {/* Feature Contribution Table */}
        <div className="mt-6">
          <FeatureTable />
        </div>
      </AnalysisTabs>
    </div>
  );
}
