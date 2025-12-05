export interface User {
  id: string;
  telegramId: string;
  username: string;
  fullName?: string;
  role?: string;
  customRole?: string; 
  wins?: number;
  hackathonsCount?: number;
  bio?: string;
  skills?: string[];
  hasFilledProfile: boolean; 
}

export interface Hackathon {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  isActive: boolean;
}
