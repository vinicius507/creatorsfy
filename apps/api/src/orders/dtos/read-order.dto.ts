import { createZodDto } from "@anatine/zod-nestjs";
import { orderSchema } from "../schemas";

export class ReadOrderDto extends createZodDto(orderSchema) {}
