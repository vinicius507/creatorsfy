import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";

const schema = z.object({
  accessToken: z.string().describe("The access token of the user"),
});

export const tokensSchema = extendApi(schema, {
  title: "Tokens",
  description: "Access token response payload for a successful login.",
});
