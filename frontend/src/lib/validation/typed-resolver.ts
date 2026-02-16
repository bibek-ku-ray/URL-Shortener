import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldValues, Resolver } from "react-hook-form";

// Work around temporary Zod v4 type mismatches in resolver generics.
export function typedZodResolver<TFieldValues extends FieldValues>(
  schema: unknown,
): Resolver<TFieldValues> {
  return zodResolver(schema as never) as Resolver<TFieldValues>;
}
