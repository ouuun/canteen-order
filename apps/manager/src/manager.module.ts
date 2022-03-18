import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from '@utils/utils/filter/all-exception.filter';
import { UtilsModule } from '@utils/utils';
import { TransformInterceptor } from '@utils/utils/interceptor/transform.interceptor';
import { LogInterceptor } from '@utils/utils/interceptor/log.interceptor';
import { TypeModule } from './type/type.module';

@Module({
  imports: [UtilsModule, TypeModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
  ],
})
export class ManagerModule {}
