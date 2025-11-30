'use client';

import { Card } from '@/components/ui/card';
import { hardcodedAlertSummary } from '@/lib/data/forecast-metrics';
import { AlertCircle, TrendingUp } from 'lucide-react';

export function AlertSummary() {
  const { total, forecastAlerts, modelPerformanceAlerts, last30DaysTrend } = hardcodedAlertSummary;

  return (
    <Card className="p-5 border-[#D3D0CC] bg-[#C01530]/5">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="h-5 w-5 text-[#C01530]" />
        <h3 className="text-base font-semibold text-[#000000]">Alert Summary</h3>
      </div>

      {/* Total Alerts */}
      <div className="mb-4">
        <div className="text-[28px] font-semibold text-[#C01530]">
          ALL ALERTS: {total}
        </div>
      </div>

      {/* Alert Breakdown */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-[#6E685F]">Forecast Alerts</span>
          <span className="text-base font-semibold text-[#000000]">{forecastAlerts}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-[#6E685F]">Model Performance Alerts</span>
          <span className="text-base font-semibold text-[#000000]">{modelPerformanceAlerts}</span>
        </div>
      </div>

      {/* Last 30 Days Trend */}
      <div>
        <div className="text-xs text-[#6E685F] mb-2">Last 30 Days Trend</div>
        <div className="h-12 flex items-end gap-[2px]">
          {last30DaysTrend.map((count, index) => {
            const maxCount = Math.max(...last30DaysTrend);
            const height = (count / maxCount) * 100;
            return (
              <div
                key={index}
                className="flex-1 bg-[#C01530] rounded-sm"
                style={{ height: `${height}%` }}
                title={`Day ${index + 1}: ${count} alerts`}
              />
            );
          })}
        </div>
      </div>
    </Card>
  );
}
