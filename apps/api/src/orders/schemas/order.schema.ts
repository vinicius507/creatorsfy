import { extendApi } from "@anatine/zod-openapi";
import { z } from "zod";
import { ORDER_STATUSES, SUPPORTED_CURRENCIES } from "../constants";

const schema = z.object({
  id: z.string().uuid(),
  status: z.enum(ORDER_STATUSES),
  amount: z.number().int().nonnegative(),
  currency: z.enum(SUPPORTED_CURRENCIES),
  product: z.string().uuid(),
  createdAt: z.string().datetime(),
});

export const orderSchema = extendApi(schema, {
  title: "Order",
  description: "Order payload",
});

export type Order = z.infer<typeof orderSchema>;
