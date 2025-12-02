// Critical Alerts - Hardcoded for MVP

export interface CriticalAlert {
  id: string;
  type: 'stock-low' | 'delivery-coming' | 'supply-disruption';
  title: string;
  description: string;
  details: string;
  skusAffected?: number;
}

export const criticalAlerts: CriticalAlert[] = [
  {
    id: 'alert-1',
    type: 'stock-low',
    title: 'STOCK LOW',
    description: 'SKU: TC_BMW_X3_2023_C001',
    details: 'Demand > Stock + Expected Supply',
  },
  {
    id: 'alert-2',
    type: 'delivery-coming',
    title: 'DELIVERY COMING',
    description: '2 pallets arriving Dec 12, 3-6 pm',
    details: '2 SKUs affected',
    skusAffected: 2,
  },
  {
    id: 'alert-3',
    type: 'supply-disruption',
    title: 'SUPPLY DISRUPTION',
    description: 'Multiple cores not delivered',
    details: '3 SKUs affected',
    skusAffected: 3,
  },
];
