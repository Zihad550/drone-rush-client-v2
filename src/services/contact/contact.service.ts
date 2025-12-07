"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import { contactZodSchema } from "@/utils/zod-schema";

export async function submitContactForm(
  _currentState: unknown,
  formData: FormData,
) {
  const payload = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  const validator = zodValidator(payload, contactZodSchema);
  if (!validator.success) return validator;

  try {
    const res = await serverFetch.post("/contact", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validator.data),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to send message. Please try again.",
      };
    }

    return {
      success: true,
      message: "Thank you for contacting us! We'll get back to you soon.",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : "Unknown error"
          : "Something went wrong. Please try again later.",
    };
  }
}
