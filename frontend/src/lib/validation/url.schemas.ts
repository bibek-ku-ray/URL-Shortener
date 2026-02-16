import { z } from "zod/v4";

export const createUrlSchema = z.object({
  url: z.url("Use a valid URL").trim(),
  code: z
    .string()
    .trim()
    .min(3, "Code must be at least 3 characters")
    .max(50, "Code must be at most 50 characters")
    .optional()
    .or(z.literal("")),
});

export const updateUrlSchema = z
  .object({
    targetUrl: z.url("Use a valid URL").trim().optional().or(z.literal("")),
    shortCode: z
      .string()
      .trim()
      .min(3, "Code must be at least 3 characters")
      .max(50, "Code must be at most 50 characters")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (value) => Boolean(value.targetUrl?.trim()) || Boolean(value.shortCode?.trim()),
    {
      message: "Provide at least one field to update",
      path: ["targetUrl"],
    },
  );

export type CreateUrlFormValues = z.infer<typeof createUrlSchema>;
export type UpdateUrlFormValues = z.infer<typeof updateUrlSchema>;
