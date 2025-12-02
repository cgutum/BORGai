'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { KPICarousel } from './KPICarousel';
import { AlertSummaryChart } from './AlertSummaryChart';
import { alertSummaryData } from '@/lib/data/kpi-metrics';

export function KPIBadge() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white rounded-lg border border-[#E5E5E5] shadow-sm">
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition-colors"
        aria-expanded={isExpanded}
        aria-controls="kpi-badge-content"
      >
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-[#000000]" />
        ) : (
          <ChevronRight className="w-4 h-4 text-[#000000]" />
        )}
        <h2 className="text-base font-semibold text-[#000000]">
          KPIs
        </h2>
      </button>

      {/* Content - Collapsible */}
      {isExpanded && (
        <div id="kpi-badge-content" className="px-4 pb-3 pt-0">
          <KPICarousel />
        </div>
      )}
    </div>
  );
}
