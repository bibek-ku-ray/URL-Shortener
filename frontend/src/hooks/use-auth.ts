"use client";

import { useMemo } from "react";
import { useAuthStore } from "@/stores/auth-store";

export function useAuth() {
  const token = useAuthStore((state) => state.token);
  const status = useAuthStore((state) => state.status);
  const error = useAuthStore((state) => state.error);
  const initialized = useAuthStore((state) => state.initialized);
  const initialize = useAuthStore((state) => state.initialize);
  const signup = useAuthStore((state) => state.signup);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const clearError = useAuthStore((state) => state.clearError);

  const isAuthenticated = useMemo(
    () => status === "authenticated" && Boolean(token),
    [status, token],
  );

  return {
    token,
    status,
    error,
    initialized,
    initialize,
    signup,
    login,
    logout,
    clearError,
    isAuthenticated,
  };
}
