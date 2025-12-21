"use server";
import { parse as parseCookie } from "cookie";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import { loginZodSchema, registerZodSchema } from "@/utils/zod-schema";
import { getCookie, setCookie } from "./cookie.service";

export async function registerUser(_currentState: unknown, formData: FormData) {
  const payload = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    inviteToken: (formData.get("inviteToken") as string | undefined) || "",
  };
  console.log("payload -", payload);
  const validator = zodValidator(payload, registerZodSchema);
  console.log("validator -", validator);
  if (!validator.success) return validator;
  try {
    const res = await serverFetch.post(`/auth/register`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validator.data),
    });
    const data = await res.json();
    if (!data?.success) return data;

    if (!res.ok) {
      return {
        success: false,
        message: "Something went wrong!",
      };
    }

    const setCookieHeaders = res.headers.getSetCookie();
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      const cookiePromises = setCookieHeaders.map(async (cookie: string) => {
        const parsedCookie = parseCookie(cookie);
        if (parsedCookie?.accessToken) {
          await setCookie("accessToken", parsedCookie.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge:
              parseInt(parsedCookie["Max-Age"] || "0", 10) || 1000 * 60 * 60,
            path: parsedCookie.Path || "/",
            sameSite:
              (parsedCookie?.SameSite as "none" | "lax" | "strict") || "none",
          });
        }
        if (parsedCookie?.refreshToken) {
          await setCookie("refreshToken", parsedCookie.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge:
              parseInt(parsedCookie["Max-Age"] || "0", 10) ||
              1000 * 60 * 60 * 24 * 90,
            path: parsedCookie.Path || "/",
            sameSite:
              (parsedCookie?.SameSite as "none" | "lax" | "strict") || "none",
          });
        }
      });
      await Promise.all(cookiePromises);
    }

    return {
      success: true,
      message: "Registration successful",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Registration failed",
    };
  }
}

export async function loginUser(_currentState: unknown, formData: FormData) {
  let payload = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Handle demo login
  const demo = formData.get("demo") as string;
  if (demo === "admin") {
    if (!process.env.DEMO_ADMIN_EMAIL || !process.env.DEMO_ADMIN_PASSWORD) {
      throw new Error("Demo admin credentials not configured");
    }
    payload = {
      email: process.env.DEMO_ADMIN_EMAIL,
      password: process.env.DEMO_ADMIN_PASSWORD,
    };
  } else if (demo === "user") {
    if (!process.env.DEMO_USER_EMAIL || !process.env.DEMO_USER_PASSWORD) {
      throw new Error("Demo user credentials not configured");
    }
    payload = {
      email: process.env.DEMO_USER_EMAIL,
      password: process.env.DEMO_USER_PASSWORD,
    };
  }
  const validator = zodValidator(payload, loginZodSchema);
  if (!validator.success) return validator;
  try {
    const res = await serverFetch.post(`/auth/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validator.data),
    });
    const data = await res.json();
    if (!data?.success) return data;

    if (!res.ok) {
      return {
        success: false,
        message: "Something went wrong!",
      };
    }

    const setCookieHeaders = res.headers.getSetCookie();
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      const cookiePromises = setCookieHeaders.map(async (cookie: string) => {
        const parsedCookie = parseCookie(cookie);
        if (parsedCookie?.accessToken) {
          await setCookie("accessToken", parsedCookie.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge:
              parseInt(parsedCookie["Max-Age"] || "0", 10) || 1000 * 60 * 60,
            path: parsedCookie.Path || "/",
            sameSite:
              (parsedCookie?.SameSite as "none" | "lax" | "strict") || "none",
          });
        }
        if (parsedCookie?.refreshToken) {
          await setCookie("refreshToken", parsedCookie.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge:
              parseInt(parsedCookie["Max-Age"] || "0", 10) ||
              1000 * 60 * 60 * 24 * 90,
            path: parsedCookie.Path || "/",
            sameSite:
              (parsedCookie?.SameSite as "none" | "lax" | "strict") || "none",
          });
        }
      });
      await Promise.all(cookiePromises);
    }

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    };
  }
}

export async function getNewAccessToken() {
  try {
    const refreshToken = getCookie("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token");
    }
    const res = await serverFetch.post(`/auth/refresh`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await res.json();
    if (!data?.success) {
      throw new Error(data.message || "Refresh failed");
    }

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    const setCookieHeaders = res.headers.getSetCookie();
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      const cookiePromises = setCookieHeaders.map(async (cookie: string) => {
        const parsedCookie = parseCookie(cookie);
        if (parsedCookie?.accessToken) {
          await setCookie("accessToken", parsedCookie.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge:
              parseInt(parsedCookie["Max-Age"] || "0", 10) || 1000 * 60 * 60,
            path: parsedCookie.Path || "/",
            sameSite:
              (parsedCookie?.SameSite as "none" | "lax" | "strict") || "none",
          });
        }
        if (parsedCookie?.refreshToken) {
          await setCookie("refreshToken", parsedCookie.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge:
              parseInt(parsedCookie["Max-Age"] || "0", 10) ||
              1000 * 60 * 60 * 24 * 90,
            path: parsedCookie.Path || "/",
            sameSite:
              (parsedCookie?.SameSite as "none" | "lax" | "strict") || "none",
          });
        }
      });
      await Promise.all(cookiePromises);
    }

    return {
      tokenRefreshed: true,
      success: true,
      message: "Token refreshed successfully",
    };
  } catch (error: unknown) {
    return {
      tokenRefreshed: false,
      success: false,
      message: error instanceof Error ? error.message : "Token refresh failed",
    };
  }
}
