// Core Type Definitions for BORG SCM Dashboard

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'planner';
  department: string;
  created_at: Date;
  last_login?: Date;
  is_active: boolean;
}

export type ComponentType = 
  | 'turbo' 
  | 'engine' 
  | 'transmission' 
  | 'battery' 
  | 'starter' 
  | 'alternator';

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export type WarehouseLocation = 'Warehouse A' | 'Warehouse B' | 'Warehouse C';

// Legacy Core interface (keep for backward compatibility)
export interface LegacyCore {
  id: string;
  part_number: string;
  description: string;
  component_type: ComponentType;
  quantity: number;
  reorder_point: number;
  unit_price: number;
  location: WarehouseLocation;
  supplier_id: string;
  status: StockStatus;
  last_updated: Date;
  yield_rate: number;
  lead_time_days: number;
  turn_rate: number;
}

// ===== REMAN Dashboard Types =====

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

export type PresetType = 'all' | 'favorites' | 'high-priority' | 'standard' | 'custom';
export type TimeRangeType = '1month' | '3months' | '6months' | '1year';

export interface FilterState {
  preset: PresetType;
  categories: string[];          // Array of category IDs
  cores: string[];               // Array of core IDs
  components: string[];          // Array of component IDs
  timeRange: TimeRangeType;
}

export interface AggregatedKPIs {
  totalSupply: number;              // Sum of weekly_supply across selected cores
  averageConditionRate: number;     // Average of all components in selected cores
  coreCount: number;                // Number of cores in selection
  componentCount: number;           // Number of components available
  forecastAccuracy: number;         // Placeholder for now (will specify later)
}

export type OrderStatus = 
  | 'placed' 
  | 'processing' 
  | 'shipped' 
  | 'in_transit' 
  | 'delivered' 
  | 'cancelled';

// Dashboard Types
export interface KPIMetric {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: number; // % change
  sparklineData: number[]; // Last 30 days
  status: 'good' | 'warning' | 'critical';
}

export interface ForecastDataPoint {
  date: string;
  aiForecast: number;
  consensusForecast: number;
  confidenceLower: number;
  confidenceUpper: number;
}

export interface FeatureContribution {
  featureName: string;
  category: 'ExternalData' | 'SalesOrders' | 'Events';
  contributions: Record<string, number>; // { date: value }
}

export interface CriticalAction {
  id: string;
  type: 'STOCK_LOW_SINGLE' | 'STOCK_LOW_MULTI' | 'DELIVERY_COMING';
  title: string;
  description: string;
  severity: 'warning' | 'critical';
  affectedSKUs: string[];
  actionDate: string;
  icon: string;
}

export interface CalendarEvent {
  date: string;
  type: 'delivery' | 'alert' | 'threshold';
  title: string;
  description: string;
  icon: string;
}

export interface ProductHierarchy {
  id: string;
  level: 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
  name: string;
  parent?: string;
  children?: ProductHierarchy[];
}

export interface OrderLine {
  order_id: string;
  core_id: string;
  quantity: number;
  unit_price: number;
}

export interface Order {
  id: string;
  order_number: string;
  supplier_id: string;
  core_items: OrderLine[];
  total_quantity: number;
  total_value: number;
  status: OrderStatus;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  created_at: Date;
  placed_at?: Date;
  processing_at?: Date;
  shipped_at?: Date;
  in_transit_at?: Date;
  delivered_at?: Date;
  estimated_delivery: Date;
  lead_time_days: number;
  notes: string;
}

export interface ForecastPoint {
  date: Date;
  quantity_mean: number;
  quantity_std: number;
  confidence_lower: number;
  confidence_upper: number;
  historical_quantity?: number;
}

export interface FeatureDriver {
  feature_name: string;
  shap_value: number;
  current_value?: string;
  direction: 'up' | 'down' | 'neutral';
}

export interface Forecast {
  id: string;
  core_id: string;
  forecast_date: Date;
  horizon_days: number;
  forecasts: ForecastPoint[];
  model_version: string;
  accuracy_mape: number;
  drivers: FeatureDriver[];
}

export interface ComponentMetric {
  component_type: ComponentType;
  mape: number;
  mae: number;
  forecast_count: number;
  status: 'good' | 'drift_detected' | 'insufficient_data';
}

export interface FeatureImportance {
  rank: number;
  feature_name: string;
  importance_score: number;
  trend: 'increasing' | 'stable' | 'decreasing';
}

export interface ModelMetrics {
  model_version: string;
  trained_at: Date;
  mape: number;
  mae: number;
  rmse: number;
  component_metrics: ComponentMetric[];
  drift_detected: boolean;
  feature_importance: FeatureImportance[];
  data_points_used: number;
}

// Legacy KPI interface (keeping for backward compatibility)
export interface LegacyKPIMetric {
  label: string;
  value: number | string;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  change_percent?: number;
  status?: 'good' | 'warning' | 'critical';
}

export interface TrendPoint {
  date: Date;
  value: number;
  change_percent: number;
}

export interface AnalyticsTrend {
  metric_name: string;
  data_points: TrendPoint[];
}
