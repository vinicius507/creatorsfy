import { ReadUserDto } from "@/users/dtos";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Public } from "./decorators";
import { CredentialsDto, RegisterDto, TokensDto } from "./dtos";

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: TokensDto,
    description: "User has successfully logged in.",
  })
  @ApiUnauthorizedResponse({ description: "Invalid email and/or password." })
  async login(@Body() { email, password }: CredentialsDto) {
    const token = await this.auth.login(email, password);

    return {
      accessToken: token,
    };
  }

  @Public()
  @Post("register")
  @ApiCreatedResponse({ type: ReadUserDto, description: "User registered successfully." })
  @ApiConflictResponse({ description: "Email already in use." })
  async register(@Body() data: RegisterDto) {
    return await this.auth.register(data);
  }
}
