'use client';

import React from 'react';
import { X } from 'lucide-react';

interface TagProps {
  label: string;
  sublabel?: string;
  type: 'category' | 'core' | 'component';
  onRemove: () => void;
}

const typeStyles = {
  category: {
    bg: 'bg-[#0065BD]/10',
    text: 'text-[#0065BD]',
    hover: 'hover:bg-[#0065BD]/20',
    border: 'border-[#0065BD]/30'
  },
  core: {
    bg: 'bg-[#A2AD00]/10',
    text: 'text-[#A2AD00]',
    hover: 'hover:bg-[#A2AD00]/20',
    border: 'border-[#A2AD00]/30'
  },
  component: {
    bg: 'bg-[#E37222]/10',
    text: 'text-[#E37222]',
    hover: 'hover:bg-[#E37222]/20',
    border: 'border-[#E37222]/30'
  }
};

export default function Tag({ label, sublabel, type, onRemove }: TagProps) {
  const styles = typeStyles[type];
  
  return (
    <div
      className={`
        inline-flex items-center gap-1.5 px-2 py-1 rounded-full
        border transition-all duration-200
        ${styles.bg} ${styles.text} ${styles.border}
        group
      `}
      role="listitem"
    >
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-medium truncate max-w-[140px]" title={label}>
          {label}
        </span>
        {sublabel && (
          <span className="text-[10px] opacity-75 truncate max-w-[140px]" title={sublabel}>
            {sublabel}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={onRemove}
        className={`
          flex-shrink-0 rounded-full p-0.5 transition-colors
          ${styles.hover}
          focus:outline-none focus:ring-1 focus:ring-[#0065BD]
        `}
        aria-label={`Remove ${label}`}
      >
        <X className="w-2.5 h-2.5" />
      </button>
    </div>
  );
}
