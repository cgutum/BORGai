// KPI Metrics Data - Hardcoded for MVP
// Independent of filter sidebar selections

export interface KPIMetric {
  id: string;
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  timePeriod: string;
  chartData: number[];
  trend: 'up' | 'down';
  isPositive: boolean; // Whether the trend is favorable
  info: string; // Tooltip description
}

export interface AlertSummaryData {
  total: number;
  forecastAlerts: number;
  supplyChainAlerts: number;
  chartData: number[];
  timePeriod: string;
}

// Generate mock chart data
function generateChartData(baseValue: number, points: number, variance: number): number[] {
  const data: number[] = [];
  for (let i = 0; i < points; i++) {
    const trend = Math.sin(i / points * Math.PI * 2) * variance;
    const random = (Math.random() - 0.5) * variance * 0.3;
    data.push(Math.round(baseValue + trend + random));
  }
  return data;
}

// KPI 1: Recent Model Accuracy
export const recentModelAccuracy: KPIMetric = {
  id: 'model-accuracy',
  label: 'RECENT MODEL ACCURACY',
  value: '93%',
  change: 0.8,
  changeLabel: '+0.8%',
  timePeriod: 'Last 30 days',
  chartData: generateChartData(91, 30, 3), // 30 points, variance ±3%
  trend: 'up',
  isPositive: true,
  info: 'Measures how accurately the AI model predicted actual demand over the last 30 days. Higher values indicate better forecast accuracy.'
};

// KPI 2: AI Forecast vs. Legacy Forecast
export const aiForecastVsLegacy: KPIMetric = {
  id: 'ai-vs-legacy',
  label: 'AI FORECAST VS. LEGACY FORECAST',
  value: '5%',
  change: -0.5,
  changeLabel: '-0.5%',
  timePeriod: 'Last 30 days',
  chartData: generateChartData(5.5, 30, 1.5), // 30 points, variance ±1.5%
  trend: 'down',
  isPositive: false,
  info: 'Shows the percentage difference between AI-generated forecasts and legacy forecasting methods. Lower values indicate the AI forecast is closer to legacy.'
};

// KPI 3: Average Lead Time
export const averageLeadTime: KPIMetric = {
  id: 'lead-time',
  label: 'AVERAGE LEAD TIME',
  value: '53 Days',
  change: -2.1,
  changeLabel: '-2.1%',
  timePeriod: 'Last 12 Months',
  chartData: generateChartData(54, 12, 4), // 12 points, variance ±4 days
  trend: 'down',
  isPositive: true, // Lower lead time is better
  info: 'Average time from order placement to delivery. Lower lead times indicate faster supply chain processes and better responsiveness.'
};

// KPI 4: Average Return Rate
export const averageReturnRate: KPIMetric = {
  id: 'return-rate',
  label: 'AVERAGE RETURN RATE',
  value: '69%',
  change: 0.8,
  changeLabel: '+0.8%',
  timePeriod: 'Last 12 Months',
  chartData: generateChartData(68, 12, 3), // 12 points, variance ±3%
  trend: 'up',
  isPositive: true,
  info: 'Percentage of cores successfully returned and remanufactured. Higher return rates ensure sustainable supply of cores for remanufacturing.'
};

// KPI 5: Core Inventory Coverage
export const coreInventoryCoverage: KPIMetric = {
  id: 'inventory-coverage',
  label: 'CORE INVENTORY COVERAGE',
  value: '84%',
  change: 1.0,
  changeLabel: '+1%',
  timePeriod: 'Next 30 days',
  chartData: generateChartData(83, 30, 3), // 30 points, variance ±3%
  trend: 'up',
  isPositive: true,
  info: 'Projected availability of core components to meet forecasted demand over the next 30 days. Higher coverage reduces stockout risk.'
};

// All KPIs array
export const allKPIs: KPIMetric[] = [
  recentModelAccuracy,
  aiForecastVsLegacy,
  averageLeadTime,
  averageReturnRate,
  coreInventoryCoverage
];

// Alert Summary Data
export const alertSummaryData: AlertSummaryData = {
  total: 16,
  forecastAlerts: 4,
  supplyChainAlerts: 12,
  chartData: [8, 10, 12, 14, 16, 15, 18, 17, 16, 15, 14, 16, 15, 17, 16, 18, 17, 16, 15, 14, 13, 14, 15, 16, 17, 16, 15, 14, 15, 16],
  timePeriod: 'Last 30 days'
};

// Helper function to get KPI by ID
export function getKPIById(id: string): KPIMetric | undefined {
  return allKPIs.find(kpi => kpi.id === id);
}

// Helper function to get KPI slice for carousel
export function getKPISlice(startIndex: number, count: number = 4): KPIMetric[] {
  return allKPIs.slice(startIndex, startIndex + count);
}
