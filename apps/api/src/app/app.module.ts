import { AuthModule } from "@/auth/auth.module";
import { ConfigModule } from "@/config/config.module";
import { OrdersModule } from "@/orders/orders.module";
import { WebhooksModule } from "@/webhooks/webhooks.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

@Module({
  imports: [AuthModule, ConfigModule, OrdersModule, WebhooksModule],
  controllers: [AppController],
})
export class AppModule {}
