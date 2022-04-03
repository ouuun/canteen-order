import { Module } from '@nestjs/common';
import { UtilsModule } from '@utils/utils';
import { LogModule } from '@model/model/log/log/log.module';
import { TypeService } from '@model/model/cuisine/type/type/type.service';

@Module({
  imports: [UtilsModule, LogModule],
  providers: [TypeService],
  exports: [TypeService],
})
export class TypeModule {
  //
}
