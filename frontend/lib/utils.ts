import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('de-DE').format(value);
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('de-DE').format(date);
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'good':
    case 'in_stock':
    case 'delivered':
      return 'text-green-600 bg-green-50';
    case 'warning':
    case 'low_stock':
    case 'processing':
      return 'text-orange-600 bg-orange-50';
    case 'critical':
    case 'out_of_stock':
    case 'cancelled':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}
