import { createPaginatedResponseSchema } from "@/lib/pagination";
import { extendApi } from "@anatine/zod-openapi";
import { orderSchema } from "./order.schema";

const schema = createPaginatedResponseSchema(orderSchema);

export const paginatedOrdersResponseSchema = extendApi(schema, {
  title: "Paginated Orders Response",
  description: "Returns a page of registered orders.",
});
