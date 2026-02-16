import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z.email("Use a valid email address"),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(100, "Password must be at most 100 characters"),
});

export const signupSchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters")
    .max(50, "First name must be at most 50 characters"),
  lastname: z
    .string()
    .trim()
    .max(50, "Last name must be at most 50 characters")
    .optional()
    .or(z.literal("")),
  email: z.email("Use a valid email address"),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(100, "Password must be at most 100 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
