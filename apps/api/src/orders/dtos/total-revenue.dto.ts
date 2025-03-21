import { createZodDto } from "@anatine/zod-nestjs";
import { totalRevenueSchema } from "../schemas";

export class TotalRevenueDto extends createZodDto(totalRevenueSchema) {}
