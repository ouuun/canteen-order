import { Module } from '@nestjs/common';
import { DishController } from './dish.controller';

@Module({
  imports: [],
  controllers: [DishController],
  providers: [],
})
export class DishModule {
  //
}
