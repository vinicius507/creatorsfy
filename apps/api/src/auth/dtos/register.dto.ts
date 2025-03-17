import { registerSchema } from "@/auth/schemas";
import { createZodDto } from "@anatine/zod-nestjs";

export class RegisterDto extends createZodDto(registerSchema) {}
