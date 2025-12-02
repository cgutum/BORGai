// One-Page Summary Data - Hardcoded for MVP

export interface SummarySection {
  title: string;
  items: SummaryItem[];
}

export interface SummaryItem {
  label: string;
  value: string;
  trend?: 'up' | 'down';
  isPositive?: boolean;
}

export const onePageSummaryData: SummarySection[] = [
  {
    title: 'SUPPLY OVERVIEW (Last 30 Days)',
    items: [
      { label: 'Total Cores Processed', value: '2,847 units', trend: 'up', isPositive: true },
      { label: 'vs. Previous Month', value: '+12%', trend: 'up', isPositive: true },
      { label: 'Average Lead Time', value: '53 days', trend: 'down', isPositive: true },
      { label: 'Improvement', value: '-2.1%', trend: 'down', isPositive: true },
      { label: 'Forecast Accuracy', value: '93%', trend: 'up', isPositive: true },
      { label: 'Change', value: '+0.8%', trend: 'up', isPositive: true },
      { label: 'Active SKUs', value: '120 components across 24 cores' },
    ],
  },
  {
    title: 'CRITICAL ALERTS (Immediate Action Required)',
    items: [
      { label: 'Stock Low Situations', value: '1 SKU (TC_BMW_X3_2023_C001)' },
      { label: 'Delivery Arrivals', value: '2 pallets expected Dec 12, 15:00-18:00' },
      { label: 'Supply Disruptions', value: '3 SKUs affected by delayed core deliveries' },
    ],
  },
  {
    title: 'FORECAST PERFORMANCE (Last 7 Days)',
    items: [
      { label: 'AI vs. Legacy Forecast', value: '5% deviation (within acceptable range)' },
      { label: 'Model Confidence', value: '89% average across all predictions' },
      { label: 'Prediction Accuracy', value: 'On track for 93%+ monthly target' },
    ],
  },
  {
    title: 'PENDING ACTIONS (Requires Attention)',
    items: [
      { label: 'Supply Incentive Needed', value: '3 SKUs with critical supply levels' },
      { label: 'Market Research', value: 'BMW X5 showing unexpected demand (15 SKUs)' },
      { label: 'Supplier Contact', value: 'WHMUC02 has cores ready for pickup' },
    ],
  },
  {
    title: 'UPCOMING DELIVERIES (Next 7 Days)',
    items: [
      { label: 'Dec 3', value: '1 pallet (Supplier WHMUC01) - 4 SKUs' },
      { label: 'Dec 5', value: '3 pallets (Supplier WHMUC03) - 8 SKUs' },
      { label: 'Dec 7', value: '2 pallets (Supplier WHMUC02) - 6 SKUs' },
      { label: 'Dec 12', value: '2 pallets (Supplier WHMUC04) - 2 SKUs' },
    ],
  },
  {
    title: 'WEEKLY TRENDS',
    items: [
      { label: 'Demand Surge', value: 'BMW X5 components (+23% this week)', trend: 'up', isPositive: true },
      { label: 'Supply Improvement', value: 'Lead times decreasing consistently', trend: 'down', isPositive: true },
      { label: 'Quality Metrics', value: '97% of returned cores meet quality standards' },
    ],
  },
];

export function getCurrentTimestamp(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return now.toLocaleDateString('en-US', options);
}
