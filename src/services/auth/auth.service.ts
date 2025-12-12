"use server";
import { parse as parseCookie } from "cookie";
import { redirect } from "next/navigation";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import { loginZodSchema, registerZodSchema } from "@/utils/zod-schema";
import { deleteCookie, getCookie, setCookie } from "./cookie.service";
import { verifyAccessToken } from "./token.service";

export async function registerUser(_currentState: unknown, formData: FormData) {
  const payload = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const validator = zodValidator(payload, registerZodSchema);
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

    redirect("/");
  } catch (error: unknown) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof (error as { digest: unknown }).digest === "string" &&
      (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    )
      throw error;

    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? (error as Error)?.message : "Something went wrong"}`,
    };
  }
}

export async function loginUser(_currentState: unknown, formData: FormData) {
  const payload = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validator = zodValidator(payload, loginZodSchema);
  if (!validator.success) return validator;

  try {
    const res = await serverFetch.post("/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validator.data),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Something went wrong",
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

    if (data?.success) {
      redirect("/");
    }

    return data;
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof (error as { digest: unknown }).digest === "string" &&
      (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    )
      throw error;
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function getNewAccessToken() {
  try {
    const accessToken = await getCookie("accessToken");
    const refreshToken = await getCookie("refreshToken");

    //Case 1: Both tokens are missing - user is logged out
    if (!accessToken && !refreshToken) {
      return {
        tokenRefreshed: false,
      };
    }

    // Case 2 : Access Token exist- and need to verify
    if (accessToken) {
      const verifiedToken = await verifyAccessToken(accessToken);

      if (verifiedToken.success) {
        return {
          tokenRefreshed: false,
        };
      }
    }

    //Case 3 : refresh Token is missing- user is logged out
    if (!refreshToken) {
      return {
        tokenRefreshed: false,
      };
    }

    //Case 4: Access Token is invalid/expired- try to get a new one using refresh token
    // This is the only case we need to call the API

    // Now we know: accessToken is invalid/missing AND refreshToken exists
    // Safe to call the API
    let accessTokenObject: null | Record<string, string | undefined> = null;
    let refreshTokenObject: null | Record<string, string | undefined> = null;

    // API Call - serverFetch now includes all cookies automatically
    const response = await serverFetch.post("/auth/refresh-token");

    const result = await response.json();

    const setCookieHeaders = response.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parseCookie(cookie);

        if (parsedCookie?.accessToken) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie?.refreshToken) {
          refreshTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error("No Set-Cookie header found");
    }

    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    if (!refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    const atObj = accessTokenObject as Record<string, string | undefined>;
    const rtObj = refreshTokenObject as Record<string, string | undefined>;

    await deleteCookie("accessToken");
    await setCookie("accessToken", atObj.accessToken!, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(atObj["Max-Age"]!, 10) || 1000 * 60 * 60,
      path: atObj.Path! || "/",
      sameSite: (atObj.SameSite || "none") as "none" | "lax" | "strict",
    });

    await deleteCookie("refreshToken");
    await setCookie("refreshToken", rtObj.refreshToken!, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(rtObj["Max-Age"]!, 10) || 1000 * 60 * 60 * 24 * 90,
      path: rtObj.Path! || "/",
      sameSite: (rtObj.SameSite as "none" | "lax" | "strict") || "none",
    });

    await deleteCookie("refreshToken");
    await setCookie("refreshToken", rtObj.refreshToken!, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(rtObj["Max-Age"]!, 10) || 1000 * 60 * 60 * 24 * 90,
      path: rtObj.Path! || "/",
      sameSite: (rtObj.SameSite || "none") as "none" | "lax" | "strict",
    });

    await deleteCookie("refreshToken");
    await setCookie("refreshToken", rtObj.refreshToken!, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(rtObj["Max-Age"]!, 10) || 1000 * 60 * 60 * 24 * 90,
      path: rtObj.Path! || "/",
      sameSite: (rtObj.SameSite || "none") as "none" | "lax" | "strict",
    });

    if (!result.success) {
      throw new Error(result.message || "Token refresh failed");
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
