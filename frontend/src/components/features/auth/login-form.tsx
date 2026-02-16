"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoaderCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form-message";
import { loginSchema, type LoginFormValues } from "@/lib/validation/auth.schemas";
import { typedZodResolver } from "@/lib/validation/typed-resolver";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export function LoginForm() {
  const router = useRouter();
  const toast = useToast();
  const { login, error, clearError, status } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: typedZodResolver<LoginFormValues>(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    clearError();
    const isSuccess = await login(values);

    if (!isSuccess) {
      toast.error("Login failed", "Check your credentials and try again.");
      return;
    }

    toast.success("Welcome back", "You are now signed in.");
    router.push("/dashboard");
  });

  const isBusy = form.formState.isSubmitting || status === "loading";

  return (
    <form className="space-y-6" onSubmit={onSubmit} noValidate>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(form.formState.errors.email)}
          {...form.register("email")}
        />
        <FormMessage message={form.formState.errors.email?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(form.formState.errors.password)}
          {...form.register("password")}
        />
        <FormMessage message={form.formState.errors.password?.message} />
      </div>

      <FormMessage message={error ?? undefined} className="font-medium" />

      <Button type="submit" className="w-full" disabled={isBusy}>
        {isBusy ? (
          <>
            <LoaderCircle className="mr-2 size-4 animate-spin" aria-hidden="true" />
            Signing in...
          </>
        ) : (
          <>
            <LogIn className="mr-2 size-4" aria-hidden="true" />
            Sign In
          </>
        )}
      </Button>

      <p className="text-center text-sm text-[var(--color-text-secondary)]">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-[var(--color-primary-hover)] hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}
