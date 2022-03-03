import { Module } from '@nestjs/common';
import { UtilsModule } from '@utils/utils';
import { User } from '@model/model/user/user/user.model';
import { mySequelizeModule } from '@model/model/sequelize.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from '@model/model/user/user/user.service';
import { AuthModule } from '@utils/utils/auth/auth.module';
import { WechatModule } from '@utils/utils/wechat/wechat.module';
import { LogModule } from '@model/model/log/log/log.module';

@Module({
  imports: [
    AuthModule,
    UtilsModule,
    WechatModule,
    LogModule,
    mySequelizeModule,
    SequelizeModule.forFeature([User], 'connection'),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
  //
}
