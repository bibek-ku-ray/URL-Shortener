"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ToastVariant = "success" | "error" | "info";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastStore {
  toasts: Toast[];
  pushToast: (toast: Omit<Toast, "id">, durationMs?: number) => void;
  dismissToast: (id: string) => void;
  clearToasts: () => void;
}

function createToastId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export const useToastStore = create<ToastStore>()(
  devtools(
    (set, get) => ({
      toasts: [],
      pushToast: (toast, durationMs = 3500) => {
        const id = createToastId();
        set((state) => ({
          toasts: [...state.toasts, { ...toast, id }],
        }));

        if (typeof window !== "undefined") {
          window.setTimeout(() => {
            get().dismissToast(id);
          }, durationMs);
        }
      },
      dismissToast: (id) => {
        set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
      },
      clearToasts: () => {
        set({ toasts: [] });
      },
    }),
    { name: "toast-store" },
  ),
);
