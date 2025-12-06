import type { User, Hackathon, HackathonRegistration } from '../types';

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
  },
];

export const fakeHackathons: Hackathon[] = [
  {
    id: '1',
    title: 'AI Hack Moscow',
    description: 'Какой классный хакатон, дайте мне сюда тест пожалуйста...',
    startDate: '2025-12-15',
    endDate: '2025-12-17',
    location: 'Москва, Россия + Онлайн',
    isActive: true,
    prize: '2.000.000 ₽',
    participants: 150,
    duration: '48ч',
    format: 'гибрид',
    status: 'предстоящий',
    directions: ['AI/ML', 'для начинающих'],
  },
  {
    id: '2',
    title: 'Web Development Challenge',
    description: 'Соревнование по веб-разработке',
    startDate: '2025-11-10',
    endDate: '2025-11-12',
    location: 'Онлайн',
    isActive: true,
    prize: '1.000.000 ₽',
    participants: 100,
    duration: '72ч',
    format: 'онлайн',
    status: 'активный',
    directions: ['финансовые', 'игровые'],
  },
  {
    id: '3',
    title: 'Mobile App Hackathon',
    description: 'Разработка мобильных приложений',
    startDate: '2025-10-01',
    endDate: '2025-10-03',
    location: 'Санкт-Петербург',
    isActive: false,
    prize: '500.000 ₽',
    participants: 75,
    duration: '48ч',
    format: 'офлайн',
    status: 'завершенный',
    directions: ['соц проекты', 'экология'],
  },
];

const fakeRegistrations: HackathonRegistration[] = [];

export const hackathonService = {
  getAllHackathons: async (): Promise<Hackathon[]> => {
    return new Promise(resolve => {
      setTimeout(() => resolve(fakeHackathons), 300);
    });
  },

  registerForHackathon: async (
    hackathonId: string,
    userId: string,
    hasTeam: boolean,
    teamMembers?: string[]
  ): Promise<HackathonRegistration> => {
    const registration: HackathonRegistration = {
      hackathonId,
      userId,
      registeredAt: new Date(),
    };

    if (hasTeam && teamMembers && teamMembers.length > 0) {
      registration.teamMembers = teamMembers;
    }

    fakeRegistrations.push(registration);
    
    return new Promise(resolve => {
      setTimeout(() => resolve(registration), 500);
    });
  },

  getUserRegistrations: async (userId: string): Promise<HackathonRegistration[]> => {
    const userRegistrations = fakeRegistrations.filter(
      reg => reg.userId === userId || reg.teamMembers?.includes(userId)
    );
    
    return new Promise(resolve => {
      setTimeout(() => resolve(userRegistrations), 300);
    });
  },
};