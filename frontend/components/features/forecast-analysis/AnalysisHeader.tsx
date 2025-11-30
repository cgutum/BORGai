'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Clock, Lock } from 'lucide-react';

export function AnalysisHeader() {
  return (
    <Card className="p-6 border-[#D3D0CC]">
      <div className="flex items-start justify-between">
        {/* Left: SKU Information */}
        <div>
          <h1 className="text-2xl font-semibold text-[#0065BD] mb-2">
            Turbocharger, 3.0L Diesel
          </h1>
          <p className="text-sm text-[#6E685F]">
            SKU ID: <span className="font-mono">CORE-TURBO-001</span>
          </p>
        </div>

        {/* Right: Status and Actions */}
        <div className="flex flex-col items-end gap-3">
          {/* Status Badges */}
          <div className="flex items-center gap-2">
            <Badge className="bg-[#E37222]/15 text-[#E37222] hover:bg-[#E37222]/20">
              Need Review
            </Badge>
            <Badge className="bg-[#A2AD00]/15 text-[#A2AD00] hover:bg-[#A2AD00]/20">
              Open
            </Badge>
          </div>

          {/* Metadata */}
          <div className="text-xs text-[#6E685F] text-right space-y-1">
            <div className="flex items-center gap-2 justify-end">
              <AlertCircle className="h-3 w-3" />
              <span>3 alerts</span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <Clock className="h-3 w-3" />
              <span>Generated 2 hours ago</span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <Lock className="h-3 w-3" />
              <span>Locked until Dec 5, 2025</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mt-2">
            <Button
              className="bg-[#0065BD] text-white hover:bg-[#005293]"
            >
              Accept AI Forecast
            </Button>
            <Button
              variant="outline"
              className="border-[#D3D0CC] text-[#6E685F] hover:bg-[#F5F5F5]"
            >
              Overwrite
            </Button>
          </div>
        </div>
      </div>

      {/* Last Action */}
      <div className="mt-4 pt-4 border-t border-[#D3D0CC] text-xs text-[#6E685F]">
        Last Action: <span className="text-[#000000]">Accepted by [User Name] on Nov 28, 2025 at 14:32</span>
      </div>
    </Card>
  );
}
