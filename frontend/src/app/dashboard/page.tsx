"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { CreateUrlForm } from "@/components/features/urls/create-url-form";
import { UrlList } from "@/components/features/urls/url-list";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useUrls } from "@/hooks/use-urls";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const router = useRouter();
  const toast = useToast();
  const hasFetchedUrls = useRef(false);

  const { initialized, initialize, isAuthenticated, logout } = useAuth();
  const { fetchUrls, reset } = useUrls();

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialize, initialized]);

  useEffect(() => {
    if (initialized && !isAuthenticated) {
      router.replace("/login");
    }
  }, [initialized, isAuthenticated, router]);

  useEffect(() => {
    if (!initialized || !isAuthenticated || hasFetchedUrls.current) {
      return;
    }

    hasFetchedUrls.current = true;
    void fetchUrls();
  }, [fetchUrls, initialized, isAuthenticated]);

  if (!initialized || !isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-[var(--color-text-secondary)]">Loading your workspace...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-[var(--color-text-primary)]">Dashboard</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Manage your shortened URLs.</p>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              logout();
              reset();
              toast.info("Signed out", "Your session has ended.");
              router.replace("/login");
            }}
          >
            <LogOut className="mr-2 size-4" aria-hidden="true" />
            Logout
          </Button>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[384px_1fr] lg:items-start">
        <CreateUrlForm />
        <UrlList />
      </section>
    </main>
  );
}
