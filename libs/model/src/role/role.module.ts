import { Module } from '@nestjs/common';
import { UtilsModule } from '@utils/utils';
import { LogModule } from '@model/model/log/log/log.module';
import { RoleService } from '@model/model/role/role/role.service';
import { mySequelizeModule } from '@model/model/sequelize.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '@model/model/role/role/role.model';
import { User } from '@model/model/user/user/user.model';

@Module({
  imports: [
    UtilsModule,
    LogModule,
    mySequelizeModule,
    SequelizeModule.forFeature([Role, User], 'connection'),
  ],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {
  //
}
