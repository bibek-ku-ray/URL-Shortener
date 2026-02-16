"use client";

import { useForm } from "react-hook-form";
import { Link2, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormMessage } from "@/components/ui/form-message";
import { createUrlSchema, type CreateUrlFormValues } from "@/lib/validation/url.schemas";
import { typedZodResolver } from "@/lib/validation/typed-resolver";
import { useUrls } from "@/hooks/use-urls";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/lib/constants";

export function CreateUrlForm() {
  const toast = useToast();
  const { createShortUrl, isMutating, recentlyCreated, error, clearError } = useUrls();

  const form = useForm<CreateUrlFormValues>({
    resolver: typedZodResolver<CreateUrlFormValues>(createUrlSchema),
    defaultValues: {
      url: "",
      code: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    clearError();

    const created = await createShortUrl({
      url: values.url,
      code: values.code?.trim() || undefined,
    });

    if (!created) {
      toast.error("Could not create URL", "Please fix any validation issues and retry.");
      return;
    }

    toast.success("Short URL created", `/${created.shortCode}`);
    form.reset({ url: "", code: "" });
  });

  const shortUrl = recentlyCreated ? `${API_BASE_URL}/${recentlyCreated.shortCode}` : null;

  return (
    <Card className="bg-[var(--color-surface)] text-[var(--color-surface-text)]">
      <CardHeader>
        <CardTitle className="text-[var(--color-surface-text)]">Create Short URL</CardTitle>
        <CardDescription className="text-[var(--color-text-secondary)]">
          Enter a destination and optionally set a custom short code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="targetUrl">Target URL</Label>
            <Input
              id="targetUrl"
              type="url"
              placeholder="https://example.com/long/path"
              aria-invalid={Boolean(form.formState.errors.url)}
              {...form.register("url")}
            />
            <FormMessage message={form.formState.errors.url?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Custom Code (optional)</Label>
            <Input id="code" placeholder="my-link" {...form.register("code")} />
            <FormMessage message={form.formState.errors.code?.message} />
          </div>

          <FormMessage message={error ?? undefined} className="font-medium" />

          <Button type="submit" disabled={isMutating} className="w-full">
            {isMutating ? (
              <>
                <LoaderCircle className="mr-2 size-4 animate-spin" aria-hidden="true" />
                Creating...
              </>
            ) : (
              <>
                <Link2 className="mr-2 size-4" aria-hidden="true" />
                Create URL
              </>
            )}
          </Button>
        </form>

        {shortUrl ? (
          <div className="mt-6 rounded-xl border border-[rgba(var(--color-primary-rgb),0.4)] bg-[rgba(var(--color-primary-rgb),0.08)] p-3">
            <p className="text-xs font-medium text-[var(--color-surface-text)]">New short URL</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <a
                className="text-sm font-semibold text-[var(--color-surface-text)] hover:underline"
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
              >
                {shortUrl}
              </a>
              <CopyButton
                copyValue={shortUrl}
                label="Copy"
                successDescription="Short URL copied to clipboard."
              />
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
