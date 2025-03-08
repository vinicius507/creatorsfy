import { DatabaseModule } from "@/db/db.module";
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";

@Module({
  imports: [DatabaseModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
