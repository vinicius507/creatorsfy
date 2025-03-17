import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";
import { credentialsSchema } from "./credentials.schema";

const schema = credentialsSchema.extend({
  storeName: z.string().max(80),
});

export const registerSchema = extendApi(schema, {
  title: "Register Request",
  description: "Register user request payload.",
});
