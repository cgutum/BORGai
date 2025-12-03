/**
 * Forecast Detail Analysis Data
 * 
 * Contains operational and supply chain performance metrics across 8 weeks.
 * Shows actual performance values (not forecast contributions) with performance-based color coding.
 */

export interface MetricRow {
  name: string;
  unit: 'units' | 'percentage' | 'currency' | 'days' | 'weeks';
  values: number[]; // 8 weeks of data
  performanceType: 'higherIsBetter' | 'lowerIsBetter' | 'optimalRange';
  thresholds: {
    strongPositive: number | [number, number];
    moderatePositive: number | [number, number];
    neutral: [number, number];
    moderateNegative: number | [number, number];
    strongNegative: number | [number, number];
  };
}

export interface SubCategory {
  name: string;
  metrics?: MetricRow[];
  subCategories?: SubCategory[]; // Support nested subcategories
}

export interface TopCategory {
  name: string;
  type: 'hierarchical' | 'flat';
  subCategories?: SubCategory[];
  metrics?: MetricRow[];
}

// 8 weeks starting Dec 9, 2025 (same as forecast contribution)
export const weekDates = ['12/09', '12/16', '12/23', '12/30', '01/06', '01/13', '01/20', '01/27'];

// Helper function to add noise/variation to values
function addNoise(baseValue: number, variation: number): number {
  const noise = (Math.random() - 0.5) * 2 * variation;
  return baseValue + noise;
}

// Component data with more variation for colorful heatmap
const component1Quantity = [195, 210, 188, 215, 205, 192, 218, 198]; // High performer, more variation
const component1RecoveryRate = [87.5, 91.2, 88.8, 92.5, 89.5, 90.8, 93.0, 88.0]; // Wider spread

const component2Quantity = [95, 112, 88, 108, 115, 92, 110, 98]; // More volatile
const component2RecoveryRate = [82.5, 87.0, 81.2, 86.5, 88.0, 83.5, 87.5, 84.0]; // Bigger range

const component3Quantity = [58, 72, 54, 68, 75, 60, 70, 62]; // More spread
const component3RecoveryRate = [62.0, 68.5, 61.0, 67.0, 69.5, 63.5, 68.0, 64.5]; // Wider variation

const component4Quantity = [35, 58, 28, 62, 45, 38, 55, 42]; // Highly volatile (20-80 range)
const component4RecoveryRate = [32.0, 55.0, 28.5, 58.0, 42.0, 35.5, 52.0, 38.0]; // Wide range (20-70%)

const component5Quantity = [62, 75, 58, 72, 78, 65, 74, 68]; // More variation
const component5RecoveryRate = [45.0, 62.0, 38.5, 58.0, 68.0, 48.0, 60.5, 52.0]; // Wider spread (30-75%)

// KPIs - 8 weeks of forecast values with more variation
const modelAccuracy = [89.5, 82.2, 91.8, 78.0, 93.0, 85.5, 88.5, 94.2]; // Wide variation 78-94%
const avgLeadTime = [195, 220, 185, 240, 175, 210, 230, 180]; // Wide variation 175-240 days
const coreReturnRate = [66.5, 58.2, 72.8, 54.0, 75.0, 60.5, 70.5, 63.2]; // Wide variation 54-75%
const coreInventory = [1150000, 950000, 1350000, 850000, 1450000, 1050000, 1280000, 920000]; // Wide variation 850K-1450K
const inventoryCoverage = [165.0, 142.0, 178.0, 135.0, 185.0, 155.0, 172.0, 148.0]; // Wide variation 135-185%
const recoveryRateScrapped = [73.5, 65.2, 80.8, 62.0, 83.0, 68.5, 78.5, 70.2]; // Wide variation 62-83%
const avgRecoverableComponents = [142, 125, 158, 118, 165, 135, 152, 128]; // Wide variation 118-165

// AI Forecast values (same as forecast contribution - this is the total core supply per week)
export const aiForecast = [85, 92, 78, 105, 88, 95, 110, 82];

// Calculate channel quantities based on percentages with variation
const dealerNetworkQuantity = aiForecast.map(total => {
  const base = total * 0.25; // 25% of total
  const variation = (Math.random() - 0.5) * base * 0.3; // ±15% variation
  return Math.round(base + variation);
});

const directCustomersQuantity = aiForecast.map(total => {
  const base = total * 0.15; // 15% of total
  const variation = (Math.random() - 0.5) * base * 0.4; // ±20% variation
  return Math.round(base + variation);
});

const oemServiceQuantity = aiForecast.map((total, idx) => {
  // Calculate to ensure sum equals total (60% baseline)
  return total - dealerNetworkQuantity[idx] - directCustomersQuantity[idx];
});

// Lead times in days (converted from weeks with more variation)
const dealerNetworkLeadTime = [252, 280, 224, 266, 294, 238, 273, 259]; // 36-42 weeks in days
const directCustomersLeadTime = [336, 364, 315, 350, 378, 329, 357, 343]; // 45-54 weeks in days
const oemServiceLeadTime = [168, 182, 161, 175, 189, 168, 182, 175]; // 23-27 weeks in days

export const forecastDetailData: TopCategory[] = [
  {
    name: 'Supply Key Numbers',
    type: 'hierarchical',
    subCategories: [
      {
        name: 'Total Core Supply',
        metrics: [
          {
            name: 'AI Forecast',
            unit: 'units',
            values: aiForecast,
            performanceType: 'higherIsBetter',
            thresholds: {
              strongPositive: 100,
              moderatePositive: 90,
              neutral: [75, 90],
              moderateNegative: 60,
              strongNegative: 0
            }
          }
        ],
        subCategories: [
          {
            name: 'Direct Customers (Garages, Independent Repair Shops, ...)',
            metrics: [
              {
                name: 'Core Supply',
            unit: 'units',
            values: directCustomersQuantity,
            performanceType: 'higherIsBetter',
            thresholds: {
              strongPositive: 16, // > 16 units
              moderatePositive: 15, // 15-16 units
              neutral: [13, 15], // 13-15 units
              moderateNegative: 12, // 12-13 units
              strongNegative: 0 // < 12 units
            }
          },
          {
            name: 'Average Lead Time',
            unit: 'days',
            values: directCustomersLeadTime,
            performanceType: 'lowerIsBetter',
            thresholds: {
              strongPositive: 330, // < 330 days (good)
              moderatePositive: 350, // 330-350 days
              neutral: [350, 370], // 350-370 days
              moderateNegative: 370, // 370+ days
              strongNegative: 99999 // > 370 days
            }
          }
            ]
          },
          {
            name: 'Dealer Network (Wholesalers, Distributors, ...)',
            metrics: [
              {
            name: 'Core Supply',
            unit: 'units',
            values: dealerNetworkQuantity,
            performanceType: 'higherIsBetter',
            thresholds: {
              strongPositive: 27, // > 27 units
              moderatePositive: 25, // 25-27 units
              neutral: [22, 25], // 22-25 units
              moderateNegative: 20, // 20-22 units
              strongNegative: 0 // < 20 units
            }
          },
          {
            name: 'Average Lead Time',
            unit: 'days',
            values: dealerNetworkLeadTime,
            performanceType: 'lowerIsBetter',
            thresholds: {
              strongPositive: 240, // < 240 days (good)
              moderatePositive: 260, // 240-260 days
              neutral: [260, 280], // 260-280 days
              moderateNegative: 280, // 280+ days
              strongNegative: 99999 // > 280 days
            }
          }
            ]
          },
          {
            name: 'OEM/Service Partners',
            metrics: [
              {
            name: 'Core Supply',
            unit: 'units',
            values: oemServiceQuantity,
            performanceType: 'higherIsBetter',
            thresholds: {
              strongPositive: 58, // > 58 units
              moderatePositive: 52, // 52-58 units
              neutral: [45, 52], // 45-52 units
              moderateNegative: 40, // 40-45 units
              strongNegative: 0 // < 40 units
            }
          },
          {
            name: 'Average Lead Time',
            unit: 'days',
            values: oemServiceLeadTime,
            performanceType: 'lowerIsBetter',
            thresholds: {
              strongPositive: 170, // < 170 days (good)
              moderatePositive: 180, // 170-180 days
              neutral: [180, 190], // 180-190 days
              moderateNegative: 190, // 190+ days
              strongNegative: 99999 // > 190 days
            }
          }
            ]
          }
        ]
      },
      {
        name: 'Component Level Supply',
        subCategories: [
      {
        name: 'Component 1',
        metrics: [
          {
            name: 'Quantity',
            unit: 'units',
            values: component1Quantity,
            performanceType: 'higherIsBetter',
            thresholds: {
              strongPositive: 210, // > 210 units
              moderatePositive: 205, // 205-210 units
              neutral: [195, 205], // 195-205 units
              moderateNegative: 190, // 190-195 units
              strongNegative: 0 // < 20% of max
            }
          },
          {
            name: 'Recovery Rate',
            unit: 'percentage',
            values: component1RecoveryRate,
            performanceType: 'higherIsBetter',
            thresholds: {
              strongPositive: 91, // > 91%
              moderatePositive: 89, // 89-91%
              neutral: [88, 89], // 88-89%
              moderateNegative: 87, // 87-88%
              strongNegative: 0 // < 87%
            }
          }
        ]
      },
      {
        name: 'Component 2',
        metrics: [
          {
            name: 'Quantity',
            unit: 'units',
            values: component2Quantity,
            performanceType: 'higherIsBetter',
            thresholds: {
              strongPositive: 120, // > 120 units
              moderatePositive: 110, // 110-120 units
              neutral: [95, 110], // 95-110 units
              moderateNegative: 85, // 85-95 units
              strongNegative: 0 // < 85 units
            }
          },
          {
            name: 'Recovery Rate',
            unit: 'percentage',
            values: component2RecoveryRate,
            performanceType: 'higherIsBetter',
            thresholds: {
              strongPositive: 86, // > 86%
              moderatePositive: 84, // 84-86%
              neutral: [82, 84], // 82-84%
              moderateNegative: 80, // 80-82%
              strongNegative: 0 // < 80%
            }
          }
        ]
      },
      {
        name: 'Component 3',
        metrics: [
          {
            name: 'Quantity',
            unit: 'units',
            values: component3Quantity,
            performanceType: 'higherIsBetter',
            thresholds: {
              strongPositive: 72, // > 72 units
              moderatePositive: 68, // 68-72 units
              neutral: [60, 68], // 60-68 units
              moderateNegative: 52, // 52-60 units
              strongNegative: 0 // < 52 units
            }
          },
          {
            name: 'Recovery Rate',
            unit: 'percentage',
            values: component3RecoveryRate,
            performanceType: 'higherIsBetter',
            thresholds: {
              strongPositive: 66, // > 66%
              moderatePositive: 64, // 64-66%
              neutral: [62, 64], // 62-64%
              moderateNegative: 60, // 60-62%
              strongNegative: 0 // < 60%
            }
          }
        ]
      },
      {
        name: 'Component 4',
        metrics: [
          {
            name: 'Quantity',
            unit: 'units',
            values: component4Quantity,
            performanceType: 'higherIsBetter',
            thresholds: {
              strongPositive: 55, // > 55 units
              moderatePositive: 48, // 48-55 units
              neutral: [38, 48], // 38-48 units
              moderateNegative: 32, // 32-38 units
              strongNegative: 0 // < 32 units
            }
          },
          {
            name: 'Recovery Rate',
            unit: 'percentage',
            values: component4RecoveryRate,
            performanceType: 'higherIsBetter',
            thresholds: {
              strongPositive: 52, // > 52%
              moderatePositive: 45, // 45-52%
              neutral: [38, 45], // 38-45%
              moderateNegative: 32, // 32-38%
              strongNegative: 0 // < 32%
            }
          }
        ]
      },
      {
        name: 'Component 5',
        metrics: [
          {
            name: 'Quantity',
            unit: 'units',
            values: component5Quantity,
            performanceType: 'higherIsBetter',
            thresholds: {
              strongPositive: 95, // > 95 units
              moderatePositive: 85, // 85-95 units
              neutral: [70, 85], // 70-85 units
              moderateNegative: 60, // 60-70 units
              strongNegative: 0 // < 60 units
            }
          },
          {
            name: 'Recovery Rate',
            unit: 'percentage',
            values: component5RecoveryRate,
            performanceType: 'higherIsBetter',
            thresholds: {
              strongPositive: 72, // > 72%
              moderatePositive: 68, // 68-72%
              neutral: [62, 68], // 62-68%
              moderateNegative: 55, // 55-62%
              strongNegative: 0 // < 55%
            }
          }
        ]
      }
    ]
    }
    ]
  },
  {
    name: 'Core Supply Chain KPIs',
    type: 'flat',
    metrics: [
      {
        name: 'Recent Model Accuracy',
        unit: 'percentage',
        values: modelAccuracy,
        performanceType: 'higherIsBetter',
        thresholds: {
          strongPositive: 92, // > 92%
          moderatePositive: 88, // 88-92%
          neutral: [82, 88], // 82-88%
          moderateNegative: 78, // 78-82%
          strongNegative: 0 // < 78%
        }
      },
      {
        name: 'Average Lead Time',
        unit: 'days',
        values: avgLeadTime,
        performanceType: 'lowerIsBetter',
        thresholds: {
          strongPositive: 190, // < 190 days (good)
          moderatePositive: 205, // 190-205 days
          neutral: [205, 225], // 205-225 days
          moderateNegative: 225, // 225+ days
          strongNegative: 99999 // > 225 days
        }
      },
      {
        name: 'Core Return Rate',
        unit: 'percentage',
        values: coreReturnRate,
        performanceType: 'higherIsBetter',
        thresholds: {
          strongPositive: 70, // > 70%
          moderatePositive: 65, // 65-70%
          neutral: [58, 65], // 58-65%
          moderateNegative: 54, // 54-58%
          strongNegative: 0 // < 54%
        }
      },
      {
        name: 'Current Core Inventory',
        unit: 'currency',
        values: coreInventory,
        performanceType: 'optimalRange',
        thresholds: {
          strongPositive: [1100000, 1250000], // Target zone 1.1-1.25M
          moderatePositive: [1000000, 1350000], // Acceptable
          neutral: [900000, 1400000], // Neutral
          moderateNegative: [850000, 1450000], // Warning
          strongNegative: [0, 2000000] // Critical
        }
      },
      {
        name: 'Core Inventory Coverage',
        unit: 'percentage',
        values: inventoryCoverage,
        performanceType: 'optimalRange',
        thresholds: {
          strongPositive: [160, 175], // Target zone 160-175%
          moderatePositive: [150, 180], // Acceptable
          neutral: [140, 185], // Neutral
          moderateNegative: [135, 190], // Warning
          strongNegative: [0, 300] // Critical
        }
      },
      {
        name: 'Recovery Rate',
        unit: 'percentage',
        values: recoveryRateScrapped,
        performanceType: 'higherIsBetter',
        thresholds: {
          strongPositive: 78, // > 78%
          moderatePositive: 72, // 72-78%
          neutral: [66, 72], // 66-72%
          moderateNegative: 62, // 62-66%
          strongNegative: 0 // < 62%
        }
      },
      {
        name: 'Recoverable Components per Core (Average)',
        unit: 'units',
        values: avgRecoverableComponents,
        performanceType: 'higherIsBetter',
        thresholds: {
          strongPositive: 155, // > 155 units
          moderatePositive: 145, // 145-155 units
          neutral: [130, 145], // 130-145 units
          moderateNegative: 120, // 120-130 units
          strongNegative: 0 // < 120 units
        }
      }
    ]
  }
];

/**
 * Calculate total inbound cores (sum of all channels)
 * Used for aggregate view of Supplier Key Numbers
 */
export function calculateTotalInboundCores(): number[] {
  return weekDates.map((_, idx) => 
    dealerNetworkQuantity[idx] + 
    directCustomersQuantity[idx] + 
    oemServiceQuantity[idx]
  );
}

/**
 * Calculate weighted average recovery rate across all components
 * Used for aggregate view of Supply - Component Level
 */
export function calculateWeightedRecoveryRate(): number[] {
  return weekDates.map((_, weekIdx) => {
    const totalQuantity = 
      component1Quantity[weekIdx] +
      component2Quantity[weekIdx] +
      component3Quantity[weekIdx] +
      component4Quantity[weekIdx] +
      component5Quantity[weekIdx];
    
    const weightedSum = 
      component1Quantity[weekIdx] * component1RecoveryRate[weekIdx] +
      component2Quantity[weekIdx] * component2RecoveryRate[weekIdx] +
      component3Quantity[weekIdx] * component3RecoveryRate[weekIdx] +
      component4Quantity[weekIdx] * component4RecoveryRate[weekIdx] +
      component5Quantity[weekIdx] * component5RecoveryRate[weekIdx];
    
    return weightedSum / totalQuantity;
  });
}

/**
 * Get performance color class based on value and metric thresholds
 */
export function getPerformanceColorClass(
  value: number,
  metric: MetricRow
): string {
  const { performanceType, thresholds } = metric;
  
  if (performanceType === 'higherIsBetter') {
    if (typeof thresholds.strongPositive === 'number' && value >= thresholds.strongPositive) {
      return 'bg-[#A2AD00]/25 text-[#A2AD00]';
    }
    if (typeof thresholds.moderatePositive === 'number' && value >= thresholds.moderatePositive) {
      return 'bg-[#A2AD00]/18 text-[#6B7280]';
    }
    if (value >= thresholds.neutral[0] && value <= thresholds.neutral[1]) {
      return 'bg-[#F5F5F5] text-[#6E685F]';
    }
    if (typeof thresholds.moderateNegative === 'number' && value >= thresholds.moderateNegative) {
      return 'bg-[#E37222]/18 text-[#6B7280]';
    }
    return 'bg-[#E37222]/25 text-[#E37222]';
  }
  
  if (performanceType === 'lowerIsBetter') {
    if (typeof thresholds.strongPositive === 'number' && value <= thresholds.strongPositive) {
      return 'bg-[#A2AD00]/25 text-[#A2AD00]';
    }
    if (typeof thresholds.moderatePositive === 'number' && value <= thresholds.moderatePositive) {
      return 'bg-[#A2AD00]/18 text-[#6B7280]';
    }
    if (value >= thresholds.neutral[0] && value <= thresholds.neutral[1]) {
      return 'bg-[#F5F5F5] text-[#6E685F]';
    }
    if (typeof thresholds.moderateNegative === 'number' && value <= thresholds.moderateNegative) {
      return 'bg-[#E37222]/18 text-[#6B7280]';
    }
    return 'bg-[#E37222]/25 text-[#E37222]';
  }
  
  if (performanceType === 'optimalRange') {
    const [targetMin, targetMax] = thresholds.strongPositive as [number, number];
    if (value >= targetMin && value <= targetMax) {
      return 'bg-[#A2AD00]/25 text-[#A2AD00]';
    }
    
    const [acceptableMin, acceptableMax] = thresholds.moderatePositive as [number, number];
    if (value >= acceptableMin && value <= acceptableMax) {
      return 'bg-[#A2AD00]/18 text-[#6B7280]';
    }
    
    if (value >= thresholds.neutral[0] && value <= thresholds.neutral[1]) {
      return 'bg-[#F5F5F5] text-[#6E685F]';
    }
    
    const [warningMin, warningMax] = thresholds.moderateNegative as [number, number];
    if (value >= warningMin && value <= warningMax) {
      return 'bg-[#E37222]/18 text-[#6B7280]';
    }
    
    return 'bg-[#E37222]/25 text-[#E37222]';
  }
  
  return 'bg-[#F5F5F5] text-[#6E685F]'; // Default neutral
}

/**
 * Format metric value based on unit type
 */
export function formatMetricValue(value: number, unit: string): string {
  switch (unit) {
    case 'units':
      if (value >= 1000) {
        const formatted = (value / 1000).toFixed(1);
        return formatted.endsWith('.0') 
          ? `${formatted.slice(0, -2)}K` 
          : `${formatted}K`;
      }
      return Math.round(value).toLocaleString();
    
    case 'percentage':
      return `${value.toFixed(1)}%`;
    
    case 'currency':
      if (value >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(1)}M`;
      }
      return `$${Math.round(value / 1000)}K`;
    
    case 'days':
      return `${Math.round(value)}d`;
    
    case 'weeks':
      return `${Math.round(value)}w`;
    
    default:
      return value.toFixed(1);
  }
}
