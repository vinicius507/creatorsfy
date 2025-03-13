import { patchNestjsSwagger } from "@anatine/zod-nestjs";
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Creatorsfy")
    .setDescription("API for Creatorsfy")
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  patchNestjsSwagger();
  SwaggerModule.setup("docs", app, documentFactory, {
    jsonDocumentUrl: "docs/openapi.json",
  });
}
