import { cn } from "@/lib/utils";

interface FormMessageProps {
  message?: string;
  className?: string;
}

export function FormMessage({ message, className }: FormMessageProps) {
  if (!message) {
    return null;
  }

  return <p className={cn("text-xs text-rose-600 dark:text-rose-400", className)}>{message}</p>;
}
