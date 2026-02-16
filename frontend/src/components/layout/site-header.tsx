import Link from "next/link";
import { Link2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
      <Link
        href="/"
        className="group flex items-center gap-3 text-sm font-semibold text-[var(--color-text-primary)]"
      >
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white shadow-[0_10px_22px_rgba(6,182,212,0.26)] group-hover:scale-105 dark:text-[#06202a]">
          <Link2 className="size-4" aria-hidden="true" />
        </span>
        <span className="font-heading text-base">Shortly</span>
      </Link>

      <nav className="flex items-center gap-2">
        <ThemeToggle />
        <Button asChild variant="ghost" size="sm">
          <Link href="/login">Sign In</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/signup">Get Started</Link>
        </Button>
      </nav>
    </header>
  );
}
