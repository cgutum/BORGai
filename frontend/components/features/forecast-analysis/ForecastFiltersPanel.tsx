'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MultiSelectDropdown from '@/components/features/filters/MultiSelectDropdown';
import { cores } from '@/lib/data/forecast-data';

/**
 * ForecastFiltersPanel Component
 * 
 * Left sidebar filters panel for Forecast Analysis page.
 * All filters are disabled (grayed out) to maintain locked context on selected core.
 * 
 * Fixed height: 4x navigation bar height (~240-280px)
 */
export default function ForecastFiltersPanel() {
  // TODO: Replace with API call to get current user's filter preferences
  const presetView = 'favorites';
  const selectedCoreId = 'TC_BMW_x3_2023';

  // Preset view options (all disabled)
  const presetOptions = [
    { value: 'all', label: 'All' },
    { value: 'favorites', label: 'Favorites' },
    { value: 'high-priority', label: 'High Priority' },
    { value: 'standard', label: 'Standard' },
  ];

  // Transform cores data for MultiSelectDropdown
  const coreOptions = cores.map(core => ({
    id: core.core_id,
    label: core.fullDisplayName || `${core.brand} ${core.model} (${core.core_id})`,
    isFavorite: core.isFavorite,
    isPriority: core.isPriority,
  }));

  return (
    <Card className="h-full border-[#D3D0CC] flex flex-col py-3 gap-2">
      <CardHeader className="pb-0 px-4 pt-0">
        <CardTitle className="text-lg font-semibold text-[#000000]">
          Core Selection
        </CardTitle>
        <p className="text-sm text-[#6E685F] mt-0.5 mb-0.5">Filters</p>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto space-y-1 px-4 pt-0">
        {/* Preset Views Dropdown (Disabled) */}
        <div>
          <label className="block text-xs font-medium text-[#6E685F] mb-0.5">
            Preset Views
          </label>
          <div className="relative opacity-60">
            <select
              disabled
              value={presetView}
              className="w-full px-3 py-2 text-sm border border-[#D3D0CC] rounded-md bg-[#F5F5F5] text-[#6E685F] cursor-not-allowed"
            >
              {presetOptions.map(option => (
                <option 
                  key={option.value} 
                  value={option.value}
                  className={option.value === 'favorites' ? 'font-semibold' : ''}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-[#6E685F] mt-0 mb-4 italic">
            Filter locked for focused analysis
          </p>
        </div>

        {/* Cores Multi-Select (Disabled) */}
        <div>
          <label className="block text-xs font-medium text-[#6E685F] mb-0.5">
            Cores
          </label>
          <div className="opacity-60 cursor-not-allowed">
            <MultiSelectDropdown
              options={coreOptions}
              selectedIds={[selectedCoreId]}
              onToggle={() => {}} // No-op since disabled
              placeholder="Select cores..."
              searchable
              disabled
            />
          </div>
          <p className="text-xs text-[#6E685F] mt-0 italic">
            Core selection locked for this analysis
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
