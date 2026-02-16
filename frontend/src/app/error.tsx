"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md space-y-4 rounded-2xl border border-rose-300 bg-[var(--color-card)] p-6 text-center shadow-xl dark:border-rose-700">
        <h2 className="font-heading text-xl font-semibold text-[var(--color-text-primary)]">Something went wrong</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">Please retry this action.</p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </main>
  );
}
