import { Module } from '@nestjs/common';
import { DishController } from './dish.controller';
import { CuisineModule } from '@model/model/cuisine/cuisine.module';

@Module({
  imports: [CuisineModule],
  controllers: [DishController],
  providers: [],
})
export class DishModule {
  //
}
