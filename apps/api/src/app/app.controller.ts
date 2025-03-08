import { ReadUserDto } from "@/users/dtos";
import { Controller, Get, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { FastifyRequest } from "fastify";

@Controller()
export class AppController {
  @Get("me")
  @ApiBearerAuth()
  @ApiOkResponse({
    type: ReadUserDto,
    description: "Successfully retrieved user information.",
  })
  async getMe(@Req() req: FastifyRequest) {
    return req.user;
  }
}
