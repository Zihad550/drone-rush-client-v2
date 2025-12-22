import z from "zod";

export const registerZodSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  inviteToken: z.string().optional(),
});

export const loginZodSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const contactZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const droneZodSchema = z.object({
  name: z.string().min(1, "Drone name is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
  quantity: z.coerce
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative integer"),
  img: z.string().optional(), // Made optional since file will be uploaded separately
  category: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const brandZodSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
  logo: z.string().url("Invalid logo URL").optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const categoryZodSchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export const forgotPasswordZodSchema = z.object({
  email: z.string().email("Invalid Email"),
});

export const resetPasswordZodSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  oldPassword: z.string().min(8, "Password must be at least 8 characters"),
});
