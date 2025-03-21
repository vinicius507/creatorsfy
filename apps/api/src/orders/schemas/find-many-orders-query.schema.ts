import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";

const schema = z.object({
  page: z.coerce.number().int().positive().default(1),
  size: z.coerce.number().int().positive().max(100).default(30),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export const findManyOrdersQuerySchema = extendApi(schema, {
  title: "Find Many Orders Query",
  description: "Query parameters for fetching many orders.",
});

export type FindManyOrdersQuery = z.infer<typeof findManyOrdersQuerySchema>;
