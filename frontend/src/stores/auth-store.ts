"use client";

import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import type {
  LoginCredentials,
  SignupPayload,
} from "@/features/auth/entities/auth";
import {
  loginUseCase,
  logoutUseCase,
  restoreSessionUseCase,
  signupUseCase,
} from "@/features/auth/use-cases";
import { toErrorMessage } from "@/lib/api/http-client";

export type AuthStatus = "idle" | "loading" | "authenticated" | "anonymous";

interface AuthStore {
  token: string | null;
  status: AuthStatus;
  error: string | null;
  initialized: boolean;
  initialize: () => void;
  signup: (payload: SignupPayload) => Promise<{ success: boolean; userId?: string }>;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    subscribeWithSelector((set) => ({
      token: null,
      status: "idle",
      error: null,
      initialized: false,

      initialize: () => {
        const token = restoreSessionUseCase.execute();

        set({
          token,
          status: token ? "authenticated" : "anonymous",
          initialized: true,
          error: null,
        });
      },

      signup: async (payload) => {
        set({ status: "loading", error: null });

        try {
          const result = await signupUseCase.execute({
            ...payload,
            lastname: payload.lastname?.trim() || undefined,
          });

          set({ status: "anonymous", error: null });

          return {
            success: true,
            userId: result.userId,
          };
        } catch (error) {
          set({ status: "anonymous", error: toErrorMessage(error) });
          return { success: false };
        }
      },

      login: async (credentials) => {
        set({ status: "loading", error: null });

        try {
          const token = await loginUseCase.execute(credentials);
          set({ token, status: "authenticated", error: null });
          return true;
        } catch (error) {
          set({ token: null, status: "anonymous", error: toErrorMessage(error) });
          return false;
        }
      },

      logout: () => {
        logoutUseCase.execute();
        set({ token: null, status: "anonymous", error: null });
      },

      clearError: () => {
        set({ error: null });
      },
    })),
    { name: "auth-store" },
  ),
);
