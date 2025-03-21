import { createZodDto } from "@anatine/zod-nestjs";
import { getHistogramQuerySchema } from "../schemas";

export class GetHistogramQueryDto extends createZodDto(getHistogramQuerySchema) {}
