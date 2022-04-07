import { Module } from '@nestjs/common';
import { UtilsModule } from '@utils/utils';
import { LogModule } from '@model/model/log/log/log.module';
import { OrderModule } from '@model/model/order/order.module';
import { ReportService } from '@model/model/report/report.service';

@Module({
  imports: [UtilsModule, LogModule, OrderModule],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {
  //
}
