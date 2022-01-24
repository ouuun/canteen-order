import { Module } from '@nestjs/common';
import { LoggerTsService } from '@utils/utils/logger/logger-ts.service';
import { ConfigModule } from '@utils/utils/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [LoggerTsService],
  exports: [LoggerTsService],
})
export class UtilsModule {}
