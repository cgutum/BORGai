'use client';

import { TrendingUp, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { ActionRecommendation } from '@/lib/data/action-recommendations';

interface RecommendationCardProps {
  recommendation: ActionRecommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const getIcon = () => {
    switch (recommendation.type) {
      case 'incentivize-supply':
        return <TrendingUp className="w-5 h-5" style={{ color: 'rgba(162, 173, 0, 0.85)' }} />;
      case 'research-market':
        return <TrendingUp className="w-5 h-5" style={{ color: 'rgba(162, 173, 0, 0.85)' }} />;
      case 'contact-supplier':
        return <Phone className="w-5 h-5" style={{ color: 'rgba(162, 173, 0, 0.85)' }} />;
    }
  };

  const handleDetailsClick = () => {
    toast.info('Feature coming soon', {
      description: 'Detailed recommendation information will be available in the next release.',
    });
  };

  return (
    <div className="flex items-start gap-2 py-2">
      {/* Icon */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#E5E5E5]">
        {getIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-semibold uppercase leading-tight mb-1" style={{ color: 'rgba(162, 173, 0, 0.85)' }}>
          {recommendation.title}
        </h4>
        <p className="text-[11px] font-normal text-[#000000] leading-snug mb-0.5">
          {recommendation.description}
        </p>
        <p className="text-[11px] font-normal text-[#000000] leading-snug">
          {recommendation.details}
        </p>
      </div>

      {/* Details Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleDetailsClick}
        className="flex-shrink-0 h-6 px-2 text-[11px] font-medium text-[#6E685F] border-[#E5E5E5] hover:bg-gray-50"
      >
        Details
      </Button>
    </div>
  );
}
