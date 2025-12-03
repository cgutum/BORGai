'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  forecastDetailData,
  weekDates,
  aiForecast,
  calculateTotalInboundCores,
  calculateWeightedRecoveryRate,
  getPerformanceColorClass,
  formatMetricValue,
  type MetricRow,
  type SubCategory,
  type TopCategory
} from '@/lib/data/forecast-detail-data';

interface ForecastDetailTableProps {
  isAggregateView: boolean;
}

export default function ForecastDetailTable({ isAggregateView }: ForecastDetailTableProps) {
  // State for tracking expanded categories
  const [expandedTopCategories, setExpandedTopCategories] = useState<Set<string>>(() => {
    // Initialize with all top categories expanded in detailed view
    if (!isAggregateView) {
      return new Set(forecastDetailData.map((cat) => cat.name));
    }
    return new Set();
  });

  const [expandedSubCategories, setExpandedSubCategories] = useState<Set<string>>(() => {
    // Initialize with all sub-categories expanded in detailed view
    if (!isAggregateView) {
      const allSubCategories: string[] = [];
      forecastDetailData.forEach((topCat) => {
        if (topCat.subCategories) {
          topCat.subCategories.forEach((subCat) => {
            allSubCategories.push(subCat.name);
          });
        }
      });
      return new Set(allSubCategories);
    }
    return new Set();
  });

  // Update expansion state when view mode changes
  useEffect(() => {
    if (isAggregateView) {
      // In aggregate view: expand top categories, collapse sub-categories
      setExpandedTopCategories(new Set(forecastDetailData.map((cat) => cat.name)));
      setExpandedSubCategories(new Set());
    } else {
      // In detailed view: expand everything including nested subcategories
      setExpandedTopCategories(new Set(forecastDetailData.map((cat) => cat.name)));
      const allSubCategories: string[] = [];
      const addSubCategories = (subCats: SubCategory[]) => {
        subCats.forEach((subCat) => {
          allSubCategories.push(subCat.name);
          if (subCat.subCategories) {
            addSubCategories(subCat.subCategories);
          }
        });
      };
      forecastDetailData.forEach((topCat) => {
        if (topCat.subCategories) {
          addSubCategories(topCat.subCategories);
        }
      });
      setExpandedSubCategories(new Set(allSubCategories));
    }
  }, [isAggregateView]);

  const toggleTopCategory = (name: string) => {
    setExpandedTopCategories((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });

    // When collapsing top category, also collapse all its sub-categories
    if (expandedTopCategories.has(name)) {
      const topCat = forecastDetailData.find((cat) => cat.name === name);
      if (topCat && topCat.subCategories) {
        setExpandedSubCategories((prev) => {
          const next = new Set(prev);
          topCat.subCategories!.forEach((sub) => {
            next.delete(sub.name);
          });
          return next;
        });
      }
    }
  };

  const toggleSubCategory = (name: string) => {
    setExpandedSubCategories((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  // Get unit label for metric display in left column
  const getUnitLabel = (unit: string): string => {
    switch (unit) {
      case 'units': return 'Units';
      case 'percentage': return '%';
      case 'currency': return '$';
      case 'days': return 'Days';
      case 'weeks': return 'Weeks';
      default: return '';
    }
  };

  // Format value without unit symbol (units shown in metric name only)
  const formatValueOnly = (value: number, unit: string): string => {
    switch (unit) {
      case 'percentage':
        return `${value.toFixed(1)}%`; // Keep % in cells for readability
      case 'currency':
        if (value >= 1000000) {
          return `${(value / 1000000).toFixed(1)}M`;
        }
        return `${(value / 1000).toFixed(0)}K`;
      case 'days':
        return `${Math.round(value)}`;
      case 'units':
      default:
        return Math.round(value).toLocaleString();
    }
  };

  // Render metric row
  const renderMetricRow = (metric: MetricRow, level: number) => {
    const unitLabel = getUnitLabel(metric.unit);
    
    return (
      <tr key={metric.name} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
        <td className="py-2 px-4 text-sm text-[#374151]" style={{ paddingLeft: `${level * 1.5}rem` }}>
          {metric.name} {unitLabel && <span className="text-[#9CA3AF] text-xs ml-1">({unitLabel})</span>}
        </td>
        {metric.values.map((value, weekIdx) => {
          const colorClass = getPerformanceColorClass(value, metric);
          const formattedValue = formatValueOnly(value, metric.unit);
          
          return (
            <td key={weekIdx} className={`py-2 px-4 text-center text-sm font-medium ${colorClass}`}>
              {formattedValue}
            </td>
          );
        })}
      </tr>
    );
  };

  // Render sub-category row (only if parent top category is expanded)
  const renderSubCategoryRow = (subCat: SubCategory, topCatName: string, level: number) => {
    const isExpanded = expandedSubCategories.has(subCat.name);
    
    return (
      <React.Fragment key={subCat.name}>
        <tr
          className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors cursor-pointer"
          onClick={() => !isAggregateView && toggleSubCategory(subCat.name)}
        >
          <td className="py-2 px-4 text-sm text-[#374151]" style={{ paddingLeft: `${level * 1.5}rem`, fontWeight: (subCat.name === 'Total Core Supply' || subCat.name === 'Component Level Supply') ? 600 : 500 }}>
            <div className="flex items-center gap-2">
              {!isAggregateView && (
                isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
              )}
              {subCat.name}
            </div>
          </td>
          {/* Category row - no week values shown */}
          {weekDates.map((week) => (
            <td key={week} className="py-2 px-4 text-center text-sm text-[#6B7280]">
            </td>
          ))}
        </tr>

        {/* Show individual metrics and nested subcategories when sub-category is expanded */}
        {isExpanded && (
          <>
            {subCat.metrics && subCat.metrics.map((metric) => renderMetricRow(metric, level + 1))}
            {subCat.subCategories && subCat.subCategories.map((nestedSub) => 
              renderSubCategoryRow(nestedSub, topCatName, level + 1)
            )}
          </>
        )}
      </React.Fragment>
    );
  };

  // Render AI Forecast row (for Total Core Supply)
  const renderAIForecastRow = () => {
    return (
      <tr className="bg-[#E3F2FD] border-t-2 border-t-[#0065BD]">
        <td className="py-3 px-4 font-semibold text-sm text-[#0065BD]">
          AI Forecast <span className="text-[#9CA3AF] text-xs ml-1 font-normal">(Units)</span>
        </td>
        {aiForecast.map((value, weekIdx) => (
          <td key={weekIdx} className="py-3 px-4 text-center text-sm font-semibold text-[#0065BD]">
            {value}
          </td>
        ))}
      </tr>
    );
  };

  // Render aggregate row for Total Core Supply (sum of all channels)
  const renderSupplierAggregateRow = (level: number) => {
    const totalInboundCores = calculateTotalInboundCores();
    
    return (
      <tr key="total-core-supply" className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
        <td className="py-2 px-4 text-sm text-[#374151]" style={{ paddingLeft: `${level * 1.5}rem` }}>
          Total Core Supply <span className="text-[#9CA3AF] text-xs ml-1">(Units)</span>
        </td>
        {totalInboundCores.map((value, weekIdx) => {
          // Use higherIsBetter logic for total inbound cores (range 80-120)
          let colorClass = 'bg-[#F5F5F5] text-[#6E685F]';
          if (value >= 102) colorClass = 'bg-[#A2AD00]/25 text-[#A2AD00]'; // > 85% of 120
          else if (value >= 88) colorClass = 'bg-[#A2AD00]/18 text-[#6B7280]'; // > 70% of 120
          else if (value >= 48 && value <= 88) colorClass = 'bg-[#F5F5F5] text-[#6E685F]'; // 40-70%
          else if (value >= 24) colorClass = 'bg-[#E37222]/18 text-[#6B7280]'; // 20-40%
          else colorClass = 'bg-[#E37222]/25 text-[#E37222]'; // < 20%
          
          const formattedValue = formatMetricValue(value, 'units');
          
          return (
            <td key={weekIdx} className={`py-2 px-4 text-center text-sm font-medium ${colorClass}`}>
              {formattedValue}
            </td>
          );
        })}
      </tr>
    );
  };

  // Render aggregate row for Supply - Component Level (Average Recovery Rate)
  const renderComponentAggregateRow = (level: number) => {
    const weightedRecoveryRate = calculateWeightedRecoveryRate();
    
    return (
      <tr key="avg-recovery-rate" className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
        <td className="py-2 px-4 text-sm text-[#374151]" style={{ paddingLeft: `${level * 1.5}rem` }}>
          Average Recovery Rate
        </td>
        {weightedRecoveryRate.map((value, weekIdx) => {
          // Use higherIsBetter logic for recovery rate
          let colorClass = 'bg-[#F5F5F5] text-[#6E685F]';
          if (value >= 75) colorClass = 'bg-[#A2AD00]/25 text-[#A2AD00]'; // > 90% of ~80%
          else if (value >= 65) colorClass = 'bg-[#A2AD00]/18 text-[#6B7280]'; // > 70%
          else if (value >= 45 && value <= 65) colorClass = 'bg-[#F5F5F5] text-[#6E685F]'; // 40-70%
          else if (value >= 30) colorClass = 'bg-[#E37222]/18 text-[#6B7280]'; // 20-40%
          else colorClass = 'bg-[#E37222]/25 text-[#E37222]'; // < 20%
          
          const formattedValue = formatMetricValue(value, 'percentage');
          
          return (
            <td key={weekIdx} className={`py-2 px-4 text-center text-sm font-medium ${colorClass}`}>
              {formattedValue}
            </td>
          );
        })}
      </tr>
    );
  };

  // Render top category row
  const renderTopCategoryRow = (topCat: TopCategory) => {
    const isExpanded = expandedTopCategories.has(topCat.name);
    const showAggregateOnly = isAggregateView && !isExpanded;

    return (
      <React.Fragment key={topCat.name}>
        {/* Top category header row */}
        <tr className="bg-[#F3F4F6] border-b border-[#D3D0CC]">
          <td className="py-3 px-4 font-semibold text-sm text-[#0065BD]">
            <button
              onClick={() => toggleTopCategory(topCat.name)}
              className="flex items-center gap-2"
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              {topCat.name}
            </button>
          </td>
          {weekDates.map((week) => (
            <td key={week} className="py-3 px-4 text-center text-xs font-semibold text-[#6E685F]">
            </td>
          ))}
        </tr>

        {/* Show content when expanded */}
        {isExpanded && (
          <>
            {/* For hierarchical categories (Supplier, Component) */}
            {topCat.type === 'hierarchical' && topCat.subCategories && (
              <>
                {/* Show aggregate row if in aggregate view */}
                {isAggregateView && (
                  <>
                    {topCat.name === 'Supply Key Numbers' && renderSupplierAggregateRow(1)}
                    {topCat.name === 'Component Level Supply' && renderComponentAggregateRow(1)}
                  </>
                )}
                
                {/* Show sub-categories in detailed view */}
                {!isAggregateView && topCat.subCategories.map((subCat) => 
                  renderSubCategoryRow(subCat, topCat.name, 1)
                )}
              </>
            )}

            {/* For flat categories (Core Supply Chain KPIs) */}
            {topCat.type === 'flat' && topCat.metrics && (
              <>
                {topCat.metrics.map((metric) => renderMetricRow(metric, 1))}
              </>
            )}
          </>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-[#0065BD]">
            <th className="py-3 px-4 text-left text-sm font-semibold text-[#0065BD] min-w-[300px]">
              Metric
            </th>
            {weekDates.map((week) => (
              <th key={week} className="py-3 px-4 text-center text-sm font-semibold text-[#0065BD] min-w-[100px]">
                {week}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {forecastDetailData.map((topCat) => renderTopCategoryRow(topCat))}
        </tbody>
      </table>
      
      {/* Grey separator line */}
      <div className="mt-6 border-t border-[#D3D0CC]"></div>
      
      {/* Legend with gradient bar */}
      <div className="mt-4 px-4 py-3">
        <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto">
          {/* Left label */}
          <div className="text-right">
            <div className="text-sm font-medium text-[#E37222]">Poor performance</div>
            <div className="text-xs text-[#9CA3AF] mt-0.5">(below target)</div>
          </div>
          
          {/* Gradient bar with scale markers */}
          <div className="flex-1 max-w-md">
            <div className="h-8 rounded overflow-hidden border border-[#D3D0CC]" style={{
              background: 'linear-gradient(to right, rgba(227, 114, 34, 0.25) 0%, rgba(227, 114, 34, 0.18) 25%, #F5F5F5 45%, #F5F5F5 55%, rgba(162, 173, 0, 0.18) 75%, rgba(162, 173, 0, 0.25) 100%)'
            }}></div>
          </div>
          
          {/* Right label */}
          <div className="text-left">
            <div className="text-sm font-medium text-[#A2AD00]">Good performance</div>
            <div className="text-xs text-[#9CA3AF] mt-0.5">(at/above target)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
