'use client';

import { Info, ArrowUp, ArrowDown } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { KPIMetric } from '@/lib/data/kpi-metrics';

interface KPICardProps {
  metric: KPIMetric;
}

export function KPICard({ metric }: KPICardProps) {
  // Transform chart data for Recharts
  const chartData = metric.chartData.map((value, index) => ({
    value,
    index
  }));

  // Determine trend color - matches chart colors
  const getTrendColor = () => {
    if (metric.trend === 'up' && metric.isPositive) return 'text-[#22C55E]'; // Green matching chart
    if (metric.trend === 'down' && metric.isPositive) return 'text-[#22C55E]'; // Green for positive down (like lead time)
    if (metric.trend === 'up' && !metric.isPositive) return 'text-[#EF4444]'; // Red matching chart
    if (metric.trend === 'down' && !metric.isPositive) return 'text-[#EF4444]'; // Red matching chart
    return 'text-[#6E685F]';
  };

  const TrendIcon = metric.trend === 'up' ? ArrowUp : ArrowDown;

  return (
    <TooltipProvider>
      <Card className="bg-white rounded-lg border border-[#E5E5E5] shadow-sm hover:shadow-md transition-shadow py-3 px-4 flex flex-col h-full">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-sm font-semibold text-[#000000] uppercase leading-tight flex-1">
            {metric.label}
          </h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="text-[#6E685F] hover:text-[#000000] transition-colors ml-1 flex-shrink-0"
                aria-label={`Info about ${metric.label}`}
              >
                <Info className="w-3 h-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-[250px]">
              <p>{metric.info}</p>
            </TooltipContent>
          </Tooltip>
        </div>

      {/* Metric Display */}
      <div className="mb-2">
        <div className="text-3xl font-bold text-[#000000] mb-1 text-center">
          {metric.value}
        </div>
        <div className={`flex items-center text-xs font-medium ${getTrendColor()}`}>
          <TrendIcon className="w-3 h-3 mr-0.5" />
          <span>{metric.changeLabel}</span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[60px] mb-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={metric.isPositive ? '#22C55E' : '#EF4444'} stopOpacity={0.3} />
                <stop offset="95%" stopColor={metric.isPositive ? '#22C55E' : '#EF4444'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={metric.isPositive ? '#22C55E' : '#EF4444'}
              strokeWidth={2}
              fill={`url(#gradient-${metric.id})`}
              isAnimationActive={true}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

        {/* Time Period */}
        <div className="text-xs text-[#6E685F] mt-auto">
          {metric.timePeriod}
        </div>
      </Card>
    </TooltipProvider>
  );
}
