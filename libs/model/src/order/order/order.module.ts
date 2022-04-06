import { Module } from '@nestjs/common';
import { UtilsModule } from '@utils/utils';
import { LogModule } from '@model/model/log/log/log.module';
import { OrderService } from '@model/model/order/order/order.service';

@Module({
  imports: [UtilsModule, LogModule],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {
  //
}
