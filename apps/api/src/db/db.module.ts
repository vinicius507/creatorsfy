import { Module } from "@nestjs/common";
import { DrizzleProvider } from "./providers";

@Module({
  providers: [DrizzleProvider],
  exports: [DrizzleProvider],
})
export class DatabaseModule {}
