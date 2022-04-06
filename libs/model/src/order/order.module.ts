import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderModule as orderModule } from '@model/model/order/order/order.module';
import { Order } from '@model/model/order/order/order.model';
import { OrderItemModule } from '@model/model/order/order_item/order_item.module';
import { OrderItem } from '@model/model/order/order_item/order_item.model';
import { mySequelizeModule } from '@model/model/sequelize.module';

@Module({
  imports: [
    orderModule,
    OrderItemModule,
    mySequelizeModule,
    SequelizeModule.forFeature([Order, OrderItem], 'connection'),
  ],
  providers: [],
  exports: [],
})
export class OrderModule {
  //
}
