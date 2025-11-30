import { useMemo } from 'react';
import { useFilters } from '@/lib/contexts/FilterContext';
import { 
  coreForecasts, 
  componentForecasts, 
  getCoreForecastData, 
  getComponentForecastData 
} from '@/lib/data/forecast-data';

export type TimeRangeType = '1month' | '3months' | '6months' | '1year';
export type GranularityType = 'week' | 'month';

export interface ChartDataPoint {
  date: string;                  // Week start date (YYYY-MM-DD) or month (YYYY-MM)
  week_label: string;            // Display label (e.g., "Nov 18" or "Nov")
  week_end?: string;             // Week end date for tooltip (YYYY-MM-DD)
  
  // Bar data (stacked if multiple cores/components selected)
  actualSupply: number | null;   // Historical: AI forecast ± 5% random
  confirmedSupply: number | null; // Future: Randomly generated on some weeks ± 50%
  
  // Line data
  aiForecast: number;            // Current AI forecast (from weekly_supply)
  previousAiForecast: number | null; // Previous prediction ± 10% (future only)
  
  // Confidence band (future only)
  confidenceLower: number | null; // AI forecast × 0.85
  confidenceUpper: number | null; // AI forecast × 1.15
  
  // Metadata
  isHistorical: boolean;         // date < today
  isFuture: boolean;             // date >= today
  isToday: boolean;              // date === today (for today line)
  
  // Stacked breakdown (for tooltip)
  breakdown: {
    id: string;                  // core_id or component_id
    display: string;             // Display name
    supply: number;              // Individual supply
    color: string;               // Color for this item
  }[];
}

interface UseChartDataOptions {
  timeRange: TimeRangeType;
}

// Helper: Get date range configuration
function getDateRange(timeRange: TimeRangeType, today: Date) {
  const configs = {
    '1month': { backWeeks: 2, forwardWeeks: 2, granularity: 'week' as GranularityType },
    '3months': { backWeeks: 6, forwardWeeks: 6, granularity: 'week' as GranularityType },
    '6months': { backMonths: 3, forwardMonths: 3, granularity: 'month' as GranularityType },
    '1year': { backMonths: 6, forwardMonths: 6, granularity: 'month' as GranularityType }
  };
  
  const config = configs[timeRange];
  let startDate: Date;
  let endDate: Date;
  
  if ('backWeeks' in config) {
    // Weekly granularity
    startDate = new Date(today);
    startDate.setDate(today.getDate() - (config.backWeeks * 7));
    endDate = new Date(today);
    endDate.setDate(today.getDate() + (config.forwardWeeks * 7));
  } else {
    // Monthly granularity
    startDate = new Date(today);
    startDate.setMonth(today.getMonth() - config.backMonths);
    endDate = new Date(today);
    endDate.setMonth(today.getMonth() + config.forwardMonths);
  }
  
  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    granularity: config.granularity
  };
}

// Helper: Get Monday of the week for a given date
function getWeekStart(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  d.setDate(diff);
  return d.toISOString().split('T')[0];
}

// Helper: Format date for display
function formatDateLabel(date: string, granularity: GranularityType): string {
  const d = new Date(date);
  
  if (granularity === 'week') {
    // Format: "Nov 18"
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } else {
    // Format: "Nov"
    return d.toLocaleDateString('en-US', { month: 'short' });
  }
}

// Helper: Get week end date (6 days after start)
function getWeekEnd(weekStart: string): string {
  const d = new Date(weekStart);
  d.setDate(d.getDate() + 6);
  return d.toISOString().split('T')[0];
}

// Helper: Generate actual supply (historical, ±5%)
function generateActualSupply(aiForecast: number): number {
  const deviation = (Math.random() - 0.5) * 0.1; // -5% to +5%
  const actual = Math.round(aiForecast * (1 + deviation));
  return Math.max(0, actual);
}

// Helper: Generate confirmed supply (future, ~35% chance, ±50%)
function generateConfirmedSupply(aiForecast: number): number | null {
  if (Math.random() > 0.35) return null;
  
  const deviation = (Math.random() - 0.5); // -50% to +50%
  const confirmed = Math.round(aiForecast * (1 + deviation));
  return Math.max(0, confirmed);
}

// Helper: Generate previous AI forecast (future only, ±10%)
function generatePreviousForecast(currentForecast: number): number {
  const deviation = (Math.random() - 0.5) * 0.2; // -10% to +10%
  const previous = Math.round(currentForecast * (1 + deviation));
  return Math.max(0, previous);
}

// Helper: Aggregate forecasts by period
function aggregateByPeriod(
  forecasts: { week_start: string; supply: number; id: string; display: string }[],
  granularity: GranularityType
): Map<string, { supply: number; breakdown: Map<string, { supply: number; display: string }> }> {
  const aggregated = new Map<string, { supply: number; breakdown: Map<string, { supply: number; display: string }> }>();
  
  forecasts.forEach(forecast => {
    let key: string;
    
    if (granularity === 'week') {
      key = forecast.week_start;
    } else {
      // Monthly: use YYYY-MM format
      const d = new Date(forecast.week_start);
      key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    }
    
    if (!aggregated.has(key)) {
      aggregated.set(key, { supply: 0, breakdown: new Map() });
    }
    
    const period = aggregated.get(key)!;
    period.supply += forecast.supply;
    
    // Track breakdown by id
    if (!period.breakdown.has(forecast.id)) {
      period.breakdown.set(forecast.id, { supply: 0, display: forecast.display });
    }
    period.breakdown.get(forecast.id)!.supply += forecast.supply;
  });
  
  return aggregated;
}

export function useChartData({ timeRange }: UseChartDataOptions): ChartDataPoint[] {
  const { filterState } = useFilters();
  
  const chartData = useMemo(() => {
    // Today is Nov 30, 2025
    const today = new Date('2025-11-30');
    const todayStr = today.toISOString().split('T')[0];
    
    // 1. Determine date range based on timeRange
    const { startDate, endDate, granularity } = getDateRange(timeRange, today);
    
    // 2. Determine what to fetch based on filter selection
    let forecastData: { week_start: string; supply: number; id: string; display: string }[] = [];
    
    if (filterState.cores.length > 0 && filterState.components.length === 0) {
      // Only cores selected
      const coreForecastsData = getCoreForecastData(filterState.cores, startDate, endDate);
      forecastData = coreForecastsData.map(cf => ({
        week_start: cf.week_start,
        supply: cf.weekly_supply,
        id: cf.core_id,
        display: cf.core_id
      }));
    } else if (filterState.components.length > 0 && filterState.cores.length === 0) {
      // Only components selected
      const componentForecastsData = getComponentForecastData(filterState.components, startDate, endDate);
      forecastData = componentForecastsData.map(cf => ({
        week_start: cf.week_start,
        supply: cf.component_supply,
        id: cf.component_id,
        display: cf.component_id.split('_').pop() || cf.component_id
      }));
    } else if (filterState.cores.length > 0 && filterState.components.length > 0) {
      // Mixed: cores + components
      const coreForecastsData = getCoreForecastData(filterState.cores, startDate, endDate);
      const componentForecastsData = getComponentForecastData(filterState.components, startDate, endDate);
      
      const coreData = coreForecastsData.map(cf => ({
        week_start: cf.week_start,
        supply: cf.weekly_supply,
        id: cf.core_id,
        display: cf.core_id
      }));
      
      const componentData = componentForecastsData.map(cf => ({
        week_start: cf.week_start,
        supply: cf.component_supply,
        id: cf.component_id,
        display: cf.component_id.split('_').pop() || cf.component_id
      }));
      
      forecastData = [...coreData, ...componentData];
    } else {
      // No selection: show all cores aggregated
      const allCoreForecastsData = getCoreForecastData(
        coreForecasts.map(cf => cf.core_id).filter((v, i, a) => a.indexOf(v) === i),
        startDate,
        endDate
      );
      forecastData = allCoreForecastsData.map(cf => ({
        week_start: cf.week_start,
        supply: cf.weekly_supply,
        id: cf.core_id,
        display: cf.core_id
      }));
    }
    
    // 3. Aggregate by period (week or month)
    const aggregated = aggregateByPeriod(forecastData, granularity);
    
    // 4. Transform to ChartDataPoint[] format
    const dataPoints: ChartDataPoint[] = [];
    
    aggregated.forEach((value, key) => {
      const date = granularity === 'week' ? key : `${key}-01`;
      const isHistorical = date < todayStr;
      const isFuture = date >= todayStr;
      const isToday = false; // Will be set after sorting
      
      // Build breakdown array
      const breakdown = Array.from(value.breakdown.entries()).map(([id, data]) => ({
        id,
        display: data.display,
        supply: data.supply,
        color: '#0065BD' // TUM Blue for all
      }));
      
      dataPoints.push({
        date,
        week_label: formatDateLabel(date, granularity),
        week_end: granularity === 'week' ? getWeekEnd(date) : undefined,
        actualSupply: isHistorical ? generateActualSupply(value.supply) : null,
        confirmedSupply: isFuture ? generateConfirmedSupply(value.supply) : null,
        aiForecast: value.supply,
        previousAiForecast: isFuture ? generatePreviousForecast(value.supply) : null,
        confidenceLower: isFuture ? Math.round(value.supply * 0.85) : null,
        confidenceUpper: isFuture ? Math.round(value.supply * 1.15) : null,
        isHistorical,
        isFuture,
        isToday,
        breakdown
      });
    });
    
    // 5. Sort by date
    dataPoints.sort((a, b) => a.date.localeCompare(b.date));
    
    // 6. Find the point closest to today and mark it as isToday
    // This ensures Today line shows in all views
    if (dataPoints.length > 0) {
      const todayDate = new Date(todayStr);
      let closestIndex = 0;
      let closestDiff = Math.abs(new Date(dataPoints[0].date).getTime() - todayDate.getTime());
      
      dataPoints.forEach((point, index) => {
        const diff = Math.abs(new Date(point.date).getTime() - todayDate.getTime());
        if (diff < closestDiff) {
          closestDiff = diff;
          closestIndex = index;
        }
      });
      
      dataPoints[closestIndex].isToday = true;
    }
    
    return dataPoints;
  }, [filterState.cores, filterState.components, timeRange]);
  
  return chartData;
}
