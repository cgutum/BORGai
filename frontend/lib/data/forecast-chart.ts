import { ForecastDataPoint } from '../types';

// TODO: Replace with API call to /api/forecast/chart
export const hardcodedForecastData: ForecastDataPoint[] = [
  { date: '11/16', aiForecast: 586, consensusForecast: 550, confidenceLower: 480, confidenceUpper: 650 },
  { date: '11/23', aiForecast: 573, consensusForecast: 560, confidenceLower: 470, confidenceUpper: 640 },
  { date: '11/30', aiForecast: 615, consensusForecast: 575, confidenceLower: 510, confidenceUpper: 680 },
  { date: '12/07', aiForecast: 623, consensusForecast: 580, confidenceLower: 520, confidenceUpper: 690 },
  { date: '12/14', aiForecast: 557, consensusForecast: 570, confidenceLower: 460, confidenceUpper: 620 },
  { date: '12/21', aiForecast: 612, consensusForecast: 585, confidenceLower: 510, confidenceUpper: 680 },
  { date: '12/28', aiForecast: 645, consensusForecast: 590, confidenceLower: 540, confidenceUpper: 720 },
  { date: '01/04', aiForecast: 598, consensusForecast: 595, confidenceLower: 500, confidenceUpper: 660 },
  { date: '01/11', aiForecast: 634, consensusForecast: 600, confidenceLower: 530, confidenceUpper: 700 },
  { date: '01/18', aiForecast: 671, consensusForecast: 605, confidenceLower: 560, confidenceUpper: 740 },
  { date: '01/25', aiForecast: 589, consensusForecast: 610, confidenceLower: 490, confidenceUpper: 650 },
  { date: '02/01', aiForecast: 712, consensusForecast: 615, confidenceLower: 600, confidenceUpper: 790 },
];

export type TimeRange = '2week' | '1month' | '3month' | '6month' | 'custom';

export interface ChartFilters {
  timeRange: TimeRange;
  showConsensus: boolean;
  showConfidenceBand: boolean;
  selectedProduct?: string;
}
