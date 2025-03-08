import { ReadUserDto } from "./users/dtos";

declare module "fastify" {
  interface FastifyRequest {
    user: ReadUserDto;
  }
}
