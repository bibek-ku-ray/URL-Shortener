"use client";

import { useToastStore } from "@/stores/toast-store";

export function useToast() {
  const pushToast = useToastStore((state) => state.pushToast);

  return {
    success: (title: string, description?: string) =>
      pushToast({ title, description, variant: "success" }),
    error: (title: string, description?: string) =>
      pushToast({ title, description, variant: "error" }),
    info: (title: string, description?: string) =>
      pushToast({ title, description, variant: "info" }),
  };
}
