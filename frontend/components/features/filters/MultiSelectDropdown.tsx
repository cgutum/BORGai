'use client';

import React, { useState, useMemo } from 'react';
import { ChevronDown, Search, Star, AlertCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

interface DropdownOption {
  id: string;
  label: string;
  subtitle?: string;
  count?: number;
  isFavorite?: boolean;
  isPriority?: boolean;
}

interface MultiSelectDropdownProps {
  options: DropdownOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  placeholder: string;
  searchable?: boolean;
  disabled?: boolean;
}

export default function MultiSelectDropdown({
  options,
  selectedIds,
  onToggle,
  placeholder,
  searchable = false,
  disabled = false
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    
    const query = searchQuery.toLowerCase();
    return options.filter(option =>
      option.label.toLowerCase().includes(query) ||
      option.subtitle?.toLowerCase().includes(query) ||
      option.id.toLowerCase().includes(query)
    );
  }, [options, searchQuery]);
  
  // Display text
  const displayText = useMemo(() => {
    if (selectedIds.length === 0) return placeholder;
    if (selectedIds.length === 1) {
      const option = options.find(o => o.id === selectedIds[0]);
      return option?.label || selectedIds[0];
    }
    return `${selectedIds.length} selected`;
  }, [selectedIds, options, placeholder]);
  
  const handleToggle = (id: string) => {
    onToggle(id);
  };
  
  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-3 py-2 text-left bg-white border rounded-md
          flex items-center justify-between
          transition-colors
          ${disabled 
            ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200' 
            : 'hover:border-gray-400 border-gray-300 cursor-pointer'
          }
          ${isOpen ? 'border-[#0065BD] ring-2 ring-[#0065BD]/20' : ''}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-disabled={disabled}
      >
        <span className={`text-sm truncate ${selectedIds.length === 0 ? 'text-gray-500' : 'text-gray-900'}`}>
          {displayText}
        </span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''} ${disabled ? 'text-gray-400' : 'text-gray-600'}`} 
        />
      </button>
      
      {/* Dropdown Panel */}
      {isOpen && !disabled && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown Content */}
          <div 
            className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-[280px] flex flex-col"
            role="listbox"
            aria-multiselectable="true"
          >
            {/* Search Input */}
            {searchable && (
              <div className="p-2 border-b border-gray-200 bg-white">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 py-1 text-sm bg-white"
                    autoFocus
                  />
                </div>
              </div>
            )}
            
            {/* Options List */}
            <div className="overflow-y-auto flex-1 bg-white">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-6 text-center text-sm text-gray-500">
                  No options found
                </div>
              ) : (
                filteredOptions.map(option => (
                  <label
                    key={option.id}
                    className="flex items-start px-3 py-1.5 hover:bg-gray-50 cursor-pointer group"
                    role="option"
                    aria-selected={selectedIds.includes(option.id)}
                  >
                    <Checkbox
                      checked={selectedIds.includes(option.id)}
                      onCheckedChange={() => handleToggle(option.id)}
                      className="mt-0.5 mr-2"
                      aria-label={`Select ${option.label}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-gray-900 truncate">
                          {option.label}
                        </span>
                        {option.isFavorite && (
                          <Star className="w-3 h-3 fill-[#A2AD00] text-[#A2AD00] flex-shrink-0" aria-label="Favorite" />
                        )}
                        {option.isPriority && (
                          <AlertCircle className="w-3 h-3 text-[#E37222] flex-shrink-0" aria-label="Priority" />
                        )}
                        {option.count !== undefined && (
                          <span className="text-xs text-gray-500 flex-shrink-0">
                            ({option.count})
                          </span>
                        )}
                      </div>
                      {option.subtitle && (
                        <span className="text-xs text-gray-500 truncate block">
                          {option.subtitle}
                        </span>
                      )}
                    </div>
                  </label>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
