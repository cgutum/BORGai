export function ChartLegend() {
  const legendItems = [
    {
      id: 'today',
      visual: (
        <svg width="20" height="20" viewBox="0 0 20 20">
          <line 
            x1="10" y1="2" x2="10" y2="18" 
            stroke="#000000" 
            strokeWidth="2" 
            strokeDasharray="8,4"
          />
        </svg>
      ),
      label: 'Today'
    },
    {
      id: 'historical',
      visual: (
        <div className="w-5 h-3 bg-[#0065BD] rounded-sm" />
      ),
      label: 'Historical Supply'
    },
    {
      id: 'confirmed',
      visual: (
        <div className="w-5 h-3 bg-[#0065BD] opacity-70 rounded-sm" />
      ),
      label: 'Confirmed Supply'
    },
    {
      id: 'ai-forecast',
      visual: (
        <svg width="20" height="12" viewBox="0 0 20 12">
          <line 
            x1="0" y1="6" x2="20" y2="6" 
            stroke="#000000" 
            strokeWidth="3"
          />
        </svg>
      ),
      label: 'AI Forecast'
    },
    {
      id: 'confidence',
      visual: (
        <div className="w-5 h-3 bg-[#000000] opacity-10 rounded-sm" />
      ),
      label: 'AI 95% Confidence Band'
    },
    {
      id: 'previous',
      visual: (
        <svg width="20" height="12" viewBox="0 0 20 12">
          <line 
            x1="0" y1="6" x2="20" y2="6" 
            stroke="#6E685F" 
            strokeWidth="2" 
            strokeDasharray="6,4"
            opacity="0.8"
          />
        </svg>
      ),
      label: 'Previous AI Forecast'
    }
  ];
  
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-4 px-4">
      {legendItems.map(item => (
        <div key={item.id} className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            {item.visual}
          </div>
          <span className="text-xs font-medium text-[#6E685F]">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
