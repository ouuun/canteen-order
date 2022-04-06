import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderModule as orderModule } from '@model/model/order/order/order.module';
import { Order } from '@model/model/order/order/order.model';
import { OrderItemModule } from '@model/model/order/order_item/order_item.module';
import { OrderItem } from '@model/model/order/order_item/order_item.model';
import { mySequelizeModule } from '@model/model/sequelize.module';
import { OrderService } from '@model/model/order/order/order.service';
import { OrderItemService } from '@model/model/order/order_item/order_item.service';
import { OrderPayingProcessor } from '@model/model/order/order.paying.processor';
import { UtilsModule } from '@utils/utils';
import { BullConnectModule } from '@utils/utils/bull/bullConnect.module';
import { BullModule } from '@nestjs/bull';
import { CuisineModule } from '@model/model/cuisine/cuisine.module';

@Module({
  imports: [
    UtilsModule,
    orderModule,
    OrderItemModule,
    CuisineModule,
    BullConnectModule,
    BullModule.registerQueue({
      configKey: 'default',
      name: 'order:paying',
    }),
    mySequelizeModule,
    SequelizeModule.forFeature([Order, OrderItem], 'connection'),
  ],
  providers: [OrderService, OrderItemService, OrderPayingProcessor],
  exports: [OrderService, OrderItemService],
})
export class OrderModule {
  //
}
