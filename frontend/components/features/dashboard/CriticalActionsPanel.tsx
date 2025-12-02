'use client';

import { useState } from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { OnePageSummaryModal } from './OnePageSummaryModal';
import { AlertCard } from './AlertCard';
import { RecommendationCard } from './RecommendationCard';
import { CalendarWidget } from './CalendarWidget';
import { criticalAlerts } from '@/lib/data/critical-alerts';
import { actionRecommendations } from '@/lib/data/action-recommendations';

export function CriticalActionsPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertsExpanded, setIsAlertsExpanded] = useState(true);
  const [isRecommendationsExpanded, setIsRecommendationsExpanded] = useState(true);

  const handleAcknowledgeAll = () => {
    toast.info('Feature coming soon', {
      description: 'Acknowledge all functionality will be available in the next release.',
    });
  };

  const handleMarkAllComplete = () => {
    toast.info('Feature coming soon', {
      description: 'Mark all complete functionality will be available in the next release.',
    });
  };

  return (
    <>
      <div className="space-y-3 flex flex-col h-full">
        {/* Title */}
        <h3 className="text-base font-semibold text-[#000000]">Critical Actions</h3>

        {/* Section 1: One-Page Summary Button */}
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="outline"
          className="w-full justify-start gap-2 py-4 px-3 border-[#0065BD] text-[#0065BD] hover:bg-[#F0F7FF] transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span className="text-sm font-semibold">1-Page Summary</span>
        </Button>

        {/* Section 2: Alerts */}
        <div className="bg-white rounded-lg border border-[#E5E5E5] shadow-sm p-4">
          {/* Header with Collapse Button */}
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-semibold text-[#000000] uppercase">Alerts</h4>
            <button
              onClick={() => setIsAlertsExpanded(!isAlertsExpanded)}
              className="text-[#6E685F] hover:text-[#000000] transition-colors"
              aria-label={isAlertsExpanded ? 'Collapse' : 'Expand'}
            >
              {isAlertsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Collapsible Content */}
          {isAlertsExpanded && (
            <div className="space-y-3">
              <div className="space-y-3">
                {criticalAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>

              <Button
                onClick={handleAcknowledgeAll}
                variant="ghost"
                size="sm"
                className="w-full text-xs font-medium text-[#6E685F] hover:bg-gray-50"
              >
                Acknowledge All
              </Button>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="border-t border-[#E5E5E5]" />

        {/* Section 3: Action Recommendations */}
        <div className="bg-white rounded-lg border border-[#E5E5E5] shadow-sm p-4">
          {/* Header with Collapse Button */}
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-semibold text-[#000000] uppercase">Action Recommendations</h4>
            <button
              onClick={() => setIsRecommendationsExpanded(!isRecommendationsExpanded)}
              className="text-[#6E685F] hover:text-[#000000] transition-colors"
              aria-label={isRecommendationsExpanded ? 'Collapse' : 'Expand'}
            >
              {isRecommendationsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Collapsible Content */}
          {isRecommendationsExpanded && (
            <div className="space-y-3">
              <div className="space-y-3">
                {actionRecommendations.map((recommendation) => (
                  <RecommendationCard key={recommendation.id} recommendation={recommendation} />
                ))}
              </div>

              <Button
                onClick={handleMarkAllComplete}
                variant="ghost"
                size="sm"
                className="w-full text-xs font-medium text-[#6E685F] hover:bg-gray-50"
              >
                Mark All Complete
              </Button>
            </div>
          )}
        </div>

        {/* Section 4: Calendar */}
        <div className="bg-white rounded-lg border border-[#E5E5E5] shadow-sm p-4">
          <CalendarWidget />
        </div>
      </div>

      {/* One-Page Summary Modal */}
      <OnePageSummaryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
