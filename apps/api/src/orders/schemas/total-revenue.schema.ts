import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";

const schema = z.object({
  totalRevenue: z.number().int().nonnegative(),
});

export const totalRevenueSchema = extendApi(schema, {
  title: "Total Revenue Response",
  description: "Response payload for the orders revenue endpoint",
});
