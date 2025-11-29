import { KPIMetric } from '../types';

// TODO: Replace with API call to /api/forecast/metrics
export const forecastMetrics: KPIMetric[] = [
  {
    label: 'Total Forecast Supply (3M)',
    value: 102046,
    unit: 'units',
    trend: 'up',
    change_percent: 8.5,
    status: 'good',
  },
  {
    label: 'Current Inventory Value',
    value: 2847500,
    unit: '€',
    trend: 'up',
    change_percent: 3.2,
    status: 'good',
  },
  {
    label: 'Average Lead Time',
    value: 14,
    unit: 'days',
    trend: 'down',
    change_percent: -5.2,
    status: 'good',
  },
  {
    label: 'Model Accuracy (MAPE)',
    value: 15.8,
    unit: '%',
    trend: 'down',
    change_percent: -2.3,
    status: 'good',
  },
  {
    label: 'Critical Low Stock Items',
    value: 12,
    unit: 'items',
    trend: 'up',
    change_percent: 20.0,
    status: 'warning',
  },
  {
    label: 'Inventory Turnover Rate',
    value: 4.2,
    unit: 'times/year',
    trend: 'up',
    change_percent: 10.5,
    status: 'good',
  },
];
