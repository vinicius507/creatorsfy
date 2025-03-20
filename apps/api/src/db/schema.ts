import { ORDER_STATUSES, SUPPORTED_CURRENCIES } from "@/orders/constants";
import { randomUUIDv7 } from "bun";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const id = text()
  .primaryKey()
  .$defaultFn(() => randomUUIDv7());

const createdAt = integer({ mode: "timestamp" }).$defaultFn(() => new Date());
const updatedAt = integer({ mode: "timestamp" })
  .$defaultFn(() => new Date())
  .$onUpdateFn(() => new Date());

export const usersTable = sqliteTable("users", {
  id,
  storeName: text({ length: 80 }).notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt,
  updatedAt,
});

export const ordersTable = sqliteTable(
  "orders",
  {
    id,
    status: text({ enum: ORDER_STATUSES }).notNull(),
    amount: integer().notNull(),
    currency: text({ enum: SUPPORTED_CURRENCIES }).notNull(),
    product: text().notNull(),
    createdAt,
  },
  (orders) => [index("created_at_idx").on(orders.createdAt)],
);

export const schema = { usersTable, ordersTable };
