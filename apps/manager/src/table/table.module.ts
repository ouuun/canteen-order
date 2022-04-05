import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableModule as TableModelModule } from '@model/model/table/table.module';

@Module({
  imports: [TableModelModule],
  controllers: [TableController],
  providers: [],
})
export class TableModule {
  //
}
