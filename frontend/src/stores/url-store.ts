"use client";

import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import type {
  CreateShortUrlInput,
  ShortUrl,
  UpdateShortUrlInput,
} from "@/features/urls/entities/url";
import {
  createShortUrlUseCase,
  deleteShortUrlUseCase,
  listShortUrlsUseCase,
  updateShortUrlUseCase,
} from "@/features/urls/use-cases";
import { useAuthStore } from "@/stores/auth-store";
import { toErrorMessage } from "@/lib/api/http-client";

interface UrlStore {
  urls: ShortUrl[];
  isLoading: boolean;
  isMutating: boolean;
  error: string | null;
  recentlyCreated: ShortUrl | null;
  fetchUrls: () => Promise<void>;
  createShortUrl: (payload: CreateShortUrlInput) => Promise<ShortUrl | null>;
  updateShortUrl: (id: string, payload: UpdateShortUrlInput) => Promise<ShortUrl | null>;
  deleteShortUrl: (id: string) => Promise<boolean>;
  clearError: () => void;
  clearRecentlyCreated: () => void;
  reset: () => void;
}

function getRequiredToken(): string {
  const token = useAuthStore.getState().token;
  if (!token) {
    throw new Error("You must be logged in to access this resource");
  }

  return token;
}

export const useUrlStore = create<UrlStore>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      urls: [],
      isLoading: false,
      isMutating: false,
      error: null,
      recentlyCreated: null,

      fetchUrls: async () => {
        set({ isLoading: true, error: null });

        try {
          const token = getRequiredToken();
          const urls = await listShortUrlsUseCase.execute(token);
          set({ urls, isLoading: false, error: null });
        } catch (error) {
          set({ isLoading: false, error: toErrorMessage(error) });
        }
      },

      createShortUrl: async (payload) => {
        set({ isMutating: true, error: null, recentlyCreated: null });

        try {
          const token = getRequiredToken();
          const created = await createShortUrlUseCase.execute(payload, token);
          set((state) => ({
            urls: [created, ...state.urls],
            isMutating: false,
            recentlyCreated: created,
            error: null,
          }));

          return created;
        } catch (error) {
          set({ isMutating: false, error: toErrorMessage(error) });
          return null;
        }
      },

      updateShortUrl: async (id, payload) => {
        set({ isMutating: true, error: null });

        try {
          const token = getRequiredToken();
          const updated = await updateShortUrlUseCase.execute(id, payload, token);

          set((state) => ({
            urls: state.urls.map((url) => (url.id === id ? updated : url)),
            isMutating: false,
            error: null,
          }));

          return updated;
        } catch (error) {
          set({ isMutating: false, error: toErrorMessage(error) });
          return null;
        }
      },

      deleteShortUrl: async (id) => {
        const previous = get().urls;

        set((state) => ({
          isMutating: true,
          error: null,
          urls: state.urls.filter((url) => url.id !== id),
        }));

        try {
          const token = getRequiredToken();
          await deleteShortUrlUseCase.execute(id, token);
          set({ isMutating: false, error: null });
          return true;
        } catch (error) {
          set({ urls: previous, isMutating: false, error: toErrorMessage(error) });
          return false;
        }
      },

      clearError: () => {
        set({ error: null });
      },

      clearRecentlyCreated: () => {
        set({ recentlyCreated: null });
      },

      reset: () => {
        set({
          urls: [],
          isLoading: false,
          isMutating: false,
          error: null,
          recentlyCreated: null,
        });
      },
    })),
    { name: "url-store" },
  ),
);
