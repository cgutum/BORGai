'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, LayoutDashboard, BarChart3, TrendingUp, Network, User } from 'lucide-react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Forecast Analysis', href: '/dashboard/forecast-analysis', icon: BarChart3 },
  { name: 'Circular Transparency', href: '#', icon: Network, disabled: true, comingSoon: true, tooltip: 'Quellen-Senken Analyse of Supply Chain' },
  { name: 'Scenario Planning', href: '#', icon: TrendingUp, disabled: true, comingSoon: true, tooltip: 'Scenario based planning with what-if scenarios and more' },
];

export function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 w-full">
        <div className="mr-8 flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#0065BD' }}>
            <span className="text-lg font-bold text-white">B</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-none" style={{ color: '#0065BD' }}>BORGai</span>
            <span className="text-xs" style={{ color: '#6E685F' }}>Core Forecast Dashboard</span>
          </div>
        </div>

        <nav className="flex items-center space-x-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const isDisabled = item.disabled;
            
            if (isDisabled) {
              return (
                <div
                  key={item.name}
                  className="relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium opacity-50 cursor-not-allowed"
                  title={item.tooltip}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                  {item.comingSoon && (
                    <span className="absolute -top-1 -right-1 bg-[#C01530] text-white text-[9px] px-1.5 py-0.5 rounded-full font-semibold">
                      SOON
                    </span>
                  )}
                </div>
              );
            }
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#0065BD]/10 text-[#0065BD]'
                    : 'text-[#6E685F] hover:bg-[#F5F5F5]'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />
        
        <div className="flex items-center gap-3">
          {user && (
            <>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" style={{ color: '#6E685F' }} />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium" style={{ color: '#000000' }}>Morten S. Bie</span>
                  <span className="text-xs" style={{ color: '#6E685F' }}>Supply Chain Manager</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
