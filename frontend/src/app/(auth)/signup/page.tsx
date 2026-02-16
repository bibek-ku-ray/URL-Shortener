import type { Metadata } from "next";
import { SignupForm } from "@/components/features/auth/signup-form";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Register and start shortening URLs.",
};

export default function SignupPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
          Create account
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Launch your URL workspace in under a minute.
        </p>
      </div>
      <SignupForm />
    </section>
  );
}
