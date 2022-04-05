import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Table } from '@model/model/table/table/table.model';
import { TableService } from '@model/model/table/table/table.service';
import { WechatModule } from '@utils/utils/wechat/wechat.module';

@Module({
  imports: [
    WechatModule,
    TableModule,
    SequelizeModule.forFeature([Table], 'connection'),
  ],
  providers: [TableService],
  exports: [TableService],
})
export class TableModule {
  //
}
