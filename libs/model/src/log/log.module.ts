import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Log } from '@model/model/log/log.model';
import { LogService } from '@model/model/log/log.service';
import { Sequence } from '@model/model/sequence/sequence.model';

@Module({
  imports: [SequelizeModule.forFeature([Log, Sequence], 'connection')],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {
  //
}
