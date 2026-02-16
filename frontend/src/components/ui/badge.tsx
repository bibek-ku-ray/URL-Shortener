import * as React from "react";
import { cn } from "@/lib/utils";

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--color-border)] bg-[rgba(var(--color-primary-rgb),0.12)] px-2.5 py-1 text-xs font-medium text-[var(--color-surface-text)]",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
