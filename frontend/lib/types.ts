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

export interface Core {
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

export type OrderStatus = 
  | 'placed' 
  | 'processing' 
  | 'shipped' 
  | 'in_transit' 
  | 'delivered' 
  | 'cancelled';

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

export interface KPIMetric {
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
