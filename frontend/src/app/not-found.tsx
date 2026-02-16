import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="space-y-4 text-center">
        <h1 className="font-heading text-3xl font-semibold text-[var(--color-text-primary)]">Page not found</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">The resource you requested does not exist.</p>
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
