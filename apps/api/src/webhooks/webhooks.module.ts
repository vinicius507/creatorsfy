import { OrdersModule } from "@/orders/orders.module";
import { Module } from "@nestjs/common";
import { WebhooksController } from "./webhooks.controller";

@Module({
  imports: [OrdersModule],
  controllers: [WebhooksController],
})
export class WebhooksModule {}
