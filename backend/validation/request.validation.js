import { z } from "zod";

export const SignupPostRequestBodySchema = z.object({
  firstname: z.string().min(3).max(50),
  lastname: z.string().optional(),
  email: z.email(),
  password: z.string().min(3).max(100),
});
