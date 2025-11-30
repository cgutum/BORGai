# Data Integration Plan - REMAN Dashboard

## Document Information
- **Version**: 1.0
- **Date**: November 30, 2025
- **Status**: Implementation Specification
- **Related Documents**: 
  - REMAN_Sample_Data.md
  - sidebar_forecast_selection_featureplan.md
  - PRD.md

---

## 1. DATA STRUCTURE DECISIONS

### 1.1 Category Structure
**Decision**: Use 8 categories from REMAN_Sample_Data.md

**Categories**:
1. Turbocharger
2. Starters
3. Alternators
4. AC Compressors
5. Brake Calipers
6. EGR Valves
7. Steering Racks
8. Steering Pumps

**Total Cores**: 24 (3 cores per category)
**Total Components**: 120 (5 components per core)

---

### 1.2 ID Format Standards

#### Core IDs
**Format**: `{CategoryPrefix}_{Brand}_{Model}_{Year}`

**Examples**:
- `TC_BMW_x3_2023` (Turbocharger)
- `ST_BMW_320i_2022` (Starter)
- `AL_FORD_Focus_2022` (Alternator)

**Display Format in UI**: "BMW x3 2023 (TC_BMW_x3_2023)"

#### Component IDs
**Format**: `{CoreID}_{ComponentType}`

**Examples**:
- `TC_BMW_x3_2023_Housing`
- `TC_BMW_x3_2023_Turbine`
- `ST_BMW_320i_2022_Armature`

**Display Format in UI**: "Housing (78%)" - shows component type with condition rate

---

### 1.3 TypeScript Interfaces

```typescript
// lib/types.ts - Add to existing file

export interface CoreCategory {
  id: string;                    // 'turbocharger'
  name: string;                  // 'Turbocharger'
  description?: string;
  coreCount: number;             // Number of cores in this category
}

export interface Core {
  core_id: string;               // 'TC_BMW_x3_2023'
  category_id: string;           // 'turbocharger'
  category: string;              // 'Turbocharger' (display name)
  brand: string;                 // 'BMW'
  model: string;                 // 'x3'
  year: number;                  // 2023
  status: 'Active' | 'Inactive';
  isFavorite?: boolean;          // For "Planner's Favorites" preset
  isPriority?: boolean;          // For "High Priority" preset
  displayName: string;           // "BMW x3 2023"
  fullDisplayName: string;       // "BMW x3 2023 (TC_BMW_x3_2023)"
}

export interface Component {
  component_id: string;          // 'TC_BMW_x3_2023_Housing'
  core_id: string;               // 'TC_BMW_x3_2023'
  component_type: string;        // 'Housing'
  condition_rate: number;        // 78 (percentage 0-100)
  displayName: string;           // "Housing (78%)"
}

export interface WeeklyForecast {
  week_start: string;            // 'YYYY-MM-DD' format (Thursdays)
  core_id: string;               // 'TC_BMW_x3_2023'
  category: string;              // 'Turbocharger'
  weekly_supply: number;         // 30-150 units
}

export interface ComponentForecast {
  week_start: string;            // 'YYYY-MM-DD' format
  component_id: string;          // 'TC_BMW_x3_2023_Housing'
  core_id: string;               // 'TC_BMW_x3_2023'
  core_supply: number;           // Core weekly supply
  condition_rate: number;        // 78
  component_supply: number;      // Pre-calculated: core_supply × (condition_rate / 100)
}

export interface ChartDataPoint {
  date: string;                  // 'YYYY-MM-DD'
  week_label: string;            // 'May 1' or 'Week 18'
  totalSupply: number;           // Aggregated supply for selected filters
  isHistorical: boolean;         // true if date < today
  isForecast: boolean;           // true if date >= today
  breakdown: {                   // Core-level breakdown for tooltip
    core_id: string;
    core_display: string;
    supply: number;
    color: string;               // For stacked bars
  }[];
}
```

---

## 2. PRESET CONFIGURATIONS

### 2.1 All Categories (Default)
**Filter State**:
```typescript
{
  preset: 'all',
  categories: [],
  cores: [],
  components: []
}
```

**Behavior**: No filters applied, shows all 24 cores, all 120 components available.

---

### 2.2 Planner's Favorites
**Selected Cores** (3 random cores):
- `TC_BMW_x3_2023` (Turbocharger - BMW x3 2023)
- `AL_FORD_Focus_2022` (Alternator - FORD Focus 2022)
- `BC_MERCEDES_E350_2022` (Brake Caliper - MERCEDES E350 2022)

**Selected Components** (2 components):
- `TC_BMW_x3_2023_Housing` (Housing 78%)
- `AL_FORD_Focus_2022_Stator` (Stator 76%)

**Filter State**:
```typescript
{
  preset: 'favorites',
  categories: [],
  cores: ['TC_BMW_x3_2023', 'AL_FORD_Focus_2022', 'BC_MERCEDES_E350_2022'],
  components: ['TC_BMW_x3_2023_Housing', 'AL_FORD_Focus_2022_Stator']
}
```

**Data Flags**:
```typescript
// In cores data
{ core_id: 'TC_BMW_x3_2023', isFavorite: true, ... }
{ core_id: 'AL_FORD_Focus_2022', isFavorite: true, ... }
{ core_id: 'BC_MERCEDES_E350_2022', isFavorite: true, ... }
```

---

### 2.3 High Priority
**Selected Cores** (4 random cores):
- `TC_AUDI_A4_2021` (Turbocharger - AUDI A4 2021)
- `ST_MERCEDES_C300_2021` (Starter - MERCEDES C300 2021)
- `AC_BMW_x5_2023` (AC Compressor - BMW x5 2023)
- `EG_HYUNDAI_Tucson_2022` (EGR Valve - HYUNDAI Tucson 2022)

**Filter State**:
```typescript
{
  preset: 'high-priority',
  categories: [],
  cores: ['TC_AUDI_A4_2021', 'ST_MERCEDES_C300_2021', 'AC_BMW_x5_2023', 'EG_HYUNDAI_Tucson_2022'],
  components: []
}
```

**Data Flags**:
```typescript
// In cores data
{ core_id: 'TC_AUDI_A4_2021', isPriority: true, ... }
{ core_id: 'ST_MERCEDES_C300_2021', isPriority: true, ... }
{ core_id: 'AC_BMW_x5_2023', isPriority: true, ... }
{ core_id: 'EG_HYUNDAI_Tucson_2022', isPriority: true, ... }
```

---

### 2.4 Standard
**Logic**: Category-level preset for standard production cores

**Selected Categories**:
- Starters
- Alternators
- Brake Calipers

**Filter State**:
```typescript
{
  preset: 'standard',
  categories: ['starters', 'alternators', 'brake_calipers'],
  cores: [],
  components: []
}
```

**Behavior**: Shows all cores from selected categories (9 cores total: 3 per category).

---

## 3. DATA LOADING STRATEGY

### 3.1 Pre-Calculated Component Forecasts
**Decision**: Pre-calculate all component-level forecasts and store as hardcoded values.

**Calculation**:
```typescript
component_supply = Math.round(core_supply × (condition_rate / 100))
```

**Total Records**:
- Core Forecasts: 24 cores × 80 weeks = **1,920 records**
- Component Forecasts: 120 components × 80 weeks = **9,600 records**

**Storage**: Single TypeScript file for MVP

**File**: `frontend/lib/data/forecast-data.ts`

**Structure**:
```typescript
export const coreForecasts: WeeklyForecast[] = [
  // 1,920 core-level forecast records
  { week_start: '2025-05-01', core_id: 'TC_BMW_x3_2023', category: 'Turbocharger', weekly_supply: 47 },
  // ...
];

export const componentForecasts: ComponentForecast[] = [
  // 9,600 component-level forecast records (pre-calculated)
  { 
    week_start: '2025-05-01', 
    component_id: 'TC_BMW_x3_2023_Housing', 
    core_id: 'TC_BMW_x3_2023',
    core_supply: 47,
    condition_rate: 78,
    component_supply: 37  // 47 × 0.78 = 36.66 ≈ 37
  },
  // ...
];
```

---

### 3.2 Visible Data Loading
**Decision**: Load only visible time range data based on selected filter.

**Default View**: 1 Month (4 weeks)

**Time Range Options**:
1. **1 Month**: 2 weeks historical + 2 weeks forecast (4 weeks total)
2. **3 Months**: 6 weeks historical + 6 weeks forecast (12 weeks total)
3. **6 Months**: 12 weeks historical + 12 weeks forecast (24 weeks total)
4. **1 Year**: 26 weeks historical + 26 weeks forecast (52 weeks total)

**Today Line**: Always centered in chart view (vertical divider)

**Data Filtering Logic**:
```typescript
function getVisibleForecastData(
  timeRange: '1month' | '3months' | '6months' | '1year',
  selectedCores: string[],
  selectedComponents: string[]
): ChartDataPoint[] {
  const today = new Date('2025-11-30'); // Current date
  
  const rangeConfig = {
    '1month': { backWeeks: 2, forwardWeeks: 2 },
    '3months': { backWeeks: 6, forwardWeeks: 6 },
    '6months': { backWeeks: 12, forwardWeeks: 12 },
    '1year': { backWeeks: 26, forwardWeeks: 26 }
  };
  
  const { backWeeks, forwardWeeks } = rangeConfig[timeRange];
  
  // Calculate date range
  const startDate = addWeeks(today, -backWeeks);
  const endDate = addWeeks(today, forwardWeeks);
  
  // Filter forecast data to visible range
  // Aggregate based on selected cores/components
  // Mark historical vs. forecast
  // Return ChartDataPoint[]
}
```

---

## 4. AGGREGATION LOGIC

### 4.1 Core-Level Aggregation
**Decision**: Aggregate at core level, show breakdown within bars/areas.

**Scenario 1: Multiple Cores Selected**
```
User selects:
- Cores: [TC_BMW_x3_2023, ST_BMW_320i_2022]

Chart shows:
- Stacked bar/area chart
- Each core has its own color
- Bars show sum: TC_BMW_x3_2023_supply + ST_BMW_320i_2022_supply
- Tooltip on hover shows breakdown by core
```

**Scenario 2: Multiple Categories Selected**
```
User selects:
- Categories: [Turbocharger, Starters]

Chart shows:
- All cores from both categories (6 cores total: 3 turbo + 3 starters)
- Each core has unique color (same category cores use shades of same color)
- Stacked visualization shows contribution of each core
- Legend shows all 6 cores with color indicators
```

**Scenario 3: Components Selected**
```
User selects:
- Components: [TC_BMW_x3_2023_Housing, TC_BMW_x3_2023_Turbine]

Chart shows:
- Component-level aggregation
- Uses pre-calculated component_supply values
- Each component has unique color
- Tooltip shows: "Housing (78%): 37 units"
```

---

### 4.2 Chart Visualization Specifications

#### Stacked Bar/Area Chart
```typescript
interface ChartConfig {
  type: 'stacked-bar' | 'stacked-area';  // Toggle between views
  showLines: true;                        // Show lines between bars for each core
  lineStyle: 'solid';                     // All lines solid, not dashed
  colorScheme: 'per-core';                // Each core gets unique color from palette
  opacity: {
    historical: 0.6;                      // 60% opacity for past data (matter look)
    forecast: 1.0;                        // 100% opacity for future data
  };
  todayLine: {
    show: true;
    position: 'center';                   // Always centered
    style: 'dashed';
    color: '#000000';
    width: 2;
    label: 'Today';
  };
}
```

#### Color Palette (per Core)
```typescript
export const coreColorPalette = [
  '#0065BD', // TUM Blue (primary)
  '#E37222', // Orange
  '#A2AD00', // Green
  '#C01530', // Red
  '#6E685F', // Grey
  '#004A8D', // Dark Blue
  '#B85450', // Muted Red
  '#8A9A5B', // Olive Green
  '#7D3C98', // Purple
  '#2E86AB', // Teal
  '#F77F00', // Bright Orange
  '#06A77D', // Mint Green
];
```

**Assignment Logic**: Cores assigned colors in order of appearance. Same color used consistently for a core across all views.

---

### 4.3 KPI Aggregation
**Decision**: Show aggregate core-level KPIs when cores are selected.

**KPI Calculations**:
```typescript
interface AggregatedKPIs {
  totalSupply: number;              // Sum of weekly_supply across selected cores
  averageConditionRate: number;     // Average of all components in selected cores
  coreCount: number;                // Number of cores in selection
  componentCount: number;           // Number of components available
  forecastAccuracy: number;         // Placeholder for now (will specify later)
}
```

**Example**:
```
Selected Cores: [TC_BMW_x3_2023, ST_BMW_320i_2022]

KPI Card 1: Total Weekly Supply
Value: 125 units (47 + 78)
Trend: ↑ 8% vs. last week

KPI Card 2: Average Condition Rate
Value: 74% ((78+65+82+71+89) / 5 + (88+73+81+67+55) / 5) / 2
Trend: → Stable

KPI Card 3: Cores Selected
Value: 2 cores
Subcontent: "6 categories available"

KPI Card 4: Components Available
Value: 10 components
Subcontent: "5 per core"
```

**Note**: Detailed KPI logic will be specified in separate KPI feature plan.

---

## 5. CHART DATA TRANSFORMATION

### 5.1 Historical vs. Forecast Differentiation

**Today's Date**: 2025-11-30 (for reference in sample data)

**Visual Rules**:
1. **Historical Data** (date < today):
   - Opacity: 60%
   - Label: Shows actual supply values
   - Tooltip: "Historical Supply: [value] units"

2. **Today Line**:
   - Vertical dashed line at center
   - Label: "Today" (top of chart)
   - Color: Black (#000000)
   - Width: 2px

3. **Forecast Data** (date >= today):
   - Opacity: 100%
   - Label: Shows predicted supply values
   - Tooltip: "Forecast Supply: [value] units"
   - Matter look: Slightly translucent background

**Transformation Function**:
```typescript
function transformToChartData(
  forecastData: WeeklyForecast[],
  selectedCores: string[],
  timeRange: TimeRange
): ChartDataPoint[] {
  const today = new Date('2025-11-30');
  
  return forecastData.map(record => ({
    date: record.week_start,
    week_label: formatWeekLabel(record.week_start),
    totalSupply: calculateAggregateSupply(record, selectedCores),
    isHistorical: new Date(record.week_start) < today,
    isForecast: new Date(record.week_start) >= today,
    breakdown: getBreakdownByCores(record, selectedCores)
  }));
}
```

---

## 6. FILTER-TO-DATA MAPPING

### 6.1 Cascade Filter Logic

**Level 1: Category Selection**
```typescript
function getAvailableCores(selectedCategories: string[]): Core[] {
  if (selectedCategories.length === 0) return allCores;
  
  return allCores.filter(core => 
    selectedCategories.includes(core.category_id)
  );
}
```

**Level 2: Core Selection**
```typescript
function getAvailableComponents(selectedCores: string[]): Component[] {
  if (selectedCores.length === 0) return [];
  
  return allComponents.filter(component => 
    selectedCores.includes(component.core_id)
  );
}
```

**Level 3: Component Selection**
```typescript
function getComponentForecast(
  selectedComponents: string[],
  timeRange: TimeRange
): ComponentForecast[] {
  return componentForecasts.filter(forecast =>
    selectedComponents.includes(forecast.component_id) &&
    isInTimeRange(forecast.week_start, timeRange)
  );
}
```

---

### 6.2 Disabled State Handling

**Scenario**: User selects category but no forecast data available for time range.

**UI Behavior**:
1. Core dropdown shows all cores from category
2. Cores with no data in selected time range are:
   - Greyed out (opacity 50%)
   - Checkbox disabled
   - Tooltip on hover: "No forecast data available for selected time range"

**Implementation**:
```typescript
function getCoreAvailability(
  cores: Core[],
  timeRange: TimeRange
): CoreWithAvailability[] {
  return cores.map(core => {
    const hasData = coreForecasts.some(forecast =>
      forecast.core_id === core.core_id &&
      isInTimeRange(forecast.week_start, timeRange)
    );
    
    return {
      ...core,
      isAvailable: hasData,
      disabledReason: hasData ? null : 'No forecast data available for selected time range'
    };
  });
}
```

**Component Level**:
Same logic applies to components. If component has 0% condition rate or no forecast data, it appears greyed out with explanation tooltip.

---

## 7. DATA FILE STRUCTURE

### 7.1 File Organization
**Decision**: Single file for MVP to simplify management.

**File**: `frontend/lib/data/forecast-data.ts`

**Estimated Size**: ~1.5 MB (acceptable for MVP)

**Structure**:
```typescript
// frontend/lib/data/forecast-data.ts

import { Core, Component, WeeklyForecast, ComponentForecast, CoreCategory } from '@/lib/types';

// ===== CATEGORIES =====
export const coreCategories: CoreCategory[] = [
  { id: 'turbocharger', name: 'Turbocharger', coreCount: 3 },
  { id: 'starters', name: 'Starters', coreCount: 3 },
  { id: 'alternators', name: 'Alternators', coreCount: 3 },
  { id: 'ac_compressors', name: 'AC Compressors', coreCount: 3 },
  { id: 'brake_calipers', name: 'Brake Calipers', coreCount: 3 },
  { id: 'egr_valves', name: 'EGR Valves', coreCount: 3 },
  { id: 'steering_racks', name: 'Steering Racks', coreCount: 3 },
  { id: 'steering_pumps', name: 'Steering Pumps', coreCount: 3 },
];

// ===== CORES (24 total) =====
export const cores: Core[] = [
  // Turbochargers
  {
    core_id: 'TC_BMW_x3_2023',
    category_id: 'turbocharger',
    category: 'Turbocharger',
    brand: 'BMW',
    model: 'x3',
    year: 2023,
    status: 'Active',
    isFavorite: true,
    isPriority: false,
    displayName: 'BMW x3 2023',
    fullDisplayName: 'BMW x3 2023 (TC_BMW_x3_2023)'
  },
  // ... 23 more cores
];

// ===== COMPONENTS (120 total) =====
export const components: Component[] = [
  // TC_BMW_x3_2023 components
  {
    component_id: 'TC_BMW_x3_2023_Housing',
    core_id: 'TC_BMW_x3_2023',
    component_type: 'Housing',
    condition_rate: 78,
    displayName: 'Housing (78%)'
  },
  // ... 119 more components
];

// ===== CORE WEEKLY FORECASTS (1,920 records) =====
export const coreForecasts: WeeklyForecast[] = [
  // Week 1 - All cores
  { week_start: '2025-05-01', core_id: 'TC_BMW_x3_2023', category: 'Turbocharger', weekly_supply: 47 },
  { week_start: '2025-05-01', core_id: 'TC_AUDI_A4_2021', category: 'Turbocharger', weekly_supply: 92 },
  // ... 1,918 more records
];

// ===== COMPONENT FORECASTS (9,600 records - pre-calculated) =====
export const componentForecasts: ComponentForecast[] = [
  // Week 1 - TC_BMW_x3_2023 components
  { 
    week_start: '2025-05-01', 
    component_id: 'TC_BMW_x3_2023_Housing', 
    core_id: 'TC_BMW_x3_2023',
    core_supply: 47,
    condition_rate: 78,
    component_supply: 37
  },
  // ... 9,599 more records
];

// ===== PRESET CONFIGURATIONS =====
export const presetConfigs = {
  all: {
    categories: [],
    cores: [],
    components: []
  },
  favorites: {
    categories: [],
    cores: ['TC_BMW_x3_2023', 'AL_FORD_Focus_2022', 'BC_MERCEDES_E350_2022'],
    components: ['TC_BMW_x3_2023_Housing', 'AL_FORD_Focus_2022_Stator']
  },
  'high-priority': {
    categories: [],
    cores: ['TC_AUDI_A4_2021', 'ST_MERCEDES_C300_2021', 'AC_BMW_x5_2023', 'EG_HYUNDAI_Tucson_2022'],
    components: []
  },
  standard: {
    categories: ['starters', 'alternators', 'brake_calipers'],
    cores: [],
    components: []
  }
};

// ===== HELPER FUNCTIONS =====

// Get cores by category
export function getCoresByCategory(categoryIds: string[]): Core[] {
  if (categoryIds.length === 0) return cores;
  return cores.filter(core => categoryIds.includes(core.category_id));
}

// Get components by core
export function getComponentsByCore(coreIds: string[]): Component[] {
  if (coreIds.length === 0) return [];
  return components.filter(component => coreIds.includes(component.core_id));
}

// Get forecast for cores in time range
export function getCoreForecastData(
  coreIds: string[],
  startDate: string,
  endDate: string
): WeeklyForecast[] {
  return coreForecasts.filter(forecast =>
    coreIds.includes(forecast.core_id) &&
    forecast.week_start >= startDate &&
    forecast.week_start <= endDate
  );
}

// Get forecast for components in time range
export function getComponentForecastData(
  componentIds: string[],
  startDate: string,
  endDate: string
): ComponentForecast[] {
  return componentForecasts.filter(forecast =>
    componentIds.includes(forecast.component_id) &&
    forecast.week_start >= startDate &&
    forecast.week_start <= endDate
  );
}

// TODO: Replace with API calls in Phase 2
// - GET /api/categories
// - GET /api/cores?category={id}
// - GET /api/components?core={id}
// - GET /api/forecast/core?core_id={id}&start={date}&end={date}
// - GET /api/forecast/component?component_id={id}&start={date}&end={date}
```

---

## 8. CONTEXT INTEGRATION

### 8.1 FilterContext
**File**: `frontend/lib/contexts/FilterContext.tsx`

```typescript
interface FilterContextType {
  // Current filter state
  preset: PresetType;
  selectedCategories: string[];
  selectedCores: string[];
  selectedComponents: string[];
  timeRange: TimeRangeType;
  
  // Actions
  setPreset: (preset: PresetType) => void;
  toggleCategory: (categoryId: string) => void;
  toggleCore: (coreId: string) => void;
  toggleComponent: (componentId: string) => void;
  setTimeRange: (range: TimeRangeType) => void;
  clearAllFilters: () => void;
  applyFilters: () => void;
  
  // Computed data (memoized)
  availableCores: Core[];
  availableComponents: Component[];
  chartData: ChartDataPoint[];
  aggregatedKPIs: AggregatedKPIs;
  
  // State flags
  isLoading: boolean;
  hasActiveFilters: boolean;
}
```

---

### 8.2 Dashboard Component Integration

**Components that Subscribe to FilterContext**:

1. **ForecastChart.tsx**
   - Consumes: `chartData`, `timeRange`
   - Renders: Stacked bar/area chart with today line
   - Shows: Core-level breakdown with colors

2. **MetricGrid.tsx** (KPIs)
   - Consumes: `aggregatedKPIs`
   - Renders: 4 KPI cards with aggregated values
   - Shows: Total supply, avg condition rate, core count, etc.

3. **AlertSummary.tsx**
   - Consumes: `selectedCores`, `chartData`
   - Filters: Alerts relevant to selected cores
   - Shows: Alert count and 30-day trend

4. **CriticalActionsPanel.tsx**
   - Consumes: `selectedCores`
   - Filters: Critical actions for selected cores
   - Shows: Stock-low alerts, delivery notifications

5. **ForecastSelection.tsx** (Sidebar)
   - Consumes: All filter state and actions
   - Renders: Dropdowns, tags, action buttons
   - Triggers: Filter updates and dashboard refresh

---

## 9. IMPLEMENTATION CHECKLIST

### Phase 1: Data File Creation
- [ ] Create `frontend/lib/data/forecast-data.ts`
- [ ] Add all 8 categories
- [ ] Add all 24 cores with flags (isFavorite, isPriority)
- [ ] Add all 120 components with condition rates
- [ ] Add 1,920 core forecast records (80 weeks × 24 cores)
- [ ] Pre-calculate and add 9,600 component forecast records
- [ ] Add preset configurations
- [ ] Add helper functions

### Phase 2: Type Definitions
- [ ] Update `frontend/lib/types.ts` with new interfaces
- [ ] Add CoreCategory, Core, Component interfaces
- [ ] Add WeeklyForecast, ComponentForecast interfaces
- [ ] Add ChartDataPoint interface
- [ ] Add AggregatedKPIs interface
- [ ] Add PresetType and TimeRangeType enums

### Phase 3: FilterContext
- [ ] Create `frontend/lib/contexts/FilterContext.tsx`
- [ ] Implement state management
- [ ] Implement filter cascade logic
- [ ] Implement preset loading
- [ ] Implement data aggregation functions
- [ ] Add memoization for computed values

### Phase 4: Chart Integration
- [ ] Update ForecastChart.tsx to consume FilterContext
- [ ] Implement stacked bar/area visualization
- [ ] Add today line (centered, dashed)
- [ ] Implement historical vs. forecast opacity
- [ ] Add core breakdown in tooltip
- [ ] Implement time range selector

### Phase 5: Sidebar Integration
- [ ] Update ForecastSelection.tsx to use FilterContext
- [ ] Populate dropdowns with real data
- [ ] Implement cascade filtering (category → core → component)
- [ ] Implement preset application
- [ ] Add disabled state with tooltips
- [ ] Test all filter combinations

### Phase 6: KPI Integration
- [ ] Update MetricGrid.tsx to consume aggregated KPIs
- [ ] Implement aggregation logic
- [ ] Add breakdown tooltips
- [ ] Test with various filter selections

### Phase 7: Testing & Validation
- [ ] Test all preset configurations
- [ ] Test cascade filtering
- [ ] Test time range changes
- [ ] Test chart rendering with various selections
- [ ] Test disabled states
- [ ] Validate data accuracy (component = core × condition_rate)
- [ ] Performance testing (render time < 500ms)

---

## 10. FUTURE ENHANCEMENTS (Phase 2)

### API Integration
- Replace hardcoded data with REST API calls
- Implement pagination for large datasets
- Add caching layer (React Query or SWR)
- Real-time data updates via WebSocket

### Advanced Filtering
- Date range picker (custom start/end dates)
- Condition rate range filter (slider)
- Supply range filter (min/max units)
- Multi-criteria search (brand, model, year)

### Data Export
- Export filtered data as CSV
- Export chart as PNG/PDF
- Share filter configuration via URL params
- Save custom presets to user profile

---

## 11. NOTES & ASSUMPTIONS

### Date Format
- All dates stored as ISO 8601 strings: `YYYY-MM-DD`
- Week start always Thursday
- Current date for testing: `2025-11-30`

### Data Consistency
- All component_supply values pre-calculated and rounded
- No null or undefined values in critical fields
- All cores have exactly 5 components
- All forecast records span exactly 80 weeks

### Performance Targets
- Initial data load: < 1 second
- Filter application: < 500ms
- Chart render: < 300ms
- Dropdown open: < 100ms

---

## DOCUMENT CONTROL
- **Version**: 1.0
- **Last Updated**: November 30, 2025
- **Next Review**: After Phase 1 Implementation
- **Approved By**: [Pending]

---

**END OF DATA INTEGRATION PLAN**
