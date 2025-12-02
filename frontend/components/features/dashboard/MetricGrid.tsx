'use client';

import { MetricCard } from './MetricCard';
import { hardcodedForecastMetrics } from '@/lib/data/forecast-metrics';

export function MetricGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {hardcodedForecastMetrics.map((metric, index) => (
        <MetricCard key={index} metric={metric} />
      ))}
    </div>
  );
}
