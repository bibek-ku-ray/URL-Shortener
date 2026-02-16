import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-input)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none transition-[border-color,box-shadow,transform] duration-200 placeholder:text-[var(--color-text-secondary)]/70 focus:-translate-y-0.5 focus:border-[var(--color-primary)] focus:shadow-[0_0_0_4px_rgba(6,182,212,0.16)] dark:focus:shadow-[0_0_0_4px_rgba(34,211,238,0.2)] disabled:cursor-not-allowed disabled:opacity-55",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
