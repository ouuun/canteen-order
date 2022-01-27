import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UtilsModule } from '@utils/utils';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from '@utils/utils/filter/all-exception.filter';
import { TransformInterceptor } from '@utils/utils/interceptor/transform.interceptor';
import { LogInterceptor } from '@utils/utils/interceptor/log.interceptor';
import { UserModule as userModelModule } from '@model/model/user/user.module';
import { AuthModule } from '@utils/utils/auth/auth.module';
import { JwtAuthGuard } from '@utils/utils/auth/jwt-auth.guard';

@Module({
  imports: [AuthModule, UtilsModule, userModelModule],
  controllers: [UserController],
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
      useClass: JwtAuthGuard,
    },
    UserService,
  ],
})
export class UserModule {}
