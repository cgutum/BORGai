/**
 * Forecast Contribution Analysis Data
 * 
 * Contains impact factors and calculations for all features contributing to AI forecast.
 * Impact factors range from -50 to +50, representing contribution strength.
 */

export interface FeatureImpact {
  name: string;
  impactFactors: number[]; // 8 weeks of impact factor data (-50 to +50)
}

export interface SubCategory {
  name: string;
  features: FeatureImpact[];
  weightedMean?: number[]; // Weighted mean impact factors for aggregate view
}

export interface TopCategory {
  name: string;
  subCategories: SubCategory[];
}

// 8 weeks starting Dec 9, 2025
export const weekDates = ['12/09', '12/16', '12/23', '12/30', '01/06', '01/13', '01/20', '01/27'];

// AI Forecast values (50-120 range)
export const aiForecast = [85, 92, 78, 105, 88, 95, 110, 82];

// Internal Category - Historic Supply (High Impact: ±45)
// Personality: Generally positive but volatile with occasional negative spikes
const historicSupplyFeatures: FeatureImpact[] = [
  { name: 'Core Condition Rate', impactFactors: [42, -30, 38, 44, -25, 43, 45, 12] },
  { name: 'Core Quantity', impactFactors: [38, 36, -42, 40, 37, -15, 42, 36] },
  { name: 'Delivery Date', impactFactors: [-35, 30, 26, -40, 29, 31, 33, -28] },
  { name: 'Component 1 Condition Rate', impactFactors: [35, -25, 31, 37, 8, 36, -32, 32] },
  { name: 'Component 2 Condition Rate', impactFactors: [15, 30, -38, 34, 31, 5, 35, -22] },
  { name: 'Component 3 Condition Rate', impactFactors: [30, 28, 12, -35, 29, 31, -28, 27] },
  { name: 'Component 4 Condition Rate', impactFactors: [-20, 23, 21, 27, -18, 26, 28, 22] },
  { name: 'Component 5 Condition Rate', impactFactors: [22, -15, 18, 24, 21, -12, 25, 19] },
];

// Calculate weighted mean for Historic Supply
// 35% Core Condition/Quantity, 15% Delivery, 10% each Component
const historicSupplyWeightedMean = weekDates.map((_, weekIdx) => {
  const coreCondition = historicSupplyFeatures[0].impactFactors[weekIdx] * 0.35;
  const coreQuantity = historicSupplyFeatures[1].impactFactors[weekIdx] * 0.35;
  const delivery = historicSupplyFeatures[2].impactFactors[weekIdx] * 0.15;
  const components = historicSupplyFeatures.slice(3).reduce((sum, f) => sum + f.impactFactors[weekIdx] * 0.10, 0);
  return Math.round(coreCondition + coreQuantity + delivery + components);
});

// Internal Category - Sales Orders (Medium-High Impact: ±40)
// Personality: Mostly positive with Return Rate consistently negative
const salesOrdersFeatures: FeatureImpact[] = [
  { name: 'Core Type', impactFactors: [35, -28, 30, 38, 12, -32, 39, 31] },
  { name: 'Quantity', impactFactors: [38, 36, -25, 40, 37, 39, -35, 34] },
  { name: 'Order Date', impactFactors: [25, -18, 20, 28, 5, 26, 29, -22] },
  { name: 'Return Rate', impactFactors: [-35, -28, -42, -38, -32, -40, -36, -30] },
];

// Calculate weighted mean for Sales Orders
// 40% Quantity, 30% Core Type, 20% Order Date, 10% Return Rate
const salesOrdersWeightedMean = weekDates.map((_, weekIdx) => {
  const quantity = salesOrdersFeatures[1].impactFactors[weekIdx] * 0.40;
  const coreType = salesOrdersFeatures[0].impactFactors[weekIdx] * 0.30;
  const orderDate = salesOrdersFeatures[2].impactFactors[weekIdx] * 0.20;
  const returnRate = salesOrdersFeatures[3].impactFactors[weekIdx] * 0.10;
  return Math.round(quantity + coreType + orderDate + returnRate);
});

// External Category - Registration Data & Customer Trends (Medium Impact: ±35)
// Personality: Mixed with seasonal patterns and regional variations
const registrationDataFeatures: FeatureImpact[] = [
  { name: 'Vehicle Model', impactFactors: [28, -22, 24, 30, -18, 29, 32, 8] },
  { name: 'Quantity', impactFactors: [25, 23, -28, 27, 24, -15, 29, 22] },
  { name: 'Month', impactFactors: [-25, 18, 20, -30, 16, 14, -22, 19] },
  { name: 'Total Fleet', impactFactors: [20, -12, 18, 22, 8, 21, -18, 18] },
  { name: 'Breakdown Rate', impactFactors: [-28, -32, -18, -35, -25, -30, -38, -22] },
  { name: 'Region', impactFactors: [18, 17, -20, 20, 18, -12, 21, 16] },
];

// Calculate weighted mean for Registration Data
// 30% Vehicle Model/Quantity, 10% each other
const registrationDataWeightedMean = weekDates.map((_, weekIdx) => {
  const vehicleModel = registrationDataFeatures[0].impactFactors[weekIdx] * 0.30;
  const quantity = registrationDataFeatures[1].impactFactors[weekIdx] * 0.30;
  const others = registrationDataFeatures.slice(2).reduce((sum, f) => sum + f.impactFactors[weekIdx] * 0.10, 0);
  return Math.round(vehicleModel + quantity + others);
});

// External Category - Recall Data & Market Insights (Low-Medium Impact: ±25)
// Personality: Event-driven with sporadic spikes
const recallDataFeatures: FeatureImpact[] = [
  { name: 'Model', impactFactors: [15, -18, 12, 22, -8, 16, 18, -15] },
  { name: 'Quantity', impactFactors: [12, 11, -20, 14, 12, -16, 15, 11] },
  { name: 'Region', impactFactors: [-12, 7, 6, 15, -10, 8, 10, -8] },
  { name: 'Part/Core Type', impactFactors: [10, -15, 8, 11, 10, -12, 12, 9] },
];

// Simple average for Recall Data
const recallDataWeightedMean = weekDates.map((_, weekIdx) => {
  const sum = recallDataFeatures.reduce((acc, f) => acc + f.impactFactors[weekIdx], 0);
  return Math.round(sum / recallDataFeatures.length);
});

// External Category - Macroeconomic Trends (Low Impact: ±20)
// Personality: Interest Rate consistently negative, others moderate positive
const macroeconomicFeatures: FeatureImpact[] = [
  { name: 'Interest Rate', impactFactors: [-15, -18, -22, -12, -20, -16, -25, -14] },
  { name: 'GDP', impactFactors: [12, -8, 10, 18, 15, -5, 14, 11] },
  { name: 'PMI', impactFactors: [10, 9, -12, 11, 10, 15, 12, -7] },
  { name: 'Used Car Market Trend', impactFactors: [5, -8, 4, 7, 6, -10, 8, 5] },
];

// Calculate weighted mean for Macroeconomic
// 30% GDP, 25% PMI, 25% Interest Rate, 20% Used Car Market
const macroeconomicWeightedMean = weekDates.map((_, weekIdx) => {
  const gdp = macroeconomicFeatures[1].impactFactors[weekIdx] * 0.30;
  const pmi = macroeconomicFeatures[2].impactFactors[weekIdx] * 0.25;
  const interestRate = macroeconomicFeatures[0].impactFactors[weekIdx] * 0.25;
  const usedCarMarket = macroeconomicFeatures[3].impactFactors[weekIdx] * 0.20;
  return Math.round(gdp + pmi + interestRate + usedCarMarket);
});

// Export complete structure
export const forecastContributionData: TopCategory[] = [
  {
    name: 'INTERNAL',
    subCategories: [
      {
        name: 'Historic Supply',
        features: historicSupplyFeatures,
        weightedMean: historicSupplyWeightedMean,
      },
      {
        name: 'Sales Orders',
        features: salesOrdersFeatures,
        weightedMean: salesOrdersWeightedMean,
      },
    ],
  },
  {
    name: 'EXTERNAL',
    subCategories: [
      {
        name: 'Registration Data & Customer Trends',
        features: registrationDataFeatures,
        weightedMean: registrationDataWeightedMean,
      },
      {
        name: 'Recall Data & Market Insights',
        features: recallDataFeatures,
        weightedMean: recallDataWeightedMean,
      },
      {
        name: 'Macroeconomic Trends',
        features: macroeconomicFeatures,
        weightedMean: macroeconomicWeightedMean,
      },
    ],
  },
];

/**
 * Calculate absolute values from impact factors
 * All absolute values sum to AI Forecast for that week
 */
export function calculateAbsoluteValues(impactFactor: number, weekIndex: number, allImpactFactors: number[][]): number {
  const totalAbsoluteImpact = allImpactFactors.reduce((sum, weekFactors) => {
    return sum + Math.abs(weekFactors[weekIndex]);
  }, 0);
  
  const absoluteValue = (Math.abs(impactFactor) / totalAbsoluteImpact) * aiForecast[weekIndex];
  return Math.sign(impactFactor) * absoluteValue;
}

/**
 * Calculate relative percentage from absolute values
 */
export function calculateRelativePercentage(absoluteValue: number, weekIndex: number): number {
  return (Math.abs(absoluteValue) / aiForecast[weekIndex]) * 100 * Math.sign(absoluteValue);
}

/**
 * Get color class based on impact factor value
 * Using TUM colors with transparency levels matching filter badges
 */
export function getImpactColorClass(impactFactor: number): string {
  if (impactFactor > 30) {
    return 'bg-[#A2AD00]/25 text-[#A2AD00]'; // TUM Green 25% - Strong positive
  } else if (impactFactor >= 10) {
    return 'bg-[#A2AD00]/18 text-[#6B7280]'; // TUM Green 18% - Moderate positive
  } else if (impactFactor > -10) {
    return 'bg-[#F5F5F5] text-[#6E685F]'; // Grey - Neutral
  } else if (impactFactor >= -30) {
    return 'bg-[#E37222]/18 text-[#6B7280]'; // TUM Orange 18% - Moderate negative
  } else {
    return 'bg-[#E37222]/25 text-[#E37222]'; // TUM Orange 25% - Strong negative
  }
}

/**
 * Format value based on view mode
 */
export function formatValue(value: number, mode: 'impact' | 'absolute' | 'relative'): string {
  const sign = value >= 0 ? '+' : '';
  
  switch (mode) {
    case 'impact':
      return `${sign}${Math.round(value)}`;
    case 'absolute':
      return `${sign}${value.toFixed(1)}`;
    case 'relative':
      return `${sign}${value.toFixed(1)}%`;
    default:
      return `${sign}${value}`;
  }
}
