'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AnalysisTabsProps {
  children?: React.ReactNode;
}

export function AnalysisTabs({ children }: AnalysisTabsProps) {
  return (
    <Tabs defaultValue="analysis" className="w-full">
      <TabsList className="grid w-full grid-cols-3 max-w-[600px]">
        <TabsTrigger 
          value="overview"
          className="data-[state=active]:bg-[#0065BD] data-[state=active]:text-white"
        >
          Forecast Overview
        </TabsTrigger>
        <TabsTrigger 
          value="analysis"
          className="data-[state=active]:bg-[#0065BD] data-[state=active]:text-white"
        >
          Analysis
        </TabsTrigger>
        <TabsTrigger 
          value="history"
          className="data-[state=active]:bg-[#0065BD] data-[state=active]:text-white"
        >
          History
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <div className="text-center text-[#6E685F] py-12">
          Forecast Overview content coming soon...
        </div>
      </TabsContent>

      <TabsContent value="analysis" className="mt-6">
        {children}
      </TabsContent>

      <TabsContent value="history" className="mt-6">
        <div className="text-center text-[#6E685F] py-12">
          History content coming soon...
        </div>
      </TabsContent>
    </Tabs>
  );
}
