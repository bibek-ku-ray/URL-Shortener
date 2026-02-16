import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen text-[var(--color-text-primary)]">
      <SiteHeader />

      <section className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-5xl items-center justify-center px-6 pb-16 pt-8">
        <div className="mx-auto max-w-4xl space-y-8 rounded-3xl border border-[var(--color-border)] bg-[rgba(var(--color-primary-rgb),0.08)] px-8 py-12 text-center shadow-[0_24px_50px_rgba(15,23,42,0.12)] backdrop-blur-md md:px-14 md:py-20">
          <h1 className="font-heading text-5xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-7xl">
            Shorten. Share. Done.
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
            Transform long, messy URLs into clean, memorable short links in seconds.
            Track clicks, boost engagement, and elevate your brand with our URL shortener
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/signup">
                Start for Free <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/login">Open Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
