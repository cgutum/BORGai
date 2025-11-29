'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KPIMetric } from '@/lib/types';
import { formatNumber, formatCurrency, formatPercent } from '@/lib/utils';

interface KPICardProps {
  metric: KPIMetric;
}

export function KPICard({ metric }: KPICardProps) {
  const TrendIcon = 
    metric.trend === 'up' ? TrendingUp : 
    metric.trend === 'down' ? TrendingDown : 
    Minus;

  const trendColor = 
    metric.trend === 'up' ? 'text-green-600' : 
    metric.trend === 'down' ? 'text-orange-600' : 
    'text-gray-600';

  const formatValue = (value: number | string, unit: string) => {
    if (typeof value === 'string') return value;
    if (unit === '€') return formatCurrency(value);
    if (unit === '%') return `${value}%`;
    return formatNumber(value);
  };

  const statusColors = {
    good: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-orange-50 text-orange-700 border-orange-200',
    critical: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {metric.label}
        </CardTitle>
        {metric.status && (
          <Badge 
            variant="outline" 
            className={statusColors[metric.status]}
          >
            {metric.status}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-3xl font-bold text-primary">
              {formatValue(metric.value, metric.unit)}
            </div>
            {metric.unit && typeof metric.value === 'number' && (
              <p className="text-xs text-muted-foreground mt-1">
                {metric.unit}
              </p>
            )}
          </div>
          {metric.change_percent !== undefined && (
            <div className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}>
              <TrendIcon className="h-4 w-4" />
              <span>{formatPercent(metric.change_percent)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
