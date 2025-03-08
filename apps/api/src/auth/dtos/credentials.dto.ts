import { createZodDto } from "@anatine/zod-nestjs";
import { credentialsSchema } from "../schemas";

export class CredentialsDto extends createZodDto(credentialsSchema) {}
