'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { KPICard } from './KPICard';
import { CreateKPICard } from './CreateKPICard';
import { allKPIs, getKPISlice } from '@/lib/data/kpi-metrics';

const VISIBLE_CARDS = 4;
const TOTAL_ITEMS = 6; // 5 KPIs + 1 Create button

export function KPICarousel() {
  const [startIndex, setStartIndex] = useState(0);

  const canGoBack = startIndex > 0;
  const canGoForward = startIndex + VISIBLE_CARDS < TOTAL_ITEMS;

  const handlePrevious = () => {
    if (canGoBack) {
      setStartIndex(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (canGoForward) {
      setStartIndex(prev => Math.min(TOTAL_ITEMS - VISIBLE_CARDS, prev + 1));
    }
  };

  // Get current slice of KPIs
  const visibleKPIs = getKPISlice(startIndex, VISIBLE_CARDS);
  
  // Determine if Create button should be visible
  const showCreateButton = startIndex + VISIBLE_CARDS > allKPIs.length;
  const createButtonIndex = allKPIs.length - startIndex;

  return (
    <div className="flex flex-col">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-4 gap-3 mb-2">
        {visibleKPIs.map((metric, index) => (
          <KPICard key={metric.id} metric={metric} />
        ))}
        {showCreateButton && createButtonIndex >= 0 && createButtonIndex < VISIBLE_CARDS && (
          <div style={{ gridColumn: createButtonIndex + 1 }}>
            <CreateKPICard />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handlePrevious}
          disabled={!canGoBack}
          className="flex items-center justify-center w-7 h-7 rounded-full border border-[#D3D0CC] bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Previous KPIs"
        >
          <ChevronLeft className="w-4 h-4 text-[#000000]" />
        </button>

        <button
          onClick={handleNext}
          disabled={!canGoForward}
          className="flex items-center justify-center w-7 h-7 rounded-full border border-[#D3D0CC] bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Next KPIs"
        >
          <ChevronRight className="w-4 h-4 text-[#000000]" />
        </button>
      </div>
    </div>
  );
}
