'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { FilterProvider } from '@/lib/contexts/FilterContext';
import { Header } from '@/components/layout/Header';
import ForecastSelection from '@/components/features/filters/ForecastSelection';
import { CriticalActionsPanel } from '@/components/features/dashboard/CriticalActionsPanel';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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

  // Hide Critical Actions Panel on Forecast Analysis page (it has its own custom layout)
  const showCriticalActions = !pathname?.includes('/forecast-analysis');

  return (
    <FilterProvider>
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden gap-4 p-4">
          {/* Main Content - Full width on Forecast Analysis, 80% width elsewhere */}
          <main className={showCriticalActions ? "flex-1 overflow-auto" : "flex-1 overflow-auto w-full"} style={showCriticalActions ? { width: '80%' } : undefined}>
            {children}
          </main>
          
          {/* Right 20%: Critical Actions (Full Height) - Hidden on Forecast Analysis page */}
          {showCriticalActions && (
            <aside className="w-[20%] flex-shrink-0 bg-white rounded-lg border border-[#E5E5E5] shadow-sm p-4 overflow-y-auto hidden xl:flex xl:flex-col">
              <CriticalActionsPanel />
            </aside>
          )}
        </div>
      </div>
    </FilterProvider>
  );
}
