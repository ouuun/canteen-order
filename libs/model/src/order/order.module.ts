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
import { RoleModule } from '@model/model/role/role.module';
import { WechatModule } from '@utils/utils/wechat/wechat.module';
import { Table } from '@model/model/table/table/table.model';

@Module({
  imports: [
    UtilsModule,
    orderModule,
    OrderItemModule,
    CuisineModule,
    BullConnectModule,
    WechatModule,
    RoleModule,
    BullModule.registerQueue({
      configKey: 'default',
      name: 'order:paying',
    }),
    mySequelizeModule,
    SequelizeModule.forFeature([Order, OrderItem, Table], 'connection'),
  ],
  providers: [OrderService, OrderItemService, OrderPayingProcessor],
  exports: [OrderService, OrderItemService],
})
export class OrderModule {
  //
}
