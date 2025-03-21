import { createZodDto } from "@anatine/zod-nestjs";
import { readHistogramSchema } from "../schemas";

export class ReadHistogramDto extends createZodDto(readHistogramSchema) {}
