import { DRIZZLE_PROVIDER, type Database } from "@/db/providers";
import { ordersTable } from "@/db/schema";
import { Inject, Injectable } from "@nestjs/common";
import type { Order } from "./schemas";

@Injectable()
export class OrdersService {
  constructor(@Inject(DRIZZLE_PROVIDER) private readonly db: Database) {}

  async registerOrder(newOrder: Order) {
    return await this.db.insert(ordersTable).values(newOrder).returning();
  }
}
