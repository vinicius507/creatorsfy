import { ORDER_STATUSES, SUPPORTED_CURRENCIES } from "@/orders/constants";
import { randomUUIDv7 } from "bun";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

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

export const ordersTable = sqliteTable("orders", {
  id,
  status: text({ enum: ORDER_STATUSES }).notNull(),
  amount: integer().notNull(),
  currency: text({ enum: SUPPORTED_CURRENCIES }).notNull(),
  product: text().notNull(),
  createdAt,
});

export const schema = { usersTable, ordersTable };
