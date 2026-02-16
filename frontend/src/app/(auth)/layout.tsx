import type { PropsWithChildren } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="auth-surface w-full max-w-xl rounded-3xl p-8 shadow-[0_24px_64px_rgba(15,23,42,0.12)] sm:p-10">
        <div className="mb-6 flex justify-end">
          <ThemeToggle />
        </div>
        {children}
      </div>
    </main>
  );
}
