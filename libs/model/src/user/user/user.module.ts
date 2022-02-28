import { Module } from '@nestjs/common';
import { UtilsModule } from '@utils/utils';
import { User } from '@model/model/user/user/user.model';
import { mySequelizeModule } from '@model/model/sequelize.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from '@model/model/user/user/user.service';

@Module({
  imports: [
    UtilsModule,
    mySequelizeModule,
    SequelizeModule.forFeature([User], 'connection'),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
  //
}
