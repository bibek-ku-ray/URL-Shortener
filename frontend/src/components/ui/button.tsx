import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:pointer-events-none disabled:opacity-55 hover:scale-[1.02] active:scale-[0.99]",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-primary)] text-white shadow-[0_8px_18px_rgba(6,182,212,0.25)] hover:bg-[var(--color-primary-hover)] hover:shadow-[0_0_0_3px_rgba(6,182,212,0.22),0_14px_28px_rgba(6,182,212,0.22)] active:bg-[var(--color-primary-active)] dark:text-[#06202a] dark:shadow-[0_8px_18px_rgba(34,211,238,0.2)] dark:hover:shadow-[0_0_0_3px_rgba(34,211,238,0.24),0_14px_28px_rgba(34,211,238,0.18)]",
        secondary:
          "border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-primary)] shadow-sm hover:bg-[var(--color-surface)] hover:shadow-[0_10px_22px_rgba(15,23,42,0.09)]",
        ghost:
          "text-[var(--color-text-secondary)] hover:bg-[rgba(var(--color-primary-rgb),0.1)] hover:text-[var(--color-text-primary)]",
        destructive:
          "bg-rose-600 text-white shadow-sm hover:bg-rose-700 hover:shadow-[0_10px_24px_rgba(225,29,72,0.3)] focus-visible:ring-rose-500 dark:bg-rose-700 dark:hover:bg-rose-600",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-5 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
