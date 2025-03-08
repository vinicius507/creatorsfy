import { ZodValidationPipe } from "@anatine/zod-nestjs";
import { HttpStatus, Logger } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { FastifyAdapter, type NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app/app.module";
import { ZodInterceptor } from "./app/interceptors";
import { ConfigService } from "./config/config.service";
import { setupSwagger } from "./swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const config = app.get(ConfigService);
  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ZodInterceptor(reflector));
  app.useGlobalPipes(
    new ZodValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  if (config.get("NODE_ENV") === "development") {
    setupSwagger(app);
  }
  await app.listen(config.get("PORT"), (error, address) => {
    if (error) {
      Logger.fatal(error);
      return;
    }
    Logger.log(`Listening on ${address}`);
  });
}

bootstrap();
