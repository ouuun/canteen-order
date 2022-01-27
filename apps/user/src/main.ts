import { NestFactory } from '@nestjs/core';
import { LoggerTsService } from '@utils/utils/logger/logger-ts.service';
import { json, urlencoded } from 'express';
import rateLimit from 'express-rate-limit';
import * as chalk from 'chalk';
import { ConfigService } from '@utils/utils/config/config.service';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

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

  const config = app.get(ConfigService);
  await app.listen(config.portUser);

  console.log(await app.getUrl());
  logger.log(
    chalk.red(`user模块启动 `) +
      chalk.blue.underline(`${config.host}:${config.portUser}/user`),
    'user',
  );
}
bootstrap();
