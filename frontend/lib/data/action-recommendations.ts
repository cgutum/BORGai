// Action Recommendations - Hardcoded for MVP

export interface ActionRecommendation {
  id: string;
  type: 'incentivize-supply' | 'research-market' | 'contact-supplier';
  title: string;
  description: string;
  details: string;
  skusAffected?: number;
}

export const actionRecommendations: ActionRecommendation[] = [
  {
    id: 'action-1',
    type: 'incentivize-supply',
    title: 'INCENTIVIZE SUPPLY',
    description: 'Increase supply of SKUs with critical stock',
    details: '3 SKUs affected',
    skusAffected: 3,
  },
  {
    id: 'action-2',
    type: 'research-market',
    title: 'RESEARCH MARKET TREND',
    description: 'New BMW X5 unexpected spare part demand',
    details: '15 SKUs affected',
    skusAffected: 15,
  },
  {
    id: 'action-3',
    type: 'contact-supplier',
    title: 'CONTACT SUPPLIER',
    description: 'Supplier WHMUC02 piling cores ready to supply',
    details: 'Action required',
  },
];
