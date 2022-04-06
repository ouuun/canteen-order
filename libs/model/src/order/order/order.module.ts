import { Module } from '@nestjs/common';
import { UtilsModule } from '@utils/utils';
import { LogModule } from '@model/model/log/log/log.module';
import { OrderService } from '@model/model/order/order/order.service';
import { BullModule } from '@nestjs/bull';
import { BullConnectModule } from '@utils/utils/bull/bullConnect.module';
import { CuisineModule } from '@model/model/cuisine/cuisine.module';
import { RoleModule } from '@model/model/role/role.module';

@Module({
  imports: [
    UtilsModule,
    LogModule,
    CuisineModule,
    BullConnectModule,
    RoleModule,
    BullModule.registerQueue({
      configKey: 'default',
      name: 'order:paying',
    }),
  ],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {
  //
}
