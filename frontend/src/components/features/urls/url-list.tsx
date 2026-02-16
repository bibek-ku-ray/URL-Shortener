"use client";

import { Link2 } from "lucide-react";
import { UrlCard } from "@/components/features/urls/url-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUrls } from "@/hooks/use-urls";

export function UrlList() {
  const { urls, isLoading } = useUrls();

  return (
    <Card className="bg-[var(--color-surface)] text-[var(--color-surface-text)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[var(--color-surface-text)]">
          <Link2 className="size-4" aria-hidden="true" />
          Your Links
        </CardTitle>
        <CardDescription className="text-[var(--color-text-secondary)]">
          Update codes, copy links, and manage your shortened URLs.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
        ) : urls.length ? (
          <div className="space-y-3">
            {urls.map((url) => (
              <UrlCard key={url.id} url={url} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-card)] p-6 text-center text-sm text-[var(--color-text-secondary)]">
            No URLs yet. Create your first short URL.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
