import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";

const schema = z.object({
  histogram: z.number().int().nonnegative().array(),
});

export const readHistogramSchema = extendApi(schema, {
  title: "Histogram Response",
  description: "Response payload for the orders histogram endpoint",
});
