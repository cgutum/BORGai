'use client';

import { Info } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { AlertSummaryData } from '@/lib/data/kpi-metrics';

interface AlertSummaryChartProps {
  data: AlertSummaryData;
}

export function AlertSummaryChart({ data }: AlertSummaryChartProps) {
  // Transform chart data for Recharts
  const chartData = data.chartData.map((value, index) => ({
    value,
    index
  }));

  return (
    <TooltipProvider>
      <Card className="bg-white rounded-lg border border-[#E5E5E5] shadow-sm hover:shadow-md transition-shadow py-2.5 px-3.5 flex flex-col h-full">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-0.5">
          <h3 className="text-xs font-semibold text-[#000000] uppercase leading-tight flex-1">
            ALERT SUMMARY
          </h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="text-[#6E685F] hover:text-[#000000] transition-colors ml-1 flex-shrink-0"
                aria-label="Info about Alert Summary"
              >
                <Info className="w-3 h-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-[250px]">
              <p>Summary of active forecast and supply chain alerts that require attention. Alerts help identify potential issues before they impact operations.</p>
            </TooltipContent>
          </Tooltip>
        </div>

      {/* Total Alerts Display */}
      <div className="mb-0.5">
        <div className="text-2xl font-bold text-[#000000] mb-0.5 text-left leading-tight">
          {data.total}
        </div>
        <div className="text-xs text-[#6E685F] font-medium">
          Total Alerts
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[60px] max-h-[60px] mb-0.5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradient-alerts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0065BD" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0065BD" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0065BD"
              strokeWidth={2}
              fill="url(#gradient-alerts)"
              isAnimationActive={true}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Alert Breakdown */}
      <div className="space-y-0.5 mt-auto">
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-[#6E685F]">Forecast Alerts</span>
          <span className="text-[#000000] font-semibold">{data.forecastAlerts}</span>
        </div>
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-[#6E685F]">Supply Chain Alerts</span>
          <span className="text-[#000000] font-semibold">{data.supplyChainAlerts}</span>
        </div>
      </div>

        {/* Time Period */}
        <div className="text-[11px] text-[#6E685F] mt-1 pt-1 border-t border-[#E5E5E5]">
          {data.timePeriod}
        </div>
      </Card>
    </TooltipProvider>
  );
}
