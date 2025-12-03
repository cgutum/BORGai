import { ChartDataPoint } from '@/lib/hooks/useChartData';

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null;
  }
  
  // Get the data point from payload
  const dataPoint = payload[0]?.payload as ChartDataPoint | undefined;
  
  if (!dataPoint) return null;
  
  // Format date range for tooltip header
  const formatDateRange = () => {
    if (dataPoint.week_end) {
      // Weekly: show range
      const startDate = new Date(dataPoint.date);
      const endDate = new Date(dataPoint.week_end);
      return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      // Monthly: show month and year
      const date = new Date(dataPoint.date);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };
  
  // Calculate difference between actual/confirmed and AI forecast
  const getDifference = () => {
    const supply = dataPoint.isHistorical ? dataPoint.actualSupply : dataPoint.confirmedSupply;
    if (supply === null) return null;
    
    const diff = supply - dataPoint.aiForecast;
    const percentDiff = ((diff / dataPoint.aiForecast) * 100).toFixed(1);
    const sign = diff >= 0 ? '+' : '';
    
    return {
      absolute: `${sign}${diff}`,
      percent: `${sign}${percentDiff}%`
    };
  };
  
  const difference = getDifference();
  
  return (
    <div className="bg-white border border-[#D3D0CC] rounded-lg shadow-lg p-3 max-w-[320px]">
      {/* Header: Date Range */}
      <div className="text-xs font-semibold text-[#6E685F] mb-2 border-b border-[#E5E5E5] pb-2">
        {dataPoint.week_end ? 'Week: ' : 'Month: '}
        {formatDateRange()}
      </div>
      
      {/* Supply Section */}
      <div className="space-y-1.5">
        {dataPoint.isHistorical && dataPoint.actualSupply !== null && (
          <>
            <div className="text-xs font-semibold text-[#000000]">
              Historical Supply: {dataPoint.actualSupply} units
            </div>
            
            {/* Breakdown */}
            {dataPoint.breakdown.length > 1 && (
              <div className="ml-2 space-y-0.5">
                {dataPoint.breakdown.map(item => (
                  <div key={item.id} className="text-xs text-[#6E685F]">
                    {item.display}: {item.supply} units
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        
        {dataPoint.isFuture && dataPoint.confirmedSupply !== null && (
          <>
            <div className="text-xs font-semibold text-[#000000]">
              Confirmed Supply: {dataPoint.confirmedSupply} units
            </div>
            
            {/* Breakdown */}
            {dataPoint.breakdown.length > 1 && (
              <div className="ml-2 space-y-0.5">
                {dataPoint.breakdown.map(item => (
                  <div key={item.id} className="text-xs text-[#6E685F]">
                    {item.display}: {Math.round(item.supply * ((dataPoint.confirmedSupply || 0) / dataPoint.aiForecast))} units
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        
        {dataPoint.isFuture && dataPoint.confirmedSupply === null && (
          <div className="text-xs text-[#6E685F] italic">
            No confirmed supply for this period
          </div>
        )}
      </div>
      
      {/* AI Forecast Section */}
      <div className="mt-2 pt-2 border-t border-[#E5E5E5] space-y-1">
        <div className="text-xs text-[#000000]">
          <span className="font-semibold">AI Forecast:</span> {dataPoint.aiForecast} units
        </div>
        
        {dataPoint.isFuture && dataPoint.previousAiForecast !== null && (
          <div className="text-xs text-[#6E685F]">
            Previous AI Forecast: {dataPoint.previousAiForecast} units
          </div>
        )}
        
        {difference && (
          <div className={`text-xs font-medium`} style={{ color: difference.absolute.startsWith('+') ? 'rgba(162, 173, 0, 0.85)' : 'rgba(227, 114, 34, 0.85)' }}>
            Difference: {difference.absolute} units ({difference.percent})
          </div>
        )}
        
        {dataPoint.isFuture && dataPoint.confidenceLower !== null && dataPoint.confidenceUpper !== null && (
          <div className="text-xs text-[#6E685F]">
            95% Confidence: {dataPoint.confidenceLower} - {dataPoint.confidenceUpper} units
          </div>
        )}
      </div>
    </div>
  );
}
