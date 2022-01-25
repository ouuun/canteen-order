import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from '@utils/utils/filter/all-exception.filter';
import { UtilsModule } from '@utils/utils';
import { TransformInterceptor } from '@utils/utils/interceptor/transform.interceptor';
import { LogInterceptor } from '@utils/utils/interceptor/log.interceptor';
import { UserModule } from '@model/model/user/user.module';
import { LogModule } from '@model/model/log/log/log.module';

@Module({
  imports: [UtilsModule, UserModule, LogModule],
  controllers: [AppController],
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
    AppService,
  ],
})
export class AppModule {}
