import { Module } from '@nestjs/common';
import { UtilsModule } from '@utils/utils';
import { LogModule } from '@model/model/log/log/log.module';
import { DishService } from '@model/model/cuisine/dish/dish/dish.service';

@Module({
  imports: [UtilsModule, LogModule],
  providers: [DishService],
  exports: [DishService],
})
export class DishModule {
  //
}
