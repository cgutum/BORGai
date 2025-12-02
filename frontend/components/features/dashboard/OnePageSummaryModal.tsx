'use client';

import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { onePageSummaryData, getCurrentTimestamp } from '@/lib/data/one-page-summary';
import type { SummaryItem } from '@/lib/data/one-page-summary';

interface OnePageSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OnePageSummaryModal({ isOpen, onClose }: OnePageSummaryModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getTrendIcon = (item: SummaryItem) => {
    if (!item.trend) return null;
    
    const IconComponent = item.trend === 'up' ? TrendingUp : TrendingDown;
    const color = item.isPositive ? '#22C55E' : '#EF4444';
    
    return <IconComponent className="w-3 h-3 inline ml-1" style={{ color }} />;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="relative w-[80%] max-w-[900px] max-h-[85vh] bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-[#6E685F] hover:text-[#000000] transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[85vh] p-8">
          {/* Header */}
          <div className="mb-6 pb-4 border-b-2 border-[#E5E5E5]">
            <h1 className="text-2xl font-bold text-[#0065BD] mb-1">
              BORGai Supply Chain Summary
            </h1>
            <p className="text-xs font-normal text-[#6E685F]">
              Last Updated: {getCurrentTimestamp()}
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-5">
            {onePageSummaryData.map((section, index) => (
              <div key={index} className="space-y-2">
                <h2 className="text-base font-semibold text-[#0065BD] uppercase">
                  {section.title}
                </h2>
                <div className="space-y-1.5">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-baseline justify-between">
                      <span className="text-sm font-normal text-[#000000] leading-relaxed">
                        {item.label}:
                      </span>
                      <span className="text-sm font-semibold text-[#000000] leading-relaxed flex items-center">
                        {item.value}
                        {getTrendIcon(item)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
