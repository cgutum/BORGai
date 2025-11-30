'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { KPIMetric } from '@/lib/types';

interface KPICardProps {
  metric: KPIMetric;
}

export function KPICard({ metric }: KPICardProps) {
  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4" />;
      case 'down':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getTrendColor = () => {
    if (metric.status === 'good') {
      return metric.trend === 'up' ? 'text-[#A2AD00]' : 'text-[#E37222]';
    }
    return metric.trend === 'up' ? 'text-[#E37222]' : 'text-[#A2AD00]';
  };

  return (
    <Card className="p-5 border-[#D3D0CC] shadow-sm hover:shadow-md transition-shadow">
      {/* Card Title */}
      <h3 className="text-sm font-semibold text-[#6E685F] mb-3">
        {metric.label}
      </h3>

      {/* Main Value */}
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-[28px] font-semibold text-[#0065BD]">
          {metric.value}
        </span>
        <span className="text-sm text-[#6E685F]">{metric.unit}</span>
      </div>

      {/* Trend Indicator */}
      <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
        {getTrendIcon()}
        <span className="font-medium">
          {metric.trendValue > 0 ? '+' : ''}
          {metric.trendValue}%
        </span>
      </div>

      {/* Mini Sparkline */}
      {metric.sparklineData && metric.sparklineData.length > 0 && (
        <div className="mt-3 h-8 flex items-end gap-[2px]">
          {metric.sparklineData.slice(-20).map((value, index) => {
            const maxValue = Math.max(...metric.sparklineData);
            const height = (value / maxValue) * 100;
            return (
              <div
                key={index}
                className="flex-1 bg-[#0065BD] opacity-30 rounded-sm"
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
      )}
    </Card>
  );
}
