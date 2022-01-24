import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerTsService } from '@utils/utils/logger/logger-ts.service';
import { json, urlencoded } from 'express';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(LoggerTsService);
  app.useLogger(logger);

  app.enableCors();
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
    json({ limit: '1mb' }),
    urlencoded({ extended: true, limit: '1mb' }),
  );
  await app.listen(3000);
}
bootstrap();
