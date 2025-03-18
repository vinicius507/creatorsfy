import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";

const schema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(30),
  range: z.coerce.date().array().max(2, {
    message: "Date range should have at most a start date and an end date.",
  }),
});

export const findManyOrdersQuerySchema = extendApi(schema, {
  title: "Find Many Orders Query",
  description: "Query parameters for fetching many orders.",
});

export type FindManyOrdersQuery = z.infer<typeof findManyOrdersQuerySchema>;
