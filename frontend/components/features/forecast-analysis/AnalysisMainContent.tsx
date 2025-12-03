'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Filter, Download } from 'lucide-react';
import { toast } from 'sonner';
import ForecastContributionTable from '@/components/features/dashboard/ForecastContributionTable';

/**
 * AnalysisMainContent Component
 * 
 * Main content card for Forecast Analysis page.
 * Contains tabs, sub-headers, control buttons, and feature contribution table.
 */
export default function AnalysisMainContent() {
  const [activeTab, setActiveTab] = useState('analysis');
  const [activeSubHeader, setActiveSubHeader] = useState('forecast-contribution');
  const [viewMode, setViewMode] = useState<'detailed' | 'aggregate'>('detailed');
  const [valueMode, setValueMode] = useState<'impact' | 'absolute' | 'relative'>('impact');

  const handleTabChange = (value: string) => {
    if (value === 'overview' || value === 'history') {
      toast.info('Feature coming soon', {
        description: `${value === 'overview' ? 'Forecast Overview' : 'History'} tab will be available in the next release.`,
      });
      return;
    }
    setActiveTab(value);
  };

  const handleSubHeaderClick = (subHeader: string) => {
    if (subHeader === 'forecast-detail') {
      toast.info('Feature coming soon', {
        description: 'Forecast Detail Analysis will be available in the next release.',
      });
      return;
    }
    setActiveSubHeader(subHeader);
  };

  const handleValueModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValueMode(e.target.value as 'impact' | 'absolute' | 'relative');
  };

  const handleViewToggleWithMode = (mode: 'detailed' | 'aggregate') => {
    setViewMode(mode);
    // Auto-switch to Impact Factor when entering Aggregate View
    if (mode === 'aggregate') {
      setValueMode('impact');
    }
  };

  const handleFiltersClick = () => {
    toast.info('Feature coming soon', {
      description: 'Advanced filters will be available in the next release.',
    });
  };

  const handleUpdateClick = () => {
    toast.info('Feature coming soon', {
      description: 'Update functionality will be available in the next release.',
    });
  };

  const handleDownloadClick = () => {
    toast.info('Feature coming soon', {
      description: 'Download functionality will be available in the next release.',
    });
  };

  return (
    <Card className="border-[#D3D0CC] overflow-hidden py-0">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        {/* Tabs Row - Positioned at top with blue bar underneath */}
        <TabsList className="w-full justify-start border-b-2 border-[#0065BD] rounded-none bg-transparent p-0 h-auto">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-[#0065BD] data-[state=active]:text-white rounded-none px-6 py-3 border-b-0"
          >
            Forecast Overview
          </TabsTrigger>
          <TabsTrigger
            value="analysis"
            className="data-[state=active]:bg-[#0065BD] data-[state=active]:text-white rounded-none px-6 py-3 border-b-0"
          >
            Analysis
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-[#0065BD] data-[state=active]:text-white rounded-none px-6 py-3 border-b-0"
          >
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="px-4 pb-4 pt-4 mt-0">
          {/* Header */}
          <h2 className="text-xl font-semibold text-[#000000] mb-3">
            Forecast Analysis
          </h2>

          {/* Sub-Headers with Dot Indicators */}
          <div className="flex gap-6 mb-4">
            <button
              onClick={() => handleSubHeaderClick('forecast-contribution')}
              className={`flex items-center gap-2 text-sm pb-2 transition-colors ${
                activeSubHeader === 'forecast-contribution'
                  ? 'font-medium text-[#000000] border-b-2 border-[#0065BD]'
                  : 'text-[#6E685F] border-b-2 border-transparent'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  activeSubHeader === 'forecast-contribution' ? 'bg-[#0065BD]' : 'bg-[#6E685F]'
                }`}
              />
              Forecast Contribution Analysis
            </button>
            <button
              onClick={() => handleSubHeaderClick('forecast-detail')}
              className="flex items-center gap-2 text-sm text-[#6E685F] pb-2"
            >
              <div className="w-2 h-2 rounded-full bg-[#6E685F]" />
              Forecast Detail Analysis
            </button>
          </div>

          {/* Grey Line Separator */}
          <div className="border-t border-[#D3D0CC] mb-4" />

          {/* Control Buttons Box */}
          <div className="flex items-center gap-4 mb-4 p-3 bg-[#F5F5F5] rounded flex-wrap">
            {/* View Toggle */}
            <div className="flex border border-[#D3D0CC] rounded overflow-hidden">
              <button
                onClick={() => handleViewToggleWithMode('detailed')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  viewMode === 'detailed'
                    ? 'bg-[#0065BD] text-white'
                    : 'bg-white text-[#000000] hover:bg-gray-50'
                }`}
              >
                Detailed View
              </button>
              <button
                onClick={() => handleViewToggleWithMode('aggregate')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-l border-[#D3D0CC] ${
                  viewMode === 'aggregate'
                    ? 'bg-[#0065BD] text-white'
                    : 'bg-white text-[#000000] hover:bg-gray-50'
                }`}
              >
                Aggregate View
              </button>
            </div>

            {/* Value Mode Dropdown */}
            <select
              value={valueMode}
              onChange={handleValueModeChange}
              disabled={viewMode === 'aggregate'}
              className={`px-3 py-2 text-sm border border-[#D3D0CC] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#0065BD] ${
                viewMode === 'aggregate' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <option value="impact">Impact Factor</option>
              <option value="absolute">Absolute Values</option>
              <option value="relative">Relative Values</option>
            </select>

            <div className="flex-1" />

            {/* Action Buttons - Right Aligned */}
            <Button
              onClick={handleFiltersClick}
              variant="outline"
              className="border-[#D3D0CC]"
              size="sm"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button
              onClick={handleUpdateClick}
              className="bg-[#000000] text-white hover:bg-[#333333]"
              size="sm"
            >
              Update
            </Button>
            <Button
              onClick={handleDownloadClick}
              variant="outline"
              className="border-[#D3D0CC]"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          {/* Forecast Contribution Table */}
          <ForecastContributionTable 
            viewMode={valueMode} 
            isAggregateView={viewMode === 'aggregate'} 
          />
        </TabsContent>

        <TabsContent value="overview" className="p-6">
          {/* This content won't show due to handleTabChange blocking */}
          <p className="text-[#6E685F]">Forecast Overview content coming soon...</p>
        </TabsContent>

        <TabsContent value="history" className="p-6">
          {/* This content won't show due to handleTabChange blocking */}
          <p className="text-[#6E685F]">History content coming soon...</p>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
