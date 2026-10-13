import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("NNEP API")
    .setDescription("Fastify-powered NestJS 11 OpenAPI for Web & Chrome Extension MV3")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  const port = process.env.PORT_API ? parseInt(process.env.PORT_API, 10) : 3000;
  await app.listen(port, "0.0.0.0");
  console.log(`ðŸš€ NNEP API is running on http://127.0.0.1:${port}`);
  console.log(`ðŸ“„ Swagger OpenAPI Docs available at http://127.0.0.1:${port}/docs`);
}
bootstrap();
