'use client';

import React from 'react';
import Tag from './Tag';
import { cores, components, coreCategories } from '@/lib/data/forecast-data';

interface TagListProps {
  categories: string[];
  cores: string[];
  components: string[];
  onRemoveCategory: (id: string) => void;
  onRemoveCore: (id: string) => void;
  onRemoveComponent: (id: string) => void;
}

export default function TagList({
  categories,
  cores: coreIds,
  components: componentIds,
  onRemoveCategory,
  onRemoveCore,
  onRemoveComponent
}: TagListProps) {
  const totalTags = categories.length + coreIds.length + componentIds.length;
  
  if (totalTags === 0) {
    return null;
  }
  
  return (
    <div className="space-y-1.5">
      <span className="text-xs font-medium text-gray-600">
        Selected ({totalTags})
      </span>
      
      <div className="flex flex-wrap gap-1.5 max-h-[150px] overflow-y-auto">
        {/* Category Tags */}
        {categories.map(categoryId => {
          const category = coreCategories.find(c => c.id === categoryId);
          return (
            <Tag
              key={`cat-${categoryId}`}
              label={category?.name || categoryId}
              type="category"
              onRemove={() => onRemoveCategory(categoryId)}
            />
          );
        })}
        
        {/* Core Tags */}
        {coreIds.map(coreId => {
          const core = cores.find(c => c.core_id === coreId);
          return (
            <Tag
              key={`core-${coreId}`}
              label={core?.core_id || coreId}
              type="core"
              onRemove={() => onRemoveCore(coreId)}
            />
          );
        })}
        
        {/* Component Tags */}
        {componentIds.map(componentId => {
          const component = components.find(c => c.component_id === componentId);
          return (
            <Tag
              key={`comp-${componentId}`}
              label={component?.displayName || componentId}
              sublabel={component?.core_id}
              type="component"
              onRemove={() => onRemoveComponent(componentId)}
            />
          );
        })}
      </div>
    </div>
  );
}
