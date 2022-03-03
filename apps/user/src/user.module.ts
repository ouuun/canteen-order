import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UtilsModule } from '@utils/utils';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from '@utils/utils/filter/all-exception.filter';
import { TransformInterceptor } from '@utils/utils/interceptor/transform.interceptor';
import { LogInterceptor } from '@utils/utils/interceptor/log.interceptor';
import { UserModule as userModelModule } from '@model/model/user/user/user.module';
import { MyAuthGuard } from '@utils/utils/auth/my-auth.guard';
import { UserService } from '@model/model/user/user/user.service';
import { AuthModule } from '@utils/utils/auth/auth.module';
import { WechatModule } from '@utils/utils/wechat/wechat.module';

@Module({
  imports: [AuthModule, UtilsModule, WechatModule, userModelModule],
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
      useClass: MyAuthGuard,
    },
    UserService,
  ],
})
export class UserModule {}
