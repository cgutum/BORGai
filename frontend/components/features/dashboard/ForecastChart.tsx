'use client';

import { useState } from 'react';
import { 
  ComposedChart, 
  Bar, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Legend as RechartsLegend
} from 'recharts';
import { useChartData, TimeRangeType } from '@/lib/hooks/useChartData';
import { ChartControls } from './ChartControls';
import { ChartLegend } from './ChartLegend';
import { ChartTooltip } from './ChartTooltip';
import { Card } from '@/components/ui/card';

export function ForecastChart() {
  const [timeRange, setTimeRange] = useState<TimeRangeType>('3months');
  const chartData = useChartData({ timeRange });
  
  // Find today's index for the reference line
  const todayIndex = chartData.findIndex(d => d.isToday);
  
  // Get the date value for today's reference line
  const todayDate = todayIndex >= 0 ? chartData[todayIndex].date : null;
  
  // Determine max value for Y-axis
  const maxValue = Math.max(
    ...chartData.map(d => 
      Math.max(
        d.actualSupply || 0,
        d.confirmedSupply || 0,
        d.aiForecast,
        d.confidenceUpper || 0
      )
    )
  );
  const yAxisMax = Math.ceil(maxValue * 1.1 / 25) * 25; // Round up to nearest 25 with 10% padding
  
  // Custom dot renderer to handle solid/dashed transition
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (!payload) return null;
    
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={3} 
        fill="#0065BD" 
        stroke="none"
      />
    );
  };
  
  return (
    <Card className="p-4 bg-gray-50 rounded-lg border-0 shadow-none">
      {/* Header */}
      <h2 className="text-base font-semibold text-[#000000] mb-2">
        Forecast Chart
      </h2>
      
      {/* Controls */}
      <ChartControls 
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
      />
      
      {/* Chart - wrapped in white box */}
      <div className="bg-white rounded-lg p-3 mb-2">
      <div className="w-full" style={{ height: '450px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
          >
            {/* Axes */}
            <XAxis 
              dataKey="date"
              tick={{ fontSize: 11, fill: '#6E685F' }}
              tickLine={false}
              axisLine={{ stroke: '#E5E5E5' }}
              tickFormatter={(value) => {
                const point = chartData.find(d => d.date === value);
                return point?.week_label || value;
              }}
            />
            <YAxis 
              label={{ 
                value: 'Quantity', 
                angle: -90, 
                position: 'insideLeft',
                style: { fontSize: 12, fill: '#6E685F', fontWeight: 600 }
              }}
              tick={{ fontSize: 11, fill: '#6E685F' }}
              tickLine={false}
              axisLine={{ stroke: '#E5E5E5' }}
              domain={[0, yAxisMax]}
              ticks={Array.from({ length: Math.floor(yAxisMax / 25) + 1 }, (_, i) => i * 25)}
            />
            
            
            {/* Confidence Band (rendered first, behind grid) */}
            <Area
              type="monotone"
              dataKey="confidenceUpper"
              fill="rgba(0, 0, 0, 0.1)"
              stroke="none"
              fillOpacity={1}
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="confidenceLower"
              fill="#FFFFFF"
              stroke="none"
              fillOpacity={1}
              isAnimationActive={false}
            />
            
            {/* Grid - placed after areas to be on top */}
            <CartesianGrid 
              stroke="#D3D0CC" 
              strokeDasharray="3 3" 
              vertical={true}
              horizontal={true}
            />
            
            {/* Bars */}
            <Bar 
              dataKey="actualSupply" 
              fill="#0065BD" 
              radius={[2, 2, 0, 0]}
              isAnimationActive={false}
            />
            <Bar 
              dataKey="confirmedSupply" 
              fill="#0065BD" 
              fillOpacity={0.7}
              radius={[2, 2, 0, 0]}
              isAnimationActive={false}
            />
            
            {/* Previous AI Forecast Line (grey dashed, future only) */}
            <Line
              type="monotone"
              dataKey="previousAiForecast"
              stroke="#6E685F"
              strokeWidth={2}
              strokeDasharray="6 4"
              strokeOpacity={0.8}
              dot={{ fill: '#6E685F', r: 3 }}
              isAnimationActive={false}
              connectNulls={false}
            />
            
            {/* AI Forecast Line - Historical (solid black with dots) */}
            <Line
              type="monotone"
              dataKey={(dataPoint) => dataPoint.isHistorical || dataPoint.isToday ? dataPoint.aiForecast : null}
              stroke="#000000"
              strokeWidth={3}
              dot={{ fill: '#000000', r: 3 }}
              isAnimationActive={false}
              connectNulls={false}
            />
            
            {/* AI Forecast Line - Future (dashed black with dots, includes Today to connect) */}
            <Line
              type="monotone"
              dataKey={(dataPoint) => dataPoint.isFuture || dataPoint.isToday ? dataPoint.aiForecast : null}
              stroke="#000000"
              strokeWidth={3}
              strokeDasharray="10 6"
              dot={{ fill: '#000000', r: 3 }}
              isAnimationActive={false}
              connectNulls={false}
            />
            
            {/* Today Line - always show when today index exists */}
            {todayIndex >= 0 && (
              <ReferenceLine
                x={chartData[todayIndex].date}
                stroke="#000000"
                strokeWidth={2}
                strokeDasharray="8 4"
                label={{
                  value: 'Today',
                  position: 'top',
                  style: { 
                    fontSize: 12, 
                    fontWeight: 600, 
                    fill: '#6E685F'
                  }
                }}
              />
            )}
            
            {/* Tooltip */}
            <Tooltip 
              content={<ChartTooltip />}
              cursor={{ fill: 'rgba(0, 101, 189, 0.1)' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      </div>
      
      {/* Year Label */}
      <div className="text-center mb-1">
        <span className="text-xs font-semibold text-[#6E685F]">
          {timeRange === '1month' || timeRange === '3months' ? '2025' : '2025 - 2026'}
        </span>
      </div>
      
      {/* Legend */}
      <ChartLegend />
    </Card>
  );
}
