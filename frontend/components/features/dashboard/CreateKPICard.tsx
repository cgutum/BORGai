'use client';

import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export function CreateKPICard() {
  const handleClick = () => {
    toast.info('Feature coming soon', {
      description: 'Custom KPI creation will be available in a future update.'
    });
  };

  return (
    <Card 
      className="bg-white rounded-lg border-2 border-dashed border-[#D3D0CC] hover:border-[#0065BD] shadow-sm hover:shadow-md transition-all p-4 flex flex-col h-full items-center justify-center cursor-pointer group"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label="Create new KPI"
    >
      {/* Plus Icon */}
      <div className="w-16 h-16 rounded-full bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center mb-3 transition-colors">
        <Plus className="w-8 h-8 text-[#6E685F] group-hover:text-[#0065BD] transition-colors" />
      </div>

      {/* Text */}
      <h3 className="text-sm font-semibold text-[#6E685F] group-hover:text-[#0065BD] transition-colors">
        Create KPI
      </h3>
    </Card>
  );
}
