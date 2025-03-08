import { Config } from "@/config/schemas";
import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

@Injectable()
export class ConfigService {
  constructor(private readonly config: NestConfigService) {}

  get<T extends keyof Config>(key: T): Config[T] {
    return this.config.getOrThrow<Config[T]>(key);
  }
}
