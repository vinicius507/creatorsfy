import { DRIZZLE_PROVIDER, type Database } from "@/db/providers";
import { ordersTable } from "@/db/schema";
import { Inject, Injectable } from "@nestjs/common";
import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import { SQLiteSelect } from "drizzle-orm/sqlite-core";
import type { FindManyOrdersQuery, Order } from "./schemas";

type FindManyParams = FindManyOrdersQuery;

type GetTotalRevenueParams = {
  currency: Order["currency"];
  startDate?: Date;
  endDate?: Date;
};

type RegisterOrderParams = typeof ordersTable.$inferInsert;

@Injectable()
export class OrdersService {
  constructor(@Inject(DRIZZLE_PROVIDER) private readonly db: Database) {}

  async findMany({ page, size, startDate, endDate }: FindManyParams) {
    return await this.db.transaction(async (tx) => {
      const selectOrdersPage = tx
        .select()
        .from(ordersTable)
        .orderBy(desc(ordersTable.createdAt))
        .limit(size)
        .offset((page - 1) * size)
        .$dynamic();
      const selectTotalCount = this.db
        .select({ total: sql<number>`cast(count(${ordersTable.id}) as int)` })
        .from(ordersTable)
        .$dynamic();

      return await Promise.all([
        this.withDateLimits(selectOrdersPage, startDate, endDate),
        this.withDateLimits(selectTotalCount, startDate, endDate).then((result) => result?.pop()?.total ?? 0),
      ]);
    });
  }

  async getTotalRevenue({ currency, startDate, endDate }: GetTotalRevenueParams) {
    const selectTotalRevenue = this.db
      .select({ totalRevenue: sql<number>`sum(${ordersTable.amount})` })
      .from(ordersTable)
      .where(eq(ordersTable.currency, currency))
      .$dynamic();

    const result = await this.withDateLimits(selectTotalRevenue, startDate, endDate);
    const { totalRevenue } = result.pop() ?? {};

    return totalRevenue ?? 0;
  }

  async registerOrder(order: RegisterOrderParams) {
    return await this.db.insert(ordersTable).values(order).returning();
  }

  private withDateLimits<T extends SQLiteSelect>(qb: T, startDate?: Date, endDate?: Date) {
    return qb.where(
      and(startDate && gte(ordersTable.createdAt, startDate), endDate && lte(ordersTable.createdAt, endDate)),
    );
  }
}
