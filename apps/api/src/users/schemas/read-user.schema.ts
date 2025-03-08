import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const readUserSchema = extendApi(schema, {
  title: "Read User",
  description: "Application user payload.",
});
