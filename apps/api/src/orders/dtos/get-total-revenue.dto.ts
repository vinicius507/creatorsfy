import { createZodDto } from "@anatine/zod-nestjs";
import { getTotalRevenueQuerySchema } from "../schemas";

export class GetTotalRevenueQueryDto extends createZodDto(getTotalRevenueQuerySchema) {}
