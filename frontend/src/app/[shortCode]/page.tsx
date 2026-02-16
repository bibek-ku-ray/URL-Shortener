"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";

export default function ShortCodeRedirectPage() {
  const params = useParams<{ shortCode: string }>();
  const shortCode = params.shortCode;

  useEffect(() => {
    if (!shortCode) {
      return;
    }

    window.location.replace(`${API_BASE_URL}/${shortCode}`);
  }, [shortCode]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <p className="text-sm text-[var(--color-text-secondary)]">Redirecting...</p>
    </main>
  );
}
