'use client';

import { MetricGrid } from '@/components/features/dashboard/MetricGrid';
import { forecastMetrics } from '@/lib/data/forecast-metrics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, TrendingUp, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Supply Chain Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Real-time overview of core supply forecasts and inventory status
        </p>
      </div>

      {/* Critical Alerts */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-orange-900">Critical Alerts</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg bg-white p-3">
            <Badge variant="destructive">High</Badge>
            <div className="flex-1">
              <p className="font-medium text-sm">Turbocharger supply forecast down 35%</p>
              <p className="text-sm text-muted-foreground mt-1">
                Vehicle registrations decreased by 12%, affecting core returns
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-white p-3">
            <Badge className="bg-orange-500">Medium</Badge>
            <div className="flex-1">
              <p className="font-medium text-sm">12 items below reorder point</p>
              <p className="text-sm text-muted-foreground mt-1">
                Immediate action required to avoid stockouts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Metrics Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Key Performance Indicators</h2>
        <MetricGrid metrics={forecastMetrics} />
      </div>

      {/* Quick Insights */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <CardTitle>Supply Trends</CardTitle>
            </div>
            <CardDescription>Last 30 days performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Turbochargers</span>
                <Badge className="bg-green-100 text-green-800">+8.5%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Batteries</span>
                <Badge className="bg-green-100 text-green-800">+12.3%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Starters</span>
                <Badge className="bg-green-100 text-green-800">+6.7%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <CardTitle>Inventory Summary</CardTitle>
            </div>
            <CardDescription>Current stock levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">In Stock</span>
                <span className="font-semibold text-green-600">5 items</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Low Stock</span>
                <span className="font-semibold text-orange-600">2 items</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Out of Stock</span>
                <span className="font-semibold text-red-600">1 item</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
