import type { Metadata } from "next";
import { LoginForm } from "@/components/features/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Access your URL management dashboard.",
};

export default function LoginPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
          Welcome back
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)]">Sign in to manage your short links.</p>
      </div>
      <LoginForm />
    </section>
  );
}
