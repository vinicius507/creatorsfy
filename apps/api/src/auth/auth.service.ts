import { UsersService } from "@/users/users.service";
import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

type RegisterParams = {
  storeName: string;
  email: string;
  password: string;
};

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

  async register({ password, ...params }: RegisterParams) {
    const existingUser = await this.users.findByEmail(params.email);

    if (existingUser) {
      throw new ConflictException("Email already in use");
    }

    const hashedPassword = await Bun.password.hash(password);
    const createUserParams = {
      ...params,
      password: hashedPassword,
    };

    return await this.users.create(createUserParams);
  }
}
