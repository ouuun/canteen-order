import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
import { CuisineModule } from '@model/model/cuisine/cuisine.module';

@Module({
  imports: [CuisineModule],
  controllers: [TypeController],
  providers: [],
})
export class TypeModule {
  //
}
