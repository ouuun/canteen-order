import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { LoggerTsService } from '@utils/utils/logger/logger-ts.service';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { json, urlencoded } from 'express';
import { ConfigService } from '@utils/utils/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  const logger = app.get(LoggerTsService);
  app.useLogger(logger);

  app.enableCors();
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
    helmet(),
    json({ limit: '1mb' }),
    urlencoded({ extended: true, limit: '1mb' }),
  );

  const config = app.get(ConfigService);
  await app.listen(config.portOrder);
}
bootstrap();
