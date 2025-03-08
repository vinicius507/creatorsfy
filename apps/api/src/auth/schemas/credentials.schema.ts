import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const credentialsSchema = extendApi(schema, {
  title: "Credentials Payload",
  description: "Credentials payload used in authentication operations.",
});
