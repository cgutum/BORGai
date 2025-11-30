import { CalendarEvent } from '../types';

// TODO: Replace with API call to /api/calendar/events
export const hardcodedCalendarEvents: CalendarEvent[] = [
  {
    date: '2025-11-30',
    type: 'alert',
    title: 'Stock Alert',
    description: 'Multiple stock warnings triggered',
    icon: '⚠️',
  },
  {
    date: '2025-12-02',
    type: 'delivery',
    title: 'Delivery Scheduled',
    description: '2 pallets turbochargers arriving',
    icon: '🚚',
  },
  {
    date: '2025-12-05',
    type: 'threshold',
    title: 'Reorder Point',
    description: 'Engine cores reaching reorder point',
    icon: '📊',
  },
  {
    date: '2025-12-08',
    type: 'delivery',
    title: 'Delivery Scheduled',
    description: 'Starter motors shipment expected',
    icon: '🚚',
  },
  {
    date: '2025-12-12',
    type: 'alert',
    title: 'Forecast Review',
    description: 'Weekly forecast update required',
    icon: '📋',
  },
];
