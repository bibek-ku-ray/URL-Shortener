"use client";

import { CheckCircle2, CircleAlert, Info } from "lucide-react";
import { useToastStore } from "@/stores/toast-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const variantStyles = {
  success: "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200",
  error: "border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-700 dark:bg-rose-900/30 dark:text-rose-200",
  info: "border-cyan-300 bg-cyan-50 text-cyan-900 dark:border-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-200",
} as const;

const variantIcons = {
  success: CheckCircle2,
  error: CircleAlert,
  info: Info,
} as const;

export function Toaster() {
  const toasts = useToastStore((state) => state.toasts);
  const dismissToast = useToastStore((state) => state.dismissToast);

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="pointer-events-none fixed inset-x-0 top-4 z-50 mx-auto flex w-full max-w-2xl flex-col gap-2 px-4"
    >
      {toasts.map((toast) => {
        const Icon = variantIcons[toast.variant];

        return (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur",
              variantStyles[toast.variant],
            )}
            role="status"
          >
            <Icon className="mt-0.5 size-4" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{toast.title}</p>
              {toast.description ? (
                <p className="mt-1 text-xs opacity-90">{toast.description}</p>
              ) : null}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => dismissToast(toast.id)}
            >
              Close
            </Button>
          </div>
        );
      })}
    </div>
  );
}
