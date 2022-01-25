import { Module } from '@nestjs/common';
import { UtilsModule } from '@utils/utils';
import { User } from '@model/model/user/user.model';
import { mySequelizeModule } from '@model/model/sequelize.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    UtilsModule,
    mySequelizeModule,
    SequelizeModule.forFeature([User], 'connection'),
  ],
  providers: [],
  exports: [],
})
export class UserModule {
  //
}
