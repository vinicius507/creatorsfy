import { createZodDto } from "@anatine/zod-nestjs";
import { tokensSchema } from "../schemas";

export class TokensDto extends createZodDto(tokensSchema) {}
