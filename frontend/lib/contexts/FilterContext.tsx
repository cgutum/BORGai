'use client';

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { FilterState, PresetType, TimeRangeType, Core, Component } from '@/lib/types';
import { cores, components, coreCategories, presetConfigs, getCoresByCategory, getComponentsByCore } from '@/lib/data/forecast-data';

interface FilterContextType {
  // Current filter state
  filterState: FilterState;
  
  // Filter actions (all apply immediately)
  setPreset: (preset: PresetType) => void;
  toggleCategory: (categoryId: string) => void;
  toggleCore: (coreId: string) => void;
  toggleComponent: (componentId: string) => void;
  setTimeRange: (timeRange: TimeRangeType) => void;
  clearAllFilters: () => void;
  
  // Computed data (filtered based on current selections)
  availableCores: Core[];
  availableComponents: Component[];
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const initialFilterState: FilterState = {
  preset: 'all',
  categories: [],
  cores: [],
  components: [],
  timeRange: '3months'
};

export function FilterProvider({ children }: { children: React.ReactNode }) {
  // Single filter state - changes apply immediately
  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);
  
  // Set preset (applies immediately)
  const setPreset = useCallback((preset: PresetType) => {
    // Don't apply config for 'custom' preset
    if (preset === 'custom') {
      setFilterState(prev => ({ ...prev, preset }));
      return;
    }
    
    const config = presetConfigs[preset as keyof typeof presetConfigs];
    setFilterState({
      preset,
      categories: config.categories,
      cores: config.cores,
      components: config.components,
      timeRange: filterState.timeRange
    });
  }, [filterState.timeRange]);
  
  // Toggle category (applies immediately)
  const toggleCategory = useCallback((categoryId: string) => {
    setFilterState(prev => {
      const categories = prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId];
      
      // If removing a category, also remove cores from that category
      let newCores = prev.cores;
      let newComponents = prev.components;
      
      if (!categories.includes(categoryId)) {
        const coresInCategory = getCoresByCategory([categoryId]).map(c => c.core_id);
        newCores = newCores.filter(coreId => !coresInCategory.includes(coreId));
        
        // Also remove components from those cores
        newComponents = newComponents.filter(compId => 
          !coresInCategory.some(coreId => compId.startsWith(coreId))
        );
      }
      
      return {
        ...prev,
        preset: 'custom',
        categories,
        cores: newCores,
        components: newComponents
      };
    });
  }, []);
  
  // Toggle core (applies immediately)
  const toggleCore = useCallback((coreId: string) => {
    setFilterState(prev => {
      const newCores = prev.cores.includes(coreId)
        ? prev.cores.filter(id => id !== coreId)
        : [...prev.cores, coreId];
      
      // If removing a core, also remove its components
      let newComponents = prev.components;
      if (!newCores.includes(coreId)) {
        newComponents = newComponents.filter(compId => !compId.startsWith(coreId));
      }
      
      return {
        ...prev,
        preset: 'custom',
        cores: newCores,
        components: newComponents
      };
    });
  }, []);
  
  // Toggle component (applies immediately)
  const toggleComponent = useCallback((componentId: string) => {
    setFilterState(prev => {
      const newComponents = prev.components.includes(componentId)
        ? prev.components.filter(id => id !== componentId)
        : [...prev.components, componentId];
      
      return {
        ...prev,
        preset: 'custom',
        components: newComponents
      };
    });
  }, []);
  
  // Set time range (applies immediately)
  const setTimeRange = useCallback((timeRange: TimeRangeType) => {
    setFilterState(prev => ({
      ...prev,
      timeRange
    }));
  }, []);
  
  // Clear all filters (applies immediately)
  const clearAllFilters = useCallback(() => {
    setFilterState(initialFilterState);
  }, []);
  
  // Compute available cores based on category selection
  const availableCores = useMemo(() => {
    if (filterState.categories.length === 0) {
      return cores;
    }
    return getCoresByCategory(filterState.categories);
  }, [filterState.categories]);
  
  // Compute available components based on core selection
  const availableComponents = useMemo(() => {
    // If no cores selected, get components from selected categories
    if (filterState.cores.length === 0 && filterState.categories.length > 0) {
      const categoryCores = getCoresByCategory(filterState.categories);
      return getComponentsByCore(categoryCores.map(c => c.core_id));
    }
    
    // If cores selected, get components from those cores
    if (filterState.cores.length > 0) {
      return getComponentsByCore(filterState.cores);
    }
    
    // Otherwise return all components
    return components;
  }, [filterState.categories, filterState.cores]);
  
  const value: FilterContextType = {
    filterState,
    setPreset,
    toggleCategory,
    toggleCore,
    toggleComponent,
    setTimeRange,
    clearAllFilters,
    availableCores,
    availableComponents
  };
  
  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}

// TODO: Add data aggregation hooks
// - useChartData() - aggregates forecast data for chart visualization
// - useAggregatedKPIs() - computes KPIs based on filtered data
// - useForecastData() - fetches forecast data for selected cores/components
