"use client";

import { useUrlStore } from "@/stores/url-store";

export function useUrls() {
  const urls = useUrlStore((state) => state.urls);
  const isLoading = useUrlStore((state) => state.isLoading);
  const isMutating = useUrlStore((state) => state.isMutating);
  const error = useUrlStore((state) => state.error);
  const recentlyCreated = useUrlStore((state) => state.recentlyCreated);
  const fetchUrls = useUrlStore((state) => state.fetchUrls);
  const createShortUrl = useUrlStore((state) => state.createShortUrl);
  const updateShortUrl = useUrlStore((state) => state.updateShortUrl);
  const deleteShortUrl = useUrlStore((state) => state.deleteShortUrl);
  const clearError = useUrlStore((state) => state.clearError);
  const clearRecentlyCreated = useUrlStore((state) => state.clearRecentlyCreated);
  const reset = useUrlStore((state) => state.reset);

  return {
    urls,
    isLoading,
    isMutating,
    error,
    recentlyCreated,
    fetchUrls,
    createShortUrl,
    updateShortUrl,
    deleteShortUrl,
    clearError,
    clearRecentlyCreated,
    reset,
  };
}
