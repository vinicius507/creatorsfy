"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

export const setAuthCookie = async (name: string, token: string) => {
  const cookieStore = await cookies();
  const encodedToken = Buffer.from(token).toString("base64");

  cookieStore.set(name, encodedToken, {
    maxAge: env.JWT_COOKIE_MAX_AGE,
    secure: env.NODE_ENV === "production",
    httpOnly: true,
  });
};

export const getAuthCookie = async (name: string) => {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get(name)?.value ?? "";

  return Buffer.from(encodedToken, "base64").toString("utf8");
};
