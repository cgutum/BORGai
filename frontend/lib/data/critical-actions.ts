import { CriticalAction } from '../types';

// TODO: Replace with API call to /api/alerts/critical
export const hardcodedCriticalActions: CriticalAction[] = [
  {
    id: 'alert_001',
    type: 'STOCK_LOW_SINGLE',
    title: 'STOCK LOW <Y',
    description: 'Turbocharger stock below reorder point',
    severity: 'critical',
    affectedSKUs: ['CORE-TURBO-001'],
    actionDate: '2025-11-30',
    icon: '⚠️',
  },
  {
    id: 'alert_002',
    type: 'DELIVERY_COMING',
    title: 'DELIVERY COMING',
    description: '2 pallets arriving Dec 2, 3 PM',
    severity: 'warning',
    affectedSKUs: ['CORE-TURBO-001', 'CORE-ENGINE-023'],
    actionDate: '2025-12-02',
    icon: '🚚',
  },
  {
    id: 'alert_003',
    type: 'STOCK_LOW_MULTI',
    title: 'STOCK LOW ×Y',
    description: 'Multiple products critically low',
    severity: 'critical',
    affectedSKUs: ['CORE-STARTER-045', 'CORE-ALT-078', 'CORE-BATTERY-012'],
    actionDate: '2025-11-30',
    icon: '🔴',
  },
];
