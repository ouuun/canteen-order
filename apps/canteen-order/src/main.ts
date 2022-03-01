import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerTsService } from '@utils/utils/logger/logger-ts.service';
import * as chalk from 'chalk';
import { ConfigService } from '@utils/utils/config/config.service';
import rateLimit from 'express-rate-limit';
import { json, urlencoded } from 'express';

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
    // helmet(),
    json({ limit: '1mb' }),
    urlencoded({ extended: true, limit: '1mb' }),
  );

  const config = app.get(ConfigService);
  await app.listen(config.portCanteenOrder);

  console.log(await app.getUrl());

  logger.log(
    chalk.red(`canteen-order模块启动 `) +
      chalk.blue.underline(
        `${config.host}:${config.portCanteenOrder}/canteen-order`,
      ),
    'canteen-order',
  );
}
bootstrap();
