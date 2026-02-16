import { z } from "zod";

export const SignupPostRequestBodySchema = z.object({
  firstname: z.string().min(3).max(50),
  lastname: z.string().optional(),
  email: z.email(),
  password: z.string().min(3).max(100),
});

export const LoginPostRequestBodySchema = z.object({
  email: z.email(),
  password: z.string().min(3).max(100),
});

export const ShortenPostRequestSchema = z.object({
  url: z.url(),
  code: z.string().optional()
})
