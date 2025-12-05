import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types";

interface UserStore {
  currentUser: User | null;
  isLoading: boolean;

  setUser: (user: User) => void;
  updateProfile: (profileData: Partial<User>) => void;
  completeProfile: () => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()( //создание хранилища, которое возвращает useUserStore
  persist( //автоматически сохраняет данные в localStorage
    (set) => ({
      currentUser: null,
      isLoading: false,

      setUser: (user) => set({ currentUser: user }),

      updateProfile: (profileData) =>
        set((state) => ({
          currentUser: state.currentUser
            ? { ...state.currentUser, ...profileData }
            : null,
        })),

      completeProfile: () =>
        set((state) => ({
          currentUser: state.currentUser
            ? { ...state.currentUser, hasFilledProfile: true }
            : null,
        })),

      logout: () => set({ currentUser: null }),
    }),
    {
      name: "user-storage", // сохранение в localStorage
    }
  )
);
