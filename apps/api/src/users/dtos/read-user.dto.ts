import { createZodDto } from "@anatine/zod-nestjs";
import { readUserSchema } from "../schemas";

export class ReadUserDto extends createZodDto(readUserSchema) {}
