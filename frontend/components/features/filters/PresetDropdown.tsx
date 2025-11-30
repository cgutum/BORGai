'use client';

import React from 'react';
import { PresetType } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PresetDropdownProps {
  value: PresetType;
  onChange: (preset: PresetType) => void;
}

const presetOptions: { value: PresetType; label: string; description: string }[] = [
  {
    value: 'all',
    label: 'All Data',
    description: 'Show all cores and components'
  },
  {
    value: 'favorites',
    label: 'Favorites',
    description: '3 cores + 2 components'
  },
  {
    value: 'high-priority',
    label: 'High Priority',
    description: '4 priority cores'
  },
  {
    value: 'standard',
    label: 'Standard Categories',
    description: 'Starters, Alternators, Brake Calipers'
  }
];

export default function PresetDropdown({ value, onChange }: PresetDropdownProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-white" aria-label="Select preset view">
        <SelectValue placeholder="Select a preset..." />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {presetOptions.map(option => (
          <SelectItem key={option.value} value={option.value} className="bg-white hover:bg-gray-50">
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{option.label}</span>
              <span className="text-xs text-gray-500">{option.description}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
