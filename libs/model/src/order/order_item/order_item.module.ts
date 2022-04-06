import { Module } from '@nestjs/common';
import { UtilsModule } from '@utils/utils';
import { LogModule } from '@model/model/log/log/log.module';
import { OrderItemService } from '@model/model/order/order_item/order_item.service';

@Module({
  imports: [UtilsModule, LogModule],
  providers: [OrderItemService],
  exports: [OrderItemService],
})
export class OrderItemModule {
  //
}
