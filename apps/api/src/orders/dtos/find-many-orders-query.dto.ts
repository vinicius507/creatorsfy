import { createZodDto } from "@anatine/zod-nestjs";
import { findManyOrdersQuerySchema } from "../schemas";

export class FindManyOrdersQueryDto extends createZodDto(findManyOrdersQuerySchema) {}
