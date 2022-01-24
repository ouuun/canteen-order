import { Module } from '@nestjs/common';
import { LoggerTsService } from '@utils/utils/logger/logger-ts.service';

@Module({
  providers: [LoggerTsService],
  exports: [LoggerTsService],
})
export class UtilsModule {}
