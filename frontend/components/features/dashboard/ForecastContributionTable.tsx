'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  forecastContributionData,
  weekDates,
  aiForecast,
  calculateAbsoluteValues,
  calculateRelativePercentage,
  getImpactColorClass,
  formatValue,
  type TopCategory,
  type SubCategory,
  type FeatureImpact,
} from '@/lib/data/forecast-contribution-data';

type ViewMode = 'impact' | 'absolute' | 'relative';

interface ForecastContributionTableProps {
  viewMode: ViewMode;
  isAggregateView: boolean;
}

export default function ForecastContributionTable({
  viewMode,
  isAggregateView,
}: ForecastContributionTableProps) {
  // Initialize with everything expanded for detailed view
  const [expandedTopCategories, setExpandedTopCategories] = useState<Set<string>>(() => {
    if (!isAggregateView) {
      return new Set(forecastContributionData.map(cat => cat.name));
    }
    return new Set();
  });
  
  const [expandedSubCategories, setExpandedSubCategories] = useState<Set<string>>(() => {
    if (!isAggregateView) {
      const allSubCats: string[] = [];
      forecastContributionData.forEach(topCat => {
        topCat.subCategories.forEach(subCat => {
          allSubCats.push(subCat.name);
        });
      });
      return new Set(allSubCats);
    }
    return new Set();
  });

  // Update expansion state when aggregate view changes
  React.useEffect(() => {
    if (isAggregateView) {
      // In aggregate view: expand top categories to show sub-categories, but collapse sub-categories
      setExpandedTopCategories(new Set(forecastContributionData.map(cat => cat.name)));
      setExpandedSubCategories(new Set());
    } else {
      // Expand everything in detailed view
      setExpandedTopCategories(new Set(forecastContributionData.map(cat => cat.name)));
      const allSubCats: string[] = [];
      forecastContributionData.forEach(topCat => {
        topCat.subCategories.forEach(subCat => {
          allSubCats.push(subCat.name);
        });
      });
      setExpandedSubCategories(new Set(allSubCats));
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
      const topCat = forecastContributionData.find((cat) => cat.name === name);
      if (topCat) {
        setExpandedSubCategories((prev) => {
          const next = new Set(prev);
          topCat.subCategories.forEach((sub) => {
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

  // Collect all impact factors for absolute value calculation
  const allImpactFactors: number[][] = [];
  forecastContributionData.forEach((topCat) => {
    topCat.subCategories.forEach((subCat) => {
      subCat.features.forEach((feature) => {
        allImpactFactors.push(feature.impactFactors);
      });
    });
  });

  // Calculate display value based on view mode
  const getDisplayValue = (impactFactor: number, weekIndex: number): number => {
    if (viewMode === 'impact') {
      return impactFactor;
    } else if (viewMode === 'absolute') {
      return calculateAbsoluteValues(impactFactor, weekIndex, allImpactFactors);
    } else {
      // relative
      const absoluteValue = calculateAbsoluteValues(impactFactor, weekIndex, allImpactFactors);
      return calculateRelativePercentage(absoluteValue, weekIndex);
    }
  };

  // Render AI Forecast row
  const renderAIForecastRow = () => (
    <tr className="border-b border-[#E5E7EB] bg-[#E3F2FD] border-t-2 border-t-[#0065BD]">
      <td className="py-2 px-4 text-sm font-semibold text-[#0065BD]">AI Forecast</td>
      {aiForecast.map((value, idx) => (
        <td key={idx} className="py-2 px-4 text-center text-sm font-semibold text-[#0065BD]">
          {viewMode === 'relative' ? '100%' : value}
        </td>
      ))}
    </tr>
  );

  // Render feature row
  const renderFeatureRow = (feature: FeatureImpact, level: number) => (
    <tr key={feature.name} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
      <td className="py-2 px-4 text-sm text-[#374151]" style={{ paddingLeft: `${level * 1.5}rem` }}>
        {feature.name}
      </td>
      {feature.impactFactors.map((impactFactor, weekIdx) => {
        const displayValue = getDisplayValue(impactFactor, weekIdx);
        const colorClass = getImpactColorClass(impactFactor);
        const formattedValue = formatValue(displayValue, viewMode);
        
        return (
          <td key={weekIdx} className={`py-2 px-4 text-center text-sm font-medium ${colorClass}`}>
            {formattedValue}
          </td>
        );
      })}
    </tr>
  );

  // Render sub-category row (only if parent top category is expanded)
  const renderSubCategoryRow = (subCat: SubCategory, topCatName: string, level: number) => {
    const isExpanded = expandedSubCategories.has(subCat.name);
    
    // In aggregate view or when collapsed, show weighted means
    const showWeightedMean = isAggregateView || !isExpanded;
    
    return (
      <React.Fragment key={subCat.name}>
        <tr
          className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors cursor-pointer"
          onClick={() => !isAggregateView && toggleSubCategory(subCat.name)}
        >
          <td className="py-2 px-4 text-sm font-medium text-[#374151]" style={{ paddingLeft: `${level * 1.5}rem` }}>
            <div className="flex items-center gap-2">
              {!isAggregateView && (
                isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
              )}
              {subCat.name}
            </div>
          </td>
          {showWeightedMean && subCat.weightedMean?.map((weightedValue, weekIdx) => {
            let colorClass = '';
            let formattedValue = '';
            
            if (viewMode === 'relative') {
              // Calculate percentage for sub-category in relative mode
              // Sum all absolute values for features in this sub-category
              let totalAbsolute = 0;
              subCat.features.forEach((feature) => {
                const impactFactor = feature.impactFactors[weekIdx];
                const absoluteValue = calculateAbsoluteValues(impactFactor, weekIdx, allImpactFactors);
                totalAbsolute += absoluteValue;
              });
              
              // Calculate percentage based on absolute value (adds up to 100%)
              const percentage = (Math.abs(totalAbsolute) / aiForecast[weekIdx]) * 100 * Math.sign(totalAbsolute);
              colorClass = getImpactColorClass(weightedValue); // Use impact factor for coloring
              formattedValue = `${percentage >= 0 ? '+' : ''}${percentage.toFixed(1)}%`;
            } else {
              colorClass = getImpactColorClass(weightedValue);
              formattedValue = formatValue(weightedValue, viewMode === 'absolute' ? 'absolute' : 'impact');
            }
            
            return (
              <td key={weekIdx} className={`py-2 px-4 text-center text-sm font-medium ${colorClass}`}>
                {formattedValue}
              </td>
            );
          })}
        </tr>
        {!isAggregateView && isExpanded &&
          subCat.features.map((feature) => renderFeatureRow(feature, level + 1))
        }
      </React.Fragment>
    );
  };

  // Render top category row
  const renderTopCategoryRow = (topCat: TopCategory, level: number) => {
    const isExpanded = expandedTopCategories.has(topCat.name);
    
    return (
      <React.Fragment key={topCat.name}>
        <tr
          className="border-b border-[#E5E7EB] bg-[#F9FAFB] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
          onClick={() => !isAggregateView && toggleTopCategory(topCat.name)}
        >
          <td className="py-2 px-4 text-sm font-semibold text-[#374151]" style={{ paddingLeft: `${level * 1.5}rem` }}>
            <div className="flex items-center gap-2">
              {!isAggregateView && (
                isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
              )}
              {topCat.name}
            </div>
          </td>
          {weekDates.map((_, weekIdx) => (
            <td key={weekIdx} className="py-3 px-4 text-center">
              {/* Empty cells for top category */}
            </td>
          ))}
        </tr>
        {isExpanded && topCat.subCategories.map((subCat) => 
          renderSubCategoryRow(subCat, topCat.name, level + 1)
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="border-b-2 border-[#E5E7EB] bg-[#F9FAFB]">
            <th className="py-2 px-4 text-left text-sm font-semibold text-[#1F2937]">
              Feature
            </th>
            {weekDates.map((date, idx) => (
              <th key={idx} className="py-2 px-4 text-center text-sm font-semibold text-[#1F2937] min-w-[100px]">
                {date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderAIForecastRow()}
          {forecastContributionData.map((topCat) => renderTopCategoryRow(topCat, 0))}
        </tbody>
      </table>
      
      {/* Grey separator line */}
      <div className="mt-6 border-t border-[#D3D0CC]"></div>
      
      {/* Legend with gradient bar */}
      <div className="mt-4 px-4 py-3">
        <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto">
          {/* Left label */}
          <div className="text-right">
            <div className="text-sm font-medium text-[#E37222]">Negative contributor</div>
            <div className="text-xs text-[#9CA3AF] mt-0.5">(decreases forecast)</div>
          </div>
          
          {/* Gradient bar with scale markers */}
          <div className="flex-1 max-w-md">
            <div className="h-8 rounded overflow-hidden border border-[#D3D0CC]" style={{
              background: 'linear-gradient(to right, rgba(227, 114, 34, 0.25) 0%, rgba(227, 114, 34, 0.18) 25%, #F5F5F5 45%, #F5F5F5 55%, rgba(162, 173, 0, 0.18) 75%, rgba(162, 173, 0, 0.25) 100%)'
            }}></div>
            {/* Scale labels */}
            <div className="flex justify-between mt-1 text-xs text-[#9CA3AF]">
              <span>-50</span>
              <span>-30</span>
              <span className="text-[#6E685F]">0</span>
              <span>+30</span>
              <span>+50</span>
            </div>
          </div>
          
          {/* Right label */}
          <div className="text-left">
            <div className="text-sm font-medium text-[#A2AD00]">Positive contributor</div>
            <div className="text-xs text-[#9CA3AF] mt-0.5">(increases forecast)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
