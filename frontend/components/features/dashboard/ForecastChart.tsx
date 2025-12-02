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
  
  // Calculate Today marker position - place it at the right edge of the today data point
  // This ensures forecast lines extend TO the marker, not stop before it
  let todayMarkerPosition = null;
  if (todayIndex >= 0) {
    // For Recharts with categorical scale, we position the marker slightly offset
    // to ensure lines visually connect to it
    const todayPoint = chartData[todayIndex];
    todayMarkerPosition = todayPoint.date;
  }
  const todayDate = todayMarkerPosition;
  
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
    <div className="bg-white rounded-lg border border-[#E5E5E5] shadow-sm p-4 flex flex-col h-full">
      {/* Header */}
      <h2 className="text-base font-semibold text-[#000000] mb-3">
        Forecast Chart
      </h2>
      
      {/* Controls */}
      <div className="mb-3">
        <ChartControls 
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />
      </div>
      
      {/* Chart */}
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
            
            {/* Layer 1 (Bottom): Grid - rendered FIRST (lowest z-index) */}
            <CartesianGrid 
              stroke="#D3D0CC" 
              strokeDasharray="3 3" 
              vertical={true}
              horizontal={true}
            />
            
            {/* Layer 2: Confidence Band - light gray semi-transparent area from today onwards */}
            {/* Use stacked areas to create band between upper and lower bounds */}
            <Area
              type="monotone"
              dataKey={(entry) => (entry.isFuture || entry.isToday) ? entry.confidenceLower : null}
              fill="transparent"
              stroke="none"
              isAnimationActive={false}
              connectNulls={false}
              stackId="confidence"
            />
            <Area
              type="monotone"
              dataKey={(entry) => {
                if (entry.isFuture || entry.isToday) {
                  return entry.confidenceUpper && entry.confidenceLower 
                    ? entry.confidenceUpper - entry.confidenceLower 
                    : null;
                }
                return null;
              }}
              fill="rgba(192, 192, 192, 0.30)"
              stroke="none"
              isAnimationActive={false}
              connectNulls={false}
              stackId="confidence"
            />
            
            {/* Layer 3: Confidence Bound Lines (light grey dashed, show boundaries of confidence band) */}
            {/* Upper confidence bound */}
            <Line
              type="monotone"
              dataKey={(dataPoint) => (dataPoint.isFuture || dataPoint.isToday) ? dataPoint.confidenceUpper : null}
              stroke="#999999"
              strokeWidth={1}
              strokeDasharray="4 3"
              strokeOpacity={0.7}
              dot={{ fill: '#999999', r: 1.5 }}
              isAnimationActive={false}
              connectNulls={false}
            />
            {/* Lower confidence bound */}
            <Line
              type="monotone"
              dataKey={(dataPoint) => (dataPoint.isFuture || dataPoint.isToday) ? dataPoint.confidenceLower : null}
              stroke="#999999"
              strokeWidth={1}
              strokeDasharray="4 3"
              strokeOpacity={0.7}
              dot={{ fill: '#999999', r: 1.5 }}
              isAnimationActive={false}
              connectNulls={false}
            />
            
            {/* Layer 3: AI Forecast Line - MUST CONNECT AT TODAY */}
            {/* Historical part (solid black) */}
            <Line
              type="monotone"
              dataKey={(dataPoint) => dataPoint.isHistorical || dataPoint.isToday ? dataPoint.aiForecast : null}
              stroke="#000000"
              strokeWidth={2}
              dot={{ fill: '#000000', r: 2 }}
              isAnimationActive={false}
              connectNulls={false}
            />
            {/* Future part (dashed black) - includes isToday to ensure connection */}
            <Line
              type="monotone"
              dataKey={(dataPoint) => dataPoint.isFuture || dataPoint.isToday ? dataPoint.aiForecast : null}
              stroke="#000000"
              strokeWidth={2}
              strokeDasharray="10 6"
              dot={{ fill: '#000000', r: 2 }}
              isAnimationActive={false}
              connectNulls={false}
            />
            
            {/* Layer 3: Previous AI Forecast Line (darker grey dashed, future only, starts at today) */}
            <Line
              type="monotone"
              dataKey={(dataPoint) => (dataPoint.isFuture || dataPoint.isToday) ? dataPoint.previousAiForecast : null}
              stroke="#555555"
              strokeWidth={2}
              strokeDasharray="5 5"
              strokeOpacity={0.85}
              dot={{ fill: '#555555', r: 2 }}
              isAnimationActive={false}
              connectNulls={false}
            />
            
            {/* Layer 4: Bars */}
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
            
            {/* Tooltip */}
            <Tooltip 
              content={<ChartTooltip />}
              cursor={{ fill: 'rgba(0, 101, 189, 0.1)' }}
            />
            
            {/* Layer 5 (Highest): Today Line - positioned at today's data point */}
            {todayDate && todayIndex >= 0 && (
              <ReferenceLine
                x={todayDate}
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
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      {/* Year Label */}
      <div className="text-center mt-3">
        <span className="text-xs font-semibold text-[#6E685F]">
          {timeRange === '1month' || timeRange === '3months' ? '2025' : '2025 - 2026'}
        </span>
      </div>
      
      {/* Legend */}
      <div className="mt-3">
        <ChartLegend />
      </div>
    </div>
  );
}
