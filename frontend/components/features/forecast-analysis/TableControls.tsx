'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Filter } from 'lucide-react';

export function TableControls() {
  return (
    <Card className="p-4 border-[#D3D0CC]">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Left: Display Mode */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#6E685F]">Display Mode:</span>
            <div className="flex rounded border border-[#D3D0CC]">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-r-none bg-[#0065BD] text-white hover:bg-[#005293]"
              >
                Signed Value
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-l-none border-l border-[#D3D0CC]"
              >
                Absolute Value
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-[#6E685F]">Color Scheme:</span>
            <select className="px-3 py-1.5 border border-[#D3D0CC] rounded text-sm focus:outline-none focus:border-[#0065BD]">
              <option>Red/Green</option>
              <option>Blue/Orange</option>
              <option>Monochrome</option>
            </select>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-[#D3D0CC] text-[#6E685F] hover:bg-[#F5F5F5] gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button
            className="bg-[#0065BD] text-white hover:bg-[#005293]"
            size="sm"
          >
            Update
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-[#D3D0CC] text-[#6E685F] hover:bg-[#F5F5F5]"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
