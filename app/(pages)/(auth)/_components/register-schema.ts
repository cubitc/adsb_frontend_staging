import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters" }),
  password_confirmation: z
    .string()
    .min(1, { message: "Password confirmation is required" }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
