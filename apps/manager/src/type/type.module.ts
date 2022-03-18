import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
import { TypeModule as typeModelModule } from '@model/model/type/type/type.module';

@Module({
  imports: [typeModelModule],
  controllers: [TypeController],
  providers: [],
})
export class TypeModule {
  //
}
