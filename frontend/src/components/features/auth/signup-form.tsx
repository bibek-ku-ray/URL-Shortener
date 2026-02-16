"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoaderCircle, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form-message";
import { signupSchema, type SignupFormValues } from "@/lib/validation/auth.schemas";
import { typedZodResolver } from "@/lib/validation/typed-resolver";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export function SignupForm() {
  const router = useRouter();
  const toast = useToast();
  const { signup, login, error, clearError, status } = useAuth();

  const form = useForm<SignupFormValues>({
    resolver: typedZodResolver<SignupFormValues>(signupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    clearError();

    const payload = {
      firstname: values.firstname,
      lastname: values.lastname?.trim() || undefined,
      email: values.email,
      password: values.password,
    };

    const signupResult = await signup(payload);
    if (!signupResult.success) {
      toast.error("Signup failed", "Please review the form and try again.");
      return;
    }

    const loggedIn = await login({ email: values.email, password: values.password });

    if (!loggedIn) {
      toast.info("Account created", "Please sign in to continue.");
      router.push("/login");
      return;
    }

    toast.success("Account ready", "Your workspace is now active.");
    router.push("/dashboard");
  });

  const isBusy = form.formState.isSubmitting || status === "loading";

  return (
    <form className="space-y-6" onSubmit={onSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstname">First Name</Label>
          <Input
            id="firstname"
            autoComplete="given-name"
            aria-invalid={Boolean(form.formState.errors.firstname)}
            {...form.register("firstname")}
          />
          <FormMessage message={form.formState.errors.firstname?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastname">Last Name</Label>
          <Input id="lastname" autoComplete="family-name" {...form.register("lastname")} />
          <FormMessage message={form.formState.errors.lastname?.message} />
        </div>
      </div>

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
          autoComplete="new-password"
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
            Creating account...
          </>
        ) : (
          <>
            <UserPlus className="mr-2 size-4" aria-hidden="true" />
            Create Account
          </>
        )}
      </Button>

      <p className="text-center text-sm text-[var(--color-text-secondary)]">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[var(--color-primary-hover)] hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
