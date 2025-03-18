import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";

const schema = z.object({
  filters: z
    .object({
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
    })
    .optional(),
});

export const findManyOrdersQuerySchema = extendApi(schema, {
  title: "Find Many Orders Query",
  description: "Query parameters for fetching many orders.",
});
