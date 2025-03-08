import { AuthModule } from "@/auth/auth.module";
import { ConfigModule } from "@/config/config.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

@Module({
  imports: [AuthModule, ConfigModule],
  controllers: [AppController],
})
export class AppModule {}
