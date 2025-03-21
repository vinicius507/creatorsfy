import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";
import { SUPPORTED_CURRENCIES } from "../constants";

const schema = z.object({
  currency: z.enum(SUPPORTED_CURRENCIES),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export const getTotalRevenueQuerySchema = extendApi(schema, {
  title: "Get Total Revenue Query",
  description: "Query parameters for fetching total revenue.",
});

export type GetTotalRevenueQuery = z.infer<typeof getTotalRevenueQuerySchema>;
