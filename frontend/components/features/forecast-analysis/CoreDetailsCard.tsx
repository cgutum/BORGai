'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Clock, Lock, Check, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

/**
 * CoreDetailsCard Component
 * 
 * Displays selected core information, status badges, metadata, and action buttons.
 * Same height as ForecastFiltersPanel (4x navigation bar).
 */
export default function CoreDetailsCard() {
  // TODO: Replace with API call to /api/cores/{coreId}/details
  const coreDetails = {
    coreName: 'Turbocharger X3 2025',
    sku: 'TCBMW_X3_2023_5',
    statusBadges: [
      { label: 'Need Review', color: 'rgba(227, 114, 34, 0.75)' }, // TUM Orange with 75% opacity
      { label: 'Open', color: 'rgba(162, 173, 0, 0.75)' }, // TUM Green with 75% opacity
    ],
    metadata: {
      alertCount: 3,
      generatedTime: '2 hours ago',
      lockedBy: 'M. Bie',
      lockedUntil: 'Dec 5',
    },
    lastAction: {
      user: 'M. Bie',
      date: 'Nov 28, 2025',
      time: '14:32',
    },
  };

  const handleAcceptForecast = () => {
    toast.info('Feature coming soon');
  };

  const handleOverwrite = () => {
    toast.info('Feature coming soon');
  };

  return (
    <Card className="h-full border-[#D3D0CC] py-3">
      <CardContent className="flex flex-col justify-between h-full px-4 py-0">
        {/* Top Section: Core Info + Status Badges + Metadata */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#000000]">
              {coreDetails.coreName}
            </h2>
            <p className="text-sm text-[#6E685F] mt-1">
              SKU: {coreDetails.sku}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
              {coreDetails.statusBadges.map((badge, index) => (
                <Badge
                  key={index}
                  className="text-white font-medium text-xs px-3 rounded-full"
                  style={{ backgroundColor: badge.color }}
                >
                  {badge.label}
                </Badge>
              ))}
            </div>
            
            {/* Metadata Icons - Right Aligned */}
            <div className="space-y-1 text-xs text-[#6E685F]">
              <div className="flex items-center gap-1.5 justify-end">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{coreDetails.metadata.alertCount} Alerts connected</span>
              </div>
              <div className="flex items-center gap-1.5 justify-end">
                <Clock className="h-3.5 w-3.5" />
                <span>Generated {coreDetails.metadata.generatedTime}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-end">
                <Lock className="h-3.5 w-3.5" />
                <span>Locked by {coreDetails.metadata.lockedBy} until {coreDetails.metadata.lockedUntil}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Middle Section: Action Buttons (Vertical Stack) */}
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleAcceptForecast}
            className="w-full bg-[#000000] text-white hover:bg-[#333333] flex items-center justify-center gap-2"
          >
            <Check className="h-4 w-4" />
            Accept Forecast
          </Button>
          <Button
            onClick={handleOverwrite}
            variant="outline"
            className="w-full border-[#D3D0CC] flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Overwrite
          </Button>
        </div>
        
        {/* Footer: Last Action - Inside Card */}
        <div className="pt-3 border-t border-[#D3D0CC] text-right">
          <p className="text-xs text-[#6E685F]">
            Last Action:{' '}
            <span className="font-medium">{coreDetails.lastAction.user}</span> on{' '}
            <span className="font-medium">
              {coreDetails.lastAction.date} at {coreDetails.lastAction.time}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
