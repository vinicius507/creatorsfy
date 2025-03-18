import { DatabaseModule } from "@/db/db.module";
import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";

@Module({
  imports: [DatabaseModule],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
