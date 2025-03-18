import { DRIZZLE_PROVIDER, type Database } from "@/db/providers";
import { ordersTable } from "@/db/schema";
import { Inject, Injectable } from "@nestjs/common";
import { SQL } from "drizzle-orm";
import type { Order } from "./schemas";

type FindManyParams = {
  filters?: {
    startDate?: Date;
    endDate?: Date;
  };
};

@Injectable()
export class OrdersService {
  constructor(@Inject(DRIZZLE_PROVIDER) private readonly db: Database) {}

  async registerOrder(newOrder: Order) {
    return await this.db.insert(ordersTable).values(newOrder).returning();
  }

  async findMany({ filters }: FindManyParams) {
    return await this.db.query.ordersTable.findMany({
      where: (orders, { and, gte, lte }) => {
        if (!filters || !Object.keys(filters).length) {
          return;
        }

        const clauses: SQL[] = [];

        if (filters.startDate) {
          clauses.push(gte(orders.createdAt, filters.startDate));
        }
        if (filters.endDate) {
          clauses.push(lte(orders.createdAt, filters.endDate));
        }
        return and(...clauses);
      },
    });
  }
}
