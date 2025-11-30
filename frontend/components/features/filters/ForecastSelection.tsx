'use client';

import React from 'react';
import { useFilters } from '@/lib/contexts/FilterContext';
import PresetDropdown from './PresetDropdown';
import MultiSelectDropdown from './MultiSelectDropdown';
import TagList from './TagList';
import { coreCategories } from '@/lib/data/forecast-data';
import { Button } from '@/components/ui/button';

/**
 * ForecastSelection Component
 * 
 * Main sidebar filter component for selecting forecast data.
 * All changes apply immediately - no Apply button needed.
 */
export default function ForecastSelection() {
  const {
    filterState,
    setPreset,
    toggleCategory,
    toggleCore,
    toggleComponent,
    clearAllFilters,
    availableCores,
    availableComponents
  } = useFilters();
  
  const hasFilters = filterState.categories.length > 0 || filterState.cores.length > 0 || filterState.components.length > 0;
  
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-3 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">
          Filters
        </h2>
        {hasFilters && (
          <Button
            onClick={clearAllFilters}
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-gray-600 hover:text-gray-900"
          >
            Clear All
          </Button>
        )}
      </div>
      
      {/* Preset Dropdown */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1.5">
          Preset Views
        </label>
        <PresetDropdown
          value={filterState.preset}
          onChange={setPreset}
        />
      </div>
      
      {/* Category Multi-Select */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1.5">
          Categories
        </label>
        <MultiSelectDropdown
          options={coreCategories.map(cat => ({
            id: cat.id,
            label: cat.name,
            count: cat.coreCount
          }))}
          selectedIds={filterState.categories}
          onToggle={toggleCategory}
          placeholder="Select categories..."
          searchable
        />
      </div>
      
      {/* Core Multi-Select */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1.5">
          Cores
        </label>
        <MultiSelectDropdown
          options={availableCores.map(core => ({
            id: core.core_id,
            label: core.core_id,
            isFavorite: core.isFavorite,
            isPriority: core.isPriority
          }))}
          selectedIds={filterState.cores}
          onToggle={toggleCore}
          placeholder="Select cores..."
          searchable
          disabled={availableCores.length === 0}
        />
      </div>
      
      {/* Component Multi-Select */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1.5">
          Components
        </label>
        <MultiSelectDropdown
          options={availableComponents.map(comp => ({
            id: comp.component_id,
            label: comp.displayName,
            subtitle: comp.core_id
          }))}
          selectedIds={filterState.components}
          onToggle={toggleComponent}
          placeholder="Select components..."
          searchable
          disabled={availableComponents.length === 0}
        />
      </div>
      
      {/* Selected Tags */}
      {hasFilters && (
        <TagList
          categories={filterState.categories}
          cores={filterState.cores}
          components={filterState.components}
          onRemoveCategory={toggleCategory}
          onRemoveCore={toggleCore}
          onRemoveComponent={toggleComponent}
        />
      )}
    </div>
  );
}
