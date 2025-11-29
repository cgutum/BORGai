'use client';

import { KPIMetric } from '@/lib/types';
import { KPICard } from './KPICard';

interface MetricGridProps {
  metrics: KPIMetric[];
}

export function MetricGrid({ metrics }: MetricGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric, index) => (
        <KPICard key={index} metric={metric} />
      ))}
    </div>
  );
}
