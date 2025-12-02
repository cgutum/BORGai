'use client';

import { Card } from '@/components/ui/card';
import { hardcodedCriticalActions } from '@/lib/data/critical-actions';
import { AlertCircle, Truck, AlertTriangle } from 'lucide-react';

export function CriticalActionsPanel() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'DELIVERY_COMING':
        return <Truck className="h-5 w-5" />;
      case 'STOCK_LOW_MULTI':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-3 flex flex-col">
      {/* Title */}
      <h3 className="text-base font-semibold text-[#000000]">Critical Actions</h3>

      {/* Alert Boxes */}
      {hardcodedCriticalActions.map((action) => (
        <Card
          key={action.id}
          className="p-4 border-[#C01530] bg-[#C01530]/5 cursor-pointer hover:bg-[#C01530]/10 transition-colors"
        >
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="flex-shrink-0 text-[#C01530]">
              {getIcon(action.type)}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="font-semibold text-[#C01530] text-sm mb-1">
                {action.title}
              </div>
              <div className="text-xs text-[#6E685F] mb-2">
                {action.description}
              </div>
              <div className="text-xs text-[#6E685F]">
                {action.affectedSKUs.length} SKU{action.affectedSKUs.length > 1 ? 's' : ''} affected
              </div>
            </div>

            {/* Emoji */}
            <div className="text-2xl">{action.icon}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
