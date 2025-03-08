import { randomUUIDv7 } from "bun";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: text()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: text().$defaultFn(() => new Date().toISOString()),
  updatedAt: text().$onUpdateFn(() => new Date().toISOString()),
});

export const schema = { usersTable };
