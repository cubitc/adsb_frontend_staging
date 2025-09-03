import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
