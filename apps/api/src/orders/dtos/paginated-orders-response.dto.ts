import { createZodDto } from "@anatine/zod-nestjs";
import { paginatedOrdersResponseSchema } from "../schemas";

export class PaginatedOrdersResponseDto extends createZodDto(paginatedOrdersResponseSchema) {}
