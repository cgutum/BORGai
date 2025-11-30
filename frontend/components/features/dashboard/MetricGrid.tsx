'use client';

import { KPICard } from './KPICard';
import { hardcodedForecastMetrics } from '@/lib/data/forecast-metrics';

export function MetricGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {hardcodedForecastMetrics.map((metric, index) => (
        <KPICard key={index} metric={metric} />
      ))}
    </div>
  );
}
