import { z } from "zod";

export const configSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.number().default(8181),
  DATABASE: z.string(),
  JWT_SECRET: z.string(),
});

export type Config = z.infer<typeof configSchema>;
