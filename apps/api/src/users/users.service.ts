import { DRIZZLE_PROVIDER, Database } from "@/db/providers";
import { usersTable } from "@/db/schema";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE_PROVIDER) private readonly db: Database) {}

  async create(email: string, password: string) {
    return await this.db.insert(usersTable).values({ email, password }).returning();
  }

  async findByEmail(email: string) {
    return await this.db.query.usersTable.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });
  }
}
