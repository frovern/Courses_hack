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
  prize?: string; 
  participants?: number; 
  duration?: string; 
  format?: 'онлайн' | 'офлайн' | 'гибрид';
  status?: 'предстоящий' | 'активный' | 'завершенный';
  directions?: ('AI/ML' | 'финансовые' | 'игровые' | 'соц проекты' | 'экология' | 'для начинающих')[];
}

export interface HackathonRegistration {
  hackathonId: string;
  userId: string;
  teamName?: string;
  teamMembers?: string[]; 
  registeredAt: Date;
  hasTeam?: boolean;
  teamSize?: number;
  neededRoles?: string[];
  teamLevel?: 'новички' | 'опытные' | 'смешанная' | 'профессиональная';
  city?: string;
}
export interface TeamRequest {
  hackathonId: string;
  userId: string; 
  neededRoles: string[];
  teamLevel: 'новички' | 'опытные' | 'смешанная' | 'профессиональная';
  experience?: string;
  description?: string;
  createdAt: Date;
  applications: string[]; 
}
export interface HackathonFilters {
  status?: ('предстоящий' | 'активный' | 'завершенный')[];
  format?: ('онлайн' | 'офлайн' | 'гибрид')[];
  directions?: ('AI/ML' | 'финансовые' | 'игровые' | 'соц проекты' | 'экология' | 'для начинающих')[];
}

export type RegistrationFormData = Omit<HackathonRegistration, 'registeredAt'>;