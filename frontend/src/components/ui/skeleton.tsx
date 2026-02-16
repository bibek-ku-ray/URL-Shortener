import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "skeleton-wave animate-pulse rounded-xl bg-[rgba(var(--color-primary-rgb),0.1)] dark:bg-[rgba(var(--color-primary-rgb),0.16)]",
        className,
      )}
    />
  );
}

export { Skeleton };
