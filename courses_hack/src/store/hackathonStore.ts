import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HackathonRegistration, TeamRequest } from "../types";

interface HackathonStore {
  registrations: HackathonRegistration[];
  teamRequests: TeamRequest[];

  registerForHackathon: (registration: HackathonRegistration) => void;
  createTeamRequest: (request: TeamRequest) => void;
  applyToTeam: (
    hackathonId: string,
    requestUserId: string,
    applicantUserId: string
  ) => void;
  getHackathonRegistrations: (hackathonId: string) => HackathonRegistration[];
  getUserRegistrations: (userId: string) => HackathonRegistration[];
  getUserTeamRequests: (userId: string) => TeamRequest[];
  getTeamRequestsByHackathon: (hackathonId: string) => TeamRequest[];
  isUserRegistered: (hackathonId: string, userId: string) => boolean;
  hasUserAppliedToTeam: (
    hackathonId: string,
    requestUserId: string,
    applicantUserId: string
  ) => boolean;
}

export const useHackathonStore = create<HackathonStore>()(
  persist(
    (set, get) => ({
      registrations: [],
      teamRequests: [],

      registerForHackathon: (registrationData) => {
        const existingRegistration = get().registrations.find(
          (reg) =>
            reg.hackathonId === registrationData.hackathonId &&
            reg.userId === registrationData.userId
        );

        if (existingRegistration) {
          set((state) => ({
            registrations: state.registrations.map((reg) =>
              reg.hackathonId === registrationData.hackathonId &&
              reg.userId === registrationData.userId
                ? registrationData
                : reg
            ),
          }));
        } else {

          set((state) => ({
            registrations: [...state.registrations, registrationData],
          }));
        }
      },

      createTeamRequest: (requestData) => {
        const existingRequest = get().teamRequests.find(
          (req) =>
            req.hackathonId === requestData.hackathonId &&
            req.userId === requestData.userId
        );

        if (existingRequest) {
          set((state) => ({
            teamRequests: state.teamRequests.map((req) =>
              req.hackathonId === requestData.hackathonId &&
              req.userId === requestData.userId
                ? { ...requestData, applications: existingRequest.applications }
                : req
            ),
          }));
        } else {
          set((state) => ({
            teamRequests: [...state.teamRequests, requestData],
          }));
        }
      },

      applyToTeam: (hackathonId, requestUserId, applicantUserId) => {
        set((state) => ({
          teamRequests: state.teamRequests.map((request) =>
            request.hackathonId === hackathonId &&
            request.userId === requestUserId
              ? {
                  ...request,
                  applications: request.applications.includes(applicantUserId)
                    ? request.applications
                    : [...request.applications, applicantUserId],
                }
              : request
          ),
        }));
      },

      getHackathonRegistrations: (hackathonId) => {
        return get().registrations.filter(
          (reg) => reg.hackathonId === hackathonId
        );
      },

      getUserRegistrations: (userId) => {
        return get().registrations.filter(
          (reg) => reg.userId === userId || reg.teamMembers?.includes(userId)
        );
      },

      getUserTeamRequests: (userId) => {
        return get().teamRequests.filter(
          (request) => request.userId === userId
        );
      },

      getTeamRequestsByHackathon: (hackathonId) => {
        return get().teamRequests.filter(
          (request) => request.hackathonId === hackathonId
        );
      },

      isUserRegistered: (hackathonId, userId) => {
        return get().registrations.some(
          (reg) =>
            reg.hackathonId === hackathonId &&
            (reg.userId === userId || reg.teamMembers?.includes(userId))
        );
      },

      hasUserAppliedToTeam: (hackathonId, requestUserId, applicantUserId) => {
        const request = get().teamRequests.find(
          (req) =>
            req.hackathonId === hackathonId && req.userId === requestUserId
        );
        return request?.applications.includes(applicantUserId) || false;
      },
    }),
    {
      name: "hackathon-storage",
    }
  )
);
