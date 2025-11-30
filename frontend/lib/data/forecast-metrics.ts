import { KPIMetric } from '../types';

// TODO: Replace with API call to /api/forecast/metrics
export const hardcodedForecastMetrics: KPIMetric[] = [
  {
    label: 'Recent Model Accuracy',
    value: 85,
    unit: 'MAPE %',
    trend: 'up',
    trendValue: 3.2,
    sparklineData: [78, 79, 81, 80, 82, 83, 84, 83, 85, 84, 85, 86, 85, 84, 86, 85, 87, 86, 85, 84, 85, 86, 87, 85, 84, 85, 86, 85, 84, 85],
    status: 'good',
  },
  {
    label: 'Last Forecast Offset',
    value: 24,
    unit: '%',
    trend: 'down',
    trendValue: -5.1,
    sparklineData: [32, 31, 30, 29, 28, 30, 29, 27, 28, 26, 27, 25, 26, 25, 24, 25, 24, 23, 24, 25, 24, 23, 24, 25, 24, 23, 24, 25, 24, 24],
    status: 'warning',
  },
  {
    label: 'AI vs. Historical Demand',
    value: 12,
    unit: '% divergence',
    trend: 'up',
    trendValue: 2.8,
    sparklineData: [8, 9, 10, 9, 10, 11, 10, 11, 12, 11, 12, 11, 10, 11, 12, 11, 12, 13, 12, 11, 12, 11, 12, 13, 12, 11, 12, 13, 12, 12],
    status: 'good',
  },
  {
    label: 'Model Data Freshness',
    value: 2,
    unit: 'hours ago',
    trend: 'neutral',
    trendValue: 0,
    sparklineData: [3, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 2],
    status: 'good',
  },
];

export interface AlertSummary {
  total: number;
  forecastAlerts: number;
  modelPerformanceAlerts: number;
  last30DaysTrend: number[]; // Daily alert counts
}

// TODO: Replace with API call to /api/alerts/summary
export const hardcodedAlertSummary: AlertSummary = {
  total: 16,
  forecastAlerts: 12,
  modelPerformanceAlerts: 4,
  last30DaysTrend: [18, 17, 19, 18, 16, 17, 18, 16, 15, 16, 17, 16, 15, 14, 16, 17, 18, 16, 15, 16, 17, 18, 17, 16, 15, 16, 17, 16, 15, 16],
};

// Legacy export for backward compatibility
export const forecastMetrics: KPIMetric[] = [
  {
    label: 'Total Forecast Supply (3M)',
    value: 102046,
    unit: 'units',
    trend: 'up',
    trendValue: 8.5,
    sparklineData: [],
    status: 'good',
  },
];
