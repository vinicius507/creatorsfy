import { UsersService } from "@/users/users.service";
import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly users: UsersService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Invalid email and/or passsword");
    }

    const passwordMatch = await Bun.password.verify(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException("Invalid email and/or passsword");
    }

    const { password: _, ...payload } = user;
    return this.jwt.sign(payload, { subject: user.id ?? "" });
  }

  async register(email: string, password: string) {
    const existingUser = await this.users.findByEmail(email);

    if (existingUser) {
      throw new ConflictException("Email already in use");
    }

    const hashedPassword = await Bun.password.hash(password);
    return await this.users.create(email, hashedPassword);
  }
}
