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

export const contactZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
