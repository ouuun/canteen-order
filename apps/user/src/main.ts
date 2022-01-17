import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { logger } from '@utils/utils/middleware/logger.middleware';
import * as express from 'express';
import { TransformInterceptor } from '@utils/utils/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  app.use(logger);
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
