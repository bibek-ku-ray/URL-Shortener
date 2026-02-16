"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";

export function SessionBootstrap() {
  const initialized = useAuthStore((state) => state.initialized);
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialize, initialized]);

  return null;
}
