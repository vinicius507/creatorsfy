import { orderSchema } from "@/orders/schemas";
import { createZodDto } from "@anatine/zod-nestjs";
import { extendApi } from "@anatine/zod-openapi";

const newOrderSchema = extendApi(orderSchema, {
  title: "New Order",
  description: "New Order request payload.",
});

export class NewOrderDto extends createZodDto(newOrderSchema) {}
