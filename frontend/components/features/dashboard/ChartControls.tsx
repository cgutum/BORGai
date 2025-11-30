import { Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TimeRangeType } from '@/lib/hooks/useChartData';
import { useState } from 'react';
import { toast } from 'sonner';

interface ChartControlsProps {
  timeRange: TimeRangeType;
  onTimeRangeChange: (range: TimeRangeType) => void;
}

export function ChartControls({ timeRange, onTimeRangeChange }: ChartControlsProps) {
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  
  const timeRangeOptions: { value: TimeRangeType; label: string }[] = [
    { value: '1month', label: '1 Month' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' }
  ];
  
  const handleDownload = (format: string) => {
    setShowDownloadMenu(false);
    toast.info('Feature coming soon', {
      description: `Download as ${format} will be available in the next release.`
    });
  };
  
  const handleSyncERP = () => {
    toast.info('ERP sync feature coming soon', {
      description: 'ERP integration will be available in the next release.'
    });
  };
  
  return (
    <div className="flex items-center justify-between mb-4">
      {/* Time Range Buttons */}
      <div className="flex items-center gap-2">
        {timeRangeOptions.map(option => (
          <Button
            key={option.value}
            onClick={() => onTimeRangeChange(option.value)}
            variant={timeRange === option.value ? 'default' : 'outline'}
            className={`
              h-9 px-4 text-sm font-medium transition-all
              ${timeRange === option.value 
                ? 'bg-[#0065BD] text-white border-[#0065BD] hover:bg-[#004A8D]' 
                : 'bg-white text-[#6E685F] border-[#D3D0CC] hover:bg-[#F5F5F5]'
              }
            `}
          >
            {option.label}
          </Button>
        ))}
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        {/* Download Button with Dropdown */}
        <div className="relative">
          <Button
            variant="outline"
            className="h-9 px-4 text-sm font-medium bg-white text-[#6E685F] border-[#D3D0CC] hover:bg-[#F5F5F5]"
            onClick={() => setShowDownloadMenu(!showDownloadMenu)}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          
          {showDownloadMenu && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowDownloadMenu(false)}
              />
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#D3D0CC] rounded-lg shadow-lg z-20 py-1">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-[#000000] hover:bg-[#F5F5F5] transition-colors"
                  onClick={() => handleDownload('PNG')}
                >
                  Download as PNG
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-[#000000] hover:bg-[#F5F5F5] transition-colors"
                  onClick={() => handleDownload('CSV')}
                >
                  Download as CSV
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-[#000000] hover:bg-[#F5F5F5] transition-colors"
                  onClick={() => handleDownload('PDF')}
                >
                  Download as PDF
                </button>
              </div>
            </>
          )}
        </div>
        
        {/* Sync to ERP Button */}
        <Button
          className="h-9 px-4 text-sm font-semibold bg-[#000000] text-white hover:bg-[#333333] border-0"
          onClick={handleSyncERP}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Sync to ERP
        </Button>
      </div>
    </div>
  );
}
