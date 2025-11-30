'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { hardcodedForecastData } from '@/lib/data/forecast-chart';
import { Download } from 'lucide-react';

export function ForecastChart() {
  const timeRanges = ['2 Week', '1 Month', '3 Month', '6 Month', 'Custom'];

  return (
    <Card className="p-5 border-[#D3D0CC]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#0065BD]">Forecast Analysis</h2>
        <div className="flex items-center gap-2">
          {/* Time Range Controls */}
          {timeRanges.map((range) => (
            <Button
              key={range}
              variant={range === '2 Week' ? 'default' : 'outline'}
              size="sm"
              className={
                range === '2 Week'
                  ? 'bg-[#0065BD] text-white hover:bg-[#005293]'
                  : 'border-[#D3D0CC] text-[#6E685F] hover:bg-[#F5F5F5]'
              }
            >
              {range}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="border-[#D3D0CC] text-[#6E685F] hover:bg-[#F5F5F5]"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={hardcodedForecastData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#D3D0CC" opacity={0.3} />
            <XAxis
              dataKey="date"
              stroke="#6E685F"
              style={{ fontSize: '11px' }}
            />
            <YAxis
              stroke="#6E685F"
              style={{ fontSize: '11px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#000000',
                border: 'none',
                borderRadius: '4px',
                color: '#FFFFFF',
              }}
              labelStyle={{ color: '#FFFFFF' }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              iconType="line"
            />
            
            {/* Confidence Band */}
            <Area
              type="monotone"
              dataKey="confidenceUpper"
              stroke="none"
              fill="#0065BD"
              fillOpacity={0.1}
              name="Confidence Band"
            />
            <Area
              type="monotone"
              dataKey="confidenceLower"
              stroke="none"
              fill="#FFFFFF"
              fillOpacity={1}
            />
            
            {/* Consensus Forecast Line */}
            <Line
              type="monotone"
              dataKey="consensusForecast"
              stroke="#C01530"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Consensus Forecast"
            />
            
            {/* AI Forecast Line */}
            <Line
              type="monotone"
              dataKey="aiForecast"
              stroke="#0065BD"
              strokeWidth={2}
              dot={{ fill: '#0065BD', r: 4 }}
              name="AI Forecast"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Description */}
      <div className="mt-4 text-xs text-[#6E685F] flex gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-[#0065BD]" />
          <span>AI Forecast (Model Prediction)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-[#C01530] border-dashed" />
          <span>Consensus/Historical</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 bg-[#0065BD] opacity-10" />
          <span>80% Confidence Band</span>
        </div>
      </div>
    </Card>
  );
}
