'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { FilterProvider } from '@/lib/contexts/FilterContext';
import { Header } from '@/components/layout/Header';
import ForecastSelection from '@/components/features/filters/ForecastSelection';
import { CriticalActionsPanel } from '@/components/features/dashboard/CriticalActionsPanel';
import { CalendarWidget } from '@/components/features/dashboard/CalendarWidget';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <FilterProvider>
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar: Forecast Selection - Fixed width, non-scrollable container */}
          <aside className="w-[240px] flex-shrink-0 border-r border-[#D3D0CC] bg-gray-50">
            <div className="h-full overflow-y-auto p-3">
              <ForecastSelection />
            </div>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
          
          {/* Right Panel: Critical Actions */}
          <aside className="w-[320px] flex-shrink-0 bg-white border-l border-[#D3D0CC] p-6 overflow-y-auto hidden xl:block">
            <CriticalActionsPanel />
            <div className="mt-6">
              <CalendarWidget />
            </div>
          </aside>
        </div>
      </div>
    </FilterProvider>
  );
}
