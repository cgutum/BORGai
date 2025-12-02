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
        <div className="flex flex-1 overflow-hidden gap-4 p-4">
          {/* Left 80%: Main Content (KPI Badge + Filters/Chart) */}
          <main className="flex-1 overflow-auto" style={{ width: '80%' }}>
            {children}
          </main>
          
          {/* Right 20%: Critical Actions (Full Height) */}
          <aside className="w-[20%] flex-shrink-0 bg-white rounded-lg border border-[#E5E5E5] shadow-sm p-4 overflow-y-auto hidden xl:flex xl:flex-col">
            <CriticalActionsPanel />
            <div className="mt-4">
              <CalendarWidget />
            </div>
          </aside>
        </div>
      </div>
    </FilterProvider>
  );
}
