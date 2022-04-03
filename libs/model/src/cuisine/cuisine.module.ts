import { Module } from '@nestjs/common';
import { mySequelizeModule } from '@model/model/sequelize.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeModule } from '@model/model/cuisine/type/type.module';
import { DishModule } from '@model/model/cuisine/dish/dish.module';
import { Dish } from '@model/model/cuisine/dish/dish/dish.model';
import { Type } from '@model/model/cuisine/type/type/type.model';
import { TypeService } from '@model/model/cuisine/type/type/type.service';
import { DishService } from '@model/model/cuisine/dish/dish/dish.service';

@Module({
  imports: [
    TypeModule,
    DishModule,
    mySequelizeModule,
    SequelizeModule.forFeature([Type, Dish], 'connection'),
  ],
  providers: [TypeService, DishService],
  exports: [TypeService, DishService],
})
export class CuisineModule {
  //
}
