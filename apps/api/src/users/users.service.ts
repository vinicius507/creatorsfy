import { DRIZZLE_PROVIDER, Database } from "@/db/providers";
import { usersTable } from "@/db/schema";
import { Inject, Injectable } from "@nestjs/common";

type CreateUserParams = {
  storeName: string;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE_PROVIDER) private readonly db: Database) {}

  async create(params: CreateUserParams) {
    return await this.db.insert(usersTable).values(params).returning();
  }

  async findByEmail(email: string) {
    return await this.db.query.usersTable.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });
  }
}
