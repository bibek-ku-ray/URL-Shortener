"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Check, Pencil, Trash2, X } from "lucide-react";
import type { ShortUrl } from "@/features/urls/entities/url";
import { API_BASE_URL } from "@/lib/constants";
import { updateUrlSchema, type UpdateUrlFormValues } from "@/lib/validation/url.schemas";
import { typedZodResolver } from "@/lib/validation/typed-resolver";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FormMessage } from "@/components/ui/form-message";
import { useUrls } from "@/hooks/use-urls";
import { useToast } from "@/hooks/use-toast";

interface UrlCardProps {
  url: ShortUrl;
}

export function UrlCard({ url }: UrlCardProps) {
  const toast = useToast();
  const { updateShortUrl, deleteShortUrl } = useUrls();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<UpdateUrlFormValues>({
    resolver: typedZodResolver<UpdateUrlFormValues>(updateUrlSchema),
    defaultValues: {
      targetUrl: url.targetUrl,
      shortCode: url.shortCode,
    },
  });

  const shortUrl = useMemo(() => `${API_BASE_URL}/${url.shortCode}`, [url.shortCode]);

  const onUpdate = form.handleSubmit(async (values) => {
    const updated = await updateShortUrl(url.id, {
      targetUrl: values.targetUrl?.trim() || undefined,
      shortCode: values.shortCode?.trim() || undefined,
    });

    if (!updated) {
      toast.error("Update failed", "Please check your changes and try again.");
      return;
    }

    toast.success("Updated", "Short URL has been updated.");
    setIsEditing(false);
  });

  const onDelete = async () => {
    const confirmed = window.confirm("Delete this short URL?");
    if (!confirmed) {
      return;
    }

    const success = await deleteShortUrl(url.id);
    if (!success) {
      toast.error("Delete failed", "The URL was not removed.");
      return;
    }

    toast.success("Deleted", "Short URL removed.");
  };

  return (
    <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(15,23,42,0.12)]">
      {isEditing ? (
        <form className="space-y-3" onSubmit={onUpdate}>
          <div className="space-y-2">
            <Input
              aria-label="Target URL"
              type="url"
              aria-invalid={Boolean(form.formState.errors.targetUrl)}
              {...form.register("targetUrl")}
            />
            <FormMessage message={form.formState.errors.targetUrl?.message} />
          </div>

          <div className="space-y-2">
            <Input
              aria-label="Short code"
              aria-invalid={Boolean(form.formState.errors.shortCode)}
              {...form.register("shortCode")}
            />
            <FormMessage message={form.formState.errors.shortCode?.message} />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button type="submit" size="sm">
              <Check className="mr-1 size-3" /> Save
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                form.reset({ targetUrl: url.targetUrl, shortCode: url.shortCode });
                setIsEditing(false);
              }}
            >
              <X className="mr-1 size-3" /> Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{url.shortCode}</Badge>
            <a
              className="truncate text-sm font-semibold text-[var(--color-primary-hover)] hover:underline"
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
            >
              {shortUrl}
            </a>
          </div>

          <p className="line-clamp-2 text-sm text-[var(--color-text-secondary)]">{url.targetUrl}</p>

          <div className="flex flex-wrap items-center gap-2">
            <CopyButton copyValue={shortUrl} label="Copy" />
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              <Pencil className="mr-1 size-3" /> Edit
            </Button>
            <Button type="button" variant="destructive" size="sm" onClick={onDelete}>
              <Trash2 className="mr-1 size-3" /> Delete
            </Button>
          </div>
        </div>
      )}
    </article>
  );
}
