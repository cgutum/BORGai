import { User } from '../types';

// TODO: Replace with actual authentication API
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'planner@borg.com',
    name: 'Michael Schmidt',
    role: 'planner',
    department: 'Supply Chain Planning',
    created_at: new Date('2024-01-15'),
    last_login: new Date(),
    is_active: true,
  },
];

export function validateCredentials(email: string, password: string): User | null {
  // Simple mock validation - in production, this would hit an API
  if (email === 'planner@borg.com' && password === 'demo123') {
    return mockUsers[0];
  }
  return null;
}
