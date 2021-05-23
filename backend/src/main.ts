import "utils/env";

import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: "http://localhost:3000" });

  app.use(cookieParser());

  await app.listen(process.env.PORT || 5000);
}

bootstrap();
