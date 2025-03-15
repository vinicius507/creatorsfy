import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  NEXT_PUBLIC_API_BASE_URL: z.string().url().default("http://localhost:8000"),
  JWT_COOKIE_MAX_AGE: z.coerce.number().default(60 * 60 * 24 * 30),
});

export const env = envSchema.parse(process.env);
