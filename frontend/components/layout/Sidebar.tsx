'use client';

import { useState } from 'react';
import { hardcodedProductHierarchy } from '@/lib/data/product-hierarchy';
import { ProductHierarchy } from '@/lib/types';
import { ChevronDown, ChevronRight } from 'lucide-react';

export function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['l1-automotive']));
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderHierarchy = (items: ProductHierarchy[], level: number = 0) => {
    return items.map((item) => {
      const isExpanded = expandedItems.has(item.id);
      const isSelected = selectedProduct === item.id;
      const hasChildren = item.children && item.children.length > 0;

      return (
        <div key={item.id} style={{ marginLeft: `${level * 12}px` }}>
          {/* Item */}
          <div
            className={`
              flex items-center gap-2 px-3 py-2 rounded cursor-pointer
              transition-colors group
              ${isSelected ? 'bg-[#0065BD] text-white' : 'hover:bg-[#F5F5F5]'}
            `}
            onClick={() => {
              if (hasChildren) {
                toggleExpand(item.id);
              }
              setSelectedProduct(item.id);
            }}
          >
            {/* Expand/Collapse Icon */}
            {hasChildren ? (
              <button
                className="flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(item.id);
                }}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            ) : (
              <div className="w-4" />
            )}

            {/* Item Name */}
            <span className="text-sm flex-1">
              {item.name}
            </span>

            {/* Level Badge */}
            <span
              className={`
                text-[10px] px-1.5 py-0.5 rounded
                ${isSelected 
                  ? 'bg-white/20 text-white' 
                  : 'bg-[#0065BD]/10 text-[#0065BD]'
                }
              `}
            >
              {item.level}
            </span>
          </div>

          {/* Children */}
          {hasChildren && isExpanded && renderHierarchy(item.children!, level + 1)}
        </div>
      );
    });
  };

  return (
    <div className="w-[280px] h-full bg-white border-r border-[#D3D0CC] p-4 overflow-y-auto">
      {/* Title */}
      <h2 className="text-lg font-semibold text-[#0065BD] mb-4">
        Core Forecast
      </h2>

      {/* Filter Section */}
      <div className="mb-4">
        <label className="text-xs text-[#6E685F] font-medium mb-2 block">
          SOFA CATEGORY
        </label>
        <select className="w-full px-3 py-2 border border-[#D3D0CC] rounded text-sm focus:outline-none focus:border-[#0065BD]">
          <option>All Categories</option>
          <option>High Priority</option>
          <option>Standard</option>
        </select>
      </div>

      {/* Product Hierarchy */}
      <div className="space-y-1">
        {renderHierarchy(hardcodedProductHierarchy)}
      </div>

      {/* Expand/Collapse All */}
      <div className="mt-4 pt-4 border-t border-[#D3D0CC]">
        <button
          className="text-xs text-[#0065BD] hover:underline"
          onClick={() => {
            // Collect all IDs
            const allIds: string[] = [];
            const collectIds = (items: ProductHierarchy[]) => {
              items.forEach((item) => {
                allIds.push(item.id);
                if (item.children) {
                  collectIds(item.children);
                }
              });
            };
            collectIds(hardcodedProductHierarchy);

            // Toggle based on current state
            if (expandedItems.size === allIds.length) {
              setExpandedItems(new Set());
            } else {
              setExpandedItems(new Set(allIds));
            }
          }}
        >
          {expandedItems.size === 0 ? 'Expand All' : 'Collapse All'}
        </button>
      </div>
    </div>
  );
}
