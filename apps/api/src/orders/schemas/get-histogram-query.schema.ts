import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";

const schema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export const getHistogramQuerySchema = extendApi(schema, {
  title: "Get Orders Histogram",
  description: "Query parameters for fetching orders histogram.",
});

export type GetHistogramQuery = z.infer<typeof getHistogramQuerySchema>;
