'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronRight } from 'lucide-react';

// Sample feature contribution data
const sampleData = {
  dates: ['03/01', '03/08', '03/15', '03/22', '03/29', '04/05', '04/12'],
  currentForecast: [586, 573, 615, 623, 557, 612, 645],
  features: {
    externalData: [
      { name: 'Macroeconomic Trends', values: [-64, -30, -76, 9, -34, -12, -45] },
      { name: 'Customer Trends', values: [-80, 3, -87, -21, -79, 15, -34] },
      { name: 'Google Trends', values: [17, -89, -47, -67, -82, 23, 56] },
      { name: 'Market Insights', values: [48, -67, 5, 64, -8, -23, 12] },
      { name: 'Point of Sale', values: [-2, -66, -132, -80, -69, -45, -89] },
      { name: 'Seasonality', values: [50, 179, 164, 4, 73, 98, 134] },
      { name: 'Weather', values: [67, 127, 13, -71, -46, 34, -12] },
    ],
    salesOrders: [
      { name: 'Open Sales Orders', values: [-60, 183, 27, -20, -15, 45, 78] },
      { name: 'Historical Sales Orders', values: [43, -64, -29, 36, -72, -23, 12] },
    ],
    events: [
      { name: 'Holidays', values: [2, 197, 158, 0, 0, 23, 45] },
      { name: 'Marketing Campaigns', values: [-53, -67, -83, 37, 28, -12, 34] },
    ],
  },
};

interface FeatureTableProps {
  viewMode?: 'detailed' | 'aggregate';
  valueMode?: 'absolute' | 'relative';
}

export function FeatureTable({ viewMode = 'detailed', valueMode = 'absolute' }: FeatureTableProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(['externalData', 'salesOrders', 'events'])
  );

  // Update expanded groups when viewMode changes
  useEffect(() => {
    if (viewMode === 'detailed') {
      setExpandedGroups(new Set(['externalData', 'salesOrders', 'events']));
    } else {
      setExpandedGroups(new Set());
    }
  }, [viewMode]);

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(group)) {
        newSet.delete(group);
      } else {
        newSet.add(group);
      }
      return newSet;
    });
  };

  const getCellColor = (value: number) => {
    if (value > 0) {
      return 'bg-[#A2AD00]/15 text-[#A2AD00]';
    } else if (value < 0) {
      return 'bg-[#E37222]/15 text-[#E37222]';
    }
    return 'bg-gray-50 text-[#6E685F]';
  };

  // Format cell value based on valueMode
  const formatCellValue = (value: number, forecastValue: number) => {
    if (valueMode === 'relative') {
      // Calculate percentage contribution to forecast
      const percentage = (value / forecastValue) * 100;
      return `${percentage > 0 ? '+' : ''}${percentage.toFixed(1)}%`;
    }
    // Absolute mode
    return `${value > 0 ? '+' : ''}${value === 0 ? '—' : value}`;
  };

  return (
    <Card className="p-6 border-[#D3D0CC] overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-[#D3D0CC]">
            <th className="text-left p-3 text-sm font-semibold text-[#6E685F] min-w-[200px]">
              Feature
            </th>
            {sampleData.dates.map((date) => (
              <th key={date} className="text-center p-3 text-sm font-semibold text-[#6E685F] min-w-[80px]">
                {date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Current Forecast Row */}
          <tr className="bg-[#0065BD]/10">
            <td className="p-3 text-sm font-semibold text-[#0065BD]">AI Forecast</td>
            {sampleData.currentForecast.map((value, idx) => (
              <td key={idx} className="text-center p-3 text-sm font-semibold text-[#0065BD]">
                {valueMode === 'relative' ? '100%' : value}
              </td>
            ))}
          </tr>

          {/* External Data Group */}
          <tr className="border-t border-[#D3D0CC]">
            <td colSpan={sampleData.dates.length + 1} className="p-0">
              <button
                className="w-full text-left p-3 text-sm font-semibold text-[#000000] hover:bg-[#F5F5F5] flex items-center gap-2"
                onClick={() => toggleGroup('externalData')}
              >
                {expandedGroups.has('externalData') ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                EXTERNAL DATA
              </button>
            </td>
          </tr>
          {expandedGroups.has('externalData') &&
            sampleData.features.externalData.map((feature) => (
              <tr key={feature.name} className="border-t border-[#D3D0CC]/30">
                <td className="p-3 pl-8 text-sm text-[#6E685F]">{feature.name}</td>
                {feature.values.map((value, idx) => (
                  <td
                    key={idx}
                    className={`text-center p-3 text-sm font-medium ${getCellColor(value)}`}
                  >
                    {formatCellValue(value, sampleData.currentForecast[idx])}
                  </td>
                ))}
              </tr>
            ))}

          {/* Sales Orders Group */}
          <tr className="border-t border-[#D3D0CC]">
            <td colSpan={sampleData.dates.length + 1} className="p-0">
              <button
                className="w-full text-left p-3 text-sm font-semibold text-[#000000] hover:bg-[#F5F5F5] flex items-center gap-2"
                onClick={() => toggleGroup('salesOrders')}
              >
                {expandedGroups.has('salesOrders') ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                SALES ORDERS
              </button>
            </td>
          </tr>
          {expandedGroups.has('salesOrders') &&
            sampleData.features.salesOrders.map((feature) => (
              <tr key={feature.name} className="border-t border-[#D3D0CC]/30">
                <td className="p-3 pl-8 text-sm text-[#6E685F]">{feature.name}</td>
                {feature.values.map((value, idx) => (
                  <td
                    key={idx}
                    className={`text-center p-3 text-sm font-medium ${getCellColor(value)}`}
                  >
                    {formatCellValue(value, sampleData.currentForecast[idx])}
                  </td>
                ))}
              </tr>
            ))}

          {/* Events Group */}
          <tr className="border-t border-[#D3D0CC]">
            <td colSpan={sampleData.dates.length + 1} className="p-0">
              <button
                className="w-full text-left p-3 text-sm font-semibold text-[#000000] hover:bg-[#F5F5F5] flex items-center gap-2"
                onClick={() => toggleGroup('events')}
              >
                {expandedGroups.has('events') ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                EVENTS
              </button>
            </td>
          </tr>
          {expandedGroups.has('events') &&
            sampleData.features.events.map((feature) => (
              <tr key={feature.name} className="border-t border-[#D3D0CC]/30">
                <td className="p-3 pl-8 text-sm text-[#6E685F]">{feature.name}</td>
                {feature.values.map((value, idx) => (
                  <td
                    key={idx}
                    className={`text-center p-3 text-sm font-medium ${getCellColor(value)}`}
                  >
                    {formatCellValue(value, sampleData.currentForecast[idx])}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-[#D3D0CC] flex items-center gap-6 text-xs text-[#6E685F]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#A2AD00]/15 border border-[#A2AD00]" />
          <span>Positive contributor (increases forecast)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#E37222]/15 border border-[#E37222]" />
          <span>Negative contributor (decreases forecast)</span>
        </div>
      </div>
    </Card>
  );
}
