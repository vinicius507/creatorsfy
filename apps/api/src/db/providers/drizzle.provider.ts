import { ConfigService } from "@/config/config.service";
import { schema } from "@/db/schema";
import { Provider } from "@nestjs/common";
import { BunSQLiteDatabase, drizzle } from "drizzle-orm/bun-sqlite";

export type Database = BunSQLiteDatabase<typeof schema>;

export const DRIZZLE_PROVIDER = Symbol("DRIZZLE_PROVIDER");

export const DrizzleProvider: Provider = {
  provide: DRIZZLE_PROVIDER,
  useFactory: (config: ConfigService) => {
    const db = config.get("DATABASE");

    return drizzle(db, { schema });
  },
  inject: [ConfigService],
};
