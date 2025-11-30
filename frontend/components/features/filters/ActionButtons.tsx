'use client';

import React from 'react';
import { useFilters } from '@/lib/contexts/FilterContext';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  isPending: boolean;
}

export default function ActionButtons({ isPending }: ActionButtonsProps) {
  const { applyFilters, clearAllFilters } = useFilters();
  
  return (
    <div className="flex gap-2 pt-2 border-t border-gray-200">
      <Button
        onClick={applyFilters}
        disabled={!isPending}
        className={`
          flex-1 bg-[#0065BD] hover:bg-[#0065BD]/90 text-white
          disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
          transition-all duration-200
          ${isPending ? 'ring-2 ring-[#0065BD]/30 ring-offset-2' : ''}
        `}
        aria-label="Apply selected filters"
      >
        Apply Filters
      </Button>
      <Button
        onClick={clearAllFilters}
        variant="outline"
        className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
        aria-label="Clear all filters"
      >
        Clear All
      </Button>
    </div>
  );
}
