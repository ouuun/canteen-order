import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { TransformInterceptor } from '@utils/utils/interceptor/transform.interceptor';
import { logger } from '@utils/utils/middleware/logger.middleware';
import { Logger } from '@utils/utils/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  app.use(logger);
  app.useGlobalInterceptors(new TransformInterceptor());
  Logger.initLogger('user');
  await app.listen(3000);
}
bootstrap();
