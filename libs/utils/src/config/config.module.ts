import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { LoggerTsService } from '@utils/utils/logger/logger-ts.service';

@Module({
  providers: [LoggerTsService, ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {
  //
}
