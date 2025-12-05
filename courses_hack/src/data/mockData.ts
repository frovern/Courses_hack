import type { User, Team, Hackathon } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    telegramId: '123456789',
    username: '@kkhryyst',
    fullName: 'Александра Ускова', 
    role: 'Фронтендер', 
    wins: 2, 
    hackathonsCount: 4, 
    bio: 'Ищу классную команду для реализации проектов',
    skills: ['React', 'TypeScript', 'UI/UX', 'Figma'],
    hasFilledProfile: true,
    createdAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '2',
    telegramId: '987654321',
    username: '@frontend_dev',
    fullName: 'Иван Петров',
    role: 'Фронтендер',
    wins: 1,
    hackathonsCount: 2,
    bio: 'Люблю создавать красивые интерфейсы',
    skills: ['Vue.js', 'JavaScript', 'CSS'],
    hasFilledProfile: true,
    createdAt: '2024-01-02T11:00:00Z',
  },
];

export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'МОЯ КОМАНДА Э/Б',
    hackathonId: '1',
    captainId: '1',
    members: ['1', '3', '4'],
    lookingFor: ['Бэкендер', 'Дизайнер'],
  },
];

export const mockHackathons: Hackathon[] = [
  {
    id: '1',
    title: 'AI Hack Moscow',
    description: 'Хакатон по искусственному интеллекту',
    startDate: '2025-12-18',
    endDate: '2025-12-19',
    location: 'Москва, Россия • Онлайн',
    isActive: true,
  },
];