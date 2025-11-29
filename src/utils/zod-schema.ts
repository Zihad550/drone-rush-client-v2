import z from "zod";

export const registerZodSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginZodSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
