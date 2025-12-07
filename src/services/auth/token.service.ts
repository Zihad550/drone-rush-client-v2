"use server";

import jwt from "jsonwebtoken";

export const verifyAccessToken = async (token: string) => {
  if (!process.env?.JWT_SECRET) throw new Error("JWT_SECRET is not defined");

  try {
    const verifiedAccessToken = jwt.verify(
      token,
      process.env.JWT_SECRET,
    ) as jwt.JwtPayload;

    return {
      success: true,
      message: "Token is valid",
      payload: verifiedAccessToken,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Invalid token",
    };
  }
};
