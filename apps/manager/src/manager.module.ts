import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from '@utils/utils/filter/all-exception.filter';
import { UtilsModule } from '@utils/utils';
import { TransformInterceptor } from '@utils/utils/interceptor/transform.interceptor';
import { LogInterceptor } from '@utils/utils/interceptor/log.interceptor';
import { TypeModule } from './type/type.module';
import { MyAuthGuard } from '@utils/utils/auth/my-auth.guard';
import { AuthModule } from '@utils/utils/auth/auth.module';
import { DishModule } from './dish/dish.module';

@Module({
  imports: [AuthModule, UtilsModule, TypeModule, DishModule],
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
    {
      provide: APP_GUARD,
      useClass: MyAuthGuard,
    },
  ],
})
export class ManagerModule {}
