import { DRIZZLE_PROVIDER, type Database } from "@/db/providers";
import { ordersTable } from "@/db/schema";
import { Inject, Injectable } from "@nestjs/common";
import { type SQL, and, gte, lte } from "drizzle-orm";
import type { FindManyOrdersQuery, Order } from "./schemas";

type FindManyParams = FindManyOrdersQuery;

@Injectable()
export class OrdersService {
  constructor(@Inject(DRIZZLE_PROVIDER) private readonly db: Database) {}

  async registerOrder(newOrder: Order) {
    return await this.db.insert(ordersTable).values(newOrder).returning();
  }

  async findMany({ page, limit, range }: FindManyParams) {
    const clauses: SQL[] = [];
    const [startDate, endDate] = range;

    if (startDate) {
      clauses.push(gte(ordersTable.createdAt, startDate));
    }
    if (endDate) {
      clauses.push(lte(ordersTable.createdAt, endDate));
    }

    const where = and(...clauses);

    return await Promise.all([
      this.db.query.ordersTable.findMany({
        limit,
        offset: (page - 1) * limit,
        where: where,
      }),
      this.db.$count(ordersTable, where),
    ]);
  }
}
