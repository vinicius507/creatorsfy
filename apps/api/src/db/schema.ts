import { randomUUIDv7 } from "bun";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

const id = text()
  .primaryKey()
  .$defaultFn(() => randomUUIDv7());

const createdAt = text().$defaultFn(() => new Date().toISOString());
const updatedAt = text().$onUpdateFn(() => new Date().toISOString());

export const usersTable = sqliteTable("users", {
  id,
  storeName: text({ length: 80 }).notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt,
  updatedAt,
});

export const schema = { usersTable };
