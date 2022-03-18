import { Module } from '@nestjs/common';
import { UtilsModule } from '@utils/utils';
import { mySequelizeModule } from '@model/model/sequelize.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { LogModule } from '@model/model/log/log/log.module';
import { Type } from '@model/model/type/type/type.model';
import { TypeService } from '@model/model/type/type/type.service';

@Module({
  imports: [
    UtilsModule,
    LogModule,
    mySequelizeModule,
    SequelizeModule.forFeature([Type], 'connection'),
  ],
  providers: [TypeService],
  exports: [TypeService],
})
export class TypeModule {
  //
}
