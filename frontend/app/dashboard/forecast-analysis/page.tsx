'use client';

import ForecastFiltersPanel from '@/components/features/forecast-analysis/ForecastFiltersPanel';
import CoreDetailsCard from '@/components/features/forecast-analysis/CoreDetailsCard';
import AnalysisMainContent from '@/components/features/forecast-analysis/AnalysisMainContent';

/**
 * Forecast Analysis Page
 * 
 * Three-panel layout:
 * - Left: Filters Panel (20-25% width, fixed height = 4x nav bar)
 * - Top Right: Core Details Card (same height as filters)
 * - Below: Main Content Card (full width with tabs, controls, table)
 */
export default function ForecastAnalysisPage() {
  // Calculate fixed height for top cards (approximately 4x a typical nav bar height of 64px = 256px)
  const topCardHeight = '16rem'; // 256px = 4 * 64px

  return (
    <div>
      {/* Grid Layout: Two-column top row, full-width bottom row */}
      <div className="grid grid-cols-[minmax(20%,25%)_1fr] gap-6 mb-6">
        {/* Left: Filters Panel */}
        <div style={{ height: topCardHeight }}>
          <ForecastFiltersPanel />
        </div>

        {/* Right: Core Details Card */}
        <div style={{ height: topCardHeight }}>
          <CoreDetailsCard />
        </div>
      </div>

      {/* Full Width: Main Content Card */}
      <div>
        <AnalysisMainContent />
      </div>
    </div>
  );
}
