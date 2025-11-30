// REMAN Dashboard Forecast Data
// TODO: This file will be expanded with full 1,920 core forecasts and 9,600 component forecasts

import { Core, Component, WeeklyForecast, ComponentForecast, CoreCategory } from '@/lib/types';

// ===== CATEGORIES (8 total) =====
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

// ===== CORES (24 total - 3 per category) =====
export const cores: Core[] = [
  // Turbocharger (3 cores)
  { core_id: 'TC_BMW_x3_2023', category_id: 'turbocharger', category: 'Turbocharger', brand: 'BMW', model: 'x3', year: 2023, status: 'Active', isFavorite: true, isPriority: false, displayName: 'BMW x3', fullDisplayName: 'BMW x3 (TC_BMW_x3_2023)' },
  { core_id: 'TC_AUDI_A4_2021', category_id: 'turbocharger', category: 'Turbocharger', brand: 'AUDI', model: 'A4', year: 2021, status: 'Active', isFavorite: false, isPriority: true, displayName: 'AUDI A4', fullDisplayName: 'AUDI A4 (TC_AUDI_A4_2021)' },
  { core_id: 'TC_TOYOTA_Camry_2020', category_id: 'turbocharger', category: 'Turbocharger', brand: 'TOYOTA', model: 'Camry', year: 2020, status: 'Active', isFavorite: false, isPriority: false, displayName: 'TOYOTA Camry', fullDisplayName: 'TOYOTA Camry (TC_TOYOTA_Camry_2020)' },
  
  // Starters (3 cores)
  { core_id: 'ST_BMW_320i_2022', category_id: 'starters', category: 'Starters', brand: 'BMW', model: '320i', year: 2022, status: 'Active', isFavorite: false, isPriority: false, displayName: 'BMW 320i', fullDisplayName: 'BMW 320i (ST_BMW_320i_2022)' },
  { core_id: 'ST_MERCEDES_C300_2021', category_id: 'starters', category: 'Starters', brand: 'MERCEDES', model: 'C300', year: 2021, status: 'Active', isFavorite: false, isPriority: true, displayName: 'MERCEDES C300', fullDisplayName: 'MERCEDES C300 (ST_MERCEDES_C300_2021)' },
  { core_id: 'ST_VW_Golf_2020', category_id: 'starters', category: 'Starters', brand: 'VW', model: 'Golf', year: 2020, status: 'Active', isFavorite: false, isPriority: false, displayName: 'VW Golf', fullDisplayName: 'VW Golf (ST_VW_Golf_2020)' },
  
  // Alternators (3 cores)
  { core_id: 'AL_FORD_Focus_2022', category_id: 'alternators', category: 'Alternators', brand: 'FORD', model: 'Focus', year: 2022, status: 'Active', isFavorite: true, isPriority: false, displayName: 'FORD Focus', fullDisplayName: 'FORD Focus (AL_FORD_Focus_2022)' },
  { core_id: 'AL_HYUNDAI_Elantra_2021', category_id: 'alternators', category: 'Alternators', brand: 'HYUNDAI', model: 'Elantra', year: 2021, status: 'Active', isFavorite: false, isPriority: false, displayName: 'HYUNDAI Elantra', fullDisplayName: 'HYUNDAI Elantra (AL_HYUNDAI_Elantra_2021)' },
  { core_id: 'AL_RENAULT_Clio_2020', category_id: 'alternators', category: 'Alternators', brand: 'RENAULT', model: 'Clio', year: 2020, status: 'Active', isFavorite: false, isPriority: false, displayName: 'RENAULT Clio', fullDisplayName: 'RENAULT Clio (AL_RENAULT_Clio_2020)' },
  
  // AC Compressors (3 cores)
  { core_id: 'AC_BMW_x5_2023', category_id: 'ac_compressors', category: 'AC Compressors', brand: 'BMW', model: 'x5', year: 2023, status: 'Active', isFavorite: false, isPriority: true, displayName: 'BMW x5', fullDisplayName: 'BMW x5 (AC_BMW_x5_2023)' },
  { core_id: 'AC_AUDI_Q5_2021', category_id: 'ac_compressors', category: 'AC Compressors', brand: 'AUDI', model: 'Q5', year: 2021, status: 'Active', isFavorite: false, isPriority: false, displayName: 'AUDI Q5', fullDisplayName: 'AUDI Q5 (AC_AUDI_Q5_2021)' },
  { core_id: 'AC_TOYOTA_Corolla_2020', category_id: 'ac_compressors', category: 'AC Compressors', brand: 'TOYOTA', model: 'Corolla', year: 2020, status: 'Active', isFavorite: false, isPriority: false, displayName: 'TOYOTA Corolla', fullDisplayName: 'TOYOTA Corolla (AC_TOYOTA_Corolla_2020)' },
  
  // Brake Calipers (3 cores)
  { core_id: 'BC_MERCEDES_E350_2022', category_id: 'brake_calipers', category: 'Brake Calipers', brand: 'MERCEDES', model: 'E350', year: 2022, status: 'Active', isFavorite: true, isPriority: false, displayName: 'MERCEDES E350', fullDisplayName: 'MERCEDES E350 (BC_MERCEDES_E350_2022)' },
  { core_id: 'BC_VW_Passat_2021', category_id: 'brake_calipers', category: 'Brake Calipers', brand: 'VW', model: 'Passat', year: 2021, status: 'Active', isFavorite: false, isPriority: false, displayName: 'VW Passat', fullDisplayName: 'VW Passat (BC_VW_Passat_2021)' },
  { core_id: 'BC_FORD_Escape_2020', category_id: 'brake_calipers', category: 'Brake Calipers', brand: 'FORD', model: 'Escape', year: 2020, status: 'Active', isFavorite: false, isPriority: false, displayName: 'FORD Escape', fullDisplayName: 'FORD Escape (BC_FORD_Escape_2020)' },
  
  // EGR Valves (3 cores)
  { core_id: 'EG_HYUNDAI_Tucson_2022', category_id: 'egr_valves', category: 'EGR Valves', brand: 'HYUNDAI', model: 'Tucson', year: 2022, status: 'Active', isFavorite: false, isPriority: true, displayName: 'HYUNDAI Tucson', fullDisplayName: 'HYUNDAI Tucson (EG_HYUNDAI_Tucson_2022)' },
  { core_id: 'EG_RENAULT_Megane_2021', category_id: 'egr_valves', category: 'EGR Valves', brand: 'RENAULT', model: 'Megane', year: 2021, status: 'Active', isFavorite: false, isPriority: false, displayName: 'RENAULT Megane', fullDisplayName: 'RENAULT Megane (EG_RENAULT_Megane_2021)' },
  { core_id: 'EG_BMW_x3_2019', category_id: 'egr_valves', category: 'EGR Valves', brand: 'BMW', model: 'x3', year: 2019, status: 'Active', isFavorite: false, isPriority: false, displayName: 'BMW x3', fullDisplayName: 'BMW x3 (EG_BMW_x3_2019)' },
  
  // Steering Racks (3 cores)
  { core_id: 'SR_AUDI_A6_2022', category_id: 'steering_racks', category: 'Steering Racks', brand: 'AUDI', model: 'A6', year: 2022, status: 'Active', isFavorite: false, isPriority: false, displayName: 'AUDI A6', fullDisplayName: 'AUDI A6 (SR_AUDI_A6_2022)' },
  { core_id: 'SR_TOYOTA_Camry_2021', category_id: 'steering_racks', category: 'Steering Racks', brand: 'TOYOTA', model: 'Camry', year: 2021, status: 'Active', isFavorite: false, isPriority: false, displayName: 'TOYOTA Camry', fullDisplayName: 'TOYOTA Camry (SR_TOYOTA_Camry_2021)' },
  { core_id: 'SR_VW_Tiguan_2020', category_id: 'steering_racks', category: 'Steering Racks', brand: 'VW', model: 'Tiguan', year: 2020, status: 'Active', isFavorite: false, isPriority: false, displayName: 'VW Tiguan', fullDisplayName: 'VW Tiguan (SR_VW_Tiguan_2020)' },
  
  // Steering Pumps (3 cores)
  { core_id: 'SP_MERCEDES_GLC_2023', category_id: 'steering_pumps', category: 'Steering Pumps', brand: 'MERCEDES', model: 'GLC', year: 2023, status: 'Active', isFavorite: false, isPriority: false, displayName: 'MERCEDES GLC', fullDisplayName: 'MERCEDES GLC (SP_MERCEDES_GLC_2023)' },
  { core_id: 'SP_FORD_Fusion_2021', category_id: 'steering_pumps', category: 'Steering Pumps', brand: 'FORD', model: 'Fusion', year: 2021, status: 'Active', isFavorite: false, isPriority: false, displayName: 'FORD Fusion', fullDisplayName: 'FORD Fusion (SP_FORD_Fusion_2021)' },
  { core_id: 'SP_HYUNDAI_i30_2020', category_id: 'steering_pumps', category: 'Steering Pumps', brand: 'HYUNDAI', model: 'i30', year: 2020, status: 'Active', isFavorite: false, isPriority: false, displayName: 'HYUNDAI i30', fullDisplayName: 'HYUNDAI i30 (SP_HYUNDAI_i30_2020)' },
];

// ===== COMPONENTS (120 total - 5 per core) =====
// Component types by category
const componentTypesByCategory: Record<string, string[]> = {
  turbocharger: ['Housing', 'Turbine', 'Compressor', 'Valve', 'Shaft'],
  starters: ['Housing', 'Armature', 'Solenoid', 'Brushes', 'Bearing'],
  alternators: ['Stator', 'Rotor', 'Rectifier', 'Regulator', 'Bearing'],
  ac_compressors: ['Compressor', 'Clutch', 'Pulley', 'Seal', 'Valve'],
  brake_calipers: ['Piston', 'Seal', 'Housing', 'Bleeder', 'Bracket'],
  egr_valves: ['Valve', 'Actuator', 'Gasket', 'Sensor', 'Housing'],
  steering_racks: ['Rack', 'Pinion', 'Seal', 'Boot', 'Tie Rod'],
  steering_pumps: ['Pump', 'Pulley', 'Reservoir', 'Seal', 'Bearing']
};

// Generate all 120 components (24 cores × 5 components each)
export const components: Component[] = cores.flatMap(core => {
  const componentTypes = componentTypesByCategory[core.category_id] || ['Part A', 'Part B', 'Part C', 'Part D', 'Part E'];
  const baseRate = 50 + Math.floor(Math.random() * 30); // 50-80% base rate
  
  return componentTypes.map((type, index) => ({
    component_id: `${core.core_id}_${type.replace(/ /g, '_')}`,
    core_id: core.core_id,
    component_type: type,
    condition_rate: Math.min(95, Math.max(30, baseRate + (index - 2) * 5 + Math.floor(Math.random() * 10))), // 30-95% range
    displayName: type
  }));
});

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

// Search function (case-insensitive, matches name, brand, model, or ID)
export function searchCores(query: string, coresToSearch: Core[]): Core[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return coresToSearch;
  
  return coresToSearch.filter(core =>
    core.core_id.toLowerCase().includes(lowerQuery) ||
    core.brand.toLowerCase().includes(lowerQuery) ||
    core.model.toLowerCase().includes(lowerQuery) ||
    core.displayName.toLowerCase().includes(lowerQuery) ||
    core.fullDisplayName.toLowerCase().includes(lowerQuery)
  );
}

// Search components
export function searchComponents(query: string, componentsToSearch: Component[]): Component[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return componentsToSearch;
  
  return componentsToSearch.filter(component =>
    component.component_id.toLowerCase().includes(lowerQuery) ||
    component.component_type.toLowerCase().includes(lowerQuery) ||
    component.displayName.toLowerCase().includes(lowerQuery)
  );
}

// TODO: Replace with API calls in Phase 2
// - GET /api/categories
// - GET /api/cores?category={id}
// - GET /api/components?core={id}
// - GET /api/forecast/core?core_id={id}&start={date}&end={date}
// - GET /api/forecast/component?component_id={id}&start={date}&end={date}
