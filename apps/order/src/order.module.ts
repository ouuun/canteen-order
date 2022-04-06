import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from '@utils/utils/filter/all-exception.filter';
import { TransformInterceptor } from '@utils/utils/interceptor/transform.interceptor';
import { LogInterceptor } from '@utils/utils/interceptor/log.interceptor';
import { MyAuthGuard } from '@utils/utils/auth/my-auth.guard';
import { UtilsModule } from '@utils/utils';
import { AuthModule } from '@utils/utils/auth/auth.module';
import { OrderModule as OrderModelModule } from '@model/model/order/order.module';

@Module({
  imports: [AuthModule, UtilsModule, OrderModelModule],
  controllers: [OrderController],
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
    {
      provide: APP_GUARD,
      useClass: MyAuthGuard,
    },
  ],
})
export class OrderModule {}
