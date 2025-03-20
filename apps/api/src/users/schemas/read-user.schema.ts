import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";

const schema = z.object({
  storeName: z.string(),
  email: z.string().email(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const readUserSchema = extendApi(schema, {
  title: "Read User",
  description: "Application user payload.",
});
