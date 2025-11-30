# Forecast Chart Feature Plan - Main Dashboard

## Document Information
- **Feature**: Main Dashboard Forecast Chart with Integrated Filter
- **Version**: 1.0
- **Date**: November 30, 2025
- **Status**: Design Specification
- **Related Documents**: 
  - PRD.md v2.1
  - data_integration_plan.md
  - sidebar_forecast_selection_featureplan.md

---

## 1. OVERVIEW

### Purpose
A sophisticated time-series forecast visualization that displays aggregated core/component supply data based on left sidebar filter selections. The chart provides supply chain planners with a clear view of historical actual supply, confirmed future supply, AI forecasts with confidence bands, and comparison with previous AI predictions.

### User Value
- **Visual Clarity**: Immediate understanding of supply trends through color-coded bars and lines
- **Forecast Transparency**: See current AI forecast vs previous predictions
- **Time Flexibility**: Switch between 1 month, 3 months, 6 months, and 1 year views
- **Filter Integration**: Chart dynamically updates based on sidebar core/component selections
- **Confidence Awareness**: 95% confidence band shows forecast uncertainty

### Key Principles
- **Today-Centric**: Today line always centered, equal past/future view
- **Stacked Aggregation**: Multiple cores/components stack within single bars
- **Visual Differentiation**: Past (solid), Future (semi-transparent), Forecasts (lines)
- **Data Accuracy**: All values computed from existing forecast data with realistic variations

---

## 2. SPATIAL LAYOUT & STRUCTURE

### Overall Container
```
┌─────────────────────────────────────────────────────────────────────────┐
│  Forecast Chart                                          [Section Header] │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ [1 Month] [3 Months] [6 Months] [1 Year]    [Download ↓] [Sync] │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                           │
│  Quantity                                                                 │
│    │                                                                      │
│ 150├─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─    │
│    │    ███                      │                                        │
│ 100├─ ─ ─ ███ ─ ─ ─ ─ ─ ─ ─ ─ ─ │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─    │
│    │    ███ ███ ░░░              │ ░░░    ░░░                            │
│  50├─ ─ ███ ███ ░░░ ─ ░░░ ─ ─ ─ │ ░░░ ─ ░░░ ─ ─ ─ ─ ─────────────     │
│    │ ███ ███ ███ ░░░ ░░░    ░░░  │ ░░░ ░░░ ░░░   ╱  ═══════════  ╲      │
│   0├─────────────────────────────┼──────────────────────────────────    │
│      Nov    Nov    Nov      Nov  │ Dec    Dec    Dec    Dec             │
│       5     12     19       26     TODAY   10     17     24             │
│                                                                           │
│  2025                                                                     │
│                                                                           │
│  Legend:                                                                  │
│  ━━━ Today Line    █ Historical Supply    ░ Confirmed Supply             │
│  ──── AI Forecast    ═══ AI 95% Confidence Band    ┈┈┈ Previous AI      │
└─────────────────────────────────────────────────────────────────────────┘
```

### Positioning
- **Location**: Main content area, center column between left sidebar (240px) and right panel (320px)
- **Width**: Flex-1 (fills remaining space, typically ~900-1200px on desktop)
- **Height**: 450px (chart area), +80px for controls/legend = 530px total
- **Container**: White background (#FFFFFF), rounded corners (12px), shadow
- **Spacing**: 24px margin on all sides from container edges

---

## 3. TIME RANGE SPECIFICATIONS

### Time Range Options & Data Aggregation

#### 1 Month View
- **Total Range**: 4 weeks (2 weeks past + 2 weeks future)
- **Granularity**: Weekly (7-day periods)
- **X-Axis Labels**: Week start dates (e.g., "Nov 18", "Nov 25", "Dec 2")
- **Data Points**: 4 bars total
- **Today Line**: Between week 2 and week 3

#### 3 Months View
- **Total Range**: 12 weeks (6 weeks past + 6 weeks future)
- **Granularity**: Weekly (7-day periods)
- **X-Axis Labels**: Week start dates every 2 weeks (e.g., "Oct 20", "Nov 3", "Nov 17")
- **Data Points**: 12 bars total
- **Today Line**: Between week 6 and week 7

#### 6 Months View
- **Total Range**: 6 months (3 months past + 3 months future)
- **Granularity**: Monthly (aggregated from weekly data)
- **Aggregation Logic**: Sum all weekly_supply values within each month
- **X-Axis Labels**: Month names (e.g., "Sep", "Oct", "Nov", "Dec", "Jan", "Feb")
- **Data Points**: 6 bars total
- **Today Line**: Between month 3 and month 4

#### 1 Year View
- **Total Range**: 12 months (6 months past + 6 months future)
- **Granularity**: Monthly (aggregated from weekly data)
- **Aggregation Logic**: Sum all weekly_supply values within each month
- **X-Axis Labels**: Month names (e.g., "Jun", "Jul", "Aug", ... "May")
- **Data Points**: 12 bars total
- **Today Line**: Between month 6 and month 7

### Default View
- **Default**: 3 Months (most common planning horizon)
- **Persistence**: Last selected time range stored in component state (not sessionStorage for MVP)

---

## 4. DATA STRUCTURE & SOURCES

### 4.1 Core Forecast Data
**Source**: `frontend/lib/data/forecast-data.ts` (already created)

```typescript
interface WeeklyForecast {
  week_start: string;            // 'YYYY-MM-DD' format
  core_id: string;               // 'TC_BMW_x3_2023'
  category: string;              // 'Turbocharger'
  weekly_supply: number;         // 30-150 units (AI forecast base)
}

// Example:
{ week_start: '2025-05-01', core_id: 'TC_BMW_x3_2023', category: 'Turbocharger', weekly_supply: 47 }
```

**Total Records**: 1,920 (24 cores × 80 weeks)

### 4.2 Component Forecast Data
**Source**: `frontend/lib/data/forecast-data.ts`

```typescript
interface ComponentForecast {
  week_start: string;            
  component_id: string;          // 'TC_BMW_x3_2023_Housing'
  core_id: string;               
  core_supply: number;           // Core weekly supply
  condition_rate: number;        // 78 (percentage)
  component_supply: number;      // Pre-calculated: core_supply × (condition_rate / 100)
}
```

**Total Records**: 9,600 (120 components × 80 weeks)

### 4.3 Derived Chart Data
**Generated in Component**: Based on user filter selections

```typescript
interface ChartDataPoint {
  date: string;                  // Week start date or month name
  week_label: string;            // Display label (e.g., "Nov 18" or "Nov 2025")
  
  // Bar data (stacked if multiple cores/components selected)
  actualSupply: number;          // Historical: AI forecast ± 5% random
  confirmedSupply: number;       // Future: Randomly generated on some weeks ± 50%
  
  // Line data
  aiForecas: number;            // Current AI forecast (from weekly_supply)
  previousAiForecast: number;    // Previous prediction ± 10% (future only)
  
  // Confidence band (future only)
  confidenceLower: number;       // AI forecast × 0.85
  confidenceUpper: number;       // AI forecast × 1.15
  
  // Metadata
  isHistorical: boolean;         // date < today
  isFuture: boolean;             // date >= today
  isToday: boolean;              // date === today (for today line)
  
  // Stacked breakdown (for tooltip)
  breakdown: {
    core_id: string;
    core_display: string;
    supply: number;
    color: string;
  }[];
}
```

---

## 5. VISUAL SPECIFICATIONS

### 5.1 Bar Chart Specifications

#### Bar Styling
**Historical Supply Bars (Past, date < today)**:
- **Color**: TUM Blue (#0065BD)
- **Opacity**: 100% (solid, full color)
- **Border**: None
- **Width**: 80% of available space per x-axis point
- **Stacking**: Multiple cores/components stack vertically within one bar

**Confirmed Supply Bars (Future, date >= today)**:
- **Color**: TUM Blue (#0065BD)
- **Opacity**: 70% ("leicht matt" - slightly matte/transparent)
- **Border**: None
- **Width**: 80% of available space per x-axis point
- **Stacking**: Multiple cores/components stack vertically within one bar

#### Stacked Bar Separation
When multiple cores/components are selected:
- **Separation Line**: Thin horizontal grey line (#D3D0CC), 1px width
- **Position**: Between each segment in stacked bar
- **Purpose**: Visual distinction of different cores/components

**Stacking Order**: 
1. Sorted by core_id alphabetically
2. If components selected, sorted by component_id alphabetically

#### Bar Hover Effect
- **Hover State**: Slightly darker shade of blue (#004A8D)
- **Cursor**: Pointer
- **Tooltip**: Appears on hover (see section 5.7)

### 5.2 Today Line Specifications
- **Type**: Vertical dashed line
- **Color**: Black (#000000)
- **Width**: 2px
- **Dash Pattern**: 8px dash, 4px gap
- **Position**: Centered in chart (between past and future data)
- **Label**: "TODAY" above line, 12px font, weight 600, Secondary Grey (#6E685F)
- **Z-Index**: Above bars, below lines (render order: bars → today line → forecast lines)

### 5.3 AI Forecast Line (Current)
**Historical Portion (Past, until today line)**:
- **Color**: TUM Blue (#0065BD) - highlight color
- **Style**: Solid line
- **Width**: 3px
- **Opacity**: 100%
- **Data Points**: Markers at each week (circle, 6px diameter, filled)

**Future Portion (After today line)**:
- **Color**: TUM Blue (#0065BD)
- **Style**: Dashed line
- **Width**: 3px
- **Dash Pattern**: 10px dash, 6px gap
- **Opacity**: 100%
- **Data Points**: Markers at each week (circle, 6px diameter, filled)

### 5.4 Previous AI Forecast Line
- **Visibility**: Future only (starts from today line, extends right)
- **Color**: Grey (#6E685F)
- **Style**: Dashed line
- **Width**: 2px
- **Dash Pattern**: 6px dash, 4px gap
- **Opacity**: 80%
- **Data Points**: No markers (cleaner appearance)
- **Purpose**: Show what AI predicted in the past for comparison

### 5.5 AI Forecast 95% Confidence Band
- **Visibility**: Future only (after today line)
- **Color**: Light TUM Blue (rgba(0, 101, 189, 0.15)) - 15% opacity
- **Style**: Filled area between upper and lower bounds
- **Border**: None
- **Calculation**:
  - **Lower Bound**: AI forecast × 0.85 (15% below)
  - **Upper Bound**: AI forecast × 1.15 (15% above)
- **Rendering**: Behind forecast lines, above grid

### 5.6 Grid & Axes

#### Background Grid
- **Color**: Light Grey (#E5E5E5)
- **Style**: Solid thin lines (1px)
- **Horizontal Lines**: Every 25 units on Y-axis (e.g., 0, 25, 50, 75, 100, 125, 150)
- **Vertical Lines**: None (cleaner look, x-axis labels sufficient)
- **Z-Index**: Lowest (behind all chart elements)

#### Y-Axis (Left)
- **Label**: "Quantity" at top of axis, 12px, weight 500, Secondary Grey (#6E685F)
- **Tick Labels**: 0, 25, 50, 75, 100, 125, 150, etc. (auto-scale)
- **Font**: 11px, weight 400, Secondary Grey (#6E685F)
- **Scale**: Auto-scale to data range with 10% padding at top
- **Starting Point**: Always 0 (never negative)
- **Grid Lines**: Match horizontal grid lines

#### X-Axis (Bottom)
- **Labels**: Week dates or month names
  - **1 Month / 3 Months**: Week start dates ("Nov 18", "Nov 25", "Dec 2")
  - **6 Months / 1 Year**: Month names ("Sep", "Oct", "Nov", "Dec")
- **Font**: 11px, weight 400, Secondary Grey (#6E685F)
- **Rotation**: None (horizontal)
- **Year Label**: Below x-axis, centered, "2025" or "2025 - 2026" if spanning years
- **Font**: 12px, weight 500, Black (#000000)

### 5.7 Tooltip Specifications

#### Trigger
- **Hover**: Over bar or forecast line point
- **Delay**: 100ms (prevents flicker on quick mouse movements)

#### Tooltip Content (Bar Hover)
```
Week: Nov 18 - Nov 24, 2025

Historical Supply: 142 units
  TC_BMW_x3_2023: 48 units
  ST_BMW_320i_2022: 94 units

AI Forecast: 138 units
Difference: +4 units (+2.9%)
```

**For Future Bars**:
```
Week: Dec 2 - Dec 8, 2025

Confirmed Supply: 67 units
  TC_BMW_x3_2023: 42 units
  ST_BMW_320i_2022: 25 units

AI Forecast: 145 units
Previous AI Forecast: 152 units
95% Confidence: 123 - 167 units
```

#### Tooltip Styling
- **Background**: White (#FFFFFF)
- **Border**: 1px solid #D3D0CC
- **Border Radius**: 8px
- **Padding**: 12px 16px
- **Shadow**: 0 4px 8px rgba(0, 0, 0, 0.12)
- **Font**: 12px, weight 400, Black (#000000)
- **Section Headers**: 12px, weight 600, Secondary Grey (#6E685F)
- **Max Width**: 320px
- **Pointer**: Small triangle pointing to hovered element

---

## 6. CONTROL PANEL SPECIFICATIONS

### 6.1 Time Range Buttons

#### Button Group Layout
```
[1 Month] [3 Months] [6 Months] [1 Year]    [Download ↓] [Sync to ERP]
```

**Position**: Top of chart area, left-aligned
**Spacing**: 8px gap between buttons
**Right Buttons**: Right-aligned with 16px gap between them

#### Time Range Button Styling
**Default State**:
- **Background**: White (#FFFFFF)
- **Border**: 1px solid #D3D0CC
- **Border Radius**: 6px
- **Padding**: 8px 16px
- **Font**: 14px, weight 500, Secondary Grey (#6E685F)
- **Height**: 36px
- **Cursor**: Pointer

**Active State** (selected time range):
- **Background**: TUM Blue (#0065BD)
- **Border**: 1px solid #0065BD
- **Color**: White (#FFFFFF)
- **Font Weight**: 600

**Hover State** (non-active):
- **Background**: #F5F5F5
- **Border**: 1px solid #A2A2A2

**Transition**: All 200ms ease

### 6.2 Download Button

#### Styling
- **Background**: White (#FFFFFF)
- **Border**: 1px solid #D3D0CC
- **Border Radius**: 6px
- **Padding**: 8px 16px
- **Font**: 14px, weight 500, Secondary Grey (#6E685F)
- **Icon**: Download icon (↓) from lucide-react, 16px, left of text
- **Text**: "Download"
- **Height**: 36px
- **Cursor**: Pointer

**Hover**:
- **Background**: #F5F5F5

#### Behavior (MVP)
- **Click**: Shows dropdown menu:
  - Download as PNG
  - Download as CSV
  - Download as PDF
- **All Options**: Show toast "Feature coming soon" (dummy for MVP)

### 6.3 Sync to ERP Button

#### Styling
- **Background**: Accent Green (#A2AD00)
- **Border**: None
- **Border Radius**: 6px
- **Padding**: 8px 16px
- **Font**: 14px, weight 600, White (#FFFFFF)
- **Icon**: Refresh icon from lucide-react, 16px, left of text
- **Text**: "Sync to ERP"
- **Height**: 36px
- **Cursor**: Pointer

**Hover**:
- **Background**: Darker Green (#8A9400)

#### Behavior (MVP)
- **Click**: Shows toast notification:
  - **Message**: "ERP sync feature coming soon"
  - **Type**: Info
  - **Duration**: 3 seconds
  - **Position**: Top-right of viewport

---

## 7. LEGEND SPECIFICATIONS

### Legend Layout
```
━━━ Today Line    █ Historical Supply    ░ Confirmed Supply    
──── AI Forecast    ═══ AI 95% Confidence Band    ┈┈┈ Previous AI Forecast
```

**Position**: Below chart, above year label
**Alignment**: Horizontal row, centered
**Wrapping**: Wraps to 2 rows if screen width < 900px

### Legend Item Styling
Each legend item consists of:
1. **Visual Indicator**: Line/bar sample (20px width, 3px height/line width)
2. **Label**: Text description

**Spacing**:
- **Between Items**: 24px horizontal gap
- **Between Rows** (if wrapped): 12px vertical gap
- **Icon-to-Label**: 8px gap

**Font**:
- **Size**: 12px
- **Weight**: 500
- **Color**: Secondary Grey (#6E685F)

### Legend Items

#### 1. Today Line
- **Visual**: Black dashed vertical line (2px, 20px length, 8px dash / 4px gap)
- **Label**: "Today Line"

#### 2. Historical Supply
- **Visual**: Solid TUM Blue rectangle (#0065BD, 20px × 12px, 100% opacity)
- **Label**: "Historical Supply"

#### 3. Confirmed Supply
- **Visual**: Semi-transparent TUM Blue rectangle (#0065BD, 20px × 12px, 70% opacity)
- **Label**: "Confirmed Supply"

#### 4. AI Forecast
- **Visual**: Solid TUM Blue line (#0065BD, 3px width, 20px length)
- **Label**: "AI Forecast"

#### 5. AI 95% Confidence Band
- **Visual**: Light blue filled rectangle (rgba(0, 101, 189, 0.15), 20px × 12px)
- **Label**: "AI 95% Confidence Band"

#### 6. Previous AI Forecast
- **Visual**: Grey dashed line (#6E685F, 2px width, 20px length, 6px dash / 4px gap)
- **Label**: "Previous AI Forecast"

---

## 8. DATA GENERATION LOGIC

### 8.1 Historical Actual Supply
**Purpose**: Show actual supply received in the past (bars, past weeks)

**Data Source**: `weekly_supply` from forecast data (AI forecast base)

**Calculation**:
```typescript
function generateActualSupply(aiForecas: number): number {
  // ± 5% random deviation from AI forecast
  const deviation = (Math.random() - 0.5) * 0.1; // -5% to +5%
  const actual = Math.round(aiForecas * (1 + deviation));
  return Math.max(0, actual); // Never negative
}
```

**Example**:
- AI Forecast: 100 units
- Actual Supply: 95-105 units (random)

### 8.2 Future Confirmed Supply
**Purpose**: Show confirmed incoming supply (bars, future weeks with orders)

**Logic**: Randomly generated on ~30-40% of future weeks

**Calculation**:
```typescript
function generateConfirmedSupply(aiForecas: number): number | null {
  // Only 30-40% of future weeks have confirmed supply
  if (Math.random() > 0.35) return null;
  
  // ± 50% random deviation from AI forecast
  const deviation = (Math.random() - 0.5); // -50% to +50%
  const confirmed = Math.round(aiForecas * (1 + deviation));
  return Math.max(0, confirmed); // Never negative
}
```

**Display**: If null, bar is empty/not rendered for that week

### 8.3 Previous AI Forecast
**Purpose**: Show what AI predicted in the past for comparison (grey dashed line, future only)

**Logic**: Starts from today, extends into future

**Calculation**:
```typescript
function generatePreviousForecast(currentAiForecast: number): number {
  // ± 10% random deviation from current AI forecast
  const deviation = (Math.random() - 0.5) * 0.2; // -10% to +10%
  const previous = Math.round(currentAiForecast * (1 + deviation));
  return Math.max(0, previous);
}
```

**Example**:
- Current AI Forecast: 100 units
- Previous AI Forecast: 90-110 units (random)

### 8.4 AI Forecast Confidence Band
**Purpose**: Show 95% prediction interval (light blue shaded area, future only)

**Calculation**:
```typescript
function generateConfidenceBand(aiForecas: number) {
  return {
    lower: Math.round(aiForecas * 0.85), // 15% below
    upper: Math.round(aiForecas * 1.15)  // 15% above
  };
}
```

---

## 9. FILTER INTEGRATION LOGIC

### 9.1 Data Aggregation Based on Filter Selection

#### Scenario 1: Multiple Cores Selected (No Components)
**User Selection**: 
- Cores: [TC_BMW_x3_2023, ST_BMW_320i_2022]

**Aggregation Logic**:
```typescript
// For each week, sum weekly_supply across selected cores
const aggregatedSupply = selectedCores.reduce((sum, coreId) => {
  const coreData = coreForecasts.find(f => 
    f.core_id === coreId && f.week_start === currentWeek
  );
  return sum + (coreData?.weekly_supply || 0);
}, 0);
```

**Chart Display**:
- Single bar per week showing total of both cores
- Bar has grey separation line in middle (50% mark if equal supply)
- Tooltip shows breakdown by core

#### Scenario 2: Components Selected
**User Selection**:
- Components: [TC_BMW_x3_2023_Housing, TC_BMW_x3_2023_Turbine]

**Aggregation Logic**:
```typescript
// For each week, sum component_supply across selected components
const aggregatedSupply = selectedComponents.reduce((sum, compId) => {
  const compData = componentForecasts.find(f => 
    f.component_id === compId && f.week_start === currentWeek
  );
  return sum + (compData?.component_supply || 0);
}, 0);
```

**Chart Display**:
- Single bar per week showing total of both components
- Bar has grey separation line between component portions
- Tooltip shows breakdown by component type

#### Scenario 3: Multiple Cores + Components Mixed
**User Selection**:
- Cores: [TC_BMW_x3_2023]
- Components: [ST_BMW_320i_2022_Housing]

**Aggregation Logic**:
```typescript
// For each week:
// 1. Sum weekly_supply for selected cores
// 2. Sum component_supply for selected components
// 3. Add both together
const coreTotal = selectedCores.reduce(...);
const componentTotal = selectedComponents.reduce(...);
const aggregatedSupply = coreTotal + componentTotal;
```

### 9.2 Filter Change Behavior
**Trigger**: User changes selection in left sidebar

**Process**:
1. FilterContext updates `filterState`
2. Chart component re-renders
3. Aggregation function recalculates based on new selection
4. Chart data transformed to ChartDataPoint[]
5. Recharts re-renders with new data

**Performance**: Memoize aggregation with `useMemo` on `filterState.cores` and `filterState.components`

### 9.3 No Selection State
**Scenario**: User clears all filters (preset: 'all', no cores/components selected)

**Behavior**: 
- Chart shows message: "Select cores or components from the left sidebar to view forecast"
- Alternative: Show aggregated view of ALL cores (24 cores summed)

**Recommendation**: Show ALL cores aggregated (better UX)

---

## 10. RESPONSIVE DESIGN

### Desktop (1024px+)
- **Chart Height**: 450px
- **Time Range Buttons**: Horizontal row, all visible
- **Legend**: Horizontal row, 1-2 rows max
- **X-Axis Labels**: Full dates/month names

### Tablet (768px - 1023px)
- **Chart Height**: 400px
- **Time Range Buttons**: Horizontal row, slightly smaller padding
- **Legend**: Wraps to 2 rows
- **X-Axis Labels**: Abbreviated dates (e.g., "11/18")

### Mobile (320px - 767px)
- **Chart Height**: 300px
- **Time Range Buttons**: 2×2 grid or vertical stack
- **Download/Sync Buttons**: Full width below time range buttons
- **Legend**: Vertical list, each item on own row
- **X-Axis Labels**: Rotated 45° or abbreviated

---

## 11. COMPONENT ARCHITECTURE

### File Structure
```
frontend/
├── components/
│   └── features/
│       └── dashboard/
│           ├── ForecastChart.tsx           # Main chart component
│           ├── ChartControls.tsx           # Time range + action buttons
│           ├── ChartLegend.tsx             # Legend component
│           └── ChartTooltip.tsx            # Custom tooltip
│
├── lib/
│   ├── hooks/
│   │   └── useChartData.ts                # Data aggregation hook
│   │
│   └── utils/
│       └── chartDataTransform.ts          # Data transformation utilities
```

### Component Hierarchy
```typescript
<ForecastChart>
  <ChartControls 
    timeRange={timeRange}
    onTimeRangeChange={setTimeRange}
    onDownload={handleDownload}
    onSyncERP={handleSyncERP}
  />
  
  <ResponsiveContainer>
    <ComposedChart data={chartData}>
      {/* Bars for actual/confirmed supply */}
      <Bar dataKey="actualSupply" stackId="supply" fill="#0065BD" />
      
      {/* Confidence band (Area) */}
      <Area 
        dataKey="confidenceLower" 
        dataKey="confidenceUpper"
        fill="rgba(0, 101, 189, 0.15)"
      />
      
      {/* AI Forecast line */}
      <Line 
        dataKey="aiForecas" 
        stroke="#0065BD" 
        strokeWidth={3}
        strokeDasharray={isHistorical ? "0" : "10 6"}
      />
      
      {/* Previous AI Forecast line */}
      <Line 
        dataKey="previousAiForecast" 
        stroke="#6E685F" 
        strokeWidth={2}
        strokeDasharray="6 4"
      />
      
      {/* Today line (ReferenceLine) */}
      <ReferenceLine 
        x={todayIndex} 
        stroke="#000000" 
        strokeWidth={2}
        strokeDasharray="8 4"
        label="TODAY"
      />
      
      <XAxis dataKey="week_label" />
      <YAxis label="Quantity" />
      <CartesianGrid stroke="#E5E5E5" strokeDasharray="0" />
      <Tooltip content={<ChartTooltip />} />
    </ComposedChart>
  </ResponsiveContainer>
  
  <ChartLegend />
</ForecastChart>
```

---

## 12. DATA HOOK SPECIFICATION

### useChartData Hook
**File**: `frontend/lib/hooks/useChartData.ts`

```typescript
import { useMemo } from 'react';
import { useFilters } from '@/lib/contexts/FilterContext';
import { coreForecasts, componentForecasts } from '@/lib/data/forecast-data';

interface UseChartDataOptions {
  timeRange: '1month' | '3months' | '6months' | '1year';
}

export function useChartData({ timeRange }: UseChartDataOptions) {
  const { filterState } = useFilters();
  
  const chartData = useMemo(() => {
    // 1. Determine date range based on timeRange
    const { startDate, endDate, granularity } = getDateRange(timeRange);
    
    // 2. Filter forecast data by selected cores/components
    const relevantForecasts = getRelevantForecasts(
      filterState.cores,
      filterState.components,
      startDate,
      endDate
    );
    
    // 3. Aggregate by week or month depending on granularity
    const aggregated = aggregateByPeriod(relevantForecasts, granularity);
    
    // 4. Transform to ChartDataPoint[] format
    const transformed = transformToChartData(aggregated, granularity);
    
    // 5. Generate derived data (actual, confirmed, previous forecast)
    const withDerivedData = generateDerivedData(transformed);
    
    return withDerivedData;
  }, [filterState.cores, filterState.components, timeRange]);
  
  return chartData;
}
```

### Helper Functions

#### getDateRange
```typescript
function getDateRange(timeRange: TimeRangeType) {
  const today = new Date('2025-11-30');
  
  const configs = {
    '1month': { backWeeks: 2, forwardWeeks: 2, granularity: 'week' },
    '3months': { backWeeks: 6, forwardWeeks: 6, granularity: 'week' },
    '6months': { backMonths: 3, forwardMonths: 3, granularity: 'month' },
    '1year': { backMonths: 6, forwardMonths: 6, granularity: 'month' }
  };
  
  const config = configs[timeRange];
  
  // Calculate startDate and endDate based on config
  // Return { startDate, endDate, granularity }
}
```

#### aggregateByPeriod
```typescript
function aggregateByPeriod(
  forecasts: (WeeklyForecast | ComponentForecast)[],
  granularity: 'week' | 'month'
) {
  if (granularity === 'week') {
    // Group by week_start, sum weekly_supply or component_supply
    return groupByWeek(forecasts);
  } else {
    // Group by month (year-month), sum all weeks in that month
    return groupByMonth(forecasts);
  }
}
```

#### generateDerivedData
```typescript
function generateDerivedData(chartData: ChartDataPoint[]) {
  const today = new Date('2025-11-30');
  
  return chartData.map(point => {
    const isHistorical = new Date(point.date) < today;
    const isFuture = !isHistorical;
    
    return {
      ...point,
      isHistorical,
      isFuture,
      
      // Actual supply (past only): AI forecast ± 5%
      actualSupply: isHistorical 
        ? generateActualSupply(point.aiForecas) 
        : null,
      
      // Confirmed supply (future only): Random ~35% of weeks ± 50%
      confirmedSupply: isFuture 
        ? generateConfirmedSupply(point.aiForecas) 
        : null,
      
      // Previous AI forecast (future only): Current ± 10%
      previousAiForecast: isFuture 
        ? generatePreviousForecast(point.aiForecas) 
        : null,
      
      // Confidence band (future only): ± 15%
      confidenceLower: isFuture ? point.aiForecas * 0.85 : null,
      confidenceUpper: isFuture ? point.aiForecas * 1.15 : null
    };
  });
}
```

---

## 13. INTERACTION FLOWS

### Flow 1: User Changes Time Range
**Step 1**: User clicks "6 Months" button
- Button becomes active (blue background)
- Previous active button returns to default state

**Step 2**: Chart updates
- X-axis changes from weekly dates to monthly labels
- Data re-aggregates from weekly to monthly totals
- Chart re-renders with 6 data points (3 past + 3 future)
- Today line remains centered

**Step 3**: Legend remains unchanged
- All elements still visible and explained

**Performance**: < 300ms transition time

### Flow 2: User Changes Filter Selection
**Step 1**: User selects additional core in left sidebar
- FilterContext updates `filterState.cores`

**Step 2**: Chart detects change via useChartData
- Re-runs aggregation logic
- Adds new core's supply to existing bars
- Stacked bars now show separation line

**Step 3**: Tooltip updates
- Breakdown section adds new core entry
- Shows individual contribution

**Performance**: < 200ms update time

### Flow 3: User Hovers Over Bar
**Step 1**: Mouse enters bar area
- Bar color darkens slightly (#004A8D)
- Cursor changes to pointer

**Step 2**: Tooltip appears (100ms delay)
- Positioned near mouse cursor
- Shows week range, supply values, breakdown
- Displays AI forecast comparison

**Step 3**: Mouse exits bar area
- Bar returns to normal color
- Tooltip fades out (200ms transition)

### Flow 4: User Clicks Download Button
**Step 1**: Dropdown menu appears below button
- Options: PNG, CSV, PDF

**Step 2**: User selects option
- Toast notification appears: "Feature coming soon"
- Menu closes

**Alternative (Future)**: Actually generate and download file

### Flow 5: User Clicks Sync to ERP
**Step 1**: Button shows brief loading state (spinner)

**Step 2**: Toast notification appears
- Message: "ERP sync feature coming soon"
- Type: Info (blue background)
- Duration: 3 seconds

**Alternative (Future)**: Actually sync data to ERP system

---

## 14. ACCESSIBILITY

### Keyboard Navigation
- **Tab**: Move between time range buttons, download, sync buttons
- **Enter/Space**: Activate button
- **Arrow Keys**: Navigate time range buttons when focused
- **Esc**: Close dropdown menus

### Screen Reader Support
- **Chart Container**: `role="img"` with `aria-label="Forecast chart showing historical and predicted supply"`
- **Time Range Buttons**: `aria-label="Select 1 month time range"`, `aria-pressed="true"` when active
- **Download Button**: `aria-label="Download chart data"`
- **Sync Button**: `aria-label="Sync forecast to ERP system"`
- **Bars**: `aria-label="Week of Nov 18, Historical supply 142 units"`
- **Lines**: `aria-label="AI forecast line"`
- **Today Line**: `aria-label="Today marker, November 30, 2025"`

### Color Contrast
- **All Text**: ≥ 4.5:1 against backgrounds (WCAG AA)
- **Bars**: TUM Blue (#0065BD) sufficient contrast against white
- **Lines**: 3px width ensures visibility
- **Grey Elements**: #6E685F meets contrast requirements

### Focus Indicators
- **Buttons**: 2px blue outline (#0065BD) with 2px offset
- **Visible**: Always visible when element has focus
- **High Contrast**: Works in Windows High Contrast mode

---

## 15. PERFORMANCE CONSIDERATIONS

### Data Optimization
- **Memoization**: Use `useMemo` for chart data transformation
- **Dependency Array**: Only re-compute when filters or time range change
- **Lazy Calculation**: Don't generate all 80 weeks, only visible range

### Rendering Optimization
- **React.memo**: Wrap ChartControls and ChartLegend
- **Recharts Config**: Set `isAnimationActive={false}` for large datasets
- **Debounce**: Debounce filter changes (200ms) to prevent excessive re-renders

### Data Size
- **1 Month**: ~4 data points (minimal)
- **3 Months**: ~12 data points (acceptable)
- **6 Months**: ~6 data points (aggregated to months, smaller)
- **1 Year**: ~12 data points (aggregated to months, smaller)

**Estimated Render Time**: < 200ms for all time ranges

---

## 16. TESTING CHECKLIST

### Functional Tests
- [ ] Chart loads with default 3 months view
- [ ] All 4 time range buttons work correctly
- [ ] Time range change updates chart data appropriately
- [ ] Weekly granularity shows for 1 month and 3 months
- [ ] Monthly granularity shows for 6 months and 1 year
- [ ] Today line always centered in chart
- [ ] Historical bars are solid blue
- [ ] Future bars are semi-transparent blue
- [ ] AI forecast line is solid until today, dashed after
- [ ] Previous AI forecast line only shows in future
- [ ] Confidence band only shows in future
- [ ] Grid lines visible behind all elements
- [ ] Y-axis auto-scales to data range
- [ ] X-axis shows correct labels for granularity
- [ ] Year label shows correct year(s)
- [ ] Tooltip appears on bar hover
- [ ] Tooltip shows correct data breakdown
- [ ] Tooltip shows confidence band in future
- [ ] Legend shows all 6 elements
- [ ] Legend items match visual appearance
- [ ] Download button opens dropdown
- [ ] Download options show "coming soon" toast
- [ ] Sync to ERP shows "coming soon" toast
- [ ] Filter change updates chart data
- [ ] Multiple cores stack correctly in bars
- [ ] Multiple components stack correctly in bars
- [ ] Stacked bars show grey separation lines
- [ ] No selection shows appropriate message or all cores

### Data Accuracy Tests
- [ ] Actual supply is AI forecast ± 5%
- [ ] Confirmed supply is AI forecast ± 50%
- [ ] Confirmed supply only on ~35% of future weeks
- [ ] Previous forecast is current forecast ± 10%
- [ ] Confidence band is AI forecast ± 15%
- [ ] Monthly aggregation sums all weeks correctly
- [ ] Stacked totals match individual components
- [ ] No negative values in any data

### Visual Tests
- [ ] Colors match design system (TUM Blue, Grey, etc.)
- [ ] Font sizes match specification
- [ ] Bar opacity correct (100% past, 70% future)
- [ ] Line widths correct (3px AI, 2px previous, 2px today)
- [ ] Dash patterns correct
- [ ] Grid color is light grey (#E5E5E5)
- [ ] Separation lines between stacked bars visible
- [ ] Hover effect darkens bars
- [ ] Active button has blue background
- [ ] Tooltip styled correctly
- [ ] Legend items properly formatted

### Responsive Tests
- [ ] Desktop (1024px+): Full layout
- [ ] Tablet (768-1023px): Adapted layout
- [ ] Mobile (320-767px): Stacked/vertical layout
- [ ] Chart height adjusts per breakpoint
- [ ] Buttons adapt to screen size
- [ ] Legend wraps appropriately
- [ ] X-axis labels readable at all sizes
- [ ] No horizontal scroll

### Accessibility Tests
- [ ] All buttons keyboard accessible
- [ ] Tab order logical
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Screen reader announces chart content
- [ ] Color contrast meets WCAG AA
- [ ] Works in high contrast mode

### Performance Tests
- [ ] Chart renders in < 200ms
- [ ] Filter change updates in < 200ms
- [ ] Time range change in < 300ms
- [ ] No memory leaks on repeated renders
- [ ] Tooltip appears/disappears smoothly
- [ ] No layout shifts during load

---

## 17. IMPLEMENTATION PHASES

### Phase 1: Core Chart Structure (Week 1)
- [ ] Create ForecastChart.tsx component
- [ ] Set up Recharts ComposedChart with basic bars
- [ ] Implement ChartControls with time range buttons
- [ ] Add basic data transformation logic
- [ ] Display simple bar chart with hardcoded data

### Phase 2: Data Integration (Week 1-2)
- [ ] Create useChartData hook
- [ ] Implement date range calculation
- [ ] Integrate with FilterContext
- [ ] Add aggregation logic for cores/components
- [ ] Generate actual supply from forecast data
- [ ] Generate confirmed supply randomly

### Phase 3: Forecast Lines (Week 2)
- [ ] Add AI forecast line (solid/dashed)
- [ ] Add previous AI forecast line (grey dashed)
- [ ] Implement confidence band (shaded area)
- [ ] Add today line (vertical dashed)
- [ ] Style all lines per specification

### Phase 4: Stacking & Breakdown (Week 2)
- [ ] Implement stacked bars for multiple cores
- [ ] Add grey separation lines
- [ ] Create breakdown data structure
- [ ] Test various filter combinations

### Phase 5: Polish & Interactions (Week 3)
- [ ] Create custom tooltip component
- [ ] Add hover effects on bars
- [ ] Implement download dropdown (dummy)
- [ ] Implement sync button (dummy toast)
- [ ] Add legend component
- [ ] Style all elements per design system

### Phase 6: Responsive & Accessibility (Week 3)
- [ ] Add responsive breakpoints
- [ ] Test on mobile/tablet/desktop
- [ ] Add keyboard navigation
- [ ] Add ARIA labels
- [ ] Test with screen reader
- [ ] Verify color contrast

### Phase 7: Testing & Refinement (Week 4)
- [ ] Run full test checklist
- [ ] Fix any bugs found
- [ ] Optimize performance
- [ ] User acceptance testing
- [ ] Final polish

---

## 18. FUTURE ENHANCEMENTS (Post-MVP)

### Advanced Features
1. **Real Download Functionality**
   - Export chart as PNG (using html2canvas)
   - Export data as CSV
   - Export report as PDF

2. **ERP Sync Integration**
   - Connect to actual ERP system
   - Show sync status
   - Display last sync time
   - Handle sync errors

3. **Zoom & Pan**
   - Mouse wheel zoom
   - Click-drag pan
   - Reset zoom button

4. **Annotations**
   - User can add notes to specific weeks
   - Show event markers (holidays, promotions)
   - Link annotations to alerts

5. **Comparison Mode**
   - Compare current forecast vs previous period
   - Show year-over-year comparison
   - Highlight significant changes

6. **Forecast Editing**
   - Allow manual override of AI forecast
   - Show edited vs original forecast
   - Track edit history

---

## 19. ACCEPTANCE CRITERIA

### Must Have (MVP)
✅ Chart displays with default 3 months view  
✅ All 4 time range options functional  
✅ Historical bars (solid blue) and confirmed bars (transparent blue)  
✅ AI forecast line (solid past, dashed future)  
✅ Previous AI forecast line (grey dashed, future only)  
✅ Confidence band (light blue, future only)  
✅ Today line (vertical dashed, centered)  
✅ Grid lines visible behind chart  
✅ Y-axis labeled "Quantity" with auto-scale  
✅ X-axis shows week dates or months appropriately  
✅ Year label below x-axis  
✅ Tooltip on hover with breakdown  
✅ Legend with all 6 elements  
✅ Download button (dummy with toast)  
✅ Sync to ERP button (dummy with toast)  
✅ Integrates with filter sidebar  
✅ Stacked bars for multiple cores/components  
✅ Grey separation lines in stacked bars  
✅ Responsive on mobile/tablet/desktop  
✅ Keyboard accessible  
✅ Screen reader compatible  

### Should Have (Near-term)
⏳ Actual download functionality  
⏳ Real ERP sync integration  
⏳ Performance < 200ms render time  
⏳ Animation on data changes  

### Could Have (Future)
🔮 Zoom and pan  
🔮 User annotations  
🔮 Comparison mode  
🔮 Forecast editing  

---

## DOCUMENT CONTROL
- **Version**: 1.0
- **Date**: November 30, 2025
- **Status**: Ready for Implementation
- **Dependencies**: 
  - forecast-data.ts (already created)
  - FilterContext (already created)
  - Recharts library (already installed)
- **Estimated Effort**: 3-4 weeks (including testing)

---

**END OF FORECAST CHART FEATURE PLAN**
